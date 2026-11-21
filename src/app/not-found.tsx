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
      <main id="conteudo">
        <section className="pt-32 pb-12 md:pt-40 md:pb-20 min-h-[80vh]" style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="max-w-5xl mx-auto px-5 md:px-8">
            <p className="eyebrow font-body text-sm font-bold uppercase tracking-widest mb-6">
              Erro 404
            </p>
            <h1
              className="font-display font-extrabold text-white leading-tight mb-6"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Esta página foi para o exterior —{" "}
              <span style={{ color: "#FF6820" }}>mas a equipe continua aqui.</span>
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
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold text-white cta-primary">
                Quero começar
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold text-white transition-all duration-[var(--dur-base)]"
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
                  className="rounded-2xl p-6 md:p-8 transition-all duration-[var(--dur-base)] "
                  style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
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
