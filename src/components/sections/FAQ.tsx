"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";
import { trackCTAClick } from "@/lib/analytics";
import AnimatedSection from "@/components/ui/AnimatedSection";

const faqs = [
  {
    q: "Qual é o investimento?",
    a: "Depende do seu objetivo. Profissionais que usam a Falandou para mudar de emprego relatam aumentos salariais de R$ 1.500 a R$ 4.000/mês. Quem consegue uma promoção ou transferência internacional costuma recuperar o investimento em menos de 60 dias. Os planos começam em R$ 184,90/mês — a consulta inicial é gratuita e é nela que você entende qual plano faz sentido para o que você quer alcançar.",
  },
  {
    q: "Quanto tempo leva para ter resultado?",
    a: "O ciclo padrão é de 90 dias. Em média, os profissionais sobem 1 nível CEFR nesse período — o que representa, na prática, conseguir conduzir reuniões em inglês, passar por entrevistas internacionais ou liderar times globais com confiança. O resultado depende da frequência e do comprometimento, mas o plano é montado exatamente para o seu ritmo.",
  },
  {
    q: "Funciona para quem nunca estudou inglês ou está enferrujado?",
    a: "Sim. Atendemos profissionais de todos os níveis — do A1 (zero base) ao C1 (quase fluente que quer refinar). O exame CEFR no início do ciclo identifica exatamente onde você está. O plano é construído a partir daí, sem pressupor nada.",
  },
  {
    q: "Como funciona o exame CEFR?",
    a: "O CEFR é o padrão europeu de proficiência usado por Cambridge, IELTS e multinacionais. O exame avalia as quatro habilidades (reading, listening, speaking e writing) e posiciona você em um nível de A1 a C2. Com esse resultado, os professores montam um plano semanal para os próximos 90 dias. No final do ciclo, você refaz o exame e vê exatamente quanto evoluiu — em números.",
  },
  {
    q: "O inglês é focado em qual área profissional?",
    a: "No seu contexto específico. Seja você médico, engenheiro, gestor ou analista — o plano é montado com vocabulário, situações e objetivos do seu setor. Não ensinamos inglês genérico.",
  },
  {
    q: "Com que frequência acontecem as sessões?",
    a: "A frequência é definida no seu plano, de acordo com seus objetivos e disponibilidade. As sessões são individuais e agendadas diretamente com o professor. O acompanhamento pelo WhatsApp é contínuo durante toda a semana — você nunca fica sem suporte entre uma sessão e outra.",
  },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className="border-b border-black/8 last:border-0"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className={`font-display font-semibold text-base transition-colors duration-200 ${isOpen ? "" : "text-grafite group-hover:text-laranja"}`}
          style={{ color: isOpen ? "#FF6820" : undefined }}
        >
          {faq.q}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200"
          style={{
            backgroundColor: isOpen ? "#FF6820" : "rgba(22,22,22,0.08)",
            color: isOpen ? "white" : "#161616",
          }}
        >
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "300px" : "0", opacity: isOpen ? 1 : 0 }}
      >
        <p className="font-body text-grafite/65 text-sm leading-relaxed pb-5">
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32" style={{ backgroundColor: "#F5F6F1" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-14 items-start">
          {/* Left: header */}
          <AnimatedSection direction="left" className="lg:col-span-2">
            <p className="font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
              Dúvidas frequentes
            </p>
            <h2
              className="font-display font-extrabold leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", color: "#161616" }}
            >
              Tudo que você precisa saber antes de começar.
            </h2>
            <p className="font-body text-base mt-4" style={{ color: "rgba(22,22,22,0.55)" }}>
              Não encontrou sua resposta? Fale diretamente com a gente pelo WhatsApp.
            </p>

            <a
              href={getWhatsAppUrlForContext("faq")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTAClick("faq")}
              className="inline-flex items-center gap-2 mt-8 px-6 py-3.5 rounded-full text-sm font-bold text-white transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "#161616" }}
            >
              Falar com nossa equipe
            </a>
          </AnimatedSection>

          {/* Right: FAQ list */}
          <AnimatedSection direction="right" delay={100} className="lg:col-span-3">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
