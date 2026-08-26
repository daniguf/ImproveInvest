import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
    ],
    qualities: [100, 75],
  },
  async redirects() {
    return [
      {
        source: "/priip-kid",
        destination: "/files/legal/PRIIP_KID_ImproveInvest_21-08-2026.pdf",
        permanent: true,
      },
      {
        source: "/:locale/priip-kid",
        destination: "/files/legal/PRIIP_KID_ImproveInvest_21-08-2026.pdf",
        permanent: true,
      },
      {
        source: "/esg",
        destination:
          "/files/legal/politik for integration af bæredygtighed.pdf",
        permanent: true,
      },
      {
        source: "/:locale/esg",
        destination:
          "/files/legal/politik for integration af bæredygtighed.pdf",
        permanent: true,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
