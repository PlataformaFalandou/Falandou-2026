import { Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CompanyLogos from "@/components/sections/CompanyLogos";
import ComparisonTable from "@/components/sections/ComparisonTable";
import LeadMagnetCompact from "@/components/sections/LeadMagnetCompact";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";
import PlansGrid from "@/components/sections/PlansGrid";
import PlanFinderForm from "@/components/sections/PlanFinderForm";
import { COMMITMENT_DISCOUNTS, COMMITMENT_TEXT, INCLUDED_IN_ALL, PAUSE_RULE, PLAN_TERMS, MIN_REPORTED_RAISE, PRICE_FROM, PRICE_FROM_ROUNDED, PRICE_TO_VALUE, RESCHEDULE_RULE, STUDENTS_PER_TEACHER, commitmentPrice, getPlan, perDay, perSession } from "@/data/plans";

import JsonLd from "@/components/ui/JsonLd";
import { courseSchema, faqSchema } from "@/lib/schema";
export const metadata: Metadata = {
  // SEO §2: preço no título aumenta o CTR em páginas de planos.
  title: `Planos de Inglês a partir de ${PRICE_FROM}/mês | Falandou`,
  description:
    `Planos de inglês 1 a 1 da Falandou: sessões de 25 ou 50 minutos, plano individual e exame CEFR antes e depois. A partir de ${PRICE_FROM}/mês, sem turma.`,
  alternates: { canonical: "/planos/" },
  openGraph: {
    title: "Planos e Preços | Falandou",
    description: `Consistência, Resultado e Urgente: sessões 1 a 1 de 25 ou 50 minutos. A partir de ${PRICE_FROM}/mês.`,
    url: "/planos/",
    siteName: "Falandou",
    locale: "pt_BR",
    type: "website",
  },
};

// Ponto 44 — comparação clara: o que é igual fica numa faixa única;
// cada cartão mostra só o que muda. Planos e preços: src/data/plans.ts.

// Valor por sessão calculado dos preços reais (src/data/plans.ts).
const PRO = getPlan("professional");

const FAQS = [
  {
    // Arquitetura §9: a objeção de preço mais comum, respondida na própria página.
    q: "Por que custa mais do que uma escola de inglês em grupo?",
    a: `Porque o que você compra é diferente. Em grupo, o tempo do professor é dividido e o conteúdo segue a turma. Aqui, 100% de cada sessão é seu, com um plano montado para o seu objetivo, exame CEFR antes e depois e acompanhamento pelo WhatsApp entre as sessões. No plano ${PRO.name}, cada sessão individual de 50 minutos sai por ${perSession(PRO, 50)}.`,
  },
  {
    q: "Qual a diferença entre sessões de 25 e de 50 minutos?",
    a: "A estrutura é a mesma: sessões individuais e ao vivo, com o mesmo plano e acompanhamento. A de 25 minutos encaixa em agendas apertadas e custa menos; a de 50 minutos permite simulações mais longas, como uma reunião ou entrevista completa. Você escolhe ao contratar.",
  },
  {
    q: "Posso trocar de plano durante o ciclo?",
    a: "Sim. Se você perceber que precisa de mais sessões, é possível fazer o upgrade para o próximo plano. A troca é feita via WhatsApp com a equipe e entra em vigor no mês seguinte.",
  },
  {
    q: "O que acontece se eu precisar faltar a uma sessão?",
    a: `${RESCHEDULE_RULE} Os créditos de sessão não usados expiram ao fim de cada ciclo mensal — por isso vale reagendar dentro do mesmo mês.`,
  },
  {
    q: "Há desconto para compromisso mais longo?",
    a: `Sim. Com compromisso de ${COMMITMENT_DISCOUNTS[0].months} meses, a mensalidade tem ${COMMITMENT_DISCOUNTS[0].pct}% de desconto; com ${COMMITMENT_DISCOUNTS[1].months} meses, ${COMMITMENT_DISCOUNTS[1].pct}%. No plano ${PRO.name} com sessões de 50 minutos, por exemplo, o compromisso de 12 meses sai por ${commitmentPrice(PRO, 50, 12).monthly}/mês — economia de ${commitmentPrice(PRO, 50, 12).saving} no ano.`,
  },
  {
    q: "E se eu tiver uma viagem ou um mês de trabalho intenso?",
    a: `${PAUSE_RULE} Combine a pausa com a equipe pelo WhatsApp; o plano retoma de onde parou.`,
  },
  {
    q: "Posso cancelar? E se eu desistir logo no começo?",
    a: PLAN_TERMS,
  },
  {
    q: "O exame CEFR está incluso no preço?",
    a: "Sim. O exame diagnóstico no início e o exame de evolução no fim do ciclo já estão inclusos em todos os planos. Não há custo adicional.",
  },
  {
    q: "Como sei qual plano é o certo para mim?",
    a: "Conte à equipe pelo WhatsApp o seu objetivo, o seu nível atual e o seu prazo. Com essas três informações, a equipe indica o plano e a duração de sessão que fazem sentido — e você decide depois de entender o que está contratando.",
  },
];
export default function PlanosPage() {
  return (
    <>
      <Navbar />
      <main id="conteudo">
        {/* Dados estruturados — Arquitetura §10 */}
        <JsonLd data={courseSchema({ name: "Inglês profissional — ciclo de 90 dias", description: "Plano individual, sessões 1 a 1 e exame CEFR antes e depois do ciclo.", path: "/planos/" })} />
        <JsonLd data={faqSchema(FAQS)} />
        {/* ── Hero ── */}
        <section
          className="pt-28 pb-20 md:pt-36 md:pb-24"
          style={{ backgroundColor: "var(--color-bg)" }}
        >
          <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
            <p
              className="eyebrow font-body text-sm font-bold uppercase tracking-widest mb-5"
            >
              Planos e investimento
            </p>
            <h1
              className="font-display font-extrabold text-white leading-tight mb-5"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Quanto custa{" "}
              <span style={{ color: "#FF6820" }}>falar inglês com confiança?</span>
            </h1>
            <p
              className="font-body text-lg max-w-2xl mx-auto mb-8"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Profissionais que trocam de emprego ou são promovidos após a Falandou relatam
              aumentos de R$ 1.500 a R$ 4.000/mês.
              {MIN_REPORTED_RAISE > PRICE_TO_VALUE &&
                " Mesmo o menor desses aumentos é maior que a mensalidade de qualquer plano."}
            </p>

            {/* Product anchor — o que é o produto */}
            <p
              className="font-body text-sm max-w-xl mx-auto mb-8 -mt-2"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Cada plano inclui diagnóstico CEFR, sessões individuais 1 a 1 e exame de evolução ao fim dos 90 dias. A partir de {PRICE_FROM}/mês — menos de {perDay(PRICE_FROM)} por dia.
            </p>

            {/* Proof bar */}
            <div
              className="inline-flex flex-wrap justify-center items-center gap-x-6 gap-y-2 px-6 py-3 rounded-2xl mb-2"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <span className="font-body text-sm font-semibold text-white">Exame CEFR incluso</span>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
              <span className="font-body text-sm font-semibold text-white">Sessões 1 a 1</span>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
              <span className="font-body text-sm font-semibold text-white">Ciclo de 90 dias</span>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
              <span className="font-body text-sm font-semibold text-white">Até {STUDENTS_PER_TEACHER} profissionais por professor</span>
            </div>
          </div>
        </section>

        {/* ── Pricing cards ── */}
        <section className="py-12 md:py-20" style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="max-w-6xl mx-auto px-5 md:px-8">
            {/* Incluso em todos os planos */}
            <div
              className="mb-8 rounded-2xl px-6 py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
            >
              <p
                className="eyebrow font-body text-xs font-bold uppercase tracking-widest flex-shrink-0"
              >
                Incluso em todos os planos
              </p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {INCLUDED_IN_ALL.map((item) => (
                  <li key={item} className="flex items-center gap-2 font-body text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                    <span className="font-bold" style={{ color: "#FF6820" }}><Check size={16} strokeWidth={2.5} aria-hidden="true" /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Planos reais (falandou.com) com seletor de 25/50 minutos */}
            <PlansGrid />

            {/* UX/UI §24 — escassez real, como cuidado (sem contador nem data inventada) */}
            <p className="mt-6 text-center text-sm max-w-2xl mx-auto" style={{ color: "rgba(245,246,241,0.75)" }}>
              Cada professor acompanha no máximo {STUDENTS_PER_TEACHER} profissionais ao mesmo tempo. Acima disso, o
              acompanhamento individual perde qualidade.
            </p>

            {/* Copywriting §4 — para quem NÃO é (aumenta a confiança na indicação) */}
            <p className="mt-6 text-center font-body text-sm max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
              Está começando do zero (A1) ou já chegou ao C1? Fale com a equipe antes de escolher — nesses
              níveis, o ritmo e o foco das sessões mudam bastante.
            </p>

            {/* Desconto por compromisso mais longo */}
            <p className="mt-6 text-center font-body text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
              <strong className="text-white">Compromisso mais longo, mensalidade menor:</strong>{" "}
              {COMMITMENT_TEXT}.
            </p>

            {/* Arquitetura §9 — redução de risco perto do CTA: só regras e fatos reais
                (resposta em até 1h, cancelamento, reembolso de 7 dias, exame).
                A escola NÃO oferece consulta gratuita — não prometer. */}
            <ul className="mt-8 flex flex-col md:flex-row md:flex-wrap md:justify-center gap-3 md:gap-x-8">
              {[
                "Resposta da equipe em até 1h",
                "Cancele quando quiser",
                "Reagende sem custo com 24h de antecedência",
                "Pausa de até 30 dias sem cancelar",
                "Reembolso integral em até 7 dias se nenhuma sessão tiver sido feita",
                "Exame CEFR no início e no fim do ciclo",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 font-body text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                  <span className="font-bold" style={{ color: "#FF6820" }}><Check size={16} strokeWidth={2.5} aria-hidden="true" /></span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-center font-body text-xs max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
              {PLAN_TERMS}
            </p>

            {/* Dúvida entre planos → formulário curto que abre o WhatsApp (UX/UI §11) */}
            <div
              id="qual-plano"
              className="mt-12 rounded-2xl p-6 md:p-10 grid md:grid-cols-[1fr_1.3fr] items-start gap-4 md:gap-6"
              style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
            >
              <div>
                <p className="eyebrow text-xs font-bold uppercase tracking-widest mb-3">
                  Qual plano é para mim?
                </p>
                <h2 className="font-display font-extrabold text-white leading-tight mb-4" style={{ fontSize: "var(--text-h3)" }}>
                  Conte o seu objetivo, o seu nível e a sua área.
                </h2>
                <p className="text-base" style={{ color: "var(--color-text-body)" }}>
                  A equipe responde em até 1h com o plano indicado para o seu caso. Se preferir, fale direto:{" "}
                  <a
                    href={getWhatsAppUrlForContext("plans")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-tertiary font-semibold text-white"
                  >
                    abrir o WhatsApp
                  </a>
                  .
                </p>
              </div>
              <PlanFinderForm context="plans" />
            </div>
          </div>
        </section>

        {/* Arquitetura §4: logos das empresas dos profissionais (Home + /sobre + /planos) */}
        <CompanyLogos />

        {/* Arquitetura §9: tabela de diferenciação na página de decisão (saiu da home) */}
        <ComparisonTable />

        {/* ── ROI anchor ── */}
        <section className="py-12 md:py-20" style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="max-w-4xl mx-auto px-5 md:px-8">
            <p
              className="eyebrow font-body text-sm font-bold uppercase tracking-widest mb-3 text-center"
            >
              Custo de oportunidade
            </p>
            <h2
              className="font-display font-extrabold text-white leading-tight mb-4 text-center"
              style={{ fontSize: "var(--text-h2)" }}
            >
              Quanto custa mais um ano sem inglês?
            </h2>
            <p
              className="font-body text-base text-center mb-12 max-w-xl mx-auto"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              De um lado, a partir de {PRICE_FROM_ROUNDED}/mês. Do outro, o que fica na mesa enquanto o inglês segura a sua carreira:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  scenario: "Promoção de cargo",
                  gain: "+R$ 2.000–4.000/mês",
                  gainMin: 2000,
                  note: "Salário maior dentro da empresa atual",
                },
                {
                  scenario: "Novo emprego",
                  gain: "+R$ 1.500–3.000/mês",
                  gainMin: 1500,
                  note: "Passa a se candidatar a vagas internacionais",
                },
                {
                  scenario: "Transferência internacional",
                  gain: "Pacote 2–4× o salário atual",
                  gainMin: 0,
                  note: "Relocação com suporte da empresa",
                },
              ].map((item) => (
                <div
                  key={item.scenario}
                  className="rounded-2xl p-6 md:p-8"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
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
                  {/* Só afirma o que a conta sustenta: o menor ganho relatado vs. a maior mensalidade */}
                  {item.gainMin > PRICE_TO_VALUE && (
                    <div
                      className="inline-flex px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: "rgba(255,104,32,0.12)",
                        color: "#FF6820",
                      }}
                    >
                      Cobre a mensalidade de qualquer plano
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="font-body text-xs text-center mt-8" style={{ color: "rgba(255,255,255,0.35)" }}>
              Valores relatados por profissionais da Falandou. Resultados variam conforme o nível inicial e a dedicação de cada profissional (veja os <Link href="/termos" className="underline underline-offset-2">termos</Link>).
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-12 md:py-20" style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="max-w-2xl mx-auto px-5 md:px-8">
            <h2
              className="font-display font-extrabold text-white mb-10 text-center"
              style={{ fontSize: "var(--text-h2)" }}
            >
              Dúvidas sobre os planos
            </h2>
            <div className="flex flex-col gap-5">
              {FAQS.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-xl px-6 py-5"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <p className="font-body font-semibold text-white mb-2">{faq.q}</p>
                  <p
                    className="font-body text-base leading-6"
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
                className="inline-flex items-center gap-3 font-body font-bold text-base px-8 py-4 rounded-full text-white cta-primary">
                Falar com nossa equipe
              </a>
            </div>
          </div>
        </section>

        {/* ── Para empresas — Arquitetura §3/§9: jornada corporativa com CTA próprio.
             Sem preço publicado: a proposta é montada com a equipe. */}
        <section id="empresas" className="py-12 md:py-20" style={{ backgroundColor: "var(--color-bg-alt)" }}>
          <div className="max-w-5xl mx-auto px-5 md:px-8 grid md:grid-cols-[1fr_auto] items-center gap-4 md:gap-6">
            <div>
              <p className="eyebrow font-body text-sm font-bold uppercase tracking-widest mb-3">
                Para empresas
              </p>
              <h2 className="font-display font-extrabold leading-tight mb-3" style={{ fontSize: "var(--text-h2)", color: "var(--color-text)" }}>
                Inglês profissional para a sua equipe.
              </h2>
              <p className="font-body text-base leading-relaxed" style={{ color: "rgba(245,246,241,0.75)", maxWidth: "560px" }}>
                O mesmo ciclo — diagnóstico CEFR, plano individual por profissional, sessões 1 a 1 e
                exame de evolução — para times que precisam usar o inglês no trabalho. A proposta é
                montada com a nossa equipe, de acordo com o número de pessoas e os objetivos.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <a
                href={getWhatsAppUrlForContext("empresas")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-4 rounded-full font-body font-bold text-base text-white transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: "var(--color-bg)" }}
              >
                Falar sobre a minha equipe
              </a>
              <a
                href="mailto:contato@falandou.com?subject=Ingl%C3%AAs%20para%20equipes"
                className="font-body text-sm font-semibold underline underline-offset-4 text-center"
                style={{ color: "rgba(245,246,241,0.7)" }}
              >
                ou escreva para contato@falandou.com
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
