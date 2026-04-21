import { readFile, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

const LOG_FILE = join(process.cwd(), "logs", "consent-audit.log");
const ADMIN_KEY = process.env.ADMIN_API_KEY || "";

// Verify admin authorization
function verifyAdmin(request: NextRequest) {
  const auth =
    request.headers.get("x-admin-key") ||
    request.nextUrl.searchParams.get("key");
  if (!auth || auth !== ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

// Read and parse consent logs
async function readLogs(): Promise<string[]> {
  try {
    const data = await readFile(LOG_FILE, "utf-8");
    return data.trim().split("\n").filter(Boolean);
  } catch {
    return [];
  }
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
    // GDPR Art. 17: Anonymize instead of hard-delete to preserve audit chain
    const anonymized = logs.map((line) => {
      try {
        const entry = JSON.parse(line);
        entry.ipAddress = "0.0.0.0";
        entry.userAgent = "REDACTED";
        entry.sessionId = "REDACTED";
        entry.anonymizedAt = new Date().toISOString();
        entry.reason = "DSAR_ERASURE_REQUEST";
        return JSON.stringify(entry);
      } catch {
        return line;
      }
    });
    await writeFile(LOG_FILE, anonymized.join("\n") + "\n");
    return NextResponse.json(
      { success: true, action: "bulk_anonymized" },
      { status: 200 }
    );
  }

  if (id) {
    // Find and anonymize specific record
    const updated = logs.map((line) => {
      try {
        const entry = JSON.parse(line);
        if (entry.id === id || entry.sessionId === id) {
          entry.ipAddress = "0.0.0.0";
          entry.userAgent = "REDACTED";
          entry.sessionId = "REDACTED";
          entry.anonymizedAt = new Date().toISOString();
        }
        return JSON.stringify(entry);
      } catch {
        return line;
      }
    });
    await writeFile(LOG_FILE, updated.join("\n") + "\n");
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
