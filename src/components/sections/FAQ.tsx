"use client";

import { useState } from "react";
import { MessageCircle, Minus, Plus } from "lucide-react";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";

// ─── Edite as perguntas e respostas aqui ──────────────────────────
// As três primeiras são as objeções principais — mantenha-as no topo.
const faqs = [
  {
    q: "Quanto custa?",
    a: "Os planos começam em R$ 184,90/mês. O valor final depende da carga horária semanal e da duração do ciclo escolhido. Não há taxa de matrícula nem multa por cancelamento. Você pode conversar com o Professor Adriel pelo WhatsApp para entender qual plano faz mais sentido para o seu objetivo — o atendimento inicial é gratuito e sem compromisso.",
  },
  {
    q: "Quanto tempo leva para eu ver resultado?",
    a: "O ciclo padrão é de 90 dias. Nos últimos dados internos, 79% dos alunos subiram pelo menos 1 nível CEFR nesse período — e a média de evolução para quem estava em B1 foi de 11 semanas para chegar ao B2. Resultado depende de consistência: alunos que seguem o plano semanal evoluem dentro do prazo. Alunos que pulam sessões demoram mais.",
  },
  {
    q: "Funciona para quem nunca estudou inglês — ou estudou e esqueceu tudo?",
    a: "Sim. Atendemos profissionais de todos os níveis, do A1 (iniciante absoluto) ao C1 (avançado). O exame CEFR no início do ciclo identifica exatamente onde você está hoje, e o plano é construído a partir daí — sem pular etapas, sem começar do zero desnecessariamente. Muitos alunos chegam dizendo que 'nunca aprenderam inglês de verdade' e, em 90 dias, já conduzem reuniões básicas sem depender de tradução.",
  },
  {
    q: "Como funciona o exame CEFR?",
    a: "O CEFR (Common European Framework of Reference) é o padrão internacional de proficiência em inglês — o mesmo usado por Cambridge, IELTS e TOEFL. Ele avalia as quatro habilidades: leitura, escuta, fala e escrita, e posiciona você em um nível de A1 a C2. Na Falandou, o exame é aplicado no início e no fim de cada ciclo de 90 dias, para que você veja com precisão o quanto evoluiu.",
  },
  {
    q: "As aulas são individuais ou em grupo?",
    a: "Individuais. Cada sessão é com o Professor Adriel, dedicada ao seu objetivo específico. Não há turmas, não há grade fixa. O horário é combinado diretamente com o professor e o acompanhamento por WhatsApp acontece toda semana — entre as sessões, não só no dia da aula.",
  },
  {
    q: "O inglês é genérico ou focado na minha área?",
    a: "Focado no seu contexto. Se você é gestor, o plano prioriza reuniões, negociações e apresentações. Se vai para um intercâmbio, o foco é conversação e cotidiano. Se precisa para um concurso, trabalhamos leitura técnica e redação formal. Não existe plano padrão — o plano é seu.",
  },
  {
    q: "O que acontece depois dos 90 dias?",
    a: "Você refaz o exame CEFR e vê exatamente o quanto evoluiu — em nível, não em sensação. Com base no resultado, decidimos juntos os próximos passos: continuar com um novo ciclo, aprofundar uma habilidade específica ou avançar de forma independente com as ferramentas que você já terá.",
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
        style={{ maxHeight: isOpen ? "480px" : "0", opacity: isOpen ? 1 : 0 }}
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
    <section className="py-24 md:py-32" style={{ backgroundColor: "#F5F6F1" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-14 items-start">
          {/* Left: header */}
          <div className="lg:col-span-2">
            <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
              Dúvidas frequentes
            </p>
            <h2
              className="reveal font-display font-extrabold leading-tight delay-100"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", color: "#161616" }}
            >
              Respostas diretas para as dúvidas que todo mundo tem.
            </h2>
            <p className="reveal font-body text-base mt-4 delay-200" style={{ color: "rgba(22,22,22,0.55)" }}>
              Custo, prazo, nível de inglês — sem rodeios. Ficou alguma dúvida? Fale diretamente com o Professor Adriel.
            </p>

            <a
              href={getWhatsAppUrlForContext("hero")}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal inline-flex items-center gap-2 mt-8 px-6 py-3.5 rounded-full text-sm font-bold text-white transition-all duration-200 hover:scale-105 delay-300"
              style={{ backgroundColor: "#161616" }}
            >
              <MessageCircle size={16} />
              Falar com o Professor Adriel
            </a>
          </div>

          {/* Right: FAQ list */}
          <div className="reveal lg:col-span-3 bg-white rounded-2xl p-8 md:p-10 shadow-sm delay-200">
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
