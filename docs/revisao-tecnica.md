# Revisão técnica: robustez, acessibilidade e rapidez (nov/2026)

São 18 recomendações em 6 assuntos. O que foi verificado no navegador está marcado como **testado**.

## 1. Menus e navegação

| Ponto | Aplicado |
|---|---|
| 1. Foco do menu móvel | A gaveta é um diálogo modal (`role="dialog"`, `aria-modal`). Com ela aberta, o resto da página fica inerte. Tab e Shift+Tab circulam só dentro do painel; Esc fecha; o foco volta ao botão que abriu. **Testado.** |
| 2. Rota e tamanho | O menu é "aberto nesta rota": trocar de página fecha sozinho. Passar para a largura de desktop fecha o menu. A trava de rolagem restaura o valor anterior de `overflow`. **Testado:** ampliar a janela com o menu aberto não deixa a página travada. |
| 3. Barra de progresso | Aparece só se a troca demorar mais de 150ms. Termina quando a rota confirma. Clique novo substitui o anterior; voltar no navegador cancela. Some sozinha depois de 8s se a navegação não concluir. Nunca bloqueia a troca de página. |

## 2. Carrossel de depoimentos

| Ponto | Aplicado |
|---|---|
| 1. Rolagem nativa | `scrollTo({ behavior: "smooth" })`. Saiu a animação manual que desligava e religava o encaixe. Arrastar interrompe a rolagem sem disputa. |
| 2. Card ativo | O card mais próximo do centro visível, pela posição real; recalculado ao rolar e ao redimensionar (`ResizeObserver`). O estado só muda quando o índice muda. |
| 3. Acessibilidade | Depois de navegar por seta ou teclado, uma região `aria-live="polite"` anuncia "Depoimento 2 de 3" (não durante o arraste). No desktop, a grade deixa de ser parada de foco e de se anunciar como carrossel. |

## 3. Formulários

| Ponto | Aplicado |
|---|---|
| 1. Erros e foco | Formulário "Qual plano é para mim?": cada erro tem id próprio (`useId`), está associado ao campo (`aria-describedby`, inclusive nos seletores), e o foco vai ao primeiro campo inválido. **Testado.** |
| 2. Abrir ≠ enviar | O estado agora é `handoffReady`: "Sua mensagem está pronta para enviar", com o botão "Abrir o WhatsApp" visível e "Editar informações" (os dados continuam preenchidos). O site nunca diz que a escola recebeu a mensagem. |
| 3. Menos coleta | No formulário das páginas de entrevista e expatriação, o campo "WhatsApp ou e-mail" saiu: a conversa já acontece no WhatsApp. Fica só o nome, opcional e editável. Os eventos de GA4 e Pixel registram só o contexto e a página, nunca o que foi digitado. |

## 4. Responsividade em celulares

| Ponto | Aplicado |
|---|---|
| 1. Larguras | **Testado** em 320, 360, 390, 768, 1.024 e 1.440px nas páginas home, /planos, /metodo, /para/gestores, /ingles-entrevista e no guia de inglês jurídico. Dois problemas foram corrigidos: um endereço longo no roteiro gratuito estourava a 320px, e os planos ficavam espremidos a 768px (agora rolam na horizontal até 1.024px). Sem `overflow-x: hidden` global; os itens de grade usam `min-width: 0`, e textos longos quebram (`overflow-wrap`). |
| 2. Barras fixas e teclado | Camadas compartilhadas em `globals.css` (`--z-header` 50, `--z-cookie` 54, `--z-overlay` 55, `--z-drawer` 56, `--z-progress` 70). O aviso de cookies fica acima da barra inferior e abaixo do menu. Campos com `scroll-margin` para aparecer acima do teclado e da barra. Hero com `dvh` (com fallback em `vh`). |
| 3. Toque e hover | Hover das classes próprias só em dispositivos com mouse (`@media (hover: hover)`; os `hover:` do Tailwind v4 já fazem isso). Links do rodapé com 44px de altura no celular. Foco visível em todo controle. |

## 5. Animações

| Ponto | Aplicado |
|---|---|
| 1. Visível por padrão | O estado oculto só vale com `<html class="reveal-on">`, que o observador põe depois de iniciar. O que já está na tela nesse momento aparece sem animação. Sem JavaScript, tudo aparece. O script do `<head>` saiu. Observadores são desconectados ao revelar e ao desmontar. |
| 2. Durações centrais | `--dur-fast` (120ms), `--dur-base` (180ms), `--dur-enter` (320ms) e as curvas em `globals.css`; os valores soltos nos componentes passaram a usar essas variáveis. Altura animada só no FAQ. |
| 3. Cancelamento e preferências | O carrossel usa rolagem nativa (nada a cancelar). Os cálculos com `requestAnimationFrame` são cancelados ao desmontar. A preferência "reduzir movimento" é acompanhada durante a visita (`useMediaQuery`, listener no observador). |

## 6. Velocidade

| Ponto | Aplicado |
|---|---|
| 1. Imagens | Loader próprio (`src/lib/imageLoader.ts`, configurado em `next.config.ts`): cada foto tem versões WebP de 256, 480 e 800px além do original de até 1.200px, e o `srcset`/`sizes` deixa o navegador escolher. No celular, uma foto de card cai de ~40KB para 5–13KB. Imagens abaixo da dobra carregam sob demanda (padrão do `next/image`). **AVIF não foi adotado:** exigiria `<picture>` com fallback, e as versões WebP já são pequenas. |
| 2. Menos JavaScript | `framer-motion` saiu do projeto (estava instalado sem uso). Os vídeos já usam miniatura com link, sem player embutido. JavaScript só nos trechos interativos. |
| 3. Medição e cache | O service worker não guarda páginas: navegação vai sempre à rede e só a página offline fica em cache; `sw.js` é servido sem cache (`.htaccess`). Portanto, um deploy novo aparece na hora. Os números de LCP, INP e CLS estão na seção abaixo. |

## Como adicionar uma foto

1. Salvar o original em WebP (até 1.200px de largura) em `public/images/nome.webp`.
2. Gerar `nome-256.webp`, `nome-480.webp` e `nome-800.webp`, por exemplo com o script Python usado nesta revisão (Pillow, qualidade 78).
3. Usar `<FadeImage src="/images/nome.webp" … sizes="…" />`.

## Medição (PageSpeed Insights, celular)

Metas: LCP ≤ 2,5s, INP ≤ 200ms, CLS ≤ 0,1.

**21/11/2026, site publicado, viewport de celular (375px, tela 2x):**

| Página | LCP | CLS | FCP |
|---|---|---|---|
| Home | 0,88s | 0,000 | 0,40s |
| /planos | 0,44s | 0,000 | 0,34s |

- **Imagens:** o navegador baixou as versões de 800px, o esperado para tela 2x (375 × 2 = 750px), em vez do original de 1.200px.
- **Limites desta medição:** foi feita pela API de desempenho do próprio navegador, **sem a limitação de rede e CPU** que o PageSpeed simula. É um indicativo, não substitui o PageSpeed. A API pública do PageSpeed estava sem cota no dia, e o Lighthouse local não foi executado.
- **INP:** só existe com dados reais de visitantes (CrUX), que o domínio provisório ainda não tem.
- **Rotina:** rodar o PageSpeed Insights (celular) nas páginas principais todo mês, a partir da migração para falandou.com.
