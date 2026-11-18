"use client";

import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Exame CEFR",
    subtitle: "Diagnóstico técnico",
    description:
      "Você faz um exame completo para identificar seu nível CEFR, pontos fortes e onde estão as maiores lacunas. Sem achismo — base científica para tudo que vem a seguir.",
    img: "/images/entrevista-simulacao.png",
    tag: "Diagnóstico",
  },
  {
    number: "02",
    title: "Plano de 90 dias",
    subtitle: "Personalizado pelos professores",
    description:
      "Com os resultados em mãos, nossos professores montam seu plano semanal completo. Cada semana tem foco, ritmo e conteúdo alinhados ao seu objetivo profissional.",
    img: "/images/reuniao-produto.png",
    tag: "Estratégia",
  },
  {
    number: "03",
    title: "Atividades semanais",
    subtitle: "100% focadas no seu objetivo",
    description:
      "Cada semana você recebe atividades práticas e direcionadas. Vocabulário do seu setor, situações reais do seu trabalho, sem conteúdo genérico que não serve para nada.",
    img: "/images/email-profissional.png",
    tag: "Prática",
  },
  {
    number: "04",
    title: "Aulas + WhatsApp",
    subtitle: "Aulas particulares + acompanhamento ativo",
    description:
      "Aulas individuais com professor especializado no seu contexto, mais acompanhamento pelo WhatsApp durante toda a semana. Você nunca fica sem suporte.",
    img: "/images/aula-video-call.png",
    tag: "Acompanhamento",
  },
  {
    number: "05",
    title: "Exame final",
    subtitle: "Reavaliação CEFR",
    description:
      "Ao final dos 90 dias, você refaz o exame CEFR. Comparamos com o início, medimos sua evolução real e identificamos o próximo passo da sua jornada.",
    img: "/images/apresentacao-resultados.png",
    tag: "Resultado",
  },
];

export default function Journey() {
  return (
    <section id="como-funciona" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
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
            Um processo estruturado, do diagnóstico ao resultado — tudo personalizado para o seu contexto.
          </p>
        </div>

        {/* Steps — alternating layout like reference */}
        <div className="space-y-8">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`reveal group grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ${
                i % 2 === 1 ? "md:[direction:rtl]" : ""
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Image half */}
              <div
                className={`relative overflow-hidden ${i % 2 === 1 ? "md:[direction:ltr]" : ""}`}
                style={{ minHeight: "320px" }}
              >
                <Image
                  src={step.img}
                  alt={step.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Number badge */}
                <div
                  className="absolute top-6 left-6 w-12 h-12 rounded-full flex items-center justify-center font-display font-black text-base text-white z-10 shadow-lg"
                  style={{ backgroundColor: "#FF6820" }}
                >
                  {step.number}
                </div>
                {/* Tag badge */}
                <div className="absolute bottom-6 left-6 z-10">
                  <span
                    className="text-xs font-bold px-3 py-1.5 rounded-full text-white backdrop-blur-sm"
                    style={{ background: "rgba(22,22,22,0.7)" }}
                  >
                    {step.tag}
                  </span>
                </div>
              </div>

              {/* Content half */}
              <div
                className={`flex flex-col justify-center p-10 md:p-14 ${i % 2 === 1 ? "md:[direction:ltr]" : ""}`}
                style={{ backgroundColor: i % 2 === 0 ? "#161616" : "#FF6820" }}
              >
                <h3
                  className="font-display font-extrabold text-white mb-2"
                  style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.25rem)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-body text-sm font-semibold uppercase tracking-wide mb-5"
                  style={{ color: i % 2 === 0 ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.7)" }}
                >
                  {step.subtitle}
                </p>
                <p
                  className="font-body text-base leading-relaxed"
                  style={{ color: i % 2 === 0 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.9)" }}
                >
                  {step.description}
                </p>

                {/* Progress dots */}
                <div className="flex gap-2 mt-10">
                  {steps.map((_, j) => (
                    <div
                      key={j}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: j === i ? "28px" : "6px",
                        backgroundColor: j === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
