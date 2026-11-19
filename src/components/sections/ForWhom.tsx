"use client";

import Image from "next/image";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const profiles = [
  {
    img: "/images/prof-arquiteta.png",
    role: "Arquitetos e Engenheiros",
    pain: "Dificuldade em apresentar projetos para clientes internacionais",
    gain: "Comunica ideias técnicas com clareza e confiança em inglês",
  },
  {
    img: "/images/medico-solucao.png",
    role: "Profissionais de Saúde",
    pain: "Barreiras com literatura médica e colegas internacionais",
    gain: "Participa de congressos, escreve artigos e lidera equipes globais",
  },
  {
    img: "/images/logistica-briefing.png",
    role: "Gestores e Líderes",
    pain: "Travamento em reuniões, negociações e apresentações em inglês",
    gain: "Conduz reuniões e negocia com parceiros internacionais com autoridade",
  },
  {
    img: "/images/email-profissional.png",
    role: "Analistas e Especialistas",
    pain: "Emails e relatórios em inglês que levam horas para escrever",
    gain: "Produz comunicações escritas precisas e profissionais com agilidade",
  },
];

export default function ForWhom() {
  return (
    <section id="para-quem" className="py-24 md:py-32" style={{ backgroundColor: "#F5F6F1" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
              Para quem é
            </p>
            <h2 className="reveal font-display font-extrabold leading-tight delay-100" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#161616" }}>
              Feito para quem precisa de inglês{" "}
              <em className="not-italic" style={{ color: "#FF6820" }}>no trabalho, de verdade.</em>
            </h2>
          </div>
          <p className="reveal font-body text-base leading-relaxed md:max-w-xs delay-200" style={{ color: "rgba(22,22,22,0.55)" }}>
            Não ensinamos inglês genérico. Cada plano é montado em torno do seu contexto profissional.
          </p>
        </div>

        {/* Profile cards — large format like reference */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {profiles.map((p, i) => (
            <div
              key={p.role}
              className="reveal group relative rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-default"
              style={{ transitionDelay: `${i * 80}ms`, aspectRatio: "3/4" }}
            >
              {/* Full-bleed image */}
              <Image
                src={p.img}
                alt={p.role}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, 25vw"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{ background: "linear-gradient(to top, rgba(22,22,22,0.92) 0%, rgba(22,22,22,0.4) 50%, transparent 100%)" }}
              />

              {/* Role tag top-left */}
              <div className="absolute top-4 left-4">
                <span
                  className="text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(255,104,32,0.9)", color: "white" }}
                >
                  {p.role}
                </span>
              </div>

              {/* Content bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-start gap-2 mb-3">
                  <span className="text-sm mt-0.5 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/60 leading-snug">{p.pain}</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sm mt-0.5 flex-shrink-0">✅</span>
                  <p className="text-sm font-semibold text-white leading-snug">{p.gain}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA — visitante acabou de se reconhecer em um dos perfis */}
        <div className="mt-16 text-center">
          <p className="font-body text-base mb-6" style={{ color: "rgba(22,22,22,0.55)" }}>
            Se você se identificou com algum desses perfis, o próximo passo é simples.
          </p>
          <a
            href={getWhatsAppUrl("hero")}
            target="_blank"
            rel="noopener noreferrer"
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
