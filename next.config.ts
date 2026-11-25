import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // SSG for Hostinger static hosting
  trailingSlash: true,
  images: {
    // Exportação estática: sem otimização no servidor. O loader aponta cada largura para
    // uma versão WebP pré-gerada em /public/images (revisão técnica §6.1).
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
    // Larguras do srcset. As que passam de 800 usam o original (até 1200px).
    deviceSizes: [480, 800, 1200],
    imageSizes: [64, 128, 256],
  },
  // Note: Dynamic blog routes use ISR at build time via generateStaticParams
};

export default nextConfig;
