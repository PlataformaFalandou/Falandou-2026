import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getArticles } from "@/lib/blog";

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
  const posts = getArticles().slice(0, 3);

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
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="reveal group flex flex-col bg-neve rounded-2xl overflow-hidden border border-black/5 hover:border-laranja/30 hover:shadow-md transition-all duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Color header bar */}
              <div
                className="h-1.5 w-full"
                style={{ backgroundColor: categoryColors[post.categoria] || "#FF6820" }}
              />

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: `${categoryColors[post.categoria] || "#FF6820"}18`,
                      color: categoryColors[post.categoria] || "#FF6820",
                    }}
                  >
                    {post.categoria}
                  </span>
                  {post.tempo_leitura && (
                    <span className="font-body text-xs text-grafite/40">{post.tempo_leitura} min</span>
                  )}
                </div>

                <h3 className="font-display font-bold text-grafite text-base leading-snug mb-3 group-hover:text-laranja transition-colors line-clamp-2">
                  {post.titulo}
                </h3>

                <p className="font-body text-sm text-grafite/60 leading-relaxed line-clamp-3 flex-1">
                  {post.resumo}
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
