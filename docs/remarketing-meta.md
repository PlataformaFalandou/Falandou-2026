# Remarketing no Meta Ads (ponto 46)

Objetivo: quem chegou em **/planos** e saiu sem chamar no WhatsApp vê um anúncio da
Falandou nas próximas 24–72h.

## O que o site já envia ao Meta Pixel

| Evento | Quando dispara | Uso no remarketing |
|---|---|---|
| `PageView` | toda página | base |
| `ViewContent` (`content_name: planos`) | chegada em /planos | **quem incluir** |
| `WhatsAppClick` (personalizado) | clique em qualquer botão de WhatsApp, em qualquer página | **quem excluir** (já iniciou contato) |
| `Lead` | clique nos CTAs principais ("Quero começar") | conversão / otimização |
| `ScrollDepth50` (personalizado) | rolou 50% da página | público de engajamento (opcional) |

O GA4 recebe os equivalentes: `view_plans`, `whatsapp_click`, `cta_click`, `scroll_depth`.

## Passo 0 — ativar o Pixel e o GA4 no site (obrigatório)

Hoje o site publicado **não carrega** o Pixel nem o GA4: os IDs não chegam ao build.

1. No Meta (Gerenciador de Eventos), copie o **ID do Pixel** (só números, ~15–16 dígitos).
2. No Google Analytics, copie o **ID de métricas** do fluxo web (formato `G-XXXXXXXXXX`).
3. No GitHub: repositório **Falandou-2026 → Settings → Secrets and variables → Actions → New repository secret**:
   - `NEXT_PUBLIC_PIXEL_ID` = ID do Pixel
   - `NEXT_PUBLIC_GA4_ID` = ID do GA4
4. Rode um deploy novo: **Actions → Build & Deploy to Hostinger → Run workflow** (ou faça qualquer push).
5. Confira: abra https://2026.falandou.com/planos com a extensão **Meta Pixel Helper** — devem aparecer `PageView` e `ViewContent`.

## Passo 1 — criar os públicos (Meta Ads → Públicos)

**Público A — "Viu planos (7 dias)"**
- Criar público → Público personalizado → Origem: **Site** → seu Pixel
- Incluir: pessoas que dispararam **ViewContent**, nos últimos **7 dias**
  - Refinar por parâmetro: `content_name` = `planos`
- Excluir: pessoas que dispararam o evento personalizado **WhatsAppClick** nos últimos **7 dias**

**Público B — "Visitou o site, não viu planos" (opcional, mais frio)**
- Incluir: todos os visitantes do site, últimos 14 dias
- Excluir: Público A e quem disparou WhatsAppClick

> O público precisa de algumas centenas de pessoas para o Meta entregar bem.
> Com pouco tráfego, aumente a janela para 14 ou 30 dias.

## Passo 2 — campanha de remarketing

- Objetivo: **Leads** (ou Engajamento → Mensagens no WhatsApp)
- Público: **Público A**
- Orçamento baixo e contínuo (ex.: R$ 10–20/dia); frequência alvo de 1–2 vezes por dia
- Janela de 24–72h: use o público de 7 dias e acompanhe a frequência — se passar de ~4 na semana, reduza o orçamento
- Criativos: fale com quem **já viu os preços** — retorno do investimento ("a partir de R$ 134,90/mês"),
  o exame CEFR antes e depois, depoimentos com cargo e empresa. Nada de contador ou "últimas vagas".
- Destino: **https://2026.falandou.com/planos** com UTM, por exemplo
  `?utm_source=meta&utm_medium=paid&utm_campaign=remarketing-planos`

## Landing pages em campanhas pagas (Arquitetura §8)

Cada página de entrada usada em anúncio leva um **UTM próprio**, para o GA4 separar
o resultado de cada uma. Use `utm_source` do canal (`meta`, `google`, `linkedin`),
`utm_medium=paid` e a campanha abaixo:

| Página | URL de destino (exemplo para Meta) |
|---|---|
| Inglês executivo | `https://2026.falandou.com/ingles-executivo/?utm_source=meta&utm_medium=paid&utm_campaign=lp-executivo` |
| Entrevista | `https://2026.falandou.com/ingles-entrevista/?utm_source=meta&utm_medium=paid&utm_campaign=lp-entrevista` |
| Expatriação | `https://2026.falandou.com/ingles-expatriacao/?utm_source=meta&utm_medium=paid&utm_campaign=lp-expatriacao` |
| Promoção | `https://2026.falandou.com/promocao-cargo/?utm_source=meta&utm_medium=paid&utm_campaign=lp-promocao` |
| Planos (remarketing) | `https://2026.falandou.com/planos/?utm_source=meta&utm_medium=paid&utm_campaign=remarketing-planos` |

Hoje essas 4 páginas também servem à busca orgânica (estão no sitemap), então ficam
**indexadas**. Se um dia for criada uma página **só para anúncio** (com texto quase igual
ao de outra), marque-a como `noindex` para não competir com a versão orgânica no Google —
no `page.tsx` dela:

```ts
export const metadata: Metadata = {
  // ...título e descrição...
  robots: { index: false, follow: true },
};
```

e não a inclua em `src/app/sitemap.ts`.

## Passo 3 — medir

- GA4: compare `view_plans` → `whatsapp_click` por origem (`utm_source=meta`)
- Meta: custo por `Lead` / `WhatsAppClick` da campanha
