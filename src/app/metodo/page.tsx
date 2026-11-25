import { BarChart3, Check, Dumbbell, Map, Search, Target } from "lucide-react";
import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CTASection from "@/components/sections/CTASection";
import LeadMagnetCompact from "@/components/sections/LeadMagnetCompact";
import ScrollRevealInit from "@/components/ui/ScrollRevealInit";
import MethodCycle from "@/components/ui/MethodCycle";
import CEFRScale from "@/components/ui/CEFRScale";
import SpeakingLoop from "@/components/ui/SpeakingLoop";
import PracticeCaseCard from "@/components/ui/PracticeCaseCard";
import PageIndex from "@/components/ui/PageIndex";
import { SituationInSession } from "@/components/interactive/SituationContext";
import { PRACTICE_CASES } from "@/data/practiceCases";

import JsonLd from "@/components/ui/JsonLd";
import { PAUSE_RULE, RESCHEDULE_RULE, STUDENTS_PER_TEACHER } from "@/data/plans";
import { faqSchema } from "@/lib/schema";
export const metadata: Metadata = {
  title: "Método Falandou: o Ciclo de Inglês de 90 Dias | Falandou",
  description:
    "Como funciona o Método Falandou: exame CEFR, plano individual, sessões 1 a 1 e avaliação no fim de cada ciclo de 90 dias. Resultado medido em número.",
  alternates: {
    canonical: "/metodo/",
  },
  openGraph: {
    title: "Como Funciona | Falandou",
    description:
      "Diagnóstico técnico, plano individual, sessões 1 a 1 e exame de evolução. O ciclo de 90 dias que transforma inglês travado em inglês funcional.",
    url: "/metodo/",
  },
};

// ── Passos do ciclo ───────────────────────────────────────────────────────────
const steps = [
  {
    num: "01",
    tag: "Diagnóstico",
    icon: Search,
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
    icon: Map,
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
    icon: Dumbbell,
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
    icon: Target,
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
    icon: BarChart3,
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
    a: `Pelo resultado do diagnóstico CEFR, pelo seu setor e pelo objetivo do ciclo. O professor é fixo e acompanha no máximo ${STUDENTS_PER_TEACHER} profissionais ao mesmo tempo — você não recomeça do zero a cada sessão.`,
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
      <main id="conteudo">
        {/* Dados estruturados — Arquitetura §10 */}
        <JsonLd data={faqSchema(faqs)} />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section
          className="pt-40 pb-28 md:pt-52 md:pb-36"
          style={{ backgroundColor: "var(--color-bg)" }}
        >
          <div className="max-w-5xl mx-auto px-5 md:px-8">
            <div className="max-w-3xl">
              <p
                className="eyebrow reveal font-body text-sm font-bold uppercase tracking-widest mb-6"
              >
                Como funciona
              </p>
              <h1
                className="reveal font-display font-extrabold text-white leading-tight mb-6 delay-100"
                style={{ fontSize: "var(--text-h1)" }}
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

        {/* Índice da página (revisão de jornada §9) — recolhido no celular */}
        <div className="pb-4 -mt-16 md:-mt-24" style={{ backgroundColor: "var(--color-bg)" }}>
          <PageIndex
            items={[
              { id: "visao-geral", label: "Visão geral" },
              { id: "etapas", label: "Etapas" },
              { id: "uma-sessao", label: "Uma sessão por dentro" },
              { id: "duvidas", label: "Dúvidas" },
            ]}
          />
        </div>

        {/* ── NARRATIVA EM 3 ATOS — tentou → por que não funcionou → o que muda ── */}
        <section className="py-12 md:py-20 bg-bg">
          <div className="max-w-5xl mx-auto px-5 md:px-8">
            <p className="eyebrow reveal font-body text-sm font-bold uppercase tracking-widest mb-3">
              Por que outros formatos não resolveram
            </p>
            <h2
              className="reveal font-display font-extrabold leading-tight mb-14 delay-100"
              style={{ fontSize: "var(--text-h2)", color: "var(--color-text)", maxWidth: "720px" }}
            >
              Você não travou por falta de esforço.
            </h2>
            <ol className="grid md:grid-cols-3 gap-4 md:gap-6">
              {acts.map((act, i) => (
                <li
                  key={act.tag}
                  className="reveal rounded-2xl p-6 md:p-8"
                  style={{
                    backgroundColor: i === 2 ? "var(--color-surface)" : "var(--color-bg-alt)",
                    border: i === 2 ? "2px solid #FF6820" : "1px solid var(--color-border)",
                    transitionDelay: `${Math.min(i * 40, 120)}ms`,
                  }}
                >
                  <span className="eyebrow font-body text-xs font-bold uppercase tracking-widest">
                    {i + 1} · {act.tag}
                  </span>
                  <h3
                    className="font-display font-extrabold text-[length:var(--text-h3)] mt-3 mb-3 leading-snug"
                    style={{ color: "var(--color-text)" }}
                  >
                    {act.title}
                  </h3>
                  <p
                    className="font-body text-base leading-6"
                    style={{ color: i === 2 ? "rgba(255,255,255,0.7)" : "rgba(245,246,241,0.75)" }}
                  >
                    {act.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── CICLO: visão geral em diagrama (UX/UI §17, §25) ────────────── */}
        <section id="visao-geral" className="py-12 md:py-20" style={{ backgroundColor: "var(--color-bg-alt)" }}>
          <div className="max-w-5xl mx-auto px-5 md:px-8">
            <p className="eyebrow reveal font-body text-sm font-bold uppercase tracking-widest mb-3">
              O ciclo em uma imagem
            </p>
            <h2 className="reveal font-display font-extrabold leading-tight mb-12 delay-100 text-white" style={{ fontSize: "var(--text-h2)" }}>
              Diagnóstico, plano, sessões, avaliação — e um novo nível.
            </h2>
            <div className="reveal">
              <MethodCycle />
            </div>

            {/* Escala CEFR interativa: "você está aqui" */}
            <div className="reveal mt-16 rounded-2xl p-6 md:p-6 md:p-8" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
              <h3 className="font-display font-extrabold text-white mb-6" style={{ fontSize: "var(--text-h3)" }}>
                A escala CEFR: de onde você sai e aonde chega.
              </h3>
              <CEFRScale interactive />
            </div>
          </div>
        </section>

        {/* ── ETAPAS DETALHADAS ────────────────────────────────────────────── */}
        <section id="etapas" aria-label="Etapas do ciclo" className="py-12 md:py-20 bg-bg">
          <div className="max-w-5xl mx-auto px-5 md:px-8 space-y-8">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="reveal rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid var(--color-border)",
                  transitionDelay: `${Math.min(i * 40, 120)}ms`,
                }}
              >
                {/* Header strip */}
                <div
                  className="flex items-center gap-4 px-8 py-5"
                  style={{ backgroundColor: i === 0 ? "var(--color-surface)" : "var(--color-bg-alt)" }}
                >
                  <span
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-sm"
                    style={{
                      backgroundColor: "#FF6820",
                      color: "var(--color-on-brand)",
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
                        style={{ color: i === 0 ? "rgba(255,255,255,0.4)" : "rgba(245,246,241,0.5)" }}
                      >
                        {step.when}
                      </span>
                    </div>
                    <h3
                      className="font-display font-extrabold text-[length:var(--text-h3)] mt-1 leading-tight"
                      style={{ color: "var(--color-text)" }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <step.icon size={28} strokeWidth={1.75} className="flex-shrink-0 hidden sm:block" style={{ color: "var(--color-text-muted)" }} aria-hidden="true" />
                </div>

                {/* Body */}
                <div className="px-8 py-7 grid md:grid-cols-[1fr_auto] items-start bg-surface gap-4 md:gap-6">
                  <div>
                    <p
                      className="font-body text-sm font-semibold mb-3"
                      style={{ color: "#FF6820" }}
                    >
                      {step.sub}
                    </p>
                    <p
                      className="font-body text-base leading-relaxed mb-6"
                      style={{ color: "rgba(245,246,241,0.8)" }}
                    >
                      {step.body}
                    </p>
                    <ul className="space-y-2">
                      {step.detail.map((d, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <span
                            className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                            style={{ background: "rgba(255,104,32,0.12)", color: "#FF6820" }}
                          ><Check size={16} strokeWidth={2.5} aria-hidden="true" /></span>
                          <span
                            className="font-body text-sm leading-snug"
                            style={{ color: "rgba(245,246,241,0.75)" }}
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
                    style={{ background: "var(--color-bg-alt)" }}
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

        {/* ── UMA SESSÃO, POR DENTRO — demonstração do método (direção criativa §2.2, §4.2) ── */}
        <section id="uma-sessao" className="py-12 md:py-20" style={{ backgroundColor: "var(--color-bg-alt)" }} aria-labelledby="sessao-por-dentro">
          <div className="max-w-[1200px] mx-auto px-5 md:px-8">
            <p className="eyebrow reveal text-sm font-bold uppercase tracking-widest mb-3">Uma sessão, por dentro</p>
            <h2 id="sessao-por-dentro" className="reveal font-display text-white mb-4 max-w-3xl" style={{ fontSize: "var(--text-h2)" }}>
              Sua próxima situação vira o <span style={{ color: "#FF6820" }}>tema da próxima sessão.</span>
            </h2>
            <p className="reveal text-lg max-w-2xl mb-12" style={{ color: "var(--color-text-body)" }}>
              Você traz o e-mail, a reunião ou a apresentação que tem pela frente. A sessão transforma isso em
              prática: ideia, frase, fala e feedback.
            </p>
            <div className="reveal mb-12">
              <SpeakingLoop />
            </div>
            {/* A situação escolhida na home acompanha o visitante (revisão de jornada §2) */}
            <div className="reveal mb-12">
              <SituationInSession />
            </div>
            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8 lg:gap-12 items-start">
              <div className="reveal">
                <h3 className="font-display text-white mb-4" style={{ fontSize: "var(--text-h3)" }}>
                  Como o professor trabalha um e-mail
                </h3>
                <ul className="flex flex-col gap-3 text-base leading-6" style={{ color: "var(--color-text-body)" }}>
                  <li><strong className="text-white">Identifica o padrão.</strong> Tradução literal do português, tom, estrutura.</li>
                  <li><strong className="text-white">Explica o porquê.</strong> Você entende a regra, não decora a correção.</li>
                  <li><strong className="text-white">Reescreve com você.</strong> A versão final sai da sua frase, no seu contexto.</li>
                  <li><strong className="text-white">Volta na próxima sessão.</strong> O mesmo padrão aparece em outra situação, até ficar automático.</li>
                </ul>
              </div>
              <PracticeCaseCard c={PRACTICE_CASES.followup} />
            </div>
          </div>
        </section>

        {/* ── PERGUNTAS QUE BLOQUEIAM ───────────────────────────────────────── */}
        <section id="duvidas" className="py-12 md:py-20" style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="max-w-4xl mx-auto px-5 md:px-8">
            <div className="text-center mb-14">
              <p
                className="eyebrow reveal font-body text-sm font-bold uppercase tracking-widest mb-3"
              >
                Dúvidas sobre o funcionamento
              </p>
              <h2
                className="reveal font-display font-extrabold leading-tight delay-100"
                style={{ fontSize: "var(--text-h2)", color: "var(--color-text)" }}
              >
                Como o ciclo funciona no dia a dia.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="reveal rounded-2xl p-7 bg-surface"
                  style={{
                    border: "1px solid var(--color-border)",
                    transitionDelay: `${Math.min(i * 40, 120)}ms`,
                  }}
                >
                  <p
                    className="font-display font-bold text-base mb-3 leading-snug"
                    style={{ color: "var(--color-text)" }}
                  >
                    {faq.q}
                  </p>
                  <p
                    className="font-body text-base leading-6"
                    style={{ color: "rgba(245,246,241,0.7)" }}
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
      <Footer cta={false} />
    </>
  );
}
