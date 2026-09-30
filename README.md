# Improve Invest — website

Marketing and investor-relations site for Improve Invest A/S: Next.js App Router,
content in an embedded Sanity Studio, UI in Danish (default), English and German.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 ·
next-intl · Sanity · Vercel Blob
**Package manager:** npm, declared via `packageManager`; `.npmrc` sets `engine-strict=true`

## Getting started

```bash
nvm use                      # Node 24; next@16 needs >= 20.9.0, npm needs >= 11.2.0
npm ci                       # aborts on npm < 11.2.0 because of engine-strict
cp .env.example .env.local   # then fill in the values — see below
npm run dev                  # http://localhost:3000
```

The Sanity Studio is at <http://localhost:3000/sanity-studio>.

`NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are not optional:
`sanity/env.ts` throws on startup without them, and `.env.local` is only read when the dev
server starts, so restart after editing it.

## Environment variables

Six values, all described in [`.env.example`](.env.example). Four come from a dashboard, two
you invent yourself.

| Variable                        | Required for    | Source                        |
| ------------------------------- | --------------- | ----------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | always          | Sanity → project → API        |
| `NEXT_PUBLIC_SANITY_DATASET`    | always          | Sanity → project → Datasets   |
| `RESEND_API_KEY`                | contact form    | Resend → API Keys             |
| `BLOB_READ_WRITE_TOKEN`         | consent logging | Vercel → Storage → Blob store |
| `ADMIN_API_KEY`                 | admin endpoints | **you invent it**             |
| `CONSENT_LOG_HMAC_SECRET`       | production      | **you invent it**             |

Invent the last two with `openssl rand -hex 32` and keep them in a password manager. Vercel
never shows a saved Secret again, and `vercel env pull` does not return it either.

Two of them fail quietly:

- **`CONSENT_LOG_HMAC_SECRET`** unset — the logger emits one `console.warn` and signs with an
  empty key. The audit chain still looks valid, but the signatures prove nothing.
- **`RESEND_API_KEY`** unset — `next build` and `next start` fail with `Missing API key`,
  because `app/api/contact/route.ts` constructs the Resend client at module scope.

`npm run build` also needs a reachable Sanity project, since `generateStaticParams` queries
the dataset at build time. `lint`, `typecheck`, `format:check` and `test` need nothing.
Pages that do not touch Sanity (`/gdpr`, `/cookies`) render with no environment at all;
`/om-os`, `/projekter` and `/news/*` need the two Sanity values, and a wrong project id
fails with `Dataset not found` — the credential being wrong, not the code.

## Scripts

| Script                                 | What it does                                                                                |
| -------------------------------------- | ------------------------------------------------------------------------------------------- |
| `npm run dev`                          | Dev server with Turbopack (and the Node inspector).                                         |
| `npm run build` / `npm start`          | Production build and serve. Needs the env vars above.                                       |
| `npm run lint`                         | ESLint over the repository.                                                                 |
| `npm run typecheck`                    | `tsc --noEmit`. Run `npx next typegen` first — see Checks.                                  |
| `npm test`                             | Vitest, running the Storybook stories in headless Chromium. Currently failing — see Checks. |
| `npm run test:watch` / `test:coverage` | The same, in watch mode / with V8 coverage.                                                 |
| `npm run storybook`                    | Storybook on <http://localhost:6006>.                                                       |
| `npm run build-storybook`              | Static Storybook build.                                                                     |
| `npm run prettier` / `format:check`    | Format in place / fail if anything is unformatted.                                          |
| `npm run verify-consent-logs`          | Walk the consent-audit hash chain and report tampering.                                     |

`npm test` drives a real browser, so it needs `npx playwright install chromium` once per
machine.

## Checks

There is **no CI**. `.github/workflows/` was removed, so the scripts above are run by hand.

- `lint` and `format:check` pass as-is.
- `typecheck` needs `npx next typegen` first. `next-env.d.ts` is gitignored and Next only
  writes it on `next dev` / `next build`, but it is what declares the module types for static
  image imports — without it `tsc` fails with `TS2307: Cannot find module '@/public/…'`.
  `next typegen` writes it without building, so it needs no credentials.
- `npm test` fails 15 of the 17 stories with `No intl context found`.
  `.storybook/vitest.setup.ts` composes preview annotations by hand and omits
  `storybook-next-intl/preview`, so the `withNextIntl` decorator never runs under Vitest.
  `npm run storybook` and `build-storybook` are unaffected: those load addon previews from
  `.storybook/main.ts`.

`npm run build` is left to the deploy pipeline.

## Repository layout

```
app/
  (marketing)/     public landing page        /
  (app)/           content pages              /om-os, /investorer, /mira, /projekter,
                                              /projekter/[slug], /news/[slug], /gdpr, /cookies
  (studio)/        embedded Sanity Studio     /sanity-studio
  api/             contact, consent-log, gdpr/manage
components/
  features/        one directory per page section (hero, gallery, projectCarousel, …)
  layouts/         page shells (rootDocument, layoutBody, primaryLayout, marketingLayout)
  providers/       client-side providers (cookie consent)
  ui/              presentational building blocks
messages/          da.json, en.json, de.json, global.json
sanity/            client, env, schema, sanity.config.ts
lib/               i18n, queries, sanity-utils, consent-logger, adminAuth
types/             shared document types (project.ts)
```

The two route groups that render the site — `(marketing)` and `(app)` — share
[`RootDocument.tsx`](components/layouts/rootDocument/RootDocument.tsx) and differ only in the
header they pass in.

`/esg` and `/priip-kid`, with or without a locale prefix, are permanent redirects to the legal
PDFs in `public/files/legal/`, configured in [`next.config.ts`](next.config.ts). They have no
page components.

## Internationalisation

Danish is the default locale. The supported set lives in exactly one place,
[`lib/i18n.ts`](lib/i18n.ts) (`LOCALES`, `DEFAULT_LOCALE`, labels, `resolveLocale`), read from
there by the Sanity Studio language list, the Storybook locale switcher and the header
switcher.

- The active locale is a `locale` cookie written by
  [`LanguageSwitcher`](components/ui/languageSwitcher/LanguageSwitcher.tsx). Server
  components call `getLocale()` from [`lib/i18n.server.ts`](lib/i18n.server.ts); client code
  calls `resolveLocale()`. Anything unrecognised falls back to `da`.
- Strings live in `messages/<locale>.json`, read with
  `useTranslations("<namespace>")` / `getTranslations("<namespace>")` or `useMessages()`.
- Namespaces are `snake_case`: `footer`, `gdpr`, `cookies`, `contact_form`, `navigation`,
  `landing_page`, `mira`, `investors`, `about`, `cookie_banner`, `errors`.
- The three catalogues hold the **same 280 keys**. Add a string to all three: Danish is the
  default locale, so a missing Danish key is a visible bug, not a cosmetic one.
  `messages/global.json` holds shared content (partner bios) that is not per-locale.
- Sanity documents use the `internationalizedArray` plugin, so translations are edited per
  field in the Studio.

## Content (Sanity)

Schemas live in `sanity/schema/` and are registered by hand in `sanity/schema/index.ts` — a
schema file not listed there does nothing. `project-schema.ts` and `news-feed.ts` are the two
document types; they share `globalContentFields` and `galleryField` from `sharedFields.ts`.
`localeStringType.ts` defines the localised string used for titles. The TypeScript shapes are
not in `sanity/schema/` — they live in [`types/project.ts`](types/project.ts).

## Consent and GDPR

- [`CookieConsentProvider`](components/providers/CookieConsentProvider.tsx) keeps the
  visitor's choice in `localStorage` (`gdpr_consent_settings`, with a policy version and a
  365-day expiry) and posts it to `/api/consent-log`.
- [`lib/consent-logger.ts`](lib/consent-logger.ts) appends to the private Vercel Blob
  `consent-audit.log`. Entries form a SHA-256 hash chain (`previousHash` → `currentHash`)
  signed with `CONSENT_LOG_HMAC_SECRET`, and IP addresses are truncated before storage.
  `npm run verify-consent-logs` walks the chain. The signing key was rotated on 2026-09-29
  without keeping the previous value, so `SIGNATURES_VALID_FROM` marks the entries that can
  only be checked against the chain; move that constant forward if you rotate again.
- `GET /api/consent-log` and `GET`/`DELETE /api/gdpr/manage` implement the Article 15 and
  Article 17 requests, all guarded by `verifyAdmin()` (`ADMIN_API_KEY`; accepted header forms
  are in [`.env.example`](.env.example)). Erasure redacts the entry in place, and
  `redactEntry()` recomputes its `currentHash` and `signature` afterwards — the redacted
  fields are part of the hash, so without that the chain would report tampering from the
  erasure onwards.
- The audit log is **never** written to the local filesystem: Vercel's is ephemeral and
  read-only outside `/tmp`. Contact-form submissions are not part of the log; they are
  emailed through Resend and retrieved from that dashboard.

## Code style and commits

ESLint plus Prettier (double quotes, `trailingComma: es5`). For `.ts`/`.tsx` the
typescript-eslint `no-unused-vars` rule is authoritative; the core rule cannot read type
annotations. Husky runs `eslint` on commit and `npm run build` on push. commitlint enforces
Conventional Commits and 100-character lines, and adds three types to the standard set:
`translation`, `security` and `changeset`.

```
feat(projekter): add a filter for sold projects
translation(da): add missing MIRA paragraph
security(gdpr): reject the ?key= query parameter
```
