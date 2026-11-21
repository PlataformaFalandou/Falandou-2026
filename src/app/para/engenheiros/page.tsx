import type { Metadata } from "next";
import ProfileLanding, { type ProfileData } from "@/components/sections/ProfileLanding";

export const metadata: Metadata = {
  title: "Inglês para Engenheiros e Arquitetos | Falandou",
  description:
    "Inglês para engenheiros e arquitetos: sessões 1 a 1 com o vocabulário técnico do seu projeto, reuniões com times globais e exame CEFR no ciclo.",
  alternates: { canonical: "/para/engenheiros/" },
  openGraph: {
    title: "Inglês para Engenheiros e Arquitetos | Falandou",
    description: "Conduza a apresentação do projeto, responda objeções e feche a reunião — em inglês.",
    url: "/para/engenheiros/",
  },
};

const DATA: ProfileData = {
  path: "/para/engenheiros/",
  eyebrow: "Para engenheiros e arquitetos",
  title: "Você domina o projeto.",
  titleAccent: "Falta defendê-lo em inglês.",
  intro:
    "O desenho está pronto, os cálculos fecham — e na call com o cliente de fora você responde em frases curtas e deixa o colega explicar. O ciclo treina exatamente essas conversas, com o vocabulário técnico da sua área.",
  scenarios: [
    {
      situation: "A apresentação do projeto para o cliente",
      today: "Você ensaia o roteiro, mas a primeira pergunta fora do script desmonta a apresentação.",
      after: "Simulações da apresentação real, com perguntas e objeções do jeito que o cliente faz.",
    },
    {
      situation: "A reunião de revisão de escopo",
      today: "O cliente pede uma mudança e você aceita por não conseguir argumentar prazo e custo na hora.",
      after: "Estruturas para discordar, negociar e propor alternativas sem soar rude.",
    },
    {
      situation: "O relatório técnico e o e-mail para o fornecedor",
      today: "Um e-mail de cinco linhas passa pelo tradutor e por um colega antes de ser enviado.",
      after: "Escrita técnica treinada com os seus próprios documentos, revisada pelo professor.",
    },
    {
      situation: "A visita técnica ou o call com a equipe de outra unidade",
      today: "Você entende o sotaque com dificuldade e deixa passar detalhes que depois viram retrabalho.",
      after: "Listening com sotaques reais e prática de confirmar e esclarecer o que foi dito.",
    },
  ],
  testimonialNames: ["Lucas Andrade", "Rafael Souza"],
  whatsappContext: "engenheiros",
  ctaLabel: "Quero falar com a equipe",
  blogSlugs: ["ingles-para-apresentacoes", "emails-profissionais-ingles", "vocabulario-reunioes-negocios"],
  blogTitle: "Para apresentar e escrever em inglês técnico.",
  practice: { key: "decisao", intro: "Explicar uma escolha técnica para um time global pede mais do que vocabulário: pede critério e estrutura. Na sessão, a decisão real do seu projeto vira o exercício." },
};

export default function EngenheirosPage() {
  return <ProfileLanding data={DATA} />;
}
