/**
 * MethodCycle — metáfora visual do método (UX/UI §17, §25): diagrama circular
 * Diagnóstico → Plano → Sessões 1 a 1 → Avaliação → Novo nível, que volta ao começo
 * do próximo ciclo. No celular vira lista vertical com o mesmo fluxo.
 */
import { ClipboardCheck, Map, MessagesSquare, TrendingUp, Award } from "lucide-react";

const STEPS = [
  { label: "Diagnóstico CEFR", when: "Antes de começar", Icon: ClipboardCheck },
  { label: "Plano individual", when: "Semana 1", Icon: Map },
  { label: "Sessões 1 a 1", when: "Durante todo o ciclo", Icon: MessagesSquare },
  { label: "Avaliação CEFR", when: "Semana 13", Icon: Award },
  { label: "Novo nível", when: "Próximo ciclo", Icon: TrendingUp },
];

export default function MethodCycle() {
  const R = 150; // raio do círculo (px) no desktop
  return (
    <div>
      {/* Desktop: círculo */}
      <div className="hidden md:block relative mx-auto" style={{ width: 2 * R + 180, height: 2 * R + 140 }}>
        <svg className="absolute inset-0" width="100%" height="100%" viewBox={`0 0 ${2 * R + 180} ${2 * R + 140}`} aria-hidden="true">
          <circle cx={R + 90} cy={R + 70} r={R} fill="none" stroke="rgba(255,104,32,0.35)" strokeWidth="2" strokeDasharray="6 8" />
        </svg>
        {STEPS.map((s, i) => {
          const a = -Math.PI / 2 + (i * 2 * Math.PI) / STEPS.length;
          const x = R + 90 + R * Math.cos(a);
          const y = R + 70 + R * Math.sin(a);
          return (
            <div key={s.label} className="absolute flex flex-col items-center text-center w-40 -translate-x-1/2 -translate-y-[28px]" style={{ left: x, top: y }}>
              <span
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: i === STEPS.length - 1 ? "#FF6820" : "var(--color-surface)",
                  border: "2px solid #FF6820",
                  color: i === STEPS.length - 1 ? "#fff" : "#FF6820",
                }}
              >
                <s.Icon size={24} aria-hidden="true" />
              </span>
              <span className="mt-2 font-display font-bold text-sm text-white">
                {i + 1}. {s.label}
              </span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{s.when}</span>
            </div>
          );
        })}
        <div className="absolute flex flex-col items-center justify-center text-center" style={{ left: R + 90 - 70, top: R + 70 - 40, width: 140, height: 80 }}>
          <span className="font-display font-extrabold text-3xl text-white tnum">90 dias</span>
          <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>por ciclo</span>
        </div>
      </div>

      {/* Celular: lista com conector */}
      <ol className="md:hidden relative pl-2">
        <span aria-hidden="true" className="absolute left-[30px] top-6 bottom-6 w-0.5" style={{ background: "rgba(255,104,32,0.35)" }} />
        {STEPS.map((s, i) => (
          <li key={s.label} className="relative flex items-center gap-4 py-3">
            <span
              className="relative z-[1] w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: i === STEPS.length - 1 ? "#FF6820" : "var(--color-surface)",
                border: "2px solid #FF6820",
                color: i === STEPS.length - 1 ? "#fff" : "#FF6820",
              }}
            >
              <s.Icon size={20} aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display font-bold text-base text-white">
                {i + 1}. {s.label}
              </span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{s.when}</span>
            </span>
          </li>
        ))}
        <li className="pl-[60px] text-xs pt-1" style={{ color: "var(--color-text-muted)" }}>
          ↻ O novo nível vira o ponto de partida do próximo ciclo.
        </li>
      </ol>
    </div>
  );
}
