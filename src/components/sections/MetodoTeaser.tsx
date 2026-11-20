"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CEFRTooltip from "@/components/ui/CEFRTooltip";

// Copywriting §5 — benefícios, não features: cada item diz o que muda para o aluno.
const BENEFITS: { title: string; body: React.ReactNode }[] = [
  {
    title: "Plano individual",
    body: "Você não perde tempo com o que já sabe — o plano começa onde você parou.",
  },
  {
    title: "Inglês do seu contexto",
    body: "Desde a primeira semana, as sessões tratam do que você realmente encontra no trabalho.",
  },
  {
    title: "Sessões 1 a 1",
    body: "Sem esperar a turma, sem adaptar. Cada sessão avança exatamente o que você precisa.",
  },
  {
    title: "Resultado em número",
    body: (
      <>
        Você sai com um nível <CEFRTooltip /> — não com uma sensação. E pode mostrar isso num
        processo seletivo.
      </>
    ),
  },
];

/**
 * MetodoTeaser — na home, só o gancho da narrativa de comparação (atos 1 + 2,
 * Copywriting §9). O ato 3 ("o que é diferente") é desenvolvido em /metodo.
 */
export default function MetodoTeaser() {
  return (
    <section className="py-20 md:py-28 bg-white border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left: gancho — você tentou + por que não funcionou */}
          <div>
            <p
              className="reveal font-body text-sm font-bold uppercase tracking-widest mb-4"
              style={{ color: "#FF6820" }}
            >
              Por que o inglês não avançou
            </p>
            <h2
              className="reveal font-display font-extrabold leading-tight mb-6 delay-100"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)", color: "#161616" }}
            >
              Você não travou por falta de esforço.
            </h2>
            <p
              className="reveal font-body text-lg leading-relaxed mb-8 delay-150"
              style={{ color: "rgba(22,22,22,0.65)", maxWidth: "520px" }}
            >
              Você já tentou aplicativo, aula em grupo e vídeo no YouTube — e na hora do meeting o
              tranco voltou. Nenhum desses formatos foi feito para o inglês do seu trabalho.
            </p>

            <Link
              href="/metodo"
              className="reveal inline-flex items-center gap-2 font-body font-bold text-base transition-all duration-200 hover:gap-3 delay-200"
              style={{ color: "#FF6820" }}
            >
              Ver como a Falandou faz diferente
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Right: o diferencial em benefícios */}
          <div className="reveal delay-300">
            <div
              className="rounded-2xl p-8 md:p-10"
              style={{ background: "#161616" }}
            >
              <p
                className="font-body text-xs font-bold uppercase tracking-widest mb-6"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                O que muda para você
              </p>
              {BENEFITS.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 py-4 border-b last:border-0"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black mt-0.5"
                    style={{ background: "#FF6820", color: "white" }}
                  >
                    ✓
                  </span>
                  <p className="font-body text-sm leading-snug" style={{ color: "rgba(255,255,255,0.75)" }}>
                    <strong className="text-white">{item.title}.</strong> {item.body}
                  </p>
                </div>
              ))}

              <Link
                href="/metodo"
                className="mt-8 inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: "#FF6820", color: "white" }}
              >
                Como funciona o meu plano?
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
