import { NextRequest, NextResponse } from "next/server";

/**
 * Shared admin authentication for the internal consent-audit endpoints
 * (`/api/consent-log` GET and `/api/gdpr/manage`).
 *
 * The key is read from the environment per request, so a rotated or late
 * `ADMIN_API_KEY` takes effect without a redeploy. Two placements are accepted:
 * `Authorization: Bearer <key>` and `x-admin-key: <key>`. The `?key=` query
 * parameter is deliberately not accepted — it leaks the secret into request
 * logs, proxy access logs and browser history.
 *
 * Returns a response to send back on failure, or `null` when the request is
 * authorised.
 */
export function verifyAdmin(request: NextRequest): NextResponse | null {
  const adminKey = process.env.ADMIN_API_KEY;

  // Fail closed and loudly: an unset key must never authorise anyone.
  if (!adminKey) {
    console.error("ADMIN_API_KEY is not configured; admin routes are disabled");
    return NextResponse.json(
      { error: "Admin API is not configured" },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get("authorization");
  const bearerKey = authHeader?.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : null;
  const providedKey = bearerKey || request.headers.get("x-admin-key");

  if (providedKey !== adminKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
