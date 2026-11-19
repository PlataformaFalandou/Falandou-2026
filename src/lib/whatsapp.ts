export const WHATSAPP_NUMBER = "5511971419047";

export function getWhatsAppUrl(message?: string): string {
  const defaultMessage =
    "Olá, Professor Adriel! Vi o site da Falandou e gostaria de entender como funciona o plano para profissionais.";
  const encoded = encodeURIComponent(message || defaultMessage);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

/**
 * Segmentos com mensagem pré-preenchida específica.
 *
 * executivo   — profissional CLT/PJ que precisa de inglês para reuniões,
 *               promoções e processos seletivos internacionais.
 * concurseiro — candidato que precisa do inglês para provas e entrevistas
 *               de concursos públicos ou bancários.
 * intercambio — pessoa que vai estudar, trabalhar ou morar fora do Brasil.
 *
 * Os demais contextos (hero, journey, plans, cta) mantêm a mensagem
 * genérica para não quebrar chamadas existentes.
 */
export function getWhatsAppUrlForContext(context: string): string {
  const messages: Record<string, string> = {
    // Segmentos específicos
    executivo:
      "Olá, Professor Adriel! Sou profissional e preciso de inglês para reuniões e oportunidades de carreira. Gostaria de entender como funciona o plano.",
    concurseiro:
      "Olá, Professor Adriel! Estou me preparando para um concurso/seleção que exige inglês. Gostaria de entender como funciona o plano.",
    intercambio:
      "Olá, Professor Adriel! Vou morar/trabalhar fora do Brasil e preciso evoluir meu inglês com rapidez. Gostaria de entender como funciona o plano.",

    // Contextos genéricos (mantidos para compatibilidade)
    hero: "Olá, Professor Adriel! Vi o site da Falandou e gostaria de entender como funciona o plano para profissionais.",
    journey:
      "Olá, Professor Adriel! Quero começar minha evolução em inglês com a Falandou. Como funciona?",
    plans:
      "Olá, Professor Adriel! Tenho interesse nos planos da Falandou. Pode me contar mais?",
    cta: "Olá, Professor Adriel! Quero falar inglês com confiança no trabalho. Como funciona?",
  };
  return getWhatsAppUrl(messages[context]);
}
