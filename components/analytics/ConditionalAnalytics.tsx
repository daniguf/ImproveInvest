"use client";

import { useCookieConsent } from "@/components/providers/CookieConsentProvider";
import { Analytics } from "@vercel/analytics/next";

export default function ConditionalAnalytics() {
  const { consent } = useCookieConsent();

  // Only render Analytics if the user has explicitly consented
  if (!consent.analytics) {
    return null;
  }

  return <Analytics />;
}
