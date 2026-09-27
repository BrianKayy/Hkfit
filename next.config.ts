import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
