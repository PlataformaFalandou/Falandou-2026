import { SITE_URL } from "@/lib/site";

// Dados institucionais — fonte única para rodapé, /politica-de-privacidade e /termos.
// Decisão da escola: não exibir o CNPJ no site. O controlador é identificado pelo
// nome da escola e pelo e-mail de contato para assuntos de dados pessoais.
export const COMPANY = {
  brand: "Falandou",
  legalName: "Falandou Escola de Inglês",
  privacyEmail: "contato@falandou.com",
  site: SITE_URL,
  /** Plataforma do Aluno — endereço único usado no rodapé e em /bem-vindo (revisão visual §6.3).
   *  Endereço mantido por decisão da escola (20/11/2026). Se mudar, trocar só aqui. */
  platformUrl: "https://falandou-hub-learn.lovable.app",
  /** Data da última atualização das páginas legais (exibida nelas). */
  legalUpdatedAt: "19 de novembro de 2026",
} as const;
