import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CompanyLogos from "@/components/sections/CompanyLogos";
import LeadMagnetCompact from "@/components/sections/LeadMagnetCompact";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";
import PriceCard from "@/components/sections/PriceCard";
import { PLANS, INCLUDED_IN_ALL, PRICE_FROM, PRICE_FROM_ROUNDED } from "@/data/plans";

export const metadata: Metadata = {
  title: "Planos e Preços | Falandou",
  description:
    `Veja os planos de inglês profissional da Falandou: sessões individuais 1 a 1, ciclo de 90 dias e exame CEFR antes e depois. Planos a partir de ${PRICE_FROM}/mês.`,
};

// Ponto 44 — comparação clara: o que é igual fica numa faixa única;
// cada cartão mostra só o que muda. Planos e preços: src/data/plans.ts.

const FAQS = [
  {
    q: "Posso trocar de plano durante o ciclo?",
    a: "Sim. Se você perceber que precisa de mais sessões, é possível fazer o upgrade para o próximo plano. A troca é feita via WhatsApp com a equipe e entra em vigor no mês seguinte.",
  },
  {
    q: "O que acontece se eu precisar faltar a uma sessão?",
    a: "As sessões são reagendadas diretamente com o professor. Nos planos Profissional e Acelerado há prioridade no reagendamento — você não perde a sessão, reorganiza o horário.",
  },
  {
    q: "O exame CEFR está incluso no preço?",
    a: "Sim. O exame diagnóstico no início e o exame de evolução no fim do ciclo já estão inclusos em todos os planos. Não há custo adicional.",
  },
  {
    q: "Como funciona a consulta gratuita antes de assinar?",
    a: "Antes de escolher o plano, você tem uma conversa de 20 minutos com a equipe para mapear seu objetivo, nível atual e prazo. Nessa conversa fica claro qual plano faz mais sentido — sem pressão para fechar na hora.",
  },
  {
    q: "Há desconto para pagamento anual?",
    a: "Sim. Planos com comprometimento de 6 ou 12 meses têm desconto. Os valores aparecem na consulta inicial — cada caso é avaliado de acordo com o objetivo e plano escolhido.",
  },
];

export default function PlanosPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section
          className="pt-28 pb-20 md:pt-36 md:pb-24"
          style={{ backgroundColor: "#161616" }}
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p
              className="font-body text-sm font-bold uppercase tracking-widest mb-5"
              style={{ color: "#FF6820" }}
            >
              Planos e investimento
            </p>
            <h1
              className="font-display font-extrabold text-white leading-tight mb-5"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
            >
              Quanto custa{" "}
              <span style={{ color: "#FF6820" }}>falar inglês com confiança?</span>
            </h1>
            <p
              className="font-body text-lg max-w-2xl mx-auto mb-8"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Profissionais que trocam de emprego após a Falandou relatam aumentos de
              R$ 1.500 a R$ 4.000/mês. O investimento se paga em menos de 60 dias
              para quem consegue uma promoção ou aprovação em processo seletivo.
            </p>

            {/* Product anchor — o que é o produto */}
            <p
              className="font-body text-sm max-w-xl mx-auto mb-8 -mt-2"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Cada plano inclui diagnóstico CEFR, sessões individuais 1 a 1 e exame de evolução ao fim dos 90 dias.
            </p>

            {/* Proof bar */}
            <div
              className="inline-flex flex-wrap justify-center items-center gap-x-6 gap-y-2 px-6 py-3 rounded-2xl mb-2"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span className="font-body text-sm font-semibold text-white">Exame CEFR incluso</span>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
              <span className="font-body text-sm font-semibold text-white">Sessões 1 a 1</span>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
              <span className="font-body text-sm font-semibold text-white">Ciclo de 90 dias</span>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
              <span className="font-body text-sm font-semibold text-white">Consulta gratuita</span>
            </div>
          </div>
        </section>

        {/* ── Pricing cards ── */}
        <section className="py-16 md:py-20" style={{ backgroundColor: "#0e0e0e" }}>
          <div className="max-w-6xl mx-auto px-6">
            {/* Incluso em todos os planos */}
            <div
              className="mb-8 rounded-2xl px-6 py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p
                className="font-body text-xs font-bold uppercase tracking-widest flex-shrink-0"
                style={{ color: "#FF6820" }}
              >
                Incluso em todos os planos
              </p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {INCLUDED_IN_ALL.map((item) => (
                  <li key={item} className="flex items-center gap-2 font-body text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                    <span className="font-bold" style={{ color: "#FF6820" }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {PLANS.map((plan) => (
                <PriceCard key={plan.id} plan={plan} />
              ))}
            </div>

            {/* Free consult callout */}
            <div
              className="mt-10 rounded-2xl px-8 py-6 text-center"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p
                className="font-body text-base text-white mb-1"
              >
                Não tem certeza de qual plano escolher?
              </p>
              <p
                className="font-body text-sm mb-5"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                A consulta inicial é gratuita — 20 minutos para mapear seu objetivo e receber uma indicação sem compromisso.
              </p>
              <a
                href={getWhatsAppUrlForContext("plans")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body font-bold text-sm px-7 py-3.5 rounded-full text-white transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: "#FF6820" }}
              >
                Agendar consulta gratuita
              </a>
            </div>
          </div>
        </section>

        {/* Arquitetura §4: logos das empresas dos profissionais (Home + /sobre + /planos) */}
        <CompanyLogos />

        {/* ── ROI anchor ── */}
        <section className="py-16 md:py-20" style={{ backgroundColor: "#161616" }}>
          <div className="max-w-4xl mx-auto px-6">
            <p
              className="font-body text-sm font-bold uppercase tracking-widest mb-4 text-center"
              style={{ color: "#FF6820" }}
            >
              Custo de oportunidade
            </p>
            <h2
              className="font-display font-extrabold text-white leading-tight mb-4 text-center"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)" }}
            >
              Quanto custa mais um ano sem inglês?
            </h2>
            <p
              className="font-body text-base text-center mb-12 max-w-xl mx-auto"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              De um lado, a partir de {PRICE_FROM_ROUNDED}/mês. Do outro, o que fica na mesa enquanto o inglês segura a sua carreira:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  scenario: "Promoção de cargo",
                  gain: "+R$ 2.000–4.000/mês",
                  note: "Salário maior dentro da empresa atual",
                  payback: "Retorno em < 2 meses",
                },
                {
                  scenario: "Novo emprego",
                  gain: "+R$ 1.500–3.000/mês",
                  note: "Passa a candidatar em vagas internacionais",
                  payback: "Retorno em < 3 meses",
                },
                {
                  scenario: "Transferência internacional",
                  gain: "Pacote 2–4× o salário atual",
                  note: "Relocação com suporte da empresa",
                  payback: "Retorno imediato",
                },
              ].map((item) => (
                <div
                  key={item.scenario}
                  className="rounded-2xl p-6"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <p
                    className="font-body text-xs font-semibold uppercase tracking-widest mb-3"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    {item.scenario}
                  </p>
                  <p
                    className="font-display font-extrabold text-xl mb-1"
                    style={{ color: "#FF6820" }}
                  >
                    {item.gain}
                  </p>
                  <p
                    className="font-body text-sm mb-4"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {item.note}
                  </p>
                  <div
                    className="inline-flex px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: "rgba(255,104,32,0.12)",
                      color: "#FF6820",
                    }}
                  >
                    {item.payback}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16 md:py-20" style={{ backgroundColor: "#0e0e0e" }}>
          <div className="max-w-2xl mx-auto px-6">
            <h2
              className="font-display font-extrabold text-white mb-10 text-center"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)" }}
            >
              Dúvidas sobre os planos
            </h2>
            <div className="flex flex-col gap-5">
              {FAQS.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-xl px-6 py-5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <p className="font-body font-semibold text-white mb-2">{faq.q}</p>
                  <p
                    className="font-body text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <a
                href={getWhatsAppUrlForContext("plans")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-body font-bold text-base px-8 py-4 rounded-full text-white transition-all duration-300 hover:opacity-90 hover:scale-105"
                style={{ backgroundColor: "#FF6820" }}
              >
                Falar com nossa equipe
              </a>
            </div>
          </div>
        </section>
        <LeadMagnetCompact />
      </main>
      <Footer />
    </>
  );
}
