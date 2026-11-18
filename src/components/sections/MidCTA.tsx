"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";

export default function MidCTA() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden" style={{ backgroundColor: "#FF6820" }}>
      {/* Background image with strong overlay */}
      <div className="absolute inset-0 opacity-15">
        <Image
          src="/images/conexao-internacional.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Decorative pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-6 text-white/70">
          Pronto para começar?
        </p>
        <h2
          className="reveal font-display font-extrabold text-white leading-tight mb-6 delay-100"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
        >
          O inglês que falta para a próxima fase da sua carreira.
        </h2>
        <p className="reveal font-body text-white/80 text-xl leading-relaxed mb-12 max-w-2xl mx-auto delay-200">
          Fale com um de nossos consultores, entenda o processo e descubra qual plano faz sentido para o seu momento.
          Sem pressão, sem compromisso.
        </p>

        <div className="reveal flex flex-col sm:flex-row gap-4 justify-center items-center delay-300">
          <a
            href={getWhatsAppUrlForContext("cta")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full text-base font-bold transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xl"
            style={{ backgroundColor: "#161616", color: "white", boxShadow: "0 8px 32px rgba(22,22,22,0.4)" }}
          >
            <MessageCircle size={20} />
            Falar no WhatsApp agora
          </a>
        </div>

        {/* Trust chips */}
        <div className="reveal flex flex-wrap gap-4 justify-center mt-10 delay-400">
          {["Resposta em até 1h", "Consulta grátis", "Sem compromisso"].map((item) => (
            <div
              key={item}
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-white border border-white/30 backdrop-blur-sm"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
