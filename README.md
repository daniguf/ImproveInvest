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

## Content (Sanity)

Schemas live in `sanity/schema/` and are registered by hand in `sanity/schema/index.ts` — a
schema file not listed there does nothing. `project-schema.ts` and `news-feed.ts` are the two
document types; they share `globalContentFields` and `galleryField` from `sharedFields.ts`.
`localeStringType.ts` defines the localised string used for titles. The TypeScript shapes are
not in `sanity/schema/` — they live in [`types/project.ts`](types/project.ts).


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
