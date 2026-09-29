import { getRequestConfig } from "next-intl/server";

import { getLocale } from "@/lib/i18n.server";

export default getRequestConfig(async () => {
  // getLocale() narrows the cookie value to a supported locale before it is
  // interpolated into the messages import below.
  const locale = await getLocale();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
