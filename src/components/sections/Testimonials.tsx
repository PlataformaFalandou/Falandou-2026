"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Renata N.",
    role: "Profissional",
    source: "E-mail · Out 2024",
    text: "As aulas foram muito úteis, principalmente para melhorar minha comunicação no trabalho. Obrigada pela dedicação de vocês!",
    stars: 5,
  },
  {
    name: "Camila",
    role: "Aluna",
    source: "WhatsApp",
    text: "Eu realmente gosto do material visual, das revisões e de como as aulas me ajudam a perder a vergonha de falar. O material torna o conteúdo mais dinâmico, as revisões fixam o que aprendi e poder conversar sobre temas do dia a dia me dá mais confiança para estudar fora da sala.",
    stars: 5,
  },
  {
    name: "Diego C.",
    role: "Profissional",
    source: "E-mail · Jun 2024",
    text: "Gostaria de agradecer aos professores pelas orientações e pela disponibilidade ao longo do curso. As aulas, as atividades práticas contribuíram bastante para o meu desenvolvimento. Me senti mais confiante ao longo do processo.",
    stars: 5,
  },
  {
    name: "Aluno",
    role: "Aluno",
    source: "WhatsApp",
    text: "Tem sido boa. O conteúdo é direto, as trilhas são bem divididas e consigo estudar mesmo nos dias corridos.",
    stars: 5,
  },
];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div
      className="flex-shrink-0 w-80 md:w-96 rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col"
      style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
    >
      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Stars */}
        <div className="flex gap-1 mb-5">
          {Array.from({ length: t.stars }).map((_, i) => (
            <Star key={i} size={14} fill="#FF6820" stroke="none" />
          ))}
        </div>

        {/* Quote icon */}
        <Quote size={24} className="mb-3" style={{ color: "rgba(255,104,32,0.4)" }} />

        {/* Quote */}
        <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: "rgba(255,255,255,0.75)" }}>
          &ldquo;{t.text}&rdquo;
        </p>

        {/* Author */}
        <div className="border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <div className="font-display font-extrabold text-base text-white">{t.name}</div>
          <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{t.source}</div>
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
