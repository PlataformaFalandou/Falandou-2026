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
      className="reveal text-center px-6 py-2"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="font-display font-extrabold text-4xl md:text-5xl"
        style={{ color: "#FF6820" }}
      >
        {count}
        {suffix}
      </div>
      <div className="font-body text-sm text-grafite/60 mt-1 max-w-[120px] mx-auto leading-snug">
        {label}
      </div>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="bg-white border-y border-black/5 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-black/8">
          <StatItem value={600} suffix="+" label="Profissionais formados" delay={0} />
          <StatItem value={7} suffix="+" label="Anos de experiência" delay={100} />
          <StatItem value={90} label="Dias para resultado visível" delay={200} />
          <StatItem value={4} suffix=".9★" label="Avaliação média pelos alunos" delay={300} />
        </div>
      </div>
    </section>
  );
}
