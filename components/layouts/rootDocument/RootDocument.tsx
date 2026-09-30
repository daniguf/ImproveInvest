import ConditionalAnalytics from "@/components/analytics/ConditionalAnalytics";
import PrimaryLayout from "@/components/layouts/primaryLayout/PrimaryLayout";
import MarketingLayout from "@/components/layouts/marketingLayout/MarketingLayout";
import { CookieConsentProvider } from "@/components/providers/CookieConsentProvider";
import CookieBanner from "@/components/ui/cookieBanner/CookieBanner";
import { NextIntlClientProvider } from "next-intl";
import { Merriweather_Sans } from "next/font/google";

// Shared document shell for the two route-group root layouts, which are
// otherwise identical. Next.js requires `app/(app)/layout.tsx` and
// `app/(marketing)/layout.tsx` to exist separately, so only the shell below is
// shared — the html/body wrapper cannot be hoisted into a single layout file.
const merriweather = Merriweather_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  style: "normal",
});

export interface IRootDocument {
  children: React.ReactNode;
  layoutType: "app" | "marketing";
}

const RootDocument = ({ children, layoutType }: IRootDocument) => {
  const Layout = layoutType === "app" ? PrimaryLayout : MarketingLayout;

  return (
    <html lang="en" className={merriweather.className}>
      <body>
        <NextIntlClientProvider>
          <CookieConsentProvider>
            <Layout>{children}</Layout>
            {/* Banner rendered outside layout to ensure it's always visible */}
            <CookieBanner />
            {/* Analytics is now conditional based on user consent */}
            <ConditionalAnalytics />
          </CookieConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootDocument;
