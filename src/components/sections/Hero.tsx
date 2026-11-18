"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";

const badges = [
  "600+ profissionais formados",
  "Plano 100% personalizado",
  "Exame CEFR incluso",
];

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-neve">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #161616 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Orange accent blob */}
      <div
        className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "#FF6820" }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 md:pt-36 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="relative z-10">
            {/* Eyebrow */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 transition-all duration-700 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ background: "rgba(255,104,32,0.1)", color: "#FF6820" }}
            >
              <span className="w-2 h-2 rounded-full bg-laranja animate-pulse" style={{ backgroundColor: "#FF6820" }} />
              Inglês para profissionais que precisam de resultado
            </div>

            {/* Headline */}
            <h1
              className={`font-display font-extrabold text-grafite leading-[1.05] tracking-tight mb-6 transition-all duration-700 delay-100 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)" }}
            >
              Inglês que{" "}
              <span
                className="relative inline-block"
                style={{ color: "#FF6820" }}
              >
                abre portas
                <span
                  className="absolute bottom-1 left-0 w-full h-[3px] rounded-full"
                  style={{ background: "#FF6820", opacity: 0.3 }}
                />
              </span>{" "}
              na sua carreira.
            </h1>

            {/* Subheadline */}
            <p
              className={`font-body text-grafite/65 text-lg md:text-xl leading-relaxed mb-8 max-w-lg transition-all duration-700 delay-200 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Plano de 90 dias completamente personalizado ao seu objetivo profissional.
              Exame CEFR, acompanhamento ativo e aulas particulares com professores especializados.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row gap-3 mb-10 transition-all duration-700 delay-300 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <a
                href={getWhatsAppUrlForContext("hero")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-base font-semibold text-white wa-pulse transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                style={{ backgroundColor: "#FF6820", boxShadow: "0 8px 24px rgba(255,104,32,0.3)" }}
              >
                <MessageCircle size={18} />
                Começar agora no WhatsApp
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-base font-semibold text-grafite bg-white border border-black/10 transition-all duration-200 hover:border-laranja hover:text-laranja group"
              >
                Ver como funciona
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Trust badges */}
            <div
              className={`flex flex-wrap gap-3 transition-all duration-700 delay-500 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white border border-black/8 text-grafite/70"
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#FF6820" }} />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Hero image */}
          <div
            className={`relative transition-all duration-1000 delay-200 ${
              loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative">
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5]">
                <Image
                  src="/images/hero-woman-meeting.png"
                  alt="Profissional apresentando com confiança em inglês"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(22,22,22,0.4) 0%, transparent 60%)",
                  }}
                />
              </div>

              {/* Floating stat card */}
              <div
                className="absolute -left-6 bottom-16 bg-white rounded-2xl p-4 shadow-xl border border-black/5"
                style={{ minWidth: "160px" }}
              >
                <div className="font-display font-extrabold text-3xl" style={{ color: "#FF6820" }}>
                  600+
                </div>
                <div className="font-body text-xs text-grafite/60 mt-0.5 leading-tight">
                  Profissionais<br />formados
                </div>
              </div>

              {/* Floating CEFR card */}
              <div
                className="absolute -right-4 top-12 bg-grafite rounded-2xl p-4 shadow-xl"
                style={{ minWidth: "140px" }}
              >
                <div className="font-display font-bold text-lg text-white">
                  Exame CEFR
                </div>
                <div className="font-body text-xs text-white/60 mt-1">
                  Diagnóstico técnico incluso
                </div>
                <div className="mt-2 flex gap-1">
                  {["A1","B1","B2","C1","C2"].map((level) => (
                    <span
                      key={level}
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                      style={{ background: "rgba(255,104,32,0.2)", color: "#FF6820" }}
                    >
                      {level}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #F5F6F1)" }}
      />
    </section>
  );
}
