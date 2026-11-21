# Revisão visual: 18 recomendações (nov/2026)

Base: inspeção da home e de /planos. Esta revisão substitui parte das decisões de `docs/uxui-aplicacao.md`: texto do botão primário, tamanhos de título, cinzas de fundo e espaçamentos. Os valores vivem em `src/app/globals.css` (`@theme`) e estão em `/design-system`.

| Área | Ponto | Aplicado |
|---|---|---|
| Cores | 1. Contraste do botão | Primário `#FF6820` com texto e ícone `#141414` (~6,5:1); hover `#FF7A3D`. Antes era texto branco (~2,85:1). Toda área laranja usa texto grafite (classe `on-brand`): faixas de CTA, selos, números de etapa, seletor ativo. Nas faixas laranja, os botões são `cta-dark` (grafite preenchido) e `cta-outline-dark` (contorno grafite). |
| | 2. Fundos por função | Página `#141414`, card `#1E1E1E`, superfície interativa `#282828`, borda neutra `#3A3A3A`. Os cinzas soltos (`#0F0F0F`, `#161616`, `#1A1A1A`) e os fundos translúcidos foram trocados pelos tokens. Borda laranja só no plano recomendado. |
| | 3. Cores de texto | Principal `#F5F6F1`, secundário `#C9CAC4`, auxiliar `#A3A49E`. |
| Tipografia | 1. Escala | H1 38→64px (800 / 1,08), H2 30→40px (700 / 1,18), H3 22→24px (700 / 1,25), corpo 16→18px (1,6), auxiliar 14px. A regra de peso e entrelinha vale para todos os títulos do site. |
| | 2. Legibilidade dos cards | Texto explicativo dos cards em 16px / 24px; links de 12px subiram para 14px; 14px fica para categoria, duração e legenda. |
| | 3. Ênfase | Uma expressão destacada por título, só pela cor. O sublinhado decorativo do hero saiu. H2 e H3 em peso 700; 800 só no H1. |
| Botões | 1. Três níveis | Primário laranja com texto grafite; secundário transparente com borda `#606060` e texto claro; terciário sublinhado. No hero: "Quero começar" (primário) + "Ver planos" (secundário). |
| | 2. Dimensões | 48px de altura (56px no hero e nas faixas laranja), 24px de padding lateral, 16px peso 700, ícone de 20px a 8px do texto. No celular, os CTAs do hero ocupam a largura toda, com 12px entre eles. O botão do cabeçalho no celular é compacto (40px) para caber ao lado do logo. |
| | 3. Estados | Foco com contorno claro de 2px afastado 3px. Pressionar e passar o mouse mudam só a cor (sem deslocar ou aumentar). Desabilitado com cor e cursor próprios, não só opacidade. O botão em carregamento mantém a largura ("Abrindo o WhatsApp…"). |
| Espaçamentos | 1. Seções | 80px no desktop e 48px no celular (antes 96–144px). Heróis de página com menos vazio no topo. |
| | 2. Grade | Contêiner de até 1.200px, margens de 32px (desktop) e 20px (celular), gap de 24px/16px nas grades. Cards de perfil passam de 4 para 2 e 1 coluna. Itens de grade não estouram a largura no celular. |
| | 3. Proximidade | Rótulo → título 12px; card com padding de 24px (celular) e 32px (desktop); botão → texto auxiliar 8px. |
| Hierarquia | 1. Hero | Sequência título → explicação (versão curta) → CTA → prova curta ("87 profissionais avaliados no exame CEFR…" + logos). Selo superior discreto. Indicadores e selos saíram do hero e ficaram na faixa seguinte. |
| | 2. Um plano recomendado | Só o Resultado tem borda laranja de 2px e selo preenchido. O selo "Menor valor por sessão" virou neutro. Os 3 cartões têm o mesmo fundo, sem escala no destaque e com os preços alinhados. O compromisso de 12 meses aparece logo abaixo do preço. |
| | 3. Uma função por repetição | Faixa inicial com 3 indicadores (79%, 11 sem, 92%) e o 87 como legenda. Metodologia na seção de resultados. O roteiro gratuito vem antes do fechamento comercial. Nas páginas que terminam com um fechamento laranja, o rodapé não repete outra faixa de CTA. |
| Componentes | 1. Cards | Raio de 16px, borda neutra de 1px, padding de 24–32px. Cards de perfil com a foto em cima e o texto embaixo (sem texto sobre a foto). Cards sem ação não têm efeito de hover. |
| | 2. Controles | Seletor 25/50 min com 48px e opção ativa preenchida. Linhas do FAQ com 56px, ícone de 20px e `aria-expanded`; respostas fechadas fora da navegação por teclado. Indicadores do carrossel com 44×44px. Filtros do blog com 44px. |
| | 3. Navegação | Cabeçalho com 80px (desktop) e 64px (celular); barra inferior com 64px + área segura. "Plataforma do Aluno" com um único nome e um único endereço (`COMPANY.platformUrl` em `src/data/company.ts`). |

## Pendente

- **Endereço da Plataforma do Aluno:** a escola decidiu manter `falandou-hub-learn.lovable.app` (20/11/2026). Se mudar, basta trocar `platformUrl` em `src/data/company.ts`.
- **Conferir com o manual de identidade.** O texto grafite sobre o laranja e os novos cinzas foram aplicados como a recomendação pede. Antes de considerar a regra definitiva, vale validar com o manual da marca.
