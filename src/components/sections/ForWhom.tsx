"use client";

import Image from "next/image";

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
    <section id="para-quem" className="py-20 md:py-28 bg-neve">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <p className="reveal font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#FF6820" }}>
            Para quem é
          </p>
          <h2 className="reveal font-display font-extrabold text-grafite leading-tight delay-100" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Feito para quem precisa de inglês{" "}
            <em className="not-italic" style={{ color: "#FF6820" }}>no trabalho, de verdade.</em>
          </h2>
          <p className="reveal font-body text-grafite/60 text-lg mt-4 delay-200">
            Não ensinamos inglês genérico. Cada plano é montado em torno do seu contexto profissional, do seu vocabulário e dos seus objetivos.
          </p>
        </div>

        {/* Profile cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {profiles.map((p, i) => (
            <div
              key={p.role}
              className="reveal group bg-white rounded-2xl overflow-hidden border border-black/5 hover:border-laranja/30 hover:shadow-lg transition-all duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.role}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(22,22,22,0.5) 0%, transparent 55%)" }}
                />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="font-display font-bold text-sm text-white">{p.role}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start gap-2 mb-3">
                  <span className="text-sm mt-0.5">❌</span>
                  <p className="font-body text-sm text-grafite/60 leading-snug">{p.pain}</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sm mt-0.5">✅</span>
                  <p className="font-body text-sm font-medium text-grafite leading-snug">{p.gain}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
