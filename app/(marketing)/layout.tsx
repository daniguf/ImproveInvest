import MarketingLayout from "@/components/layouts/marketingLayout/MarketingLayout";
import { CookieConsentProvider } from "@/components/providers/CookieConsentProvider";
import CookieBanner from "@/components/ui/cookieBanner/CookieBanner";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Merriweather_Sans } from "next/font/google";
import "../globals.css";

const merriweather = Merriweather_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  style: "normal",
});

export const metadata: Metadata = {
  title: "Improve Invest",
  description: "Improve Invest marketing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={merriweather.className}>
      <body>
        <NextIntlClientProvider>
          <CookieConsentProvider>
            {/* Your existing Layout component */}
            <MarketingLayout>{children}</MarketingLayout>
            {/* Banner rendered outside layout to ensure it's always visible */}
            <CookieBanner />
          </CookieConsentProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
