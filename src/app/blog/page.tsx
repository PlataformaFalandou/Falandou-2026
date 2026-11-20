import { Metadata } from "next";
import BlogClient from "./BlogClient";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { getArticles, getCategories } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Falandou | Inglês para Profissionais",
  description: "Artigos sobre pronúncia, vocabulário e comunicação em inglês para profissionais — com base no que realmente funciona em reuniões, entrevistas e apresentações.",
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: "Blog Falandou — Inglês para Profissionais",
    description: "Vocabulário profissional, carreira internacional, método e CEFR.",
    url: "/blog/",
    siteName: "Falandou",
    locale: "pt_BR",
    type: "website",
  },
};

export default function BlogPage() {
  const articles = getArticles();
  return (
    <>
      <Navbar solid />
      <main id="conteudo" className="pt-24 pb-20 min-h-screen bg-bg-alt">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#FF6820" }}>
              Blog Falandou
            </p>
            <h1
              className="font-display font-extrabold text-ink leading-tight"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Aprenda enquanto decide.
            </h1>
            <p className="font-body text-ink/60 text-lg mt-3 max-w-xl">
              {articles.length} artigos sobre inglês profissional, pronúncia, vocabulário e muito mais.
            </p>
          </div>

          <BlogClient articles={articles} categories={getCategories()} />
        </div>
      </main>
      <Footer />
    </>
  );
}
