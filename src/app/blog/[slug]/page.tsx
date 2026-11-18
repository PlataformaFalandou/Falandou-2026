import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, MessageCircle } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { getArticleBySlug, getArticles } from "@/lib/supabase";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Artigo não encontrado" };

  return {
    title: `${article.titulo} — Blog Falandou`,
    description: article.resumo,
  };
}

export async function generateStaticParams() {
  try {
    const articles = await getArticles();
    if (articles.length === 0) return [{ slug: "_placeholder" }];
    return articles.map((a) => ({ slug: a.slug }));
  } catch {
    // Fallback when Supabase is unreachable at build time
    return [{ slug: "_placeholder" }];
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen bg-neve">
        <div className="max-w-3xl mx-auto px-6">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-grafite/50 hover:text-laranja transition-colors mb-8"
            style={{ "--laranja": "#FF6820" } as React.CSSProperties}
          >
            <ArrowLeft size={15} />
            Voltar ao blog
          </Link>

          {/* Category + meta */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ background: "rgba(255,104,32,0.1)", color: "#FF6820" }}
            >
              {article.categoria}
            </span>
            {article.tempo_leitura && (
              <span className="flex items-center gap-1.5 font-body text-xs text-grafite/50">
                <Clock size={12} />
                {article.tempo_leitura} min de leitura
              </span>
            )}
            <span className="font-body text-xs text-grafite/40">
              {new Date(article.created_at).toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display font-extrabold text-grafite leading-tight mb-6"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)" }}
          >
            {article.titulo}
          </h1>

          {/* Resumo */}
          <p className="font-body text-grafite/60 text-lg leading-relaxed mb-10 pb-10 border-b border-black/8">
            {article.resumo}
          </p>

          {/* Content */}
          <div
            className="font-body text-grafite/80 text-base leading-relaxed prose-custom"
            dangerouslySetInnerHTML={{ __html: article.conteudo }}
          />

          {/* CTA box */}
          <div
            className="mt-16 rounded-2xl p-8 text-center"
            style={{ backgroundColor: "#161616" }}
          >
            <p className="font-body text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#FF6820" }}>
              Pronto para praticar?
            </p>
            <h3 className="font-display font-extrabold text-white text-xl md:text-2xl mb-3">
              Leve este conhecimento para as suas aulas.
            </h3>
            <p className="font-body text-white/50 text-sm mb-6 max-w-md mx-auto">
              Na Falandou, o conteúdo do blog vira prática real nas suas aulas particulares, com foco no seu contexto profissional.
            </p>
            <a
              href={getWhatsAppUrlForContext("cta")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "#FF6820" }}
            >
              <MessageCircle size={16} />
              Falar com a Falandou
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
