# Jornada do visitante e navegação (nov/2026)

Revisão em 12 pontos: jornada, arquitetura da informação, clareza da navegação e facilidade de uso.
Prioridade seguida: continuação Método → Planos → WhatsApp; depois índice das páginas longas e testes no celular.

## Papel de cada página e continuação

| Página | Papel | Próximo passo |
|---|---|---|
| Home | Responder às dúvidas em sequência; atalhos para quem já sabe o que procura | Método, Planos ou Professores (atalhos) |
| Resultados | Prova medida | **Método** (antes: Planos) |
| Depoimentos | Prova de quem estudou | **Método** (antes: Planos) |
| Professores · Sobre · Vocabulário | Conhecer a escola / aprender | Método |
| Método | Como o ciclo funciona | Planos |
| Planos | Decidir | WhatsApp (contato) |

## Status ponto a ponto

| # | Ponto | Aplicado |
|---|---|---|
| 1 | Atalhos perto do início | `HomeShortcuts`, logo abaixo da abertura: **Entender o método**, **Ver planos**, **Conhecer professores**. |
| 2 | Situação mantida ao avançar | A situação escolhida (Reuniões, Entrevistas ou Apresentações) segue para **/metodo** ("Na prática, com a sua situação", com a frase revisada e o porquê) e para **/planos** ("Como [situação] entra no seu plano", só se o visitante escolheu). O botão do WhatsApp leva a mensagem da situação. A escolha fica só na aba (sessionStorage). Em /planos não se indica plano por conta própria: só se lembra, para Entrevistas, a regra já publicada do plano Urgente (data marcada). |
| 3 | Próximo passo da microaula | Na conclusão: **Ver como essa situação entra no plano** (botão principal) e **Treinar [situação] nas sessões** (WhatsApp). Abaixo, o texto exato da mensagem e "você confere e decide se envia". |
| 4 | Menu por intenção | Computador: **Começar** (Método e Planos, links diretos, a um clique), **Conhecer a escola ▾** (Professores, Resultados, Depoimentos, Sobre) e **Aprender ▾** (Blog, Vocabulário). As listas abrem com clique ou Enter e fecham com Esc (o foco volta ao botão), com clique fora ou ao sair com Tab. Gaveta do celular com os mesmos três grupos e títulos. |
| 5 | Continuação entre páginas | Tabela acima. Resultados e Depoimentos passaram a levar ao Método. |
| 6 | Rodapé em grupos | **Estudar na Falandou**, **Conhecer a escola**, **Conteúdos**, e Contato e Legal separados. Cada grupo é uma navegação com nome próprio. |
| 7 | Página atual identificável | Menu do computador: cor + traço sob o link (ou sob o grupo que contém a página) + `aria-current`. Listas e gaveta: ponto da marca + texto "você está aqui". Barra do celular: traço no topo + negrito. Índices: traço lateral + negrito na seção em leitura. |
| 8 | Barra do celular | **Testado em 320×640:** o fim do rodapé fica acima da barra; os botões do aviso de cookies também; sem rolagem lateral em Home, Método, Planos, Resultados e Sobre. Campos de formulário já rolam acima da barra (`scroll-margin`). |
| 9 | Índice em páginas longas | `PageIndex` em **/metodo** (Visão geral, Etapas, Uma sessão por dentro, Dúvidas; a seção "Uma sessão por dentro" passou para depois das Etapas, na ordem do índice) e em **/planos** (Planos, Comparar, Qual plano é para mim, Dúvidas, Para empresas). No celular, lista recolhida "Nesta página", que fecha ao escolher. **Testado.** |
| 10 | Contato pelo WhatsApp | Formulário de planos: a **mensagem que vai para o WhatsApp** aparece antes do envio e se atualiza com as respostas. Depois: "A mensagem ainda não foi enviada", link para abrir de novo, **Copiar mensagem** e o número da escola. As respostas ficam só no navegador até fechar a aba e **sobrevivem a recarregar a página (testado)**. O formulário curto (nome) também mostra a mensagem antes. Os botões laranja de fechamento dizem "mensagem pronta · você decide se envia". |
| 11 | Leitores de tela e teclado | Microaula: o foco vai para a etapa 2 e para a conclusão; a etapa é anunciada; "Escolher outra situação" devolve o foco às opções. Montar a frase: a seleção e a ordem atual são anunciadas. Listas do menu com `aria-expanded`. Foco visível global (`:focus-visible`). **Testado** por teclado e programaticamente; **não testado com um leitor de tela real** (NVDA/VoiceOver). |
| 12 | Comparação dos planos | Tabela "Os três planos, lado a lado" em /planos: para quem é, ritmo (sessões por mês e por semana), duração, mensalidade (25 e 50 min), valor por sessão, créditos e o que vem além do incluso. Tudo calculado de `src/data/plans.ts`. No celular, a tabela rola dentro da própria área. O formulário pede só nome, área e nível (objetivo é opcional) e "Editar informações" volta sem perder nada. |

## Pendências

- Testar com leitor de tela real (NVDA no Windows, VoiceOver no iPhone).
- Testar em aparelhos físicos pequenos (a verificação foi feita com o navegador em 320px e 375px).
