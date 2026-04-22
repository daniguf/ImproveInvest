import PrimaryLayout from "@/components/layouts/primaryLayout/PrimaryLayout";
import { CookieConsentProvider } from "@/components/providers/CookieConsentProvider";
import CookieBanner from "@/components/ui/cookieBanner/CookieBanner";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Merriweather_Sans } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
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
            <PrimaryLayout>{children}</PrimaryLayout>
            {/* Banner rendered outside layout to ensure it's always visible */}
            <CookieBanner />
            <Analytics />
          </CookieConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
