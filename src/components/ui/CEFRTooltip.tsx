"use client";

/**
 * CEFRTooltip
 * Envolve o termo "CEFR" com sublinhado pontilhado e tooltip explicativo.
 * Hover no desktop, tap no mobile (toggle).
 *
 * Uso:
 *   import CEFRTooltip from "@/components/ui/CEFRTooltip";
 *   <CEFRTooltip /> → renders "CEFR" com tooltip
 *   <CEFRTooltip>nível CEFR</CEFRTooltip> → renders texto customizado
 */

import { useState, useRef, useEffect } from "react";

interface Props {
  children?: React.ReactNode;
}

export default function CEFRTooltip({ children = "CEFR" }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Fecha ao clicar fora (mobile)
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <span
      ref={ref}
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((v) => !v)}
      style={{ cursor: "help" }}
    >
      {/* Termo sublinhado pontilhado */}
      <span
        style={{
          borderBottom: "1.5px dotted currentColor",
          opacity: 0.85,
          paddingBottom: "1px",
        }}
      >
        {children}
      </span>

      {/* Tooltip */}
      {open && (
        <span
          role="tooltip"
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: "260px",
            background: "var(--color-bg)",
            color: "#F5F6F1",
            fontSize: "13px",
            lineHeight: 1.5,
            padding: "10px 14px",
            borderRadius: "8px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
            zIndex: 50,
            pointerEvents: "none",
            whiteSpace: "normal",
          }}
        >
          {/* Seta */}
          <span
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid #161616",
            }}
          />
          <strong style={{ color: "#FF6820" }}>CEFR</strong> é o padrão europeu
          de proficiência em idiomas — usado por Cambridge, IELTS e multinacionais
          para avaliar candidatos. Vai de A1 (iniciante) a C2 (proficiente).
        </span>
      )}
    </span>
  );
}
