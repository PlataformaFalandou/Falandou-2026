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
    <section id="como-funciona" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="reveal font-body text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#FF6820" }}>
            Como funciona
          </p>
          <h2
            className="reveal font-display font-extrabold text-grafite leading-tight delay-100"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Sua jornada de{" "}
            <span style={{ color: "#FF6820" }}>90 dias</span>{" "}
            para o inglês profissional.
          </h2>
          <p className="reveal font-body text-grafite/60 text-lg mt-4 delay-200">
            Um processo estruturado, do diagnóstico ao resultado — tudo personalizado para o seu contexto.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`reveal group grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-black/5 hover:border-laranja/20 hover:shadow-lg transition-all duration-300 ${
                i % 2 === 1 ? "md:[direction:rtl]" : ""
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Image */}
              <div className={`relative h-64 md:h-auto md:min-h-[280px] overflow-hidden ${i % 2 === 1 ? "md:[direction:ltr]" : ""}`}>
                <Image
                  src={step.img}
                  alt={step.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg, rgba(255,104,32,0.15) 0%, transparent 60%)" }}
                />
                {/* Step number overlay */}
                <div
                  className="absolute top-5 left-5 w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-sm text-white"
                  style={{ backgroundColor: "#FF6820" }}
                >
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div className={`bg-neve p-8 md:p-10 flex flex-col justify-center ${i % 2 === 1 ? "md:[direction:ltr]" : ""}`}>
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: "rgba(255,104,32,0.1)", color: "#FF6820" }}
                  >
                    {step.tag}
                  </span>
                </div>

                <h3
                  className="font-display font-extrabold text-grafite mb-1"
                  style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
                >
                  {step.title}
                </h3>
                <p className="font-body text-sm font-semibold text-grafite/50 mb-4 uppercase tracking-wide">
                  {step.subtitle}
                </p>
                <p className="font-body text-grafite/70 text-base leading-relaxed">
                  {step.description}
                </p>

                {/* Progress dots */}
                <div className="flex gap-2 mt-8">
                  {steps.map((_, j) => (
                    <div
                      key={j}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: j === i ? "24px" : "6px",
                        backgroundColor: j === i ? "#FF6820" : "rgba(22,22,22,0.15)",
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
