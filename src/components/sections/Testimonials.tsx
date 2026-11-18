"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ana Carolina Lima",
    role: "Arquiteta",
    company: "São Paulo",
    text: "Sempre tive vergonha de falar em inglês nas reuniões com clientes internacionais. Depois de 90 dias com a Falandou, apresentei meu portfólio para uma firma em Lisboa sem travar uma vez.",
    stars: 5,
    level: "B1 → B2+",
    img: "/images/prof-arquiteta.png",
  },
  {
    name: "Rafael Mendes",
    role: "Gerente de Operações",
    company: "Campinas",
    text: "Fiz cursos em três escolas diferentes antes de chegar aqui. Nenhuma entendia o que eu precisava. Na Falandou, na primeira semana já estava treinando vocabulário de supply chain e negociação.",
    stars: 5,
    level: "A2 → B2",
    img: "/images/logistica-briefing.png",
  },
  {
    name: "Dra. Priya Nair",
    role: "Médica Cardiologista",
    company: "Brasília",
    text: "A Falandou não só me ajudou com o idioma, mas entendeu o vocabulário técnico médico. Meu primeiro artigo foi aprovado em 4 meses após o início do programa.",
    stars: 5,
    level: "B2 → C1",
    img: "/images/medico-solucao.png",
  },
  {
    name: "Lucas Figueiredo",
    role: "Analista de TI",
    company: "Recife",
    text: "Comecei a Falandou com medo de qualquer ligação em inglês. Hoje lidero stand-ups diários com o time de São Francisco. O exame CEFR no início foi revelador.",
    stars: 5,
    level: "B1 → C1",
    img: "/images/aula-video-call.png",
  },
  {
    name: "Mariana Costa",
    role: "Head de Marketing",
    company: "Rio de Janeiro",
    text: "O que mais me surpreendeu foi o acompanhamento pelo WhatsApp. Sempre que eu tinha uma situação real de trabalho, eu podia perguntar ao meu professor na hora. Isso faz toda a diferença.",
    stars: 5,
    level: "A2 → B2",
    img: "/images/email-profissional.png",
  },
  {
    name: "Carlos Braga",
    role: "Engenheiro Civil",
    company: "Belo Horizonte",
    text: "Resultado concreto: em 90 dias passei de não conseguir fazer uma ligação para fechar uma parceria com construtora americana. O exame final comprovou o que eu já sentia no dia a dia.",
    stars: 5,
    level: "B1 → B2+",
    img: "/images/reuniao-produto.png",
  },
];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div
      className="flex-shrink-0 w-80 md:w-96 rounded-2xl overflow-hidden border border-black/5 hover:shadow-xl transition-all duration-300 flex flex-col"
      style={{ backgroundColor: "white" }}
    >
      {/* Top photo strip */}
      <div className="relative h-44 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${t.img})`, filter: "brightness(0.85)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(22,22,22,0.6) 100%)" }}
        />
        {/* Level badge */}
        <div className="absolute top-4 right-4">
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
            style={{ backgroundColor: "#FF6820" }}
          >
            {t.level}
          </span>
        </div>
        {/* Quote icon */}
        <div className="absolute bottom-4 left-4">
          <Quote size={28} style={{ color: "rgba(255,255,255,0.5)" }} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: t.stars }).map((_, i) => (
            <Star key={i} size={14} fill="#FF6820" stroke="none" />
          ))}
        </div>

        {/* Quote */}
        <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "rgba(22,22,22,0.65)" }}>
          &ldquo;{t.text}&rdquo;
        </p>

        {/* Author */}
        <div className="border-t border-black/5 pt-4">
          <div className="font-display font-bold text-sm" style={{ color: "#161616" }}>{t.name}</div>
          <div className="text-xs mt-0.5" style={{ color: "rgba(22,22,22,0.45)" }}>{t.role} • {t.company}</div>
        </div>
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
    <section id="depoimentos" className="py-24 md:py-32 overflow-hidden" style={{ backgroundColor: "#161616" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-14">
          <div className="max-w-xl">
            <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
              Depoimentos
            </p>
            <h2
              className="reveal font-display font-extrabold text-white leading-tight delay-100"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)" }}
            >
              Profissionais que já falam inglês{" "}
              <span style={{ color: "#FF6820" }}>com confiança.</span>
            </h2>
          </div>

          {/* Scroll controls */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-laranja hover:bg-laranja/10 transition-all"
              aria-label="Rolar para esquerda"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-laranja hover:bg-laranja/10 transition-all"
              aria-label="Rolar para direita"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-4 pl-6 pr-6 md:pl-[calc((100vw-80rem)/2+1.5rem)] snap-x snap-mandatory"
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
