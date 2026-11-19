import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";

// Ponto 60 — 404 personalizada: quem erra o caminho não sai sem alternativa.
// No export estático vira out/404.html; o public/.htaccess aponta o servidor para ela.
export const metadata: Metadata = {
  title: "Página não encontrada | Falandou",
  robots: { index: false },
};

const LINKS = [
  { href: "/", label: "Página inicial", desc: "O que é a Falandou e para quem é" },
  { href: "/metodo", label: "Como funciona", desc: "O ciclo de 90 dias, etapa por etapa" },
  { href: "/planos", label: "Planos e valores", desc: "Preços e o que cada plano inclui" },
  { href: "/blog", label: "Blog", desc: "Artigos sobre inglês no trabalho" },
];

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-40 pb-24 md:pt-52 md:pb-32 min-h-[80vh]" style={{ backgroundColor: "#161616" }}>
          <div className="max-w-5xl mx-auto px-6">
            <p className="font-body text-sm font-bold uppercase tracking-widest mb-6" style={{ color: "#FF6820" }}>
              Erro 404
            </p>
            <h1
              className="font-display font-extrabold text-white leading-tight mb-6"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)" }}
            >
              Esta página não existe —{" "}
              <span style={{ color: "#FF6820" }}>mas o seu próximo passo sim.</span>
            </h1>
            <p className="font-body text-lg leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.6)", maxWidth: "560px" }}>
              O link pode ter mudado ou estar incompleto. Escolha um caminho abaixo ou fale direto
              com a equipe.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <a
                href={getWhatsAppUrlForContext("hero")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold text-white transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: "#FF6820" }}
              >
                Quero começar
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold text-white transition-all duration-200 hover:scale-105"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)" }}
              >
                Ir para a página inicial
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-2xl p-6 transition-all duration-200 hover:border-white/30"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <p className="font-display font-bold text-white mb-1">{l.label} →</p>
                  <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{l.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
