"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const mockPosts = [
  {
    slug: "como-melhorar-pronuncia-ingles",
    category: "Pronúncia",
    title: "Como melhorar sua pronúncia em inglês sem morar fora do Brasil",
    excerpt: "Técnicas práticas usadas por professores de fonética para corrigir os erros mais comuns de brasileiros.",
    readTime: "5 min",
  },
  {
    slug: "vocabulario-reunioes-negocios",
    category: "Vocabulário",
    title: "50 expressões essenciais para reuniões de negócios em inglês",
    excerpt: "Do 'let's circle back' ao 'take this offline' — expressões que todo profissional precisa dominar.",
    readTime: "7 min",
  },
  {
    slug: "diferenca-cefr-niveis-ingles",
    category: "Dicas",
    title: "CEFR: o que significa cada nível de inglês e onde você provavelmente está",
    excerpt: "Entenda o quadro europeu de referências e o que representa cada nível — do A1 ao C2.",
    readTime: "6 min",
  },
];

const categoryColors: Record<string, string> = {
  "Pronúncia": "#FF6820",
  "Vocabulário": "#20B7FF",
  "Dicas": "#FFD820",
  "Gramática": "#B7FF20",
  "Listening": "#20FF68",
  "Motivação": "#6820FF",
  "Entretenimento": "#FF2099",
};

export default function BlogPreview() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="reveal font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#FF6820" }}>
              Blog
            </p>
            <h2
              className="reveal font-display font-extrabold text-grafite leading-tight delay-100"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)" }}
            >
              Aprenda enquanto decide.
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 group"
            style={{ color: "#FF6820" }}
          >
            Ver todos os artigos
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Posts grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {mockPosts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="reveal group flex flex-col bg-neve rounded-2xl overflow-hidden border border-black/5 hover:border-laranja/30 hover:shadow-md transition-all duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Color header bar */}
              <div
                className="h-1.5 w-full"
                style={{ backgroundColor: categoryColors[post.category] || "#FF6820" }}
              />

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: `${categoryColors[post.category] || "#FF6820"}18`,
                      color: categoryColors[post.category] || "#FF6820",
                    }}
                  >
                    {post.category}
                  </span>
                  <span className="font-body text-xs text-grafite/40">{post.readTime}</span>
                </div>

                <h3 className="font-display font-bold text-grafite text-base leading-snug mb-3 group-hover:text-laranja transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="font-body text-sm text-grafite/60 leading-relaxed line-clamp-3 flex-1">
                  {post.excerpt}
                </p>

                <div
                  className="inline-flex items-center gap-1 mt-5 text-sm font-semibold transition-colors duration-200 group-hover:gap-2"
                  style={{ color: "#FF6820" }}
                >
                  Ler artigo
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="md:hidden mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-laranja transition-colors duration-200 hover:bg-laranja hover:text-white"
            style={{ color: "#FF6820", borderColor: "#FF6820" }}
          >
            Ver todos os artigos
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
