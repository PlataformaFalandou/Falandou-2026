# Posicionamento e oferta: aplicação (nov/2026)

Este é um documento interno. Ele aplica o PDF "Posicionamento e Oferta — Escola Falandou" (20/11/2026) aos **planos e preços reais**.

O PDF partiu de dados que não são os da escola:
- planos de 2x, 3x e 5x por semana a R$ 184,90, R$ 299,90 e R$ 429,90;
- "consulta gratuita";
- turma;
- "vagas do próximo ciclo com data".

Aqui as contas e o texto foram refeitos com o que vale hoje.

## 1. O que já foi aplicado no site

| Ponto do PDF | No site |
|---|---|
| 1. Diferencial como mecanismo | /sobre ganhou a seção "Por que o 1 a 1 muda o resultado": um parágrafo de causa e efeito e 4 diferenciais, cada um com o que é e por que importa. |
| 2. Nomes por objetivo | Planos renomeados para **Consistência** (Starter), **Resultado** (Professional) e **Urgente** (Intensive). A troca vale só para o site novo: no falandou.com e na Plataforma do Aluno continuam os nomes antigos. |
| 2. Diferencial qualitativo por plano | **Não aplicado.** As sugestões do PDF (estudo assíncrono, simulações, feedback no dia 30) não existem hoje, então os cartões mantêm os itens reais. |
| 2. Plano anual com valor explícito | Cada cartão mostra a mensalidade no compromisso de 12 meses (20% de desconto) e a economia no ano. O FAQ traz um exemplo. |
| 3. Preço depois do valor | Na home, o preço aparece só no FAQ (na última pergunta, depois do retorno) e no CTA final, junto com o retorno. Em /planos aparece "menos de R$ 4,50 por dia". |
| 3. Âncoras "aula avulsa R$ 80–200" e "diferença salarial média R$ 2.500" | **Não aplicado.** São números de mercado sem fonte. O site usa os relatos de alunos que já estão publicados (R$ 1.500–4.000/mês). |
| 7. Regras | Publicadas em /planos, /metodo e /termos: reagendamento com 24h, pausa de até 30 dias e máximo de 25 alunos por professor. |
| 8. Escassez estrutural | "Até 25 alunos por professor" aparece em /planos, /sobre e /metodo. Não há "vagas do próximo ciclo com data", porque o ciclo começa quando o aluno começa. |
| 8. Consulta gratuita | **Não aplicado.** A escola não oferece. |
| 10. Eventos de conversão | Já existiam: clique no WhatsApp, visita a /planos e rolagem de 50%. Novo: tempo em /planos (30 s e 90 s), como `plans_engaged` no GA4 e `PlansEngaged` no Pixel. |
| 11. Termos, privacidade e política visível | /termos e /politica-de-privacidade estão no rodapé. O resumo das regras dos planos aparece em /planos e /termos. |

## 2. Custos e margens com os planos reais

Premissas (ajuste se forem diferentes):

- **Professor externo:** R$ 45 por sessão de 50 min e R$ 25 por sessão de 25 min. O valor de 50 min é a estimativa do PDF; o de 25 min foi feito proporcional.
- **Taxa de pagamento:** cerca de 4,4% (Stripe com IOF). Um meio de pagamento nacional fica em 2–2,5%.
- **Tributos:** 6% no Simples, como serviço educacional. **Validar com o contador.**
- **Custos fixos rateados:** cerca de R$ 8 por aluno por mês (hospedagem, domínio, e-mail e agenda).

| Plano | Mensalidade | Sessões/mês | Custo do professor | Margem com professor externo | Margem com professor próprio | Máximo por sessão sem prejuízo | Preço para 40% de margem com externo |
|---|---|---|---|---|---|---|---|
| Consistência (Starter) · 25 min | R$ 135 | 4 | R$ 100 | R$ 13 (10%) | R$ 113 (84%) | R$ 28 | R$ 218 |
| Consistência (Starter) · 50 min | R$ 185 | 4 | R$ 180 | -R$ 22 (-12%) | R$ 158 (85%) | R$ 39 | R$ 379 |
| Resultado (Professional) · 25 min | R$ 169 | 8 | R$ 200 | -R$ 56 (-33%) | R$ 144 (85%) | R$ 18 | R$ 419 |
| Resultado (Professional) · 50 min | R$ 305 | 8 | R$ 360 | -R$ 95 (-31%) | R$ 265 (87%) | R$ 33 | R$ 742 |
| Urgente (Intensive) · 25 min | R$ 319 | 16 | R$ 400 | -R$ 122 (-38%) | R$ 278 (87%) | R$ 17 | R$ 823 |
| Urgente (Intensive) · 50 min | R$ 579 | 16 | R$ 720 | -R$ 209 (-36%) | R$ 511 (88%) | R$ 32 | R$ 1.468 |

**Leitura:**

- A conclusão do PDF se mantém com os números reais. **Com professor externo a R$ 45 (50 min) ou R$ 25 (25 min) por sessão, só o plano Consistência de 25 min fica positivo.** Os demais dão prejuízo.
- A coluna "máximo por sessão sem prejuízo" é o teto que cada plano aguenta pagar ao professor. Exemplo: o Resultado de 50 min aguenta pagar cerca de R$ 33 por sessão.
- Quando o próprio dono dá a aula, a margem fica entre 84% e 88%. Mas a receita tem teto: 25 alunos por professor.

## 3. Caminhos de preço (decisão da escola; nada mudou no site)

1. **Ajuste incremental** (cenário 1 do PDF): aumento de 30% a 40% nos planos. Ainda não sustenta professor externo a R$ 45.
2. **Reposicionamento premium** (cenário 2): preços na faixa da coluna "preço para 40% de margem" da tabela acima.
3. **Mudar o modelo:** concentrar a venda nas sessões de 25 min (custo menor por sessão) ou rever o valor pago ao professor por sessão.

Se houver reajuste:
- anunciar como "novo ciclo 2026", com melhorias concretas;
- congelar o preço para quem renovar antes da data do reajuste;
- justificar pelo resultado (79% sobem 1 nível CEFR), nunca pelo custo.

## 4. Desconto e retenção

**Política vigente (não mudar sem decisão da escola):**
- Compromisso de 6 meses: 10% de desconto. Compromisso de 12 meses: 20%.
- Indicação: 4 sessões bônus para quem indica e para quem é indicado. O PDF sugeria "1 mês grátis".
- Nunca dar desconto só porque o aluno pediu, porque isso derruba o preço médio.

**Momento crítico: o dia 90 (fim do 1º ciclo).** Roteiro:

1. Por volta do dia 75, o professor apresenta o próximo nível como meta concreta: "Você está chegando ao B2. Para o C1, o plano é este…".
2. No exame final, mostrar o resultado e perguntar: "O B2 abre estas portas; o C1 abre estas outras. Qual é o seu próximo objetivo?".
3. Para quem hesita por causa da agenda, oferecer a **pausa de até 30 dias** em vez do cancelamento.
4. No mês 2 do ciclo, quando a satisfação costuma estar no auge, lembrar o programa de indicação.

## 5. Vendas pelo WhatsApp (sem consulta gratuita)

Funil:
1. O visitante pede o roteiro de 30 dias (material gratuito) ou vai direto ao WhatsApp.
2. A equipe qualifica a pessoa por mensagem.
3. A equipe envia a proposta com o link de pagamento.

Roteiro de qualificação (por mensagem, não em consulta):

1. "Qual é o seu objetivo com o inglês nos próximos 6 meses?"
2. "O que você já tentou e por que não funcionou?"
3. "Como você avalia o seu nível hoje? Já fez algum teste?"
4. "Quais dias e horários você tem livres?"
5. Recomendar o plano e a duração da sessão, justificando com números: sessões até a data do aluno, preço por sessão e desconto de compromisso.
6. Fechar com: "Começando esta semana, em [N] semanas você chega a [data/evento] com [X] sessões feitas."

Use só urgência real: a data do aluno e o limite de 25 alunos por professor.

## 6. Métricas comerciais

| Métrica | Meta |
|---|---|
| Conversão de conversa no WhatsApp em matrícula | > 50% |
| Tempo médio de decisão | < 7 dias |
| CAC | < R$ 300 orgânico · < R$ 800 pago |
| Renovação após o 1º ciclo | > 50% |
| Churn mensal | < 5% |
| Alunos que sobem 1 nível CEFR | > 75% (hoje 79%) |
| NPS (formulário no fim do ciclo) | > 70 |
| Alunos que indicaram alguém | > 20% |

LTV estimado para o plano Resultado de 50 min (R$ 305,20/mês), com ciclos de 3 meses e até 3 ciclos:
- renovação de 50%: **R$ 1.602**;
- renovação de 65%: **R$ 1.898**.

Aumentar a renovação rende mais do que comprar tráfego.

## 7. Tráfego pago

Antes de investir:
- configurar os IDs do GA4 e do Pixel nos secrets do GitHub (pendente do lado da escola);
- marcar como conversões no GA4 o clique no WhatsApp, `view_plans` e `plans_engaged`.

**Google Ads (pesquisa), canal prioritário.**
- Termos de intenção profissional: "aulas de inglês individuais", "inglês para entrevista de emprego", "inglês para reuniões", "inglês executivo".
- Os anúncios levam às páginas de cada momento (/ingles-entrevista, /ingles-executivo, /promocao-cargo, /ingles-expatriacao) e às de perfil (/para/engenheiros, /para/gestores).
- Início sugerido: R$ 1.000/mês por 60 dias, para medir o CAC real.

**Meta Ads (remarketing).**
- R$ 300–500/mês para quem visitou /planos (ViewContent ou PlansEngaged) e não clicou no WhatsApp.
- Detalhes em `docs/remarketing-meta.md`.

CAC sustentável na fase atual: cerca de R$ 250–350, considerando a margem com professor próprio.

## 8. Riscos e proteções

| Risco | Proteção |
|---|---|
| Falta de última hora | Regra de 24h publicada: aviso com menos de 24h conta como sessão realizada. |
| Cancelamento no meio do ciclo | Pausa de até 30 dias como alternativa, com as regras no contrato. |
| Dependência de um professor só | Documentar o método e uma rubrica CEFR padrão. Contratar o segundo professor antes de chegar a 20 alunos ativos. |
| Chargeback | Contrato aceito antes da cobrança, nome claro na fatura ("FALANDOU ESCOLA DE INGLES") e política de reembolso fácil de achar. |
| Inadimplência | Cobrança antes do início de cada ciclo; acesso suspenso se o pagamento falhar. |

**Documentos:**
- Termos do site e Política de Privacidade: **publicados**.
- Contrato de matrícula: **falta**. Ele deve ser enviado ao fechar o plano e trazer o plano contratado, a duração, as regras de cancelamento, reagendamento e pausa e os dados da escola. Redigir com advogado.

## 9. Próximas etapas

**Meses 1–3**
- Contrato de matrícula.
- Nome na fatura e política de reembolso configurados no meio de pagamento.
- GA4 e Pixel no ar.
- Google Ads de teste.
- NPS no fim do ciclo.
- Documentar o método.

**Meses 4–9**
- Segundo professor treinado.
- Decisão de preço (seção 3).
- Depoimentos em vídeo.
- Mensagem de boas-vindas pós-matrícula, por e-mail ou WhatsApp.

**Meses 10–18**
- Certificado próprio, referenciado ao CEFR.
- Vendas para empresas (já existe /planos#empresas).
- Conteúdo regular no YouTube.
- CRM simples.
