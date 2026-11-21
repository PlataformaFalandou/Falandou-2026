"use client";

/**
 * PlansGrid — os 3 planos com o seletor de duração da sessão (25 ou 50 min),
 * como em falandou.com. Padrão: 50 minutos.
 */
import { useState } from "react";
import PriceCard from "@/components/sections/PriceCard";
import { DEFAULT_DURATION, DURATIONS, PLANS, type Duration } from "@/data/plans";

export default function PlansGrid() {
  const [duration, setDuration] = useState<Duration>(DEFAULT_DURATION);
  const sorted = [...DURATIONS].sort((a, b) => a - b);

  return (
    <>
      <div className="flex flex-col items-center gap-3 mb-8">
        <p className="font-body text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>
          Duração de cada sessão
        </p>
        {/* Direção de movimento §4.2: o indicador da opção escolhida desliza em 180ms */}
        <div
          className="relative inline-grid grid-cols-2 p-1 rounded-full"
          role="group"
          aria-label="Duração de cada sessão"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
        >
          <span
            aria-hidden="true"
            className="absolute top-1 bottom-1 left-1 rounded-full"
            style={{
              width: "calc(50% - 4px)",
              backgroundColor: "#FF6820",
              transform: `translateX(${sorted.indexOf(duration) * 100}%)`,
              transition: "transform 180ms var(--ease-enter)",
            }}
          />
          {sorted.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDuration(d)}
              aria-pressed={duration === d}
              className="relative z-[1] h-12 min-w-[120px] px-5 rounded-full font-body text-base font-bold"
              style={{
                color: duration === d ? "var(--color-on-brand)" : "var(--color-text)",
                transition: "color 180ms ease-out",
              }}
            >
              {d} minutos
            </button>
          ))}
        </div>
      </div>

      {/* Celular: rolagem horizontal com snap — cada cartão ocupa 85% da tela e o
          próximo aparece na borda, sinalizando que há mais (UX/UI §9). Desktop: 3 colunas. */}
      <div className="snap-row -mx-5 px-5 md:mx-0 md:px-0 flex md:grid md:grid-cols-3 gap-4 md:gap-6 items-stretch overflow-x-auto md:overflow-visible pt-2 pb-4">
        {PLANS.map((plan) => (
          <div key={plan.id} className="shrink-0 w-[85%] sm:w-[60%] md:w-auto">
            <PriceCard plan={plan} duration={duration} />
          </div>
        ))}
      </div>
      <p className="md:hidden text-center text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
        Deslize para ver os {PLANS.length} planos →
      </p>
    </>
  );
}
