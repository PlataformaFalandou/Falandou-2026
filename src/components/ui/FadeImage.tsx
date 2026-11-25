"use client";

/**
 * FadeImage — next/image com entrada discreta (direção de movimento §1.2):
 * opacidade em 300ms, sem zoom, desfoque ou deslocamento.
 * - O espaço da foto é reservado pelo contêiner (aspect-ratio/fill), então nada muda de lugar.
 * - Se a imagem já estiver carregada (cache, HTML estático), não há espera nem animação.
 * - Sem JavaScript, a imagem aparece normalmente (o estado oculto só é aplicado pelo script).
 */
import Image, { type ImageProps } from "next/image";
import { useEffect, useRef } from "react";

export default function FadeImage({ className = "", onLoad, alt, ...props }: ImageProps) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (img && !img.complete) img.dataset.loading = "true";
  }, []);

  return (
    <Image
      ref={ref}
      alt={alt}
      className={`img-fade ${className}`}
      onLoad={(e) => {
        delete (e.currentTarget as HTMLImageElement).dataset.loading;
        onLoad?.(e);
      }}
      {...props}
    />
  );
}
