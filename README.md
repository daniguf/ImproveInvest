# Improve Invest — website

Marketing and investor-relations site for Improve Invest A/S, built with the
Next.js App Router. Content is edited in an embedded Sanity Studio; the UI is
available in Danish, English and German.

- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · next-intl · Sanity · Vercel Blob
- **Package manager:** npm (declared via `packageManager`; `.npmrc` sets `engine-strict=true`)

## Prerequisites

| Tool    | Version  | Notes                                                                                                                                                   |
| ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Node.js | ≥ 20.9.0 | `next@16` requires it. `.nvmrc` pins Node 24, which CI reads directly — that is the version this document assumes, and it is the one that ships npm 11. |
| npm     | ≥ 11.2.0 | `.npmrc` sets `engine-strict=true`, so `npm ci` **aborts** on an older npm rather than warning. Node 22 ships npm 10, so run `nvm use` first.           |

```bash
nvm use                      # reads .nvmrc
npm ci
cp .env.example .env.local   # then FILL IN the values, see below
npm run dev
```

The two `NEXT_PUBLIC_SANITY_*` values are not optional: `sanity/env.ts` throws on
startup until both are set, and `.env.local` is only read when the dev server
starts, so restart after editing it. If you copied the file but left the values
empty, you will see `Missing Sanity environment variable(s): …` — that is this.

Open <http://localhost:3000>. The Sanity Studio is embedded at
<http://localhost:3000/sanity-studio>.

## Environment variables

All six are documented in [`.env.example`](.env.example); copy it to
`.env.local`. `.gitignore` ignores `.env*` but keeps `.env.example` tracked.

They come from two different places, which is worth knowing before you go looking
for one:

| Variable                        | Where the value comes from                                   |
| ------------------------------- | ------------------------------------------------------------ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity dashboard -> your project -> API                      |
| `NEXT_PUBLIC_SANITY_DATASET`    | Sanity dashboard -> your project -> Datasets                 |
| `RESEND_API_KEY`                | Resend dashboard -> API Keys                                 |
| `BLOB_READ_WRITE_TOKEN`         | Vercel -> Storage -> your Blob store                         |
| `ADMIN_API_KEY`                 | **You make it up.** Nothing issues it, there is no dashboard |
| `CONSENT_LOG_HMAC_SECRET`       | **You make it up.** Nothing issues it, there is no dashboard |

For the last two, run `openssl rand -hex 32` and keep the result in a password
manager. Vercel never shows a saved Secret value again — only its name — and
`vercel env pull` does not return it either. If you lose one you cannot recover
it, only replace it.

| Variable | Required | Used by |

| Variable                        | Required        | Used by                                                |
| ------------------------------- | --------------- | ------------------------------------------------------ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | always          | [`sanity/env.ts`](sanity/env.ts)                       |
| `NEXT_PUBLIC_SANITY_DATASET`    | always          | [`sanity/env.ts`](sanity/env.ts)                       |
| `RESEND_API_KEY`                | contact form    | [`app/api/contact/route.ts`](app/api/contact/route.ts) |
| `ADMIN_API_KEY`                 | admin endpoints | [`lib/adminAuth.ts`](lib/adminAuth.ts)                 |
| `CONSENT_LOG_HMAC_SECRET`       | **production**  | [`lib/consent-logger.ts`](lib/consent-logger.ts)       |
| `BLOB_READ_WRITE_TOKEN`         | consent logging | `@vercel/blob`                                         |

Two of them you generate yourself — nothing issues them, and once saved in Vercel
they cannot be read back, so put them in a password manager as you create them:

```bash
openssl rand -hex 32    # ADMIN_API_KEY and CONSENT_LOG_HMAC_SECRET
```

Two of these fail quietly, so they are worth reading twice:

- **`CONSENT_LOG_HMAC_SECRET`** — if unset, the logger only emits a
  `console.warn` and goes on signing with an empty key. The audit chain looks
  fine but the signatures prove nothing. Set it in production.
- **`RESEND_API_KEY`** — `app/api/contact/route.ts` constructs the Resend client
  at module scope, so `next build` and `next start` fail without it
  (`Missing API key`). Set it before building locally.

Pages that do not touch Sanity (`/gdpr`, `/cookies`, …) render without any
environment variables at all. The landing page, `/projekter`, `/news/*` and
`/om-os` need the two Sanity values; with a wrong project id they fail with
`Dataset not found`, which is the credential being wrong rather than the code.

`npm run build` also needs a reachable Sanity project, because
`generateStaticParams` queries the dataset at build time. `npm run lint`,
`npm run typecheck`, `npm run format:check` and `npm test` need no environment
variables.

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
  `navigation`, `landing_page`, `mira`, `investors`, `about`, `cookie_banner`,
  `errors` (the shared error/404 copy).
- The three catalogues hold the **same 280 keys**. When you add a string, add it
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
  walks the chain. The signing key was rotated on 2026-09-29 without keeping the
  previous value, so `SIGNATURES_VALID_FROM` in
  [`lib/consent-logger.ts`](lib/consent-logger.ts) marks the entries that can only
  be checked against the chain; move that constant forward if you ever rotate
  again.
- `GET /api/consent-log` and `GET`/`DELETE /api/gdpr/manage` implement the
  Article 15 (access) and Article 17 (erasure) requests. Erasure redacts the
  entry in place rather than deleting the row, and `redactEntry()` recomputes the
  entry's `currentHash` and `signature` afterwards — the redacted fields are part
  of the hash, so without that the chain would report tampering from the erasure
  onwards. All three endpoints are guarded by `verifyAdmin()` (`ADMIN_API_KEY`);
  see [`.env.example`](.env.example) for the accepted header forms.
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

## Checks

**There is no CI workflow.** `.github/workflows/` has been removed, so the scripts
in the table above are run manually. Three things are worth knowing before you run
them on a fresh clone:

- `npm run lint` and `npm run format:check` pass as-is.
- `npm run typecheck` needs `npx next typegen` first. `next-env.d.ts` is
  gitignored and Next only writes it on `next dev` / `next build`, but it is what
  declares the module types for static image imports — without it `tsc` fails with
  `TS2307: Cannot find module '@/public/…'`. `next typegen` writes it without
  building, so it needs no credentials.
- `npm test` does **not** currently pass: 15 of the 17 Storybook stories fail with
  `No intl context found`. `.storybook/vitest.setup.ts` composes preview
  annotations by hand and omits `storybook-next-intl/preview`, so the
  `withNextIntl` decorator never runs under Vitest. `npm run storybook` and
  `npm run build-storybook` are unaffected, because those load addon previews from
  `.storybook/main.ts`.

`npm run build` is not part of any automated check because it needs a reachable
Sanity project and a Resend key, so the deploy pipeline owns it.

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
