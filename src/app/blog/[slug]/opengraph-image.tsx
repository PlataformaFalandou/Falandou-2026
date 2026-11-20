import { ogImage } from "@/lib/og";
import { getArticleBySlug, getArticles } from "@/lib/blog";

// Imagem de compartilhamento de cada artigo (Arquitetura §10), gerada no build.
export const dynamic = "force-static";
export const alt = "Artigo do Blog Falandou";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  return ogImage(article ? `Blog · ${article.categoria}` : "Blog", article?.titulo ?? "Blog Falandou");
}
