"use client";

/**
 * HeroAB — wrapper de split test para o hero da home.
 *
 * Variante A (ganho):
 *   eyebrow   → "Você sabe inglês. Mas trava na hora de usar."
 *   subhead   → foco no que você vai conquistar
 *
 * Variante B (perda):
 *   eyebrow   → "Pare de perder oportunidades por causa do inglês."
 *   subhead   → foco no que você está deixando escapar agora
 *
 * O bucket é atribuído no cliente (localStorage) para evitar
 * hydration mismatch com SSG. Ambos renderizam o mesmo HTML no servidor
 * (variante A como fallback) e atualizam após mount.
 */

import { useEffect, useState } from "react";
import Hero from "./Hero";
import { getHeroVariant, forceVariantFromURL, type ABVariant } from "@/lib/abtest";
import { trackABImpression } from "@/lib/analytics";

const VARIANTS: Record<ABVariant, { eyebrow: string; subheadline: string }> = {
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

  return (
    <Hero
      eyebrow={VARIANTS[variant].eyebrow}
      subheadline={VARIANTS[variant].subheadline}
      statChip="79% sobe pelo menos 1 nível CEFR em 90 dias · 70% aprovado em seletivas com etapa em inglês"
    />
  );
}
