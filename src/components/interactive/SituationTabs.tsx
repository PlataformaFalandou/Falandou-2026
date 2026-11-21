"use client";

/**
 * Escolha da situação (direção §1.3): Reuniões, Entrevistas ou Apresentações. Troca o exemplo,
 * a frase de demonstração e o contexto do contato. Teclado: setas ← → entre as opções.
 * Profundidade discreta (§3.2): até ~3° e 6px com o mouse; no toque, seleção direta.
 */
import { useRef } from "react";
import { SITUATIONS, type SituationId } from "@/data/situations";
import { setSituation, useSituation } from "@/lib/situationStore";

export default function SituationTabs({ size = "md", depth = false }: { size?: "sm" | "md"; depth?: boolean }) {
  const current = useSituation();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = (i + (e.key === "ArrowRight" ? 1 : SITUATIONS.length - 1)) % SITUATIONS.length;
    setSituation(SITUATIONS[n].id);
    refs.current[n]?.focus();
  };

  const tilt = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!depth || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    const s = e.currentTarget.style;
    s.setProperty("--ry", `${(x * 6).toFixed(2)}deg`);
    s.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
    s.setProperty("--tx", `${(x * 6).toFixed(1)}px`);
    s.setProperty("--ty", `${(y * 6).toFixed(1)}px`);
  };
  const untilt = (e: React.PointerEvent<HTMLButtonElement>) => {
    const s = e.currentTarget.style;
    ["--rx", "--ry", "--tx", "--ty"].forEach((k) => s.removeProperty(k));
  };

  return (
    <div role="radiogroup" aria-label="Escolha uma situação" className={`flex flex-wrap ${size === "sm" ? "gap-2" : "gap-3"}`}>
      {SITUATIONS.map((s, i) => {
        const active = s.id === current;
        return (
          <button
            key={s.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => setSituation(s.id as SituationId)}
            onKeyDown={(e) => onKey(e, i)}
            onPointerMove={tilt}
            onPointerLeave={untilt}
            className={`${depth ? "depth-card" : ""} rounded-xl border font-semibold flex-1 basis-auto whitespace-nowrap ${size === "sm" ? "min-h-[44px] px-3 text-sm" : "min-h-[56px] px-4 text-base"}`}
            style={{
              backgroundColor: active ? "rgba(255,104,32,0.12)" : "var(--color-surface)",
              borderColor: active ? "#FF6820" : "var(--color-border)",
              color: active ? "#fff" : "var(--color-text-body)",
              transition: "background-color var(--dur-base) ease-out, border-color var(--dur-base) ease-out, color var(--dur-base) ease-out, transform var(--dur-base) ease-out",
            }}
          >
            {s.label}
          </button>
        );
      })}
    </div>
  );
}
