"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { categoryColor } from "@/data/blogCategories";
/** Só o que o cartão usa — o conteúdo dos artigos não vai para o JavaScript do cliente. */
export type ArticleCard = {
  id: string;
  slug: string;
  titulo: string;
  resumo: string;
  categoria: string;
  created_at: string;
  tempo_leitura: number;
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogClient({
  articles,
  categories,
}: {
  articles: ArticleCard[];
  categories: string[];
}) {
  const [activeCategory, setActiveCategory] = useState("Todos");

  // /blog?categoria=X (links da barra lateral do artigo). Aplicado após a montagem:
  // o HTML estático sai com "Todos".
  useEffect(() => {
    const t = setTimeout(() => {
      const wanted = new URLSearchParams(window.location.search).get("categoria");
      if (wanted && categories.includes(wanted)) setActiveCategory(wanted);
    }, 0);
    return () => clearTimeout(t);
  }, [categories]);

  const filtered =
    activeCategory === "Todos"
      ? articles
      : articles.filter((a) => a.categoria === activeCategory);

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="min-h-[44px] px-4 rounded-full text-sm font-semibold transition-all duration-[var(--dur-base)]"
            style={{
              backgroundColor:
                activeCategory === cat ? "#FF6820" : "transparent",
              color: activeCategory === cat ? "var(--color-on-brand)" : "var(--color-text)",
              border:
                activeCategory === cat
                  ? "1px solid #FF6820"
                  : "1px solid rgba(255,255,255,0.13)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-body text-ink/50">Nenhum artigo nessa categoria ainda.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filtered.map((article, i) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="card-hover group flex flex-col bg-surface rounded-2xl overflow-hidden border border-border"
            >
              {/* Color header */}
              <div
                className="h-1.5 w-full"
                style={{
                  backgroundColor:
                    categoryColor(article.categoria),
                }}
              />

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: `${categoryColor(article.categoria)}18`,
                      color: categoryColor(article.categoria),
                    }}
                  >
                    {article.categoria}
                  </span>
                  <span className="flex items-center gap-1 font-body text-xs text-ink/60">
                    <Clock size={11} aria-hidden="true" />
                    {article.tempo_leitura} min de leitura
                  </span>
                </div>

                <h2 className="font-display font-bold text-ink text-base leading-snug mb-2 group-hover:text-laranja transition-colors line-clamp-2">
                  {article.titulo}
                </h2>

                <p className="font-body text-sm text-ink/60 leading-relaxed line-clamp-3 flex-1">
                  {article.resumo}
                </p>

                <div className="flex items-center justify-between mt-5">
                  <span className="font-body text-xs text-ink/55">
                    {formatDate(article.created_at)}
                  </span>
                  <span
                    className="inline-flex items-center gap-1 text-sm font-semibold"
                    style={{ color: "#FF6820" }}
                  >
                    Ler
                    <ArrowRight size={16} className="card-arrow" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <p className="font-body text-sm text-ink/55 mt-8 text-center">
        {filtered.length} artigo{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
      </p>
    </>
  );
}
