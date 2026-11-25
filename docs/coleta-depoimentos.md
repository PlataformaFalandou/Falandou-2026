# Coleta de depoimentos ao fim do ciclo (Arquitetura da Informação §7)

Depoimentos são o principal redutor de risco para quem está decidindo. Para o site
mostrar **resultado** (não só satisfação), a coleta precisa acontecer sempre, no mesmo
momento e com os mesmos dados.

## Quando

Logo depois do **exame CEFR de evolução** (fim dos 90 dias), quando o profissional
acabou de ver o resultado em número.

## Mensagem modelo (WhatsApp)

> Oi, {nome}! Parabéns pelo ciclo — você foi de **{nível inicial}** para **{nível final}**.
> Queremos usar histórias reais como a sua para ajudar outros profissionais a decidir.
> Você topa responder 3 perguntas rápidas? Leva 2 minutos.
>
> 1. O que você consegue fazer hoje em inglês no trabalho que não conseguia antes do ciclo?
> 2. Qual foi a situação concreta em que você percebeu a diferença? (uma reunião, uma entrevista, um e-mail…)
> 3. Em uma frase: o que fez diferença na Falandou para você?
>
> Se quiser, grave também um vídeo curto (até 30 segundos) respondendo a pergunta 1.

## Autorização de uso (LGPD)

Peça a autorização **por escrito** (pode ser a resposta no próprio WhatsApp) e guarde-a:

> Autorizo a Falandou Escola de Inglês a publicar meu depoimento, com meu nome, cargo,
> empresa {e vídeo}, no site e nas redes da escola. Posso pedir a remoção a qualquer
> momento pelo contato@falandou.com.

- Pergunte separadamente se a pessoa aceita mostrar o **nome da empresa** — algumas
  empresas não permitem.
- Se a pessoa pedir remoção, retire o depoimento do site no próximo deploy.

## Como cadastrar no site

Edite `src/data/testimonials.ts` e acrescente um item:

| Campo | O que colocar |
|---|---|
| `name`, `role`, `company` | Nome, cargo e empresa (empresa só com autorização) |
| `result` | O resultado concreto, em uma linha — resposta à pergunta 1 |
| `text` | O depoimento, com as palavras da pessoa (sem reescrever o sentido) |
| `source` | Canal e ano aproximado, ex.: `WhatsApp · 2026` |
| `levelBefore`, `levelAfter` | Nível CEFR do exame inicial e final (ex.: `B1`, `B2`) — **só o dado real** |
| `cycle` | Duração do ciclo, ex.: `90 dias` |
| `persona` | Um de: `Reuniões e apresentações`, `Entrevista e processo seletivo`, `Promoção e liderança`, `Trabalho no exterior` |
| `videoId` | ID do vídeo no YouTube (a parte depois de `v=`), se houver |
| `featured` | `true` para aparecer na home (no máximo 3 no total) |

O filtro por perfil da página /depoimentos aparece sozinho quando houver pelo menos
2 perfis com 2 depoimentos cada.

## Vídeo curto (até 30 s)

- Celular na vertical ou horizontal, em local silencioso, com o rosto bem iluminado.
- Começar pelo resultado: "Hoje eu conduzo reuniões com o time de fora…".
- Publicar no canal @falandou (pode ser não listado) e colar o ID em `videoId`.

## Prioridade agora: dois depoimentos que faltam (Copywriting §6)

O site já afirma dois resultados que ainda não têm um depoimento com nome por trás.
Peça a alunos que viveram isso — **nunca escreva o texto por eles nem arredonde números**.

1. **Processo seletivo** (sustenta o "70% aprovados em seletivas com etapa em inglês").
   Pergunta: "Quantas etapas em inglês você fez, em quanto tempo desde o início, e qual foi o resultado?"
   Formato que funciona: *"Fui aprovado em três etapas em inglês seis meses depois de começar. Consegui a vaga."*
   Cadastrar com `persona: "Entrevista e processo seletivo"`.
2. **Retorno financeiro** (sustenta o "aumento de R$ 1.500 a R$ 4.000/mês").
   Pergunta: "O inglês teve impacto no seu salário? Em quanto tempo o aumento pagou o que você investiu?"
   Formato que funciona: *"O aumento salarial pagou 14 meses de Falandou."* — só com o número real do aluno.

Em todos os cartões, o formato ideal é: **nome · cargo atual · empresa (ou setor) · nível CEFR antes → depois**.
Os níveis só entram se vierem do exame, não da memória do aluno.

Também ajudam as páginas de perfil: depoimentos de **engenheiros/arquitetos** e de **gestores**
alimentam `/para/engenheiros` e `/para/gestores` (campo `testimonialNames` em cada página).
