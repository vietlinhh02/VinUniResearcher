import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next 16.2.11's draggable dev indicator can release an inactive pointer capture.
  // Runtime and build errors remain available when only this indicator is disabled.
  devIndicators: false,
  images: {
    qualities: [75, 90],
    // Avatar người dùng sinh từ DiceBear (PNG endpoint)
    remotePatterns: [{ protocol: "https", hostname: "api.dicebear.com" }],
  },
};

export default nextConfig;
