"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";

export default function Hero() {
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
            Inglês para profissionais que precisam de resultado
          </div>

          {/* Headline */}
          <h1
            className={`font-display font-extrabold text-white leading-[1.05] tracking-tight mb-6 transition-all duration-700 delay-100 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
          >
            Inglês que{" "}
            <span style={{ color: "#FF6820" }}>abre portas</span>{" "}
            na sua carreira.
          </h1>

          {/* Subheadline */}
          <p
            className={`text-white/70 text-xl md:text-2xl leading-relaxed mb-10 max-w-2xl transition-all duration-700 delay-200 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Plano de 90 dias completamente personalizado ao seu objetivo profissional.
            Exame CEFR, acompanhamento ativo e aulas particulares com professores especializados.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-4 mb-16 transition-all duration-700 delay-300 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <a
              href={getWhatsAppUrlForContext("hero")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full text-base font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xl"
              style={{ backgroundColor: "#FF6820", boxShadow: "0 8px 32px rgba(255,104,32,0.5)" }}
            >
              <MessageCircle size={20} />
              Começar agora no WhatsApp
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

          {/* Stats strip */}
          <div
            className={`grid grid-cols-3 gap-6 max-w-lg transition-all duration-700 delay-500 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {[
              { value: "600+", label: "Profissionais formados" },
              { value: "90", label: "Dias para resultado" },
              { value: "4.9★", label: "Avaliação média" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display font-extrabold text-2xl md:text-3xl text-white">{s.value}</div>
                <div className="text-white/50 text-xs mt-1 leading-tight">{s.label}</div>
              </div>
            ))}
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
