"use client";

/**
 * SpeakingLoop — ideia → frase → fala → feedback (direção "o inglês ganhando forma" §1.1).
 * O ponto da marca acompanha a sequência: um único ponto percorre o trilho até a etapa
 * escolhida (~300ms). O texto fica imóvel. Movimento reduzido: só muda a etapa destacada.
 * O logotipo não é deformado — o ponto aqui é o marcador da marca, não o logo.
 */
import { useState } from "react";
import { Lightbulb, MessageSquareText, Mic, PenLine } from "lucide-react";

const STEPS = [
  { Icon: Lightbulb, title: "Ideia", body: "O que você precisa comunicar na situação real." },
  { Icon: PenLine, title: "Frase", body: "A estrutura em inglês, com o vocabulário do seu contexto." },
  { Icon: Mic, title: "Fala", body: "Você diz em voz alta, no ritmo de uma reunião de verdade." },
  { Icon: MessageSquareText, title: "Feedback", body: "O professor corrige na hora e você repete até sair natural." },
];

export default function SpeakingLoop({ focus = 3 }: { focus?: number }) {
  const [sel, setSel] = useState(focus);

  return (
    <div>
      {/* Trilho do ponto (desktop, 4 colunas) */}
      <div className="hidden lg:block relative h-4 mb-4" aria-hidden="true">
        <span className="absolute left-[12.5%] right-[12.5%] top-1/2 h-px" style={{ backgroundColor: "var(--color-border)" }} />
        <span
          className="absolute top-1/2 w-3.5 h-3.5 -mt-[7px] -ml-[7px] rounded-full"
          style={{
            left: `${12.5 + sel * 25}%`,
            backgroundColor: "#FF6820",
            transition: "left 300ms var(--ease-enter)",
          }}
        />
      </div>
      <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" aria-label="Como uma fala é treinada na sessão">
        {STEPS.map(({ Icon, title, body }, i) => {
          const active = i === sel;
          return (
            <li key={title}>
              <button
                type="button"
                onClick={() => setSel(i)}
                aria-pressed={active}
                className="w-full text-left flex lg:block gap-4 rounded-xl p-3 -m-3 min-h-[44px]"
              >
                <span
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 lg:mb-4"
                  style={{
                    border: `1.5px solid ${active ? "#FF6820" : "var(--color-border-strong)"}`,
                    color: active ? "#FF6820" : "var(--color-text-body)",
                    transition: "border-color var(--dur-base) ease-out, color var(--dur-base) ease-out",
                  }}
                >
                  <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="block">
                  <span className="block font-display font-bold text-lg text-white">
                    {i + 1}. {title}
                  </span>
                  <span className="block text-base leading-6 mt-1" style={{ color: "var(--color-text-body)" }}>
                    {body}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
