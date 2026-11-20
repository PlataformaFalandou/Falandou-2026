import type { MetadataRoute } from "next";
import { SITE_INDEXABLE, SITE_URL } from "@/lib/site";

// robots.txt gerado no build (Arquitetura §10).
// No domínio temporário (2026.falandou.com) o site fica fora do Google: todas as páginas
// têm noindex (src/app/layout.tsx) e o robots.txt não anuncia sitemap. O rastreamento
// continua liberado de propósito: só assim o Google lê o noindex. Um Disallow faria
// ele indexar os endereços "às cegas". No domínio definitivo, isto vira o robots normal.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!SITE_INDEXABLE) {
    return { rules: [{ userAgent: "*", allow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
