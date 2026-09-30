"use client";

import { useCookieConsent } from "@/components/providers/CookieConsentProvider";
import { Analytics } from "@vercel/analytics/next";

export default function ConditionalAnalytics() {
  const { consent, isClient } = useCookieConsent();

  // Consent lives in localStorage, so only the browser can answer this. Waiting
  // for the client also keeps the server-rendered markup unchanged.
  if (!isClient || !consent.analytics) {
    return null;
  }

  return <Analytics />;
}
