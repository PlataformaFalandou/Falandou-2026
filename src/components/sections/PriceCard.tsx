import { getWhatsAppUrl } from "@/lib/whatsapp";
import { type Duration, type Plan, perSession, planWhatsAppMsg, sessionsLabel } from "@/data/plans";

/**
 * PriceCard — cartão de um plano (Arquitetura §4). Dados em src/data/plans.ts.
 * O CTA abre o WhatsApp com o plano e a duração escolhidos (§9).
 */
export default function PriceCard({ plan, duration }: { plan: Plan; duration: Duration }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: plan.highlight
          ? "linear-gradient(145deg, rgba(255,104,32,0.12) 0%, rgba(255,104,32,0.04) 100%)"
          : "rgba(255,255,255,0.04)",
        border: plan.highlight ? "1px solid rgba(255,104,32,0.4)" : "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {plan.highlight && (
        <div
          className="text-center py-2 text-xs font-bold uppercase tracking-widest"
          style={{ backgroundColor: "#FF6820", color: "#fff" }}
        >
          Mais popular
        </div>
      )}

      <div className="p-8 flex flex-col flex-1">
        {/* Plan name + tagline */}
        <div className="mb-8">
          <h2 className="font-display font-extrabold text-2xl text-white mb-2">{plan.name}</h2>
          <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
            {plan.tagline}
          </p>
          <p className="font-body text-sm font-semibold text-white mt-3 leading-snug">{plan.forWho}</p>
        </div>

        {/* Price */}
        <div className="mb-8">
          <div className="flex items-end gap-1">
            <span
              className="font-display font-extrabold"
              style={{ fontSize: "clamp(2rem, 3.5vw, 2.5rem)", color: plan.highlight ? "#FF6820" : "#fff" }}
            >
              {plan.prices[duration]}
            </span>
            <span className="font-body text-base pb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
              /mês
            </span>
          </div>
          <p className="font-body text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
            Sessões de {duration} minutos · {perSession(plan, duration)} por sessão
          </p>
        </div>

        {/* Sessões por mês — a principal diferença entre os planos */}
        <p
          className="font-display font-bold text-base text-white mb-6 pb-6 border-b"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          {sessionsLabel(plan)}
        </p>

        {/* Features — só o que muda */}
        <p
          className="font-body text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          {plan.featuresLabel}
        </p>
        <ul className="flex flex-col gap-3 mb-10 flex-1">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <span className="mt-0.5 text-sm font-bold flex-shrink-0" style={{ color: "#FF6820" }}>
                ✓
              </span>
              <span className="font-body text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                {f}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={getWhatsAppUrl(planWhatsAppMsg(plan, duration))}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center font-body font-bold text-base px-6 py-4 rounded-full transition-all duration-300"
          style={
            plan.highlight
              ? { backgroundColor: "#FF6820", color: "#fff" }
              : {
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.15)",
                }
          }
        >
          Quero o plano {plan.name}
        </a>
      </div>
    </div>
  );
}
