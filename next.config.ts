import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "l9u5g1r8ur.ufs.sh",
      },
    ],
  },
  experimental: {
    useCache: true,
    dynamicIO: true,
    ppr: "incremental",
  },
};

export default withNextIntl(nextConfig);
