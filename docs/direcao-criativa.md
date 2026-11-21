# Direção criativa e gramática visual (nov/2026)

Complemento digital do manual de identidade. **Tudo o que é novo aqui (sistema do ponto, módulo "situação em prática", direção fotográfica) precisa ser validado com o manual da marca antes de virar regra definitiva.** Referência renderizada: `/design-system`.

## 1. Personalidade

**A mentora direta que prepara você para ocupar o seu espaço profissional.** Próxima, exigente e prática: orienta com confiança, sem parecer uma instituição distante.

Três características permanentes:

| Característica | Na prática | Evitar |
|---|---|---|
| **Clareza** | Título curto, explicação específica, chamada que antecipa a ação ("Abre o WhatsApp da equipe") | "Desbloqueie seu potencial" |
| **Proximidade** | Fala da situação de trabalho do leitor: "Sua próxima reunião pode virar o tema da próxima sessão." | Superioridade sem demonstração ("a melhor escola") |
| **Exigência construtiva** | Identifica o problema, mostra o exercício, explica o próximo passo | Promessa vaga ("em pouco tempo") |

O texto segue `docs/brand-voice.md`.

## 2. Sistema do ponto

O ponto final de **"Falandou."** é o elemento proprietário. Ele marca:

- o início de um **rótulo de seção** (classe `eyebrow`: texto neutro + ponto laranja);
- o início da **observação do professor** no módulo "situação em prática" (classe `dot`);
- uma **etapa em foco**, quando houver uma só.

Regras:

- **Uma ocorrência funcional por composição.** Nunca bolinhas decorativas espalhadas, padrões de pontos ou fundos pontilhados.
- Diâmetro de **0,5em** do texto que acompanha; cor `#FF6820` sobre fundo escuro, `#141414` sobre laranja.
- Versão vetorial: `.dot` e `.eyebrow::before` em `src/app/globals.css`. O logo continua com o ponto do próprio logotipo.

✗ Errado: um ponto em cada card, ponto como enfeite ao lado de título, ponto + ícone + selo na mesma linha.

## 3. Tom visual

- **Laranja orienta a leitura, não ocupa a tela.** Só no CTA principal, em **uma** expressão do título e no ponto.
  - Rótulos de seção, números grandes e bordas de cards ficam neutros.
  - Única exceção: a borda do plano recomendado.
- **Sem brilhos.** Saíram o brilho radial do hero, os degradês alaranjados (rodapé, roteiro, destaque do blog) e a foto com camada laranja do fechamento.
- **Linguagem editorial:** alinhamento à esquerda, hierarquia clara e bordas discretas, como um material de trabalho bem preparado (título → exemplo → anotação → conclusão).
- **Proximidade sem infantilizar:**
  - ícones de traço (lucide) no lugar de emojis (❌ ✅ 🔍 🎯 saíram);
  - cápsulas só para ações e etiquetas curtas;
  - cards com cantos de 16px;
  - sem personagens caricatos, troféus ou confete.

## 4. Módulo recorrente: "situação em prática"

Componente `PracticeCaseCard` com dados em `src/data/practiceCases.ts`. Estrutura fixa, conteúdo variável:

1. **Situação profissional** ("Avisar o cliente sobre um atraso no projeto");
2. **Primeira versão** da frase;
3. **Observação do professor**, marcada pelo ponto, aparecendo depois do exemplo;
4. **Versão revisada**.

Onde está:

| Página | Situação |
|---|---|
| Home (hero, desktop) | atraso no projeto |
| /metodo | follow-up por e-mail, com o diagrama ideia → frase → fala → feedback |
| /para/gestores | abrir uma reunião com o time global |
| /para/engenheiros | explicar uma decisão técnica |

Regras:

- **Sempre identificado** como "Exemplo de atividade", com a nota "Exemplo criado pela escola… Não é material de aluno".
- Material real só anonimizado e **com autorização**. Nunca apresentar conversa simulada ou resultado inventado como prova de aluno.
- **Um exemplo por seção.** A home não vira coleção de exercícios.
- **Inglês revisado por um segundo professor** antes de publicar (`docs/brand-voice.md`, seção 10).

Para criar um novo: adicione um item em `practiceCases.ts`. Em uma página de perfil, use `practice: { key, intro }` nos dados da página.

## 5. Conceito criativo: "O inglês da sua próxima situação"

- Cada página de público começa por uma **situação concreta**, mostra o que será praticado e traz um exemplo do trabalho pedagógico.
- Gestores: conduzir uma reunião. Engenheiros: explicar uma decisão técnica.
- ✗ Errado: duas páginas iguais em que só muda o nome da profissão.

## 6. Movimento

- Animação **revela uma sequência ou explica uma mudança**: a observação do professor e a versão revisada aparecem depois do exemplo.
- **Números estáveis:** a contagem animada dos indicadores saiu.
- Controles: transições de 150–250ms. `prefers-reduced-motion` desliga as animações.
- ✗ Errado: animações contínuas ao lado de texto longo, elementos pulsando, números "correndo".

## 7. Fotografia (direção para a produção própria)

**Situação atual:** as fotos dos cards de público e da seção de professores não têm origem documentada. A prioridade é substituí-las por um acervo próprio.

**O que fotografar (3 situações):**

1. Preparação individual (o profissional com o material, anotando);
2. Sessão com o professor (escuta, correção, discussão de material);
3. Prática de apresentação.

Também retratos dos professores com fundo neutro.

**Captação e tratamento:**

- **Luz e cor:** luz suave lateral, pele com aparência natural, ambiente organizado, cores moderadas.
- **Laranja** só em objetos reais da cena (um caderno, uma caneca), nunca como camada sobre a foto.
- **Expressões:** atenção, dúvida, entendimento. ✗ Evitar pose de comemoração ou sorriso para a câmera.
- **Enquadramento:** cada cena em horizontal e vertical, com área livre para composição.
  - Sem texto sobre rostos.
  - Não cortar mãos quando o gesto explica a cena.
- **Legendas:** explicam a atividade ("Correção de pronúncia na apresentação de resultados"), não só o nome da pessoa.
- **Autorização:** de imagem por escrito de cada pessoa; materiais de aula sem dados pessoais.

## 8. Ilustração

- **Ilustração que ensina:** diagramas de comunicação profissional, não desenhos decorativos de pessoas com notebook. Exemplos no site: ciclo do método (/metodo), ideia → frase → fala → feedback (/metodo), escala CEFR.
- **Estilo:** tipografia da marca, formas simples, ícones de traço uniforme e laranja só no elemento em foco.
- **Teste:** se a ilustração puder sair sem perda de entendimento, ela não deveria estar ali.

## 9. Gramática por peça (manter / evitar)

| Peça | Manter | Evitar |
|---|---|---|
| **Hero** | Título com uma expressão em laranja; explicação de 1–2 linhas; CTA primário + secundário; prova curta; no desktop, uma "situação em prática" ao lado | Foto genérica, brilhos, selos e números competindo com o título |
| **Card profissional** | Foto em cima, texto embaixo; função em rótulo neutro; dor e ganho com ícones de traço | Texto longo sobre a foto, emojis |
| **Atividade demonstrativa** | As 4 partes, rótulo "Exemplo de atividade", nota de origem | Conversa simulada apresentada como real |
| **Retrato** | Fundo neutro, credenciais e especialidade concretas | "Professor qualificado" sem especialidade, selfie |
| **Depoimento** | Nome completo, cargo, empresa, texto verbatim, selo CEFR só com dado real | Só o primeiro nome, frase editada |
| **Peça de campanha** | Uma situação de trabalho, uma frase em inglês antes/depois, o ponto como marcador, CTA claro | Promessa vaga, laranja em tudo, troféu ou confete |

## 10. Pendências (dependem da escola)

1. **Validar** o sistema do ponto e o módulo "situação em prática" com o manual de identidade.
2. **Produção fotográfica própria** (seção 7) e troca das imagens atuais.
3. **Exemplos reais de preparação de sessão** dos professores, autorizados e anonimizados, para complementar os exemplos criados pela escola.
4. **Vídeos curtos de apresentação** de cada professor (30–60 s).
