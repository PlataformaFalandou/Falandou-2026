import { ogImage } from "@/lib/og";

// Padrão do site (vale para páginas sem imagem própria).
export const dynamic = "force-static";
export const alt = "Falandou — Inglês para profissionais";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage("Inglês para profissionais", "Fale inglês com confiança no trabalho.");
}
