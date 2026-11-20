# UX/UI: aplicação dos 28 pontos (nov/2026)

Decisões da escola nesta rodada: manter a fonte Wix Madefor, usar a barra fixa no rodapé do celular, não mostrar contador de vagas e deixar o site inteiro escuro.

| # | Ponto | No site |
|---|---|---|
| 1 | Hierarquia | Escala de 4 níveis em tokens: H1 40→72px, H2 32→44px, H3 22→26px, corpo 16px com entrelinha 1,6 e legenda 13px. Todos os H1/H2/H3 usam os tokens. |
| 2 | Hero | Três camadas: resultado (headline com número), mecanismo (subtítulo) e ação (primário "Quero começar" + secundário "Ver planos"). A foto de banco de imagens saiu. Entrou fundo tipográfico escuro com grade sutil e brilho laranja, sublinhado laranja na palavra-chave, pill "87 profissionais avaliados" e selos "Exame CEFR incluso · Aulas 1 a 1 · Sem turmas". |
| 3 | Tipografia | **Mantida a Wix Madefor** (decisão da escola). A fonte agora carrega uma vez só, com `display=swap`. Números com `tnum`. O `tailwind.config.ts` não era lido pelo Tailwind v4, então classes como `font-display` e `text-laranja` não existiam. Os tokens foram para o `@theme` do `globals.css`. |
| 4 | Paleta | Tokens funcionais no `@theme`: brand, brand-dark, bg, bg-alt, surface, text, text-body, text-muted, border, success, warning e gold. |
| 5 | Microinterações | CTA com hover #E05010, sobe 2px, sombra e clique em `scale(0.97)`. Card com borda laranja no hover. Campos com rótulo flutuante e foco laranja. Menu com hambúrguer ↔ X. Scroll reveal de 450ms. Implementado em CSS, sem Framer Motion: menos JavaScript, mesmo efeito. |
| 6 | Espaçamento | Escala de 8px documentada no `globals.css` e mostrada em `/design-system`. |
| 7 | Prova social | Faixa de números logo abaixo do hero: 79% · 11 sem · 92% · 87, em 48px laranja, com contagem animada. Selos de confiança no hero. Escala CEFR como componente visual. |
| 8 | Navegação mobile | Header de 56px com logo, "Começar" sempre visível e menu em gaveta da direita (overlay 50%, fecha ao tocar fora ou com Esc). Barra fixa no rodapé: Início, Planos, Professores, Falar. Respeita a safe area. |
| 9 | Cards de planos | Cinco zonas: selo, nome + preço, sessões com bolinhas, benefícios com check e CTA de largura total. O destaque tem borda laranja de 2px, fundo #1A1A1A e scale de 1,02. No celular, rolagem com snap e cartões de 85%. A âncora "ganham 40% mais" **não foi aplicada** porque não tem fonte. O site mantém os aumentos relatados pelos alunos. |
| 10 | CTA | Três níveis (classes `cta-primary`, `cta-secondary`, `cta-tertiary`). Microtexto "Pelo WhatsApp · a equipe responde em até 1h" e ícone do WhatsApp ("sem compromisso" saiu: o guia de voz o trata como promessa vaga). O texto do PDF ("Sem compromisso — 20 minutos") prometia uma consulta que a escola não oferece. |
| 11 | Formulário | Formulário "Qual plano é para mim?" em /planos: nome, área, nível e objetivo. Rótulos flutuantes, validação na hora, botão com spinner e tela de sucesso com check animado. Abre o WhatsApp com a mensagem preenchida e nada fica gravado. **Sem "consulta gratuita".** |
| 12 | Depoimentos | Aspas laranja de 60px, texto em itálico, resultado em destaque, avatar com iniciais e selo CEFR antes → depois (só com dado real). No celular, carrossel com snap, troca a cada 5s, indicadores e pausa ao tocar. O filtro por perfil já existia em /depoimentos. |
| 13 | Professores | Título "Nossos professores", especialidade em destaque e caixa do método abaixo dos cartões. A frase "certificados no Método Falandou" virou "seguem o método da escola", porque não existe certificação interna. As métricas são da escola (600+ formados, 7 anos), não de cada professor. |
| 14 | Rodapé | Quatro colunas (Falandou · Escola · Legal · Contato) e faixa de CTA acima. **Sem CNPJ** (decisão da escola) e sem cidade. |
| 15 | Animações | Palavras do headline em sequência (80ms), contadores, rolagem suave com compensação do header e nenhuma animação em loop (os "pulsos" saíram). |
| 16 | Brand assets | Favicon da marca (antes era o ícone padrão do Next), apple-touch-icon, `manifest.webmanifest` e ícones 192/512 + maskable. As imagens de compartilhamento já existiam por página. Os templates de redes sociais (Canva/Figma) ficam fora do código. |
| 17 | Conteúdo | Novo `/vocabulario` com 24 termos em 4 áreas (pronúncia, definição, exemplo e nível CEFR). Diagrama circular do método em /metodo. Escala CEFR em /resultados. O blog já existia. |
| 18 | Acessibilidade | Foco visível, link "Pular para o conteúdo", uma H1 por página (conferido no build), `prefers-reduced-motion` e áreas de toque de 44px. O laranja sobre fundo escuro passa no contraste para texto. |
| 19 | Performance | Imagens convertidas para WebP: de 2–5 MB para 40–80 KB cada. O hero ficou sem imagem. Fontes com `display=swap`. Fundo de placeholder nas imagens. |
| 20 | Dark mode | **Site todo escuro** (decisão da escola): fundo #0F0F0F, superfícies #1A1A1A, texto neve e laranja inalterado. |
| 21 | Loading e erro | Barra laranja de navegação no topo, botão com spinner, erro abaixo do campo e check de sucesso. A 404 personalizada já existia. Fallback offline com service worker mínimo, que não guarda o site em cache. |
| 22 | Onboarding | Página `/bem-vindo/` (fora do Google). Modelos de WhatsApp, e-mail e kit em `docs/onboarding-aluno.md`. O kit em PDF depende dos horários reais dos professores. |
| 23 | Trust signals | Pill e selos no hero, logos, regras de cancelamento e reembolso perto dos planos. "Pagamento seguro Stripe" **não se aplica**: a matrícula é feita com a equipe, não no site. |
| 24 | Escassez | Só a regra real: "Limitamos cada professor a 25 alunos ativos para garantir atenção individual de verdade". **Sem contador e sem data de próximas vagas** (decisão da escola). |
| 25 | CEFR visual | Componente `CEFRScale` (cinza → laranja → dourado) com "você está aqui" interativo em /metodo e /resultados, mais o selo CEFR nos depoimentos. O "nível típico por plano" **não foi aplicado** porque não há dado por plano. |
| 26 | Mobile | Conferido em 375px: sem rolagem horizontal, campos com 16px (sem zoom no iOS), menu que fecha ao tocar fora, safe area e snap nos planos e depoimentos. Ainda falta testar em aparelho físico e medir no PageSpeed. |
| 27 | Design system | Tokens no `@theme` e componentes em `src/components/ui/ds.tsx` (Button, Badge, Card, Section, Input). Página `/design-system`, fora do Google e do sitemap. |
| 28 | Prioridades | Todos os itens de "crítica" e "alta" foram aplicados. |
