import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CTASection from "@/components/sections/CTASection";
import LeadMagnetCompact from "@/components/sections/LeadMagnetCompact";
import ScrollRevealInit from "@/components/ui/ScrollRevealInit";

import JsonLd from "@/components/ui/JsonLd";
import { PAUSE_RULE, RESCHEDULE_RULE, STUDENTS_PER_TEACHER } from "@/data/plans";
import { faqSchema } from "@/lib/schema";
export const metadata: Metadata = {
  title: "Como Funciona | Falandou — Inglês Profissional",
  description:
    "O ciclo de 90 dias da Falandou: diagnóstico CEFR → plano individualizado → sessões 1 a 1 → avaliação de evolução. Processo claro, resultado em número.",
  alternates: {
    canonical: "https://2026.falandou.com/metodo",
  },
  openGraph: {
    title: "Como Funciona | Falandou",
    description:
      "Diagnóstico técnico, plano individual, sessões 1 a 1 e exame de evolução. O ciclo de 90 dias que transforma inglês travado em inglês funcional.",
    url: "https://2026.falandou.com/metodo",
  },
};

// ── Passos do ciclo ───────────────────────────────────────────────────────────
const steps = [
  {
    num: "01",
    tag: "Diagnóstico",
    icon: "🔍",
    title: "Exame CEFR diagnóstico",
    sub: "Ponto de partida técnico, sem achismo",
    body: "Antes de qualquer sessão, você faz um exame completo nas quatro habilidades — reading, listening, speaking e writing. O resultado posiciona você no padrão europeu CEFR (A1 a C2). Sem isso, qualquer plano é chute.",
    detail: [
      "Exame aplicado pela própria escola, não autoavaliação",
      "Resultado em até 48 horas com relatório detalhado por habilidade",
      "Identifica exatamente onde estão os bloqueios — não só o nível geral",
    ],
    when: "Antes de começar",
    color: "#FF6820",
  },
  {
    num: "02",
    tag: "Estratégia",
    icon: "🗺️",
    title: "Plano individual de 90 dias",
    sub: "Montado para o seu objetivo, não para um público genérico",
    body: "Com o diagnóstico em mãos, os professores montam seu plano semana a semana. O vocabulário é do seu setor. As situações são do seu trabalho. Engenheiro treina engenharia; gestor treina reuniões e apresentações executivas.",
    detail: [
      "Nenhum profissional faz o mesmo plano que outro",
      "Inclui objetivos por semana — você sabe onde deve estar no fim de cada ciclo",
      "Ajuste possível a cada 30 dias conforme evolução",
    ],
    when: "Semana 1",
    color: "#FF6820",
  },
  {
    num: "03",
    tag: "Prática",
    icon: "⚡",
    title: "Prática guiada entre sessões",
    sub: "Atividades que imitam o uso real — não banco de questões genéricas",
    body: "Cada semana tem atividades direcionadas ao seu plano. Situações reais, vocabulário ativo, estruturas que você vai usar no trabalho. A prática é projetada para ativar o inglês, não apenas reconhecê-lo.",
    detail: [
      "20–30 minutos por dia — encaixa na rotina real",
      "Dúvidas respondidas pelo professor via WhatsApp no mesmo dia",
      "Sem acúmulo: cada semana constrói sobre a anterior",
    ],
    when: "Durante todo o ciclo",
    color: "#FF6820",
  },
  {
    num: "04",
    tag: "Sessões",
    icon: "🎯",
    title: "Sessões 1 a 1 com o professor",
    sub: "100% do tempo de cada sessão dedicado a você",
    body: "Sem dividir atenção com outros. O professor conhece seu plano, seu nível, seu objetivo. Cada sessão é uma conversa sobre o que você precisa usar — não sobre o que está no livro.",
    detail: [
      "De 4 a 16 sessões por mês, de 25 ou 50 minutos, conforme o plano",
      "Professor fixo — você não recomeça do zero a cada sessão",
      "Reagendamento sem custo com 24h de antecedência, pelo WhatsApp",
    ],
    when: "Durante todo o ciclo",
    color: "#FF6820",
  },
  {
    num: "05",
    tag: "Resultado",
    icon: "📊",
    title: "Exame de evolução CEFR",
    sub: "Resultado em número, não em sensação",
    body: "Ao final dos 90 dias você refaz o exame CEFR. Comparamos com o ponto de partida — você vê exatamente quanto subiu. 79% dos profissionais sobem pelo menos 1 nível. Se quiser continuar, o próximo plano começa do novo patamar.",
    detail: [
      "Mesmo formato do exame inicial para comparação real",
      "Relatório com evolução por habilidade — onde você mais cresceu",
      "Se o objetivo não foi atingido, revisamos o plano juntos",
    ],
    when: "Semana 13",
    color: "#FF6820",
  },
];

// ── Narrativa de comparação em 3 atos (Copywriting §9) ────────────────────────
// Na home fica só o gancho (atos 1 + 2, MetodoTeaser); aqui o ato 3 é desenvolvido.
const acts = [
  {
    tag: "Você tentou",
    title: "O inglês melhorou um pouco. O tranco continuou.",
    body: "Você já tentou aplicativo. Teve aula em grupo. Assistiu vídeo no YouTube. O inglês melhorou um pouco — mas na hora do meeting, do e-mail ou da entrevista, o tranco voltou.",
  },
  {
    tag: "Por que não funcionou",
    title: "Nenhum desses formatos foi feito para o seu trabalho.",
    body: "Foram feitos para atender o maior número possível de pessoas: vocabulário sem contexto, ritmo da turma, conteúdo que você só assiste. É o oposto do que você precisa para falar numa reunião.",
  },
  {
    tag: "O que é diferente aqui",
    title: "A Falandou parte do seu contexto.",
    body: "O seu cargo, o seu setor e as situações em que você trava. O exame CEFR mostra onde você está; o professor monta o plano a partir disso; cada sessão é desenhada para o que você vai usar na semana seguinte. E no fim, o mesmo exame mostra quanto você avançou.",
  },
];

// ── FAQ do método: responde "como funciona" — complementar ao FAQ da home,
//    que responde "o que é" (Copywriting §8). Sem perguntas repetidas.
const faqs = [
  {
    q: "Preciso ter algum nível mínimo para começar?",
    a: "Não. O exame diagnóstico define o ponto de partida com precisão — trabalhamos com profissionais de A2 a C1. Se você consegue se comunicar minimamente em inglês, já dá para estruturar o plano.",
  },
  {
    q: "Como o professor é escolhido?",
    a: `Pelo resultado do diagnóstico CEFR, pelo seu setor e pelo objetivo do ciclo. O professor é fixo e acompanha no máximo ${STUDENTS_PER_TEACHER} alunos ativos ao mesmo tempo — você não recomeça do zero a cada sessão.`,
  },
  {
    q: "E se eu faltar a uma sessão?",
    a: `${RESCHEDULE_RULE} Os créditos de sessão valem dentro do ciclo mensal do plano — por isso vale reagendar no mesmo mês. ${PAUSE_RULE}`,
  },
  {
    q: "O plano muda durante o ciclo?",
    a: "Pode mudar. A cada 30 dias o professor revisa o que avançou e ajusta o foco das semanas seguintes — por exemplo, se uma entrevista foi marcada ou se a escrita evoluiu mais rápido que a fala.",
  },
  {
    q: "Posso começar a qualquer momento?",
    a: "Sim. Não há turma nem data de início — cada ciclo começa quando você começa, com o exame diagnóstico.",
  },
  {
    q: "Por que 90 dias e não 6 meses?",
    a: "90 dias é tempo suficiente para resultado mensurável e curto o suficiente para manter foco. Ciclos longos perdem ritmo e motivação. Ao final, você decide se quer continuar — mas já tem um resultado em mãos para decidir com dados.",
  },
];

export default function MetodoPage() {
  return (
    <>
      <ScrollRevealInit />
      <Navbar />
      <main>
        {/* Dados estruturados — Arquitetura §10 */}
        <JsonLd data={faqSchema(faqs)} />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section
          className="pt-40 pb-28 md:pt-52 md:pb-36"
          style={{ backgroundColor: "#161616" }}
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className="max-w-3xl">
              <p
                className="reveal font-body text-sm font-bold uppercase tracking-widest mb-6"
                style={{ color: "#FF6820" }}
              >
                Como funciona
              </p>
              <h1
                className="reveal font-display font-extrabold text-white leading-tight mb-6 delay-100"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)" }}
              >
                Um ciclo de 90 dias com{" "}
                <span style={{ color: "#FF6820" }}>processo visível</span>{" "}
                e resultado em número.
              </h1>
              <p
                className="reveal font-body text-lg leading-relaxed mb-10 delay-150"
                style={{ color: "rgba(255,255,255,0.6)", maxWidth: "560px" }}
              >
                Diagnóstico técnico, plano individual, sessões 1 a 1 e exame
                de evolução CEFR. Você sabe exatamente o que acontece em cada
                etapa — sem surpresa, sem &ldquo;continue e veja&rdquo;.
              </p>

              {/* Stat strip */}
              <div className="reveal flex flex-wrap gap-6 delay-200">
                {[
                  { v: "79%", l: "sobem 1 nível CEFR" },
                  { v: "11 sem", l: "B1 → B2 em média" },
                  { v: "90 dias", l: "por ciclo" },
                ].map((s) => (
                  <div key={s.v} className="flex items-center gap-3">
                    <span
                      className="font-display font-extrabold text-2xl"
                      style={{ color: "#FF6820" }}
                    >
                      {s.v}
                    </span>
                    <span
                      className="font-body text-sm"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {s.l}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── NARRATIVA EM 3 ATOS — tentou → por que não funcionou → o que muda ── */}
        <section className="py-24 md:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
              Por que outros formatos não resolveram
            </p>
            <h2
              className="reveal font-display font-extrabold leading-tight mb-14 delay-100"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", color: "#161616", maxWidth: "720px" }}
            >
              Você não travou por falta de esforço.
            </h2>
            <ol className="grid md:grid-cols-3 gap-5">
              {acts.map((act, i) => (
                <li
                  key={act.tag}
                  className="reveal rounded-2xl p-8"
                  style={{
                    backgroundColor: i === 2 ? "#161616" : "#F5F6F1",
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <span className="font-body text-xs font-bold uppercase tracking-widest" style={{ color: "#FF6820" }}>
                    {i + 1} · {act.tag}
                  </span>
                  <h3
                    className="font-display font-extrabold text-lg mt-3 mb-3 leading-snug"
                    style={{ color: i === 2 ? "white" : "#161616" }}
                  >
                    {act.title}
                  </h3>
                  <p
                    className="font-body text-sm leading-relaxed"
                    style={{ color: i === 2 ? "rgba(255,255,255,0.7)" : "rgba(22,22,22,0.65)" }}
                  >
                    {act.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── CICLO: visão geral ────────────────────────────────────────────── */}
        <section className="py-6 md:py-8" style={{ backgroundColor: "#F5F6F1" }}>
          <div className="max-w-5xl mx-auto px-6">
            {/* Timeline bar */}
            <div className="reveal flex items-center justify-between gap-0 overflow-x-auto py-6">
              {steps.map((step, i) => (
                <div key={step.num} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center text-center px-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm mb-2"
                      style={{ backgroundColor: "#FF6820" }}
                    >
                      {step.num}
                    </div>
                    <span className="font-body text-xs font-bold" style={{ color: "#161616" }}>
                      {step.tag}
                    </span>
                    <span className="font-body text-xs mt-0.5" style={{ color: "rgba(22,22,22,0.4)" }}>
                      {step.when}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className="flex-1 h-0.5 mx-1 min-w-[24px] md:min-w-[40px]"
                      style={{ background: "rgba(255,104,32,0.25)" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ETAPAS DETALHADAS ────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-6 space-y-8">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="reveal rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid rgba(0,0,0,0.07)",
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                {/* Header strip */}
                <div
                  className="flex items-center gap-4 px-8 py-5"
                  style={{ backgroundColor: i === 0 ? "#161616" : "#F5F6F1" }}
                >
                  <span
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-sm"
                    style={{
                      backgroundColor: "#FF6820",
                      color: "white",
                    }}
                  >
                    {step.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                        style={{ background: "rgba(255,104,32,0.15)", color: "#FF6820" }}
                      >
                        {step.tag}
                      </span>
                      <span
                        className="font-body text-xs"
                        style={{ color: i === 0 ? "rgba(255,255,255,0.4)" : "rgba(22,22,22,0.4)" }}
                      >
                        {step.when}
                      </span>
                    </div>
                    <h3
                      className="font-display font-extrabold text-lg mt-1 leading-tight"
                      style={{ color: i === 0 ? "white" : "#161616" }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <span className="text-3xl flex-shrink-0 hidden sm:block">{step.icon}</span>
                </div>

                {/* Body */}
                <div className="px-8 py-7 grid md:grid-cols-[1fr_auto] gap-8 items-start bg-white">
                  <div>
                    <p
                      className="font-body text-sm font-semibold mb-3"
                      style={{ color: "#FF6820" }}
                    >
                      {step.sub}
                    </p>
                    <p
                      className="font-body text-base leading-relaxed mb-6"
                      style={{ color: "rgba(22,22,22,0.7)" }}
                    >
                      {step.body}
                    </p>
                    <ul className="space-y-2">
                      {step.detail.map((d, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <span
                            className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                            style={{ background: "rgba(255,104,32,0.12)", color: "#FF6820" }}
                          >
                            ✓
                          </span>
                          <span
                            className="font-body text-sm leading-snug"
                            style={{ color: "rgba(22,22,22,0.65)" }}
                          >
                            {d}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Step number watermark */}
                  <div
                    className="hidden md:flex items-center justify-center font-display font-black select-none flex-shrink-0"
                    style={{
                      fontSize: "6rem",
                      lineHeight: 1,
                      color: "rgba(0,0,0,0.04)",
                      width: "120px",
                    }}
                  >
                    {step.num}
                  </div>
                </div>

                {/* Connector arrow — not on last */}
                {i < steps.length - 1 && (
                  <div
                    className="flex justify-center py-2"
                    style={{ background: "#F5F6F1" }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 5v14M12 19l-5-5M12 19l5-5"
                        stroke="rgba(255,104,32,0.4)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── PERGUNTAS QUE BLOQUEIAM ───────────────────────────────────────── */}
        <section className="py-24 md:py-32" style={{ backgroundColor: "#F5F6F1" }}>
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-14">
              <p
                className="reveal font-body text-sm font-bold uppercase tracking-widest mb-4"
                style={{ color: "#FF6820" }}
              >
                Dúvidas sobre o funcionamento
              </p>
              <h2
                className="reveal font-display font-extrabold leading-tight delay-100"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", color: "#161616" }}
              >
                Como o ciclo funciona no dia a dia.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="reveal rounded-2xl p-7 bg-white"
                  style={{
                    border: "1px solid rgba(0,0,0,0.07)",
                    transitionDelay: `${i * 50}ms`,
                  }}
                >
                  <p
                    className="font-display font-bold text-base mb-3 leading-snug"
                    style={{ color: "#161616" }}
                  >
                    {faq.q}
                  </p>
                  <p
                    className="font-body text-sm leading-relaxed"
                    style={{ color: "rgba(22,22,22,0.6)" }}
                  >
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA (componente reutilizável — Arquitetura §4) ── */}
        <CTASection
          heading="Pronto para começar pelo diagnóstico?"
          text="Conte o seu objetivo e o seu prazo. A equipe responde em até 1h e explica como o ciclo fica no seu caso."
          whatsappContext="metodo"
          secondary={{ href: "/planos", label: "Ver planos e valores" }}
        />

        <LeadMagnetCompact />

      </main>
      <Footer />
    </>
  );
}
