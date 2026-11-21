// Situações da microaula interativa (direção "o inglês ganhando forma diante de você").
//
// REGRA: exemplos didáticos criados pela escola — sempre identificados como tal na interface.
// O resultado da atividade NUNCA atribui nível CEFR: diz só "Você explorou esta situação".
// Inglês revisado por um segundo professor antes de publicar (docs/brand-voice.md §10).
//
// Áudio: hoje a frase é lida pela voz em inglês do navegador. Para usar uma gravação da escola,
// preencha `audio` com o caminho do arquivo em /public/audio (ex.: "/audio/reuniao-v1.mp3").

export type SituationId = "reunioes" | "entrevistas" | "apresentacoes";

export type Choice = {
  text: string;
  best: boolean;
  /** Explicação em português: clareza, intenção e formalidade. */
  why: string;
};

export type Situation = {
  id: SituationId;
  label: string;
  /** A situação, em uma frase, do ponto de vista do visitante. */
  prompt: string;
  /** Revisão visual (abertura): primeira versão → versão revisada. */
  draft: string;
  revised: string;
  /** Observação do professor sobre a revisão. */
  note: string;
  choices: Choice[];
  /** Montar a frase: blocos e ordens aceitas (todas corretas). */
  blocks: string[];
  accepted: string[][];
  /** Pontuação final acrescentada depois dos blocos (quando nenhum bloco a carrega). */
  end?: string;
  /** Explicação da intenção da frase montada. */
  builderNote: string;
  /** Contexto do contato pelo WhatsApp. */
  whatsapp: string;
  audio?: string;
};

export const SITUATIONS: Situation[] = [
  {
    id: "reunioes",
    label: "Reuniões",
    prompt: "Você precisa discordar de um prazo na reunião.",
    draft: "This deadline is impossible.",
    revised: "I'm not sure Friday is realistic. Could we look at the timeline together?",
    note: "Discordar sem fechar a conversa: diga a dúvida com cuidado e proponha o próximo passo. Assim você discorda do prazo, não da pessoa.",
    choices: [
      {
        text: "This deadline is impossible.",
        best: false,
        why: "É claro, mas soa como uma recusa. Em reunião, fecha a conversa e coloca o outro na defensiva.",
      },
      {
        text: "I'm not sure Friday is realistic. Could we look at the timeline together?",
        best: true,
        why: "Mostra a dúvida (“I'm not sure”) e já propõe o próximo passo. A intenção fica clara e o tom é colaborativo.",
      },
      {
        text: "Maybe… I don't know… perhaps it's a bit difficult, sorry.",
        best: false,
        why: "Cuidadoso demais: tanto “maybe” e “perhaps” escondem a mensagem, e o pedido de desculpas enfraquece o seu ponto.",
      },
    ],
    blocks: ["Could we", "review", "the deadline", "together?"],
    accepted: [["Could we", "review", "the deadline", "together?"]],
    builderNote: "“Could we…?” transforma a discordância em convite. Pedir para revisar juntos mantém a parceria e abre espaço para negociar.",
    whatsapp: "Olá! Quero treinar inglês para reuniões — principalmente para discordar e negociar prazos. Como funciona?",
  },
  {
    id: "entrevistas",
    label: "Entrevistas",
    prompt: "O recrutador pergunta: “Why should we hire you?”",
    draft: "Because I need this job.",
    revised: "I've led three cross-border projects, and I can bring that experience to your team.",
    note: "A pergunta é sobre o que você entrega, não sobre o que você precisa. Responda com uma prova concreta e ligue a prova à vaga.",
    choices: [
      {
        text: "Because I need this job.",
        best: false,
        why: "É sincero, mas fala da sua necessidade. O recrutador quer saber o valor que você traz para a equipe.",
      },
      {
        text: "I'm very hardworking, and I'm a team player, and I learn fast.",
        best: false,
        why: "São qualidades genéricas, sem prova. Qualquer candidato pode dizer o mesmo.",
      },
      {
        text: "I've led three cross-border projects, and I can bring that experience to your team.",
        best: true,
        why: "Traz uma prova (“three cross-border projects”) e liga a experiência à vaga (“to your team”). Clara, objetiva e profissional.",
      },
    ],
    blocks: ["I can bring", "five years of", "project experience", "to your team"],
    accepted: [
      ["I can bring", "five years of", "project experience", "to your team"],
      ["I can bring", "to your team", "five years of", "project experience"],
    ],
    end: ".",
    builderNote: "“I can bring … to your team” mostra contribuição, não necessidade. A ordem “to your team five years of project experience” também é aceita em inglês, mas soa menos natural na fala.",
    whatsapp: "Olá! Tenho uma entrevista em inglês e quero me preparar. Como funciona?",
  },
  {
    id: "apresentacoes",
    label: "Apresentações",
    prompt: "Você terminou os resultados e precisa passar para o próximo tópico.",
    draft: "Now, next slide.",
    revised: "That covers the results. Now let's look at what this means for next quarter.",
    note: "Uma boa transição fecha o tópico anterior e anuncia o próximo. O público acompanha o raciocínio, não só os slides.",
    choices: [
      {
        text: "Now, next slide.",
        best: false,
        why: "Muda de assunto sem explicar a ligação. O público perde o fio do raciocínio.",
      },
      {
        text: "That covers the results. Now let's look at what this means for next quarter.",
        best: true,
        why: "Fecha o tópico (“That covers…”) e anuncia o próximo (“Now let's look at…”). É a estrutura de transição mais usada em apresentações.",
      },
      {
        text: "OK, so, um, the next thing is maybe the plan.",
        best: false,
        why: "As hesitações (“um”, “maybe”) passam insegurança, e a frase não diz por que o plano importa.",
      },
    ],
    blocks: ["Now", "let's look at", "the plan", "for next quarter."],
    accepted: [["Now", "let's look at", "the plan", "for next quarter."]],
    builderNote: "“Now let's look at…” anuncia o próximo tópico e convida o público a acompanhar. É uma das transições mais úteis em qualquer apresentação.",
    whatsapp: "Olá! Quero treinar inglês para apresentações. Como funciona?",
  },
];

export function getSituation(id: SituationId): Situation {
  return SITUATIONS.find((s) => s.id === id) ?? SITUATIONS[0];
}
