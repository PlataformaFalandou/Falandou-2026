import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollRevealInit from "@/components/ui/ScrollRevealInit";
import LeadMagnetCompact from "@/components/sections/LeadMagnetCompact";
import { TestimonialsGrid } from "@/components/sections/Testimonials";
import { testimonials } from "@/data/testimonials";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Depoimentos | Falandou — Inglês Profissional",
  description:
    "O que dizem profissionais de empresas como IBM, Accenture, Amazon e Google depois do ciclo de inglês profissional da Falandou.",
  alternates: { canonical: "https://2026.falandou.com/depoimentos" },
  openGraph: {
    title: "Depoimentos | Falandou",
    description: "Profissionais contam o que mudou no inglês do trabalho depois do ciclo de 90 dias.",
    url: "https://2026.falandou.com/depoimentos",
  },
};

// Arquitetura da Informação §1 e §7 — página dedicada, destino de "Ver todos os depoimentos".
// Jornada de desconfiança: qualquer página → /depoimentos → /planos → WhatsApp.
export default function DepoimentosPage() {
  return (
    <>
      <ScrollRevealInit />
      <Navbar />
      <main>
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="pt-40 pb-16 md:pt-52 md:pb-20" style={{ backgroundColor: "#161616" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-6" style={{ color: "#FF6820" }}>
                Depoimentos
              </p>
              <h1
                className="reveal font-display font-extrabold text-white leading-tight mb-6 delay-100"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)" }}
              >
                O que muda no trabalho{" "}
                <span style={{ color: "#FF6820" }}>depois do ciclo.</span>
              </h1>
              <p
                className="reveal font-body text-lg leading-relaxed delay-150"
                style={{ color: "rgba(255,255,255,0.6)", maxWidth: "600px" }}
              >
                {testimonials.length} profissionais contam, com as próprias palavras, o que passaram a
                fazer em inglês. Os números por trás desses relatos — exame CEFR antes e depois — estão em{" "}
                <Link href="/resultados" className="underline underline-offset-4 text-white">
                  Resultados
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* ── GRADE ────────────────────────────────────────────────────────── */}
        <section className="pb-24 md:pb-32" style={{ backgroundColor: "#161616" }}>
          <div className="max-w-7xl mx-auto px-6">
            <TestimonialsGrid />
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-24 md:py-32" style={{ backgroundColor: "#FF6820" }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-display font-extrabold text-white leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              A próxima história pode ser a sua.
            </h2>
            <p className="font-body text-lg mb-10" style={{ color: "rgba(255,255,255,0.8)" }}>
              A conversa inicial é gratuita: você entende o ciclo de 90 dias e decide sem pressão.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={getWhatsAppUrlForContext("depoimentos")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-5 rounded-full text-base font-bold transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ backgroundColor: "#161616", color: "white" }}
              >
                Quero começar
              </a>
              <Link
                href="/planos"
                className="inline-flex items-center justify-center px-8 py-5 rounded-full text-base font-semibold transition-all duration-200 hover:scale-105"
                style={{ background: "rgba(255,255,255,0.2)", color: "white", border: "1px solid rgba(255,255,255,0.4)" }}
              >
                Ver planos e valores
              </Link>
            </div>
          </div>
        </section>

        <LeadMagnetCompact />
      </main>
      <Footer />
    </>
  );
}
