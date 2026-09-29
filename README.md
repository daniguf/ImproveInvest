# Improve Invest — website

Marketing and investor-relations site for Improve Invest A/S, built with the
Next.js App Router. Content is edited in an embedded Sanity Studio; the UI is
available in Danish, English and German.

- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · next-intl · Sanity · Vercel Blob
- **Package manager:** npm (declared via `packageManager`; `.npmrc` sets `engine-strict=true`)

## Prerequisites

| Tool    | Version  | Notes                                                                       |
| ------- | -------- | --------------------------------------------------------------------------- |
| Node.js | ≥ 20.9.0 | `next@16` requires it. `.nvmrc` pins Node 22, which CI reads directly.      |
| npm     | ≥ 11.2.0 | `engines` and `engine-strict=true` make `npm install` fail on an older npm. |

```bash
nvm use                 # reads .nvmrc
npm ci
cp .env.example .env.local   # then fill in the values, see below
npm run dev
```

Open <http://localhost:3000>. The Sanity Studio is embedded at
<http://localhost:3000/sanity-studio>.

## Environment variables

All six are documented with placeholder values in [`.env.example`](.env.example);
copy it to `.env.local`. `.gitignore` ignores `.env*` but keeps `.env.example`
tracked.

| Variable                        | Required        | Used by                                                |
| ------------------------------- | --------------- | ------------------------------------------------------ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | always          | [`sanity/env.ts`](sanity/env.ts)                       |
| `NEXT_PUBLIC_SANITY_DATASET`    | always          | [`sanity/env.ts`](sanity/env.ts)                       |
| `RESEND_API_KEY`                | contact form    | [`app/api/contact/route.ts`](app/api/contact/route.ts) |
| `ADMIN_API_KEY`                 | admin endpoints | [`lib/adminAuth.ts`](lib/adminAuth.ts)                 |
| `CONSENT_LOG_HMAC_SECRET`       | **production**  | [`lib/consent-logger.ts`](lib/consent-logger.ts)       |
| `BLOB_READ_WRITE_TOKEN`         | consent logging | `@vercel/blob`                                         |

Two of these fail quietly, so they are worth reading twice:

- **`CONSENT_LOG_HMAC_SECRET`** — if unset, the logger only emits a
  `console.warn` and goes on signing with an empty key. The audit chain looks
  fine but the signatures prove nothing. Set it in production.
- **`RESEND_API_KEY`** — `app/api/contact/route.ts` constructs the Resend client
  at module scope, so `next build` and `next start` fail without it
  (`Missing API key`). Set it before building locally.

`npm run build` also needs a reachable Sanity project, because
`generateStaticParams` queries the dataset at build time. `npm run lint`,
`npm run typecheck` and `npm test` need no environment variables.

## Scripts

| Script                        | What it does                                                      |
| ----------------------------- | ----------------------------------------------------------------- |
| `npm run dev`                 | Next.js dev server with Turbopack (and the Node inspector).       |
| `npm run build` / `npm start` | Production build and serve. Requires the env vars above.          |
| `npm run lint`                | ESLint over the whole repository.                                 |
| `npm run typecheck`           | `tsc --noEmit`.                                                   |
| `npm test`                    | Vitest. Runs the Storybook stories as tests in headless Chromium. |
| `npm run test:watch`          | Same, in watch mode.                                              |
| `npm run test:coverage`       | Same, with V8 coverage.                                           |
| `npm run storybook`           | Storybook on <http://localhost:6006>.                             |
| `npm run build-storybook`     | Static Storybook build.                                           |
| `npm run prettier`            | Format in place.                                                  |
| `npm run format:check`        | Fail if anything is unformatted (used by CI).                     |
| `npm run verify-consent-logs` | Walks the consent-audit hash chain and reports tampering.         |

`npm test` drives a real browser, so it needs the Playwright Chromium build once
per machine: `npx playwright install chromium`.

## Repository layout

```
app/
  (marketing)/        public landing page          /            → app/(marketing)/page.tsx
  (app)/              content pages                /om-os, /investorer, /mira, /projekter,
                                                   /projekter/[slug], /news/[slug], /gdpr, /cookies
  (studio)/           embedded Sanity Studio       /sanity-studio
  api/                contact, consent-log, gdpr/manage
components/
  features/           one directory per page section (hero, gallery, projectCarousel, …)
  layouts/            page shells (rootDocument, layoutBody, primaryLayout, marketingLayout)
  providers/          client-side providers (cookie consent)
  ui/                 presentational building blocks
messages/             da.json, en.json, de.json, global.json
sanity/               client, env, schema, sanity.config.ts
lib/                  i18n, queries, sanity-utils, consent-logger, adminAuth
types/                shared document types (project.ts)
```

The two route groups that render the site — `(marketing)` and `(app)` — share
[`components/layouts/rootDocument/RootDocument.tsx`](components/layouts/rootDocument/RootDocument.tsx)
and differ only in the header they pass in.

`/esg` and `/priip-kid` (with and without a locale prefix) are permanent
redirects to the legal PDFs in `public/files/legal/`, configured in
[`next.config.ts`](next.config.ts). There are no page components for them.

## Internationalisation

Danish is the default locale. The supported set lives in exactly one place,
[`lib/i18n.ts`](lib/i18n.ts) (`LOCALES`, `DEFAULT_LOCALE`, labels,
`resolveLocale`), and is read from there by the Sanity Studio language list, the
Storybook locale switcher, `project.inlang/settings.json`'s counterpart and the
language switcher in the header.

- The active locale is stored in a `locale` cookie written by
  [`LanguageSwitcher`](components/ui/languageSwitcher/LanguageSwitcher.tsx).
  Server components call `getLocale()` from
  [`lib/i18n.server.ts`](lib/i18n.server.ts); client code calls `resolveLocale()`.
  Anything unrecognised falls back to `da`, which also keeps the
  `messages/${locale}.json` import in `i18n/request.ts` on a known path.
- UI strings live in `messages/<locale>.json`. Components either use
  `useTranslations("<namespace>")` / `getTranslations("<namespace>")` or read a
  subtree with `useMessages()`.
- Namespaces are `snake_case`: `footer`, `gdpr`, `cookies`, `contact_form`,
  `navigation`, `landing_page`, `mira`, `investors`, `about`, `cookie_banner`.
- The three catalogues hold the **same 278 keys**. When you add a string, add it
  to all three — Danish is the default locale, so a missing Danish key is a
  visible bug, not a cosmetic one. `messages/global.json` holds shared content
  (partner bios) that is not per-locale.
- Sanity documents use the `internationalizedArray` plugin (`sanity/sanity.config.ts`),
  so translations are edited per field in the Studio.

## Content (Sanity)

Schemas live in `sanity/schema/` and are registered by hand in
`sanity/schema/index.ts` — a schema file that is not listed there does nothing.

- `project-schema.ts` and `news-feed.ts` are the two document types. They share
  `globalContentFields` and `galleryField` from `sharedFields.ts`.
- `localeStringType.ts` defines the localised string object used for titles.
- The TypeScript shapes for these documents are **not** in `sanity/schema/`;
  they live in [`types/project.ts`](types/project.ts).

## Consent and GDPR

- [`components/providers/CookieConsentProvider.tsx`](components/providers/CookieConsentProvider.tsx)
  keeps the visitor's choice in `localStorage` (`gdpr_consent_settings`, with a
  policy version and a 365-day expiry) and posts it to `/api/consent-log`.
- [`lib/consent-logger.ts`](lib/consent-logger.ts) appends an entry to the
  private Vercel Blob `consent-audit.log`. Entries form a SHA-256 hash chain
  (`previousHash` → `currentHash`) signed with `CONSENT_LOG_HMAC_SECRET`, and IP
  addresses are truncated before they are stored. `npm run verify-consent-logs`
  walks the chain.
- `GET /api/consent-log` and `GET`/`DELETE /api/gdpr/manage` implement the
  Article 15 (access) and Article 17 (erasure) requests. Erasure anonymises the
  entry in place so the chain stays verifiable rather than deleting rows. All
  three are guarded by `verifyAdmin()` (`ADMIN_API_KEY`); see
  [`.env.example`](.env.example) for the accepted header forms.
- The audit log is **never** written to the local filesystem: Vercel's
  filesystem is ephemeral and read-only outside `/tmp`.
- Contact-form submissions are _not_ part of the audit log — they are emailed
  through Resend and have to be retrieved from the Resend dashboard.

## Code style and commits

- ESLint (`eslint.config.mjs`) plus Prettier (`.prettierrc`, double quotes,
  `trailingComma: es5`). For `.ts`/`.tsx` the typescript-eslint
  `no-unused-vars` rule is authoritative; the core rule is disabled there
  because it cannot read type annotations.
- Husky runs `eslint` on commit and `npm run build` on push.
- commitlint enforces Conventional Commits, max 100 characters per line, and
  allows three project-specific types in addition to the standard ones:
  `translation`, `security` and `changeset`.

  ```
  feat(projekter): add a filter for sold projects
  translation(da): add missing MIRA paragraph
  security(gdpr): reject the ?key= query parameter
  ```

## CI

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs lint, typecheck and
the Storybook test suite on every push and pull request. It deliberately does
not run `npm run build`: that needs a reachable Sanity project and a Resend key,
so the deploy pipeline owns it.

## Handover notes

- **Git history still contains `logs/consent-audit.log`**, a local test artefact
  holding a visitor IP and user-agent, even though the file is untracked now.
  If that is unacceptable, rewrite history with `git filter-repo` _before_
  transferring the repository — the rewrite is destructive and needs to be
  coordinated with anyone holding a clone.
- The _Right to Restriction of Processing_ section of
  [`app/(app)/gdpr/page.tsx`](<app/(app)/gdpr/page.tsx>) renders
  `right_to_data_portability.paragraph_1`; it has no body text of its own yet.
- `public/` still holds roughly 27 MB of legacy Wix-era assets that nothing in
  this repository references. A Sanity editor may have pasted one of those paths
  into a document body, so confirm against the production dataset before
  deleting them.
- See [`docs/HANDOVER-CLEANUP.md`](docs/HANDOVER-CLEANUP.md) for the full audit
  this work came out of.
