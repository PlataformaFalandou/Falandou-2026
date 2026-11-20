// Fonte única dos planos e preços (Arquitetura da Informação §4, §9 e gap 8).
// Valores e regras alinhados aos planos vigentes em falandou.com (nov/2026).
// Para mudar um preço, um plano ou o que ele inclui, altere SÓ este arquivo:
// /planos, /intensivo, FAQs, schema Course e os textos de "a partir de" leem daqui.

export type Duration = 25 | 50;
export const DURATIONS: Duration[] = [50, 25];
export const DEFAULT_DURATION: Duration = 50;

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  /** Copywriting §4 — linha de posicionamento: para quem é este plano. */
  forWho: string;
  /** Preço mensal por duração da sessão. */
  prices: Record<Duration, string>;
  sessionsPerMonth: number;
  highlight: boolean;
  featuresLabel: string;
  features: string[];
};

/** Itens comuns a todos os planos (faixa "Incluso em todos os planos"). */
export const INCLUDED_IN_ALL = [
  "Sessões 100% individuais e ao vivo",
  "Duração de 25 ou 50 minutos, à sua escolha",
  "Exame CEFR diagnóstico e de evolução",
  "Plano personalizado para o seu setor",
  "Material de estudo e videoaulas",
  "Suporte via WhatsApp",
  "Acesso à Plataforma do Aluno",
];

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Ideal para começar sua jornada",
    forWho: "Para quem quer constância sem pressão de prazo: uma sessão por semana.",
    prices: { 25: "R$ 134,90", 50: "R$ 184,90" },
    sessionsPerMonth: 4,
    highlight: false,
    featuresLabel: "Inclui",
    features: ["Tudo o que está incluso em todos os planos"],
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "Para quem quer evoluir mais rápido",
    forWho: "Para quem usa inglês toda semana no trabalho e quer ganhar ritmo.",
    prices: { 25: "R$ 169,20", 50: "R$ 305,20" },
    sessionsPerMonth: 8,
    highlight: true,
    featuresLabel: "Além do incluso em todos",
    features: ["Acesso completo ao material", "Todas as videoaulas", "Atividades diárias", "Suporte prioritário"],
  },
  {
    id: "intensive",
    name: "Intensive",
    tagline: "Máxima imersão e resultados",
    forWho: "Para quem tem processo seletivo, promoção ou mudança com data marcada.",
    prices: { 25: "R$ 319,20", 50: "R$ 579,20" },
    sessionsPerMonth: 16,
    highlight: false,
    featuresLabel: "Além do incluso em todos",
    features: [
      "Professores especialistas",
      "Material exclusivo avançado",
      "Acesso VIP às videoaulas",
      "Atividades personalizadas",
    ],
  },
];

/** Regras de contratação (iguais às de falandou.com). */
export const PLAN_TERMS =
  "Planos mensais com renovação automática. Cancele quando quiser: o acesso vale até o fim do ciclo pago. Créditos não usados expiram ao fim de cada ciclo. Reembolso integral em até 7 dias se nenhuma sessão tiver sido feita.";

/** Desconto por compromisso mais longo (informado pela escola, nov/2026). */
export const COMMITMENT_DISCOUNTS = [
  { months: 6, pct: 10 },
  { months: 12, pct: 20 },
];

export const COMMITMENT_TEXT = COMMITMENT_DISCOUNTS.map((d) => `${d.months} meses: ${d.pct}% de desconto`).join(" · ");

export function priceValue(price: string): number {
  return Number(price.replace(/[^\d,]/g, "").replace(",", "."));
}

export function formatBRL(value: number): string {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

/** Valor por sessão (preço mensal ÷ sessões do mês). */
export function perSession(plan: Plan, duration: Duration): string {
  return formatBRL(Math.round((priceValue(plan.prices[duration]) / plan.sessionsPerMonth) * 100) / 100);
}

export function sessionsLabel(plan: Plan): string {
  return `${plan.sessionsPerMonth} sessões individuais por mês`;
}

export function planWhatsAppMsg(plan: Plan, duration: Duration): string {
  return `Olá! Tenho interesse no plano ${plan.name} da Falandou (${plan.sessionsPerMonth} sessões/mês de ${duration} minutos). Podem me contar mais sobre como funciona?`;
}

export function getPlan(id: string): Plan {
  const p = PLANS.find((x) => x.id === id);
  if (!p) throw new Error(`Plano não encontrado: ${id}`);
  return p;
}

/** Menor preço entre todos os planos e durações — "a partir de R$ X/mês". */
const cheapest = Math.min(...PLANS.flatMap((p) => DURATIONS.map((d) => priceValue(p.prices[d]))));
export const PRICE_FROM = formatBRL(cheapest); // "R$ 134,90"
/** Menor preço arredondado, para frases de comparação ("~R$ 135/mês"). */
export const PRICE_FROM_ROUNDED = `R$ ${Math.round(cheapest)}`;
