// Fonte única dos depoimentos (Arquitetura da Informação §7).
// Usada pela seção Testimonials (home e páginas internas) e por /depoimentos.
//
// Para adicionar um depoimento: inclua um objeto abaixo — só com autorização de uso
// do profissional. Campos `levelBefore`/`levelAfter`/`cycle` são opcionais: preencha
// apenas quando houver o dado real do exame (não estimar).

export type Testimonial = {
  name: string;
  role: string;
  company?: string;
  /** Resultado concreto, em uma linha (aparece como selo no cartão). */
  result: string;
  /** Origem e data aproximada (ex.: "E-mail · 2024"). */
  source: string;
  text: string;
  /** Nível CEFR no início e no fim do ciclo, quando medido. */
  levelBefore?: string;
  levelAfter?: string;
  /** Duração do ciclo, quando informada (ex.: "90 dias"). */
  cycle?: string;
  /** Aparece na versão compacta (home e páginas internas). Máximo 3. */
  featured?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    name: "Rafael Souza",
    role: "Analista de TI",
    company: "IBM",
    result: "Passou a conduzir reuniões técnicas com clientes externos",
    source: "WhatsApp",
    text: "Em seis meses passei a conduzir reuniões técnicas em inglês com clientes externos. Nunca imaginei que conseguiria avançar tão rápido — a metodologia é séria e os professores cobram resultado de verdade.",
    featured: true,
  },
  {
    name: "Camila Ferreira",
    role: "Coordenadora de Projetos",
    company: "Accenture",
    result: "Perdeu o bloqueio de fala — resultado em 90 dias",
    source: "WhatsApp · Ciclo 90 dias",
    cycle: "90 dias",
    text: "O que eu não esperava era perder a vergonha de falar. As sessões individuais fixam muito mais do que qualquer aula em grupo — e conversar sobre temas do meu trabalho me deu confiança para usar o inglês fora do escritório também.",
    featured: true,
  },
  {
    name: "Diego Carvalho",
    role: "Gerente Comercial",
    company: "Amazon",
    result: "Comunicação clara em qualquer ambiente profissional",
    source: "E-mail · 2024",
    text: "A atenção dos professores ao longo do ciclo foi o que me surpreendeu. Sempre disponíveis, sempre diretos. Terminei os 90 dias com muito mais do que inglês — saí com clareza para me comunicar em qualquer ambiente profissional.",
    featured: true,
  },
  {
    name: "Lucas Andrade",
    role: "Engenheiro de Produtos",
    company: "Google",
    result: "Confiança crescente semana a semana",
    source: "E-mail",
    text: "As aulas, as atividades práticas e o acompanhamento constante contribuíram bastante para o meu desenvolvimento. Me senti mais confiante a cada semana.",
  },
  {
    name: "Mariana Costa",
    role: "Gestora de Marketing",
    company: "Unilever",
    result: "Encaixou o plano na rotina sem abrir mão do resultado",
    source: "WhatsApp",
    text: "Consigo avançar mesmo nos dias mais corridos. O plano é direto e focado no meu contexto — é exatamente o formato que eu precisava para encaixar na rotina.",
  },
  {
    name: "Renata Nogueira",
    role: "Analista de Comunicação",
    company: "JPMorgan Chase",
    result: "Diferença real na carreira após melhorar comunicação",
    source: "E-mail · 2024",
    text: "As aulas foram essenciais para melhorar minha comunicação no trabalho. Passei a me expressar com muito mais clareza nas reuniões — e isso fez diferença real na minha carreira.",
  },
];
