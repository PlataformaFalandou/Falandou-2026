"use client";

import React from "react";
import Link from "next/link";
import CEFRTooltip from "@/components/ui/CEFRTooltip";
import { STATS } from "@/data/stats";

/**
 * ProofStats — seção de prova quantitativa da home.
 * Um único objetivo: provar com dados. Sem CTA, sem depoimentos.
 * Vem antes de Testimonials (dados convencem o analítico; depoimentos humanizam depois).
 */

// ─── dados verificáveis — edite com seus números reais ───────────────────────
const PROOF = [
  {
    value: STATS.cefrUpPct,
    label: "subiram pelo menos 1 nível CEFR",
    sub: `em até ${STATS.cycleDays} dias · medido por exame pré e pós`,
  },
  {
    value: `${STATS.b1b2Weeks} sem`,
    label: "B1 → B2 em média",
    sub: "último ciclo · exame antes e depois",
  },
  {
    value: STATS.selectivePct,
    label: "aprovados em seletivas",
    sub: "dentro de 14 meses do início",
  },
  {
    value: STATS.completionPct,
    label: "concluíram sem abandonar",
    sub: "versus ~50% da média do setor",
  },
];

const METHODOLOGY_NOTES: React.ReactNode[] = [
  <>Exame <CEFRTooltip /> aplicado pela escola antes e após cada ciclo de {STATS.cycleDays} dias.</>,
  `Dados do último ciclo fechado (${STATS.cycleLabel}) · ${STATS.evaluated} profissionais avaliados.`,
  <>Níveis: A1 · A2 · B1 · B2 · C1 · C2 — padrão europeu usado por Cambridge e IELTS. <CEFRTooltip>O que é CEFR?</CEFRTooltip></>,
];
// ─────────────────────────────────────────────────────────────────────────────

export default function ProofStats() {
  return (
    <section id="resultados" className="pt-24 md:pt-32 pb-4" style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#FF6820" }}>
          Resultado verificável
        </p>
        <h2
          className="reveal font-display font-extrabold text-white leading-tight mb-3 delay-100"
          style={{ fontSize: "var(--text-h2)" }}
        >
          {STATS.cefrUpPct} dos profissionais subiram pelo menos 1 nível CEFR{" "}
          <span style={{ color: "#FF6820" }}>em até {STATS.cycleDays} dias.</span>
        </h2>
        <p className="reveal font-body text-base delay-150" style={{ color: "rgba(255,255,255,0.45)" }}>
          Medido com exame antes e depois do ciclo — não autoavaliação, não percepção.
        </p>

        {/* Stat grid */}
        <div className="reveal grid grid-cols-2 md:grid-cols-4 mt-10 delay-200 gap-4 md:gap-6">
          {PROOF.map((s) => (
            <div
              key={s.value}
              className="rounded-2xl p-6 md:p-8"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
            >
              <p className="font-display font-extrabold text-3xl mb-1" style={{ color: "#FF6820" }}>
                {s.value}
              </p>
              <p className="font-body text-sm font-semibold text-white mb-1">{s.label}</p>
              <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Methodology disclosure */}
        <div
          className="reveal mt-6 rounded-xl px-6 py-4 delay-300"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
        >
          <p className="font-body text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
            Como medimos
          </p>
          <ul className="flex flex-col gap-1">
            {METHODOLOGY_NOTES.map((note, idx) => (
              <li key={idx} className="font-body text-xs flex items-start gap-2" style={{ color: "rgba(255,255,255,0.45)" }}>
                <span style={{ color: "#FF6820" }}>—</span> {note}
              </li>
            ))}
          </ul>
          <Link
            href="/resultados"
            className="inline-block mt-3 font-body text-sm font-semibold underline underline-offset-4 hover:text-white transition-colors"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Ver a distribuição completa e a metodologia →
          </Link>
        </div>
      </div>
    </section>
  );
}
