import type { MetadataRoute } from "next";

// PWA manifest (UX/UI §16): permite adicionar o site à tela inicial do celular com o ícone da escola.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Falandou — Inglês para Profissionais",
    short_name: "Falandou",
    description: "Inglês profissional 1 a 1, com resultado medido no exame CEFR.",
    start_url: "/",
    display: "standalone",
    background_color: "#0F0F0F",
    theme_color: "#FF6820",
    lang: "pt-BR",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
