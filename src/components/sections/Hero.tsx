"use client";

import { trackCTAClick } from "@/lib/analytics";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";
import { STATS } from "@/data/stats";
import PracticeCaseCard from "@/components/ui/PracticeCaseCard";
import type { PracticeCase } from "@/data/practiceCases";

// Inline SVG paths — Simple Icons (CC0). Logos são marcas dos respectivos proprietários.
// Contexto: empregadores dos alunos matriculados — não implica endosso.
const HERO_LOGOS = [
  {
    name: "Accenture",
    path: "m.66 16.95 13.242-4.926L.66 6.852V0l22.68 9.132v5.682L.66 24Z",
  },
  {
    name: "Google",
    path: "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z",
  },
  {
    name: "IBM",
    path: "M0 7.994v1.65h7.714c-.12-.54-.27-1.11-.45-1.65H0zm0 4.65v1.65h7.713a13.09 13.09 0 0 1-.449-1.65H0zM9.86 7.994a7.816 7.816 0 0 1 .475 1.65h3.33V7.994H9.86zm.475 4.65a7.816 7.816 0 0 1-.474 1.65h3.804v-1.65h-3.33zM6.188 3.344v1.65h3.9A9.84 9.84 0 0 0 8.4 3.344H6.188zm-6.188 0v1.65h8.4A9.84 9.84 0 0 0 6.713 3.344H0zM6.188 19.006v1.65H8.4a9.84 9.84 0 0 0 1.688-1.65h-3.9zm-6.188 0v1.65h6.713a9.84 9.84 0 0 0 1.688-1.65H0zm7.763-5.012a9.028 9.028 0 0 1-.375 1.65h3.3c.09-.525.165-1.08.21-1.65h-3.135zm0-4.65a9.028 9.028 0 0 1 .375 1.65H11.4c-.045-.57-.12-1.125-.21-1.65H7.763zm7.838-5.999v1.65H24v-1.65h-8.4zm0 4.65v1.65H24v-1.65h-8.4zm0 4.65v1.65H24v-1.65h-8.4zm0 4.65v1.65H24v-1.65h-8.4z",
  },
  {
    name: "Amazon",
    path: "M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.439-2.186 1.439-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.699-3.182v.684zm3.186 7.705a.659.659 0 0 1-.742.074c-1.044-.869-1.231-1.273-1.802-2.102-1.721 1.753-2.942 2.278-5.174 2.278-2.643 0-4.698-1.631-4.698-4.892 0-2.549 1.382-4.284 3.349-5.132 1.704-.751 4.085-.884 5.907-1.09V6.47c0-.703.054-1.531-.358-2.138-.355-.541-1.038-.765-1.636-.765-1.112 0-2.1.571-2.342 1.754-.05.263-.244.522-.507.535l-2.832-.307c-.238-.053-.504-.246-.435-.611C6.573 2.051 9.372 1.19 11.9 1.19c1.291 0 2.979.344 3.998 1.318 1.291 1.207 1.167 2.816 1.167 4.566v4.137c0 1.244.516 1.791 1.001 2.462.17.238.207.523-.008.701l-1.914 1.421zm3.162 2.847C18.531 22.671 15.361 24 12.601 24 8.898 24 5.56 22.567 3.042 20.19c-.199-.18-.022-.427.219-.287 2.721 1.583 6.082 2.534 9.555 2.534 2.344 0 4.924-.487 7.299-1.496.358-.152.657.234.191.505zm.945-2.876c-.272-.349-1.797-.165-2.484-.083-.208.025-.24-.156-.053-.287 1.217-.856 3.213-.609 3.446-.322.234.288-.062 2.283-1.202 3.233-.175.147-.342.069-.264-.125.256-.638.829-2.065.557-2.416z",
  },
  {
    name: "JPMorgan Chase",
    path: "M0 15.415c0 .468.38.85.848.85h5.937V.575L0 7.72v7.695m15.416 8.582c.467 0 .846-.38.846-.849v-5.937H.573l7.146 6.785h7.697M24 8.587a.844.844 0 0 0-.847-.846h-5.938V23.43l6.782-7.148L24 8.586M8.585.003a.847.847 0 0 0-.847.847v5.94h15.688L16.282.003H8.585Z",
  },
];

/**
 * Trecho do título. O título entra inteiro, sem separar palavras ou letras
 * (direção de movimento §1.1). `accent` pinta de laranja — uma expressão por título.
 * `start` é mantido por compatibilidade.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HeadlineWords({ text, accent = false, start = 0 }: { text: string; accent?: boolean; start?: number }) {
  const clean = text.trim();
  return accent ? <span style={{ color: "#FF6820" }}>{clean}</span> : <>{clean} </>;
}

interface HeroProps {
  eyebrow?: string;
  headline?: React.ReactNode;
  subheadline?: string;
  /** Versão curta do subtítulo para o celular (revisão editorial §21). */
  subheadlineShort?: string;
  /** Chip de dado imediatamente abaixo do subheadline — ancora qualquer claim de resultado. */
  statChip?: string;
  whatsappContext?: string;
  /** Texto do botão principal. LPs de mídia usam algo mais urgente (Arquitetura §8). */
  ctaLabel?: string;
  /** "Situação em prática" ao lado do título, no desktop (direção criativa §5.1). */
  practice?: PracticeCase;
}


/**
 * Hero em 3 camadas (UX/UI §2): resultado (headline) → mecanismo (subheadline) →
 * ação (CTA primário + secundário). Fundo tipográfico escuro, sem foto de banco de imagens.
 */
export default function Hero({
  eyebrow = "Você sabe inglês. Mas trava na hora de usar.",
  headline = (
    <>
      <HeadlineWords text="Fale inglês com" />
      <HeadlineWords text="confiança no trabalho." accent start={3} />
    </>
  ),
  subheadline = "A maioria dos profissionais entende inglês razoavelmente bem. O problema é na hora de falar — reunião, apresentação, entrevista. A Falandou resolve exatamente isso: inglês funcional para o seu contexto. B1 → B2 em 11 semanas em média.",
  subheadlineShort,
  statChip,
  whatsappContext = "hero",
  ctaLabel = "Quero começar",
  practice,
}: HeroProps) {
  // Entrada do hero (direção de movimento §1.1) em CSS puro: título (320ms) →
  // explicação (+60ms) → botões e prova (+100ms). Sem esperar a hidratação.
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #1A1A1A 0%, #141414 55%, #1E1E1E 100%)" }}
    >
      {/* Textura sutil: grade de linhas finas + brilho laranja (sem imagem, sem loop) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 30% 40%, black 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 30% 40%, black 0%, transparent 75%)",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8 pt-28 pb-12 md:pt-40 md:pb-20 min-h-hero flex flex-col justify-center">
        {/* Revisão visual §5.1: título → explicação → CTA → prova curta. Os indicadores
            detalhados ficam na faixa seguinte (StatsBar). */}
        <div className={practice ? "grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-12 xl:gap-16 items-center" : ""}>
        <div className="max-w-3xl">
          {/* Selo: menos contraste que o CTA */}
          <p
            className="enter-title inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6 border"
            style={{ background: "transparent", borderColor: "var(--color-border)", color: "var(--color-text-body)" }}
          >
            {eyebrow}
          </p>

          {/* 1 — título: uma expressão destacada, só pela cor (§2.3) */}
          <h1 className="enter-title font-display text-white mb-4" style={{ fontSize: "var(--text-h1)" }}>
            {headline}
          </h1>

          {/* 2 — explicação em duas ou três linhas */}
          <p className="enter-text text-lg md:text-xl leading-relaxed mb-8 max-w-2xl" style={{ color: "var(--color-text-body)" }}>
            {subheadlineShort ?? subheadline}
          </p>

          {/* 3 — ação: primário preenchido + secundário de contorno neutro (§3.1) */}
          <div className="enter-actions">
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={getWhatsAppUrlForContext(whatsappContext)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick("hero")}
                className="cta-primary cta-lg rounded-full sm:min-w-[220px]"
              >
                <MessageCircle aria-hidden="true" />
                {ctaLabel}
              </a>
              <Link href="/planos" className="cta-secondary cta-lg rounded-full sm:min-w-[180px]">
                Ver planos
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            {/* Botão → texto auxiliar: 8px (§4.3) */}
            <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
              Pelo WhatsApp · a equipe responde em até 1h
            </p>
          </div>

          {/* 4 — prova curta */}
          <div className="enter-actions mt-10">
            <p className="text-sm tnum mb-4" style={{ color: "var(--color-text-body)" }}>
              {statChip ?? (
                <>
                  <strong className="text-white">{STATS.evaluated} profissionais</strong> avaliados no exame CEFR no último
                  ciclo · sessões 1 a 1, sem turma
                </>
              )}
            </p>
            <div className="flex flex-wrap gap-6 items-center" aria-label="Empresas onde trabalham profissionais que estudaram na Falandou">
              {HERO_LOGOS.map((logo) => (
                <svg
                  key={logo.name}
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label={logo.name}
                  style={{ height: "18px", width: "auto", maxWidth: "80px", fill: "rgba(255,255,255,0.4)" }}
                >
                  <path d={logo.path} />
                </svg>
              ))}
            </div>
          </div>
        </div>
        {/* Composição do hero: o trabalho da escola ao lado da promessa (direção criativa §4.2) */}
        {practice && (
          <div className="enter-aside hidden lg:block">
            <PracticeCaseCard c={practice} compact />
          </div>
        )}
        </div>
      </div>
    </section>
  );
}
