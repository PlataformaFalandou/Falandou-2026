# Arquitetura da Informação — status de implementação

Referência: *Arquitetura da Informação — Escola Falandou* (PDF, 19/11/2026).
Atualizado em 20/11/2026. Planos e preços alinhados a falandou.com (Starter, Professional, Intensive; 25 ou 50 min). Seções 1 a 10 implementadas no site; abaixo, a revisão
das seções 11 (gaps) e 12 (princípios).

## Seção 11 — Gaps críticos

| # | Gap | Status | Onde |
|---|---|---|---|
| 1 | LGPD: política de privacidade + termos | ✅ Feito | /politica-de-privacidade, /termos, aviso de cookies (Pixel e GA4 só após aceite) |
| 2 | /professores | ✅ Feito | /professores, dados em `src/lib/teachers.ts` |
| 3 | /depoimentos | ✅ Feito | /depoimentos, dados em `src/data/testimonials.ts` |
| 4 | /sobre | ✅ Feito | /sobre |
| 5 | `<ForWhom />` genérico nas LPs | ✅ Feito | prop `persona` em /ingles-executivo e /promocao-cargo (/entrevista-emprego foi consolidada em /ingles-entrevista) |
| 6 | Blog sem conteúdo indexado | 🟡 Parcial | sitemap, schema Article, categorias e CTA contextual feitos. **Falta: cadência de 2 posts/mês com revisão editorial (equipe)** |
| 7 | Schema markup | ✅ Feito | Organization (home), Course (/planos e LPs), FAQPage, Article, BreadcrumbList |
| 8 | Planos hardcoded | ✅ Feito | `src/data/plans.ts` |
| 9 | Remarketing pixel | 🟡 Parcial | código, eventos e consentimento feitos. **Falta: secrets `NEXT_PUBLIC_PIXEL_ID` e `NEXT_PUBLIC_GA4_ID` no GitHub** ([guia](remarketing-meta.md)) |
| 10 | sitemap.xml no build | ✅ Feito | `src/app/sitemap.ts` + robots.txt |
| 11 | FAQ em /planos | ✅ Feito | inclui "Por que custa mais do que escola em grupo?" |
| 12 | CTA corporativo | ✅ Feito | /planos#empresas (WhatsApp + e-mail), link no rodapé |

## Seção 12 — Princípios: como o site está

| # | Princípio | Situação |
|---|---|---|
| 1 | Escola, não personal branding | ✅ Nenhum CTA usa nome de professor; credenciais da escola na StatsBar e na /sobre; professores só em /professores |
| 2 | Prova > emoção | ✅ Dados com metodologia (/resultados), números de fonte única (`src/data/stats.ts`), "não é garantia individual" nos termos |
| 3 | Escassez legítima | ✅ Sem contador, "últimas vagas" ou desconto por tempo limitado |
| 4 | 1:1 é o diferencial | ✅ Todos os planos são de sessões individuais. /turma-online (grupo) foi removida — a escola não vende esse formato (301 para /planos) |
| 5 | CEFR como linguagem comum | ✅ Escala explicada em /resultados, tooltip CEFR, nível nos depoimentos quando houver dado |
| 6 | Menos páginas, bem feitas | ✅ Sem páginas "Em breve": /turma-online removida; /intensivo apresenta o plano Intensive vigente (23 páginas indexáveis) |
| 7 | Consistência de promessa | ✅ Mesma promessa e mesmos números em todas as entradas; dado enganoso de /ingles-expatriacao corrigido |
| 8 | Mobile first | ✅ Hero com promessa + prova + CTA sem rolar no celular; menu mobile em tela cheia |
| 9 | Velocidade | ✅ SSG; imagens com dimensão definida |
| 10 | Uma página, um trabalho | ✅ Home desperta curiosidade (sem preço detalhado/comparação), /metodo gera confiança, /planos gera decisão |
| 11 | O visitante escaneia | ✅ Jornada em 5 etapas de uma frase, FAQ da home com 3 perguntas, LPs com 8 seções |
| 12 | Arquitetura é hipótese testada | 🔴 **Depende do GA4/Pixel ativos** (gap 9) e do Google Search Console. Sem dados, não há calibração |

## Pendências fora do código

1. Configurar os secrets do Pixel e do GA4 no GitHub e rodar o deploy.
2. Cadastrar o site no Google Search Console e enviar `https://2026.falandou.com/sitemap.xml`.
3. Publicar 2 artigos por mês, com revisão editorial.
4. Coletar depoimentos ao fim de cada ciclo ([guia](coleta-depoimentos.md)) — com nível antes/depois.
5. Revisão jurídica da política de privacidade e dos termos.

## Decisões tomadas (diferentes do documento)

- **Home híbrida:** "Para quem" logo após a Hero (planilha, ponto 38); mantidos dados, YouTube e roteiro gratuito.
- **Logos de empresas com legenda** ("Profissionais de empresas como") para não sugerir parceria.
- **Lead magnet só por WhatsApp**, sem captura de e-mail.
- **Sem garantia** em /planos (a escola não oferece); destacados só fatos (consulta gratuita, exame, revisão do plano).
- **Sem CNPJ** no site.
- **Estrelas do Google Reviews** não implementadas: dependem de perfil no Google Meu Negócio.
