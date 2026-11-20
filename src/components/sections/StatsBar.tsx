"use client";

import { useCounter } from "@/hooks/useCounter";
import { STATS } from "@/data/stats";

function StatItem({
  value,
  suffix = "",
  label,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}) {
  const { count, ref } = useCounter(value, 2000);

  return (
    <div
      ref={ref}
      className="reveal text-center px-6 py-6"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="font-display font-extrabold text-4xl md:text-5xl text-white">
        {count}
        {suffix}
      </div>
      <div className="text-white/60 text-sm mt-2 max-w-[140px] mx-auto leading-snug">
        {label}
      </div>
    </div>
  );
}

function StatStatic({ display, label, delay = 0 }: { display: string; label: string; delay?: number }) {
  return (
    <div
      className="reveal text-center px-6 py-6"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="font-display font-extrabold text-4xl md:text-5xl text-white">
        {display}
      </div>
      <div className="text-white/60 text-sm mt-2 max-w-[140px] mx-auto leading-snug">
        {label}
      </div>
    </div>
  );
}

// Credenciais institucionais da escola (ponto 36). 600+ formados e 4.9★ já estão
// na Hero — aqui ficam as credenciais que a Hero não mostra.
// Arquitetura §4: valores vêm de src/data/stats.ts; páginas podem passar `items`.
export type StatsBarItem = { value: number | string; suffix?: string; label: string };

export const DEFAULT_STATS_BAR: StatsBarItem[] = [
  { value: STATS.yearsOperating, suffix: "+", label: "Anos de operação da escola" },
  { value: "CEFR", label: "Exame antes e depois de cada ciclo" },
  { value: "1:1", label: "Sessões individuais" },
  { value: STATS.cycleDays, label: "Dias por ciclo" },
];

export default function StatsBar({ items = DEFAULT_STATS_BAR }: { items?: StatsBarItem[] } = {}) {
  return (
    <section style={{ backgroundColor: "#161616" }} className="border-y border-white/10 py-4">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {items.map((s, i) =>
            typeof s.value === "number" ? (
              <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} delay={i * 100} />
            ) : (
              <StatStatic key={s.label} display={`${s.value}${s.suffix ?? ""}`} label={s.label} delay={i * 100} />
            )
          )}
        </div>
      </div>
    </section>
  );
}