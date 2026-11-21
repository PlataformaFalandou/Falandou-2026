import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, Clock } from "lucide-react";
import BlogClient, { type ArticleCard } from "./BlogClient";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import JsonLd from "@/components/ui/JsonLd";
import { getArticles, getCategories, getFeatured } from "@/lib/blog";
import { categoryColor } from "@/data/blogCategories";
import { absoluteUrl } from "@/lib/site";

// SEO §13 — página principal do blog: H1 com palavra-chave, post pilar em destaque,
// categorias como filtro, tempo de leitura em cada cartão e breadcrumb.
export const metadata: Metadata = {
  title: "Blog de Inglês para Profissionais | Falandou",
  description:
    "Guias de inglês para o trabalho: reuniões, e-mails, entrevistas, inglês jurídico e níveis CEFR. Conteúdo prático da Falandou, escola de inglês 1 a 1.",
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: "Blog da Falandou — inglês para profissionais",
    description: "Reuniões, e-mails, entrevistas, inglês jurídico e níveis CEFR.",
    url: "/blog/",
    siteName: "Falandou",
    locale: "pt_BR",
    type: "website",
  },
};

export default function BlogPage() {
  const all = getArticles();
  const featured = getFeatured();
  const cards: ArticleCard[] = all
    .filter((a) => a.slug !== featured?.slug)
    .map(({ id, slug, titulo, resumo, categoria, created_at, tempo_leitura }) => ({
      id,
      slug,
      titulo,
      resumo,
      categoria,
      created_at,
      tempo_leitura,
    }));

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        name: "Blog da Falandou",
        url: absoluteUrl("/blog/"),
        inLanguage: "pt-BR",
        blogPost: all.map((a) => ({ "@type": "BlogPosting", headline: a.titulo, url: absoluteUrl(`/blog/${a.slug}/`) })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog/") },
        ],
      },
    ],
  };

  return (
    <>
      <Navbar solid />
      <main id="conteudo" className="pt-28 md:pt-36 pb-20 min-h-screen bg-bg-alt">
        <JsonLd data={schema} />
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <nav aria-label="Você está em" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm" style={{ color: "rgba(245,246,241,0.6)" }}>
              <li>
                <Link href="/" className="hover:underline underline-offset-2">Início</Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li aria-current="page" style={{ color: "var(--color-text)" }}>Blog</li>
            </ol>
          </nav>

          <div className="mb-10">
            <h1 className="font-display font-extrabold text-ink leading-tight" style={{ fontSize: "var(--text-h1)" }}>
              Blog da Falandou: inglês para profissionais
            </h1>
            <p className="font-body text-lg mt-3 max-w-2xl" style={{ color: "var(--color-text-body)" }}>
              Guias práticos para usar o inglês no trabalho — reuniões, e-mails, entrevistas, inglês jurídico e os
              níveis CEFR. {all.length} artigos.
            </p>
          </div>

          {/* Post em destaque: página pilar mais recente */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="card-hover group block rounded-2xl p-7 md:p-10 mb-12 border"
              style={{
                background: "linear-gradient(135deg, rgba(255,104,32,0.14) 0%, var(--color-surface) 60%)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="on-brand text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ backgroundColor: "#FF6820" }}>
                  {featured.pilar ? "Guia completo" : "Em destaque"}
                </span>
                <span className="text-xs font-semibold" style={{ color: categoryColor(featured.categoria) }}>
                  {featured.categoria}
                </span>
                <span className="flex items-center gap-1 text-xs" style={{ color: "rgba(245,246,241,0.6)" }}>
                  <Clock size={12} aria-hidden="true" />
                  {featured.tempo_leitura} min de leitura
                </span>
              </div>
              <h2 className="font-display font-extrabold text-white leading-tight mb-3 max-w-3xl" style={{ fontSize: "var(--text-h2)" }}>
                {featured.titulo}
              </h2>
              <p className="text-base md:text-lg max-w-2xl mb-6" style={{ color: "var(--color-text-body)" }}>
                {featured.resumo}
              </p>
              <span className="inline-flex items-center gap-2 font-semibold group-hover:gap-3 transition-all" style={{ color: "#FF6820" }}>
                Ler o guia <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
          )}

          <BlogClient articles={cards} categories={getCategories()} />

          {/* Sobre a escola (SEO §21) */}
          <p className="mt-14 text-center text-sm max-w-2xl mx-auto" style={{ color: "var(--color-text-muted)" }}>
            Os artigos são assinados pelos professores da Falandou, escola de inglês para profissionais com sessões 1 a 1 e
            exame CEFR antes e depois de cada ciclo.{" "}
            <Link href="/sobre" className="cta-tertiary text-white font-semibold">
              Conheça a escola
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
