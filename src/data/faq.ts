// Perguntas frequentes — dados fora do componente de cliente para poderem ser
// importados por páginas de servidor (a home usa as 6).
import { PRICE_FROM } from "@/data/plans";
import { STATS } from "@/data/stats";

export type FAQEntry = { q: string; a: string };

// Copywriting §8 — ordem pela jornada de objeção: entender o produto → redimir
// tentativas anteriores → agenda → credibilidade (CEFR) → risco → investimento (por último:
// quem chega aqui já quer comprar). A home responde "o que é"; o FAQ de /metodo
// responde "como funciona" — sem perguntas repetidas entre os dois.
// A escola NÃO oferece consulta gratuita: nenhuma resposta deve prometer isso.
export const DEFAULT_FAQS: FAQEntry[] = [
  {
    q: `O que é exatamente o ciclo de ${STATS.cycleDays} dias?`,
    a: `É o formato da Falandou: um exame CEFR diagnóstico no início, um plano individual montado para o seu cargo e o seu setor, sessões 1 a 1 ao vivo com um professor fixo e, no fim dos ${STATS.cycleDays} dias, o mesmo exame de novo. Você começa sabendo onde está e termina sabendo quanto avançou — em nível CEFR.`,
  },
  {
    q: "Funciona para quem já tentou e não conseguiu resultado?",
    a: "É justamente o perfil mais comum aqui. Aplicativo, aula em grupo e vídeo gravado melhoram o inglês um pouco, mas não foram feitos para o inglês do seu trabalho. O ciclo parte do diagnóstico do que trava você — e cada sessão treina as situações que você vai encontrar na semana seguinte.",
  },
  {
    q: "Quanto tempo por semana preciso dedicar?",
    a: "Depende do plano: de 1 a 4 sessões individuais por semana, de 25 ou 50 minutos cada, no horário que você combina com o professor. Entre as sessões, as atividades práticas levam de 20 a 30 minutos por dia. A de 25 minutos foi pensada para agendas apertadas.",
  },
  {
    q: "Como funciona o exame CEFR?",
    a: "O CEFR é o padrão europeu de proficiência usado por Cambridge, IELTS e multinacionais. O exame avalia as quatro habilidades (reading, listening, speaking e writing) e posiciona você em um nível de A1 a C2. Com esse resultado, os professores montam o plano dos próximos 90 dias. No final do ciclo, você refaz o exame e vê exatamente quanto evoluiu — em números.",
  },
  {
    q: `E se eu não conseguir resultado em ${STATS.cycleDays} dias?`,
    a: "Revisamos o plano juntos. O ciclo é individual — se algo não avançou como esperado, o professor identifica o gap e ajusta antes do próximo ciclo. O exame CEFR no início e no fim existe exatamente para tornar isso mensurável, não subjetivo.",
  },
  {
    q: "Qual é o investimento?",
    a: `Os planos começam em ${PRICE_FROM}/mês, com sessões individuais de 25 ou 50 minutos e desconto para compromisso de 6 ou 12 meses. Profissionais que usam a Falandou para mudar de emprego relatam aumentos salariais de R$ 1.500 a R$ 4.000/mês. Conte à equipe o seu objetivo e o seu prazo: ela indica o plano que faz sentido para o seu caso.`,
  },
];
