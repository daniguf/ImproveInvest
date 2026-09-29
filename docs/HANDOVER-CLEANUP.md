# Handover Cleanup Report

Audit of repository structure and code quality ahead of handover to a new team.
Scope: **code and repository hygiene only** — dead code, duplication, comments, naming,
config, tracked artefacts. No files were modified to produce this report.

Repository: `ImproveInvest` · branch `dev` @ `c080b38` · 229 tracked files
Audited: full `git ls-files` inventory, import graph traced by content search,
byte-level comparison (md5) of suspected duplicates.

> **Verification limitation:** `node_modules` is not installed and `npm ci` fails in this
> environment (`EACCES` on the npm cache), so `npm run lint` and `tsc --noEmit` could not
> be executed. Every finding below is justified by direct file inspection rather than by
> compiler output. Run both commands before finalising the handover — see
> [§8](#8-verification-gaps).

Severity key: 🔴 blocking / embarrassing · 🟠 should fix before handover · 🟡 polish · ⚪ optional

---

## 0. Resolution status

This report has been actioned on branch `chore/handover-cleanup`, cut from `dev` at
`c080b38`. Findings 1–20 and 22 are resolved. What follows is the per-finding outcome;
the sections further down are left as the audit wrote them, so they still describe the
state of `dev`.

| #   | Finding                                             | Outcome                                                                  |
| --- | --------------------------------------------------- | ------------------------------------------------------------------------ |
| 1   | `logs/consent-audit.log` committed                  | Fixed — untracked, `logs/` ignored. Still in history, see §7.            |
| 2   | Two storage backends for the audit chain            | Fixed — both halves use Vercel Blob.                                     |
| 3   | 267 KB `ImproveInvestLogo` component                | Deleted.                                                                 |
| 4   | Unreferenced component/config directories           | Deleted.                                                                 |
| 5   | Byte-identical `BaseTemplate` triplicates           | Deleted (nothing consumed them).                                         |
| 6   | Machine-generated `i18n` keys and 4 dead namespaces | Fixed — see the note below, the audit undercounted the dead namespaces.  |
| 7   | 0-byte `curl` at the repository root                | Deleted.                                                                 |
| 8   | `app/manifest.json` placeholder                     | Renamed; the two icons are generated from the existing brand mark.       |
| 9   | `.nvmrc` pins Node 18                               | Node 22; `engines.node` `>=20.9.0`.                                      |
| 10  | README is framework boilerplate                     | Rewritten.                                                               |
| 11  | No `.env.example`                                   | Added — six variables, not five (see below).                             |
| 12  | `messages/versions/`                                | Deleted.                                                                 |
| 13  | `sampleTextProp` scaffolding                        | Removed.                                                                 |
| 14  | `lib/sanity.ts` duplicate client                    | Deleted.                                                                 |
| 15  | Locale list hard-coded in five places               | Fixed — `lib/i18n.ts` is the single source.                              |
| 16  | Four `eslint-disable` comments                      | Fixed — see the note below, three of them were _not_ unnecessary.        |
| 17  | `console.log` on render paths                       | Removed.                                                                 |
| 18  | ~27 MB of legacy Wix assets                         | **Deferred** — see "Deliberately not done".                              |
| 19  | Unused dependencies, inert `resolutions`            | Removed; `packageManager` added.                                         |
| 20  | Test harness unreachable                            | `test`, `test:watch`, `test:coverage` scripts added; CI runs them.       |
| 21  | Slug page logs before its null check                | Fixed (the log is gone).                                                 |
| 22  | No CI workflow                                      | `.github/workflows/ci.yml` runs lint, typecheck, format check and tests. |

Three places where carrying the fix out contradicted the audit, worth knowing about:

- **§4.2 — eight dead namespaces, not four.** Besides `header`, `om-os`,
  `hvorfor-investere` and `hvem-er-improve-invest-a-s`, `home`, `esg`, `priip-kid`
  and `projects` are referenced by nothing either (the pages for the last two are
  now redirects). Removing all eight takes the English catalogue from 552 to 275
  keys and, because 149 of the 150 missing Danish keys lived in them, leaves the
  three locales at exact parity instead of needing 150 new translations.
- **§4.1 — the hash keys are referenced.** They are not unreferenced at all:
  `app/(app)/gdpr/page.tsx` and `app/(app)/cookies/page.tsx` call `t("a0ee3b9")`
  and friends 79 times, so they were renamed rather than deleted.
- **§5.3 — three of the four `eslint-disable` comments were load-bearing.** The
  core `no-unused-vars` rule cannot parse type annotations, so it really was
  flagging `onChange: (checked: boolean) => void`. `.ts`/`.tsx` now use the
  typescript-eslint rule, which also fixes the "the two rules can disagree" note.
  The fourth suppressed a genuine `set-state-in-effect`; the consent state is now
  restored in a lazy client-only initialiser instead.

The internationalisation outcome in numbers, checked against the tree:

|                                   | `en` | `da` | `de` |
| --------------------------------- | ---- | ---- | ---- |
| Keys before                       | 552  | 402  | 548  |
| Keys after                        | 280  | 280  | 280  |
| Machine-generated hash keys after | 0    | 0    | 0    |
| Empty-string values after         | 0    | 0    | 0    |

Every `t()` call in the repository (153 of them) resolves in all three catalogues, and
the English, Danish and German text rendered by the GDPR and cookie-policy pages in
document order is byte-identical to what those pages rendered before the key rename.

Keys whose English and Danish values are identical: **51 before** (48 once the three empty
values are excluded — the audit said 43), **27 now**. All 27 that remain are legitimately
language-neutral: partner names, `Partner`, `E-mail`, addresses, `CVR`, `MIRA`,
`Governance`, `GDPR`/`Cookies`/`ESG`/`PRIIP` and a `/mira/…` image path.

### Deliberately not done

- **§5.5 — asset handling and filenames.** Moving the images that are only reached
  through the bundler out of `public/` would stop them being served twice, but it
  also removes public URLs that something outside this repository may still point
  at, and the `placeholder="blur"` prop needs the static import. Renaming
  `public/other/potrait_Skærmbillede 2025-11-26 204620.jpg` and friends changes
  live production URLs. Both are URL-visible changes that need a decision from
  whoever owns the deployment, so they are left alone. The dead `image_src`
  values in `messages/global.json` were removed.
- **§6.10 — removing the `static.wixstatic.com` image host.** Done, contrary to
  this list. Nothing referenced it.
- **§7 — git history.** `logs/consent-audit.log` is still in history. Rewriting it
  is destructive and has to be coordinated with everyone holding a clone, so it is
  a decision for the receiving team.
- **§9 — the ~27 MB of legacy Wix assets.** Left in place, as the audit advises:
  nothing in this repository references them, but a Sanity editor may have pasted
  one of those paths into a document body. Confirm against the production dataset
  first.

---

## 1. Executive summary

The codebase is in reasonable working order — it builds, the App Router structure is
sensible, and the Storybook/commitlint/Husky tooling is a genuine plus. The problems are
concentrated in **accumulated leftovers**, not in architecture: superseded components,
duplicated config, a committed runtime log containing visitor data, machine-generated
translation keys, and a few configuration bugs that will bite the next team on day one.

| #   | Finding                                                                                                          | Severity | Effort |
| --- | ---------------------------------------------------------------------------------------------------------------- | -------- | ------ |
| 1   | `logs/consent-audit.log` committed — runtime log with IP address, user-agent, session IDs                        | 🔴       | 15 min |
| 2   | GDPR admin endpoint reads a local file while the logger writes to Vercel Blob — the two halves disagree          | 🔴       | 1–3 h  |
| 3   | `components/assets/ImproveInvestLogo/` — 14,266 lines / 267 KB of inline base64 SVG, completely unreferenced     | 🔴       | 10 min |
| 4   | 8 unreferenced component/config directories, incl. three competing project carousels                             | 🟠       | 2–3 h  |
| 5   | `components/templates/base/` and `components/ui/base/` — byte-identical triplicates                              | 🟠       | 15 min |
| 6   | 173 machine-generated `i18n` keys (`gdpr.a0ee3b9`) + 4 unused namespaces + 150 keys missing from the Danish file | 🟠       | 4–8 h  |
| 7   | `curl` — a 0-byte file tracked at the repository root                                                            | 🟠       | 2 min  |
| 8   | `app/manifest.json` names the site "MyWebSite"/"MySite" and points at two icons that do not exist                | 🟠       | 20 min |
| 9   | `.nvmrc` pins Node 18 while `next@16` requires ≥ 20.9 — the documented setup path is broken                      | 🟠       | 10 min |
| 10  | README is still the `create-next-app` boilerplate and references a file that does not exist                      | 🟠       | 1 h    |
| 11  | No `.env.example` — 5 required environment variables are undocumented                                            | 🟠       | 30 min |
| 12  | `messages/versions/` — 5 superseded catalogues (138 KB), including `copy copy.json`                              | 🟠       | 10 min |
| 13  | `sampleTextProp` scaffolding left in 21 components; nothing consumes it                                          | 🟡       | 1 h    |
| 14  | `lib/sanity.ts` duplicates `sanity/client.ts`; only the latter is imported                                       | 🟡       | 10 min |
| 15  | Locale list hard-coded in 5 places, 3 of which disagree                                                          | 🟡       | 2 h    |
| 16  | 4 `eslint-disable` comments, 3 of which are unnecessary and 1 of which masks a real issue                        | 🟡       | 30 min |
| 17  | 4 `console.log` calls left in production render paths                                                            | 🟡       | 10 min |
| 18  | ~27 MB of unreferenced Wix-era assets in `public/`                                                               | 🟡       | 1 h    |
| 19  | 3 unused npm dependencies; `resolutions` is a no-op under npm                                                    | 🟡       | 30 min |
| 20  | Test harness is fully configured but unreachable — no `test` script, zero test files                             | 🟡       | 1 h    |
| 21  | `app/(app)/projekter/[slug]/page.tsx` logs before its null check (would throw on a missing project)              | 🟡       | 15 min |
| 22  | No CI workflow; `pre-push` runs a full build on the developer's machine instead                                  | ⚪       | 2 h    |

---

## 2. 🔴 Blocking issues

### 2.1 A runtime log containing visitor data is committed to git

`logs/consent-audit.log` (2,867 B) is tracked. It contains real recorded entries:

```json
{"id":"1776695364984-7inoo4sgxdu","timestamp":"2026-04-20T14:29:24.984Z",
 "consentState":{...},"locale":"da","ipAddress":"::1::",
 "userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) ... Chrome/147.0.0.0 ...",
 "sessionId":"1776695364671-m0zrg76c0x8","previousHash":"genesis", ...}
```

Three separate problems:

1. **Privacy.** This is the GDPR audit trail itself, and it is sitting in version control,
   inside a repository that is about to be handed to a third party.
2. **Repository hygiene.** It is a mutable append-only file: every local run of the consent
   endpoint dirties the working tree.
3. **It is not ignored.** `.gitignore` covers `npm-debug.log*`, `yarn-debug.log*`,
   `yarn-error.log*`, `.pnpm-debug.log*` and `*storybook.log` — but nothing matches `logs/`.

**Action:** `git rm --cached logs/consent-audit.log`, add `logs/` to `.gitignore`.
Note that the file remains in git history — see [§7](#7-git-history-and-secrets).

### 2.2 The consent-audit feature is split across two incompatible storage backends

This is the most consequential _functional_ defect found, and it will confuse the receiving
team more than any dead file.

- `lib/consent-logger.ts` writes and reads the audit chain through **Vercel Blob**
  (`@vercel/blob` `get`/`put`, `BLOB_KEY = "consent-audit.log"`, lines 2, 32, 82, 196).
- `app/api/gdpr/manage/route.ts:5,22,84,107` reads and rewrites a **local filesystem file**
  at `join(process.cwd(), "logs", "consent-audit.log")`.

The two never meet. Consequently:

- The admin `GET`/`DELETE` GDPR endpoints (Article 15 / Article 17 handling) operate on a
  file that production never writes to.
- `logs/consent-audit.log` in the repository is a local test artefact, not a copy of the
  production audit trail.
- The local-file approach cannot work in the deployed environment at all: Vercel's
  filesystem is ephemeral and read-only outside `/tmp`.

**Action:** point `app/api/gdpr/manage/route.ts` at the same blob store (reuse
`readLogContent`/`put` from `lib/consent-logger.ts`), or explicitly document that DSAR
handling is a manual, out-of-band process. Either way, delete the committed log.

### 2.3 A 267 KB dead component is the largest file in the codebase

`components/assets/ImproveInvestLogo/ImproveInvestLogo.tsx` — **14,266 lines, 273,568 bytes**
of inline base64 SVG. Nothing outside its own directory imports it (the live logo is
`public/logo/brand/improve-invest-white.png`, used in `Footer.tsx:20`, `NavItems.tsx:84`,
`MobileNav.tsx:64`). Its `.mocks.ts` and `.stories.tsx` are equally unreferenced.

A reviewer opening this repository will see a 14,000-line file in the tree. Remove the whole
directory (`components/assets/ImproveInvestLogo/`).

---

## 3. 🟠 Dead code and structural duplication

### 3.1 Unreferenced component directories

Each of these is imported nowhere outside its own folder. Delete entire directories:

| Directory                                        | Notes                                                                                                                                     |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `components/assets/ImproveInvestLogo/`           | 14,266 lines of base64 SVG (§2.3)                                                                                                         |
| `components/assets/pointedArrow/`                | superseded by `lucide-react` icons                                                                                                        |
| `components/features/projectsCarousel/`          | dead carousel #2; its exported function is _also_ named `ProjectCarousel`, which will collide with the live one during any naive refactor |
| `components/features/projectShowcaseCarousel/`   | dead carousel #3                                                                                                                          |
| `components/features/landingPageContentSection/` | 196 lines + mocks + stories, unreferenced                                                                                                 |
| `components/templates/base/`                     | duplicate of `components/ui/base/`                                                                                                        |
| `components/ui/base/`                            | duplicate — keep at most one `BaseTemplate`                                                                                               |
| `sanity/schema/localeBlockContentType.ts`        | entire file commented out, not registered in `sanity/schema/index.ts`                                                                     |

Also dead, single files or symbols:

- `lib/sanity.ts` — a second Sanity client, functionally identical to `sanity/client.ts`
  (which is the one imported in 5 places). Two files export the same name, `sanityClient`.
- `lib/consent-logger.ts:206` — `export const _test = {...}`, commented "Export for testing",
  but the repository contains **zero test files**.
- `sanity/schema/localeStringType.ts:12` — `baseLanguage`, referenced only by its own definition.
- `lib/consent-logger.ts:36` `anonymizeIp` and `:5` `ConsentLogEntry` — exported but only
  used within their own module; the export is misleading.

### 3.2 Three project carousels where one is needed

| File                                                                      | Lines | Status   |
| ------------------------------------------------------------------------- | ----- | -------- |
| `components/features/projectCarousel/ProjectCarouselClient.tsx`           | 145   | **live** |
| `components/features/projectsCarousel/ProjectsCarousel.tsx`               | 156   | dead     |
| `components/features/projectShowcaseCarousel/ProjectShowcaseCarousel.tsx` | 148   | dead     |

They implement the same feature three different ways (CSS scroll-snap vs `translateX`),
read three different translation namespaces (`landing_page.pc.*`, `home.*`, `landing_page.*`)
and render navigation arrows two different ways (literal `←`/`→` characters vs inline SVG).
Keep only `projectCarousel/`, and move `ProjectCarouselClient` next to its server wrapper as a
single module directory.

### 3.3 Byte-identical files

Verified with `md5sum` and `diff`:

- `components/templates/base/BaseTemplate.{tsx,mocks.ts,stories.tsx}` are **byte-identical** to
  `components/ui/base/BaseTemplate.{tsx,mocks.ts,stories.tsx}`. Two conventions for the same
  thing — pick one and delete the other.
- `sanity/schema/news-feed.ts:26-72` is a **byte-identical** copy of
  `sanity/schema/sharedFields.ts:34-80` (a 48-line `gallery` field definition). Extract to one
  shared export. This is a real DRY violation: a change to the gallery field must be made twice.
- `public/misc/placeholder.png`, `placeholder-1.png`, `placeholder-2.png` are byte-identical
  and all three are unreferenced.

### 3.4 Near-duplicate file pairs

- `app/(app)/layout.tsx` and `app/(marketing)/layout.tsx` are identical except for one import
  and one child (`PrimaryLayout` vs `MarketingLayout`).
- `components/layouts/primaryLayout/PrimaryLayout.tsx` and
  `components/layouts/marketingLayout/MarketingLayout.tsx` are identical except for the header
  component and the exported name (`Header` vs `HeaderSecondary`).
- `app/api/consent-log/route.ts` and `app/api/gdpr/manage/route.ts` each implement their own
  admin authentication, differently — `Authorization: Bearer <ADMIN_API_KEY>` vs
  `x-admin-key` header **or** a `?key=` query parameter (which leaks the secret into logs).
  Extract one shared `verifyAdmin(request)` helper.

### 3.5 Vestigial scaffolding: `sampleTextProp`

`sampleTextProp` is declared in **21 components**, supplied from exactly one call site
(`app/(marketing)/page.tsx:15`, `<WhyInvest sampleTextProp="" />`), and consumed by nothing
except the dead `BaseTemplate`. It appears in `Hero`, `WhyInvest`, `MarketStrategy`,
`Governance`, `InvestmentModel`, `HowWeCreateValue`, `BuildingsWithIdententyAndPotential`,
`LandingPageContentSection` and most of `components/ui/**`.

Worse, `components/ui/header/Header.tsx:5-7` declares it as a **required** prop:

```tsx
export interface IHeader {
  sampleTextProp: string;
}

const Header: React.FC = () => {          // <- no props parameter at all
```

`IHeader` is imported nowhere, the component ignores it, and it is rendered as `<Header />`
(`MarketingLayout.tsx:11`). Remove the interface and the prop from every component.

### 3.6 Unreachable pages

`next.config.ts:21-39` permanently redirects both `/esg` and `/:locale/esg` to a PDF, and both
`/priip-kid` and `/:locale/priip-kid` likewise. The corresponding page components still exist:

- `app/(app)/esg/page.tsx` (87 lines)
- `app/(app)/priip-kid/page.tsx` (233 lines)

Nothing can route to them. Their only inbound link is from the dead
`LandingPageContentSection.tsx:161`. Decide: delete the pages, or drop the redirects.

---

## 4. 🟠 Internationalisation health

The message catalogues are the weakest part of the repository, and the receiving team will
have to work in them constantly.

### 4.1 Machine-generated keys

**173 of 552 English keys (31%)** have auto-generated hash names such as `gdpr.a0ee3b9`,
`om-os.5e8a5f1`, `home.0513bdd`, `cookies.2d4b431`. Distribution:

| Namespace                    | Hashed keys |
| ---------------------------- | ----------- |
| `gdpr`                       | 72          |
| `home`                       | 55          |
| `hvem-er-improve-invest-a-s` | 19          |
| `om-os`                      | 10          |
| `cookies`                    | 9           |
| `hvorfor-investere`          | 8           |

These are unreadable and un-greppable: to find the source of a string you must search three
JSON files rather than one. **None are referenced by any `t()` call** — the namespaces that
contain most of them are unreferenced entirely (below).

### 4.2 Four namespaces are never referenced by any component

`header`, `om-os`, `hvorfor-investere`, `hvem-er-improve-invest-a-s` — 0 code references.
The `header.*` keys (`header.home`, `header.aboutUs`, …) are particularly confusing, because
navigation is actually driven by the separate `navigation` namespace.

### 4.3 The Danish catalogue is 150 keys short

| Locale | Keys    |
| ------ | ------- |
| `en`   | 552     |
| `de`   | 548     |
| `da`   | **402** |

Danish is the application's default locale (`i18n/request.ts:12` falls back to `"da"`), yet it
is missing all `header.*` keys and 144 others present in English. Any string looked up in a
`da` context for a missing key will render the key path or fall back to the default locale.
`de` is missing 6 keys.

Three keys hold empty strings in **all three** locales and will produce links with no
destination: `esg.table.row_3.col_2`, `landing_page.hero.ctas.read_more.href`,
`landing_page.investment_model.cta.read_more.href`.

A further 43 keys have **identical English and Danish values** — mostly short labels (brand
names, `cvr`, legal link captions) where that may be intentional, but it is worth a pass to
confirm none are simply untranslated.

### 4.4 Inconsistent namespace naming

Three conventions coexist in one file:

- kebab-case Danish: `om-os`, `priip-kid`, `hvorfor-investere`, `hvem-er-improve-invest-a-s`
- snake_case English: `landing_page`, `cookie_banner`
- PascalCase: `ContactForm`

And the semantics overlap: `about` vs `om-os`, `investors` vs `hvem-er-improve-invest-a-s`.
Pick one convention and one name per concept.

### 4.5 Superseded catalogues

`messages/versions/` holds five stale copies (138 KB) referenced by nothing —
`da_old.json`, `de.json`, `en.json`, `copy.json` and `copy copy.json`. The last one carries a
space in its filename, an unmistakable filesystem-copy artefact. `copy.json` and
`copy copy.json` differ from each other, so nothing here is a safe reference point.
`i18n/request.ts:13` only ever loads `../messages/${locale}.json`. Delete the directory.

### 4.6 Locale list hard-coded in five places, three of which disagree

| Location                                 | Locales declared                                     |
| ---------------------------------------- | ---------------------------------------------------- |
| `sanity/sanity.config.ts:17-21`          | da, en, de                                           |
| `sanity/schema/localeStringType.ts:6-10` | da, en, de                                           |
| `.storybook/preview.ts:8-12`             | da, en, de                                           |
| `i18n/request.ts`                        | da, en, de (comment only; the list is commented out) |
| `project.inlang/settings.json`           | **en only**                                          |

Additionally the cookie-reading fallback `store.get("locale")?.value \|\| "da"` is copy-pasted
across 5 files (`news/[slug]/page.tsx:24`, `projekter/[slug]/page.tsx:24`,
`projekter/page.tsx:12`, `mira/page.tsx:6`, `projectCarousel/ProjectCarousel.tsx:9`).

Extract a single `lib/i18n.ts` exporting `LOCALES`, `DEFAULT_LOCALE` and
`getLocale(): Promise<string>`, and have Sanity, Storybook and inlang read from it.

---

## 5. 🟡 Code-quality details

### 5.1 `console.log` left on production render paths

| Location                                     | Statement                                          |
| -------------------------------------------- | -------------------------------------------------- |
| `app/(app)/projekter/[slug]/page.tsx:29`     | `console.log("projectpage", project.content?.[2])` |
| `components/features/gallery/Gallery.tsx:37` | `console.log("item", item)`                        |
| `components/features/gallery/Gallery.tsx:38` | `console.log(item._type)`                          |
| `components/features/gallery/Gallery.tsx:59` | `console.log(item)`                                |

There are no `TODO`, `FIXME`, `HACK`, `@ts-ignore` or `@ts-expect-error` comments anywhere,
and only 4 `eslint-disable` comments — the codebase is otherwise clean of this kind of noise.

### 5.2 The slug page logs before it checks for null

```tsx
const project: Project = await sanityClient.fetch(projectBySlugQuery, {
  slug,
  locale,
});
console.log("projectpage", project.content?.[2]); // line 29
if (!project) notFound(); // line 31
```

The optional chaining covers `content`, not `project`. A slug that matches no Sanity document
throws at line 29 instead of reaching `notFound()`. Move the log after the guard (or delete it).

### 5.3 `eslint-disable` comments

| Location                            | Assessment                                                                                                                                                                                                                                    |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contactForm/ContactForm.tsx:58`    | **Unnecessary and misleading.** The disable sits on a `catch (error)` block where `error` is genuinely unused. The correct fix is `catch {` — no suppression needed.                                                                          |
| `cookieBanner/CookieBanner.tsx:126` | **Unnecessary.** The disable is on a _type annotation_ (`onChange: (checked: boolean) => void`); the `no-unused-vars` rule does not apply to type declarations.                                                                               |
| `cookieConsentProvider.tsx:23`      | **Unnecessary for the same reason** (type annotation).                                                                                                                                                                                        |
| `cookieConsentProvider.tsx:112`     | **Masks a real issue.** Disables `react-hooks/set-state-in-effect` for a `setIsClient(true)` hydration flag. This is a legitimate lint complaint about a real render pattern; it deserves a comment explaining why it is safe, or a refactor. |

Note also `eslint.config.mjs:26-36` redefines `no-unused-vars` with `argsIgnorePattern: "^_"`,
but the TypeScript-aware `@typescript-eslint/no-unused-vars` from `eslint-config-next` is what
actually applies to `.ts`/`.tsx` — the two can disagree. Worth reconciling during handover.

### 5.4 Comments that do not belong in a handed-over codebase

Confirmation-mark comments left over from a debugging session, in
`app/(app)/news/[slug]/page.tsx:20-26` and `app/(app)/projekter/[slug]/page.tsx:20-26`:

```tsx
params: Promise<{ slug: string }>; // ✅ params is a Promise
const { slug } = await params;     // ✅ UNWRAP the Promise
  slug,                            // ✅ now pass the actual string value
```

Also `contactForm/ContactForm.tsx:175` (`{/* ✅ GDPR Consent Checkbox */}`) and
`sanity/client.ts:8` (`// ✅ safe for production...`), plus generator header comments that
repeat the file path (`// components/features/gallery/Gallery.tsx` at `Gallery.tsx:1`).

Conversely, `components/features/hero/Hero.tsx:47` and
`landingPageContentSection/LandingPageContentSection.tsx:47` carry **shouty Danish section
labels in block comments** describing the design intent. Those are useful — normalise their
style rather than deleting them.

### 5.5 Inconsistent asset handling

Two patterns coexist with no rule:

- **String paths:** `src="/hero_section_bg.jpg"` (`Hero.tsx:15`), `src="/other/risiko_indikator.png"`
- **Module imports:** `import lab from "@/public/laboratorium.jpg"` (`BuildingsWithIdententyAndPotential.tsx:8`),
  `import map from "@/public/et_marked_updated.png"` (`MarketStrategy.tsx:6`),
  `import selektiv_udv from "@/public/selektiv_udvælgelse.png"` (`HowWeCreateValue.tsx:11`)

The import form pulls the file through the bundler with its own hashing/optimisation, so the
same asset ends up both statically served from `public/` **and** bundled — duplicated bytes in
the deployment. Choose one convention.

Asset **filenames** are also a problem: `public/other/potrait_Skærmbillede 2025-11-26 204620.jpg`
contains a typo, a space and Danish characters; `public/other/Elementor-post-screenshot_24_2024-04-15-01-39-53_2d3e0ab2.png`
and `public/stock/businesss-man-working-on-his-laptop-in-an-office-e1696235215228.jpg` are
unedited CMS export names, and the latter contains a typo ("businesss"). These appear in
production URLs.

### 5.6 Inline SVG duplication

9 component files contain hand-rolled `<svg>` markup (play triangle, close ×, arrows) while
`lucide-react` is already a dependency and `components/assets/pointedArrow/PointedArrowSVG.tsx`
exists — the latter itself unreferenced. Standardise on `lucide-react`.

### 5.7 A type file sitting in the Sanity schema directory

`sanity/schema/project.ts` is **not** a schema — it holds `SanityImage`, `SanityVideo`,
`GalleryItem` and `Project` interfaces plus a `getFeaturedImage` helper, and it _is_ live
(8 import sites). Its name and location invite the receiving team to delete it as a duplicate
of `project-schema.ts`. Move it to `types/project.ts` (its own header comment already says
`// types/project.ts`, so that was the original intent).

Relatedly, `Project._type` is typed as `"project" | "newsfeed"` and `GalleryItem._type` as
`"Image" | "videoFile"` — PascalCase values that do not match the lowercase Sanity document
conventions used everywhere else. Worth aligning while renaming.

### 5.8 `scrollbar-hide` is a phantom class

`ProjectsCarousel.tsx` applies `scrollbar-hide`, which is defined in no stylesheet and provided
by no Tailwind plugin. It silently does nothing. The class disappears with the dead file, but
check whether the live carousel needs the equivalent (`scrollbarWidth: "none"`).

---

## 6. 🟠 Configuration, tooling and documentation

### 6.1 `.nvmrc` contradicts `package.json`

- `.nvmrc`: `lts/hydrogen` → Node 18
- `package.json:6`: `"node": ">=18.18.0"`
- `next@^16.2.4` requires **Node ≥ 20.9**

`nvm use` followed by `npm ci` on the documented path will fail. Bump `.nvmrc` to `lts/jod`
(or `22`) and `engines.node` to `>=20.9.0`.

### 6.2 `resolutions` does nothing under npm

```json
"resolutions": { "webpack": "^5" }
```

`resolutions` is a **Yarn** field. This repository uses npm (`package-lock.json` is the only
lockfile, and `engines.yarn` says `"please use npm"`). Under npm the field is inert — the
correct key is `overrides`. Either convert it or remove it, and add a `packageManager` field
to end the npm/yarn ambiguity permanently.

### 6.3 The test harness cannot be run

The repository configures Vitest, Playwright, browser mode, coverage and the Storybook test
addon (`vitest.config.ts`, `vitest.shims.d.ts`, `@storybook/addon-vitest`, `@vitest/browser-playwright`,
`@vitest/coverage-v8`, `playwright`) — but:

- there is **no `test` script** in `package.json`,
- there are **zero test files** in the repository,
- no Husky hook runs tests.

23 Storybook stories exist and are wired as the test suite (`vitest.config.ts:25`), but no
documented command runs them. Either add `"test": "vitest"` (and `"test:coverage"`) and say so
in the README, or remove the unused harness dependencies. Leaving it half-installed is the
worst option: it signals a testing culture that cannot be invoked.

### 6.4 Unused dependencies

| Dependency                 | Evidence                                                                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `@portabletext/react`      | Portable Text renders via `next-sanity`, which bundles its own v6. The top-level v5 is unused **and** a version conflict. |
| `@sanity/language-filter`  | Locale filtering is done by `sanity-plugin-internationalized-array`. No import anywhere.                                  |
| `dotenv-cli`               | No script invokes it; no tracked `.env` file.                                                                             |
| `baseline-browser-mapping` | No `.browserslistrc` and no `browserslist` key.                                                                           |
| `@vitest/coverage-v8`      | No `coverage` block in `vitest.config.ts`; no script passes `--coverage`.                                                 |

`playwright` is a judgement call: nothing imports it directly, but it satisfies the peer
requirement of `@vitest/browser-playwright`. Keep it, or drop it together with the harness
(§6.3).

### 6.5 `README.md` is still the framework boilerplate

36 lines of `create-next-app` text that:

- tells the reader to edit `app/page.tsx`, **which does not exist** (the home page is
  `app/(marketing)/page.tsx`),
- mentions the Geist font, which is not used (`app/(app)/layout.tsx:7` loads `Merriweather_Sans`),
- offers `yarn`/`pnpm`/`bun` alternatives for a project whose `engines` field forbids yarn,
- says nothing about Sanity, next-intl, the locale cookie, the consent logger, the admin
  endpoints, Husky/commitlint, or the `.nvmrc` requirement.

For a handover this is the single most visible artefact. It should cover: prerequisites,
environment variables, how to run dev/build/storybook, the Sanity Studio route, the
translation workflow and which locales exist, the `(app)` / `(marketing)` / `(studio)` route
groups, and the commit convention enforced by commitlint (which accepts a non-standard
`translation` and `security` type).

### 6.6 No `.env.example`

Five environment variables are required and none are documented:

| Variable                        | Used at                                                             |
| ------------------------------- | ------------------------------------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `sanity/env.ts:2`                                                   |
| `NEXT_PUBLIC_SANITY_DATASET`    | `sanity/env.ts:3`                                                   |
| `RESEND_API_KEY`                | `app/api/contact/route.ts:5`                                        |
| `ADMIN_API_KEY`                 | `app/api/consent-log/route.ts:95`, `app/api/gdpr/manage/route.ts:6` |
| `CONSENT_LOG_HMAC_SECRET`       | `lib/consent-logger.ts:33`                                          |

Note `CONSENT_LOG_HMAC_SECRET` silently degrades: if unset, `consent-logger.ts:71` only emits
a `console.warn` and continues signing with an empty secret, producing weak signatures. The
next team needs to know this is mandatory in production.

Add a tracked `.env.example` listing all five with placeholder values and a comment on which
are secrets. (`.gitignore` already ignores `.env*`, so `.env.example` needs a `!.env.example`
exception.)

### 6.7 `app/manifest.json` is unconsumed boilerplate with broken references

```json
{
  "name": "MyWebSite",
  "short_name": "MySite",
  "icons": [
    { "src": "/web-app-manifest-192x192.png" },
    { "src": "/web-app-manifest-512x512.png" }
  ]
}
```

Both icon files are **absent from the repository**, so the manifest references 404s. It is a
PWA manifest for a site that does not use the PWA name it declares. Set the real name and
either add the icons or remove the `icons` array.

### 6.8 Storybook `staticDirs` uses a Windows path

`.storybook/main.ts:17`:

```ts
staticDirs: ["..\\public"],
```

A backslash separator. On Linux and macOS this will not resolve, so `public/` assets are
missing in Storybook. On a Linux CI machine it fails outright. Change to `"../public"`.

### 6.9 `project.inlang/` is an abandoned tool config with a wrong locale list

`project.inlang/settings.json` declares `"locales": ["en"]` — contradicting the app's da/en/de
set — and nothing in the codebase references inlang. It is consumed only by the inlang/Sherlock
VS Code extension. It also ships `project_id` (`gv5xiD8MHRO52jHb3i0bt`) and its own `.gitignore`.
Either remove it or update the locale list; leaving it contradictory is confusing.

Relatedly `.vscode/settings.json` sets `i18n-ally.localesPaths: ["i18n", "messages"]`, but
`i18n/` contains only `request.ts` — no locale JSON lives there, so half that path is wrong.

### 6.10 Stale config leftovers

- `next.config.ts:11-14` allows images from `static.wixstatic.com`. Nothing in the codebase
  references that host — a Wix-migration leftover.
- `.prettierignore` omits `messages/versions/`, `public/` and `logs/`, so `npm run prettier`
  would rewrite generated/superseded content if those were kept.
- `tsconfig.json` targets `ES2017` for a `next@16` project; consider `ES2022`.
- No CI workflow exists (`.github/` is absent). `.husky/pre-push` runs a full `npm run build`
  locally instead, which is slow and bypassable with `--no-verify`. A single GitHub Actions
  job running `lint` + `tsc --noEmit` + `build` would be worth more than the pre-push hook.

### 6.11 Missing error boundaries

`app/(app)/projekter/[slug]/not-found.tsx` is the only special route file. There is no
`error.tsx`, no `loading.tsx`, and no root `not-found.tsx` — so a Sanity outage or a bad slug
in a section other than `projekter` surfaces the framework default. Low effort, high perceived
quality for the receiving team.

---

## 7. Git history and secrets

Git history was not deeply audited in this pass, but two things matter for handover:

1. **`logs/consent-audit.log` will remain in history** even after `git rm --cached`. It
   currently exposes a visitor IP and user-agent. If that is unacceptable, history must be
   rewritten (`git filter-repo`) **before** the repository is transferred, and the rewrite is
   destructive and requires coordination with anyone holding a clone.
2. **No secrets are tracked.** Searched for API keys, `sk-` prefixes and PEM files across
   `app/`, `components/`, `lib/`, `sanity/` and `scripts/` — clean. `.env*` and `*.pem` are
   ignored. The only tracked `env` file is `sanity/env.ts`, which is application source.

Also visible in history: 30+ stale `origin/*` branches including `feature-branch`,
`language-english` and two `vercel/*` branches. Tidying merged branches is a courtesy; pruning
them is not necessary for the handover.

---

## 8. Verification gaps

These could not be checked in this environment and should be run before handover:

1. **`npm ci` failed** (`EACCES` on `/home/dani/.npm/_cacache` — root-owned cache files). Fix
   with `sudo chown -R $(id -u):$(id -g) ~/.npm`, then:
   - `npm run lint` — should be clean; the 4 `eslint-disable` comments in §5.3 may be hiding more.
   - `npx tsc --noEmit` — no unused-import errors were found by static search except two false
     positives in `app/(app)/priip-kid/page.tsx` (`FC`, `ReactNode` are genuinely used), but
     the compiler is authoritative.
   - `npm run build` — the `.husky/pre-push` hook implies this currently passes.
   - `npm run storybook` — confirm 23 stories render and `staticDirs` works after the path fix.
2. **Sanity document contents were not inspected.** The LOW-confidence asset group in §3/§9
   may be referenced from Portable Text bodies. Check the production dataset before deleting.
3. **Deployment configuration** (Vercel project settings, blob store, domain redirects) lives
   outside the repository and was not reviewed.
4. **Git history** was not walked commit-by-commit — only the tracked tree and the last 15
   commits' subjects.

### 8.1 Results after the cleanup

Run on the `chore/handover-cleanup` branch, Node 24.17.0 / npm 11.19.1:

- `npm run lint` — clean (exit 0), including the three `eslint-disable` sites, which no
  longer need suppressing.
- `npm run typecheck` (`tsc --noEmit`) — clean (exit 0).
- `npm run format:check` — clean; 15 files were unformatted before, now covered by CI.
- `npm run build` — **compiles and prerenders all 17 routes**, but only with credentials:
  it queries the Sanity dataset from `generateStaticParams` and constructs the Resend
  client at module scope. Verified end-to-end with the Sanity client temporarily stubbed
  and a dummy `RESEND_API_KEY`; without them the build stops at "Collecting page data" for
  `/projekter/[slug]` and `/api/contact` respectively. Both are documented in
  `.env.example` and the README.
- `npm test` — Vitest discovers the 17 story files, but this machine's Playwright is a
  revision behind the installed Chromium (`chromium_headless_shell-1217`), so the browser
  never launched. Needs `npx playwright install chromium` once. Not a repository problem.
- `npm run build-storybook` + a headless-Chromium smoke test of every story instead:
  **17/17 stories render, 0 error displays.** `staticDirs: ["../public"]` resolves — the
  built Storybook serves `et_marked_updated.png`, `hero_section_bg.jpg` and the rest.
  Two layout stories failed before this pass (`Configuration must contain \`projectId\``)
  because their mocks rendered the real home page; see the commit.
- Server-rendered output checked against the built app: `/`, `/cookies`, `/om-os` and `/gdpr`
  each return the full page in the HTML (previously an empty shell), in the right language
  for `locale=da|en|de`, and a hostile `locale` cookie falls back to Danish. The consent
  banner and the analytics script are absent from the server markup and appear after
  hydration, as they must.

The remaining two open items are the ones that need a human: the git-history rewrite
(§7) and the legacy assets (§9). Sanity document contents and the Vercel deployment
configuration were still not inspected.

### 8.2 One thing the audit missed

The audit noted that the `react-hooks/set-state-in-effect` suppression in §5.3 "masks a real
issue". It does, and the issue is larger than the lint rule:
`components/providers/CookieConsentProvider.tsx` returned `null` until a client-only flag
flipped, and it wraps the whole document, so **every route was client-rendered**. The served
HTML was an empty shell:

```html
<body>
  <div hidden><!--$--><!--/$--></div>
  <script>
    self.__next_f.push(…)
  </script>
  …
</body>
```

No-JS clients, and crawlers that do not execute JavaScript, saw a blank page. The provider now
always renders its children, and only `CookieBanner` and `ConditionalAnalytics` — the two
components that genuinely depend on `localStorage` — wait for the client. Checked against the
built app: the Danish, English and German GDPR pages each carry ~10 KB of server-rendered
text (nav, footer and body), while the banner and analytics stay out of the server markup.

---

## 9. Do not delete blindly

Things that look dead but are reachable, verified during this audit:

- **Next.js conventions:** both `layout.tsx` files, all 12 `page.tsx`, `not-found.tsx`, all 3
  `route.ts`, `globals.css`, and the metadata files `favicon.ico`, `icon0.svg`, `icon1.png`,
  `apple-icon.png`, `manifest.json`. The numbered icon variants are a Next.js convention, not
  typos.
- **`messages/da.json`, `en.json`, `de.json`** — loaded through a template literal in
  `i18n/request.ts:13`, invisible to a naive search.
- **`messages/global.json`** — imported by `components/features/partnerBio/PartnerBio.tsx:1`.
- **`public/mira/MIRA_{da,en,de}_UPDATED.jpeg`** — reached through the template literal
  `/mira/MIRA_${locale}_UPDATED.jpeg` (`Mira.tsx:139`). All three are live.
- **`public/selektiv_udvælgelse.png`** — imported by `HowWeCreateValue.tsx:11`. Git escapes the
  `æ` in its path, so naive tooling reports it as unreferenced.
- **`sanity/schema/project-schema.ts` and `news-feed.ts`** — registered by array in
  `sanity/schema/index.ts`, not by import. Deleting either silently removes a document type.
- **All `.mocks.ts` files** — required fixtures for their stories, enforced by the
  `storybook/csf-component` lint rule.
- **`@types/*`, `typescript`, `tailwindcss`, `react-dom`, `@commitlint/cli`** — never
  `import`ed in application code but required by the compiler, PostCSS, or invoked via `npx`
  in `.husky/commit-msg`.
- **`public/files/legal/*.pdf`, `public/productOwners/{jacques,christian,claus}/*.png`** —
  referenced by `next.config.ts`, `Footer.tsx`, `investorer/page.tsx` and `messages/global.json`.
- **The ~27 MB of legacy Wix assets** (§3, §6) are referenced from **nowhere in this
  repository**, but a Sanity editor may have pasted a `/stock/...` or `/other/...` path into a
  document body. Confirm against the production dataset before removing.

---

## 10. Suggested execution order

If the cleanup is carried out, this order minimises risk and keeps commits reviewable:

**Phase 1 — hygiene, no behaviour change (~1 h)**

1. `git rm --cached logs/consent-audit.log curl`; add `logs/` to `.gitignore`.
2. Delete `messages/versions/`, `sanity/schema/localeBlockContentType.ts`,
   `components/assets/ImproveInvestLogo/`, `components/assets/pointedArrow/`.
3. Remove the four `console.log` calls and the four `✅`-prefixed comments.
4. Fix `.nvmrc`, `.storybook/main.ts` `staticDirs`, `app/manifest.json`.

**Phase 2 — dead code and duplication (~3 h)** 5. Delete the two dead carousels and `landingPageContentSection/` + its mocks/stories. 6. Collapse the `BaseTemplate` duplicate pair; collapse the duplicated Sanity `gallery` field. 7. Delete `lib/sanity.ts` and `lib/consent-logger.ts`'s `_test` export. 8. Strip `sampleTextProp` and `IHeader` from all 21 components. 9. Remove `@portabletext/react`, `@sanity/language-filter`, `dotenv-cli`; convert or drop
`resolutions`.

**Phase 3 — clarity for the receiving team (~4 h)** 10. Rewrite `README.md`; add `.env.example`. 11. Add `lib/i18n.ts` and replace the 5 copies of the locale lookup. 12. Extract one `verifyAdmin` helper; reconcile the two consent-log storage backends (§2.2). 13. Move `sanity/schema/project.ts` → `types/project.ts`. 14. Delete the 4 unreferenced i18n namespaces; add the 150 missing Danish keys.

**Phase 4 — optional polish** 15. Add `test` script and a GitHub Actions workflow; add `error.tsx`/`loading.tsx`. 16. Rename assets to slug-case; standardise on `lucide-react` for icons.

**Do not merge Phase 1–4 as one commit.** The per-phase grouping keeps each change reviewable
and individually revertable by the receiving team.

---

_Report prepared from a read-only audit. No repository files were modified except for this
document._
