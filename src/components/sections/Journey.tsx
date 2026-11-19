"use client";

import React from "react";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";
import { trackCTAClick } from "@/lib/analytics";
import CEFRTooltip from "@/components/ui/CEFRTooltip";

/**
 * Journey — ponto 40: mostrar o processo o suficiente para responder
 * "mas como funciona?", sem substituir a conversa com a equipe.
 * Uma frase por etapa; os detalhes ficam em /metodo e na conversa.
 * Sem dados de resultado aqui — a prova fica em ProofStats.
 */
const steps: { number: string; title: React.ReactNode; description: string }[] = [
  {
    number: "01",
    title: <>Exame <CEFRTooltip /></>,
    description: "Diagnóstico das quatro habilidades: onde você está e o que falta.",
  },
  {
    number: "02",
    title: "Plano de 90 dias",
    description: "Montado pelos professores em torno do seu objetivo profissional.",
  },
  {
    number: "03",
    title: "Prática semanal",
    description: "Atividades com o vocabulário e as situações do seu trabalho.",
  },
  {
    number: "04",
    title: "Sessões 1 a 1",
    description: "Professor dedicado e acompanhamento pelo WhatsApp a semana toda.",
  },
  {
    number: "05",
    title: "Exame final",
    description: "Você refaz o exame e vê a sua evolução em número.",
  },
];

export default function Journey() {
  return (
    <section id="como-funciona" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
            Como funciona
          </p>
          <h2
            className="reveal font-display font-extrabold leading-tight delay-100"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#161616" }}
          >
            Sua jornada de{" "}
            <span style={{ color: "#FF6820" }}>90 dias</span>{" "}
            para o inglês profissional.
          </h2>
          <p className="reveal font-body text-lg mt-4 delay-200" style={{ color: "rgba(22,22,22,0.55)" }}>
            Cinco etapas, do diagnóstico ao resultado medido.
          </p>
        </div>

        {/* Timeline */}
        <ol className="relative grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5">
          {/* Linha de conexão (desktop) */}
          <div
            aria-hidden
            className="hidden md:block absolute left-[10%] right-[10%] top-7 h-px"
            style={{ backgroundColor: "rgba(255,104,32,0.3)" }}
          />
          {steps.map((step, i) => (
            <li
              key={step.number}
              className="reveal relative flex md:flex-col items-start md:items-center gap-4 md:gap-0 md:text-center rounded-2xl p-5 md:p-6"
              style={{ backgroundColor: "#F5F6F1", transitionDelay: `${i * 60}ms` }}
            >
              <span
                className="relative z-10 flex-shrink-0 w-11 h-11 md:w-12 md:h-12 md:-mt-1 md:mb-5 rounded-full flex items-center justify-center font-display font-black text-sm text-white shadow-md"
                style={{ backgroundColor: "#FF6820" }}
              >
                {step.number}
              </span>
              <div>
                <h3 className="font-display font-extrabold text-lg mb-1.5" style={{ color: "#161616" }}>
                  {step.title}
                </h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(22,22,22,0.6)" }}>
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* CTA — o detalhe do plano sai da conversa, não da página */}
        <div className="mt-14 md:mt-16 text-center">
          <p className="font-body text-base mb-6" style={{ color: "rgba(22,22,22,0.55)" }}>
            O detalhe do seu plano sai do diagnóstico. Quer ver como fica o seu?
          </p>
          <a
            href={getWhatsAppUrlForContext("journey")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick("journey")}
            className="inline-flex items-center gap-3 font-body font-bold text-base px-8 py-4 rounded-full text-white transition-all duration-300 hover:opacity-90 hover:scale-105"
            style={{ backgroundColor: "#FF6820" }}
          >
            Quero começar
          </a>
        </div>
      </div>
    </section>
  );
}
