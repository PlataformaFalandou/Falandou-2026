import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollRevealInit from "@/components/ui/ScrollRevealInit";
import { ShareReferral, ReferredForm } from "@/components/sections/ReferralActions";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Indique um colega | Falandou",
  description:
    "Indique um colega para a Falandou: compartilhe o link pelo WhatsApp ou LinkedIn e ajude outro profissional a destravar o inglês no trabalho.",
  alternates: { canonical: "/indique/" },
  openGraph: {
    title: "Indique um colega — vocês dois ganham 4 sessões bônus | Falandou",
    description: "Inglês profissional com plano individual, sessões 1 a 1 e exame CEFR antes e depois.",
    url: "/indique/",
  },
};

// Ponto 48 — benefício definido pela escola: 4 sessões bônus para cada lado.
const steps = [
  {
    num: "01",
    title: "Envie para um colega",
    body: "Use o botão abaixo para mandar a mensagem com o link desta página pelo WhatsApp — ou copie e envie por onde preferir.",
  },
  {
    num: "02",
    title: "Ele fala com a equipe e cita você",
    body: "Na primeira mensagem para a equipe, o seu colega informa o seu nome. É assim que a equipe registra a indicação.",
  },
  {
    num: "03",
    title: "Fechou o plano, vocês dois ganham",
    body: "Quando o seu colega fecha um plano, você ganha 4 sessões individuais bônus — e ele também.",
  },
];

export default function IndiquePage() {
  return (
    <>
      <ScrollRevealInit />
      <Navbar />
      <main id="conteudo">
        {/* ── HERO — para o aluno atual ─────────────────────────────────────── */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-20" style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="max-w-5xl mx-auto px-5 md:px-8">
            <div className="max-w-3xl">
              <p className="eyebrow reveal font-body text-sm font-bold uppercase tracking-widest mb-6">
                Programa de indicação
              </p>
              <h1
                className="reveal font-display font-extrabold text-white leading-tight mb-6 delay-100"
                style={{ fontSize: "var(--text-h1)" }}
              >
                Indique um colega.{" "}
                <span style={{ color: "#FF6820" }}>Vocês dois ganham 4 sessões bônus.</span>
              </h1>
              <p
                className="reveal font-body text-lg leading-relaxed mb-10 delay-150"
                style={{ color: "rgba(255,255,255,0.6)", maxWidth: "580px" }}
              >
                Conhece alguém que trava no inglês do trabalho? Quando essa pessoa fechar um plano
                indicada por você, cada um de vocês ganha 4 sessões individuais extras.
              </p>
              <div className="reveal delay-200">
                <ShareReferral />
              </div>
            </div>
          </div>
        </section>

        {/* ── COMO FUNCIONA ─────────────────────────────────────────────────── */}
        <section className="py-12 md:py-20 bg-bg">
          <div className="max-w-5xl mx-auto px-5 md:px-8">
            <p className="eyebrow reveal font-body text-sm font-bold uppercase tracking-widest mb-3">
              Como funciona
            </p>
            <h2
              className="reveal font-display font-extrabold leading-tight mb-14 delay-100"
              style={{ fontSize: "var(--text-h2)", color: "var(--color-text)" }}
            >
              Três passos, sem cadastro.
            </h2>
            <ol className="grid md:grid-cols-3 gap-4 md:gap-6">
              {steps.map((s) => (
                <li key={s.num} className="reveal rounded-2xl p-6 md:p-8" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                  <span className="font-display font-black text-sm" style={{ color: "#FF6820" }}>{s.num}</span>
                  <h3 className="font-display font-extrabold text-[length:var(--text-h3)] mt-3 mb-2" style={{ color: "var(--color-text)" }}>{s.title}</h3>
                  <p className="font-body text-base leading-6" style={{ color: "rgba(245,246,241,0.7)" }}>{s.body}</p>
                </li>
              ))}
            </ol>
            <p className="reveal font-body text-sm mt-8" style={{ color: "rgba(245,246,241,0.6)" }}>
              As sessões bônus são liberadas depois que o plano do indicado é fechado. Dúvidas sobre as regras?{" "}
              <a
                href={getWhatsAppUrlForContext("indicacao")}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 font-semibold"
                style={{ color: "#FF6820" }}
              >
                Fale com a equipe
              </a>
              .
            </p>
          </div>
        </section>

        {/* ── PARA QUEM FOI INDICADO ────────────────────────────────────────── */}
        <section id="fui-indicado" className="py-12 md:py-20" style={{ backgroundColor: "var(--color-bg-alt)" }}>
          <div className="max-w-5xl mx-auto px-5 md:px-8">
            <p className="eyebrow reveal font-body text-sm font-bold uppercase tracking-widest mb-3">
              Foi indicado por alguém?
            </p>
            <h2
              className="reveal font-display font-extrabold leading-tight mb-4 delay-100"
              style={{ fontSize: "var(--text-h2)", color: "var(--color-text)" }}
            >
              Comece com 4 sessões bônus.
            </h2>
            <p className="reveal font-body text-base leading-relaxed mb-8 delay-150" style={{ color: "rgba(245,246,241,0.7)", maxWidth: "560px" }}>
              Diga quem indicou você e fale com a equipe. Você entende o ciclo de 90 dias —
              exame CEFR, plano individual e sessões 1 a 1 — antes de escolher o plano.
            </p>
            <div className="reveal delay-200">
              <ReferredForm />
            </div>
            <p className="font-body text-sm mt-6" style={{ color: "rgba(245,246,241,0.6)" }}>
              Quer conhecer antes?{" "}
              <Link href="/metodo" className="underline underline-offset-4 font-semibold" style={{ color: "var(--color-text)" }}>
                Veja o método
              </Link>{" "}
              ou{" "}
              <Link href="/planos" className="underline underline-offset-4 font-semibold" style={{ color: "var(--color-text)" }}>
                os planos e valores
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
