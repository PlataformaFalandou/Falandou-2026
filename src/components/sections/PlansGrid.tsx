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

  return (
    <>
      <div className="flex flex-col items-center gap-3 mb-8">
        <p className="font-body text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>
          Duração de cada sessão
        </p>
        <div
          className="inline-flex p-1 rounded-full"
          role="group"
          aria-label="Duração de cada sessão"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          {[...DURATIONS].sort((a, b) => a - b).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDuration(d)}
              aria-pressed={duration === d}
              className="px-5 py-2 rounded-full font-body text-sm font-semibold transition-colors"
              style={{
                backgroundColor: duration === d ? "#FF6820" : "transparent",
                color: "white",
              }}
            >
              {d} minutos
            </button>
          ))}
        </div>
      </div>

      {/* Celular: rolagem horizontal com snap — cada cartão ocupa 85% da tela e o
          próximo aparece na borda, sinalizando que há mais (UX/UI §9). Desktop: 3 colunas. */}
      <div className="snap-row -mx-6 px-6 flex md:grid md:grid-cols-3 gap-4 md:gap-6 items-stretch overflow-x-auto md:overflow-visible pt-2 pb-4">
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
