// Fonte única dos planos e preços (Arquitetura da Informação §4, §9 e gap 8).
// Preços reajustados em 20/11/2026 (decisão da escola): margem de ~40% com professor externo
// a R$ 45 (50 min) / R$ 25 (25 min) por sessão — ver docs/posicionamento-oferta.md.
// Valem para o NOVO site e a NOVA plataforma. O falandou.com (site antigo) não muda, e quem
// já é aluno mantém as condições atuais.
// Para mudar um preço, um plano ou o que ele inclui, altere SÓ este arquivo:
// /planos, /intensivo, FAQs, schema Course e os textos de "a partir de" leem daqui.

export type Duration = 25 | 50;
export const DURATIONS: Duration[] = [50, 25];
export const DEFAULT_DURATION: Duration = 50;

// Nomes por objetivo (Posicionamento e Oferta §2, nov/2026): Consistência, Resultado e Urgente.
// Equivalem a Starter, Professional e Intensive do falandou.com (site antigo, que não muda).
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
    name: "Consistência",
    tagline: "Ideal para começar sua jornada",
    forWho: "Para quem quer constância sem pressão de prazo: uma sessão por semana.",
    prices: { 25: "R$ 217,90", 50: "R$ 379,90" },
    sessionsPerMonth: 4,
    highlight: false,
    featuresLabel: "Inclui",
    features: ["Tudo o que está incluso em todos os planos"],
  },
  {
    id: "professional",
    name: "Resultado",
    tagline: "Para quem quer evoluir mais rápido",
    forWho: "Para quem usa inglês toda semana no trabalho e quer ganhar ritmo.",
    prices: { 25: "R$ 419,90", 50: "R$ 742,90" },
    sessionsPerMonth: 8,
    highlight: true,
    featuresLabel: "Além do incluso em todos",
    features: ["Acesso completo ao material", "Todas as videoaulas", "Atividades diárias", "Suporte prioritário"],
  },
  {
    id: "intensive",
    name: "Urgente",
    tagline: "Máxima imersão e resultados",
    forWho: "Para quem tem processo seletivo, promoção ou mudança com data marcada.",
    prices: { 25: "R$ 822,90", 50: "R$ 1.467,90" },
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

/** Regras de contratação. */
export const PLAN_TERMS =
  "Planos mensais com renovação automática. Cancele quando quiser: o acesso vale até o fim do ciclo pago. Créditos não usados expiram ao fim de cada ciclo. Reembolso integral em até 7 dias se nenhuma sessão tiver sido feita.";

/** Regras de sessão confirmadas pela escola (nov/2026) — Posicionamento e Oferta §7/§11. */
export const RESCHEDULE_RULE =
  "Reagendamento sem custo com pelo menos 24h de antecedência. Avisos com menos de 24h contam como sessão realizada.";
export const PAUSE_RULE = "Imprevisto no meio do caminho? Você pode pausar o plano por até 30 dias, sem cancelar.";
/** Limite de alunos ativos por professor — escassez real, não tática. */
export const STUDENTS_PER_TEACHER = 25;

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
  const [int, dec] = value.toFixed(2).split(".");
  return `R$ ${int.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${dec}`;
}

/** Valor por sessão (preço mensal ÷ sessões do mês). */
export function perSession(plan: Plan, duration: Duration): string {
  return formatBRL(Math.round((priceValue(plan.prices[duration]) / plan.sessionsPerMonth) * 100) / 100);
}

/** Mensalidade com o desconto de compromisso e a economia no período. */
export function commitmentPrice(plan: Plan, duration: Duration, months: number) {
  const d = COMMITMENT_DISCOUNTS.find((x) => x.months === months);
  if (!d) throw new Error(`Compromisso inexistente: ${months} meses`);
  const base = priceValue(plan.prices[duration]);
  const monthly = Math.round(base * (1 - d.pct / 100) * 100) / 100;
  return { monthly: formatBRL(monthly), saving: formatBRL(Math.round((base - monthly) * months * 100) / 100), pct: d.pct };
}

/** Preço mensal ÷ 30, para o reenquadramento "por dia". */
export function perDay(price: string): string {
  // arredonda para cima: "menos de R$ X por dia" precisa ser verdade
  return formatBRL(Math.ceil((priceValue(price) / 30) * 100) / 100);
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
export const PRICE_FROM = formatBRL(cheapest); // "R$ 217,90"
/** Maior mensalidade entre todos os planos — usada nas frases de retorno ("cobre qualquer plano"). */
export const PRICE_TO_VALUE = Math.max(...PLANS.flatMap((p) => DURATIONS.map((d) => priceValue(p.prices[d]))));
/** Menor aumento mensal relatado por alunos (R$ 1.500) — fonte: relatos publicados no site. */
export const MIN_REPORTED_RAISE = 1500;

/** Menor preço arredondado, para frases de comparação ("~R$ 135/mês"). */
export const PRICE_FROM_ROUNDED = `R$ ${Math.round(cheapest)}`;
