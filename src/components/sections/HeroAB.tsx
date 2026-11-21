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
 * Sem troca visível: o HTML traz as 3 variantes e um script no <head> (AB_HEAD_SCRIPT, em
 * src/lib/abtest.ts) decide a do visitante antes da primeira pintura, marcando
 * <html data-hero-variant>. O CSS mostra só a marcada; sem JavaScript, aparece a A.
 * O bucket continua no localStorage (falandou_ab_hero_v2), então o visitante vê sempre a mesma.
 * QA: ?ab=A, ?ab=B ou ?ab=C força a variante.
 */

import { useEffect, type ReactNode } from "react";
import Hero, { HeadlineWords } from "./Hero";
import { currentHeroVariant, type ABVariant } from "@/lib/abtest";
import { trackABImpression } from "@/lib/analytics";
import { STATS } from "@/data/stats";
import HeroDemo from "@/components/interactive/HeroDemo";
import { getSituation } from "@/data/situations";
import { useSituation } from "@/lib/situationStore";

const VARIANTS: Record<ABVariant, { eyebrow: string; headline?: ReactNode; subheadline: string; subheadlineShort: string }> = {
  A: {
    eyebrow: "Você sabe inglês. Mas trava na hora de usar.",
    subheadlineShort: "Inglês para a reunião, a apresentação e a entrevista. De B1 a B2 em 11 semanas, em média.",
    subheadline:
      "A maioria dos profissionais entende inglês razoavelmente bem. O problema é na hora de falar — reunião, apresentação, entrevista. A Falandou resolve exatamente isso: inglês funcional para o seu contexto. B1 → B2 em 11 semanas em média.",
  },
  B: {
    eyebrow: "Pare de perder oportunidades por causa do inglês.",
    subheadlineShort: "Promoção, projeto internacional, seletiva: o inglês não precisa ser o critério que te deixa de fora.",
    subheadline:
      "Promoções, projetos internacionais, seletivas — quantas vezes o inglês foi o critério que te deixou de fora? Nossos profissionais saem de B1 para B2 em 11 semanas em média. Tempo suficiente para mudar o próximo processo seletivo.",
  },
  C: {
    eyebrow: `Escola de inglês para profissionais · ciclo individual de ${STATS.cycleDays} dias`,
    headline: (
      <>
        <HeadlineWords text={`De B1 para B2 em ${STATS.b1b2Weeks} semanas.`} />
        <HeadlineWords text="Com um plano feito" start={7} />
        <HeadlineWords text="só para você." accent start={11} />
      </>
    ),
    subheadlineShort: "Exame CEFR no início e no fim. Sessões 1 a 1 no meio.",
    subheadline:
      "Exame CEFR no início, plano montado para o seu cargo e o seu setor, sessões 1 a 1 e o mesmo exame no fim. Você sai com um número — não com uma sensação.",
  },
};

// Headline padrão (variantes A e B), igual ao padrão do Hero.
const DEFAULT_HEADLINE = (
  <>
    <HeadlineWords text="Fale inglês com" />
    <HeadlineWords text="confiança no trabalho." accent start={3} />
  </>
);

export default function HeroAB() {
  // Situação escolhida na demonstração: muda o contexto do contato (direção §1.3)
  const situation = useSituation();

  // A variante é decidida no <head> antes da primeira pintura (AB_HEAD_SCRIPT, layout.tsx).
  // Aqui só registramos a impressão — nada troca na tela depois do carregamento.
  useEffect(() => {
    trackABImpression("hero_framing", currentHeroVariant());
  }, []);

  // As 3 variantes vão no HTML; o CSS mostra só a do visitante ([data-hv]).
  const pick = (render: (v: (typeof VARIANTS)[ABVariant]) => ReactNode) => (
    <>
      {(["A", "B", "C"] as ABVariant[]).map((k) => (
        <span key={k} data-hv={k}>
          {render(VARIANTS[k])}
        </span>
      ))}
    </>
  );

  return (
    <Hero
      eyebrow={pick((v) => v.eyebrow)}
      headline={pick((v) => v.headline ?? DEFAULT_HEADLINE)}
      subheadline={pick((v) => v.subheadlineShort)}
      aside={<HeroDemo />}
      whatsappMessage={getSituation(situation).whatsapp}
    />
  );
}
