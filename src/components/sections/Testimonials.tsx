"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Ana Carolina Lima",
    role: "Arquiteta • São Paulo",
    text: "Sempre tive vergonha de falar em inglês nas reuniões com clientes internacionais. Depois de 90 dias com a Falandou, apresentei meu portfólio para uma firma em Lisboa sem travar uma vez. O plano foi feito para o meu contexto, não inglês genérico.",
    stars: 5,
    level: "B1 → B2+",
  },
  {
    name: "Rafael Mendes",
    role: "Gerente de Operações • Campinas",
    text: "Fiz cursos em três escolas diferentes antes de chegar aqui. Nenhuma entendia o que eu precisava. Na Falandou, na primeira semana já estava treinando vocabulário de supply chain e negociação com fornecedores. É outra coisa.",
    stars: 5,
    level: "A2 → B2",
  },
  {
    name: "Dra. Priya Nair",
    role: "Médica Cardiologista • Brasília",
    text: "Precisava publicar artigos em inglês e participar de congressos internacionais. A Falandou não só me ajudou com o idioma, mas entendeu o vocabulário técnico médico. Meu primeiro artigo foi aprovado em 4 meses.",
    stars: 5,
    level: "B2 → C1",
  },
  {
    name: "Lucas Figueiredo",
    role: "Analista de TI • Recife",
    text: "Comecei a Falandou com medo de qualquer ligação em inglês. Hoje lidero stand-ups diários com o time de São Francisco. O exame CEFR no início foi revelador — eu era melhor do que pensava em algumas áreas e pior em outras.",
    stars: 5,
    level: "B1 → C1",
  },
  {
    name: "Mariana Costa",
    role: "Head de Marketing • Rio de Janeiro",
    text: "O que mais me surpreendeu foi o acompanhamento pelo WhatsApp. Sempre que eu tinha uma situação real de trabalho — um email importante, uma apresentação — eu podia perguntar ao meu professor na hora. Isso faz toda a diferença.",
    stars: 5,
    level: "A2 → B2",
  },
  {
    name: "Carlos Braga",
    role: "Engenheiro Civil • Belo Horizonte",
    text: "Resultado concreto: em 90 dias passei de não conseguir fazer uma ligação para fechar uma parceria com construtora americana. O exame final comprovou o que eu já sentia no dia a dia.",
    stars: 5,
    level: "B1 → B2+",
  },
];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="flex-shrink-0 w-80 md:w-96 bg-white rounded-2xl p-6 border border-black/5 hover:border-laranja/20 hover:shadow-md transition-all duration-300">
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: t.stars }).map((_, i) => (
          <Star key={i} size={14} fill="#FF6820" stroke="none" />
        ))}
      </div>

      {/* Quote */}
      <p className="font-body text-sm text-grafite/70 leading-relaxed mb-5 line-clamp-5">
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center justify-between">
        <div>
          <div className="font-display font-semibold text-sm text-grafite">{t.name}</div>
          <div className="font-body text-xs text-grafite/50">{t.role}</div>
        </div>
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ background: "rgba(255,104,32,0.1)", color: "#FF6820" }}
        >
          {t.level}
        </span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 420 : -420, behavior: "smooth" });
  };

  return (
    <section id="depoimentos" className="py-20 md:py-28 bg-neve overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div className="max-w-xl">
            <p className="reveal font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#FF6820" }}>
              Depoimentos
            </p>
            <h2
              className="reveal font-display font-extrabold text-grafite leading-tight delay-100"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)" }}
            >
              Profissionais que já falam inglês com confiança.
            </h2>
          </div>

          {/* Scroll controls */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:border-laranja hover:text-laranja transition-colors"
              aria-label="Rolar para esquerda"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:border-laranja hover:text-laranja transition-colors"
              aria-label="Rolar para direita"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-4 pl-6 pr-6 md:pl-[calc((100vw-80rem)/2+1.5rem)] snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {testimonials.map((t) => (
          <div key={t.name} className="snap-start">
            <TestimonialCard t={t} />
          </div>
        ))}
      </div>
    </section>
  );
}
