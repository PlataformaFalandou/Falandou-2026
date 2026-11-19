import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "O Método | Falandou — Inglês Profissional",
  description:
    "Por que apps e cursos em grupo não funcionam para profissionais que precisam de inglês no trabalho — e o que a Falandou faz diferente.",
};

// ── Frustrações que nomeiam a experiência vivida ──────────────────────────────
const frustrations = [
  {
    icon: "📱",
    label: "Apps de idioma",
    problem:
      "Ensinam vocabulário isolado. Você aprende 'apple' e 'umbrella', mas não sabe como pedir adiamento de prazo numa reunião com o cliente americano.",
    missing: "Falta contexto profissional",
  },
  {
    icon: "👥",
    label: "Cursos em grupo",
    problem:
      "O professor divide o tempo entre 15 alunos. Você aprende no ritmo do mais lento e repete o que já sabe — ou fica para trás quando o grupo avança.",
    missing: "Falta ritmo individual",
  },
  {
    icon: "🎧",
    label: "Cursos gravados",
    problem:
      "Assistir aulas passivamente não desenvolve fala. Você absorve teoria, mas na hora da reunião trava — porque speaking precisa de prática real, não passiva.",
    missing: "Falta prática ativa",
  },
  {
    icon: "📚",
    label: "Livros e gramática",
    problem:
      "Estudar regras gramaticais não produz fluência. O cérebro não ativa inglês em tempo real acessando regras — ativa por padrão e exposição repetida ao uso.",
    missing: "Falta ativação real",
  },
];

// ── Os 5 passos do método ─────────────────────────────────────────────────────
const steps = [
  {
    num: "01",
    title: "Exame CEFR",
    sub: "Diagnóstico técnico sem achismo",
    body: "Antes de qualquer aula, você faz um exame completo nas quatro habilidades — reading, listening, speaking e writing. O resultado posiciona você no padrão europeu CEFR (A1 a C2) com precisão. É a base de tudo: sem isso, qualquer plano é chute.",
    tag: "Diagnóstico",
  },
  {
    num: "02",
    title: "Plano de 90 dias",
    sub: "Montado para o seu objetivo, não para um público genérico",
    body: "Com os resultados do exame, os professores montam seu plano semana a semana. O vocabulário é do seu setor. As situações são do seu trabalho. Se você é engenheiro, treinamos engenharia. Se é gestor, treinamos reuniões e apresentações executivas.",
    tag: "Estratégia",
  },
  {
    num: "03",
    title: "Prática semanal guiada",
    sub: "Atividades que imitam o uso real",
    body: "Cada semana tem exercícios direcionados ao seu plano — não banco de questões genéricas. Situações reais, vocabulário ativo, estruturas que você vai usar. A prática é projetada para ativar o inglês, não apenas reconhecê-lo.",
    tag: "Prática",
  },
  {
    num: "04",
    title: "Sessões individuais",
    sub: "100% do tempo de aula é seu",
    body: "Sem dividir atenção com outros alunos. O professor conhece seu plano, seu nível, seu objetivo. O acompanhamento pelo WhatsApp é contínuo durante a semana — dúvida na segunda, resposta na segunda. Não na próxima aula.",
    tag: "Acompanhamento",
  },
  {
    num: "05",
    title: "Exame final e próximo ciclo",
    sub: "Resultado em número, não em sensação",
    body: "Ao final dos 90 dias você refaz o exame CEFR. Comparamos com o ponto de partida — você vê exatamente quanto subiu. 79% dos alunos sobem pelo menos 1 nível. Se quiser continuar, o próximo plano começa do novo patamar.",
    tag: "Resultado",
  },
];

// ── Diferenciais ──────────────────────────────────────────────────────────────
const differentials = [
  { label: "Plano individual", detail: "Nenhum aluno faz o mesmo plano que outro." },
  { label: "Contexto profissional", detail: "Vocabulário e situações do seu setor, não inglês genérico." },
  { label: "Resultado medido", detail: "Exame CEFR antes e depois. Número, não percepção." },
  { label: "Suporte contínuo", detail: "WhatsApp ativo durante toda a semana — não só no horário da aula." },
  { label: "Sem grupo", detail: "100% do tempo de cada sessão é dedicado a você." },
  { label: "90 dias de ciclo", detail: "Tempo suficiente para resultado real, curto o suficiente para manter foco." },
];

export default function MetodoPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO: validação da frustração ── */}
        <section
          className="pt-40 pb-24 md:pt-52 md:pb-32"
          style={{ backgroundColor: "#161616" }}
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p
              className="font-body text-sm font-bold uppercase tracking-widest mb-6"
              style={{ color: "#FF6820" }}
            >
              Por que o inglês não avançou até agora
            </p>
            <h1
              className="font-display font-extrabold text-white leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Você não travou por falta{" "}
              <span style={{ color: "#FF6820" }}>de esforço.</span>
            </h1>
            <p
              className="font-body text-lg leading-relaxed max-w-2xl mx-auto"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Apps ensinam vocabulário. Cursos em grupo não acompanham seu ritmo.
              Vídeos gravados não desenvolvem fala. Se você tentou e não avançou,
              o problema provavelmente não é você — é o formato.
            </p>
          </div>
        </section>

        {/* ── FRUSTRAÇÕES: nomear o problema sem atacar ninguém ── */}
        <section className="py-24 md:py-32" style={{ backgroundColor: "#F5F6F1" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p
                className="font-body text-sm font-bold uppercase tracking-widest mb-4"
                style={{ color: "#FF6820" }}
              >
                O que não funciona — e por quê
              </p>
              <h2
                className="font-display font-extrabold leading-tight"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", color: "#161616" }}
              >
                Cada formato tem uma limitação real.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {frustrations.map((f) => (
                <div
                  key={f.label}
                  className="rounded-2xl p-8 bg-white"
                  style={{ border: "1px solid rgba(0,0,0,0.07)" }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl flex-shrink-0 mt-0.5">{f.icon}</span>
                    <div>
                      <p
                        className="font-display font-extrabold text-lg mb-2"
                        style={{ color: "#161616" }}
                      >
                        {f.label}
                      </p>
                      <p
                        className="font-body text-sm leading-relaxed mb-4"
                        style={{ color: "rgba(22,22,22,0.6)" }}
                      >
                        {f.problem}
                      </p>
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                        style={{ background: "rgba(22,22,22,0.07)", color: "rgba(22,22,22,0.55)" }}
                      >
                        ↳ {f.missing}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bridge sentence */}
            <div className="mt-14 max-w-2xl mx-auto text-center">
              <p
                className="font-display font-extrabold text-2xl md:text-3xl leading-tight"
                style={{ color: "#161616" }}
              >
                A Falandou foi construída para resolver exatamente o que falta em cada um desses formatos.
              </p>
            </div>
          </div>
        </section>

        {/* ── MÉTODO: os 5 passos ── */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <p
                className="font-body text-sm font-bold uppercase tracking-widest mb-4"
                style={{ color: "#FF6820" }}
              >
                Como funciona
              </p>
              <h2
                className="font-display font-extrabold leading-tight"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", color: "#161616" }}
              >
                O ciclo de 90 dias — do diagnóstico ao resultado medido.
              </h2>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px hidden md:block"
                style={{ background: "rgba(0,0,0,0.08)", transform: "translateX(-50%)" }}
              />

              <div className="space-y-12">
                {steps.map((step, i) => (
                  <div
                    key={step.num}
                    className={`relative flex flex-col md:flex-row gap-8 items-start ${
                      i % 2 === 1 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Content */}
                    <div className="flex-1 md:max-w-[45%]">
                      <div
                        className="rounded-2xl p-8"
                        style={{ background: "#F5F6F1", border: "1px solid rgba(0,0,0,0.06)" }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <span
                            className="inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                            style={{ background: "rgba(255,104,32,0.12)", color: "#FF6820" }}
                          >
                            {step.tag}
                          </span>
                        </div>
                        <div
                          className="font-display font-black text-5xl mb-3"
                          style={{ color: "rgba(0,0,0,0.08)" }}
                        >
                          {step.num}
                        </div>
                        <h3
                          className="font-display font-extrabold text-xl mb-1"
                          style={{ color: "#161616" }}
                        >
                          {step.title}
                        </h3>
                        <p
                          className="font-body text-sm font-semibold mb-3"
                          style={{ color: "#FF6820" }}
                        >
                          {step.sub}
                        </p>
                        <p
                          className="font-body text-sm leading-relaxed"
                          style={{ color: "rgba(22,22,22,0.65)" }}
                        >
                          {step.body}
                        </p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden md:flex flex-shrink-0 w-5 h-5 rounded-full border-2 self-center z-10"
                      style={{ borderColor: "#FF6820", background: "white" }}
                    />

                    {/* Spacer */}
                    <div className="flex-1 md:max-w-[45%]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── DIFERENCIAIS: tabela clara ── */}
        <section className="py-24 md:py-32" style={{ backgroundColor: "#161616" }}>
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-14">
              <p
                className="font-body text-sm font-bold uppercase tracking-widest mb-4"
                style={{ color: "#FF6820" }}
              >
                Em resumo
              </p>
              <h2
                className="font-display font-extrabold text-white leading-tight"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)" }}
              >
                O que torna o método diferente.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {differentials.map((d) => (
                <div
                  key={d.label}
                  className="flex items-start gap-4 rounded-2xl p-6"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black mt-0.5"
                    style={{ background: "#FF6820", color: "white" }}
                  >
                    ✓
                  </span>
                  <div>
                    <p className="font-display font-bold text-white mb-1">{d.label}</p>
                    <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{d.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA final ── */}
        <section className="py-24 md:py-32" style={{ backgroundColor: "#FF6820" }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2
              className="font-display font-extrabold text-white leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Pronto para testar o método?
            </h2>
            <p
              className="font-body text-lg mb-10"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              A consulta inicial é gratuita. Você conversa com a equipe, entende o plano e decide sem pressão.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={getWhatsAppUrlForContext("metodo")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-5 rounded-full text-base font-bold transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ backgroundColor: "#161616", color: "white" }}
              >
                Quero começar
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-5 rounded-full text-base font-semibold transition-all duration-200 hover:scale-105"
                style={{ background: "rgba(255,255,255,0.2)", color: "white", border: "1px solid rgba(255,255,255,0.4)" }}
              >
                Ver a página principal
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
