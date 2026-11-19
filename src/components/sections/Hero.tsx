"use client";

import { trackCTAClick } from "@/lib/analytics";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";

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

interface HeroProps {
  eyebrow?: string;
  headline?: React.ReactNode;
  subheadline?: string;
  /** Chip de dado imediatamente abaixo do subheadline — ancora qualquer claim de resultado. */
  statChip?: string;
  whatsappContext?: string;
}

export default function Hero({
  eyebrow = "Você sabe inglês. Mas trava na hora de usar.",
  headline = (
    <>
      Fale inglês com{" "}
      <span style={{ color: "#FF6820" }}>confiança no trabalho.</span>
    </>
  ),
  subheadline = "A maioria dos profissionais entende inglês razoavelmente bem. O problema é na hora de falar — reunião, apresentação, entrevista. A Falandou resolve exatamente isso: inglês funcional para o seu contexto. B1 → B2 em 11 semanas em média.",
  statChip,
  whatsappContext = "hero",
}: HeroProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-woman-meeting.png"
          alt="Profissional apresentando com confiança em inglês"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(22,22,22,0.85) 0%, rgba(22,22,22,0.6) 60%, rgba(22,22,22,0.4) 100%)" }}
        />
        {/* Orange tint bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(255,104,32,0.15), transparent)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32 min-h-screen flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-white/20 backdrop-blur-sm transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ background: "rgba(255,104,32,0.2)", color: "#FF9A6C" }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#FF6820" }} />
            {eyebrow}
          </div>

          {/* Headline */}
          <h1
            className={`font-display font-extrabold text-white leading-[1.05] tracking-tight mb-6 transition-all duration-700 delay-100 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
          >
            {headline}
          </h1>

          {/* Subheadline */}
          <p
            className={`text-white/70 text-xl md:text-2xl leading-relaxed mb-10 max-w-2xl transition-all duration-700 delay-200 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {subheadline}
          </p>

          {/* Stat chip — dado de suporte ao claim do subheadline */}
          {statChip && (
            <p
              className={`text-sm font-medium mb-10 -mt-6 transition-all duration-700 delay-250 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ color: "rgba(255,104,32,0.85)" }}
            >
              {statChip}
            </p>
          )}

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-4 mb-16 transition-all duration-700 delay-300 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <a
              href={getWhatsAppUrlForContext(whatsappContext)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTAClick("hero")}
              className="inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full text-base font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xl"
              style={{ backgroundColor: "#FF6820", boxShadow: "0 8px 32px rgba(255,104,32,0.5)" }}
            >
              <MessageCircle size={20} />
              Quero começar
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-2 px-8 py-5 rounded-full text-base font-semibold text-white border border-white/30 backdrop-blur-sm hover:border-white/60 transition-all duration-200 group"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              Ver como funciona
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Stats strip — 4 números concretos visíveis sem rolar */}
          <div
            className={`transition-all duration-700 delay-500 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-4 max-w-xl">
              {[
                { value: "600+",    label: "Profissionais formados" },
                { value: "11 sem",  label: "B1→B2 em média" },
                { value: "79%",     label: "Sobem 1 nível em 90 dias" },
                { value: "4.9★",    label: "Avaliação média" },
              ].map((s) => (
                <div key={s.label} className="text-center sm:text-left">
                  <div className="font-display font-extrabold text-2xl md:text-3xl text-white">{s.value}</div>
                  <div className="text-white/50 text-xs mt-1 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Logos — empresas dos alunos, compacto dentro da Hero */}
            <div
              className={`mt-8 transition-all duration-700 delay-700 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-4">
                Profissionais de empresas como
              </p>
              <div className="flex flex-wrap gap-6 items-center">
                {HERO_LOGOS.map((logo) => (
                  <svg
                    key={logo.name}
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label={logo.name}
                    style={{ height: "18px", width: "auto", maxWidth: "80px", fill: "rgba(255,255,255,0.35)" }}
                    className="hover:fill-white/60 transition-all duration-200"
                  >
                    <path d={logo.path} />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
        <div className="w-px h-12 bg-white/40" style={{ animation: "pulse 2s infinite" }} />
      </div>
    </section>
  );
}
