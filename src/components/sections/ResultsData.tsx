"use client";

import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackCTAClick } from "@/lib/analytics";

// ─── dados editáveis ──────────────────────────────────────────────────────────
// Troque pelos seus números reais quando tiver o ciclo fechado.
const CYCLE_LABEL = "Último ciclo · Jan–Set 2024"; // ex.: "Jan–Set 2024"
const TOTAL_ALUNOS = 87; // alunos avaliados no ciclo

const BARS = [
  { label: "2+ níveis",   pct: 18, sublabel: "ex.: A2 → B2" },
  { label: "1 nível",     pct: 61, sublabel: "ex.: B1 → B2" },
  { label: "Manteve",     pct: 17, sublabel: "consolidação" },
  { label: "Sem medição", pct:  4, sublabel: "desistência"  },
];

const DESTAQUES = [
  { valor: "79%",        desc: "passaram a usar inglês no trabalho após o ciclo" },
  { valor: "11 semanas", desc: "tempo médio para ganhar fluência operacional"   },
  { valor: "4,9 ★",      desc: "avaliação média dos alunos no ciclo"       },
  { valor: "92%",        desc: "concluíram o plano sem abandonar"           },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function ResultsData() {
  const evolved = BARS[0].pct + BARS[1].pct; // % que subiram pelo menos 1 nível

  return (
    <section
      className="py-20"
      style={{ background: "#F5F6F1" }}
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* cabeçalho */}
        <div className="mb-12">
          <p className="font-body text-xs font-semibold uppercase tracking-widest mb-3"
             style={{ color: "#FF6820" }}>
            Resultado verificável
          </p>
          <h2 className="font-heading font-black text-3xl md:text-4xl leading-tight mb-3"
              style={{ color: "#161616" }}>
            {evolved}% dos alunos passou a conduzir reuniões,<br className="hidden md:block" /> entrevistas e negociações em inglês em até 90 dias.
          </h2>
          <p className="font-body text-sm text-gray-500">
            {CYCLE_LABEL} · {TOTAL_ALUNOS} alunos avaliados com exame pré e pós-ciclo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* gráfico de barras horizontais */}
          <div className="space-y-5">
            {BARS.map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-body text-sm font-semibold" style={{ color: "#161616" }}>
                    {bar.label}
                  </span>
                  <span className="font-body text-xs text-gray-400">
                    {bar.sublabel} · {bar.pct}%
                  </span>
                </div>
                <div className="h-3 w-full rounded-full" style={{ background: "rgba(0,0,0,0.08)" }}>
                  <div
                    className="h-3 rounded-full transition-all duration-700"
                    style={{
                      width: `${bar.pct}%`,
                      background:
                        bar.label === "Sem medição"
                          ? "rgba(0,0,0,0.18)"
                          : bar.label === "Manteve"
                          ? "rgba(0,0,0,0.30)"
                          : "#FF6820",
                      opacity: bar.label === "2+ níveis" ? 1 : bar.label === "1 nível" ? 0.75 : 1,
                    }}
                  />
                </div>
              </div>
            ))}
            <p className="font-body text-xs text-gray-400 pt-1">
              Evolução medida por exame CEFR aplicado pela escola antes e após o ciclo de aulas.
            </p>
          </div>

          {/* destaques numéricos */}
          <div className="grid grid-cols-2 gap-5">
            {DESTAQUES.map((d) => (
              <div
                key={d.desc}
                className="rounded-2xl p-5"
                style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)" }}
              >
                <p
                  className="font-heading font-black text-2xl mb-1"
                  style={{ color: "#FF6820" }}
                >
                  {d.valor}
                </p>
                <p className="font-body text-xs text-gray-500 leading-snug">{d.desc}</p>
              </div>
            ))}
          </div>

        </div>

        {/* CTA — resultado medido, momento de alta persuasão */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={getWhatsAppUrl("hero")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick("results")}
            className="inline-flex items-center gap-3 font-body font-bold text-base px-8 py-4 rounded-full text-white transition-all duration-300 hover:opacity-90 hover:scale-105"
            style={{ backgroundColor: "#FF6820" }}
          >
            Quero começar
          </a>
          <a
            href="#faq"
            className="font-body text-sm font-semibold underline underline-offset-4 transition-colors duration-200"
            style={{ color: "rgba(22,22,22,0.5)" }}
          >
            Ainda tenho dúvidas →
          </a>
        </div>
      </div>
    </section>
  );
}
