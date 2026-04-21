// lib/consent-logger.ts
import { createHash } from "crypto";
import { appendFile, readFile } from "fs/promises";
import { join } from "path";

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

const LOG_FILE = join(process.cwd(), "logs", "consent-audit.log");
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

// Get the last hash from the log file for chaining
async function getLastHash(): Promise<string> {
  try {
    const data = await readFile(LOG_FILE, "utf-8");
    const lines = data
      .trim()
      .split("\n")
      .filter((line) => line.trim());
    if (lines.length === 0) return "genesis";

    const lastLine = lines[lines.length - 1];
    const lastEntry: ConsentLogEntry = JSON.parse(lastLine);
    return lastEntry.currentHash;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  } catch (error) {
    // File doesn't exist or is empty - return genesis hash
    return "genesis";
  }
}

// lib/consent-logger.ts (replace the existing verifyLogIntegrity function)
export async function verifyLogIntegrity(): Promise<{
  valid: boolean;
  error?: string;
  message?: string;
}> {
  try {
    const data = await readFile(LOG_FILE, "utf-8");
    const lines = data
      .trim()
      .split("\n")
      .filter((line) => line.trim());

    if (lines.length === 0) {
      return { valid: true, message: "Log file exists but is empty." };
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Gracefully handle missing log file (expected before first consent)
    if (error?.code === "ENOENT") {
      return {
        valid: true,
        message:
          "No consent logs found yet. The log file will be created automatically when the first user gives consent.",
      };
    }
    return { valid: false, error: `Failed to verify log: ${error}` };
  }
}

// Log consent with immutable hash chaining
export async function logConsent(
  input: ConsentLogInput
): Promise<ConsentLogEntry> {
  // Ensure logs directory exists
  const { mkdir } = await import("fs/promises");
  await mkdir(join(process.cwd(), "logs"), { recursive: true });

  const previousHash = await getLastHash();
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

  // Append to log file (atomic write)
  await appendFile(LOG_FILE, JSON.stringify(fullEntry) + "\n");

  return fullEntry;
}

// Export for testing
export const _test = {
  generateEntryHash,
  generateSignature,
  LOG_FILE,
};
