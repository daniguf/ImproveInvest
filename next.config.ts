import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.sanity.io", "static.wixstatic.com"],
    qualities: [100, 75],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
