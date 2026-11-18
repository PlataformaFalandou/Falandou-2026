"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Preciso ter um nível mínimo de inglês para começar?",
    a: "Não. Atendemos profissionais de todos os níveis, do básico ao avançado. O exame CEFR no início do processo existe exatamente para identificar onde você está e construir o plano a partir daí.",
  },
  {
    q: "Como funciona o exame CEFR?",
    a: "O exame avalia as quatro habilidades (reading, listening, speaking e writing) e posiciona você em um nível do quadro europeu de referências — de A1 a C2. Com esse resultado, os professores montam um plano semanal detalhado para os próximos 90 dias.",
  },
  {
    q: "Com que frequência acontecem as aulas?",
    a: "A frequência é definida no seu plano, de acordo com seus objetivos e disponibilidade. As aulas são individuais e agendadas diretamente com o professor. O acompanhamento pelo WhatsApp é contínuo, toda semana.",
  },
  {
    q: "O inglês é focado em qual área?",
    a: "No seu contexto específico. Seja você médico, engenheiro, gestor ou analista — o plano é montado com vocabulário, situações e objetivos do seu setor. Não ensinamos inglês genérico.",
  },
  {
    q: "Quanto custa? Tem mensalidade?",
    a: "Os planos variam de acordo com carga horária e duração. Para descobrir qual faz mais sentido para você, fale com um consultor pelo WhatsApp — o atendimento é gratuito e sem compromisso.",
  },
  {
    q: "O que acontece depois dos 90 dias?",
    a: "Você faz o exame final CEFR, que mostra exatamente o quanto evoluiu. Com base nos resultados, podemos traçar os próximos passos juntos — seja continuar na Falandou ou avançar de forma independente com as ferramentas que você já terá.",
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
    <section className="py-20 md:py-28 bg-neve">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: header */}
          <div className="lg:col-span-2">
            <p className="reveal font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#FF6820" }}>
              Dúvidas frequentes
            </p>
            <h2
              className="reveal font-display font-extrabold text-grafite leading-tight delay-100"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)" }}
            >
              Tudo que você precisa saber antes de começar.
            </h2>
            <p className="reveal font-body text-grafite/60 text-base mt-4 delay-200">
              Não encontrou sua resposta? Fale diretamente com a gente pelo WhatsApp.
            </p>

            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="reveal inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105 delay-300"
              style={{ backgroundColor: "#FF6820" }}
            >
              Perguntar no WhatsApp
            </a>
          </div>

          {/* Right: FAQ list */}
          <div className="reveal lg:col-span-3 bg-white rounded-2xl p-6 md:p-8 border border-black/5 delay-200">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
