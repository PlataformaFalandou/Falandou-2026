"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CEFRTooltip from "@/components/ui/CEFRTooltip";

const gaps = [
  { icon: "📱", label: "Apps", flaw: "ensinam vocabulário, não conversação profissional" },
  { icon: "👥", label: "Cursos em grupo", flaw: "não acompanham o seu ritmo" },
  { icon: "🎧", label: "Vídeos gravados", flaw: "não desenvolvem fala ativa" },
];

export default function MetodoTeaser() {
  return (
    <section className="py-20 md:py-28 bg-white border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left: frustração validada */}
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
              className="reveal font-body text-base leading-relaxed mb-8 delay-150"
              style={{ color: "rgba(22,22,22,0.6)" }}
            >
              Apps ensinam vocabulário. Cursos em grupo não acompanham seu ritmo.
              Vídeos gravados não desenvolvem fala. Se você tentou e não avançou,
              o problema provavelmente é o formato — não você.
            </p>

            <div className="reveal space-y-3 mb-10 delay-200">
              {gaps.map((g) => (
                <div
                  key={g.label}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background: "#F5F6F1" }}
                >
                  <span className="text-xl">{g.icon}</span>
                  <span className="font-body text-sm" style={{ color: "#161616" }}>
                    <strong>{g.label}</strong>{" "}
                    <span style={{ color: "rgba(22,22,22,0.55)" }}>{g.flaw}</span>
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/metodo"
              className="reveal inline-flex items-center gap-2 font-body font-bold text-base transition-all duration-200 hover:gap-3 delay-250"
              style={{ color: "#FF6820" }}
            >
              Ver como a Falandou faz diferente
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Right: o diferencial em resumo */}
          <div className="reveal delay-300">
            <div
              className="rounded-2xl p-8 md:p-10"
              style={{ background: "#161616" }}
            >
              <p
                className="font-body text-xs font-bold uppercase tracking-widest mb-6"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                A Falandou faz diferente
              </p>
              {([
                "Plano individual — nenhum profissional faz o mesmo plano.",
                "Inglês do seu contexto — vocabulário do seu setor.",
                "Sessões 1 a 1 — 100% do tempo de cada sessão é seu.",
                <>Resultado em número — exame <CEFRTooltip /> antes e depois.</>,
              ] as React.ReactNode[]).map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 py-4 border-b last:border-0"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black mt-0.5"
                    style={{ background: "#FF6820", color: "white" }}
                  >
                    ✓
                  </span>
                  <p className="font-body text-sm text-white leading-snug">{item}</p>
                </div>
              ))}

              <Link
                href="/metodo"
                className="mt-8 inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: "#FF6820", color: "white" }}
              >
                Entender o método completo
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
