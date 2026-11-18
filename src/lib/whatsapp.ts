export const WHATSAPP_NUMBER = "5511971419047";

export function getWhatsAppUrl(message?: string): string {
  const defaultMessage = "Olá! Tenho interesse em conhecer os planos da Falandou para profissionais.";
  const encoded = encodeURIComponent(message || defaultMessage);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function getWhatsAppUrlForContext(context: string): string {
  const messages: Record<string, string> = {
    hero: "Olá! Quero saber mais sobre o inglês profissional da Falandou.",
    journey: "Olá! Quero começar minha jornada de inglês com a Falandou!",
    plans: "Olá! Tenho interesse nos planos da Falandou. Podem me ajudar?",
    cta: "Olá! Quero falar inglês com confiança no trabalho. Como funciona?",
  };
  return getWhatsAppUrl(messages[context]);
}
