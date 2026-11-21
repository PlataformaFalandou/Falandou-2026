"use client";

/**
 * MethodCycle — ciclo do método explorável (direção "o inglês ganhando forma" §2.2).
 * Desktop: o diagrama circular é mantido; cada ponto é um controle, e o painel abaixo mostra
 * o que acontece, a participação do profissional e a entrega da escola.
 * Celular: lista expansível com o mesmo conteúdo. Clique, toque e teclado (←/→ no desktop)
 * produzem o mesmo resultado. Conteúdo alinhado com as etapas de /metodo.
 */
import { useId, useRef, useState } from "react";
import { Award, ChevronDown, ClipboardCheck, Map, MessagesSquare, TrendingUp } from "lucide-react";

const STEPS = [
  {
    label: "Diagnóstico CEFR",
    when: "Antes de começar",
    Icon: ClipboardCheck,
    what: "Exame nas quatro habilidades — reading, listening, speaking e writing — para posicionar você na escala CEFR.",
    you: "Você faz o exame e conta o seu objetivo, o seu cargo e o seu prazo.",
    school: "Resultado em até 48 horas, com relatório por habilidade: onde você está e onde trava.",
  },
  {
    label: "Plano individual",
    when: "Semana 1",
    Icon: Map,
    what: "O diagnóstico vira um plano de 90 dias, semana a semana, com o vocabulário do seu setor.",
    you: "Você valida as situações de trabalho que mais importam agora.",
    school: "Plano com objetivos por semana; ajuste possível a cada 30 dias conforme a evolução.",
  },
  {
    label: "Sessões 1 a 1",
    when: "Durante todo o ciclo",
    Icon: MessagesSquare,
    what: "Sessões individuais sobre as situações reais do seu trabalho, com prática guiada entre elas.",
    you: "Você traz a reunião, o e-mail ou a apresentação da semana e pratica de 20 a 30 minutos por dia.",
    school: "Professor fixo, correção na hora e dúvidas respondidas pelo WhatsApp no mesmo dia.",
  },
  {
    label: "Avaliação CEFR",
    when: "Semana 13",
    Icon: Award,
    what: "Você refaz o exame no mesmo formato do inicial — a comparação é direta.",
    you: "Você faz o exame final.",
    school: "Relatório de evolução por habilidade: onde você mais cresceu e onde ainda trava.",
  },
  {
    label: "Novo nível",
    when: "Próximo ciclo",
    Icon: TrendingUp,
    what: "O resultado orienta o próximo passo. Se o objetivo não foi atingido, o plano é revisado com você.",
    you: "Você decide se continua e com qual objetivo.",
    school: "O próximo plano começa do novo patamar, não do zero.",
  },
];

function Detail({ s }: { s: (typeof STEPS)[number] }) {
  return (
    <div className="grid sm:grid-cols-3 gap-4 text-left">
      <p className="text-base leading-6" style={{ color: "var(--color-text-body)" }}>
        <strong className="block text-white mb-1">O que acontece</strong>
        {s.what}
      </p>
      <p className="text-base leading-6" style={{ color: "var(--color-text-body)" }}>
        <strong className="block text-white mb-1">Sua participação</strong>
        {s.you}
      </p>
      <p className="text-base leading-6" style={{ color: "var(--color-text-body)" }}>
        <strong className="block text-white mb-1">O que a escola entrega</strong>
        {s.school}
      </p>
    </div>
  );
}

export default function MethodCycle() {
  const R = 150;
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [sel, setSel] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(null);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = (i + (e.key === "ArrowRight" ? 1 : STEPS.length - 1)) % STEPS.length;
    setSel(n);
    btns.current[n]?.focus();
  };

  return (
    <div>
      {/* Desktop: círculo com pontos acionáveis + painel abaixo */}
      <div className="hidden md:block">
        <div className="relative mx-auto" style={{ width: 2 * R + 180, height: 2 * R + 140 }} role="tablist" aria-label="Etapas do ciclo">
          <svg className="absolute inset-0" width="100%" height="100%" viewBox={`0 0 ${2 * R + 180} ${2 * R + 140}`} aria-hidden="true">
            <circle cx={R + 90} cy={R + 70} r={R} fill="none" stroke="rgba(255,104,32,0.35)" strokeWidth="2" strokeDasharray="6 8" />
          </svg>
          {STEPS.map((s, i) => {
            const a = -Math.PI / 2 + (i * 2 * Math.PI) / STEPS.length;
            const x = R + 90 + R * Math.cos(a);
            const y = R + 70 + R * Math.sin(a);
            const active = sel === i;
            return (
              <button
                key={s.label}
                ref={(el) => {
                  btns.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${uid}-tab-${i}`}
                aria-selected={active}
                aria-controls={`${uid}-painel`}
                tabIndex={active ? 0 : -1}
                onClick={() => setSel(i)}
                onKeyDown={(e) => onKey(e, i)}
                className="absolute flex flex-col items-center text-center w-40 -translate-x-1/2 -translate-y-[28px] group"
                style={{ left: x, top: y }}
              >
                <span
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: active ? "#FF6820" : "var(--color-surface)",
                    border: "2px solid #FF6820",
                    color: active ? "var(--color-on-brand)" : "#FF6820",
                    transition: "background-color var(--dur-base) ease-out, color var(--dur-base) ease-out",
                  }}
                >
                  <s.Icon size={24} aria-hidden="true" />
                </span>
                <span className="mt-2 font-display font-bold text-sm text-white group-hover:underline underline-offset-4">
                  {i + 1}. {s.label}
                </span>
                <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{s.when}</span>
              </button>
            );
          })}
          <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none" style={{ left: R + 90 - 70, top: R + 70 - 40, width: 140, height: 80 }}>
            <span className="font-display font-extrabold text-3xl text-white tnum">90 dias</span>
            <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>por ciclo</span>
          </div>
        </div>
        <div
          id={`${uid}-painel`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${sel}`}
          className="mt-6 rounded-2xl p-6 md:p-8"
          style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
        >
          <p className="font-display font-bold text-white text-lg mb-4">
            {sel + 1}. {STEPS[sel].label}
          </p>
          <div key={sel} className="value-swap">
            <Detail s={STEPS[sel]} />
          </div>
        </div>
      </div>

      {/* Celular: lista expansível */}
      <ol className="md:hidden flex flex-col gap-3">
        {STEPS.map((s, i) => {
          const isOpen = openMobile === i;
          return (
            <li key={s.label} className="rounded-2xl" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
              <button
                type="button"
                onClick={() => setOpenMobile(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`${uid}-m-${i}`}
                className="w-full flex items-center gap-4 p-4 min-h-[64px] text-left"
              >
                <span
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: isOpen ? "#FF6820" : "var(--color-bg)",
                    border: "2px solid #FF6820",
                    color: isOpen ? "var(--color-on-brand)" : "#FF6820",
                  }}
                >
                  <s.Icon size={20} aria-hidden="true" />
                </span>
                <span className="flex-1">
                  <span className="block font-display font-bold text-base text-white">
                    {i + 1}. {s.label}
                  </span>
                  <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{s.when}</span>
                </span>
                <ChevronDown
                  size={20}
                  aria-hidden="true"
                  style={{ color: "var(--color-text-muted)", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform var(--dur-base) ease-out" }}
                />
              </button>
              <div
                id={`${uid}-m-${i}`}
                className="grid"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", transition: "grid-template-rows var(--dur-base) var(--ease-enter)" }}
                inert={!isOpen}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-4">
                    <Detail s={s} />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
        <li className="pl-2 text-xs pt-1" style={{ color: "var(--color-text-muted)" }}>
          ↻ O novo nível vira o ponto de partida do próximo ciclo.
        </li>
      </ol>
    </div>
  );
}
