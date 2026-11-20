import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollRevealInit from "@/components/ui/ScrollRevealInit";
import LeadMagnetCompact from "@/components/sections/LeadMagnetCompact";
import JsonLd from "@/components/ui/JsonLd";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { courseSchema } from "@/lib/schema";
import { INCLUDED_IN_ALL, PLAN_TERMS, getPlan, perSession, planWhatsAppMsg } from "@/data/plans";

// /intensivo apresenta o plano Urgente (Intensive no falandou.com): 16 sessões por mês.
// Preços e itens vêm de src/data/plans.ts.
const INT = getPlan("intensive");

export const metadata: Metadata = {
  title: "Plano Urgente — Inglês Intensivo para Profissionais | Falandou",
  description: `Plano Urgente: ${INT.sessionsPerMonth} sessões individuais por mês, de 25 ou 50 minutos, para quem tem entrevista, promoção ou transferência com data marcada. A partir de ${INT.prices[25]}/mês.`,
  alternates: { canonical: "/intensivo/" },
  openGraph: {
    title: "Plano Urgente | Falandou",
    description: `${INT.sessionsPerMonth} sessões individuais por mês para quem tem prazo. ${INT.prices[50]}/mês com sessões de 50 minutos.`,
    url: "/intensivo/",
    siteName: "Falandou",
    locale: "pt_BR",
    type: "website",
  },
};

const forWhom = [
  {
    title: "Você tem uma entrevista nas próximas semanas",
    desc: "Recrutadores avaliam clareza e ritmo, não só gramática. Com quatro sessões por semana, dá para simular o processo seletivo várias vezes antes do dia.",
  },
  {
    title: "Você foi promovido e o inglês virou requisito",
    desc: "A promoção chegou antes do idioma. O ritmo intensivo acelera o que o novo cargo exige: reuniões, apresentações e alinhamento com times de fora.",
  },
  {
    title: "Você vai trabalhar no exterior",
    desc: "Transferência, projeto internacional ou intercâmbio corporativo: você precisa estar funcional rápido, com o vocabulário do seu trabalho.",
  },
  {
    title: "Você entende bem, mas trava na hora de falar",
    desc: "Mais horas de fala por semana são o caminho mais direto para destravar. É aqui que o volume de sessões faz diferença.",
  },
];

const rhythm = [
  { n: `${INT.sessionsPerMonth}`, label: "sessões individuais por mês", sub: "4 por semana, ao vivo" },
  { n: "25 ou 50", label: "minutos por sessão", sub: "você escolhe ao contratar" },
  { n: "CEFR", label: "exame no início e no fim", sub: "a evolução em número" },
];

export default function IntensivoPage() {
  return (
    <>
      <ScrollRevealInit />
      <Navbar />
      <main>
        <JsonLd
          data={courseSchema({
            name: "Inglês profissional — plano Urgente",
            description: `${INT.sessionsPerMonth} sessões individuais por mês, de 25 ou 50 minutos, com plano personalizado e exame CEFR antes e depois.`,
            path: "/intensivo/",
          })}
        />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="pt-40 pb-24 md:pt-52 md:pb-28" style={{ backgroundColor: "#161616" }}>
          <div className="max-w-4xl mx-auto px-6">
            <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-6" style={{ color: "#FF6820" }}>
              Plano Urgente
            </p>
            <h1
              className="reveal font-display font-extrabold text-white leading-tight mb-6 delay-100"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)" }}
            >
              Você tem uma data.{" "}
              <span style={{ color: "#FF6820" }}>Este plano foi feito para isso.</span>
            </h1>
            {/* Copywriting §4: urgência legítima — o prazo é do aluno, nunca uma data inventada pela escola. */}
            <p className="reveal font-body text-lg leading-relaxed mb-8 delay-150" style={{ color: "rgba(255,255,255,0.65)", maxWidth: "620px" }}>
              Entrevista, promoção ou transferência com data marcada: {INT.sessionsPerMonth} sessões
              individuais por mês — quatro por semana — com atividades personalizadas e professores
              especialistas. O plano é montado de trás para frente, a partir do seu prazo.
            </p>
            <p className="reveal font-body text-base mb-10 delay-200" style={{ color: "rgba(255,255,255,0.85)" }}>
              <strong className="text-white">{INT.prices[50]}/mês</strong> com sessões de 50 minutos
              <span style={{ color: "rgba(255,255,255,0.3)" }}> · </span>
              <strong className="text-white">{INT.prices[25]}/mês</strong> com sessões de 25 minutos
            </p>
            <div className="reveal flex flex-col sm:flex-row gap-4 delay-200">
              <a
                href={getWhatsAppUrl(planWhatsAppMsg(INT, 50))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-5 rounded-full text-base font-bold text-white transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: "#FF6820" }}
              >
                Quero o plano Urgente
              </a>
              <Link
                href="/planos"
                className="inline-flex items-center justify-center px-8 py-5 rounded-full text-base font-semibold text-white transition-all duration-200 hover:scale-105"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                Comparar os planos
              </Link>
            </div>
          </div>
        </section>

        {/* ── RITMO ────────────────────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#FF6820" }} className="py-14">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
            {rhythm.map((r) => (
              <div key={r.label}>
                <p className="font-display font-extrabold text-4xl text-white">{r.n}</p>
                <p className="font-body text-sm font-semibold text-white mt-1">{r.label}</p>
                <p className="font-body text-xs mt-1" style={{ color: "rgba(255,255,255,0.8)" }}>{r.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PARA QUEM É ──────────────────────────────────────────────────── */}
        <section className="py-24 md:py-28" style={{ backgroundColor: "#F5F6F1" }}>
          <div className="max-w-5xl mx-auto px-6">
            <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
              Para quem é
            </p>
            <h2 className="reveal font-display font-extrabold leading-tight mb-12 delay-100" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", color: "#161616" }}>
              Quando o ritmo do prazo é mais rápido que o seu.
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {forWhom.map((item) => (
                <div key={item.title} className="reveal rounded-2xl bg-white border border-black/5 p-7">
                  <h3 className="font-display font-extrabold text-lg mb-2" style={{ color: "#161616" }}>{item.title}</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(22,22,22,0.6)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── O QUE INCLUI ─────────────────────────────────────────────────── */}
        <section className="py-24 md:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
              O que inclui
            </p>
            <h2 className="reveal font-display font-extrabold leading-tight mb-12 delay-100" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", color: "#161616" }}>
              Tudo dos outros planos, no ritmo mais alto.
            </h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <p className="font-body text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(22,22,22,0.45)" }}>
                  Exclusivo do plano Urgente
                </p>
                <ul className="flex flex-col gap-3">
                  {INT.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 font-body text-base" style={{ color: "#161616" }}>
                      <span className="font-bold" style={{ color: "#FF6820" }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-body text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(22,22,22,0.45)" }}>
                  Incluso em todos os planos
                </p>
                <ul className="flex flex-col gap-3">
                  {INCLUDED_IN_ALL.map((f) => (
                    <li key={f} className="flex items-start gap-3 font-body text-base" style={{ color: "rgba(22,22,22,0.7)" }}>
                      <span className="font-bold" style={{ color: "#FF6820" }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="font-body text-sm mt-10" style={{ color: "rgba(22,22,22,0.55)" }}>
              Cada sessão de 50 minutos sai por {perSession(INT, 50)}; a de 25 minutos, por {perSession(INT, 25)}.
            </p>
          </div>
        </section>

        {/* ── CTA FINAL ────────────────────────────────────────────────────── */}
        <section className="py-24 md:py-28" style={{ backgroundColor: "#161616" }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-display font-extrabold text-white leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Qual é o seu prazo?
            </h2>
            <p className="font-body text-lg mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
              Conte a data e o objetivo. A equipe responde em até 1h e diz com franqueza se o
              plano Urgente é o certo ou se outro ritmo resolve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={getWhatsAppUrl(planWhatsAppMsg(INT, 50))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-5 rounded-full text-base font-bold text-white transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: "#FF6820" }}
              >
                Quero o plano Urgente
              </a>
              <Link
                href="/planos"
                className="inline-flex items-center justify-center px-8 py-5 rounded-full text-base font-semibold text-white transition-all duration-200 hover:scale-105"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                Ver todos os planos
              </Link>
            </div>
            <p className="font-body text-xs mt-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
              {PLAN_TERMS}
            </p>
          </div>
        </section>

        <LeadMagnetCompact />
      </main>
      <Footer />
    </>
  );
}
