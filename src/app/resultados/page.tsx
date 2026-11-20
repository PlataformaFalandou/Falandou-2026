import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CTASection from "@/components/sections/CTASection";
import ScrollRevealInit from "@/components/ui/ScrollRevealInit";
import ResultsData from "@/components/sections/ResultsData";
import Testimonials from "@/components/sections/Testimonials";
import LeadMagnetCompact from "@/components/sections/LeadMagnetCompact";

import JsonLd from "@/components/ui/JsonLd";
import { faqSchema } from "@/lib/schema";
export const metadata: Metadata = {
  title: "Resultados | Falandou — Inglês Profissional",
  description:
    "Resultados do último ciclo fechado da Falandou: 79% dos profissionais subiram pelo menos 1 nível CEFR em 90 dias. Veja como medimos, o que cada nível significa no trabalho e a distribuição completa.",
  alternates: { canonical: "https://2026.falandou.com/resultados" },
  openGraph: {
    title: "Resultados medidos, não prometidos | Falandou",
    description: "Exame CEFR antes e depois de cada ciclo de 90 dias. Metodologia e distribuição completa.",
    url: "https://2026.falandou.com/resultados",
  },
};

// Ponto 50 — versão expandida dos resultados para o perfil analítico.
// Só dados do último ciclo fechado; atualizar a cada ciclo novo.
const METHOD = [
  {
    title: "Exame aplicado pela escola",
    body: "Reading, listening, speaking e writing. Não é autoavaliação nem percepção do professor: é um exame com o mesmo formato no início e no fim do ciclo.",
  },
  {
    title: "Antes e depois, mesmo formato",
    body: "O exame inicial define o ponto de partida. Ao fim dos 90 dias, o profissional refaz o exame no mesmo formato, e a comparação é direta.",
  },
  {
    title: "Todo mundo entra na conta",
    body: "Os 87 profissionais do ciclo aparecem na distribuição — inclusive quem manteve o nível e quem saiu antes do exame final (4%).",
  },
  {
    title: "Relatório por habilidade",
    body: "Além do nível geral, o relatório mostra onde cada pessoa mais evoluiu e onde ainda trava. É ele que orienta o próximo ciclo.",
  },
];

// Descrições dos níveis traduzidas para situações de trabalho.
const LEVELS = [
  { level: "A1–A2", name: "Básico", work: "Entende e usa frases simples e rotineiras. Lê e-mails curtos com apoio; ainda depende de tradutor para responder." },
  { level: "B1", name: "Intermediário", work: "Se vira em situações conhecidas: e-mails do dia a dia, conversas previsíveis. Trava em reuniões rápidas ou temas novos." },
  { level: "B2", name: "Intermediário superior", work: "Participa de reuniões, defende um ponto de vista e conversa com nativos sem grande esforço dos dois lados." },
  { level: "C1", name: "Avançado", work: "Usa o inglês com flexibilidade em apresentações, negociações e textos complexos. Ajusta o tom ao público." },
  { level: "C2", name: "Proficiente", work: "Compreende praticamente tudo e se expressa com precisão e nuance, mesmo em situações difíceis." },
];

const FAQS = [
  {
    q: "O que é o CEFR?",
    a: "É o Quadro Europeu Comum de Referência para Línguas, a escala de A1 a C2 usada por Cambridge, IELTS e por multinacionais para descrever o nível de inglês. Medir em CEFR torna o resultado comparável fora da escola.",
  },
  {
    q: "O exame da Falandou é um certificado oficial?",
    a: "Não. É um exame diagnóstico aplicado pela escola e alinhado à escala CEFR, feito para medir a sua evolução no ciclo. Se você precisa de um certificado oficial (como IELTS, TOEFL ou Cambridge), o plano pode incluir a preparação para ele.",
  },
  {
    q: "Quanto tempo leva para subir um nível?",
    a: "No último ciclo, quem começou em B1 chegou a B2 em 11 semanas, em média. O tempo depende do ponto de partida, do plano escolhido e da frequência de prática.",
  },
  {
    q: "E quem não subiu de nível?",
    a: "No último ciclo, 17% mantiveram o nível — em geral, ciclos de consolidação: ganhar segurança no uso sem mudar de faixa. Quando o objetivo do ciclo não é atingido, o plano é revisado com o profissional.",
  },
  {
    q: "Por que mostrar só um ciclo?",
    a: "Porque é o último ciclo fechado com exame antes e depois para todos os participantes. Os números desta página são atualizados a cada novo ciclo fechado.",
  },
];

export default function ResultadosPage() {
  return (
    <>
      <ScrollRevealInit />
      <Navbar />
      <main>
        {/* Dados estruturados — Arquitetura §10 */}
        <JsonLd data={faqSchema(FAQS)} />
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="pt-40 pb-20 md:pt-52 md:pb-24" style={{ backgroundColor: "#161616" }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="max-w-3xl">
              <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-6" style={{ color: "#FF6820" }}>
                Resultados
              </p>
              <h1
                className="reveal font-display font-extrabold text-white leading-tight mb-6 delay-100"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)" }}
              >
                Resultados medidos,{" "}
                <span style={{ color: "#FF6820" }}>não prometidos.</span>
              </h1>
              <p
                className="reveal font-body text-lg leading-relaxed delay-150"
                style={{ color: "rgba(255,255,255,0.6)", maxWidth: "580px" }}
              >
                Exame CEFR antes e depois de cada ciclo de 90 dias. Abaixo estão os números do último
                ciclo fechado, a forma como medimos e o que cada nível significa no trabalho.
              </p>
            </div>
          </div>
        </section>

        {/* ── DISTRIBUIÇÃO ─────────────────────────────────────────────────── */}
        <ResultsData />

        {/* ── COMO MEDIMOS ─────────────────────────────────────────────────── */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
              Como medimos
            </p>
            <h2
              className="reveal font-display font-extrabold leading-tight mb-14 delay-100"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", color: "#161616" }}
            >
              Os números saem de exame, não de opinião.
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {METHOD.map((m) => (
                <div key={m.title} className="reveal rounded-2xl p-8" style={{ backgroundColor: "#F5F6F1" }}>
                  <h3 className="font-display font-extrabold text-lg mb-2" style={{ color: "#161616" }}>{m.title}</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(22,22,22,0.6)" }}>{m.body}</p>
                </div>
              ))}
            </div>
            <p className="reveal font-body text-sm mt-8" style={{ color: "rgba(22,22,22,0.5)" }}>
              Último ciclo fechado: jan–set 2024 · 87 profissionais avaliados.{" "}
              <Link href="/metodo" className="underline underline-offset-4 font-semibold" style={{ color: "#161616" }}>
                Veja o ciclo completo no método
              </Link>
              .
            </p>
          </div>
        </section>

        {/* ── O QUE CADA NÍVEL SIGNIFICA ───────────────────────────────────── */}
        <section className="py-24 md:py-32" style={{ backgroundColor: "#F5F6F1" }}>
          <div className="max-w-5xl mx-auto px-6">
            <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
              A escala CEFR no trabalho
            </p>
            <h2
              className="reveal font-display font-extrabold leading-tight mb-14 delay-100"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", color: "#161616" }}
            >
              O que significa subir um nível.
            </h2>
            <div className="flex flex-col gap-3">
              {LEVELS.map((l) => (
                <div key={l.level} className="reveal grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 rounded-2xl bg-white p-6 border border-black/5">
                  <div>
                    <p className="font-display font-black text-2xl" style={{ color: "#FF6820" }}>{l.level}</p>
                    <p className="font-body text-xs font-semibold uppercase tracking-wide" style={{ color: "rgba(22,22,22,0.45)" }}>{l.name}</p>
                  </div>
                  <p className="font-body text-sm leading-relaxed self-center" style={{ color: "rgba(22,22,22,0.7)" }}>{l.work}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DEPOIMENTOS (humanização depois dos dados) ───────────────────── */}
        <Testimonials />

        {/* ── FAQ SOBRE CEFR ───────────────────────────────────────────────── */}
        <section id="faq" className="py-24 md:py-32 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
              Dúvidas sobre os resultados
            </p>
            <h2
              className="reveal font-display font-extrabold leading-tight mb-10 delay-100"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", color: "#161616" }}
            >
              Perguntas frequentes sobre o CEFR.
            </h2>
            <div className="flex flex-col gap-4">
              {FAQS.map((f) => (
                <details key={f.q} className="group rounded-2xl p-6" style={{ backgroundColor: "#F5F6F1" }}>
                  <summary className="cursor-pointer list-none flex justify-between items-center gap-4 font-display font-bold text-base" style={{ color: "#161616" }}>
                    {f.q}
                    <span className="text-xl transition-transform group-open:rotate-45" style={{ color: "#FF6820" }}>+</span>
                  </summary>
                  <p className="font-body text-sm leading-relaxed mt-4" style={{ color: "rgba(22,22,22,0.65)" }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA (componente reutilizável — Arquitetura §4) ── */}
        <CTASection
          heading="Comece pelo seu ponto de partida."
          text="O primeiro passo é o diagnóstico CEFR: você começa o ciclo sabendo exatamente onde está."
          whatsappContext="resultados"
          secondary={{ href: "/planos", label: "Ver planos e valores" }}
        />

        <LeadMagnetCompact />
      </main>
      <Footer />
    </>
  );
}
