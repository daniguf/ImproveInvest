// app/api/consent-log/route.ts
import { ConsentLogInput, logConsent } from "@/lib/consent-logger";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields: (keyof ConsentLogInput)[] = [
      "consentState",
      "policyVersion",
      "locale",
      "sessionId",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate consentState structure
    const { consentState } = body;
    if (
      typeof consentState.essential !== "boolean" ||
      typeof consentState.analytics !== "boolean" ||
      typeof consentState.marketing !== "boolean"
    ) {
      return NextResponse.json(
        { error: "Invalid consentState structure" },
        { status: 400 }
      );
    }

    // Essential cookies cannot be declined
    if (!consentState.essential) {
      return NextResponse.json(
        { error: "Essential cookies cannot be declined" },
        { status: 400 }
      );
    }

    // Get request metadata - ✅ FIX: Use headers only for IP
    const headersList = await headers();

    // Check multiple headers for IP (in order of preference)
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    const clientIp = headersList.get("cf-connecting-ip"); // Cloudflare

    // x-forwarded-for can contain multiple IPs: "client, proxy1, proxy2"
    const ipAddress = forwardedFor
      ? forwardedFor.split(",")[0].trim() // Take the first (client) IP
      : realIp || clientIp || "unknown";

    const userAgent = headersList.get("user-agent") || "unknown";

    // Log the consent
    const logEntry = await logConsent({
      consentState: body.consentState,
      policyVersion: body.policyVersion,
      locale: body.locale,
      ipAddress,
      userAgent,
      sessionId: body.sessionId,
    });

    // Return only non-sensitive data
    return NextResponse.json(
      {
        success: true,
        logId: logEntry.id,
        timestamp: logEntry.timestamp,
        // Note: Never return hashes or signatures to client
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Consent logging error:", error);
    return NextResponse.json(
      { error: "Failed to log consent" },
      { status: 500 }
    );
  }
}

// Optional: Endpoint to verify log integrity (admin only)
export async function GET(request: NextRequest) {
  // Add authentication check here in production
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { verifyLogIntegrity } = await import("@/lib/consent-logger");
  const result = await verifyLogIntegrity();

  return NextResponse.json(result);
}
