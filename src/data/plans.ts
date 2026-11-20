// Fonte única dos planos e preços (Arquitetura da Informação §4, §9 e gap 8).
// Para mudar um preço, um plano ou o que ele inclui, altere SÓ este arquivo:
// /planos, o FAQ da home e os textos de "a partir de" leem daqui.

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  cycle: string;
  sessions: string;
  highlight: boolean;
  featuresLabel: string;
  features: string[];
  cta: string;
  whatsappMsg: string;
};

/** Itens comuns a todos os planos (faixa "Incluso em todos os planos"). */
export const INCLUDED_IN_ALL = [
  "Exame CEFR diagnóstico e de evolução",
  "Plano personalizado para o seu setor",
  "Acompanhamento via WhatsApp",
  "Material de estudo incluso",
  "Acesso à Plataforma do Aluno",
];

export const PLANS: Plan[] = [
  {
    id: "essencial",
    name: "Essencial",
    tagline: "Para quem quer consistência sem correria",
    price: "R$ 184,90",
    period: "/mês",
    cycle: "Ciclo de 90 dias",
    sessions: "2 sessões individuais por semana",
    highlight: false,
    featuresLabel: "Inclui",
    features: ["Tudo o que está incluso em todos os planos"],
    cta: "Quero o plano Essencial",
    whatsappMsg: "Olá! Tenho interesse no plano Essencial da Falandou (2 sessões/semana). Podem me contar mais sobre como funciona?",
  },
  {
    id: "profissional",
    name: "Profissional",
    tagline: "O mais escolhido por quem tem prazo definido",
    price: "R$ 299,90",
    period: "/mês",
    cycle: "Ciclo de 90 dias",
    sessions: "3 sessões individuais por semana",
    highlight: true,
    featuresLabel: "Tudo do Essencial, mais",
    features: ["Simulações de reunião e apresentação", "Prioridade no reagendamento"],
    cta: "Quero o plano Profissional",
    whatsappMsg: "Olá! Tenho interesse no plano Profissional da Falandou (3 sessões/semana). Podem me contar mais sobre como funciona?",
  },
  {
    id: "acelerado",
    name: "Acelerado",
    tagline: "Para quem tem data marcada: entrevista, transferência, promoção",
    price: "R$ 429,90",
    period: "/mês",
    cycle: "Ciclo de 90 dias",
    sessions: "5 sessões individuais por semana",
    highlight: false,
    featuresLabel: "Tudo do Profissional, mais",
    features: [
      "Simulações de entrevista",
      "Prioridade máxima no reagendamento",
      "Sessão extra de feedback a cada 30 dias",
    ],
    cta: "Quero o plano Acelerado",
    whatsappMsg: "Olá! Tenho interesse no plano Acelerado da Falandou (5 sessões/semana). Podem me contar mais sobre como funciona?",
  },
];

/** Menor preço — usado em "a partir de R$ X/mês". */
export const PRICE_FROM = PLANS[0].price; // "R$ 184,90"
/** Menor preço arredondado, para frases de comparação ("~R$ 185/mês"). */
export const PRICE_FROM_ROUNDED = `R$ ${Math.round(
  Number(PLANS[0].price.replace(/[^\d,]/g, "").replace(",", "."))
)}`;
