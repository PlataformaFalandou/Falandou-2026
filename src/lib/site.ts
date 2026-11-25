/**
 * Domínio do site — FONTE ÚNICA.
 *
 * 2026.falandou.com é temporário: ao fim dos aprimoramentos, o novo site e a nova
 * plataforma vão para falandou.com. Na migração, troque só SITE_URL abaixo
 * (checklist completo em docs/migracao-dominio.md).
 *
 * Indexação: o domínio temporário fica FORA do Google (noindex em todas as
 * páginas, robots.txt sem sitemap). Assim o Google só conhece o site no endereço
 * definitivo e não há dois sites da escola concorrendo na busca. A indexação liga
 * sozinha quando SITE_URL apontar para o domínio definitivo.
 */
export const SITE_URL = "https://2026.falandou.com";

/** Domínio definitivo — o único que pode ser indexado. */
const FINAL_HOSTS = ["falandou.com", "www.falandou.com"];

/** "2026.falandou.com" — para textos visíveis (ex.: rodapé das imagens de compartilhamento). */
export const SITE_HOST = new URL(SITE_URL).host;

/** true só no domínio definitivo. */
export const SITE_INDEXABLE = FINAL_HOSTS.includes(SITE_HOST);

/** URL absoluta a partir de um caminho ("/planos/" → "https://.../planos/"). */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
