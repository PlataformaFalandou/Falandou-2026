// "Situação em prática" (direção criativa §4.2 e §5.1): situação profissional →
// primeira versão → observação do professor → versão revisada.
//
// REGRA: são exemplos criados pela escola para mostrar como uma sessão trabalha.
// O componente sempre os identifica como "Exemplo de atividade" e avisa que não são
// material de aluno. Para usar material real, só com autorização e sem dados pessoais.
export type PracticeCase = {
  id: string;
  situation: string;
  objective: string;
  draft: string;
  note: string;
  revised: string;
};

export const PRACTICE_CASES: Record<string, PracticeCase> = {
  atraso: {
    id: "atraso",
    situation: "Avisar o cliente sobre um atraso no projeto",
    objective: "Dar a notícia com clareza, com o novo prazo e o próximo passo — sem soar defensivo.",
    draft: "Sorry, the project is late because we had some problems.",
    note: "A frase é clara, mas vaga e defensiva. O cliente quer saber o que muda e quando. Diga o novo prazo e o próximo passo.",
    revised: "We've hit a delay on the integration, so delivery will move to Friday. I'll send you a status update on Wednesday.",
  },
  followup: {
    id: "followup",
    situation: "Cobrar uma resposta por e-mail sem pressionar",
    objective: "Retomar o assunto com educação e terminar com um pedido concreto.",
    draft: "I write to know if you received my email about the proposal.",
    note: "“I write to know” é tradução literal de “escrevo para saber”. Em inglês, o follow-up abre retomando o assunto e fecha com um pedido claro, de preferência com prazo.",
    revised: "I'm following up on the proposal I sent on Monday. Could you let me know if you have any questions by Thursday?",
  },
  reuniao: {
    id: "reuniao",
    situation: "Abrir uma reunião com o time global",
    objective: "Apresentar a pauta e o resultado esperado em duas frases.",
    draft: "Let's start. Today we talk about the budget.",
    note: "Para falar do que vai acontecer na reunião, use “we're going to”. E diga o resultado esperado: assim todos sabem quando a reunião cumpriu o objetivo.",
    revised: "Let's get started. Today we're going to review the Q3 budget and agree on two cuts by the end of the call.",
  },
  decisao: {
    id: "decisao",
    situation: "Explicar uma decisão técnica para o time",
    objective: "Justificar a escolha com critérios, não com opinião.",
    draft: "We choose PostgreSQL because is better.",
    note: "Dois ajustes de forma — a decisão já foi tomada (“went with”) e toda frase precisa de sujeito (“because it”). E um de conteúdo: troque “better” pelos critérios que levaram à escolha.",
    revised: "We went with PostgreSQL because it handles our reporting queries better and the team already knows it well.",
  },
};
