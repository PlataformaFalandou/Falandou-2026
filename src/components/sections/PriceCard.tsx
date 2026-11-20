import { Check } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import {
  PLANS,
  type Duration,
  type Plan,
  commitmentPrice,
  perSession,
  planWhatsAppMsg,
  priceValue,
  sessionsLabel,
} from "@/data/plans";

/**
 * PriceCard — cartão de um plano em 5 zonas (UX/UI §9). Dados em src/data/plans.ts.
 * 1. selo de posicionamento · 2. nome + preço · 3. proposta em 1 linha (sessões, com
 * bolinhas) · 4. benefícios com check laranja · 5. CTA de largura total.
 * O CTA abre o WhatsApp com o plano e a duração escolhidos (Arquitetura §9).
 */

/** Selo calculado dos dados: "Mais popular" no destaque; "Menor valor por sessão" no mais barato por sessão. */
function badgeFor(plan: Plan, duration: Duration): string | null {
  if (plan.highlight) return "Mais popular";
  const cheapest = [...PLANS].sort(
    (a, b) => priceValue(a.prices[duration]) / a.sessionsPerMonth - priceValue(b.prices[duration]) / b.sessionsPerMonth
  )[0];
  return cheapest.id === plan.id ? "Menor valor por sessão" : null;
}

export default function PriceCard({ plan, duration }: { plan: Plan; duration: Duration }) {
  const badge = badgeFor(plan, duration);
  const yearly = commitmentPrice(plan, duration, 12);

  return (
    <div
      className={`card-hover relative rounded-2xl flex flex-col h-full ${plan.highlight ? "md:scale-[1.02] z-[1]" : ""}`}
      style={{
        backgroundColor: plan.highlight ? "#1A1A1A" : "var(--color-bg-alt)",
        border: plan.highlight ? "2px solid #FF6820" : "1px solid var(--color-border)",
        boxShadow: plan.highlight ? "0 24px 60px rgba(255,104,32,0.12)" : undefined,
      }}
    >
      <div className="p-7 md:p-8 flex flex-col flex-1">
        {/* 1 — selo de posicionamento (espaço reservado para alinhar os cartões) */}
        <div className="h-7 mb-5">
          {badge && (
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={
                plan.highlight
                  ? { backgroundColor: "#FF6820", color: "#fff" }
                  : { border: "1px solid rgba(255,104,32,0.5)", color: "#FF8A4C" }
              }
            >
              {badge}
            </span>
          )}
        </div>

        {/* 2 — nome + preço */}
        <h2 className="font-display font-extrabold text-white mb-1" style={{ fontSize: "var(--text-h3)" }}>
          {plan.name}
        </h2>
        <p className="text-sm mb-1" style={{ color: "var(--color-text-muted)" }}>
          {plan.tagline}
        </p>
        <p className="text-sm font-semibold text-white leading-snug mb-6">{plan.forWho}</p>

        <div className="mb-6">
          <div className="flex items-end gap-1">
            <span
              className="font-display font-extrabold tnum leading-none whitespace-nowrap"
              style={{ fontSize: "clamp(1.9rem, 2.9vw, 2.5rem)", color: plan.highlight ? "#FF6820" : "#fff" }}
            >
              {plan.prices[duration]}
            </span>
            <span className="text-base pb-1" style={{ color: "var(--color-text-muted)" }}>
              /mês
            </span>
          </div>
          <p className="text-xs mt-2 tnum" style={{ color: "var(--color-text-muted)" }}>
            Sessões de {duration} minutos · {perSession(plan, duration)} por sessão
          </p>
          {/* Posicionamento e Oferta §2: compromisso anual com valor explícito */}
          <p
            className="text-xs mt-3 px-3 py-2 rounded-lg tnum"
            style={{ background: "rgba(255,104,32,0.1)", color: "rgba(245,246,241,0.85)" }}
          >
            No compromisso de 12 meses: <strong className="text-white">{yearly.monthly}/mês</strong> — economia de{" "}
            {yearly.saving} no ano
          </p>
        </div>

        {/* 3 — proposta em 1 linha + comparativo visual de sessões */}
        <div className="pb-6 mb-6 border-b" style={{ borderColor: "var(--color-border)" }}>
          <p className="font-display font-bold text-base text-white mb-3">{sessionsLabel(plan)}</p>
          <div className="flex flex-wrap gap-1.5" aria-hidden="true">
            {Array.from({ length: plan.sessionsPerMonth }).map((_, i) => (
              <span
                key={i}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: plan.highlight ? "#FF6820" : "rgba(255,104,32,0.75)" }}
              />
            ))}
          </div>
        </div>

        {/* 4 — benefícios */}
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-text-muted)" }}>
          {plan.featuresLabel}
        </p>
        <ul className="flex flex-col gap-3 mb-8 flex-1">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <Check size={16} strokeWidth={3} className="mt-0.5 flex-shrink-0" style={{ color: "#FF6820" }} aria-hidden="true" />
              <span className="text-sm" style={{ color: "rgba(245,246,241,0.8)" }}>
                {f}
              </span>
            </li>
          ))}
        </ul>

        {/* 5 — CTA de largura total */}
        <a
          href={getWhatsAppUrl(planWhatsAppMsg(plan, duration))}
          target="_blank"
          rel="noopener noreferrer"
          className={`${plan.highlight ? "cta-primary" : "cta-secondary"} block w-full text-center font-bold text-base px-6 py-4 rounded-full`}
        >
          Quero o plano {plan.name}
        </a>
      </div>
    </div>
  );
}
