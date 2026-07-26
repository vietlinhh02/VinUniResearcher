import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Avatar người dùng sinh từ DiceBear (PNG endpoint)
    remotePatterns: [{ protocol: "https", hostname: "api.dicebear.com" }],
  },
};

export default nextConfig;
