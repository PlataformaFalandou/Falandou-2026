// CTA contextual no fim de cada artigo (Arquitetura da Informação §3 e §6):
// "Aprenda isso nas nossas sessões" > "Quero começar" genérico, e cada post
// leva a uma página de produto relacionada.
// Ao publicar um artigo novo, adicione uma entrada aqui (chave = slug do arquivo .md).

export type BlogCTA = {
  heading: string;
  text: string;
  related: { href: string; label: string };
};

export const DEFAULT_BLOG_CTA: BlogCTA = {
  heading: "Leve este conteúdo para as suas sessões.",
  text: "Na Falandou, o que você leu aqui vira prática nas sessões individuais, com o vocabulário e as situações do seu trabalho.",
  related: { href: "/metodo", label: "Ver como funciona o ciclo" },
};

export const BLOG_CTAS: Record<string, BlogCTA> = {
  "como-aprender-ingles-profissional": {
    heading: "Saia do inglês de sala de aula para o inglês do seu trabalho.",
    text: "O ciclo de 90 dias parte de um diagnóstico CEFR e monta o plano em torno das situações que você enfrenta no trabalho.",
    related: { href: "/metodo", label: "Ver como funciona o ciclo" },
  },
  "como-melhorar-pronuncia-ingles": {
    heading: "Corrija a pronúncia com feedback na hora.",
    text: "Nas sessões 1 a 1, o professor ouve você falar e corrige no momento — o que um app ou um vídeo gravado não fazem.",
    related: { href: "/metodo", label: "Ver como funcionam as sessões" },
  },
  "diferenca-cefr-niveis-ingles": {
    heading: "Descubra o seu nível CEFR de verdade.",
    text: "O ciclo começa com um exame nas quatro habilidades — exatamente o diagnóstico que este artigo explica — e termina com um novo exame para medir a evolução.",
    related: { href: "/resultados", label: "Ver os resultados em CEFR" },
  },
  "emails-profissionais-ingles": {
    heading: "Treine os seus e-mails reais com um professor.",
    text: "Nas sessões, você leva os e-mails do seu trabalho e ajusta tom e estrutura até escrever sem precisar de revisão.",
    related: { href: "/ingles-executivo", label: "Ver o inglês executivo" },
  },
  "ingles-para-apresentacoes": {
    heading: "Ensaie a sua próxima apresentação nas sessões.",
    text: "Você apresenta para o professor, recebe feedback sobre clareza e ritmo e chega ao dia com a estrutura já treinada em voz alta.",
    related: { href: "/ingles-executivo", label: "Ver o inglês executivo" },
  },
  "ingles-para-entrevista-emprego": {
    heading: "Simule a sua entrevista antes do dia.",
    text: "Nas sessões, você treina as perguntas do seu processo seletivo em simulações, com avaliação de clareza, ritmo e segurança.",
    related: { href: "/ingles-entrevista", label: "Ver a preparação para entrevista" },
  },
  "vocabulario-reunioes-negocios": {
    heading: "Use essas expressões em reuniões simuladas.",
    text: "Saber a expressão é o primeiro passo; usá-la sob pressão é outro. Nas sessões, você pratica reuniões do seu contexto até soar natural.",
    related: { href: "/ingles-executivo", label: "Ver o inglês executivo" },
  },
};

export function getBlogCTA(slug: string): BlogCTA {
  return BLOG_CTAS[slug] ?? DEFAULT_BLOG_CTA;
}
