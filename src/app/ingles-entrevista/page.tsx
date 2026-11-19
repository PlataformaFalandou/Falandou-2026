import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import LeadMagnetCompact from "@/components/sections/LeadMagnetCompact";
import InterestForm from "@/components/sections/InterestForm";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Inglês para Entrevista de Emprego | Falandou",
  description:
    "Você tem o perfil. A entrevista em inglês não pode ser o gargalo. Prepare-se com plano individual, simulações reais e resultado em 90 dias.",
  alternates: { canonical: "https://2026.falandou.com/ingles-entrevista" },
  openGraph: {
    title: "Inglês para Entrevista de Emprego | Falandou",
    description:
      "Sua entrevista em inglês está chegando. Prepare-se com plano individual e simulações reais.",
    url: "https://2026.falandou.com/ingles-entrevista",
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
    a: "Sim — para isso existe o plano intensivo. Em 30 dias você não muda tudo, mas você treina as situações específicas da sua entrevista: apresentação pessoal, perguntas comportamentais, vocabulário do setor. Já preparamos candidatos com janelas de 3 semanas.",
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
      <main>

        {/* ── HERO: momento de vida ── */}
        <section
          className="pt-40 pb-28 md:pt-52 md:pb-36"
          style={{ backgroundColor: "#161616" }}
        >
          <div className="max-w-4xl mx-auto px-6">
            {/* Urgency badge */}
            <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: "rgba(255,104,32,0.15)", color: "#FF6820", border: "1px solid rgba(255,104,32,0.3)" }}>
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              Processo seletivo com etapa em inglês
            </div>

            <h1
              className="font-display font-extrabold text-white leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
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
              79% dos profissionais passou a conduzir entrevistas e reuniões em inglês em até 90 dias
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={getWhatsAppUrlForContext("ingles-entrevista-urgente")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-5 rounded-full text-base font-bold transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: "#FF6820", color: "white" }}
              >
                Quero me preparar agora
              </a>
              <a
                href="#como-preparamos"
                className="inline-flex items-center justify-center px-8 py-5 rounded-full text-base font-semibold transition-all duration-200 hover:scale-105"
                style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                Ver como funciona
              </a>
            </div>
          </div>
        </section>

        {/* ── PROOF: dados de resultado ── */}
        <section className="py-14" style={{ backgroundColor: "#FF6820" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
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
        <section id="como-preparamos" className="py-24 md:py-32" style={{ backgroundColor: "#F5F6F1" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
                Preparação fase a fase
              </p>
              <h2
                className="font-display font-extrabold leading-tight"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", color: "#161616" }}
              >
                Cada etapa do processo seletivo tem inglês específico.
              </h2>
              <p className="font-body text-base mt-4" style={{ color: "rgba(22,22,22,0.55)" }}>
                Não ensinamos &ldquo;inglês para RH&rdquo;. Ensinamos o inglês de cada momento —
                do primeiro e-mail ao painel final.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {stages.map((s) => (
                <div
                  key={s.num}
                  className="rounded-2xl p-8 bg-white"
                  style={{ border: "1px solid rgba(0,0,0,0.07)" }}
                >
                  <div className="flex items-start gap-5">
                    <span
                      className="font-display font-black text-4xl flex-shrink-0"
                      style={{ color: "rgba(0,0,0,0.08)" }}
                    >
                      {s.num}
                    </span>
                    <div>
                      <h3 className="font-display font-extrabold text-lg mb-2" style={{ color: "#161616" }}>
                        {s.label}
                      </h3>
                      <p className="font-body text-sm mb-4 leading-relaxed" style={{ color: "rgba(22,22,22,0.5)" }}>
                        <span className="font-semibold" style={{ color: "#161616" }}>O desafio: </span>
                        {s.tension}
                      </p>
                      <div
                        className="rounded-xl p-4"
                        style={{ background: "rgba(255,104,32,0.07)" }}
                      >
                        <p className="font-body text-sm leading-relaxed" style={{ color: "#161616" }}>
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
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <p className="font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
              Próximo passo
            </p>
            <h2
              className="font-display font-extrabold leading-tight mb-4"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#161616" }}
            >
              Quando é sua entrevista?
            </h2>
            <p className="font-body text-base mb-10" style={{ color: "rgba(22,22,22,0.55)" }}>
              Conta pra gente. Montamos o plano no tempo que você tem — sem pressão, sem compromisso.
            </p>
            <InterestForm
              context="ingles-entrevista"
              whatsappMessage="Olá! Tenho uma entrevista de emprego em inglês se aproximando e preciso me preparar. Quero entender como a Falandou pode me ajudar."
              ctaLabel="Quero me preparar"
            />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 md:py-32" style={{ backgroundColor: "#F5F6F1" }}>
          <div className="max-w-3xl mx-auto px-6">
            <h2
              className="font-display font-extrabold text-center mb-12"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)", color: "#161616" }}
            >
              Dúvidas específicas sobre preparação para entrevista
            </h2>
            <div className="space-y-5">
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-2xl p-7 bg-white"
                  style={{ border: "1px solid rgba(0,0,0,0.07)" }}
                >
                  <p className="font-display font-bold text-base mb-3" style={{ color: "#161616" }}>{faq.q}</p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(22,22,22,0.6)" }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-20 md:py-28" style={{ backgroundColor: "#161616" }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2
              className="font-display font-extrabold text-white mb-4"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)" }}
            >
              A entrevista está chegando. O preparo começa agora.
            </h2>
            <p className="font-body text-base mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              Consulta gratuita · Plano montado para o seu processo · Sem compromisso
            </p>
            <a
              href={getWhatsAppUrlForContext("ingles-entrevista-urgente")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-5 rounded-full text-base font-bold transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "#FF6820", color: "white" }}
            >
              Falar com a equipe agora
            </a>
            <p className="mt-6">
              <Link href="/metodo" className="font-body text-sm underline underline-offset-4" style={{ color: "rgba(255,255,255,0.35)" }}>
                Entender o método completo →
              </Link>
            </p>
          </div>
        </section>

        <LeadMagnetCompact />

      </main>
      <Footer />
    </>
  );
}
