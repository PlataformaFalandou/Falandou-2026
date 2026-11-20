import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CompanyLogos from "@/components/sections/CompanyLogos";
import CTASection from "@/components/sections/CTASection";
import ScrollRevealInit from "@/components/ui/ScrollRevealInit";
import LeadMagnetCompact from "@/components/sections/LeadMagnetCompact";
import { YOUTUBE_CHANNEL_URL } from "@/lib/teachers";
import { STATS } from "@/data/stats";

export const metadata: Metadata = {
  title: "Sobre a Falandou | Escola de Inglês Profissional",
  description:
    "A Falandou é uma escola de inglês profissional: 600+ profissionais formados, 7+ anos de operação, plano individual, sessões 1 a 1 e exame CEFR antes e depois de cada ciclo.",
  alternates: { canonical: "https://2026.falandou.com/sobre" },
  openGraph: {
    title: "Sobre a Falandou",
    description: "Escola de inglês profissional — plano individual, sessões 1 a 1 e resultado medido em CEFR.",
    url: "https://2026.falandou.com/sobre",
  },
};

// Ponto 57 — história e credenciais institucionais (escola, não pessoa).
// Só fatos já publicados no site; atualizar aqui quando os números mudarem.
const NUMBERS = [
  { value: STATS.formed, label: "profissionais formados" },
  { value: `${STATS.yearsOperating}+`, label: "anos de operação" },
  { value: STATS.rating, label: "avaliação média dos profissionais" },
  { value: STATS.cefrUpPct, label: `sobem 1 nível CEFR ou mais em ${STATS.cycleDays} dias` },
];

const PRINCIPLES = [
  {
    title: "Diagnóstico antes do plano",
    body: "Ninguém começa no escuro. O exame CEFR mostra onde você está nas quatro habilidades, e o plano parte daí — não de um livro igual para todos.",
  },
  {
    title: "O inglês do seu trabalho",
    body: "Vocabulário do seu setor, situações da sua rotina: reuniões, e-mails, apresentações, entrevistas. Inglês que você usa na semana seguinte.",
  },
  {
    title: "Atenção individual",
    body: "Sessões 1 a 1 com professor fixo e acompanhamento pelo WhatsApp entre as sessões. Nenhum profissional faz o mesmo plano que outro.",
  },
  {
    title: "Resultado em número",
    body: "Ao fim de cada ciclo de 90 dias, o exame é refeito no mesmo formato. Você vê quanto evoluiu — e nós também, ciclo após ciclo.",
  },
];

export default function SobrePage() {
  return (
    <>
      <ScrollRevealInit />
      <Navbar />
      <main>
        {/* ── HERO / MISSÃO ────────────────────────────────────────────────── */}
        <section className="pt-40 pb-24 md:pt-52 md:pb-32" style={{ backgroundColor: "#161616" }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="max-w-3xl">
              <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-6" style={{ color: "#FF6820" }}>
                Sobre a Falandou
              </p>
              <h1
                className="reveal font-display font-extrabold text-white leading-tight mb-6 delay-100"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)" }}
              >
                Uma escola de inglês para{" "}
                <span style={{ color: "#FF6820" }}>quem precisa usar o inglês no trabalho.</span>
              </h1>
              <p
                className="reveal font-body text-lg leading-relaxed delay-150"
                style={{ color: "rgba(255,255,255,0.6)", maxWidth: "600px" }}
              >
                A Falandou existe para um problema específico: profissionais que sabem inglês, mas
                travam na hora de usar — numa reunião, numa entrevista, numa apresentação. A nossa
                missão é transformar esse inglês travado em resultado profissional mensurável.
              </p>
            </div>
          </div>
        </section>

        {/* ── NÚMEROS ──────────────────────────────────────────────────────── */}
        <section className="border-y border-white/10" style={{ backgroundColor: "#161616" }}>
          <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {NUMBERS.map((n) => (
              <div key={n.label} className="text-center">
                <p className="font-display font-extrabold text-4xl text-white">{n.value}</p>
                <p className="font-body text-sm mt-2" style={{ color: "rgba(255,255,255,0.55)" }}>{n.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Arquitetura §4: logos das empresas dos profissionais (Home + /sobre + /planos) */}
        <CompanyLogos />

        {/* ── FILOSOFIA ────────────────────────────────────────────────────── */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
              Como pensamos o ensino
            </p>
            <h2
              className="reveal font-display font-extrabold leading-tight mb-14 delay-100"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", color: "#161616" }}
            >
              Quatro princípios que guiam cada ciclo.
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {PRINCIPLES.map((p, i) => (
                <div key={p.title} className="reveal rounded-2xl p-8" style={{ backgroundColor: "#F5F6F1" }}>
                  <span className="font-display font-black text-sm" style={{ color: "#FF6820" }}>0{i + 1}</span>
                  <h3 className="font-display font-extrabold text-lg mt-3 mb-2" style={{ color: "#161616" }}>{p.title}</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(22,22,22,0.6)" }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── QUEM FAZ A ESCOLA ────────────────────────────────────────────── */}
        <section className="py-24 md:py-32" style={{ backgroundColor: "#F5F6F1" }}>
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
                Quem faz a escola
              </p>
              <h2
                className="reveal font-display font-extrabold leading-tight mb-6 delay-100"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#161616" }}
              >
                Professores com formação e certificação verificáveis.
              </h2>
              <p className="reveal font-body text-base leading-relaxed mb-6" style={{ color: "rgba(22,22,22,0.65)" }}>
                A equipe reúne formação em linguística e pedagogia e certificações como Cambridge,
                CELTA e DELTA. Cada profissional é atribuído a um professor pelo diagnóstico CEFR e
                pelo objetivo do ciclo.
              </p>
              <Link
                href="/professores"
                className="reveal inline-flex font-body font-bold text-base underline underline-offset-4"
                style={{ color: "#FF6820" }}
              >
                Conhecer os professores →
              </Link>
            </div>
            <div className="reveal rounded-2xl p-8 bg-white border border-black/5">
              <p className="font-body text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(22,22,22,0.45)" }}>
                Veja como ensinamos
              </p>
              <p className="font-body text-base leading-relaxed mb-6" style={{ color: "rgba(22,22,22,0.7)" }}>
                Antes de qualquer conversa, você pode ver o nosso jeito de ensinar no canal da
                escola e no blog — de graça e sem cadastro.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body font-semibold text-sm underline underline-offset-4"
                  style={{ color: "#161616" }}
                >
                  Canal @falandou no YouTube →
                </a>
                <Link href="/blog" className="font-body font-semibold text-sm underline underline-offset-4" style={{ color: "#161616" }}>
                  Blog Falandou →
                </Link>
                <Link href="/resultados" className="font-body font-semibold text-sm underline underline-offset-4" style={{ color: "#161616" }}>
                  Resultados e metodologia →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA (componente reutilizável — Arquitetura §4) ── */}
        <CTASection
          heading="Conheça a escola por dentro."
          text="A conversa inicial é gratuita: você entende o ciclo, tira dúvidas e decide sem pressão."
          whatsappContext="sobre"
          secondary={{ href: "/metodo", label: "Ver o método" }}
        />

        <LeadMagnetCompact />
      </main>
      <Footer />
    </>
  );
}
