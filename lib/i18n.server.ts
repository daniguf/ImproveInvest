import "server-only";

import { cookies } from "next/headers";

import { resolveLocale, type Locale } from "./i18n";

/**
 * The locale for the current request, read from the `locale` cookie the language
 * switcher sets. Always returns a supported locale.
 */
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  return resolveLocale(store.get("locale")?.value);
}
