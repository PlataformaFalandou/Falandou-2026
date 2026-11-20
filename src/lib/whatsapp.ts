export const WHATSAPP_NUMBER = "5511971419047";

export function getWhatsAppUrl(message?: string): string {
  const defaultMessage = "Olá! Quero saber como a Falandou pode me ajudar com inglês profissional.";
  const encoded = encodeURIComponent(message || defaultMessage);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

/**
 * Mensagens pré-preenchidas por contexto de entrada.
 * Objetivo: qualificar o lead antes do primeiro contato humano.
 *
 * hero       — topo do funil, primeiro contato com a escola
 * journey    — visitante entendeu o processo, quer detalhes
 * plans      — visitante viu preços, intenção de compra mais alta
 * cta        — mid-page CTA, já leu a proposta central
 * navbar     — clique impulsivo, chegou rápido ao botão
 * faq        — veio do FAQ, tem dúvida específica não respondida
 * entrevista — LP nicho: inglês para entrevista de emprego
 * executivo  — LP nicho: inglês executivo / reuniões e apresentações
 * promocao   — LP nicho: inglês para promoção de cargo
 */
/**
 * Adiciona parâmetros UTM a qualquer URL interna do site.
 * Usado em links publicados no LinkedIn (e outros canais) para
 * segmentar a origem do tráfego no analytics.
 *
 * Exemplo:
 *   withUTM("/planos", "linkedin", "post-reunioes")
 *   → "/planos?utm_source=linkedin&utm_medium=organic&utm_campaign=post-reunioes"
 */
export function withUTM(
  path: string,
  source: string,
  campaign?: string,
  medium = "organic"
): string {
  const params = new URLSearchParams({ utm_source: source, utm_medium: medium });
  if (campaign) params.set("utm_campaign", campaign);
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}${params.toString()}`;
}

/**
 * URLs canônicas do site prontas para uso em posts do LinkedIn.
 * Cada entrada já carrega UTM source=linkedin + medium=organic.
 * Passe um `campaign` para identificar o post específico.
 *
 * Exemplo de uso em post:
 *   linkedinUrl("planos", "post-semana-12")
 */
export function linkedinUrl(
  page: "home" | "planos" | "metodo" | "ingles-entrevista" | "ingles-executivo" | "ingles-expatriacao" | "promocao-cargo" | "intensivo" | string,
  campaign?: string
): string {
  const BASE = "https://2026.falandou.com";
  const path = page === "home" ? "/" : `/${page}`;
  return withUTM(`${BASE}${path}`, "linkedin", campaign);
}

export function getWhatsAppUrlForContext(context: string): string {
  const messages: Record<string, string> = {
    hero: "Olá! Vi o site da Falandou e quero entender como funciona o plano para profissionais.",
    journey: "Olá! Quero saber mais sobre como o plano é montado para o meu objetivo profissional.",
    plans: "Olá! Quero conhecer os planos da Falandou. Podem me indicar qual faz mais sentido para o meu caso?",
    cta: "Olá! Quero começar na Falandou. Como é o processo para dar o primeiro passo?",
    navbar: "Olá! Quero falar com a equipe da Falandou sobre inglês profissional.",
    faq: "Olá! Fiquei com uma dúvida depois de ler o FAQ da Falandou e gostaria de conversar com a equipe.",
    roi: "Olá! Vi os cenários de retorno da Falandou e quero entender como o plano certo pode impactar minha carreira. Pode me ajudar?",
    metodo: "Olá! Li sobre o método da Falandou e quero entender como funciona na prática para o meu caso.",
    empresas: "Olá! Represento uma empresa e quero entender como funciona o inglês profissional da Falandou para a nossa equipe.",
    depoimentos:"Olá! Li os depoimentos da Falandou e quero entender como o ciclo funcionaria para o meu caso.",
    sobre:"Olá! Conheci a Falandou pelo site e quero entender como funciona o ciclo para profissionais.",
    resultados:"Olá! Vi os resultados da Falandou e quero fazer o diagnóstico para saber de onde eu partiria.",
    indicacao:"Olá! Sou aluno(a) da Falandou e tenho uma dúvida sobre o programa de indicação.",
    professores: "Olá! Conheci os professores da Falandou e quero fazer o diagnóstico para saber qual plano faz sentido para mim.",
    "ingles-entrevista": "Olá! Tenho uma entrevista de emprego em inglês se aproximando e preciso me preparar. Quero entender como a Falandou pode me ajudar.",
    "ingles-entrevista-urgente": "Olá! Minha entrevista em inglês está próxima e preciso de preparação intensiva. Pode me ajudar urgente?",
    "ingles-expatriacao": "Olá! Estou sendo transferido internacionalmente e preciso de inglês profissional para o ambiente de trabalho no exterior. Quero entender como a Falandou me prepara.",
    "ingles-expatriacao-urgente": "Olá! Minha transferência internacional está confirmada e o prazo é curto. Preciso de um plano intensivo de inglês. Pode me ajudar?",
    entrevista: "Olá! Estou me preparando para entrevistas de emprego em inglês e quero saber como a Falandou pode me ajudar.",
    executivo: "Olá! Preciso de inglês executivo para reuniões e apresentações. Quero entender como a Falandou trabalha com esse objetivo.",
    promocao: "Olá! Estou buscando uma promoção e o inglês é requisito. Quero saber como a Falandou pode acelerar meu desenvolvimento.",
    leadmagnet: "Olá! Vi o roteiro de 30 dias no site da Falandou e quero receber o PDF completo.",
    engenheiros: "Olá! Sou da área de engenharia/arquitetura e preciso usar inglês com clientes e times de fora. Quero entender como a Falandou trabalha com esse perfil.",
    gestores: "Olá! Sou gestor(a) e preciso conduzir reuniões com o time global em inglês. Quero entender como a Falandou trabalha com esse perfil.",
    intensivo: "Olá! Tenho interesse no plano Intensive da Falandou (16 sessões/mês). Podem me contar mais sobre como funciona?",
  };
  return getWhatsAppUrl(messages[context] ?? messages.hero);
}
