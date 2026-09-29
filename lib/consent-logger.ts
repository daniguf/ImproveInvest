import { BlobNotFoundError, get, put } from "@vercel/blob";
import { createHash } from "crypto";

interface ConsentLogEntry {
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
  /** Set when the entry was redacted in answer to an Article 17 request. */
  anonymizedAt?: string;
  reason?: string;
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
function anonymizeIp(ip: string): string {
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

/**
 * The bytes that are signed: the entry without its own chain fields. Writing and
 * verifying both go through here, so the two can never drift — which is what made
 * signature verification fail for every entry before.
 */
function signaturePayload(
  entry: ConsentLogEntry | Omit<ConsentLogEntry, "currentHash" | "signature">
): string {
  const rest: Record<string, unknown> = { ...entry };
  delete rest.currentHash;
  delete rest.signature;
  return JSON.stringify(rest);
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

/**
 * Redact an entry in place of a hard delete (GDPR Article 17) and re-seal it.
 *
 * The redacted fields are part of `currentHash`, so the chain fields have to be
 * recomputed; otherwise `verifyLogIntegrity()` reports the log as tampered with
 * from the erasure onwards.
 */
export function redactEntry(entry: ConsentLogEntry): ConsentLogEntry {
  const redacted = {
    ...entry,
    ipAddress: "0.0.0.0",
    userAgent: "REDACTED",
    sessionId: "REDACTED",
    anonymizedAt: new Date().toISOString(),
    reason: "DSAR_ERASURE_REQUEST",
  };

  return {
    ...redacted,
    currentHash: generateEntryHash(redacted),
    signature: generateSignature(signaturePayload(redacted)),
  };
}

// Read the current log content from blob. Returns "" when the log does not
// exist yet - the first consent entry creates it.
export async function readLogContent(): Promise<string> {
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

// Overwrite the log in blob storage. Used both when appending a new consent
// entry and when the GDPR admin route redacts entries for a DSAR request.
export async function writeLogContent(content: string): Promise<void> {
  await put(BLOB_KEY, content, {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

/** Details behind an integrity result, to tell a rotation from an alteration. */
export interface LogIntegrityStats {
  entries: number;
  /** Entries written before a signing key existed. They are never signed. */
  unsigned: number;
  /** Entries whose signature does not match the key configured here. */
  signatureMismatches: number;
  /** Entries whose `previousHash` does not match their predecessor. */
  chainBreaks: number;
  /** Entries whose contents do not match their own `currentHash`. */
  hashMismatches: number;
}

export interface LogIntegrityReport {
  valid: boolean;
  /** The first problem found, for callers that only want a headline. */
  error?: string;
  message?: string;
  /** Every problem found, capped - a long log should not produce a huge body. */
  problems?: string[];
  stats?: LogIntegrityStats;
}

const MAX_REPORTED_PROBLEMS = 20;

/**
 * Verify log integrity.
 *
 * The whole log is walked rather than stopping at the first problem: one bad
 * entry (a rotated signing key, say) would otherwise hide everything after it.
 * `chainBreaks` and `hashMismatches` mean entries were altered; a
 * `signatureMismatches` count on its own is what a changed
 * `CONSENT_LOG_HMAC_SECRET` looks like.
 */
export async function verifyLogIntegrity(): Promise<LogIntegrityReport> {
  try {
    const data = await readLogContent();
    const lines = data
      .trim()
      .split("\n")
      .filter((line) => line.trim());

    if (lines.length === 0) {
      return { valid: true, message: "Log exists but is empty." };
    }

    const problems: string[] = [];
    const stats: LogIntegrityStats = {
      entries: lines.length,
      unsigned: 0,
      signatureMismatches: 0,
      chainBreaks: 0,
      hashMismatches: 0,
    };
    const note = (problem: string) => {
      if (problems.length < MAX_REPORTED_PROBLEMS) problems.push(problem);
    };

    let expectedPreviousHash = "genesis";

    for (const [index, line] of lines.entries()) {
      const entry: ConsentLogEntry = JSON.parse(line);
      const position = index + 1;

      if (entry.previousHash !== expectedPreviousHash) {
        stats.chainBreaks += 1;
        note(
          `Chain broken at entry ${position}: expected previousHash ${expectedPreviousHash}, got ${entry.previousHash}`
        );
      }

      if (generateEntryHash(entry) !== entry.currentHash) {
        stats.hashMismatches += 1;
        note(`Hash mismatch at entry ${position}`);
      }

      if (!entry.signature) {
        stats.unsigned += 1;
      } else if (HMAC_SECRET) {
        if (entry.signature !== generateSignature(signaturePayload(entry))) {
          stats.signatureMismatches += 1;
          note(`Signature mismatch at entry ${position}`);
        }
      }

      expectedPreviousHash = entry.currentHash;
    }

    if (problems.length === 0) {
      return { valid: true, stats };
    }

    return { valid: false, error: problems[0], problems, stats };
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
  const signature = generateSignature(signaturePayload(entryContent));

  const fullEntry: ConsentLogEntry = {
    ...entryContent,
    currentHash,
    signature,
  };

  // Append to log using read-modify-write pattern
  const newContent = currentContent + JSON.stringify(fullEntry) + "\n";
  await writeLogContent(newContent);

  return fullEntry;
}
