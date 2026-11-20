// Perguntas frequentes — dados fora do componente de cliente para poderem ser
// importados por páginas de servidor (ex.: a home usa as 3 primeiras).
import { PRICE_FROM } from "@/data/plans";

export type FAQEntry = { q: string; a: string };

// Perguntas padrão, ordenadas pelas objeções principais (quanto custa, quanto tempo,
// funciona para mim). Páginas podem passar as suas via prop `items` (Arquitetura §4).
export const DEFAULT_FAQS: FAQEntry[] = [
  {
    q: "Qual é o investimento?",
    a: `Depende do seu objetivo. Profissionais que usam a Falandou para mudar de emprego relatam aumentos salariais de R$ 1.500 a R$ 4.000/mês. Quem consegue uma promoção ou transferência internacional costuma recuperar o investimento em menos de 60 dias. Os planos começam em ${PRICE_FROM}/mês — a consulta inicial é gratuita e é nela que você entende qual plano faz sentido para o que você quer alcançar.`,
  },
  {
    q: "Quanto tempo leva para ter resultado?",
    a: "O ciclo padrão é de 90 dias. Em média, os profissionais sobem 1 nível CEFR nesse período — o que representa, na prática, conseguir conduzir reuniões em inglês, passar por entrevistas internacionais ou liderar times globais com confiança. O resultado depende da frequência e do comprometimento, mas o plano é montado exatamente para o seu ritmo.",
  },
  {
    q: "Funciona para quem nunca estudou inglês ou está enferrujado?",
    a: "Sim. Atendemos profissionais de todos os níveis — do A1 (zero base) ao C1 (quase fluente que quer refinar). O exame CEFR no início do ciclo identifica exatamente onde você está. O plano é construído a partir daí, sem pressupor nada.",
  },
  {
    q: "Como funciona o exame CEFR?",
    a: "O CEFR é o padrão europeu de proficiência usado por Cambridge, IELTS e multinacionais. O exame avalia as quatro habilidades (reading, listening, speaking e writing) e posiciona você em um nível de A1 a C2. Com esse resultado, os professores montam um plano semanal para os próximos 90 dias. No final do ciclo, você refaz o exame e vê exatamente quanto evoluiu — em números.",
  },
  {
    q: "O inglês é focado em qual área profissional?",
    a: "No seu contexto específico. Seja você médico, engenheiro, gestor ou analista — o plano é montado com vocabulário, situações e objetivos do seu setor. Não ensinamos inglês genérico.",
  },
  {
    q: "Com que frequência acontecem as sessões?",
    a: "A frequência é definida no seu plano, de acordo com seus objetivos e disponibilidade. As sessões são individuais e agendadas diretamente com o professor. O acompanhamento pelo WhatsApp é contínuo durante toda a semana — você nunca fica sem suporte entre uma sessão e outra.",
  },
];
