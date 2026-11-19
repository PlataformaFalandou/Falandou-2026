"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";
import { trackCTAClick } from "@/lib/analytics";

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
        <p className="reveal font-body text-white/80 text-lg leading-relaxed mb-6 max-w-2xl mx-auto delay-200">
          Nossos alunos chegam sem conseguir conduzir uma reunião em inglês. Ao fim do ciclo de 90 dias, 79% sobe pelo menos 1 nível CEFR. Em menos de 14 meses, 70% é aprovado em processos seletivos com etapa em inglês.
        </p>
        {/* ROI anchor */}
        <div
          className="reveal inline-flex flex-wrap justify-center items-center gap-x-5 gap-y-2 px-6 py-3 rounded-2xl mb-8 delay-200"
          style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          <span className="text-white/60 text-sm font-medium">Promoção salarial</span>
          <span className="text-white font-extrabold">+R$ 1.500–4.000/mês</span>
          <span className="text-white/30">·</span>
          <span className="text-white/60 text-sm font-medium">Retorno médio</span>
          <span className="text-white font-extrabold">&lt; 60 dias</span>
        </div>

        <p className="reveal font-body text-white/60 text-base leading-relaxed mb-10 max-w-xl mx-auto delay-200">
          Você conversa com a equipe para entender como funciona e recebe um plano montado para o seu objetivo. Sem pressão, sem compromisso.
        </p>

        <div className="reveal flex flex-col sm:flex-row gap-4 justify-center items-center delay-300">
          <a
            href={getWhatsAppUrlForContext("cta")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick("midcta")}
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full text-base font-bold transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xl"
            style={{ backgroundColor: "#161616", color: "white", boxShadow: "0 8px 32px rgba(22,22,22,0.4)" }}
          >
            <MessageCircle size={20} />
              Quero começar
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
