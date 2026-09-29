import RootDocument from "@/components/layouts/rootDocument/RootDocument";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Improve Invest",
  description: "Improve Invest marketing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootDocument layoutType="marketing">{children}</RootDocument>;
}
