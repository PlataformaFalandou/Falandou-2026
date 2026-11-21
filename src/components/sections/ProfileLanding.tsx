import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollRevealInit from "@/components/ui/ScrollRevealInit";
import LeadMagnetCompact from "@/components/sections/LeadMagnetCompact";
import BlogPreview from "@/components/sections/BlogPreview";
import JsonLd from "@/components/ui/JsonLd";
import { courseSchema } from "@/lib/schema";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";
import { testimonials } from "@/data/testimonials";
import { STATS } from "@/data/stats";
import PracticeCaseCard from "@/components/ui/PracticeCaseCard";
import { PRACTICE_CASES } from "@/data/practiceCases";

/**
 * ProfileLanding — páginas de perfil /para/... (Copywriting §10, SEO long-tail).
 * Cada página aprofunda a situação do perfil com 3–4 cenários concretos e
 * depoimentos reais de profissionais do setor (por nome, de src/data/testimonials.ts).
 */
export type ProfileData = {
  path: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  intro: string;
  scenarios: { situation: string; today: string; after: string }[];
  testimonialNames: string[];
  whatsappContext: string;
  ctaLabel: string;
  blogSlugs: string[];
  blogTitle: string;
  /** Exemplo de atividade da situação típica do perfil (src/data/practiceCases.ts). */
  practice?: { key: string; intro: string };
};

export default function ProfileLanding({ data }: { data: ProfileData }) {
  const quotes = data.testimonialNames
    .map((n) => testimonials.find((t) => t.name === n))
    .filter((t): t is NonNullable<typeof t> => !!t);

  return (
    <>
      <ScrollRevealInit />
      <Navbar />
      <main id="conteudo">
        <JsonLd
          data={courseSchema({
            name: `Inglês profissional — ${data.eyebrow}`,
            description: data.intro,
            path: data.path,
          })}
        />

        {/* ── HERO ── */}
        <section className="pt-40 pb-24 md:pt-52 md:pb-28" style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="max-w-4xl mx-auto px-5 md:px-8">
            <p className="eyebrow reveal font-body text-sm font-bold uppercase tracking-widest mb-6">
              {data.eyebrow}
            </p>
            <h1
              className="reveal font-display font-extrabold text-white leading-tight mb-6 delay-100"
              style={{ fontSize: "var(--text-h1)" }}
            >
              {data.title} <span style={{ color: "#FF6820" }}>{data.titleAccent}</span>
            </h1>
            <p className="reveal font-body text-lg leading-relaxed mb-10 delay-150" style={{ color: "rgba(255,255,255,0.65)", maxWidth: "620px" }}>
              {data.intro}
            </p>
            <div className="reveal flex flex-col sm:flex-row gap-4 delay-200">
              <a
                href={getWhatsAppUrlForContext(data.whatsappContext)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-5 rounded-full text-base font-bold text-white cta-primary">
                {data.ctaLabel}
              </a>
              <Link
                href="/metodo"
                className="inline-flex items-center justify-center px-8 py-5 rounded-full text-base font-semibold text-white transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid var(--color-border)" }}
              >
                Como funciona o ciclo
              </Link>
            </div>
          </div>
        </section>

        {/* ── CENÁRIOS ── */}
        <section className="py-12 md:py-20" style={{ backgroundColor: "var(--color-bg-alt)" }}>
          <div className="max-w-5xl mx-auto px-5 md:px-8">
            <p className="eyebrow reveal font-body text-sm font-bold uppercase tracking-widest mb-3">
              As situações que o plano treina
            </p>
            <h2 className="reveal font-display font-extrabold leading-tight mb-12 delay-100" style={{ fontSize: "var(--text-h2)", color: "var(--color-text)" }}>
              Você provavelmente já passou por pelo menos uma.
            </h2>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {data.scenarios.map((s) => (
                <div key={s.situation} className="reveal rounded-2xl bg-surface border border-border p-6 md:p-8">
                  <h3 className="font-display font-extrabold text-[length:var(--text-h3)] mb-4" style={{ color: "var(--color-text)" }}>{s.situation}</h3>
                  <p className="font-body text-base leading-6 mb-3" style={{ color: "rgba(245,246,241,0.7)" }}>
                    <strong style={{ color: "var(--color-text)" }}>Hoje:</strong> {s.today}
                  </p>
                  <p className="font-body text-base leading-6" style={{ color: "rgba(245,246,241,0.85)" }}>
                    <strong style={{ color: "#FF6820" }}>No ciclo:</strong> {s.after}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SITUAÇÃO EM PRÁTICA — o trabalho pedagógico, não só o benefício (direção criativa §4.1, §4.2) ── */}
        {data.practice && PRACTICE_CASES[data.practice.key] && (
          <section className="py-12 md:py-20" style={{ backgroundColor: "var(--color-bg)" }}>
            <div className="max-w-5xl mx-auto px-5 md:px-8 grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8 lg:gap-12 items-start">
              <div>
                <p className="eyebrow reveal text-sm font-bold uppercase tracking-widest mb-3">O inglês da sua próxima situação</p>
                <h2 className="reveal font-display text-white mb-4" style={{ fontSize: "var(--text-h2)" }}>
                  Como uma sessão trabalha isso.
                </h2>
                <p className="reveal text-lg" style={{ color: "var(--color-text-body)" }}>
                  {data.practice.intro}
                </p>
              </div>
              <div className="reveal">
                <PracticeCaseCard c={PRACTICE_CASES[data.practice.key]} />
              </div>
            </div>
          </section>
        )}

        {/* ── NÚMEROS ── */}
        <section style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="max-w-5xl mx-auto px-5 md:px-8 py-14 grid grid-cols-1 sm:grid-cols-3 text-center gap-4 md:gap-6">
            {[
              { v: STATS.cefrUpPct, l: `sobem 1 nível CEFR ou mais em ${STATS.cycleDays} dias` },
              { v: `${STATS.b1b2Weeks} sem.`, l: "em média de B1 para B2" },
              { v: STATS.formed, l: "profissionais formados" },
            ].map((n) => (
              <div key={n.l}>
                <p className="font-display font-extrabold text-4xl text-white">{n.v}</p>
                <p className="font-body text-sm mt-2" style={{ color: "rgba(255,255,255,0.55)" }}>{n.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── DEPOIMENTOS DO SETOR ── */}
        {quotes.length > 0 && (
          <section className="py-12 md:py-20 bg-bg">
            <div className="max-w-5xl mx-auto px-5 md:px-8">
              <p className="eyebrow reveal font-body text-sm font-bold uppercase tracking-widest mb-10">
                Quem já fez o ciclo
              </p>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                {quotes.map((q) => (
                  <figure key={q.name} className="reveal rounded-2xl p-6 md:p-8" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                    <blockquote className="font-body text-base leading-relaxed mb-6" style={{ color: "var(--color-text)" }}>
                      &ldquo;{q.text}&rdquo;
                    </blockquote>
                    <figcaption className="font-body text-sm" style={{ color: "rgba(245,246,241,0.7)" }}>
                      <strong style={{ color: "var(--color-text)" }}>{q.name}</strong> · {q.role}
                      {q.company ? ` · ${q.company}` : ""}
                    </figcaption>
                  </figure>
                ))}
              </div>
              <p className="font-body text-sm mt-8">
                <Link href="/depoimentos" className="underline underline-offset-4 font-semibold" style={{ color: "#FF6820" }}>
                  Ver todos os depoimentos →
                </Link>
              </p>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="on-brand py-12 md:py-20" style={{ backgroundColor: "#FF6820" }}>
          <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
            <h2 className="font-display font-extrabold text-white leading-tight mb-4" style={{ fontSize: "var(--text-h2)" }}>
              Esse é o seu dia a dia?
            </h2>
            <p className="font-body text-lg mb-10" style={{ color: "rgba(255,255,255,0.85)" }}>
              Conte a situação em que você mais trava. A equipe responde em até 1h e explica como o plano
              fica para o seu caso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={getWhatsAppUrlForContext(data.whatsappContext)}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-dark"
              >
                Esse sou eu — quero saber mais
              </a>
              <Link
                href="/planos"
                className="cta-outline-dark"
              >
                Ver planos e valores
              </Link>
            </div>
          </div>
        </section>

        <BlogPreview slugs={data.blogSlugs} title={data.blogTitle} />
        <LeadMagnetCompact />
      </main>
      <Footer />
    </>
  );
}
