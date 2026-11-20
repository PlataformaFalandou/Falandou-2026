import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Clock, MessageCircle, PlayCircle } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { getArticleBySlug, getArticles, getCategories } from "@/lib/blog";
import { categoryColor } from "@/data/blogCategories";
import { getWhatsAppUrl, getWhatsAppUrlForContext } from "@/lib/whatsapp";
import { getBlogCTA } from "@/data/blogCTAs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Artigo não encontrado" };

  // Imagem de compartilhamento: capa do artigo, se houver; senão a gerada em
  // ./opengraph-image.tsx (título do artigo sobre o fundo da marca).
  const cover = article.imagem_capa
    ? article.imagem_capa.startsWith("http")
      ? article.imagem_capa
      : `https://2026.falandou.com${article.imagem_capa}`
    : null;

  return {
    title: `${article.titulo} — Blog Falandou`,
    description: article.resumo,
    alternates: { canonical: `/blog/${slug}/` },
    openGraph: {
      title: article.titulo,
      description: article.resumo,
      url: `/blog/${slug}/`,
      siteName: "Falandou",
      locale: "pt_BR",
      type: "article",
      ...(cover ? { images: [{ url: cover, width: 1200, height: 630, alt: article.titulo }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: article.titulo,
      description: article.resumo,
      ...(cover ? { images: [cover] } : {}),
    },
  };
}

export function generateStaticParams() {
  const articles = getArticles();
  if (articles.length === 0) return [{ slug: "_placeholder" }];
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();
  const cta = getBlogCTA(slug);

  // Barra lateral (Arquitetura §6): "leia também" — mesma categoria primeiro, depois
  // os mais recentes. Não há dado de "mais lido" sem o GA4 ativo.
  const others = getArticles().filter((a) => a.slug !== slug);
  const related = [
    ...others.filter((a) => a.categoria === article.categoria),
    ...others.filter((a) => a.categoria !== article.categoria),
  ].slice(0, 3);
  const categories = getCategories().filter((c) => c !== "Todos");
  const url = `https://2026.falandou.com/blog/${slug}/`;

  return (
    <>
      <Navbar solid />
      {/* Schema Article + BreadcrumbList (Arquitetura §6 e §10) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                headline: article.titulo,
                description: article.resumo,
                datePublished: article.created_at,
                dateModified: article.created_at,
                inLanguage: "pt-BR",
                articleSection: article.categoria,
                mainEntityOfPage: url,
                url,
                ...(article.imagem_capa
                  ? {
                      image: article.imagem_capa.startsWith("http")
                        ? article.imagem_capa
                        : `https://2026.falandou.com${article.imagem_capa}`,
                    }
                  : {}),
                author: { "@type": "Organization", name: "Falandou", url: "https://2026.falandou.com/" },
                publisher: { "@type": "Organization", name: "Falandou", url: "https://2026.falandou.com/" },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Início", item: "https://2026.falandou.com/" },
                  { "@type": "ListItem", position: 2, name: "Blog", item: "https://2026.falandou.com/blog/" },
                  { "@type": "ListItem", position: 3, name: article.titulo, item: url },
                ],
              },
            ],
          }),
        }}
      />
      <main className="pt-32 md:pt-36 pb-20 min-h-screen bg-neve">
        <div className="max-w-6xl mx-auto px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
          <div className="max-w-3xl">
            {/* Breadcrumb — Arquitetura §2: só no artigo do blog */}
            <nav aria-label="Você está em" className="mb-8">
              <ol className="flex flex-wrap items-center gap-1.5 font-body text-sm" style={{ color: "rgba(22,22,22,0.5)" }}>
                <li>
                  <Link href="/" className="hover:underline underline-offset-2">Início</Link>
                </li>
                <li aria-hidden>
                  <ChevronRight size={14} />
                </li>
                <li>
                  <Link href="/blog" className="inline-flex items-center gap-1 hover:underline underline-offset-2">
                    <ArrowLeft size={13} className="sm:hidden" />
                    Blog
                  </Link>
                </li>
                <li aria-hidden className="hidden sm:block">
                  <ChevronRight size={14} />
                </li>
                <li aria-current="page" className="hidden sm:block max-w-[22rem] truncate" style={{ color: "#161616" }}>
                  {article.titulo}
                </li>
              </ol>
            </nav>

            {/* Category + meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Link
                href={`/blog?categoria=${encodeURIComponent(article.categoria)}`}
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: `${categoryColor(article.categoria)}18`, color: categoryColor(article.categoria) }}
              >
                {article.categoria}
              </Link>
              {article.tempo_leitura && (
                <span className="flex items-center gap-1.5 font-body text-xs" style={{ color: "rgba(22,22,22,0.5)" }}>
                  <Clock size={12} />
                  {article.tempo_leitura} min de leitura
                </span>
              )}
              <span className="font-body text-xs" style={{ color: "rgba(22,22,22,0.4)" }}>
                {new Date(article.created_at).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-display font-extrabold leading-tight mb-6"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)", color: "#161616" }}
            >
              {article.titulo}
            </h1>

            {/* Resumo */}
            <p className="font-body text-lg leading-relaxed mb-10 pb-10 border-b border-black/10" style={{ color: "rgba(22,22,22,0.6)" }}>
              {article.resumo}
            </p>

            {/* Content — rendered as markdown */}
            <div
              className="font-body text-base leading-relaxed prose-custom"
              style={{ color: "rgba(22,22,22,0.8)" }}
              dangerouslySetInnerHTML={{ __html: article.conteudo }}
            />

            {/* Vídeo do canal relacionado (Arquitetura §6). Miniatura com link: nada do
                YouTube carrega na página, então não há cookies de terceiros sem consentimento. */}
            {article.video && (
              <a
                href={`https://www.youtube.com/watch?v=${article.video}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-12 flex flex-col sm:flex-row items-stretch gap-0 rounded-2xl overflow-hidden border border-black/10 bg-white hover:shadow-lg transition-shadow"
              >
                <span className="relative block sm:w-64 aspect-video sm:aspect-auto flex-shrink-0 bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://i.ytimg.com/vi/${article.video}/hqdefault.jpg`}
                    alt=""
                    width={480}
                    height={360}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle size={44} color="#fff" strokeWidth={1.5} />
                  </span>
                </span>
                <span className="p-6 flex flex-col justify-center">
                  <span className="font-body text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#FF6820" }}>
                    Veja também em vídeo
                  </span>
                  <span className="font-display font-bold text-base" style={{ color: "#161616" }}>
                    Assista no canal @falandou no YouTube →
                  </span>
                </span>
              </a>
            )}

            {/* CTA contextual — Arquitetura §3/§6: ligado ao tema do artigo + página relacionada */}
            <div
              className="mt-16 rounded-2xl p-8 text-center"
              style={{ backgroundColor: "#161616" }}
            >
              <p className="font-body text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#FF6820" }}>
                Da leitura para a prática
              </p>
              <h3 className="font-display font-extrabold text-white text-xl md:text-2xl mb-3">
                {cta.heading}
              </h3>
              <p className="font-body text-sm mb-6 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
                {cta.text}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={getWhatsAppUrl(
                    `Olá! Li o artigo “${article.titulo}” no blog da Falandou e quero treinar isso nas sessões. Como funciona?`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: "#FF6820" }}
                >
                  <MessageCircle size={16} />
                  Quero treinar isso nas sessões
                </a>
                <Link
                  href={cta.related.href}
                  className="font-body text-sm font-semibold underline underline-offset-4"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {cta.related.label} →
                </Link>
              </div>
            </div>
          </div>

          {/* ── Barra lateral (desktop) — Arquitetura §6 ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 flex flex-col gap-6">
              <div className="rounded-2xl bg-white border border-black/5 p-6">
                <p className="font-body text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(22,22,22,0.45)" }}>
                  Leia também
                </p>
                <ul className="flex flex-col gap-4">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/blog/${r.slug}`} className="group block">
                        <span className="block font-body text-xs font-semibold mb-1" style={{ color: categoryColor(r.categoria) }}>
                          {r.categoria}
                        </span>
                        <span className="block font-display font-bold text-sm leading-snug group-hover:underline underline-offset-2" style={{ color: "#161616" }}>
                          {r.titulo}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Captura de contato: roteiro gratuito pelo WhatsApp (decisão da escola: sem lista de e-mail) */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: "#161616" }}>
                <p className="font-body text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#FF6820" }}>
                  Material gratuito
                </p>
                <p className="font-display font-extrabold text-white text-lg leading-snug mb-3">
                  Roteiro de 30 dias para destravar o inglês no trabalho.
                </p>
                <p className="font-body text-sm mb-5" style={{ color: "rgba(255,255,255,0.55)" }}>
                  PDF com atividades semana a semana. Enviamos pelo WhatsApp, sem cadastro.
                </p>
                <a
                  href={getWhatsAppUrlForContext("leadmagnet")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center px-5 py-3 rounded-full font-body font-bold text-sm text-white"
                  style={{ backgroundColor: "#FF6820" }}
                >
                  Quero receber o PDF
                </a>
              </div>

              <div className="rounded-2xl bg-white border border-black/5 p-6">
                <p className="font-body text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(22,22,22,0.45)" }}>
                  Categorias
                </p>
                <ul className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <li key={c}>
                      <Link
                        href={`/blog?categoria=${encodeURIComponent(c)}`}
                        className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full"
                        style={{ background: `${categoryColor(c)}18`, color: categoryColor(c) }}
                      >
                        {c}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
