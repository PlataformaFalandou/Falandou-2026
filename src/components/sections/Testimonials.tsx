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

// Logos inline — mesmas paths usadas em CompanyLogos.tsx
const COMPANY_LOGOS: Record<string, { viewBox?: string; path: string }> = {
  Accenture: {
    path: "M14.028 0L9.72 11.953l-2.025-5.056H5.252l3.078 7.49H8.32L14.028 0zM6.195 14.387H3.75L0 24h2.359l.882-2.517h3.396L7.52 24h2.414l-3.74-9.613zm-2.408 5.52l1.144-3.248 1.137 3.249H3.787zm14.47-5.52H16.07l-3.737 9.613H14.7l.883-2.517h3.396L19.87 24h2.414l-3.737-9.613zm-2.407 5.52l1.144-3.248 1.136 3.249h-2.28z",
  },
  Amazon: {
    viewBox: "0 0 24 24",
    path: "M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.496.124.102.172.063.337-.114.498-.928.771-2.03 1.44-3.302 2.011-1.273.573-2.63.98-4.072 1.22a26.272 26.272 0 0 1-4.243.343c-2.76 0-5.333-.427-7.717-1.28a19.587 19.587 0 0 1-3.825-1.952c-.221-.162-.277-.33-.165-.498zm20.783-5.544c.14.172.067.344-.11.516l-.95.845c-.173.14-.32.172-.448.095-.063-.03-.173-.14-.33-.336-.158-.195-.291-.336-.4-.42a7.08 7.08 0 0 0-1.063-.747 5.5 5.5 0 0 0-2.63-.625c-1.095 0-1.967.233-2.615.7-.648.465-.972 1.056-.972 1.774 0 .593.2 1.095.6 1.504.4.41.98.73 1.74.965.76.235 1.73.47 2.914.712 1.185.243 2.254.52 3.21.834a5.46 5.46 0 0 1 2.282 1.56c.633.717.95 1.68.95 2.89 0 .858-.2 1.638-.6 2.342-.4.704-.964 1.293-1.69 1.77-.726.477-1.57.835-2.53 1.08a11.9 11.9 0 0 1-3.08.372c-2.248 0-4.258-.398-6.03-1.193-.59-.262-1.1-.558-1.527-.882-.162-.116-.21-.264-.137-.437l.717-1.676c.1-.22.248-.27.44-.145.46.333.978.634 1.556.898 1.388.631 2.914.947 4.572.947 1.274 0 2.283-.23 3.028-.688.745-.457 1.118-1.1 1.118-1.93 0-.652-.22-1.183-.657-1.59-.437-.408-1.055-.724-1.853-.95l-3.47-.897c-1.4-.364-2.52-.83-3.355-1.397-.835-.568-1.44-1.21-1.81-1.924a5.138 5.138 0 0 1-.563-2.39c0-.82.185-1.56.555-2.21.37-.653.882-1.21 1.535-1.673.655-.46 1.418-.81 2.29-1.044a9.863 9.863 0 0 1 2.72-.353c1.837 0 3.483.336 4.936 1.008.5.237.956.503 1.37.797z",
  },
  IBM: {
    viewBox: "0 0 24 24",
    path: "M0 7.172v1.03h8.957c.65 0 1.3.26 1.3 1.03v.26H0v1.03h10.257v.26c0 .77-.65 1.03-1.3 1.03H0v1.03h9.213c1.17 0 2.084-.773 2.084-2.06V9.23c0-1.286-.915-2.058-2.085-2.058H0zm13.743 0v5.14h1.044V7.172zm2.343 0v5.14h1.044V7.172zm-16.086 0zm11.757 0zm4.343 6.428v1.03h8.957c.65 0 1.3.26 1.3 1.03v.26H16.1v1.03H26.4v.26c0 .77-.65 1.03-1.3 1.03H16.1v1.03h9.213c1.17 0 2.085-.773 2.085-2.06V15.63c0-1.287-.915-2.06-2.085-2.06H16.1zm-16.1 0v5.14h1.044V13.6zm2.343 0v5.14H3.73V13.6zm11.757 0zm0 0v5.14h1.044V13.6zm2.343 0v5.14h1.044V13.6zM6.343 7.172v5.14h3.9c1.04 0 1.65-.643 1.65-1.543v-.514c0-.643-.39-1.03-.91-1.158.39-.128.78-.514.78-1.157v-.257c0-.9-.65-1.511-1.65-1.511H6.343zm1.044 1.03h2.73c.52 0 .78.257.78.642 0 .386-.26.643-.78.643H7.387v-1.286zm0 2.315h2.73c.65 0 .91.257.91.643 0 .385-.26.642-.91.642H7.387v-1.285zm15.27-3.345v5.14h3.9c1.04 0 1.65-.643 1.65-1.543v-.514c0-.643-.39-1.03-.91-1.158.39-.128.78-.514.78-1.157v-.257c0-.9-.65-1.511-1.65-1.511H22.657zm1.043 1.03h2.73c.52 0 .78.257.78.642 0 .386-.26.643-.78.643h-2.73V8.202zm0 2.315h2.73c.65 0 .91.257.91.643 0 .385-.26.642-.91.642h-2.73v-1.285z",
  },
  Google: {
    viewBox: "0 0 24 24",
    path: "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z",
  },
  "JPMorgan Chase": {
    viewBox: "0 0 24 24",
    path: "M0 15.415c0 .468.38.85.848.85h5.937V.575L0 7.72v7.695m15.416 8.582c.467 0 .846-.38.846-.849v-5.937H.573l7.146 6.785h7.697M24 8.587a.844.844 0 0 0-.847-.846h-5.938V23.43l6.782-7.148L24 8.586M8.585.003a.847.847 0 0 0-.847.847v5.94h15.688L16.282.003H8.585Z",
  },
  Unilever: {
    viewBox: "0 0 24 24",
    path: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10 0 5.515-4.486 10-10 10C6.486 22 2 17.515 2 12 2 6.486 6.486 2 12 2zm-3.5 5v9.5c0 1.933 1.567 3.5 3.5 3.5s3.5-1.567 3.5-3.5V7h-2v9.5c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5V7h-2z",
  },
};

function CompanyLogoInline({ company }: { company: string }) {
  const logo = COMPANY_LOGOS[company];
  if (!logo) return null;
  return (
    <svg
      role="img"
      viewBox={logo.viewBox ?? "0 0 24 24"}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={company}
      style={{ height: "14px", width: "auto", fill: "rgba(255,255,255,0.5)", flexShrink: 0 }}
    >
      <path d={logo.path} />
    </svg>
  );
}

// Depoimentos como suporte qualitativo — com resultado específico quando possível
const testimonials = [
  {
    name: "Rafael Souza",
    role: "Analista de TI",
    company: "IBM",
    result: "Passou a conduzir reuniões técnicas com clientes externos",
    source: "WhatsApp",
    text: "Em seis meses passei a conduzir reuniões técnicas em inglês com clientes externos. Nunca imaginei que conseguiria avançar tão rápido — a metodologia é séria e os professores cobram resultado de verdade.",
  },
  {
    name: "Camila Ferreira",
    role: "Coordenadora de Projetos",
    company: "Accenture",
    result: "Perdeu o bloqueio de fala — resultado em 90 dias",
    source: "WhatsApp · Ciclo 90 dias",
    text: "O que eu não esperava era perder a vergonha de falar. As sessões individuais fixam muito mais do que qualquer aula em grupo — e conversar sobre temas do meu trabalho me deu confiança para usar o inglês fora do escritório também.",
  },
  {
    name: "Diego Carvalho",
    role: "Gerente Comercial",
    company: "Amazon",
    result: "Comunicação clara em qualquer ambiente profissional",
    source: "E-mail · Jun 2024",
    text: "A atenção dos professores ao longo do ciclo foi o que me surpreendeu. Sempre disponíveis, sempre diretos. Terminei os 90 dias com muito mais do que inglês — saí com clareza para me comunicar em qualquer ambiente profissional.",
  },
  {
    name: "Lucas Andrade",
    role: "Engenheiro de Produtos",
    company: "Google",
    result: "Confiança crescente semana a semana",
    source: "E-mail",
    text: "As aulas, as atividades práticas e o acompanhamento constante contribuíram bastante para o meu desenvolvimento. Me senti mais confiante a cada semana.",
  },
  {
    name: "Mariana Costa",
    role: "Gestora de Marketing",
    company: "Unilever",
    result: "Encaixou o plano na rotina sem abrir mão do resultado",
    source: "WhatsApp",
    text: "Consigo avançar mesmo nos dias mais corridos. O plano é direto e focado no meu contexto — é exatamente o formato que eu precisava para encaixar na rotina.",
  },
  {
    name: "Renata Nogueira",
    role: "Analista de Comunicação",
    company: "JPMorgan Chase",
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

        {/* Identity footer — cargo, empresa e logo */}
        <div className="border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <div className="font-display font-extrabold text-base text-white">{t.name}</div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
              {t.role}
            </span>
            {t.company && (
              <>
                <span style={{ color: "rgba(255,255,255,0.2)" }} className="text-xs">·</span>
                <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.65)" }}>
                  {t.company}
                </span>
                <CompanyLogoInline company={t.company} />
              </>
            )}
          </div>
          <div className="mt-1 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            {t.source}
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

        {/* ── 0. Social proof: logos das empresas ── */}
        <div className="reveal mb-16 delay-0">
          <p className="font-body text-xs font-semibold uppercase tracking-widest mb-7 text-center" style={{ color: "rgba(255,255,255,0.25)" }}>
            Nossos alunos trabalham em
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {Object.entries(COMPANY_LOGOS).map(([name, logo]) => (
              <div
                key={name}
                className="opacity-25 hover:opacity-50 transition-opacity duration-300"
                title={name}
                style={{ height: "28px" }}
              >
                <svg
                  role="img"
                  viewBox={logo.viewBox ?? "0 0 24 24"}
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label={name}
                  style={{ height: "100%", width: "auto", maxWidth: "120px", fill: "#ffffff" }}
                >
                  <path d={logo.path} />
                </svg>
              </div>
            ))}
          </div>
        </div>

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
