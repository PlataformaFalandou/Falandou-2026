import type { Metadata } from "next";
import { STATS } from "@/data/stats";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CTASection from "@/components/sections/CTASection";
import LeadMagnetCompact from "@/components/sections/LeadMagnetCompact";
import ScrollRevealInit from "@/components/ui/ScrollRevealInit";
import { TeacherCard, YouTubeLink } from "@/components/sections/Teachers";
import { teachers } from "@/lib/teachers";

export const metadata: Metadata = {
  title: "Professores | Falandou — Inglês Profissional",
  description:
    "Conheça os professores da Falandou: formação e certificações verificáveis (Cambridge, CELTA, DELTA, IELTS, TOEFL). O professor de cada profissional é escolhido pelo diagnóstico CEFR.",
  alternates: {
    canonical: "/professores/",
  },
  openGraph: {
    title: "Professores | Falandou",
    description:
      "Formação e certificações verificáveis. Seu professor é escolhido pelo diagnóstico CEFR e pelo seu objetivo profissional.",
    url: "/professores/",
  },
};

// Como a escola atribui o professor — mesmo processo descrito em /metodo.
const assignment = [
  {
    num: "01",
    title: "Diagnóstico CEFR",
    body: "O exame inicial mostra seu nível nas quatro habilidades — reading, listening, speaking e writing.",
  },
  {
    num: "02",
    title: "Objetivo do ciclo",
    body: "Entrevista, reuniões, apresentações, escrita: o objetivo define o tipo de prática que você precisa.",
  },
  {
    num: "03",
    title: "Professor com foco no seu nível",
    body: "A escola indica o professor cuja faixa de nível e especialidade combinam com o seu diagnóstico.",
  },
];

export default function ProfessoresPage() {
  return (
    <>
      <ScrollRevealInit />
      <Navbar />
      <main id="conteudo">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="pt-40 pb-20 md:pt-52 md:pb-24" style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-3xl">
              <p
                className="reveal font-body text-sm font-bold uppercase tracking-widest mb-6"
                style={{ color: "#FF6820" }}
              >
                Professores
              </p>
              <h1
                className="reveal font-display font-extrabold text-white leading-tight mb-6 delay-100"
                style={{ fontSize: "var(--text-h1)" }}
              >
                Quem ensina na Falandou —{" "}
                <span style={{ color: "#FF6820" }}>e com quais credenciais.</span>
              </h1>
              <p
                className="reveal font-body text-lg leading-relaxed delay-150"
                style={{ color: "rgba(255,255,255,0.6)", maxWidth: "580px" }}
              >
                Formação e certificações verificáveis, não títulos genéricos. Você não escolhe
                o professor no escuro: a escola indica quem combina com o seu diagnóstico CEFR
                e com o seu objetivo.
              </p>
              <YouTubeLink className="reveal mt-8 delay-200" />
            </div>
          </div>
        </section>

        {/* ── PROFESSORES ──────────────────────────────────────────────────── */}
        <section className="pb-24 md:pb-32" style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="max-w-6xl mx-auto px-6">
            {/* UX/UI §13: a página reforça o método, não a pessoa */}
            <h2 className="reveal font-display font-extrabold text-white leading-tight mb-10" style={{ fontSize: "var(--text-h2)" }}>
              Nossos professores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teachers.map((t) => (
                <TeacherCard key={t.name} t={t} />
              ))}
            </div>

            {/* Método em destaque, logo abaixo dos cartões */}
            <div
              className="reveal mt-10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-10"
              style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", borderLeft: "4px solid #FF6820" }}
            >
              <p className="flex-1 text-base md:text-lg leading-relaxed text-white">
                Todos os professores da Falandou seguem o método da escola e acompanham a evolução CEFR de cada
                aluno individualmente, do exame inicial ao exame final do ciclo.
              </p>
              <p className="text-sm font-semibold tnum md:text-right flex-shrink-0" style={{ color: "var(--color-text-muted)" }}>
                <span className="text-white">{STATS.formed}</span> profissionais formados pela escola
                <br />
                <span className="text-white">{STATS.yearsOperating} anos</span> de operação
              </p>
            </div>
          </div>
        </section>

        {/* ── COMO O PROFESSOR É ESCOLHIDO ─────────────────────────────────── */}
        <section className="py-24 md:py-32" style={{ backgroundColor: "var(--color-bg-alt)" }}>
          <div className="max-w-6xl mx-auto px-6">
            <p
              className="reveal font-body text-sm font-bold uppercase tracking-widest mb-4"
              style={{ color: "#FF6820" }}
            >
              Como o professor é escolhido
            </p>
            <h2
              className="reveal font-display font-extrabold leading-tight mb-14 delay-100"
              style={{ fontSize: "var(--text-h2)", color: "var(--color-text)" }}
            >
              Pelo diagnóstico, não por sorteio de agenda.
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {assignment.map((s) => (
                <div key={s.num} className="reveal rounded-2xl p-8 bg-surface border border-white/10">
                  <span className="font-display font-black text-sm" style={{ color: "#FF6820" }}>
                    {s.num}
                  </span>
                  <h3 className="font-display font-extrabold text-[length:var(--text-h3)] mt-3 mb-2" style={{ color: "var(--color-text)" }}>
                    {s.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(245,246,241,0.7)" }}>
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA (componente reutilizável — Arquitetura §4) ── */}
        <CTASection
          heading="Comece pelo diagnóstico."
          text="Conte o seu objetivo e o seu setor. A partir disso, a escola monta o seu plano e indica o professor."
          whatsappContext="professores"
          secondary={{ href: "/metodo", label: "Ver o método completo" }}
        />
        <LeadMagnetCompact />
      </main>
      <Footer />
    </>
  );
}
