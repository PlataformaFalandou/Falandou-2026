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
    "Indique um colega para a Falandou: quando ele fechar um plano, vocês dois ganham 4 sessões individuais bônus.",
  alternates: { canonical: "https://2026.falandou.com/indique" },
  openGraph: {
    title: "Indique um colega — vocês dois ganham 4 sessões bônus | Falandou",
    description: "Inglês profissional com plano individual, sessões 1 a 1 e exame CEFR antes e depois.",
    url: "https://2026.falandou.com/indique",
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
    body: "Na conversa inicial (gratuita), o seu colega informa o seu nome. É assim que a equipe registra a indicação.",
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
      <main>
        {/* ── HERO — para o aluno atual ─────────────────────────────────────── */}
        <section className="pt-40 pb-24 md:pt-52 md:pb-32" style={{ backgroundColor: "#161616" }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="max-w-3xl">
              <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-6" style={{ color: "#FF6820" }}>
                Programa de indicação
              </p>
              <h1
                className="reveal font-display font-extrabold text-white leading-tight mb-6 delay-100"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)" }}
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
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
              Como funciona
            </p>
            <h2
              className="reveal font-display font-extrabold leading-tight mb-14 delay-100"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", color: "#161616" }}
            >
              Três passos, sem cadastro.
            </h2>
            <ol className="grid md:grid-cols-3 gap-5">
              {steps.map((s) => (
                <li key={s.num} className="reveal rounded-2xl p-8" style={{ backgroundColor: "#F5F6F1" }}>
                  <span className="font-display font-black text-sm" style={{ color: "#FF6820" }}>{s.num}</span>
                  <h3 className="font-display font-extrabold text-lg mt-3 mb-2" style={{ color: "#161616" }}>{s.title}</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(22,22,22,0.6)" }}>{s.body}</p>
                </li>
              ))}
            </ol>
            <p className="reveal font-body text-sm mt-8" style={{ color: "rgba(22,22,22,0.5)" }}>
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
        <section id="fui-indicado" className="py-24 md:py-32" style={{ backgroundColor: "#F5F6F1" }}>
          <div className="max-w-5xl mx-auto px-6">
            <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
              Foi indicado por alguém?
            </p>
            <h2
              className="reveal font-display font-extrabold leading-tight mb-4 delay-100"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", color: "#161616" }}
            >
              Comece com 4 sessões bônus.
            </h2>
            <p className="reveal font-body text-base leading-relaxed mb-8 delay-150" style={{ color: "rgba(22,22,22,0.6)", maxWidth: "560px" }}>
              Diga quem indicou você e fale com a equipe. A conversa inicial é gratuita: você entende o
              ciclo de 90 dias — exame CEFR, plano individual e sessões 1 a 1 — e decide sem pressão.
            </p>
            <div className="reveal delay-200">
              <ReferredForm />
            </div>
            <p className="font-body text-sm mt-6" style={{ color: "rgba(22,22,22,0.5)" }}>
              Quer conhecer antes?{" "}
              <Link href="/metodo" className="underline underline-offset-4 font-semibold" style={{ color: "#161616" }}>
                Veja o método
              </Link>{" "}
              ou{" "}
              <Link href="/planos" className="underline underline-offset-4 font-semibold" style={{ color: "#161616" }}>
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
