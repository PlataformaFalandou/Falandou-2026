# Migração de domínio: 2026.falandou.com → falandou.com

O 2026.falandou.com é temporário. Ao fim dos aprimoramentos, o novo site e a nova
plataforma vão para falandou.com, no lugar do site antigo.

## Como está hoje (domínio temporário)

- **Fonte única do domínio:** `src/lib/site.ts`, na constante `SITE_URL`. Canonical, og:url, sitemap, robots, dados estruturados, links com UTM, o link de /indique e o rodapé das imagens de compartilhamento usam esse valor.
- **Fora do Google:** todas as páginas saem com `noindex, nofollow`, e o robots.txt não anuncia o sitemap.
  - O rastreamento continua liberado de propósito, para o Google ler o noindex.
  - Links por WhatsApp, anúncios, remarketing, GA4 e Pixel funcionam normalmente.
- **Não cadastrar o 2026.falandou.com no Google Search Console.** O cadastro fica para o domínio definitivo.

## No dia da migração

1. Em `src/lib/site.ts`, trocar `SITE_URL` para `"https://falandou.com"`. A indexação liga sozinha: some o noindex e o robots.txt passa a anunciar o sitemap.
2. Apontar o domínio falandou.com para a nova hospedagem e ajustar `FTP_REMOTE_DIR` no GitHub, se mudar.
3. **Redirecionar os endereços do site antigo** que tenham tráfego ou links externos para as páginas novas equivalentes, com 301 no `public/.htaccess`. Levantar a lista de URLs antigas antes da troca.
4. Redirecionar todo o 2026.falandou.com para falandou.com com 301, mantendo o caminho.
5. Regerar o PDF do roteiro (`materiais/roteiro-30-dias.html` → `.pdf`). Ele cita 2026.falandou.com em 4 pontos.
6. **Google Search Console:** cadastrar falandou.com, enviar `https://falandou.com/sitemap.xml` e, se o site antigo já estiver lá, usar "Alteração de endereço" quando couber.
7. **GA4 e Pixel:** o fluxo do GA4 já está com a URL `https://falandou.com`. No Meta, verificar o domínio falandou.com no Gerenciador de Negócios.
8. Trocar os links dos anúncios e das bios (LinkedIn, Instagram, YouTube) para o domínio novo.
9. Conferir no site publicado: canonical, robots.txt, sitemap.xml e as imagens de compartilhamento com o domínio novo.
