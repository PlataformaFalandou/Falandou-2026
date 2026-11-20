import { ogImage } from "@/lib/og";

// Imagem de compartilhamento desta página (Arquitetura §10), gerada no build.
export const dynamic = "force-static";
export const alt = "Como funciona — Falandou";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage("Como funciona", "Um ciclo de 90 dias com processo visível e resultado em número.");
}
