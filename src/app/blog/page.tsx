import { Metadata } from "next";
import BlogClient from "./BlogClient";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { getArticles, categories } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Blog — Falandou | Inglês para Profissionais",
  description: "Dicas, pronúncia, vocabulário e motivação para você dominar o inglês profissional.",
};

export const revalidate = 3600; // ISR: revalidate every hour

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen bg-neve">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <p className="font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#FF6820" }}>
              Blog Falandou
            </p>
            <h1
              className="font-display font-extrabold text-grafite leading-tight"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}
            >
              Aprenda enquanto decide.
            </h1>
            <p className="font-body text-grafite/60 text-lg mt-3 max-w-xl">
              {articles.length} artigos sobre inglês profissional, pronúncia, vocabulário e muito mais.
            </p>
          </div>

          <BlogClient articles={articles} categories={categories} />
        </div>
      </main>
      <Footer />
    </>
  );
}
