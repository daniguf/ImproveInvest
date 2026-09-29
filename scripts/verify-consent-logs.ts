import { loadEnvConfig } from "@next/env";

/**
 * Walk the consent-audit hash chain and report tampering.
 *
 * `tsx` does not read `.env.local` the way the Next runtime does, so the env is
 * loaded explicitly here. It has to happen *before* `lib/consent-logger.ts` is
 * evaluated, because that module captures `CONSENT_LOG_HMAC_SECRET` at module
 * scope - hence the dynamic import rather than a top-level one.
 */
async function main() {
  loadEnvConfig(process.cwd());

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error(
      "BLOB_READ_WRITE_TOKEN is not set, so the audit log cannot be read.\n" +
        "Add it to .env.local (see .env.example) - it is in Vercel under\n" +
        "Storage -> your Blob store -> the `.env.local` tab."
    );
    process.exit(1);
  }

  const { verifyLogIntegrity } = await import("@/lib/consent-logger");

  console.log("Verifying consent log integrity...");

  const signed = Boolean(process.env.CONSENT_LOG_HMAC_SECRET);
  if (!signed) {
    console.warn(
      "WARNING: CONSENT_LOG_HMAC_SECRET is not set, so only the hash chain is\n" +
        "checked and the tamper-evident signatures are skipped. A 'valid' result\n" +
        "below is therefore weaker than it looks."
    );
  }

  const result = await verifyLogIntegrity();

  if (result.valid) {
    console.log(
      signed
        ? "Log chain is valid and every signature matches."
        : "Log chain is valid (hash chain only)."
    );
    if (result.message) {
      console.log(result.message);
    }
    process.exit(0);
  }

  console.error("Log integrity check failed:", result.error);

  const stats = result.stats;
  if (stats) {
    console.error(
      [
        "",
        `  entries in the log        : ${stats.entries}`,
        `  written before any key    : ${stats.unsigned} (never signed, cannot be checked)`,
        `  chain breaks              : ${stats.chainBreaks}`,
        `  content hash mismatches   : ${stats.hashMismatches}`,
        `  signature mismatches      : ${stats.signatureMismatches}`,
      ].join("\n")
    );

    if (stats.chainBreaks === 0 && stats.hashMismatches === 0) {
      console.error(
        [
          "",
          "  Every entry's content still matches its own hash and the chain links are",
          "  intact, so nothing in the log was rewritten. Only the signatures fail, which",
          "  is what a changed CONSENT_LOG_HMAC_SECRET looks like - including the case",
          "  where .env.local and Vercel hold different values for it.",
          "  See docs/HANDOVER-CLEANUP.md.",
        ].join("\n")
      );
    } else {
      console.error(
        [
          "",
          "  Entries do not match their own hashes, or the links between them are broken.",
          "  That is what an altered log looks like. Treat it as a real integrity failure.",
        ].join("\n")
      );
    }

    if (result.problems && result.problems.length > 1) {
      console.error(`\n  First ${result.problems.length} problems:`);
      for (const problem of result.problems) console.error(`    - ${problem}`);
    }
  }

  process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
