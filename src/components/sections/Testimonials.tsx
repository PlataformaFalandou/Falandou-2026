"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";
import { trackCTAClick } from "@/lib/analytics";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { testimonials, personasWithEnough, type Persona, type Testimonial } from "@/data/testimonials";

// Seção de humanização: só depoimentos. Os dados de resultado ficam em ProofStats,
// e os logos das empresas já aparecem na Hero.
// Variantes (Arquitetura §7): "compact" = 3 cartões fixos + link para /depoimentos;
// "full" = grade com todos (página /depoimentos). No celular, a versão compacta vira carrossel (UX/UI §12).

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

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

/**
 * Cartão de depoimento em 5 elementos (UX/UI §12): aspas laranja de 60px, texto em
 * 18px itálico, resultado em destaque, avatar com iniciais + nome + cargo e, quando
 * houver o dado real do exame, o selo CEFR antes → depois (nunca estimado).
 */
function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure
      className="h-full rounded-2xl border flex flex-col p-6 md:p-8"
      style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
    >
      <div className="flex items-start justify-between gap-4">
        <span aria-hidden="true" className="font-display font-black leading-none select-none" style={{ fontSize: "60px", color: "#FF6820", height: "40px" }}>
          &ldquo;
        </span>
        {t.levelBefore && t.levelAfter && (
          <span
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold tnum"
            style={{ background: "rgba(255,104,32,0.15)", color: "#FF8A4C", border: "1px solid rgba(255,104,32,0.4)" }}
            title="Nível CEFR no início e no fim do ciclo"
          >
            {t.levelBefore} → {t.levelAfter}
          </span>
        )}
      </div>

      {/* Resultado mensurável em destaque */}
      <p className="font-display font-bold text-white text-base leading-snug mt-4 mb-4">
        {t.result}
        {t.cycle && <span className="font-body font-normal" style={{ color: "var(--color-text-muted)" }}> · {t.cycle}</span>}
      </p>

      <blockquote className="flex-1 mb-6">
        <p className="italic leading-relaxed" style={{ fontSize: "1.0625rem", color: "var(--color-text-body)" }}>
          {t.text}
        </p>
      </blockquote>

      {/* Formato misto (Arquitetura §7): vídeo curto quando houver. Miniatura com
          link — o YouTube não carrega na página, então não há cookies sem consentimento. */}
      {t.videoId && (
        <a
          href={`https://www.youtube.com/watch?v=${t.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block mb-6 rounded-xl overflow-hidden aspect-video img-skeleton"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${t.videoId}/hqdefault.jpg`}
            alt={`Depoimento em vídeo de ${t.name}`}
            width={480}
            height={360}
            loading="lazy"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <PlayCircle size={40} color="#fff" strokeWidth={1.5} />
          </span>
        </a>
      )}

      {/* Identidade: avatar com iniciais + nome + cargo + empresa */}
      <figcaption className="border-t pt-4 flex items-center gap-3" style={{ borderColor: "var(--color-border)" }}>
        <span
          aria-hidden="true"
          className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center font-display font-extrabold text-sm"
          style={{ background: "linear-gradient(135deg, #FF6820, #E05010)", color: "#fff" }}
        >
          {initials(t.name)}
        </span>
        <div className="min-w-0">
          <div className="font-display font-extrabold text-base text-white">{t.name}</div>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              {t.role}
            </span>
            {t.company && (
              <>
                <span style={{ color: "rgba(255,255,255,0.2)" }} className="text-xs">·</span>
                <span className="text-xs font-semibold" style={{ color: "rgba(245,246,241,0.75)" }}>
                  {t.company}
                </span>
                <CompanyLogoInline company={t.company} />
              </>
            )}
          </div>
          <div className="mt-0.5 text-xs" style={{ color: "rgba(245,246,241,0.4)" }}>
            {t.source}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * Carrossel do celular (revisão técnica §2): acionado só pelo visitante, sem troca automática.
 * - Movimento: rolagem nativa suave (`scrollTo`), sem animação manual concorrente. Arrastar
 *   interrompe naturalmente qualquer rolagem em andamento.
 * - Card ativo: o mais próximo do centro visível, pela posição real; recalculado ao rolar e ao
 *   redimensionar (ResizeObserver). O estado só muda quando o índice muda.
 * - Acessibilidade: setas de 44px e teclado (← →); após navegar por botão ou teclado, uma região
 *   `aria-live="polite"` anuncia "Depoimento 2 de 3". No desktop vira grade, sem parada de foco.
 */
function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [announce, setAnnounce] = useState("");
  const isCarousel = useMediaQuery("(max-width: 767px)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  const goTo = useCallback(
    (i: number, fromUser = true) => {
      const row = rowRef.current;
      const card = row?.children[i] as HTMLElement | undefined;
      if (!row || !card) return;
      const left = card.offsetLeft - row.offsetLeft - (row.clientWidth - card.offsetWidth) / 2;
      row.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
      if (fromUser) setAnnounce(`Depoimento ${i + 1} de ${items.length}`);
    },
    [items.length, reduced]
  );

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const center = row.scrollLeft + row.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        Array.from(row.children).forEach((c, i) => {
          const el = c as HTMLElement;
          const dist = Math.abs(el.offsetLeft - row.offsetLeft + el.offsetWidth / 2 - center);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        });
        setIndex((prev) => (prev === best ? prev : best));
      });
    };
    measure();
    row.addEventListener("scroll", measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    return () => {
      cancelAnimationFrame(raf);
      row.removeEventListener("scroll", measure);
      ro.disconnect();
    };
  }, []);

  const prev = () => goTo(Math.max(0, index - 1));
  const next = () => goTo(Math.min(items.length - 1, index + 1));

  return (
    <div>
      <div
        ref={rowRef}
        tabIndex={isCarousel ? 0 : undefined}
        onKeyDown={
          isCarousel
            ? (e) => {
                if (e.key === "ArrowRight") { e.preventDefault(); next(); }
                if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
              }
            : undefined
        }
        className="snap-row -mx-5 px-5 md:mx-0 md:px-0 flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible items-stretch"
        role={isCarousel ? "region" : undefined}
        aria-roledescription={isCarousel ? "carrossel" : undefined}
        aria-label={isCarousel ? "Depoimentos" : undefined}
      >
        {items.map((t, i) => (
          <div
            key={t.name}
            className="shrink-0 w-[85%] sm:w-[60%] md:w-auto"
            role={isCarousel ? "group" : undefined}
            aria-roledescription={isCarousel ? "slide" : undefined}
            aria-label={isCarousel ? `${i + 1} de ${items.length}` : undefined}
          >
            <TestimonialCard t={t} />
          </div>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
      {items.length > 1 && (
        <div className="md:hidden flex items-center justify-center gap-1 mt-5">
          <button
            type="button"
            onClick={prev}
            disabled={index === 0}
            aria-label="Depoimento anterior"
            className="w-11 h-11 rounded-full flex items-center justify-center disabled:opacity-40"
            style={{ border: "1px solid var(--color-border-strong)", color: "var(--color-text)" }}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          {items.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir para o depoimento ${i + 1} de ${items.length}`}
              aria-current={i === index}
              className="w-11 h-11 flex items-center justify-center"
            >
              <span
                className="block h-2 rounded-full"
                style={{
                  width: i === index ? 24 : 8,
                  backgroundColor: i === index ? "#FF6820" : "rgba(255,255,255,0.25)",
                  transition: "width var(--dur-base) ease-out, background-color var(--dur-base) ease-out",
                }}
              />
            </button>
          ))}
          <button
            type="button"
            onClick={next}
            disabled={index === items.length - 1}
            aria-label="Próximo depoimento"
            className="w-11 h-11 rounded-full flex items-center justify-center disabled:opacity-40"
            style={{ border: "1px solid var(--color-border-strong)", color: "var(--color-text)" }}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}

/** Só a grade de cartões — usada pela página /depoimentos. */
export function TestimonialsGrid({ items = testimonials }: { items?: Testimonial[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {items.map((t) => (
        <TestimonialCard key={t.name} t={t} />
      ))}
    </div>
  );
}

/**
 * Grade completa com filtro por perfil (página /depoimentos — Arquitetura §7).
 * O filtro só aparece quando há 2+ perfis com 2+ depoimentos cada; antes disso,
 * mostra a grade sem filtro (um filtro de uma opção só não ajuda ninguém).
 */
export function TestimonialsBrowser() {
  const personas = personasWithEnough(testimonials);
  const [active, setActive] = useState<Persona | "Todos">("Todos");
  const items = active === "Todos" ? testimonials : testimonials.filter((t) => t.persona === active);

  return (
    <>
      {personas.length >= 2 && (
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filtrar depoimentos por perfil">
          {(["Todos", ...personas] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setActive(p)}
              aria-pressed={active === p}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-colors"
              style={{
                backgroundColor: active === p ? "#FF6820" : "rgba(255,255,255,0.06)",
                color: "white",
                border: active === p ? "1px solid #FF6820" : "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {p}
            </button>
          ))}
        </div>
      )}
      <TestimonialsGrid items={items} />
    </>
  );
}

export default function Testimonials({ persona }: { persona?: Persona } = {}) {
  // Arquitetura §8 — nas LPs, prova social filtrada: primeiro os depoimentos do
  // perfil da página, completando com os destacados até 3 cartões.
  const fromPersona = persona ? testimonials.filter((t) => t.persona === persona) : [];
  const featured = testimonials.filter((t) => t.featured && !fromPersona.includes(t));
  const rest = testimonials.filter((t) => !fromPersona.includes(t) && !featured.includes(t));
  const items = [...fromPersona, ...featured, ...rest].slice(0, 3);

  return (
    <section id="depoimentos" className="py-12 md:py-20" style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="eyebrow reveal font-body text-sm font-bold uppercase tracking-widest mb-3">
              O que dizem os profissionais
            </p>
            <h2 className="reveal font-display font-extrabold text-white leading-tight delay-100" style={{ fontSize: "var(--text-h2)" }}>
              Os números em palavras.
            </h2>
          </div>
          <Link
            href="/depoimentos"
            className="inline-flex items-center gap-1.5 font-body text-sm font-semibold transition-colors duration-[var(--dur-base)] hover:text-white"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Ver todos os {testimonials.length} depoimentos
            <ArrowRight size={14} />
          </Link>
        </div>

        <TestimonialsCarousel items={items} />

        {/* CTA */}
        <div className="mt-14 text-center">
          <p className="font-body text-base mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
            A próxima história pode ser a sua.
          </p>
          <a
            href={getWhatsAppUrlForContext("cta")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick("testimonials")}
            className="inline-flex items-center gap-3 font-body font-bold text-base px-8 py-4 rounded-full text-white cta-primary">
            Quero começar
          </a>
        </div>
      </div>
    </section>
  );
}