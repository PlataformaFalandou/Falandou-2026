/**
 * PracticeCaseCard — o módulo recorrente "situação em prática" (direção criativa §5.1).
 * Linguagem editorial (§2.2): alinhado à esquerda, bordas discretas, como um material de
 * trabalho bem preparado. Estrutura fixa entre páginas; o conteúdo muda.
 *   1. situação profissional  2. primeira versão  3. observação do professor (marcada
 *   pelo ponto da marca)  4. versão revisada.
 * A observação aparece depois do exemplo (movimento que representa comunicação, §4.3).
 * Sempre identificado como "Exemplo de atividade" — nunca como material de aluno.
 */
import type { PracticeCase } from "@/data/practiceCases";

export default function PracticeCaseCard({ c, compact = false }: { c: PracticeCase; compact?: boolean }) {
  return (
    <figure
      className="rounded-2xl text-left"
      style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      aria-label={`Exemplo de atividade: ${c.situation}`}
    >
      <div className={compact ? "p-6" : "p-6 md:p-8"}>
        <p className="eyebrow text-xs font-bold uppercase tracking-widest mb-3">Exemplo de atividade</p>
        <p className={`font-display font-bold text-white ${compact ? "text-lg" : "text-xl md:text-2xl"} leading-snug`}>
          {c.situation}
        </p>
        {!compact && (
          <p className="text-base mt-2" style={{ color: "var(--color-text-body)" }}>
            <span className="font-semibold text-white">Objetivo:</span> {c.objective}
          </p>
        )}

        {/* 2 — primeira versão */}
        <div className={compact ? "mt-5" : "mt-6"}>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--color-text-muted)" }}>
            Primeira versão
          </p>
          <p
            lang="en"
            className="text-base leading-6 pl-4 border-l-2 italic"
            style={{ borderColor: "var(--color-border-strong)", color: "var(--color-text-muted)" }}
          >
            “{c.draft}”
          </p>
        </div>

        {/* 3 — observação do professor: o ponto marca a fala */}
        <div className="reveal delay-note mt-5 rounded-xl p-4" style={{ backgroundColor: "var(--color-interactive)" }}>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2 text-white">
            <span className="dot" aria-hidden="true" />
            Observação do professor
          </p>
          <p className="text-base leading-6" style={{ color: "var(--color-text-body)" }}>
            {c.note}
          </p>
        </div>

        {/* 4 — versão revisada */}
        <div className="reveal delay-answer mt-5">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--color-text-muted)" }}>
            Versão revisada
          </p>
          <p lang="en" className="text-base md:text-lg leading-7 pl-4 border-l-2 text-white font-medium" style={{ borderColor: "#FF6820" }}>
            “{c.revised}”
          </p>
        </div>
      </div>
      <figcaption
        className={`${compact ? "px-6" : "px-6 md:px-8"} py-3 text-xs border-t`}
        style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
      >
        Exemplo criado pela escola para mostrar como uma sessão trabalha. Não é material de aluno.
      </figcaption>
    </figure>
  );
}
