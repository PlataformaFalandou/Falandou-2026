# SEO e estratégia de conteúdo (nov/2026)

Aplicação dos 28 pontos do PDF "SEO e Estratégia de Conteúdo".

Decisões da escola nesta rodada:
- **Sem página de autor.** Na revisão editorial seguinte, a escola decidiu que cada artigo é assinado por um professor, conforme a categoria, com mini-bio e link para o perfil em /professores (veja `docs/brand-voice.md`, seção 6).
- **Com o cluster de inglês jurídico.**
- **Sem lista de e-mail** (decisão anterior). O material gratuito é entregue pelo WhatsApp.

> **Importante:** enquanto o site estiver em 2026.falandou.com, ele fica **fora do Google** (noindex). Search Console, envio do sitemap, Google Meu Negócio e as metas de busca orgânica começam no domínio definitivo (veja `docs/migracao-dominio.md`). Todo o trabalho de SEO feito no site já vale no dia da troca.

## 1. Status ponto a ponto

| # | Ponto | Status |
|---|---|---|
| 1 | URLs | Slugs já curtos e sem data (`/blog/ingles-juridico-advogados/`). Mantida a estrutura plana `/blog/slug/`: categorias são filtro, não pasta, o que evita URL duplicada quando um artigo muda de categoria. Se o falandou.com antigo tiver URLs de blog com tráfego, elas recebem 301 na migração. |
| 2 | Titles e descriptions | Todas as páginas e posts revisados: title com até 60 caracteres, description com 140–160, sem duplicatas. /planos tem o preço no título. Posts usam `titulo_seo` e `descricao` no frontmatter. |
| 3 | Schema | EducationalOrganization com logo (home), Course com ofertas e instância online (/planos e landing pages), FAQPage (páginas com FAQ e cada post com FAQ), BlogPosting + BreadcrumbList (posts), Blog (/blog) e DefinedTermSet (/vocabulario). **AggregateRating não aplicado:** os 87 são profissionais avaliados no exame CEFR, não avaliações da escola, e o Google não exibe estrelas de autoavaliação de organizações. Usar isso seria dado enganoso. |
| 4 | Core Web Vitals | Hero sem imagem (o LCP é texto), imagens em WebP com tamanho definido, fontes com `display=swap`, conteúdo dos posts fora do JavaScript do cliente. Medir no PageSpeed Insights a cada mês, a partir da migração. |
| 5 | Sitemap e robots | `sitemap.xml` automático com páginas e posts (home 1.0, planos 0.9, pilares 0.85, posts 0.8), com a data de revisão. Fora dele: /bem-vindo e /design-system. O robots.txt passa a anunciar o sitemap no domínio definitivo. |
| 6 | Canonical | Canonical em todas as páginas e posts. O filtro de categoria do /blog é parâmetro (`?categoria=`), com canonical para /blog/. Ainda não há paginação. Regra fixa: artigo reescrito com slug novo leva 301 do antigo; nunca apagar. |
| 7 | Open Graph | og:title, description, url e imagem 1200×630 em todas as páginas (imagem gerada por rota e por post); `summary_large_image` no Twitter/X. |
| 8–11 | Palavras-chave, clusters, intenção, cauda longa | Seções 2 a 4 abaixo. |
| 12 | Calendário de 12 meses | Seção 5. |
| 13 | Página do blog | H1 "Blog da Falandou: inglês para profissionais", guia pilar em destaque, filtro por categoria (Carreira, Jurídico, CEFR e Certificações, Dicas de Estudo), tempo de leitura em cada cartão e breadcrumb com schema. |
| 14 | Linkagem interna | Todo post tem pelo menos 3 links internos: pilar ou post relacionado, /planos ou /metodo e outro post (seção "Para ir além"). O CTA final leva a /planos. Os textos âncora são descritivos. |
| 15 | Estrutura do artigo | H1 único, introdução, H2/H3, tabelas onde comparam algo, CTA de meio de artigo depois do 3º H2 (automático), CTA final, FAQ com 3–5 perguntas e FAQPage schema. |
| 16 | Títulos | H1 com a palavra-chave no início (ex.: "Inglês jurídico: guia para advogados…"). Fórmulas na seção 6. |
| 17 | Profundidade | Pilares com sumário navegável: CEFR (~2.000 palavras de texto, ~2.300 com o FAQ) e Jurídico (~1.900 de texto, ~2.200 com o FAQ), um pouco abaixo da faixa de 2.500 do PDF. A prioridade foi cobrir a intenção de busca sem enchimento; ampliar quando o Search Console mostrar as dúvidas reais dos leitores. Guia de carreira: ~720 palavras + FAQ. Posts de apoio: 460–760 palavras, faixa de "captação rápida". Expandir "Inglês para reuniões" e "Pronúncia" está no calendário. |
| 18 | Reescrita dos existentes | Os 7 posts passaram pelo protocolo: H1 com palavra-chave, title/description, FAQ, links internos, CTA e data de revisão (`atualizado_em`, que vira `dateModified`; a data de publicação foi mantida). Os posts não têm imagens próprias. A miniatura do vídeo é decorativa (alt vazio). |
| 19 | Voz editorial | Seção "Voz editorial do blog" em `docs/brand-voice.md`. |
| 20 | Mídia | Vídeos do @falandou nos posts (miniatura com link, sem cookies antes do consentimento), tabelas comparativas nos pilares. Infográficos no Canva com as cores da escola e versão em áudio ficam para o calendário. |
| 21 | E-A-T | Assinatura do professor da categoria (com credenciais e link para o perfil em /professores), schema Person, data de publicação e de revisão, bloco "Sobre a Falandou" no fim de cada post e no /blog. **Sem página de autor** (decisão da escola). As credenciais dos professores ficam em /professores. Logotipos da Cambridge não são usados: são marca registrada de terceiros. |
| 22–25, 27 | Link building, Google Meu Negócio, métricas, distribuição, governança | Playbook nas seções 7 a 11. São ações fora do código. |
| 26 | Funil do blog | Entrada orgânica → CTA de meio de artigo (/metodo) → roteiro gratuito pelo WhatsApp (barra lateral) → CTA final "Quero começar" (/planos ou WhatsApp). A sequência de e-mails não se aplica (sem lista de e-mail), e o acompanhamento é pelo WhatsApp (seção 10). |
| 28 | Roadmap | Seção 12. |

## 2. Mapa de palavras-chave (validar volumes no Google Keyword Planner)

| Intenção | Palavra-chave | Página | Prioridade |
|---|---|---|---|
| Informacional | níveis de inglês CEFR | /blog/diferenca-cefr-niveis-ingles/ (pilar) | 1 |
| Informacional | inglês jurídico | /blog/ingles-juridico-advogados/ (pilar) | 1 |
| Informacional | inglês profissional | /blog/como-aprender-ingles-profissional/ (guia de carreira) | 1 |
| Informacional | inglês para reuniões / vocabulário inglês corporativo | /blog/vocabulario-reunioes-negocios/ | 1 |
| Informacional | entrevista de emprego em inglês | /blog/ingles-para-entrevista-emprego/ | 1 |
| Informacional | e-mail profissional em inglês | /blog/emails-profissionais-ingles/ | 2 |
| Informacional | inglês para apresentações | /blog/ingles-para-apresentacoes/ | 2 |
| Informacional | como melhorar a pronúncia em inglês | /blog/como-melhorar-pronuncia-ingles/ | 2 |
| Informacional | vocabulário de inglês por área | /vocabulario/ | 2 |
| Comercial | curso de inglês para profissionais | / (home) | 2 |
| Comercial | aula de inglês online individual | /planos/ | 2 |
| Comercial | inglês para advogados | /blog/ingles-juridico-advogados/ → futura landing page | 2 |
| Transacional | curso de inglês 1 a 1 online | /planos/ | 1 |
| Transacional | inglês para entrevista de emprego (curso) | /ingles-entrevista/ | 1 |
| Transacional | inglês intensivo para profissionais | /intensivo/ | 1 |

Fora do mapa: "escola de inglês individual São Paulo". A Falandou é online e o site não declara cidade; não otimizar para busca local de uma cidade específica sem endereço real.

## 3. Topic clusters

**Carreira** — guia: *Inglês profissional: como aprender o inglês que o seu trabalho exige*
- Apoio publicado: reuniões, e-mails, apresentações, entrevista, pronúncia.
- A publicar: expressões idiomáticas no trabalho, inglês para negociação, small talk com estrangeiros.

**CEFR e Certificações** — pilar: *Níveis de inglês CEFR: guia completo do A1 ao C2*
- A publicar: como sair do B1 para o B2, B2 ou C1 no mercado de trabalho, certificações reconhecidas (IELTS, TOEFL, Cambridge).

**Jurídico** — pilar: *Inglês jurídico: guia para advogados e estudantes de Direito*
- A publicar: vocabulário jurídico essencial, como redigir contratos internacionais, falsos cognatos jurídicos, inglês para arbitragem.

Regra: cada post de apoio linka para o seu pilar, e o pilar linka para todos os apoios publicados (atualizar o pilar a cada novo post).

## 4. Intenção de busca e cauda longa

- **Antes de escrever:** buscar a palavra-chave no Google e olhar os 3 primeiros resultados. Se forem guias, escreva um guia; se forem listas, uma lista.
- **Informacional** → guia ou lista. **Comercial** → comparativo e "vale a pena". **Transacional** → landing page com preço e CTA. **Navegacional** → home (não usar o blog).
- **70% cauda longa / 30% termos médios.** Exemplos para a pauta:
  - quanto tempo para chegar ao C1;
  - inglês para médicos e profissionais de saúde;
  - como estudar inglês trabalhando em tempo integral;
  - como se apresentar em inglês em reunião;
  - falsos cognatos no inglês jurídico.
- **Fontes de perguntas:** AnswerThePublic, o autocompletar do Google e o bloco "As pessoas também perguntam".

## 5. Calendário editorial (2 posts por mês + 1 pilar por trimestre)

| Mês | Artigo | Tipo | Cluster |
|---|---|---|---|
| Dez/26 | Como sair do B1 para o B2 | Apoio | CEFR |
| Dez/26 | Vocabulário jurídico essencial: 50 termos | Apoio | Jurídico |
| Jan/27 | B2 ou C1: qual nível o mercado pede | Apoio | CEFR |
| Jan/27 | Expressões idiomáticas no ambiente de trabalho | Apoio | Carreira |
| Fev/27 | Como redigir contratos internacionais em inglês | Apoio | Jurídico |
| Fev/27 | Inglês para reuniões: versão expandida (1.500 palavras) | Revisão | Carreira |
| Mar/27 | **Guia completo: inglês para profissionais brasileiros** | Pilar | Carreira |
| Mar/27 | Certificações de inglês reconhecidas no mercado | Apoio | CEFR |
| Abr/27 | Inglês para negociação: frases e estratégias | Apoio | Carreira |
| Abr/27 | Falsos cognatos no inglês jurídico | Apoio | Jurídico |
| Mai/27 | Como estudar inglês trabalhando em tempo integral | Apoio | Dicas de Estudo |
| Mai/27 | Inglês para arbitragem internacional | Apoio | Jurídico |
| Jun/27 | **Inglês para profissionais de saúde** (avaliar nova página por perfil) | Pilar | Carreira |
| Jun/27 | Erros clássicos de brasileiros em inglês no trabalho | Apoio | Dicas de Estudo |
| Jul–Dez/27 | Revisar os posts com dados do Search Console e um novo ciclo de pauta | — | — |

## 6. Fórmulas de título

- **Numérica:** "15 expressões de inglês para usar em reuniões".
- **Problema:** "Como aprender inglês sem parar a sua rotina de trabalho".
- **Transformação:** "De B1 para B2: como profissionais aceleram a fluência".
- **Guia:** "Guia de inglês jurídico para advogados brasileiros".

Regra: palavra-chave nos primeiros 50 caracteres do H1. Title com até 60 caracteres, terminando em "| Falandou".

## 7. Link building (realista para uma escola online)

1. **Guest posts jurídicos:** propor "Inglês jurídico: guia prático" a blogs e publicações de Direito (JOTA, Conjur, seccionais da OAB), com assinatura da escola e link.
2. **Dados originais:** os números do último ciclo (87 profissionais avaliados no CEFR, 79% subiram pelo menos um nível) servem de pauta para blogs de RH e carreira. Dado original gera link natural.
3. **Faculdades de Direito e Engenharia:** palestra ou minicurso de inglês profissional em troca de menção no site da instituição.
4. **Imprensa:** responder pedidos de jornalistas por especialistas em educação e idiomas (no Brasil, também por grupos de assessoria e no LinkedIn).
5. **LinkedIn:** artigos nativos e posts não geram backlink direto, mas aumentam buscas pela marca e tráfego de referência.

Cuidado: não comprar links nem entrar em redes de troca de links.

## 8. Google Meu Negócio (no domínio definitivo)

- Perfil "Falandou", categoria "Escola de idiomas".
- Escola online sem atendimento presencial: o Google exige endereço para verificar, mas permite **ocultar o endereço** e declarar a área atendida (Brasil). Não criar perfil com endereço que não atende o público.
- Descrição com as palavras-chave (inglês para profissionais, aulas 1 a 1, CEFR), link para o site e para /planos, horário de atendimento real.
- Pedir avaliações a quem concluiu um ciclo e publicar um post por mês (artigo novo ou novidade).

## 9. Métricas (Search Console + GA4)

| Métrica | Ferramenta | 6 meses | 12 meses |
|---|---|---|---|
| Impressões orgânicas | Search Console | +500/mês | +2.000/mês |
| Cliques orgânicos | Search Console | +50/mês | +300/mês |
| CTR médio | Search Console | > 3% | > 5% |
| Posição média dos posts | Search Console | < 20 | < 10 |
| Páginas indexadas | Search Console | 100% | 100% |
| Tempo na página (blog) | GA4 | > 2 min | > 3 min |
| Cliques no WhatsApp vindos do blog | GA4 (`cta_click`) | 2/mês | 10/mês |
| Backlinks novos | Ahrefs Free / Search Console | 2/mês | 5/mês |

As metas contam a partir da migração para o falandou.com.

## 10. Distribuição e funil

- **LinkedIn (prioridade):** cada artigo vira um post nativo com os 3 principais insights e o link no primeiro comentário.
- **WhatsApp:** lista de transmissão com interessados e ex-alunos que autorizaram. A cada post: "Novo no blog: [título] — [link]".
- **Instagram:** carrossel ou Stories com os 5 pontos do artigo.
- **Medium:** republicar só os pilares, com o link canônico para a Falandou.
- **Acompanhamento sem e-mail:** quem pede o roteiro gratuito pelo WhatsApp recebe o PDF (dia 1). Depois, uma mensagem sobre como funciona a sessão individual (dia 3) e um convite para conversar com a equipe (dia 7). Sempre com opção de parar de receber.

## 11. Processo editorial (governança)

Quadro no Notion ou Trello: Ideia → Escrevendo → Revisão → Publicado → Distribuído.

1. **Pesquisa (1h):** palavra-chave, top 3 do Google, estrutura.
2. **Escrita (2–3h):** estrutura do ponto 15.
3. **Revisão SEO (30 min):** H1, `titulo_seo`, `descricao`, 3+ links internos, FAQ, alt das imagens.
4. **Revisão editorial (30 min):** guia de voz e checklist do `docs/brand-voice.md`.
5. **Publicação:** novo arquivo em `content/blog/` com o frontmatter completo. O sitemap, o schema e a imagem de compartilhamento saem sozinhos. Se houver CTA específico, criar entrada em `src/data/blogCTAs.ts`.
6. **Distribuição:** LinkedIn, WhatsApp e Instagram.
7. **Monitoramento (30 dias):** impressões e cliques no Search Console. Ajustar o title se o CTR estiver baixo.

**Frontmatter de um post novo:**

```yaml
titulo: "Palavra-chave no começo: complemento"   # H1
titulo_seo: "Título com até 60 caracteres | Falandou"
resumo: "Subtítulo do artigo e texto do cartão no /blog."
descricao: "Meta description com 150–160 caracteres e a palavra-chave."
categoria: Carreira            # Carreira | Jurídico | CEFR e Certificações | Dicas de Estudo
cluster: Carreira
palavra_chave: "palavra-chave principal"
pilar: false                   # true = guia completo com sumário
created_at: "2026-12-01T10:00:00.000Z"
atualizado_em: "2026-12-01T10:00:00.000Z"   # data da última revisão
video: ID_DO_YOUTUBE            # opcional
publicado: true
faq:
  - q: "Pergunta?"
    a: "Resposta curta e completa."
```

## 12. Roadmap

- **Fase 0 — já feita no site:** schema, titles/descriptions, Open Graph, sitemap, reescrita dos 7 posts, 2 pilares (CEFR e Jurídico), linkagem interna, página do blog.
- **Dia da migração:** Search Console + sitemap, Google Meu Negócio, PageSpeed de referência.
- **Meses 1–3:** 2 posts por mês pelo calendário, início dos guest posts jurídicos, acompanhamento semanal no Search Console.
- **Meses 4–6:** pilar de Carreira, revisão dos primeiros posts com dados reais, avaliar landing page para advogados.
- **Meses 7–12:** meta de 300+ cliques orgânicos/mês; avaliar clusters de saúde, TI e inglês acadêmico.
