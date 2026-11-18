import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // SSG for Hostinger static hosting
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  // Note: Dynamic blog routes use ISR at build time via generateStaticParams
};

export default nextConfig;
