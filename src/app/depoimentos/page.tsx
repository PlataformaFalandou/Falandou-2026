import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CTASection from "@/components/sections/CTASection";
import ScrollRevealInit from "@/components/ui/ScrollRevealInit";
import LeadMagnetCompact from "@/components/sections/LeadMagnetCompact";
import { TestimonialsBrowser } from "@/components/sections/Testimonials";
import { testimonials } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "Depoimentos | Falandou — Inglês Profissional",
  description:
    "Depoimentos de profissionais que estudaram na Falandou: reuniões, entrevistas, promoções e mudança de país, com o resultado de cada um em inglês.",
  alternates: { canonical: "/depoimentos/" },
  openGraph: {
    title: "Depoimentos | Falandou",
    description: "Profissionais contam o que mudou no inglês do trabalho depois do ciclo de 90 dias.",
    url: "/depoimentos/",
  },
};

// Arquitetura da Informação §1 e §7 — página dedicada, destino de "Ver todos os depoimentos".
// Jornada de desconfiança: qualquer página → /depoimentos → /planos → WhatsApp.
export default function DepoimentosPage() {
  return (
    <>
      <ScrollRevealInit />
      <Navbar />
      <main id="conteudo">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="pt-40 pb-16 md:pt-52 md:pb-20" style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="max-w-[1200px] mx-auto px-5 md:px-8">
            <div className="max-w-3xl">
              <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-6" style={{ color: "#FF6820" }}>
                Depoimentos
              </p>
              <h1
                className="reveal font-display font-extrabold text-white leading-tight mb-6 delay-100"
                style={{ fontSize: "var(--text-h1)" }}
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
        <section className="pb-24 md:pb-32" style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="max-w-[1200px] mx-auto px-5 md:px-8">
            <TestimonialsBrowser />
          </div>
        </section>

        {/* ── CTA (componente reutilizável — Arquitetura §4) ── */}
        <CTASection
          heading="A próxima história pode ser a sua."
          text="Conte o seu objetivo e o seu prazo. A equipe responde em até 1h e explica o ciclo de 90 dias para o seu caso."
          whatsappContext="depoimentos"
          secondary={{ href: "/planos", label: "Ver planos e valores" }}
        />

        <LeadMagnetCompact />
      </main>
      <Footer cta={false} />
    </>
  );
}
