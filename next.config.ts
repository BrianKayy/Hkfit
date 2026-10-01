import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [32, 48, 64, 96, 128, 192, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pwipbjkeudawdteblpbt.supabase.co",
        port: "",
        pathname:
          "/storage/v1/object/public/store%20images/**",
      },
    ],
  },
};

export default nextConfig;
