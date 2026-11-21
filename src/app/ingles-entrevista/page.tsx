import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import BlogPreview from "@/components/sections/BlogPreview";
import LeadMagnetCompact from "@/components/sections/LeadMagnetCompact";
import InterestForm from "@/components/sections/InterestForm";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";

import JsonLd from "@/components/ui/JsonLd";
import { courseSchema, faqSchema } from "@/lib/schema";
export const metadata: Metadata = {
  title: "Inglês para Entrevista de Emprego | Falandou",
  description:
    "Inglês para entrevista de emprego: simulações 1 a 1 com as perguntas reais do seu processo seletivo, plano individual e exame CEFR no início e no fim do ciclo.",
  alternates: { canonical: "/ingles-entrevista/" },
  openGraph: {
    title: "Inglês para Entrevista de Emprego | Falandou",
    description:
      "Sua entrevista em inglês está chegando. Prepare-se com plano individual e simulações reais.",
    url: "/ingles-entrevista/",
  },
};

// Fases do processo seletivo com inglês
const stages = [
  {
    num: "01",
    label: "Triagem por recrutador",
    tension: "Inglês escrito avaliado no LinkedIn, e-mail e formulário.",
    prep: "Você aprende a posicionar seu perfil e responder em inglês com clareza profissional.",
  },
  {
    num: "02",
    label: "Entrevista com RH",
    tension: "Perguntas abertas: Tell me about yourself. What are your weaknesses?",
    prep: "Você treina as respostas reais, não scripts decorados. STAR framework aplicado ao seu histórico.",
  },
  {
    num: "03",
    label: "Entrevista técnica",
    tension: "Explicar projetos, decisões e resultados em inglês para gestor ou par técnico.",
    prep: "Vocabulário do seu setor. Você aprende a conduzir a conversa, não só responder.",
  },
  {
    num: "04",
    label: "Painel ou cultura fit",
    tension: "Múltiplos entrevistadores, perguntas inesperadas, ritmo acelerado.",
    prep: "Simulações com pressão real. Você sai do piloto automático e ganha improviso estruturado.",
  },
];

const proof = [
  { value: "70%", label: "dos profissionais passaram em processos seletivos com etapa em inglês dentro de 14 meses" },
  { value: "90 dias", label: "ciclo padrão — suficiente para passar de travar para falar com segurança" },
  { value: "1 a 1", label: "todas as sessões são individuais — 100% do tempo focado no seu processo seletivo" },
];

const faqs = [
  {
    q: "Minha entrevista é em 30 dias. Dá tempo?",
    a: "Sim — para isso existe o plano Urgente, com 16 sessões individuais por mês. Em 30 dias você não muda tudo, mas você treina as situações específicas da sua entrevista: apresentação pessoal, perguntas comportamentais, vocabulário do setor. Já preparamos candidatos com janelas de 3 semanas.",
  },
  {
    q: "Já tenho inglês médio, mas travo na hora de falar. O curso funciona para mim?",
    a: "Esse é o perfil mais comum que atendemos. Inglês passivo (entender, ler) é diferente de inglês ativo (falar sob pressão em tempo real). O trabalho é de ativação: usar, em voz alta, o que você já sabe — com ritmo e segurança.",
  },
  {
    q: "Vocês fazem simulação de entrevista real?",
    a: "Sim. Depois de algumas semanas treinando as estruturas específicas, fazemos simulações com as perguntas mais comuns do seu setor. O professor avalia clareza, ritmo e segurança — não só gramática.",
  },
  {
    q: "Como funciona o plano para entrevista?",
    a: "Começa com um exame CEFR para mapear seu nível real. Os professores montam o plano com foco nas etapas da sua seletiva — apresentação, comportamental, técnica. Sessões individuais + acompanhamento pelo WhatsApp.",
  },
];

export default function InglesEntrevistaPage() {
  return (
    <>
      <Navbar />
      <main id="conteudo">
        {/* Dados estruturados — Arquitetura §10 */}
        <JsonLd data={courseSchema({ name: "Inglês para entrevista de emprego", description: "Preparação individual para processos seletivos com etapa em inglês, com simulações.", path: "/ingles-entrevista/" })} />
        <JsonLd data={faqSchema(faqs)} />

        {/* ── HERO: momento de vida ── */}
        <section
          className="pt-40 pb-28 md:pt-52 md:pb-36"
          style={{ backgroundColor: "var(--color-bg)" }}
        >
          <div className="max-w-4xl mx-auto px-5 md:px-8">
            {/* Urgency badge */}
            <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: "rgba(255,104,32,0.15)", color: "#FF6820", border: "1px solid rgba(255,104,32,0.3)" }}>
              <span className="w-2 h-2 rounded-full bg-current" />
              Processo seletivo com etapa em inglês
            </div>

            <h1
              className="font-display font-extrabold text-white leading-tight mb-6"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Você tem o perfil.<br />
              A entrevista em inglês{" "}
              <span style={{ color: "#FF6820" }}>não pode ser o gargalo.</span>
            </h1>
            <p
              className="font-body text-lg leading-relaxed mb-10 max-w-2xl"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              O currículo passou. A vaga é real. Mas quando chega a hora de falar inglês
              com o recrutador, o nervoso bloqueia tudo que você sabe.
              A Falandou prepara você especificamente para o processo seletivo —
              não para o inglês em geral.
            </p>

            <p className="text-sm font-medium mb-10 -mt-6" style={{ color: "rgba(255,104,32,0.85)" }}>
              79% dos profissionais subiram pelo menos 1 nível CEFR em até 90 dias
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={getWhatsAppUrlForContext("ingles-entrevista-urgente")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-5 rounded-full text-base font-bold cta-primary"
                style={{ color: "white" }}>
                Quero me preparar agora
              </a>
              <a
                href="#como-preparamos"
                className="inline-flex items-center justify-center px-8 py-5 rounded-full text-base font-semibold transition-all duration-200 hover:scale-105"
                style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid var(--color-border)" }}
              >
                Ver como funciona
              </a>
            </div>
          </div>
        </section>

        {/* ── PROOF: dados de resultado ── */}
        <section className="on-brand py-14" style={{ backgroundColor: "#FF6820" }}>
          <div className="max-w-[1200px] mx-auto px-5 md:px-8">
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {proof.map((p) => (
                <div key={p.value} className="text-center">
                  <p className="font-display font-extrabold text-4xl text-white mb-2">{p.value}</p>
                  <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>{p.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STAGES: cada fase do processo seletivo ── */}
        <section id="como-preparamos" className="py-12 md:py-20" style={{ backgroundColor: "var(--color-bg-alt)" }}>
          <div className="max-w-[1200px] mx-auto px-5 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="font-body text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#FF6820" }}>
                Preparação fase a fase
              </p>
              <h2
                className="font-display font-extrabold leading-tight"
                style={{ fontSize: "var(--text-h2)", color: "var(--color-text)" }}
              >
                Cada etapa do processo seletivo tem inglês específico.
              </h2>
              <p className="font-body text-base mt-4" style={{ color: "rgba(245,246,241,0.65)" }}>
                Não ensinamos &ldquo;inglês para RH&rdquo;. Ensinamos o inglês de cada momento —
                do primeiro e-mail ao painel final.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {stages.map((s) => (
                <div
                  key={s.num}
                  className="rounded-2xl p-6 md:p-8 bg-surface"
                  style={{ border: "1px solid var(--color-border)" }}
                >
                  <div className="flex items-start gap-5">
                    <span
                      className="font-display font-black text-4xl flex-shrink-0"
                      style={{ color: "rgba(0,0,0,0.08)" }}
                    >
                      {s.num}
                    </span>
                    <div>
                      <h3 className="font-display font-extrabold text-[length:var(--text-h3)] mb-2" style={{ color: "var(--color-text)" }}>
                        {s.label}
                      </h3>
                      <p className="font-body text-sm mb-4 leading-relaxed" style={{ color: "rgba(245,246,241,0.6)" }}>
                        <span className="font-semibold" style={{ color: "var(--color-text)" }}>O desafio: </span>
                        {s.tension}
                      </p>
                      <div
                        className="rounded-xl p-4"
                        style={{ background: "rgba(255,104,32,0.07)" }}
                      >
                        <p className="font-body text-base leading-6" style={{ color: "var(--color-text)" }}>
                          <span className="font-semibold" style={{ color: "#FF6820" }}>Como preparamos: </span>
                          {s.prep}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTEREST FORM ── */}
        <section className="py-12 md:py-20 bg-bg">
          <div className="max-w-2xl mx-auto px-5 md:px-8 text-center">
            <p className="font-body text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#FF6820" }}>
              Próximo passo
            </p>
            <h2
              className="font-display font-extrabold leading-tight mb-4"
              style={{ fontSize: "var(--text-h2)", color: "var(--color-text)" }}
            >
              Quando é sua entrevista?
            </h2>
            <p className="font-body text-base mb-10" style={{ color: "rgba(245,246,241,0.65)" }}>
              Conta pra gente. Montamos o plano no tempo que você tem, de trás para frente a partir da data.
            </p>
            <InterestForm
              context="ingles-entrevista"
              whatsappMessage="Olá! Tenho uma entrevista de emprego em inglês se aproximando e preciso me preparar. Quero entender como a Falandou pode me ajudar."
              ctaLabel="Quero me preparar"
            />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-12 md:py-20" style={{ backgroundColor: "var(--color-bg-alt)" }}>
          <div className="max-w-3xl mx-auto px-5 md:px-8">
            <h2
              className="font-display font-extrabold text-center mb-12"
              style={{ fontSize: "var(--text-h2)", color: "var(--color-text)" }}
            >
              Dúvidas específicas sobre preparação para entrevista
            </h2>
            <div className="space-y-5">
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-2xl p-7 bg-surface"
                  style={{ border: "1px solid var(--color-border)" }}
                >
                  <p className="font-display font-bold text-base mb-3" style={{ color: "var(--color-text)" }}>{faq.q}</p>
                  <p className="font-body text-base leading-6" style={{ color: "rgba(245,246,241,0.7)" }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-12 md:py-20" style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
            <h2
              className="font-display font-extrabold text-white mb-4"
              style={{ fontSize: "var(--text-h2)" }}
            >
              A entrevista está chegando. O preparo começa agora.
            </h2>
            <p className="font-body text-base mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              Resposta em até 1h · Plano montado para o seu processo · Simulações da entrevista real
            </p>
            <a
              href={getWhatsAppUrlForContext("ingles-entrevista-urgente")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-5 rounded-full text-base font-bold cta-primary"
              style={{ color: "white" }}>
              Falar com a equipe agora
            </a>
            <p className="mt-6">
              <Link href="/metodo" className="font-body text-sm underline underline-offset-4" style={{ color: "rgba(255,255,255,0.35)" }}>
                Entender o método completo →
              </Link>
              <span style={{ color: "rgba(255,255,255,0.2)" }}> · </span>
              <Link href="/planos" className="font-body text-sm underline underline-offset-4" style={{ color: "rgba(255,255,255,0.35)" }}>
                Ver planos e valores →
              </Link>
            </p>
          </div>
        </section>

        {/* Arquitetura §4/§10: âncora de autoridade + link para posts relevantes */}
        <BlogPreview slugs={["ingles-para-entrevista-emprego", "diferenca-cefr-niveis-ingles", "como-aprender-ingles-profissional"]} title="Para se preparar para a entrevista." />
        <LeadMagnetCompact />

      </main>
      <Footer />
    </>
  );
}
