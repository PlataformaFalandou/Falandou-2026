"use client";

/**
 * HeroAB — wrapper de split test para o hero da home (3 variantes, 1/3 cada).
 *
 * Variante A (ganho):
 *   eyebrow   → "Você sabe inglês. Mas trava na hora de usar."
 *   headline  → padrão do Hero ("Fale inglês com confiança no trabalho.")
 *
 * Variante B (perda):
 *   eyebrow   → "Pare de perder oportunidades por causa do inglês."
 *   headline  → padrão do Hero
 *
 * Variante C (PVU — Copywriting §1):
 *   eyebrow   → "Escola de inglês para profissionais · ciclo individual de 90 dias"
 *   headline  → "De B1 para B2 em 11 semanas. Com um plano feito só para você."
 *   A headline responde "o que é e por que é diferente" — mecanismo + resultado medido.
 *
 * O bucket é atribuído no cliente (localStorage) para evitar
 * hydration mismatch com SSG. Todas renderizam o mesmo HTML no servidor
 * (variante A como fallback) e atualizam após mount.
 * QA: ?ab=A, ?ab=B ou ?ab=C força a variante.
 */

import { useEffect, useState, type ReactNode } from "react";
import Hero from "./Hero";
import { getHeroVariant, forceVariantFromURL, type ABVariant } from "@/lib/abtest";
import { trackABImpression } from "@/lib/analytics";
import { STATS } from "@/data/stats";

const VARIANTS: Record<ABVariant, { eyebrow: string; headline?: ReactNode; subheadline: string }> = {
  A: {
    eyebrow: "Você sabe inglês. Mas trava na hora de usar.",
    subheadline:
      "A maioria dos profissionais entende inglês razoavelmente bem. O problema é na hora de falar — reunião, apresentação, entrevista. A Falandou resolve exatamente isso: inglês funcional para o seu contexto. B1 → B2 em 11 semanas em média.",
  },
  B: {
    eyebrow: "Pare de perder oportunidades por causa do inglês.",
    subheadline:
      "Promoções, projetos internacionais, seletivas — quantas vezes o inglês foi o critério que te deixou de fora? Nossos profissionais saem de B1 para B2 em 11 semanas em média. Tempo suficiente para mudar o próximo processo seletivo.",
  },
  C: {
    eyebrow: `Escola de inglês para profissionais · ciclo individual de ${STATS.cycleDays} dias`,
    headline: (
      <>
        De B1 para B2 em {STATS.b1b2Weeks} semanas.{" "}
        <span style={{ color: "#FF6820" }}>Com um plano feito só para você.</span>
      </>
    ),
    subheadline:
      "Exame CEFR no início, plano montado para o seu cargo e o seu setor, sessões 1 a 1 e o mesmo exame no fim. Você sai com um número — não com uma sensação.",
  },
};

export default function HeroAB() {
  const [variant, setVariant] = useState<ABVariant>("A");

  useEffect(() => {
    // A variante vem do localStorage, só disponível no cliente: aplicada logo após a
    // montagem (o HTML estático renderiza a A) — fora do corpo síncrono do efeito.
    const t = setTimeout(() => {
      forceVariantFromURL();
      const v = getHeroVariant();
      setVariant(v);
      trackABImpression("hero_framing", v);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const v = VARIANTS[variant];
  return (
    <Hero
      eyebrow={v.eyebrow}
      {...(v.headline ? { headline: v.headline } : {})}
      subheadline={v.subheadline}
      statChip="79% sobe pelo menos 1 nível CEFR em 90 dias · 70% aprovado em seletivas com etapa em inglês"
    />
  );
}
