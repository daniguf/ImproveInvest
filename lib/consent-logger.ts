// lib/consent-logger.ts
import { BlobNotFoundError, get, put } from "@vercel/blob";
import { createHash } from "crypto";

export interface ConsentLogEntry {
  id: string;
  timestamp: string;
  consentState: {
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
  };
  policyVersion: string;
  locale: string;
  ipAddress: string; // Anonymized (last octet removed for IPv4)
  userAgent: string;
  sessionId: string;
  previousHash: string;
  currentHash: string;
  signature: string; // HMAC signature for integrity
}

export interface ConsentLogInput {
  consentState: ConsentLogEntry["consentState"];
  policyVersion: string;
  locale: string;
  ipAddress: string;
  userAgent: string;
  sessionId: string;
}

const BLOB_KEY = "consent-audit.log";
const HMAC_SECRET = process.env.CONSENT_LOG_HMAC_SECRET || "";

// Anonymize IP address for GDPR compliance
export function anonymizeIp(ip: string): string {
  if (!ip) return "0.0.0.0";

  // IPv4: remove last octet
  if (ip.includes(".") && !ip.includes(":")) {
    return ip.split(".").slice(0, 3).join(".") + ".0";
  }
  // IPv6: truncate to /64
  if (ip.includes(":")) {
    return ip.split(":").slice(0, 4).join(":") + "::";
  }
  return "0.0.0.0";
}

// Generate SHA-256 hash of entry content (excluding hash fields)
function generateEntryHash(
  entry: Omit<ConsentLogEntry, "currentHash" | "signature">
): string {
  const content = JSON.stringify({
    id: entry.id,
    timestamp: entry.timestamp,
    consentState: entry.consentState,
    policyVersion: entry.policyVersion,
    locale: entry.locale,
    ipAddress: entry.ipAddress,
    userAgent: entry.userAgent,
    sessionId: entry.sessionId,
    previousHash: entry.previousHash,
  });
  return createHash("sha256").update(content).digest("hex");
}

// Generate HMAC signature for tamper detection
function generateSignature(content: string): string {
  if (!HMAC_SECRET) {
    console.warn("CONSENT_LOG_HMAC_SECRET not set - signatures will be weak");
    return "";
  }
  return createHash("sha256")
    .update(content + HMAC_SECRET)
    .digest("hex");
}

// Read the current log content from blob
async function readLogContent(): Promise<string> {
  try {
    const result = await get(BLOB_KEY, { access: "private" });
    return await new Response(result?.stream).text();
  } catch (error) {
    if (error instanceof BlobNotFoundError) {
      return "";
    }
    throw error;
  }
}

// Verify log integrity
export async function verifyLogIntegrity(): Promise<{
  valid: boolean;
  error?: string;
  message?: string;
}> {
  try {
    const data = await readLogContent();
    const lines = data
      .trim()
      .split("\n")
      .filter((line) => line.trim());

    if (lines.length === 0) {
      return { valid: true, message: "Log exists but is empty." };
    }

    let expectedPreviousHash = "genesis";

    for (const [index, line] of lines.entries()) {
      const entry: ConsentLogEntry = JSON.parse(line);

      if (entry.previousHash !== expectedPreviousHash) {
        return {
          valid: false,
          error: `Chain broken at entry ${index + 1}: expected previousHash ${expectedPreviousHash}, got ${entry.previousHash}`,
        };
      }

      const calculatedHash = generateEntryHash(entry);
      if (calculatedHash !== entry.currentHash) {
        return { valid: false, error: `Hash mismatch at entry ${index + 1}` };
      }

      if (HMAC_SECRET && entry.signature) {
        const expectedSignature = generateSignature(JSON.stringify(entry));
        if (entry.signature !== expectedSignature) {
          return {
            valid: false,
            error: `Signature mismatch at entry ${index + 1}`,
          };
        }
      }

      expectedPreviousHash = entry.currentHash;
    }

    return { valid: true };
  } catch (error) {
    if (error instanceof BlobNotFoundError) {
      return {
        valid: true,
        message:
          "No consent logs found yet. The log will be created automatically when the first user gives consent.",
      };
    }
    return { valid: false, error: `Failed to verify log: ${error}` };
  }
}

// Log consent with immutable hash chaining
export async function logConsent(
  input: ConsentLogInput
): Promise<ConsentLogEntry> {
  // Read current log content
  const currentContent = await readLogContent();

  // Get previous hash from last entry (or "genesis" if empty)
  let previousHash = "genesis";
  if (currentContent.trim()) {
    const lines = currentContent
      .trim()
      .split("\n")
      .filter((l) => l.trim());
    const lastEntry: ConsentLogEntry = JSON.parse(lines[lines.length - 1]);
    previousHash = lastEntry.currentHash;
  }

  const timestamp = new Date().toISOString();
  const id = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;

  const entryContent: Omit<ConsentLogEntry, "currentHash" | "signature"> = {
    id,
    timestamp,
    consentState: input.consentState,
    policyVersion: input.policyVersion,
    locale: input.locale,
    ipAddress: anonymizeIp(input.ipAddress),
    userAgent: input.userAgent.slice(0, 500), // Limit length
    sessionId: input.sessionId,
    previousHash,
  };

  const currentHash = generateEntryHash(entryContent);
  const signature = generateSignature(JSON.stringify(entryContent));

  const fullEntry: ConsentLogEntry = {
    ...entryContent,
    currentHash,
    signature,
  };

  // Append to log using read-modify-write pattern
  const newContent = currentContent + JSON.stringify(fullEntry) + "\n";
  await put(BLOB_KEY, newContent, {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  return fullEntry;
}

// Export for testing
export const _test = {
  generateEntryHash,
  generateSignature,
  BLOB_KEY,
};
