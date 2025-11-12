import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Improve Invest",
  description: "Improve Invest marketing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
