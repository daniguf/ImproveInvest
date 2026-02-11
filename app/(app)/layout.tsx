import PrimaryLayout from "@/components/layouts/primaryLayout/PrimaryLayout";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Merriweather } from "next/font/google";
import "../globals.css";

const merriweather = Merriweather({
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
          <PrimaryLayout>{children}</PrimaryLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
