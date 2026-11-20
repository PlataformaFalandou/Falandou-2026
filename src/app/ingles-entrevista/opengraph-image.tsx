import { ogImage } from "@/lib/og";

// Imagem de compartilhamento desta página (Arquitetura §10), gerada no build.
export const dynamic = "force-static";
export const alt = "Entrevista em inglês — Falandou";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage("Entrevista em inglês", "A entrevista em inglês não pode ser o gargalo.");
}
