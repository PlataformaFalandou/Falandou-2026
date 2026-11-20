"use client";

/**
 * CEFRScale — a escala A1 → C2 como componente de marca (UX/UI §7, §25).
 * Nós circulares com conector horizontal; cinza nos níveis iniciais, laranja em B1–B2
 * (zona de transformação), dourado em C1–C2.
 * - estático: `from` / `to` marcam o nível atual e o destino;
 * - `interactive`: a pessoa escolhe o próprio nível e vê o próximo e o que ele muda no trabalho.
 */

import { useState } from "react";
import { CEFR_INFO, CEFR_LEVELS, cefrColor, nextLevelNote, type CEFRLevel } from "@/data/cefr";

export default function CEFRScale({
  from,
  to,
  interactive = false,
}: {
  from?: CEFRLevel;
  to?: CEFRLevel;
  interactive?: boolean;
}) {
  const [current, setCurrent] = useState<CEFRLevel | undefined>(from);
  const idx = current ? CEFR_LEVELS.indexOf(current) : -1;
  const target: CEFRLevel | undefined = interactive
    ? current && idx < CEFR_LEVELS.length - 1
      ? CEFR_LEVELS[idx + 1]
      : undefined
    : to;
  const targetIdx = target ? CEFR_LEVELS.indexOf(target) : -1;

  return (
    <div>
      {interactive && (
        <p className="text-sm font-semibold mb-4 text-white" id="cefr-pergunta">
          Onde você está hoje? Toque no seu nível.
        </p>
      )}
      <ol className="relative grid grid-cols-6" aria-labelledby={interactive ? "cefr-pergunta" : undefined}>
        {/* conector */}
        <span aria-hidden="true" className="absolute left-[8.33%] right-[8.33%] top-5 h-0.5" style={{ background: "var(--color-border)" }} />
        {idx >= 0 && targetIdx > idx && (
          <span
            aria-hidden="true"
            className="absolute top-5 h-0.5 transition-all duration-300"
            style={{
              left: `${8.33 + (idx * 100) / 6}%`,
              width: `${((targetIdx - idx) * 100) / 6}%`,
              background: "linear-gradient(90deg, #FF6820, #D9A944)",
            }}
          />
        )}
        {CEFR_LEVELS.map((lv, i) => {
          const color = cefrColor(lv);
          const isCurrent = lv === current;
          const isTarget = lv === target;
          const reached = idx >= 0 && i <= idx;
          const node = (
            <>
              <span
                className="relative z-[1] w-10 h-10 rounded-full flex items-center justify-center font-display font-extrabold text-xs transition-all duration-200"
                style={{
                  backgroundColor: isCurrent || isTarget || reached ? color : "var(--color-bg)",
                  border: `2px solid ${color}`,
                  color: isCurrent || isTarget || reached ? "#0F0F0F" : color,
                  boxShadow: isCurrent ? `0 0 0 5px ${color}33` : undefined,
                }}
              >
                {lv}
              </span>
              <span className="mt-2 text-[11px] leading-tight text-center" style={{ color: isCurrent || isTarget ? "#fff" : "var(--color-text-muted)" }}>
                {isCurrent ? "Você está aqui" : isTarget ? "Próximo nível" : CEFR_INFO[lv].name}
              </span>
            </>
          );
          return (
            <li key={lv} className="flex flex-col items-center">
              {interactive ? (
                <button
                  type="button"
                  onClick={() => setCurrent(lv)}
                  aria-pressed={isCurrent}
                  aria-label={`${lv} — ${CEFR_INFO[lv].name}`}
                  className="flex flex-col items-center min-w-[44px] min-h-[44px]"
                >
                  {node}
                </button>
              ) : (
                node
              )}
            </li>
          );
        })}
      </ol>

      {interactive && current && (
        <div
          className="mt-6 rounded-2xl p-5 md:p-6"
          style={{ backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)" }}
          aria-live="polite"
        >
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Hoje, em {current}: {CEFR_INFO[current].work}
          </p>
          {target && (
            <p className="mt-3 text-base text-white">
              <strong style={{ color: cefrColor(target) }}>Em {target}:</strong> {CEFR_INFO[target].work}
            </p>
          )}
          <p className="mt-3 text-sm font-semibold" style={{ color: "#FF8A4C" }}>
            {nextLevelNote(current)}
          </p>
        </div>
      )}
    </div>
  );
}
