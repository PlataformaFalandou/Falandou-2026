"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
  // Etapa em leitura (direção de movimento §2.3): a que cruza a faixa central da tela.
  // Só destaca — não bloqueia a rolagem nem esconde as descrições.
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const items = itemRefs.current.filter((el): el is HTMLLIElement => !!el);
    const last = items.length - 1;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    let timer: ReturnType<typeof setInterval> | undefined;

    // Desktop (etapas lado a lado): ao aparecer, a linha avança etapa por etapa, uma vez.
    if (desktop) {
      const io = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          io.disconnect();
          if (reduced) {
            setActive(last);
            return;
          }
          let i = 0;
          timer = setInterval(() => {
            i += 1;
            setActive(i);
            if (i >= last && timer) clearInterval(timer);
          }, 300);
        },
        { rootMargin: "0px 0px -30% 0px" }
      );
      if (items[0]?.parentElement) io.observe(items[0].parentElement);
      return () => {
        io.disconnect();
        if (timer) clearInterval(timer);
      };
    }

    // Celular (etapas empilhadas): a etapa que cruza a faixa central da tela fica em destaque.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="como-funciona" className="py-12 md:py-20 bg-bg">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <p className="eyebrow reveal font-body text-sm font-bold uppercase tracking-widest mb-3">
            Como funciona
          </p>
          <h2
            className="reveal font-display font-extrabold leading-tight delay-100"
            style={{ fontSize: "var(--text-h2)", color: "var(--color-text)" }}
          >
            Sua jornada de{" "}
            <span style={{ color: "#FF6820" }}>90 dias</span>{" "}
            para o inglês profissional.
          </h2>
          <p className="reveal font-body text-lg mt-4 delay-200" style={{ color: "rgba(245,246,241,0.65)" }}>
            Cinco etapas, do diagnóstico ao resultado medido.
          </p>
        </div>

        {/* Timeline */}
        <ol className="relative grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
          {/* Linha de conexão (desktop): trilho neutro + progresso até a etapa em leitura (250ms) */}
          <div aria-hidden className="hidden md:block absolute left-[10%] right-[10%] top-7 h-px" style={{ backgroundColor: "var(--color-border)" }}>
            <div
              className="h-full origin-left"
              style={{
                backgroundColor: "#FF6820",
                transform: `scaleX(${active / (steps.length - 1)})`,
                transition: "transform 250ms var(--ease-enter)",
              }}
            />
          </div>
          {steps.map((step, i) => (
            <li
              key={step.number}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              data-step={i}
              aria-current={i === active ? "step" : undefined}
              className="reveal relative flex md:flex-col items-start md:items-center gap-4 md:gap-0 md:text-center rounded-2xl p-5 md:p-6"
              style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", transitionDelay: `${Math.min(i * 40, 120)}ms` }}
            >
              <span
                className="relative z-10 flex-shrink-0 w-11 h-11 md:w-12 md:h-12 md:-mt-1 md:mb-5 rounded-full flex items-center justify-center font-display font-black text-sm"
                style={{
                  backgroundColor: i <= active ? "#FF6820" : "var(--color-interactive)",
                  color: i <= active ? "var(--color-on-brand)" : "var(--color-text)",
                  transition: "background-color 180ms ease-out, color 180ms ease-out",
                }}
              >
                {step.number}
              </span>
              <div>
                <h3 className="font-display font-extrabold text-lg lg:text-xl mb-1.5" style={{ color: "var(--color-text)" }}>
                  {step.title}
                </h3>
                <p className="font-body text-base leading-6" style={{ color: "rgba(245,246,241,0.7)" }}>
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* CTA — o detalhe do plano sai da conversa, não da página */}
        <div className="mt-14 md:mt-16 text-center">
          <p className="font-body text-base mb-6" style={{ color: "rgba(245,246,241,0.65)" }}>
            O detalhe do seu plano sai do diagnóstico. Quer ver como fica o seu?
          </p>
          <a
            href={getWhatsAppUrlForContext("journey")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick("journey")}
            className="inline-flex items-center gap-3 font-body font-bold text-base px-8 py-4 rounded-full text-white cta-primary">
            Quero começar
          </a>
          {/* Arquitetura §5: rota de aprofundamento antes da decisão */}
          <div className="mt-5">
            <Link
              href="/metodo"
              className="font-body text-sm font-semibold underline underline-offset-4"
              style={{ color: "rgba(245,246,241,0.65)" }}
            >
              Ver o método completo →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
