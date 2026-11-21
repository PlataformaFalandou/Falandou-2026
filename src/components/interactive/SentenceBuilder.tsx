"use client";

/**
 * Montar a frase (direção §2.3, §4.1, §4.2).
 * - Mouse/caneta: arrastar o bloco; ele sobe 4px e um marcador mostra onde vai entrar.
 *   Soltar fora da área ou apertar Esc cancela (volta à origem). Sem inércia.
 * - Toque e teclado: tocar/selecionar um bloco e usar "Mover antes" / "Mover depois"
 *   (no celular a rolagem vertical continua livre — não há arraste por toque).
 * - O estado muda na hora; o encaixe (mola discreta, 240ms) só acompanha.
 * - Aceita mais de uma ordem correta e explica a intenção.
 */
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { playSnap } from "@/lib/sfx";

type Props = {
  blocks: string[];
  accepted: string[][];
  end?: string;
  onSolved: (sentence: string) => void;
};

/** Embaralhamento fixo (sem aleatoriedade): nunca começa na ordem certa. */
function initialOrder(n: number): number[] {
  const base = Array.from({ length: n }, (_, i) => i);
  const rotated = [...base.slice(2), ...base.slice(0, 2)].reverse();
  return rotated.every((v, i) => v === i) ? base.reverse() : rotated;
}

export default function SentenceBuilder({ blocks, accepted, end = "", onSolved }: Props) {
  const [order, setOrder] = useState<number[]>(() => initialOrder(blocks.length));
  const [selected, setSelected] = useState<number | null>(null); // posição na ordem
  const [drag, setDrag] = useState<{ from: number; slot: number | null } | null>(null);
  const [settled, setSettled] = useState<number | null>(null); // bloco que acabou de encaixar
  const [result, setResult] = useState<"idle" | "wrong" | "right">("idle");
  const rowRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // Depois de um arraste que mudou a ordem, o clique que vem junto não deve alternar a seleção.
  const ignoreClick = useRef(false);

  const words = order.map((i) => blocks[i]);
  const sentence = words.join(" ") + end;

  const move = (from: number, to: number) => {
    if (to < 0 || to >= order.length || from === to) return;
    const next = [...order];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setOrder(next);
    setSelected(to);
    setSettled(item);
    setResult("idle");
    playSnap();
  };

  // Posição de inserção pelo ponteiro (ordem de leitura: linha, depois coluna)
  const slotFor = (x: number, y: number, from: number): number | null => {
    const row = rowRef.current?.getBoundingClientRect();
    if (!row || x < row.left - 24 || x > row.right + 24 || y < row.top - 24 || y > row.bottom + 24) return null;
    let slot = 0;
    blockRefs.current.forEach((el, i) => {
      if (!el || i === from) return;
      const r = el.getBoundingClientRect();
      const before = y > r.bottom || (y >= r.top && x > r.left + r.width / 2);
      if (before) slot = Math.max(slot, i < from ? i + 1 : i);
    });
    return slot;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>, pos: number) => {
    if (e.pointerType === "touch") return; // toque: seleção + botões
    e.currentTarget.setPointerCapture(e.pointerId);
    setDrag({ from: pos, slot: pos });
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag) return;
    setDrag({ ...drag, slot: slotFor(e.clientX, e.clientY, drag.from) });
  };
  const onPointerUp = () => {
    if (!drag) return;
    if (drag.slot !== null && drag.slot !== drag.from) {
      move(drag.from, drag.slot);
      ignoreClick.current = true;
    }
    setDrag(null);
  };

  const check = () => {
    const ok = accepted.some((a) => a.join(" ") === words.join(" "));
    setResult(ok ? "right" : "wrong");
    if (ok) onSolved(sentence);
  };

  return (
    <div onKeyDown={(e) => e.key === "Escape" && drag && setDrag(null)}>
      <div
        ref={rowRef}
        className="flex flex-wrap items-stretch gap-2 min-h-[56px] p-3 rounded-xl border"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)" }}
        aria-label="Blocos da frase, na ordem atual"
        lang="en"
      >
        {order.map((blockIdx, pos) => {
          const isSel = selected === pos;
          const lifted = drag?.from === pos;
          const showSlotBefore = drag && drag.slot === pos && drag.from !== pos && drag.slot < drag.from;
          const showSlotAfter = drag && drag.slot === pos && drag.from !== pos && drag.slot > drag.from;
          return (
            <span key={blockIdx} className="flex items-stretch gap-2">
              {showSlotBefore && <span className="word-slot" aria-hidden="true" />}
              <button
                ref={(el) => {
                  blockRefs.current[pos] = el;
                }}
                type="button"
                aria-pressed={isSel}
                aria-label={`${blocks[blockIdx]} — posição ${pos + 1} de ${order.length}`}
                data-lifted={lifted || undefined}
                onClick={() => {
                  if (ignoreClick.current) {
                    ignoreClick.current = false;
                    return;
                  }
                  setSelected(isSel ? null : pos);
                }}
                onPointerDown={(e) => onPointerDown(e, pos)}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={() => setDrag(null)}
                onAnimationEnd={() => setSettled(null)}
                className={`word-block ${settled === blockIdx ? "word-settle" : ""} min-h-[44px] px-4 rounded-lg border text-base font-semibold select-none cursor-grab active:cursor-grabbing`}
                style={{
                  backgroundColor: isSel ? "rgba(255,104,32,0.14)" : "var(--color-surface)",
                  borderColor: isSel ? "#FF6820" : "var(--color-border-strong)",
                  color: "#F5F6F1",
                }}
              >
                {blocks[blockIdx]}
              </button>
              {showSlotAfter && <span className="word-slot" aria-hidden="true" />}
            </span>
          );
        })}
        {end && <span className="self-center text-base text-white">{end}</span>}
      </div>

      {/* Controles para toque e teclado */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <button
          type="button"
          onClick={() => selected !== null && move(selected, selected - 1)}
          disabled={selected === null || selected === 0}
          className="cta-secondary cta-sm rounded-full disabled:opacity-40"
          style={{ minHeight: 44 }}
        >
          <ArrowLeft aria-hidden="true" /> Mover antes
        </button>
        <button
          type="button"
          onClick={() => selected !== null && move(selected, selected + 1)}
          disabled={selected === null || selected === order.length - 1}
          className="cta-secondary cta-sm rounded-full disabled:opacity-40"
          style={{ minHeight: 44 }}
        >
          Mover depois <ArrowRight aria-hidden="true" />
        </button>
        <button type="button" onClick={check} className="cta-primary cta-sm rounded-full ml-auto" style={{ minHeight: 44 }}>
          <Check aria-hidden="true" /> Conferir a frase
        </button>
      </div>
      <p className="text-sm mt-2" style={{ color: "var(--color-text-muted)" }}>
        {selected === null
          ? "Arraste os blocos com o mouse, ou toque em um bloco e use “Mover antes” / “Mover depois”."
          : `Bloco selecionado: “${blocks[order[selected]]}”.`}
      </p>

      <p aria-live="polite" className="mt-3 text-base">
        {result === "wrong" && (
          <span style={{ color: "var(--color-text-body)" }}>
            Ainda não soa natural. Dica: a frase começa com “{accepted[0][0]}”.{" "}
            <button type="button" onClick={() => { setOrder(initialOrder(blocks.length)); setSelected(null); setResult("idle"); }} className="cta-tertiary text-white font-semibold inline-flex items-center gap-1 min-h-[44px]">
              <RotateCcw size={14} aria-hidden="true" /> Recomeçar
            </button>
          </span>
        )}
      </p>
    </div>
  );
}
