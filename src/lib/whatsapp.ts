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
export function getWhatsAppUrlForContext(context: string): string {
  const messages: Record<string, string> = {
    hero: "Olá! Vi o site da Falandou e quero entender como funciona o plano para profissionais.",
    journey: "Olá! Quero saber mais sobre como o plano é montado para o meu objetivo profissional.",
    plans: "Olá! Quero conhecer os planos da Falandou. Podem me indicar qual faz mais sentido para o meu caso?",
    cta: "Olá! Quero começar na Falandou. Como é o processo para dar o primeiro passo?",
    navbar: "Olá! Quero falar com a equipe da Falandou sobre inglês profissional.",
    faq: "Olá! Fiquei com uma dúvida depois de ler o FAQ da Falandou e gostaria de conversar com a equipe.",
    entrevista: "Olá! Estou me preparando para entrevistas de emprego em inglês e quero saber como a Falandou pode me ajudar.",
    executivo: "Olá! Preciso de inglês executivo para reuniões e apresentações. Quero entender como a Falandou trabalha com esse objetivo.",
    promocao: "Olá! Estou buscando uma promoção e o inglês é requisito. Quero saber como a Falandou pode acelerar meu desenvolvimento.",
    leadmagnet: "Olá! Vi o roteiro de 30 dias no site da Falandou e quero receber o PDF completo.",
  };
  return getWhatsAppUrl(messages[context] ?? messages.hero);
}
