import { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronRight, Clock, MessageCircle, PlayCircle } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { getArticleBySlug, getArticles, getCategories, lastModified, splitForMidCTA } from "@/lib/blog";
import { categoryColor } from "@/data/blogCategories";
import { getWhatsAppUrl, getWhatsAppUrlForContext } from "@/lib/whatsapp";
import { getBlogCTA } from "@/data/blogCTAs";
import { articleAuthor, teacherSlug } from "@/lib/teachers";

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
      : absoluteUrl(article.imagem_capa)
    : null;

  const title = article.titulo_seo ?? `${article.titulo} | Falandou`;
  const description = article.descricao ?? article.resumo;
  return {
    title,
    description,
    ...(article.palavra_chave ? { keywords: [article.palavra_chave] } : {}),
    alternates: { canonical: `/blog/${slug}/` },
    openGraph: {
      title: article.titulo,
      description,
      url: `/blog/${slug}/`,
      publishedTime: article.created_at,
      modifiedTime: lastModified(article),
      section: article.categoria,
      siteName: "Falandou",
      locale: "pt_BR",
      type: "article",
      ...(cover ? { images: [{ url: cover, width: 1200, height: 630, alt: article.titulo }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: article.titulo,
      description,
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
  const url = absoluteUrl(`/blog/${slug}/`);
  const updated = lastModified(article);
  const author = articleAuthor(article.categoria, article.autor);
  const authorUrl = `/professores/#${teacherSlug(author.name)}`;
  const [contentA, contentB] = splitForMidCTA(article.conteudo);
  const fmt = (d: string) => new Date(d).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
  const image = article.imagem_capa
    ? article.imagem_capa.startsWith("http")
      ? article.imagem_capa
      : absoluteUrl(article.imagem_capa)
    : absoluteUrl(`/blog/${slug}/opengraph-image`);

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
                "@type": "BlogPosting",
                headline: article.titulo,
                description: article.descricao ?? article.resumo,
                datePublished: article.created_at,
                dateModified: updated,
                ...(article.palavra_chave ? { keywords: article.palavra_chave } : {}),
                wordCount: article.tempo_leitura * 200,
                inLanguage: "pt-BR",
                articleSection: article.categoria,
                mainEntityOfPage: url,
                url,
                image,
                author: {
                  "@type": "Person",
                  name: author.name,
                  jobTitle: author.title,
                  url: absoluteUrl(authorUrl),
                  knowsAbout: author.specialty,
                  worksFor: { "@type": "Organization", name: "Falandou", url: absoluteUrl("/") },
                },
                publisher: {
                  "@type": "Organization",
                  name: "Falandou",
                  url: absoluteUrl("/"),
                  logo: { "@type": "ImageObject", url: absoluteUrl("/icon-512.png") },
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
                  { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog/") },
                  { "@type": "ListItem", position: 3, name: article.titulo, item: url },
                ],
              },
              ...(article.faq.length
                ? [
                    {
                      "@type": "FAQPage",
                      mainEntity: article.faq.map((f) => ({
                        "@type": "Question",
                        name: f.q,
                        acceptedAnswer: { "@type": "Answer", text: f.a },
                      })),
                    },
                  ]
                : []),
            ],
          }),
        }}
      />
      <main id="conteudo" className="pt-32 md:pt-36 pb-20 min-h-screen bg-bg-alt">
        <div className="max-w-6xl mx-auto px-5 md:px-8 lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
          <div className="max-w-3xl">
            {/* Breadcrumb — Arquitetura §2: só no artigo do blog */}
            <nav aria-label="Você está em" className="mb-8">
              <ol className="flex flex-wrap items-center gap-1.5 font-body text-sm" style={{ color: "rgba(245,246,241,0.6)" }}>
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
                <li aria-current="page" className="hidden sm:block max-w-[22rem] truncate" style={{ color: "var(--color-text)" }}>
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
              <span className="flex items-center gap-1.5 font-body text-xs" style={{ color: "rgba(245,246,241,0.65)" }}>
                <Clock size={12} aria-hidden="true" />
                {article.tempo_leitura} min de leitura
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-display font-extrabold leading-tight mb-6"
              style={{ fontSize: "var(--text-h1)", color: "var(--color-text)" }}
            >
              {article.titulo}
            </h1>

            {/* Resumo */}
            <p
              className="font-body text-lg leading-relaxed mb-6"
              style={{ color: "rgba(245,246,241,0.75)" }}
              dangerouslySetInnerHTML={{ __html: article.resumoHtml }}
            />

            {/* Assinatura e revisão (SEO §21): escrito pela escola, com data de revisão */}
            <p className="text-sm mb-10 pb-8 border-b border-white/15" style={{ color: "rgba(245,246,241,0.65)" }}>
              Por{" "}
              <Link href={authorUrl} className="font-semibold text-white hover:underline underline-offset-2">
                {author.name}
              </Link>
              , {author.credentials.join(" · ")} · Publicado em <time dateTime={article.created_at}>{fmt(article.created_at)}</time>
              {updated !== article.created_at && (
                <>
                  {" "}· Revisado em <time dateTime={updated}>{fmt(updated)}</time>
                </>
              )}
            </p>

            {/* Sumário navegável nas páginas pilar (SEO §17) */}
            {article.pilar && article.toc.length > 2 && (
              <nav
                aria-label="Neste guia"
                className="mb-10 rounded-2xl p-6 md:p-8"
                style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
              >
                <p className="eyebrow text-xs font-bold uppercase tracking-widest mb-3">
                  Neste guia
                </p>
                <ol className="grid gap-2 list-decimal pl-5 text-sm" style={{ color: "var(--color-text-body)" }}>
                  {article.toc.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="link-hover">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {/* Conteúdo — markdown; CTA de meio de artigo depois do 3º H2 (SEO §15) */}
            <div
              className="font-body text-base leading-relaxed prose-custom"
              style={{ color: "rgba(245,246,241,0.9)" }}
              dangerouslySetInnerHTML={{ __html: contentA }}
            />
            {contentB && (
              <>
                <aside
                  className="my-10 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-4"
                  style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", borderLeft: "4px solid #FF6820" }}
                >
                  <p className="flex-1 text-base text-white">
                    <strong>Quer praticar isso com um professor?</strong>{" "}
                    <span style={{ color: "var(--color-text-body)" }}>
                      Nas sessões individuais, você treina com o vocabulário e as situações do seu trabalho.
                    </span>
                  </p>
                  <Link href="/metodo" className="cta-secondary inline-flex items-center justify-center px-5 py-3 rounded-full text-sm font-semibold flex-shrink-0">
                    Ver como funciona a sessão individual
                  </Link>
                </aside>
                <div
                  className="font-body text-base leading-relaxed prose-custom"
                  style={{ color: "rgba(245,246,241,0.9)" }}
                  dangerouslySetInnerHTML={{ __html: contentB }}
                />
              </>
            )}

            {/* FAQ do artigo (SEO §15) — também vai no FAQPage schema */}
            {article.faq.length > 0 && (
              <section className="mt-14" aria-labelledby="faq-artigo">
                <h2 id="faq-artigo" className="font-display font-extrabold text-white mb-6" style={{ fontSize: "var(--text-h3)" }}>
                  Perguntas frequentes
                </h2>
                <div className="flex flex-col gap-3">
                  {article.faq.map((f) => (
                    <details key={f.q} className="group rounded-2xl p-5" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                      <summary className="cursor-pointer list-none flex justify-between items-center gap-4 font-display font-bold text-base text-white">
                        <span dangerouslySetInnerHTML={{ __html: f.qHtml }} />
                        <span className="text-xl transition-transform group-open:rotate-45" style={{ color: "#FF6820" }} aria-hidden="true">+</span>
                      </summary>
                      <p
                        className="text-base leading-6 mt-3"
                        style={{ color: "var(--color-text-body)" }}
                        dangerouslySetInnerHTML={{ __html: f.aHtml }}
                      />
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Vídeo do canal relacionado (Arquitetura §6). Miniatura com link: nada do
                YouTube carrega na página, então não há cookies de terceiros sem consentimento. */}
            {article.video && (
              <a
                href={`https://www.youtube.com/watch?v=${article.video}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-12 flex flex-col sm:flex-row items-stretch gap-0 rounded-2xl overflow-hidden border border-border bg-surface hover:shadow-lg transition-shadow"
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
                  <span className="eyebrow font-body text-xs font-bold uppercase tracking-widest mb-2">
                    Veja também em vídeo
                  </span>
                  <span className="font-display font-bold text-base" style={{ color: "var(--color-text)" }}>
                    Assista no canal @falandou no YouTube →
                  </span>
                </span>
              </a>
            )}

            {/* CTA contextual — Arquitetura §3/§6: ligado ao tema do artigo + página relacionada */}
            <div
              className="mt-16 rounded-2xl p-6 md:p-8 text-center"
              style={{ backgroundColor: "var(--color-bg)" }}
            >
              <p className="eyebrow font-body text-xs font-semibold uppercase tracking-widest mb-3">
                Quer acelerar esse processo?
              </p>
              <h3 className="font-display font-extrabold text-white text-[length:var(--text-h3)] md:text-2xl mb-3">
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
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-white cta-primary">
                  <MessageCircle size={16} />
                  Quero começar
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
            {/* Bio curta do professor que assina (revisão editorial §48) */}
            <div
              className="mt-12 rounded-2xl p-6 md:p-8 flex gap-4 items-start"
              style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
            >
              <Image
                src={author.photo}
                alt={`Foto de ${author.name}`}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 img-skeleton"
              />
              <div>
                <p className="eyebrow text-xs font-bold uppercase tracking-widest mb-1">
                  Sobre quem assina
                </p>
                <p className="font-display font-bold text-white">
                  {author.name} · {author.credentials.join(" · ")}
                </p>
                <p className="text-sm mt-1" style={{ color: "var(--color-text-body)" }}>
                  {author.title} da Falandou. Especialidade: {author.specialty.toLowerCase()}.{" "}
                  <Link href={authorUrl} className="cta-tertiary text-white font-semibold">
                    Ver o perfil completo
                  </Link>
                </p>
              </div>
            </div>

            {/* Sobre a escola (SEO §21) */}
            <p className="mt-10 text-sm" style={{ color: "var(--color-text-muted)" }}>
              <strong className="text-white">Sobre a Falandou:</strong> escola de inglês para profissionais, com sessões 1 a 1,
              plano individual e exame CEFR antes e depois de cada ciclo de 90 dias.{" "}
              <Link href="/sobre" className="cta-tertiary text-white font-semibold">
                Conheça a escola
              </Link>{" "}
              ou{" "}
              <Link href="/planos" className="cta-tertiary text-white font-semibold">
                veja os planos e valores
              </Link>
              .
            </p>
          </div>

          {/* ── Barra lateral (desktop) — Arquitetura §6 ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 flex flex-col gap-6">
              <div className="rounded-2xl bg-surface border border-border p-6 md:p-8">
                <p className="font-body text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(245,246,241,0.55)" }}>
                  Leia também
                </p>
                <ul className="flex flex-col gap-4">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/blog/${r.slug}`} className="group block">
                        <span className="block font-body text-xs font-semibold mb-1" style={{ color: categoryColor(r.categoria) }}>
                          {r.categoria}
                        </span>
                        <span className="block font-display font-bold text-sm leading-snug group-hover:underline underline-offset-2" style={{ color: "var(--color-text)" }}>
                          {r.titulo}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Captura de contato: roteiro gratuito pelo WhatsApp (decisão da escola: sem lista de e-mail) */}
              <div className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: "var(--color-bg)" }}>
                <p className="eyebrow font-body text-xs font-bold uppercase tracking-widest mb-3">
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
                  className="block text-center px-5 py-3 rounded-full font-body font-bold text-sm text-white cta-primary">
                  Receber o roteiro gratuito
                </a>
              </div>

              <div className="rounded-2xl bg-surface border border-border p-6 md:p-8">
                <p className="font-body text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(245,246,241,0.55)" }}>
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
