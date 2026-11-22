/**
 * Comparação dos planos em uma tabela consistente (revisão de jornada §12):
 * para quem, ritmo, duração, mensalidade, valor por sessão, créditos e o que muda.
 * Todos os números vêm de src/data/plans.ts — nada é digitado aqui.
 * No celular, a tabela rola na horizontal dentro da própria área (a página não rola de lado).
 */
import { PLANS, perSession } from "@/data/plans";

const perWeek = (n: number) => (n % 4 === 0 ? `${n / 4} por semana` : `cerca de ${Math.round(n / 4)} por semana`);

export default function PlanCompare() {
  const rows: { label: string; cells: React.ReactNode[] }[] = [
    { label: "Para quem é", cells: PLANS.map((p) => p.forWho) },
    {
      label: "Ritmo",
      cells: PLANS.map((p) => (
        <span key={p.id}>
          <strong className="text-white">{p.sessionsPerMonth} sessões por mês</strong>
          <br />
          {perWeek(p.sessionsPerMonth)}
        </span>
      )),
    },
    { label: "Duração da sessão", cells: PLANS.map(() => "25 ou 50 minutos, à sua escolha") },
    {
      label: "Mensalidade",
      cells: PLANS.map((p) => (
        <span key={p.id}>
          <span className="tnum">
            <strong className="text-white">{p.prices[50]}</strong> com sessões de 50 min
          </span>
          <br />
          <span className="tnum">{p.prices[25]} com sessões de 25 min</span>
        </span>
      )),
    },
    {
      label: "Valor por sessão",
      cells: PLANS.map((p) => (
        <span key={p.id} className="tnum">
          {perSession(p, 50)} (50 min) · {perSession(p, 25)} (25 min)
        </span>
      )),
    },
    {
      label: "Créditos de sessão",
      cells: PLANS.map((p) => `${p.sessionsPerMonth} por mês. Reagende com 24h de antecedência; os não usados expiram no fim do ciclo mensal.`),
    },
    {
      label: "Além do incluso em todos",
      cells: PLANS.map((p) => (p.features[0] === "Tudo o que está incluso em todos os planos" ? "—" : p.features.join(" · "))),
    },
  ];

  return (
    <div id="comparar-planos" className="mt-12">
      <h2 className="font-display font-extrabold text-white leading-tight mb-2" style={{ fontSize: "var(--text-h3)" }}>
        Os três planos, lado a lado
      </h2>
      <p className="text-base mb-6 max-w-2xl" style={{ color: "var(--color-text-body)" }}>
        Todos têm o mesmo método, o exame CEFR e o professor fixo. O que muda é o ritmo e o que vem além do incluso.
      </p>
      <div
        role="region"
        aria-label="Comparação dos planos (role para os lados no celular)"
        tabIndex={0}
        className="overflow-x-auto rounded-2xl border"
        style={{ borderColor: "var(--color-border)" }}
      >
        <table className="w-full min-w-[680px] text-left text-sm leading-6 border-collapse">
          <caption className="sr-only">Comparação dos planos Consistência, Resultado e Urgente</caption>
          <thead>
            <tr style={{ backgroundColor: "var(--color-surface)" }}>
              <th scope="col" className="p-4 w-[22%] font-semibold" style={{ color: "var(--color-text-muted)" }}>
                <span className="sr-only">Critério</span>
              </th>
              {PLANS.map((p) => (
                <th key={p.id} scope="col" className="p-4 font-display font-extrabold text-lg text-white">
                  {p.name}
                  {p.highlight && (
                    <span className="ml-2 align-middle inline-flex px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "rgba(255,104,32,0.15)", color: "#FF6820" }}>
                      mais popular
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t" style={{ borderColor: "var(--color-border)" }}>
                <th scope="row" className="p-4 align-top font-semibold text-white">
                  {r.label}
                </th>
                {r.cells.map((c, i) => (
                  <td key={i} className="p-4 align-top" style={{ color: "var(--color-text-body)" }}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="lg:hidden text-sm mt-2" style={{ color: "var(--color-text-muted)" }}>
        Deslize a tabela para ver os três planos →
      </p>
    </div>
  );
}
