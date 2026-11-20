"use client";

import { useCounter } from "@/hooks/useCounter";
import { STATS } from "@/data/stats";

/**
 * StatsBar — faixa de números entre seções (UX/UI §7 + §15).
 * Números em 48px laranja, legenda em 14px, fundo grafite; contam de 0 ao valor
 * real (1,2s) ao entrar na tela. Valores vêm de src/data/stats.ts.
 */
export type StatsBarItem = { value: number | string; suffix?: string; label: string };

function StatItem({ item, delay }: { item: StatsBarItem; delay: number }) {
  const numeric = typeof item.value === "number" ? item.value : null;
  const { count, ref } = useCounter(numeric ?? 0, 1200);
  return (
    <div ref={ref} className="reveal text-center px-4 py-6" style={{ transitionDelay: `${delay}ms` }}>
      <div className="font-display font-extrabold tnum leading-none" style={{ fontSize: "3rem", color: "#FF6820" }}>
        {numeric !== null ? count : item.value}
        {item.suffix}
      </div>
      <div className="text-sm mt-3 max-w-[160px] mx-auto leading-snug" style={{ color: "rgba(245,246,241,0.7)" }}>
        {item.label}
      </div>
    </div>
  );
}

// Faixa de resultado do último ciclo fechado (UX/UI §7).
export const DEFAULT_STATS_BAR: StatsBarItem[] = [
  { value: parseInt(STATS.cefrUpPct, 10), suffix: "%", label: `subiram 1 nível CEFR em ${STATS.cycleDays} dias` },
  { value: STATS.b1b2Weeks, suffix: " sem", label: "de B1 a B2, em média" },
  { value: parseInt(STATS.completionPct, 10), suffix: "%", label: "concluíram o ciclo" },
  { value: STATS.evaluated, label: `avaliados com exame CEFR antes e depois (${STATS.cycleLabel})` },
];

export default function StatsBar({ items = DEFAULT_STATS_BAR }: { items?: StatsBarItem[] } = {}) {
  return (
    <section style={{ backgroundColor: "#161616" }} className="border-y border-white/10 py-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 [&>*:nth-child(3)]:border-l-0 md:[&>*:nth-child(3)]:border-l">
          {items.map((s, i) => (
            <StatItem key={s.label} item={s} delay={i * 100} />
          ))}
        </div>
        {/* Revisão editorial §23: o modelo 1 a 1 explícito nos dois primeiros blocos da home */}
        <p className="text-center text-sm md:text-base pt-4 pb-2 border-t border-white/10 mt-2" style={{ color: "rgba(245,246,241,0.8)" }}>
          <strong className="text-white">Todas as sessões são individuais:</strong> você e o professor, sem turma e sem dividir a atenção.
        </p>
      </div>
    </section>
  );
}
