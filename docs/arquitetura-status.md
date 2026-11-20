# Arquitetura da Informação — status de implementação

Referência: *Arquitetura da Informação — Escola Falandou* (PDF, 19/11/2026).
Atualizado em 20/11/2026. Planos e preços do novo site e da nova plataforma: Consistência, Resultado e Urgente, com sessões de 25 ou 50 min (o falandou.com antigo não muda; alunos atuais mantêm as condições). Seções 1 a 10 implementadas no site; abaixo, a revisão
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
| 6 | Menos páginas, bem feitas | ✅ Sem páginas "Em breve": /turma-online removida; /intensivo apresenta o plano Urgente (Intensive no falandou.com) (23 páginas indexáveis) |
| 7 | Consistência de promessa | ✅ Mesma promessa e mesmos números em todas as entradas; dado enganoso de /ingles-expatriacao corrigido |
| 8 | Mobile first | ✅ Hero com promessa + prova + CTA sem rolar no celular; menu mobile em tela cheia |
| 9 | Velocidade | ✅ SSG; imagens com dimensão definida |
| 10 | Uma página, um trabalho | ✅ Home desperta curiosidade (sem preço detalhado/comparação), /metodo gera confiança, /planos gera decisão |
| 11 | O visitante escaneia | ✅ Jornada em 5 etapas de uma frase, FAQ da home com 3 perguntas, LPs com 8 seções |
| 12 | Arquitetura é hipótese testada | 🔴 **Depende do GA4/Pixel ativos** (gap 9) e do Google Search Console. Sem dados, não há calibração |

## Pendências fora do código

1. Configurar os secrets do Pixel e do GA4 no GitHub e rodar o deploy.
2. Google Search Console: **só no domínio definitivo** (falandou.com), na migração. O 2026.falandou.com é temporário e fica fora do Google (noindex). Ver `docs/migracao-dominio.md`.
3. Publicar 2 artigos por mês, com revisão editorial.
4. Coletar depoimentos ao fim de cada ciclo ([guia](coleta-depoimentos.md)) — com nível antes/depois.
5. Revisão jurídica da política de privacidade e dos termos.

## Decisões tomadas (diferentes do documento)

- **Home híbrida:** "Para quem" logo após a Hero (planilha, ponto 38); mantidos dados, YouTube e roteiro gratuito.
- **Logos de empresas com legenda** ("Profissionais de empresas como") para não sugerir parceria.
- **Lead magnet só por WhatsApp**, sem captura de e-mail.
- **Sem garantia** em /planos (a escola não oferece); destacados só fatos (resposta em até 1h, cancelamento, reembolso de 7 dias, exame). A escola **não** oferece consulta gratuita.
- **Sem CNPJ** no site.
- **Estrelas do Google Reviews** não implementadas: dependem de perfil no Google Meu Negócio.

## Copywriting (análise de novembro de 2026) — implementado

- Hero com 3 variantes no teste A/B (C = proposta de valor: "De B1 para B2 em 11 semanas…"; chave `falandou_ab_hero_v2`, QA com `?ab=C`).
- H2s com prova ou dor: Para quem é, CTA final (79%), /intensivo ("Você tem uma data…").
- Benefícios (carreira · dia a dia · bolso) na home; MetodoTeaser em benefícios; narrativa em 3 atos em /metodo.
- FAQ da home com 6 perguntas na ordem da jornada, incluindo o risco; FAQ de /metodo complementar.
- CTAs por estágio; /sobre em 5 blocos; posicionamento por plano; páginas /para/engenheiros e /para/gestores.
- Todas as menções a consulta/conversa inicial gratuita removidas (site, roteiro PDF).
- Guia de voz: `docs/brand-voice.md`. Depoimentos de seletiva e de retorno financeiro: pedir (ver `docs/coleta-depoimentos.md`).
- Quiz de nível CEFR (lead magnet): fica para depois; exigiria coleta de e-mail, hoje fora da política do site.

## Posicionamento e oferta (nov/2026)

Ver `docs/posicionamento-oferta.md`: o que foi aplicado no site, custos e margens com os planos reais, retenção, vendas, métricas, tráfego pago e riscos.
