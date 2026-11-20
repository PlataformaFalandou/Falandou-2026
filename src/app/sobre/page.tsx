import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CompanyLogos from "@/components/sections/CompanyLogos";
import ScrollRevealInit from "@/components/ui/ScrollRevealInit";
import LeadMagnetCompact from "@/components/sections/LeadMagnetCompact";
import { YOUTUBE_CHANNEL_URL } from "@/lib/teachers";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";
import { STATS } from "@/data/stats";
import { STUDENTS_PER_TEACHER } from "@/data/plans";

export const metadata: Metadata = {
  title: "Sobre a Falandou: Escola de Inglês Profissional",
  description:
    "Sobre a Falandou: escola de inglês para profissionais, com sessões 1 a 1, até 25 profissionais por professor e exame CEFR no início e no fim de cada ciclo.",
  alternates: { canonical: "/sobre/" },
  openGraph: {
    title: "Sobre a Falandou",
    description: "Escola de inglês profissional — plano individual, sessões 1 a 1 e resultado medido em CEFR.",
    url: "/sobre/",
  },
};

// Copywriting §3 — /sobre em 5 blocos: abertura · diferenciais · números ·
// professores · CTA institucional (para /metodo, não comercial).
// Tom sóbrio: sem exclamações, sem promessa. Só fatos já publicados no site.
// Posicionamento e Oferta §1 — diferencial como mecanismo causal, não como lista:
// o que é + por que muda o resultado.
const DIFFERENTIATORS = [
  {
    title: "Sessões 100% 1 a 1",
    what: "Um professor, um profissional. Sem turma, sem grupo, sem exceção.",
    why: "O professor aprende o seu jeito de travar — e trabalha exatamente isso.",
  },
  {
    title: "Ciclo de 90 dias",
    what: "Prazo definido, com começo, meio e fim.",
    why: "Você sabe o que vai conseguir antes de começar.",
  },
  {
    title: "Exame CEFR antes e depois",
    what: "O mesmo exame, nas quatro habilidades, no início e no fim.",
    why: "O resultado aparece em número — não em sensação.",
  },
  {
    title: "Plano do seu contexto",
    what: "Vocabulário do seu setor, situações do seu cargo.",
    why: "O que você pratica é o que você vai usar na semana seguinte.",
  },
];

const NUMBERS = [
  { value: STATS.formed, label: "profissionais formados" },
  { value: STATS.cefrUpPct, label: `sobem 1 nível CEFR ou mais em ${STATS.cycleDays} dias` },
  { value: STATS.rating, label: "avaliação média dos profissionais" },
  { value: `${STATS.b1b2Weeks} sem.`, label: "tempo médio de B1 para B2" },
];

export default function SobrePage() {
  return (
    <>
      <ScrollRevealInit />
      <Navbar />
      <main id="conteudo">
        {/* ── 1. ABERTURA ──────────────────────────────────────────────────── */}
        <section className="pt-40 pb-24 md:pt-52 md:pb-32" style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="max-w-3xl">
              <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-6" style={{ color: "#FF6820" }}>
                Sobre a Falandou
              </p>
              <h1
                className="reveal font-display font-extrabold text-white leading-tight mb-6 delay-100"
                style={{ fontSize: "var(--text-h1)" }}
              >
                Uma escola de inglês para{" "}
                <span style={{ color: "#FF6820" }}>quem precisa usar o inglês no trabalho.</span>
              </h1>
              <p
                className="reveal font-body text-lg leading-relaxed delay-150"
                style={{ color: "rgba(255,255,255,0.65)", maxWidth: "620px" }}
              >
                A Falandou nasceu de uma constatação: profissionais brasileiros passam anos estudando
                inglês e travam na hora que importa — na reunião, na entrevista, na apresentação. Há{" "}
                {STATS.yearsOperating} anos, a escola trabalha para transformar esse inglês travado em
                resultado medido.
              </p>
            </div>
          </div>
        </section>

        {/* ── 2. O QUE NOS TORNA DIFERENTES ────────────────────────────────── */}
        <section className="py-24 md:py-32 bg-surface">
          <div className="max-w-5xl mx-auto px-6">
            <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
              O que nos torna diferentes
            </p>
            <h2
              className="reveal font-display font-extrabold leading-tight mb-14 delay-100"
              style={{ fontSize: "var(--text-h2)", color: "var(--color-text)" }}
            >
              Por que o 1 a 1 muda o resultado.
            </h2>
            <p className="reveal font-body text-lg leading-relaxed mb-12 delay-150" style={{ color: "rgba(245,246,241,0.75)", maxWidth: "720px" }}>
              A maioria dos métodos fracassa porque foi feita para muitas pessoas ao mesmo tempo. A
              Falandou parte do contrário: um professor dedicado ao seu contexto, um plano feito para a
              sua semana, um ciclo de 90 dias com exame CEFR antes e depois. O resultado aparece em
              números — não em sensação.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {DIFFERENTIATORS.map((p, i) => (
                <div key={p.title} className="reveal rounded-2xl p-7 flex flex-col" style={{ backgroundColor: "var(--color-bg-alt)" }}>
                  <span className="font-display font-black text-sm" style={{ color: "#FF6820" }}>0{i + 1}</span>
                  <h3 className="font-display font-extrabold text-[length:var(--text-h3)] mt-3 mb-2" style={{ color: "var(--color-text)" }}>{p.title}</h3>
                  <p className="font-body text-sm leading-relaxed mb-4" style={{ color: "rgba(245,246,241,0.65)" }}>{p.what}</p>
                  <p className="font-body text-sm font-semibold leading-relaxed mt-auto" style={{ color: "var(--color-text)" }}>{p.why}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. OS NÚMEROS DA ESCOLA ──────────────────────────────────────── */}
        <section style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="max-w-5xl mx-auto px-6 py-16">
            <p className="font-body text-xs font-bold uppercase tracking-widest mb-8 text-center" style={{ color: "rgba(255,255,255,0.45)" }}>
              Os números da escola · ciclo {STATS.cycleLabel}, {STATS.evaluated} profissionais avaliados
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {NUMBERS.map((n) => (
                <div key={n.label} className="text-center">
                  <p className="font-display font-extrabold text-4xl text-white">{n.value}</p>
                  <p className="font-body text-sm mt-2" style={{ color: "rgba(255,255,255,0.55)" }}>{n.label}</p>
                </div>
              ))}
            </div>
            <p className="font-body text-sm mt-10 text-center">
              <Link href="/resultados" className="underline underline-offset-4 font-semibold" style={{ color: "#FF6820" }}>
                Como medimos esses resultados →
              </Link>
            </p>
          </div>
        </section>

        {/* Arquitetura §4: logos das empresas dos profissionais (Home + /sobre + /planos) */}
        <CompanyLogos />

        {/* ── 4. OS PROFESSORES ────────────────────────────────────────────── */}
        <section className="py-24 md:py-32" style={{ backgroundColor: "var(--color-bg-alt)" }}>
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
                Os professores
              </p>
              <h2
                className="reveal font-display font-extrabold leading-tight mb-6 delay-100"
                style={{ fontSize: "var(--text-h2)", color: "var(--color-text)" }}
              >
                Cada profissional é acompanhado por um professor fixo.
              </h2>
              <p className="reveal font-body text-base leading-relaxed mb-6" style={{ color: "rgba(245,246,241,0.75)" }}>
                A equipe reúne formação em linguística e pedagogia e certificações como Cambridge,
                CELTA e DELTA. O professor é escolhido pelo seu diagnóstico CEFR, pelo seu setor e
                pelo objetivo do ciclo — e acompanha no máximo {STUDENTS_PER_TEACHER} profissionais ao
                mesmo tempo, para que a atenção continue individual.
              </p>
              <Link
                href="/professores"
                className="reveal inline-flex font-body font-bold text-base underline underline-offset-4"
                style={{ color: "#FF6820" }}
              >
                Conhecer os professores →
              </Link>
            </div>
            <div className="reveal rounded-2xl p-8 bg-surface border border-white/10">
              <p className="font-body text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(245,246,241,0.55)" }}>
                Veja como ensinamos
              </p>
              <p className="font-body text-base leading-relaxed mb-6" style={{ color: "rgba(245,246,241,0.8)" }}>
                Antes de qualquer conversa, você pode ver o nosso jeito de ensinar no canal da
                escola e no blog — sem cadastro.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body font-semibold text-sm underline underline-offset-4"
                  style={{ color: "var(--color-text)" }}
                >
                  Canal @falandou no YouTube →
                </a>
                <Link href="/blog" className="font-body font-semibold text-sm underline underline-offset-4" style={{ color: "var(--color-text)" }}>
                  Blog Falandou →
                </Link>
                <Link href="/depoimentos" className="font-body font-semibold text-sm underline underline-offset-4" style={{ color: "var(--color-text)" }}>
                  Depoimentos de profissionais →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. CTA INSTITUCIONAL — leva ao método, não à venda ───────────── */}
        <section className="py-24 md:py-28 bg-surface">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-display font-extrabold leading-tight mb-4" style={{ fontSize: "var(--text-h2)", color: "var(--color-text)" }}>
              Conheça o método antes de decidir.
            </h2>
            <p className="font-body text-lg mb-10" style={{ color: "rgba(245,246,241,0.7)" }}>
              Diagnóstico, plano, sessões e exame final: as quatro etapas do ciclo, explicadas em detalhe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/metodo"
                className="inline-flex items-center justify-center px-10 py-5 rounded-full text-base font-bold text-white transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: "var(--color-bg)" }}
              >
                Ver como funciona o método
              </Link>
              <a
                href={getWhatsAppUrlForContext("sobre")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body font-semibold text-sm underline underline-offset-4"
                style={{ color: "rgba(245,246,241,0.75)" }}
              >
                ou fale com a equipe
              </a>
            </div>
          </div>
        </section>

        <LeadMagnetCompact />
      </main>
      <Footer />
    </>
  );
}
