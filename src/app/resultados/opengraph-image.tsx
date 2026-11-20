import { ogImage } from "@/lib/og";

// Imagem de compartilhamento desta página (Arquitetura §10), gerada no build.
export const dynamic = "force-static";
export const alt = "Resultados — Falandou";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage("Resultados", "79% sobem pelo menos 1 nível CEFR em 90 dias.");
}
