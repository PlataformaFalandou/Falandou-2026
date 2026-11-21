/**
 * SpeakingLoop — ilustração que ensina (direção criativa §3.3): como uma fala é treinada
 * na sessão. Ideia → frase → fala → feedback, com o laranja só na etapa em foco.
 * Se o diagrama sair, o leitor perde a sequência — por isso ele existe.
 */
import { ArrowRight, Lightbulb, MessageSquareText, Mic, PenLine } from "lucide-react";

const STEPS = [
  { Icon: Lightbulb, title: "Ideia", body: "O que você precisa comunicar na situação real." },
  { Icon: PenLine, title: "Frase", body: "A estrutura em inglês, com o vocabulário do seu contexto." },
  { Icon: Mic, title: "Fala", body: "Você diz em voz alta, no ritmo de uma reunião de verdade." },
  { Icon: MessageSquareText, title: "Feedback", body: "O professor corrige na hora e você repete até sair natural." },
];

export default function SpeakingLoop({ focus = 3 }: { focus?: number }) {
  return (
    <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" aria-label="Como uma fala é treinada na sessão">
      {STEPS.map(({ Icon, title, body }, i) => {
        const active = i === focus;
        return (
          <li key={title} className="relative flex lg:block gap-4">
            <div className="flex items-center gap-3 lg:mb-4">
              <span
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  border: `1.5px solid ${active ? "#FF6820" : "var(--color-border-strong)"}`,
                  color: active ? "#FF6820" : "var(--color-text-body)",
                }}
              >
                <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
              </span>
              {i < STEPS.length - 1 && (
                <ArrowRight size={18} className="hidden lg:block" style={{ color: "var(--color-text-muted)" }} aria-hidden="true" />
              )}
            </div>
            <div>
              <p className="font-display font-bold text-lg text-white">
                {i + 1}. {title}
              </p>
              <p className="text-base leading-6 mt-1" style={{ color: "var(--color-text-body)" }}>
                {body}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
