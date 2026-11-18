"use client";

import Image from "next/image";
import { MessageCircle, ArrowRight } from "lucide-react";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";

export default function MidCTA() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="reveal relative rounded-3xl overflow-hidden"
          style={{ backgroundColor: "#161616" }}
        >
          {/* Background image */}
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images/conexao-internacional.png"
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>

          {/* Orange accent */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ background: "#FF6820" }}
          />

          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center p-10 md:p-16">
            <div>
              <p
                className="font-body text-sm font-semibold uppercase tracking-widest mb-4"
                style={{ color: "#FF6820" }}
              >
                Pronto para começar?
              </p>
              <h2
                className="font-display font-extrabold text-white leading-tight mb-6"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)" }}
              >
                O inglês que falta para a próxima fase da sua carreira.
              </h2>
              <p className="font-body text-white/60 text-base leading-relaxed">
                Fale com um de nossos consultores, entenda o processo e descubra qual plano faz sentido para o seu momento.
                Sem pressão, sem compromisso.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href={getWhatsAppUrlForContext("cta")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-base font-semibold text-white wa-pulse transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ backgroundColor: "#FF6820", boxShadow: "0 8px 32px rgba(255,104,32,0.4)" }}
              >
                <MessageCircle size={20} />
                Falar no WhatsApp agora
              </a>

              <div className="grid grid-cols-3 gap-3 mt-2">
                {[
                  { label: "Resposta rápida", sub: "Em até 1h" },
                  { label: "Sem taxa", sub: "Consulta grátis" },
                  { label: "Sem compromisso", sub: "Pressão zero" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/5 rounded-xl p-3 border border-white/10 text-center"
                  >
                    <div className="font-display font-semibold text-white text-xs">{item.label}</div>
                    <div className="font-body text-white/50 text-[11px] mt-0.5">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
