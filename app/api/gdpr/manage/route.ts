import { NextRequest, NextResponse } from "next/server";

import { verifyAdmin } from "@/lib/adminAuth";
import {
  readLogContent,
  redactEntry,
  writeLogContent,
} from "@/lib/consent-logger";

// The consent audit chain lives in Vercel Blob (see lib/consent-logger.ts).
// The deployed filesystem is ephemeral and read-only outside /tmp, so this
// route must never read or write the log from local disk.

// Read and parse consent logs. A read failure propagates rather than being
// reported as "no records", so a DSAR request never silently returns empty.
async function readLogs(): Promise<string[]> {
  const data = await readLogContent();
  return data.trim().split("\n").filter(Boolean);
}

export async function GET(request: NextRequest) {
  const authError = verifyAdmin(request);
  if (authError) return authError;

  const logs = await readLogs();
  const searchId = request.nextUrl.searchParams.get("id");

  let filtered = logs;
  if (searchId) {
    filtered = logs.filter((line) => {
      try {
        const entry = JSON.parse(line);
        return (
          entry.id === searchId ||
          entry.sessionId === searchId ||
          entry.ipAddress === searchId
        );
      } catch {
        return false;
      }
    });
  }

  return NextResponse.json(
    {
      count: filtered.length,
      records: filtered.map((line) => JSON.parse(line)),
      note: "Contact form submissions are handled via Resend email. Retrieve those manually from your inbox or Resend dashboard.",
    },
    { status: 200 }
  );
}

export async function DELETE(request: NextRequest) {
  const authError = verifyAdmin(request);
  if (authError) return authError;

  const { id, bulk } = await request.json().catch(() => ({}));
  const logs = await readLogs();

  if (bulk === true) {
    // GDPR Art. 17: redact instead of hard-deleting, so the hash chain survives.
    // `redactEntry` recomputes the chain fields; without that the log would look
    // tampered with from the erasure onwards.
    const redacted = logs.map((line) => {
      try {
        return JSON.stringify(redactEntry(JSON.parse(line)));
      } catch {
        return line;
      }
    });
    await writeLogContent(redacted.join("\n") + "\n");
    return NextResponse.json(
      { success: true, action: "bulk_anonymized" },
      { status: 200 }
    );
  }

  if (id) {
    // Find and redact a specific record
    const redacted = logs.map((line) => {
      try {
        const entry = JSON.parse(line);
        if (entry.id !== id && entry.sessionId !== id) return line;
        return JSON.stringify(redactEntry(entry));
      } catch {
        return line;
      }
    });
    await writeLogContent(redacted.join("\n") + "\n");
    return NextResponse.json(
      { success: true, action: "record_anonymized" },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { error: "Provide 'id' or 'bulk: true'" },
    { status: 400 }
  );
}
