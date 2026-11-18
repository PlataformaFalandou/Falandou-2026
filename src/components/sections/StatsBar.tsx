"use client";

import { useCounter } from "@/hooks/useCounter";

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

export default function StatsBar() {
  return (
    <section style={{ backgroundColor: "#161616" }} className="border-y border-white/10 py-4">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <StatItem value={600} suffix="+" label="Profissionais formados" delay={0} />
          <StatItem value={7} suffix="+" label="Anos de experiência" delay={100} />
          <StatItem value={90} label="Dias para resultado visível" delay={200} />
          <StatStatic display="4.9★" label="Avaliação média pelos alunos" delay={300} />
        </div>
      </div>
    </section>
  );
}
