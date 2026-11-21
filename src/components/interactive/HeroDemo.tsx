"use client";

/**
 * Abertura que demonstra o ensino (direção §1.2, §6.1): a situação escolhida, a primeira versão
 * da frase e o botão "Ver como trabalharíamos essa frase". A revisão risca o trecho original,
 * apresenta a substituição (≈600ms, repetível) e a observação do professor.
 * - A altura do painel não muda: os dois estados ocupam a mesma célula da grade.
 * - Sem efeito de digitação. Com movimento reduzido, tudo aparece direto.
 * - Identificado como exemplo didático.
 */
import { useCallback, useState } from "react";
import { RotateCcw } from "lucide-react";
import { getSituation } from "@/data/situations";
import { useSituation } from "@/lib/situationStore";
import SituationTabs from "@/components/interactive/SituationTabs";
import ListenButton from "@/components/interactive/ListenButton";

export default function HeroDemo() {
  const s = getSituation(useSituation());
  // Revisão aberta para qual situação (trocar de situação volta ao estado inicial).
  const [openFor, setOpenFor] = useState<string | null>(null);
  const [run, setRun] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const open = openFor === s.id;
  const onSpeak = useCallback((p: boolean) => setSpeaking(p), []);

  return (
    <figure
      className="rounded-2xl text-left"
      style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      aria-label="Exemplo didático: como uma sessão trabalha uma frase"
    >
      <div className="p-6">
        <p className="eyebrow text-xs font-bold uppercase tracking-widest mb-4">Exemplo didático</p>
        <SituationTabs size="sm" />
        <p className="font-display font-bold text-white text-lg leading-snug mt-5">{s.prompt}</p>

        {/* Os dois estados na mesma célula: a altura é a do maior, sem saltos */}
        <div className="grid mt-4" aria-live="polite">
          <div className="[grid-area:1/1]" style={{ visibility: open ? "hidden" : "visible" }} aria-hidden={open}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--color-text-muted)" }}>
              Primeira versão
            </p>
            <p lang="en" className="text-base leading-6 pl-4 border-l-2 italic" style={{ borderColor: "var(--color-border-strong)", color: "var(--color-text-body)" }}>
              “{s.draft}”
            </p>
            <button type="button" onClick={() => { setOpenFor(s.id); setRun((r) => r + 1); }} className="cta-primary cta-sm rounded-full mt-5" style={{ minHeight: 44 }}>
              Ver como trabalharíamos essa frase
            </button>
          </div>

          <div key={run} className="[grid-area:1/1]" style={{ visibility: open ? "visible" : "hidden" }} aria-hidden={!open}>
            <p lang="en" className="text-base leading-6 pl-4 border-l-2" style={{ borderColor: "#FF6820" }}>
              <span className="diff-old block">“{s.draft}”</span>
              <span className={`diff-new block mt-1 text-white font-medium ${speaking ? "speaking-hl" : ""}`}>“{s.revised}”</span>
            </p>
            <p className="flex items-start gap-2 mt-4 text-sm leading-6" style={{ color: "var(--color-text-body)" }}>
              <span className="dot mt-2" aria-hidden="true" />
              <span>
                <strong className="text-white">Observação do professor:</strong> {s.note}
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              {open && <ListenButton text={s.revised} audioSrc={s.audio} onStateChange={onSpeak} />}
              <button type="button" onClick={() => setRun((r) => r + 1)} className="cta-tertiary text-sm font-semibold text-white min-h-[44px] inline-flex items-center gap-1">
                <RotateCcw size={14} aria-hidden="true" /> Ver de novo
              </button>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="px-6 py-3 text-xs border-t" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>
        Exemplo criado pela escola para mostrar como uma sessão trabalha. Não é material de aluno.
      </figcaption>
    </figure>
  );
}
