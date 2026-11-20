import type { MetadataRoute } from "next";

// robots.txt gerado no build (Arquitetura §10). Hoje nenhuma página é exclusiva de
// mídia paga; se surgir uma, marque-a com `robots: { index: false }` no metadata
// dela (ver docs/remarketing-meta.md) em vez de bloquear aqui.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://2026.falandou.com/sitemap.xml",
    host: "https://2026.falandou.com",
  };
}
