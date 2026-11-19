"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackCTAClick } from "@/lib/analytics";

// ─── dados verificáveis — edite com seus números reais ───────────────────────
const STATS = [
  {
    value: "79%",
    label: "subiram ≥ 1 nível CEFR",
    sub: "em até 90 dias · exame pré e pós-ciclo",
  },
  {
    value: "11 sem",
    label: "tempo médio B1 → B2",
    sub: "mediana do último ciclo",
  },
  {
    value: "70%",
    label: "aprovados em seletivas",
    sub: "dentro de 14 meses do início",
  },
  {
    value: "92%",
    label: "concluíram sem abandonar",
    sub: "versus ~50% da média do setor",
  },
];

const METHODOLOGY_NOTES = [
  "Exame CEFR aplicado pela escola antes e após cada ciclo de 90 dias.",
  "Dados do último ciclo fechado (Jan–Set 2024) · 87 alunos avaliados.",
  "Níveis: A1 · A2 · B1 · B2 · C1 · C2 — padrão europeu usado por Cambridge e IELTS.",
];
// ─────────────────────────────────────────────────────────────────────────────

// Depoimentos como suporte qualitativo — com resultado específico quando possível
const testimonials = [
  {
    name: "Rafael Souza",
    role: "Analista de TI",
    result: "Passou a conduzir reuniões técnicas com clientes externos",
    source: "WhatsApp",
    text: "Em seis meses passei a conduzir reuniões técnicas em inglês com clientes externos. Nunca imaginei que conseguiria avançar tão rápido — a metodologia é séria e os professores cobram resultado de verdade.",
  },
  {
    name: "Camila Ferreira",
    role: "Coordenadora de Projetos",
    result: "Perdeu o bloqueio de fala — resultado em 90 dias",
    source: "WhatsApp · Ciclo 90 dias",
    text: "O que eu não esperava era perder a vergonha de falar. As sessões individuais fixam muito mais do que qualquer aula em grupo — e conversar sobre temas do meu trabalho me deu confiança para usar o inglês fora do escritório também.",
  },
  {
    name: "Diego Carvalho",
    role: "Gerente Comercial",
    result: "Comunicação clara em qualquer ambiente profissional",
    source: "E-mail · Jun 2024",
    text: "A atenção dos professores ao longo do ciclo foi o que me surpreendeu. Sempre disponíveis, sempre diretos. Terminei os 90 dias com muito mais do que inglês — saí com clareza para me comunicar em qualquer ambiente profissional.",
  },
  {
    name: "Lucas Andrade",
    role: "Engenheiro de Produtos",
    result: "Confiança crescente semana a semana",
    source: "E-mail",
    text: "As aulas, as atividades práticas e o acompanhamento constante contribuíram bastante para o meu desenvolvimento. Me senti mais confiante a cada semana.",
  },
  {
    name: "Mariana Costa",
    role: "Gestora de Marketing",
    result: "Encaixou o plano na rotina sem abrir mão do resultado",
    source: "WhatsApp",
    text: "Consigo avançar mesmo nos dias mais corridos. O plano é direto e focado no meu contexto — é exatamente o formato que eu precisava para encaixar na rotina.",
  },
  {
    name: "Renata Nogueira",
    role: "Analista de Comunicação",
    result: "Diferença real na carreira após melhorar comunicação",
    source: "E-mail · Out 2024",
    text: "As aulas foram essenciais para melhorar minha comunicação no trabalho. Passei a me expressar com muito mais clareza nas reuniões — e isso fez diferença real na minha carreira.",
  },
];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div
      className="flex-shrink-0 w-80 md:w-96 rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col"
      style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
    >
      <div className="p-6 flex flex-col flex-1">
        {/* Result badge */}
        <div
          className="inline-flex self-start px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
          style={{ background: "rgba(255,104,32,0.15)", color: "#FF6820" }}
        >
          {t.result}
        </div>

        <Quote size={22} className="mb-3" style={{ color: "rgba(255,104,32,0.35)" }} />

        <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: "rgba(255,255,255,0.72)" }}>
          &ldquo;{t.text}&rdquo;
        </p>

        <div className="border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <div className="font-display font-extrabold text-base text-white">{t.name}</div>
          <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
            {t.role} · {t.source}
          </div>
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

        {/* ── 1. Dados verificáveis em primeiro plano ── */}
        <div className="mb-20">
          <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
            Resultado verificável
          </p>
          <h2
            className="reveal font-display font-extrabold text-white leading-tight mb-3 delay-100"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)" }}
          >
            79% dos alunos subiram pelo menos{" "}
            <span style={{ color: "#FF6820" }}>1 nível CEFR em 90 dias.</span>
          </h2>
          <p className="reveal font-body text-base delay-150" style={{ color: "rgba(255,255,255,0.45)" }}>
            Medido com exame antes e depois do ciclo — não autoavaliação, não percepção.
          </p>

          {/* Stat grid */}
          <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-5 mt-10 delay-200">
            {STATS.map((s) => (
              <div
                key={s.value}
                className="rounded-2xl p-6"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p
                  className="font-display font-extrabold text-3xl mb-1"
                  style={{ color: "#FF6820" }}
                >
                  {s.value}
                </p>
                <p className="font-body text-sm font-semibold text-white mb-1">{s.label}</p>
                <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Methodology disclosure */}
          <div
            className="reveal mt-6 rounded-xl px-6 py-4 delay-300"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p className="font-body text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
              Como medimos
            </p>
            <ul className="flex flex-col gap-1">
              {METHODOLOGY_NOTES.map((note) => (
                <li key={note} className="font-body text-xs flex items-start gap-2" style={{ color: "rgba(255,255,255,0.45)" }}>
                  <span style={{ color: "#FF6820" }}>—</span> {note}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── 2. Depoimentos como suporte qualitativo ── */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
              O que dizem os alunos
            </p>
            <p className="reveal font-display font-extrabold text-white delay-100" style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)" }}>
              Os números em palavras.
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-laranja hover:bg-laranja/10 transition-all"
              aria-label="Rolar para esquerda"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-laranja hover:bg-laranja/10 transition-all"
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
        className="flex gap-5 overflow-x-auto scroll-smooth pb-4 pl-6 pr-6 md:pl-[calc((100vw-80rem)/2+1.5rem)] snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {testimonials.map((t) => (
          <div key={t.name} className="snap-start">
            <TestimonialCard t={t} />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 mt-14 text-center">
        <p className="font-body text-base mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
          A próxima história pode ser a sua.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={getWhatsAppUrl("hero")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick("testimonials")}
            className="inline-flex items-center gap-3 font-body font-bold text-base px-8 py-4 rounded-full text-white transition-all duration-300 hover:opacity-90 hover:scale-105"
            style={{ backgroundColor: "#FF6820" }}
          >
            Quero começar
          </a>
          <a
            href="#faq"
            className="font-body text-sm font-semibold underline underline-offset-4 transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Ver perguntas frequentes →
          </a>
        </div>
      </div>
    </section>
  );
}
