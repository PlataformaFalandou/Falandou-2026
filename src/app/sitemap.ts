import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/blog";

// sitemap.xml gerado no build (Arquitetura §6 e §10). Com `output: "export"`,
// o Next grava out/sitemap.xml estático. Ao criar uma página nova, inclua aqui.
export const dynamic = "force-static";

const BASE = "https://2026.falandou.com";

type Entry = { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] };

const PAGES: Entry[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/metodo/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/planos/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/resultados/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/depoimentos/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/professores/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sobre/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/blog/", priority: 0.8, changeFrequency: "weekly" },
  { path: "/ingles-executivo/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/ingles-entrevista/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/ingles-expatriacao/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/promocao-cargo/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/intensivo/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/indique/", priority: 0.4, changeFrequency: "monthly" },
  { path: "/politica-de-privacidade/", priority: 0.2, changeFrequency: "yearly" },
  { path: "/termos/", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = PAGES.map((p) => ({
    url: `${BASE}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
  const posts = getArticles().map((a) => ({
    url: `${BASE}/blog/${a.slug}/`,
    lastModified: new Date(a.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));
  return [...pages, ...posts];
}
