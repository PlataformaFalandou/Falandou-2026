import { Check } from "lucide-react";
import { STATS } from "@/data/stats";
import { PRICE_FROM } from "@/data/plans";

/**
 * Benefits — Copywriting §5: benefícios consolidados em 3 colunas
 * (carreira · dia a dia · bolso), cada uma com 2 pontos concretos e um micro-dado.
 * Só dados já publicados (src/data/stats.ts, src/data/plans.ts).
 */
const COLUMNS = [
  {
    tag: "Para a carreira",
    stat: STATS.selectivePct,
    statLabel: "aprovados em seletivas com etapa em inglês",
    points: [
      "Você entra no processo seletivo sabendo responder a parte em inglês — e treinou a entrevista antes.",
      "Projetos com o time de fora deixam de ir para o colega que fala melhor.",
    ],
  },
  {
    tag: "Para o dia a dia",
    stat: `${STATS.b1b2Weeks} sem.`,
    statLabel: "em média para sair de B1 e chegar ao B2",
    points: [
      "A reunião semanal com o time global deixa de exigir roteiro decorado.",
      "O e-mail para o cliente de fora sai na hora, sem passar pelo tradutor.",
    ],
  },
  {
    tag: "Para o bolso",
    stat: "R$ 1.500–4.000",
    statLabel: "de aumento mensal relatado por quem trocou de emprego",
    points: [
      `Planos a partir de ${PRICE_FROM}/mês, com sessões de 25 ou 50 minutos.`,
      "Cancele quando quiser. Reembolso integral em até 7 dias se nenhuma sessão tiver sido feita.",
    ],
  },
];

export default function Benefits() {
  return (
    <section className="py-12 md:py-20" style={{ backgroundColor: "var(--color-bg-alt)" }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="max-w-2xl mb-14">
          <p className="eyebrow reveal font-body text-sm font-bold uppercase tracking-widest mb-3">
            O que muda depois do ciclo
          </p>
          <h2
            className="reveal font-display font-extrabold leading-tight delay-100"
            style={{ fontSize: "var(--text-h2)", color: "var(--color-text)" }}
          >
            O inglês que faltava para a próxima fase da sua carreira.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {COLUMNS.map((c, i) => (
            <div
              key={c.tag}
              className="reveal rounded-2xl bg-surface border border-border p-6 md:p-8 flex flex-col"
              style={{ transitionDelay: `${Math.min(i * 40, 120)}ms` }}
            >
              <p className="font-body text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "rgba(245,246,241,0.55)" }}>
                {c.tag}
              </p>
              <ul className="flex flex-col gap-4 mb-8">
                {c.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 font-body text-sm leading-relaxed" style={{ color: "rgba(245,246,241,0.85)" }}>
                    <span className="font-bold flex-shrink-0" style={{ color: "#FF6820" }}><Check size={16} strokeWidth={2.5} aria-hidden="true" /></span>
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6 border-t border-white/10">
                <p className="font-display font-extrabold text-3xl" style={{ color: "#FF6820" }}>{c.stat}</p>
                <p className="font-body text-xs mt-1" style={{ color: "rgba(245,246,241,0.65)" }}>{c.statLabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
