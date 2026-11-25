import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CTASection from "@/components/sections/CTASection";
import ScrollRevealInit from "@/components/ui/ScrollRevealInit";
import JsonLd from "@/components/ui/JsonLd";
import { VOCABULARY } from "@/data/vocabulary";
import { cefrColor } from "@/data/cefr";
import { absoluteUrl } from "@/lib/site";

// UX/UI §17 — "Glossário profissional": termos por área, com pronúncia, definição,
// exemplo de uso no trabalho e nível CEFR sugerido. SEO de cauda longa.
export const metadata: Metadata = {
  title: "Vocabulário de Inglês Profissional por Área | Falandou",
  description:
    "Vocabulário de inglês profissional por área: negócios, engenharia, direito e saúde, com pronúncia, definição, exemplo de uso e nível CEFR sugerido.",
  alternates: { canonical: "/vocabulario/" },
  openGraph: {
    title: "Vocabulário de inglês profissional | Falandou",
    description: "Termos por área com pronúncia, definição, exemplo de uso e nível CEFR.",
    url: "/vocabulario/",
  },
};

const total = VOCABULARY.reduce((n, a) => n + a.entries.length, 0);

const schema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Vocabulário de inglês profissional — Falandou",
  url: absoluteUrl("/vocabulario/"),
  hasDefinedTerm: VOCABULARY.flatMap((a) =>
    a.entries.map((e) => ({
      "@type": "DefinedTerm",
      name: e.term,
      description: e.definition,
      inDefinedTermSet: absoluteUrl("/vocabulario/"),
    }))
  ),
};

export default function VocabularioPage() {
  return (
    <>
      <ScrollRevealInit />
      <Navbar />
      <main id="conteudo">
        <JsonLd data={schema} />

        <section className="pt-36 pb-14 md:pt-48 md:pb-16" style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="max-w-5xl mx-auto px-5 md:px-8">
            <p className="eyebrow reveal text-sm font-bold uppercase tracking-widest mb-6">
              Vocabulário profissional
            </p>
            <h1 className="reveal font-display font-extrabold text-white leading-tight mb-6 delay-100" style={{ fontSize: "var(--text-h1)" }}>
              O inglês da sua área,{" "}
              <span style={{ color: "#FF6820" }}>termo por termo.</span>
            </h1>
            <p className="reveal text-lg leading-relaxed max-w-2xl delay-150" style={{ color: "var(--color-text-body)" }}>
              {total} termos que aparecem no dia a dia de reuniões, contratos e projetos — com pronúncia, definição em
              português, um exemplo de uso no trabalho e o nível CEFR em que eles costumam entrar no vocabulário.
            </p>

            {/* Atalhos por área */}
            <nav aria-label="Áreas" className="reveal mt-8 flex flex-wrap gap-2 delay-200">
              {VOCABULARY.map((a) => (
                <a
                  key={a.slug}
                  href={`#${a.slug}`}
                  className="inline-flex items-center min-h-[44px] px-4 rounded-full text-sm font-semibold text-white border hover:border-laranja transition-colors"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  {a.name}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {VOCABULARY.map((area, ai) => (
          <section
            key={area.slug}
            id={area.slug}
            className="py-12 md:py-20"
            style={{ backgroundColor: ai % 2 === 0 ? "var(--color-bg-alt)" : "var(--color-bg)" }}
          >
            <div className="max-w-5xl mx-auto px-5 md:px-8">
              <h2 className="reveal font-display font-extrabold text-white leading-tight mb-2" style={{ fontSize: "var(--text-h2)" }}>
                {area.name}
              </h2>
              <p className="reveal mb-10 text-base" style={{ color: "var(--color-text-muted)" }}>
                {area.intro}
                {area.guide && (
                  <>
                    {" "}
                    <Link href={area.guide.href} className="cta-tertiary text-white font-semibold">
                      {area.guide.label}
                    </Link>
                    .
                  </>
                )}
              </p>
              <dl className="grid md:grid-cols-2 gap-4">
                {area.entries.map((e) => (
                  <div
                    key={e.term}
                    className="reveal rounded-2xl p-6 md:p-8"
                    style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                  >
                    <dt className="flex items-start justify-between gap-3">
                      <span>
                        <span className="block font-display font-extrabold text-xl text-white" lang="en">
                          {e.term}
                        </span>
                        <span className="block text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                          {e.ipa}
                        </span>
                      </span>
                      <span
                        className="flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-extrabold"
                        style={{ border: `1.5px solid ${cefrColor(e.level)}`, color: cefrColor(e.level) }}
                        title="Nível CEFR sugerido"
                      >
                        {e.level}
                      </span>
                    </dt>
                    <dd className="mt-3 text-base" style={{ color: "var(--color-text-body)" }}>
                      {e.definition}
                    </dd>
                    <dd className="mt-3 text-sm italic pl-3 border-l-2" style={{ borderColor: "#FF6820", color: "rgba(245,246,241,0.85)" }} lang="en">
                      “{e.example}”
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        ))}

        <section className="py-12" style={{ backgroundColor: "var(--color-bg)" }}>
          <p className="max-w-3xl mx-auto px-5 md:px-8 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>
            Pronúncia em inglês americano (IPA). O nível CEFR indica quando o termo costuma entrar no vocabulário ativo.
            Quer entender os níveis?{" "}
            <Link href="/blog/diferenca-cefr-niveis-ingles" className="cta-tertiary text-white font-semibold">
              Veja o guia dos níveis CEFR
            </Link>
            .
          </p>
        </section>

        <CTASection
          heading="Saber o termo é o começo. Usar na reunião é o objetivo."
          text="Nas sessões 1 a 1, o vocabulário é o do seu setor e as situações são as do seu trabalho."
          whatsappContext="cta"
          secondary={{ href: "/metodo", label: "Ver como funciona o método" }}
        />
      </main>
      <Footer cta={false} />
    </>
  );
}
