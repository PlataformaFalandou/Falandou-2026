import { Check } from "lucide-react";
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
  title: "Inglês Intensivo: Plano Urgente | Falandou",
  description: `Plano Urgente: ${INT.sessionsPerMonth} sessões 1 a 1 por mês para quem tem entrevista, promoção ou mudança com data marcada. Exame CEFR incluso. A partir de ${INT.prices[25]}/mês.`,
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
      <main id="conteudo">
        <JsonLd
          data={courseSchema({
            name: "Inglês profissional — plano Urgente",
            description: `${INT.sessionsPerMonth} sessões individuais por mês, de 25 ou 50 minutos, com plano personalizado e exame CEFR antes e depois.`,
            path: "/intensivo/",
          })}
        />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="pt-40 pb-24 md:pt-52 md:pb-28" style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="max-w-4xl mx-auto px-5 md:px-8">
            <p className="eyebrow reveal font-body text-sm font-bold uppercase tracking-widest mb-6">
              Plano Urgente
            </p>
            <h1
              className="reveal font-display font-extrabold text-white leading-tight mb-6 delay-100"
              style={{ fontSize: "var(--text-h1)" }}
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
                className="inline-flex items-center justify-center px-8 py-5 rounded-full text-base font-bold text-white cta-primary">
                Quero o plano Urgente
              </a>
              <Link
                href="/planos"
                className="inline-flex items-center justify-center px-8 py-5 rounded-full text-base font-semibold text-white transition-all duration-[var(--dur-base)]"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid var(--color-border)" }}
              >
                Comparar os planos
              </Link>
            </div>
          </div>
        </section>

        {/* ── RITMO ────────────────────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#FF6820" }} className="on-brand py-14">
          <div className="max-w-5xl mx-auto px-5 md:px-8 grid md:grid-cols-3 text-center gap-4 md:gap-6">
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
        <section className="py-12 md:py-20" style={{ backgroundColor: "var(--color-bg-alt)" }}>
          <div className="max-w-5xl mx-auto px-5 md:px-8">
            <p className="eyebrow reveal font-body text-sm font-bold uppercase tracking-widest mb-3">
              Para quem é
            </p>
            <h2 className="reveal font-display font-extrabold leading-tight mb-12 delay-100" style={{ fontSize: "var(--text-h2)", color: "var(--color-text)" }}>
              Quando o ritmo do prazo é mais rápido que o seu.
            </h2>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {forWhom.map((item) => (
                <div key={item.title} className="reveal rounded-2xl bg-surface border border-border p-7">
                  <h3 className="font-display font-extrabold text-[length:var(--text-h3)] mb-2" style={{ color: "var(--color-text)" }}>{item.title}</h3>
                  <p className="font-body text-base leading-6" style={{ color: "rgba(245,246,241,0.7)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── O QUE INCLUI ─────────────────────────────────────────────────── */}
        <section className="py-12 md:py-20 bg-bg">
          <div className="max-w-5xl mx-auto px-5 md:px-8">
            <p className="eyebrow reveal font-body text-sm font-bold uppercase tracking-widest mb-3">
              O que inclui
            </p>
            <h2 className="reveal font-display font-extrabold leading-tight mb-12 delay-100" style={{ fontSize: "var(--text-h2)", color: "var(--color-text)" }}>
              Tudo dos outros planos, no ritmo mais alto.
            </h2>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <p className="font-body text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(245,246,241,0.55)" }}>
                  Exclusivo do plano Urgente
                </p>
                <ul className="flex flex-col gap-3">
                  {INT.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 font-body text-base" style={{ color: "var(--color-text)" }}>
                      <span className="font-bold" style={{ color: "#FF6820" }}><Check size={16} strokeWidth={2.5} aria-hidden="true" /></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-body text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(245,246,241,0.55)" }}>
                  Incluso em todos os planos
                </p>
                <ul className="flex flex-col gap-3">
                  {INCLUDED_IN_ALL.map((f) => (
                    <li key={f} className="flex items-start gap-3 font-body text-base" style={{ color: "rgba(245,246,241,0.8)" }}>
                      <span className="font-bold" style={{ color: "#FF6820" }}><Check size={16} strokeWidth={2.5} aria-hidden="true" /></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="font-body text-sm mt-10" style={{ color: "rgba(245,246,241,0.65)" }}>
              Cada sessão de 50 minutos sai por {perSession(INT, 50)}; a de 25 minutos, por {perSession(INT, 25)}.
            </p>
          </div>
        </section>

        {/* ── CTA FINAL ────────────────────────────────────────────────────── */}
        <section className="py-12 md:py-20" style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
            <h2 className="font-display font-extrabold text-white leading-tight mb-4" style={{ fontSize: "var(--text-h2)" }}>
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
                className="inline-flex items-center justify-center px-10 py-5 rounded-full text-base font-bold text-white cta-primary">
                Quero o plano Urgente
              </a>
              <Link
                href="/planos"
                className="inline-flex items-center justify-center px-8 py-5 rounded-full text-base font-semibold text-white transition-all duration-[var(--dur-base)]"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid var(--color-border)" }}
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
