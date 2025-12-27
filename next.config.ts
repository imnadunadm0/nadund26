import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: undefined, // Remove static export
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
