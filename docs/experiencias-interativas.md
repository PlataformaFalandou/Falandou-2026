# Experiências interativas: "o inglês ganhando forma diante de você" (nov/2026)

O visitante escolhe uma situação profissional, experimenta uma atividade e vê como a escola transforma uma ideia em comunicação. Conteúdo em `src/data/situations.ts`; componentes em `src/components/interactive/`.

**Regras fixas**
- **Exemplos didáticos.** Tudo é identificado como exemplo criado pela escola, nunca como material de aluno.
- **Sem nível CEFR.** A atividade não atribui nível: diz só "Você explorou esta situação".
- **Inglês revisado** por um segundo professor antes de publicar (`docs/brand-voice.md` §10).
- **Nada bloqueia o acesso** aos planos ou ao contato. Sem JavaScript, o resto do site continua inteiro.

## Status ponto a ponto

| # | Ponto | Aplicado |
|---|---|---|
| 1.1 | Ponto da marca como guia | No diagrama ideia → frase → fala → feedback (/metodo), as etapas são selecionáveis, e um único ponto percorre o trilho até a etapa escolhida (300ms). O texto fica imóvel. Movimento reduzido: só a etapa muda. O logotipo não é animado. |
| 1.2 | Abertura que demonstra | No hero da home (desktop), o `HeroDemo` mostra a situação, a primeira versão e o botão "Ver como trabalharíamos essa frase". A revisão aparece com a observação do professor. A altura do painel não muda (os dois estados ficam na mesma célula), e não há efeito de digitação. **Testado.** |
| 1.3 | Personalização por contexto | Escolha Reuniões / Entrevistas / Apresentações (`SituationTabs`, teclado ← →). A escolha troca o exemplo, a frase e a mensagem do WhatsApp do botão principal. Fica guardada só durante a visita (sessionStorage); nada é inferido nem enviado para medição. **Testado:** o contato do hero muda com a situação. |
| 2.1 | Microexperiência | Seção "Experimente" na home (`MicroLesson`): 3 respostas → explicação de clareza, intenção e tom → ouvir a frase → montar a frase → conclusão. Leva de 30 a 45 segundos, sem cadastro. **Testado** nas 3 situações. |
| 2.2 | Ciclo explorável | `MethodCycle` (/metodo). No desktop, os 5 pontos do círculo são abas (clique e ← →) com painel abaixo: o que acontece, sua participação e o que a escola entrega. No celular, vira lista expansível. **Testado** com teclado. |
| 2.3 | Montar a frase | `SentenceBuilder`: 4 blocos; arrastar com mouse, ou tocar/selecionar e usar "Mover antes / Mover depois". Aceita ordens alternativas corretas (ex.: "I can bring to your team five years of project experience") e explica a diferença. **Testado:** arraste, botões, dica de erro e ordem alternativa. |
| 3.1 | 3D com significado | **WebGL não adotado.** O próprio texto recomenda começar com CSS e só usar WebGL se a experiência exigir câmera, luz ou geometria. A escolha de situação com profundidade em CSS cumpre o papel do "mapa de situações" sem canvas. Textos e ações ficam sempre em HTML. |
| 3.2 | Profundidade controlada | Nos botões de situação da microaula: até ~3° de inclinação e 6px de deslocamento, só com mouse. No toque, seleção direta, sem depender do movimento do aparelho. Desligado com movimento reduzido. |
| 3.3 | 3D opcional | Não se aplica sem WebGL. Se um módulo 3D for criado no futuro: carregar sob demanda ("Explorar"), com composição estática antes, pausa fora da tela e alternativa estática se o contexto gráfico falhar. |
| 4.1 | Encaixe com mola | O bloco que muda de posição se acomoda em 240ms com uma oscilação mínima. O estado muda na hora; a animação só acompanha. |
| 4.2 | Arraste com intenção | O bloco arrastado sobe 4px e um marcador laranja mostra onde vai entrar. Soltar fora da área ou apertar Esc cancela. Sem inércia. No toque não há arraste: a rolagem vertical continua livre, e os botões fazem o movimento. |
| 4.3 | Conclusão própria | `CompletionMark`: três pontos convergem para o ponto da marca e aparece "Situação concluída" (500ms, uma vez, sem bloquear os botões). Movimento reduzido: ponto e texto estáticos. Usado só para conclusão de atividade. |
| 5.1 | Pronúncia | `ListenButton` com estados visíveis: Ouvir → Carregando… → Pausar / Continuar → Tentar de novo. Só a frase em inglês vai para a voz (`lang="en-US"`); as explicações ficam em português. **Testado:** carregou e tocou com voz em inglês do navegador. |
| 5.2 | Som + leitura | A frase tocada ganha um fundo discreto, sem mover o texto. O destaque é por frase, não por palavra, porque não há dados de temporização. O áudio só começa com uma ação do visitante; outro áudio interrompe o anterior; sair da seção, ocultar a aba ou trocar de página encerra a fala. **Testado.** A transcrição fica sempre na tela. |
| 5.3 | Identidade sonora | `src/lib/sfx.ts`: dois sinais gerados na hora (encaixe ~100ms, conclusão ~320ms). Ficam desligados por padrão, com o controle "Sons da experiência" (guardado neste navegador). Nenhum som em hover, rolagem ou abertura; silêncio durante a fala. A pronúncia funciona com os sons desligados. |
| 6.1 | Animação que explica | Revisão da frase: o trecho original é riscado e a substituição entra (≈600ms); "Ver de novo" repete. Com movimento reduzido, tudo aparece direto. |
| 6.2 | Jornada controlável | `Journey` (home): o avanço automático saiu. Cada etapa tem "Ver um exemplo" (clique/toque) com um caso ilustrativo. No celular, a rolagem só indica a etapa em leitura. O destaque é uma etapa da explicação, não progresso real. |
| 6.3 | Coordenação | Áudio com estados explícitos (idle, loading, playing, paused, error); a microaula por etapas (escolha, montagem, concluído). Fala e animações param fora da tela e ao trocar de página. **Testado** em 320–1.440px sem rolagem lateral, mais teclado, toque (botões) e clique. Movimento reduzido verificado pelas regras de CSS, não testado com o sistema configurado. |

## Áudio: hoje e o recomendado

- **Hoje:** a frase é lida pela voz em inglês do navegador (Web Speech API). A voz muda de aparelho para aparelho e, em alguns, pode não existir. Nesse caso aparece "Tentar de novo" e a frase continua escrita na tela.
- **Recomendado:** gravar as frases (um professor da escola ou uma voz sintética escolhida) e salvar em `/public/audio/`. Depois, preencher `audio: "/audio/nome.mp3"` em `src/data/situations.ts`. O componente passa a usar a gravação automaticamente, sem outra mudança. Versionar o nome do arquivo quando o texto mudar (ex.: `reuniao-v2.mp3`).

## Como adicionar uma situação

Acrescentar um item em `SITUATIONS` (`src/data/situations.ts`) com:
- `prompt`, `draft`, `revised` e `note`;
- 3 `choices`, com uma `best`;
- os `blocks` da frase e as ordens aceitas em `accepted`;
- `builderNote` e a mensagem de `whatsapp`.

Se for uma quarta situação, revisar o tipo `SituationId` e a leitura em `src/lib/situationStore.ts`.
