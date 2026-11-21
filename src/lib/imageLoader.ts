/**
 * Loader de imagens para a exportação estática (revisão técnica §6.1).
 *
 * O Next não otimiza imagens em `output: "export"`. Em vez de servir o arquivo de 1200px
 * para todo mundo, cada foto de /public/images tem versões WebP pré-geradas:
 *   nome-256.webp · nome-480.webp · nome-800.webp · nome.webp (original, até 1200px)
 * O <img> recebe um srcset com essas larguras, e o navegador escolhe a menor que cobre o
 * espaço exibido (`sizes`). Imagens de fora (URLs absolutas) passam direto.
 *
 * Para adicionar uma foto nova: salve o original em WebP (até 1200px) em /public/images e
 * gere as três larguras (ver docs/revisao-tecnica.md).
 */
const AVAILABLE = [256, 480, 800];

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  if (!src.startsWith("/images/") || !src.endsWith(".webp")) return src;
  const w = AVAILABLE.find((a) => a >= width);
  return w ? src.replace(/\.webp$/, `-${w}.webp`) : src;
}
