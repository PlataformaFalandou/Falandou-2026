import type { Metadata } from "next";
import ProfileLanding, { type ProfileData } from "@/components/sections/ProfileLanding";

export const metadata: Metadata = {
  title: "Inglês para Gestores e Líderes | Falandou",
  description:
    "Inglês para gestores e líderes: conduza reuniões, apresente para a diretoria e alinhe times globais com sessões 1 a 1 e exame CEFR no ciclo.",
  alternates: { canonical: "/para/gestores/" },
  openGraph: {
    title: "Inglês para Gestores e Líderes | Falandou",
    description: "Entre na reunião com o time global e conduza — não só participe.",
    url: "/para/gestores/",
  },
};

const DATA: ProfileData = {
  path: "/para/gestores/",
  eyebrow: "Para gestores e líderes",
  title: "Você lidera em português.",
  titleAccent: "No inglês, só participa.",
  intro:
    "No Brasil, você conduz a reunião. Com o time global, fala menos do que sabe — e percebe que a sua autoridade fica menor na tela. O ciclo treina as conversas de liderança que você tem toda semana.",
  scenarios: [
    {
      situation: "A reunião semanal com o time global",
      today: "Você prepara o que vai dizer, mas a discussão anda rápido e a sua contribuição chega tarde.",
      after: "Prática de abrir, conduzir, interromper com educação e encerrar uma reunião.",
    },
    {
      situation: "A apresentação de resultados para a matriz",
      today: "Os números são bons, mas a explicação sai mais curta e menos convincente do que em português.",
      after: "Simulações da sua apresentação real, com as perguntas difíceis que a diretoria faz.",
    },
    {
      situation: "O feedback para alguém do time de fora",
      today: "Você evita a conversa ou suaviza tanto que a mensagem não chega.",
      after: "Estruturas para dar feedback claro e respeitoso, treinadas com casos do seu time.",
    },
    {
      situation: "A negociação com parceiro ou fornecedor internacional",
      today: "Você cede em pontos que defenderia sem pensar se a conversa fosse em português.",
      after: "Vocabulário de negociação e prática de sustentar uma posição sob pressão.",
    },
  ],
  testimonialNames: ["Diego Carvalho", "Mariana Costa"],
  whatsappContext: "gestores",
  ctaLabel: "Quero falar com a equipe",
  blogSlugs: ["vocabulario-reunioes-negocios", "ingles-para-apresentacoes", "como-aprender-ingles-profissional"],
  blogTitle: "Para conduzir reuniões e apresentações em inglês.",
  practice: { key: "reuniao", intro: "Liderar em inglês começa nos primeiros 30 segundos da reunião. Na sessão, você traz a pauta real e sai com a abertura pronta — e com o padrão para as próximas." },
};

export default function GestoresPage() {
  return <ProfileLanding data={DATA} />;
}
