"use client";

import React from "react";
import CEFRTooltip from "@/components/ui/CEFRTooltip";

/**
 * ProofStats — seção de prova quantitativa da home.
 * Um único objetivo: provar com dados. Sem CTA, sem depoimentos.
 * Vem antes de Testimonials (dados convencem o analítico; depoimentos humanizam depois).
 */

// ─── dados verificáveis — edite com seus números reais ───────────────────────
const STATS = [
  {
    value: "79%",
    label: "passaram a usar inglês no trabalho",
    sub: "em até 90 dias · medido por exame pré e pós",
  },
  {
    value: "11 sem",
    label: "B1 → B2 em média",
    sub: "mediana do último ciclo · exame antes e depois",
  },
  {
    value: "70%",
    label: "aprovados em seletivas",
    sub: "dentro de 14 meses do início",
  },
  {
    value: "92%",
    label: "concluíram sem abandonar",
    sub: "versus ~50% da média do setor",
  },
];

const METHODOLOGY_NOTES: React.ReactNode[] = [
  <>Exame <CEFRTooltip /> aplicado pela escola antes e após cada ciclo de 90 dias.</>,
  "Dados do último ciclo fechado (Jan–Set 2024) · 87 profissionais avaliados.",
  <>Níveis: A1 · A2 · B1 · B2 · C1 · C2 — padrão europeu usado por Cambridge e IELTS. <CEFRTooltip>O que é CEFR?</CEFRTooltip></>,
];
// ─────────────────────────────────────────────────────────────────────────────

export default function ProofStats() {
  return (
    <section id="resultados" className="pt-24 md:pt-32 pb-4" style={{ backgroundColor: "#161616" }}>
      <div className="max-w-7xl mx-auto px-6">
        <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
          Resultado verificável
        </p>
        <h2
          className="reveal font-display font-extrabold text-white leading-tight mb-3 delay-100"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)" }}
        >
          79% dos profissionais passou a conduzir reuniões{" "}
          <span style={{ color: "#FF6820" }}>e entrevistas em inglês em até 90 dias.</span>
        </h2>
        <p className="reveal font-body text-base delay-150" style={{ color: "rgba(255,255,255,0.45)" }}>
          Medido com exame antes e depois do ciclo — não autoavaliação, não percepção.
        </p>

        {/* Stat grid */}
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-5 mt-10 delay-200">
          {STATS.map((s) => (
            <div
              key={s.value}
              className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
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
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
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
        </div>
      </div>
    </section>
  );
}
