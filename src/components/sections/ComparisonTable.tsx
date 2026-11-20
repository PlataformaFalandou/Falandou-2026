"use client";

/**
 * ComparisonTable
 * Contraste honesto linha a linha: o que o mercado genérico entrega
 * vs. o que a Falandou entrega. Sem atacar nomes, sem superlativo vazio.
 *
 * Critério editorial (ponto 27): cada linha da Falandou tem uma
 * descrição concreta, não só um ✓ vs ✗.
 */

import React from "react";
import CEFRTooltip from "@/components/ui/CEFRTooltip";

const rows: { dimension: string; generic: string; falandou: React.ReactNode }[] = [
  {
    dimension: "Personalização",
    generic: "Mesmo conteúdo para todos os profissionais",
    falandou: "Plano individual — cada profissional tem um objetivo, setor e prazo diferentes",
  },
  {
    dimension: "Tempo de fala por sessão",
    generic: "Dividido entre vários profissionais no grupo",
    falandou: "100% do tempo de cada sessão dedicado a você",
  },
  {
    dimension: "Vocabulário ensinado",
    generic: "Inglês geral — viagens, cotidiano, gramática",
    falandou: "Inglês do seu contexto — reuniões, e-mails, negociações, apresentações",
  },
  {
    dimension: "Como o resultado é medido",
    generic: "Percepção subjetiva do profissional",
    falandou: <>Exame <CEFRTooltip /> diagnóstico no início e de evolução no fim do ciclo</>,
  },
  {
    dimension: "Suporte entre sessões",
    generic: "Fórum ou sem suporte",
    falandou: "WhatsApp ativo durante a semana — dúvidas respondidas fora do horário da sessão",
  },
  {
    dimension: "Prazo para resultado visível",
    generic: "Indefinido — depende do profissional se organizar",
    falandou: "Ciclo de 90 dias com objetivo e prazo definidos desde a primeira sessão",
  },
];

export default function ComparisonTable() {
  return (
    <section className="py-20 md:py-28" style={{ background: "var(--color-bg-alt)" }}>
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="reveal font-body text-sm font-bold uppercase tracking-widest mb-4"
            style={{ color: "#FF6820" }}
          >
            Por que a diferença importa
          </p>
          <h2
            className="reveal font-display font-extrabold leading-tight delay-100"
            style={{ fontSize: "var(--text-h2)", color: "var(--color-text)" }}
          >
            O que você recebe aqui{" "}
            <span style={{ color: "#FF6820" }}>não existe em app ou curso em grupo.</span>
          </h2>
          <p
            className="reveal font-body text-base leading-relaxed mt-4 max-w-xl mx-auto delay-150"
            style={{ color: "rgba(245,246,241,0.65)" }}
          >
            Não é crítica — é o contraste que explica por que cada formato
            existe e para quem cada um faz sentido.
          </p>
        </div>

        {/* Table — desktop */}
        <div className="reveal delay-200 hidden md:block rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.13)" }}>
          {/* Header row */}
          <div className="grid grid-cols-[2fr_3fr_3fr]" style={{ background: "var(--color-bg)" }}>
            <div className="px-6 py-4 text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
              Critério
            </div>
            <div className="px-6 py-4 text-xs font-bold uppercase tracking-widest border-l" style={{ color: "rgba(255,255,255,0.4)", borderColor: "rgba(255,255,255,0.08)" }}>
              Apps e cursos genéricos
            </div>
            <div className="px-6 py-4 text-xs font-bold uppercase tracking-widest border-l" style={{ color: "#FF6820", borderColor: "rgba(255,255,255,0.08)" }}>
              Falandou
            </div>
          </div>

          {/* Data rows */}
          {rows.map((row, i) => (
            <div
              key={row.dimension}
              className="grid grid-cols-[2fr_3fr_3fr] border-t"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                background: i % 2 === 0 ? "#ffffff" : "#fafaf8",
              }}
            >
              <div className="px-6 py-5 flex items-center">
                <span className="font-body text-sm font-bold" style={{ color: "var(--color-text)" }}>
                  {row.dimension}
                </span>
              </div>
              <div className="px-6 py-5 flex items-start gap-3 border-l" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <span className="text-base flex-shrink-0 mt-0.5" aria-hidden>✗</span>
                <span className="font-body text-sm leading-snug" style={{ color: "rgba(245,246,241,0.65)" }}>
                  {row.generic}
                </span>
              </div>
              <div className="px-6 py-5 flex items-start gap-3 border-l" style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,104,32,0.04)" }}>
                <span className="text-base flex-shrink-0 mt-0.5" style={{ color: "#FF6820" }} aria-hidden>✓</span>
                <span className="font-body text-sm font-medium leading-snug" style={{ color: "var(--color-text)" }}>
                  {row.falandou}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Cards — mobile */}
        <div className="md:hidden space-y-4">
          {rows.map((row, i) => (
            <div
              key={row.dimension}
              className={`reveal rounded-2xl overflow-hidden border`}
              style={{ borderColor: "rgba(255,255,255,0.13)", transitionDelay: `${i * 60}ms` }}
            >
              <div className="px-4 py-3" style={{ background: "var(--color-bg)" }}>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {row.dimension}
                </span>
              </div>
              <div className="px-4 py-4 flex items-start gap-3 border-b" style={{ borderColor: "rgba(255,255,255,0.1)", background: "var(--color-surface)" }}>
                <span className="text-sm flex-shrink-0 mt-0.5" aria-hidden>✗</span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "rgba(245,246,241,0.5)" }}>Genérico</p>
                  <p className="text-sm leading-snug" style={{ color: "rgba(245,246,241,0.65)" }}>{row.generic}</p>
                </div>
              </div>
              <div className="px-4 py-4 flex items-start gap-3" style={{ background: "rgba(255,104,32,0.04)" }}>
                <span className="text-sm flex-shrink-0 mt-0.5" style={{ color: "#FF6820" }} aria-hidden>✓</span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "#FF6820" }}>Falandou</p>
                  <p className="text-sm font-medium leading-snug" style={{ color: "var(--color-text)" }}>{row.falandou}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
