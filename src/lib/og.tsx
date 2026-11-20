import { ImageResponse } from "next/og";

// Imagem de compartilhamento (og:image) gerada no build — Arquitetura §10:
// uma por página, com o título dela sobre o fundo da marca. 1200×630.
export const OG_SIZE = { width: 1200, height: 630 };

export function ogImage(eyebrow: string, title: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#161616",
          backgroundImage: "radial-gradient(circle at 85% 15%, rgba(255,104,32,0.35), transparent 45%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>
          Falandou<span style={{ color: "#FF6820" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#FF6820",
              marginBottom: 20,
            }}
          >
            {eyebrow}
          </div>
          <div style={{ display: "flex", fontSize: 66, fontWeight: 800, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 1000 }}>
            {title}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "rgba(255,255,255,0.6)" }}>
          2026.falandou.com · Plano individual · Sessões 1 a 1 · Exame CEFR antes e depois
        </div>
      </div>
    ),
    OG_SIZE
  );
}
