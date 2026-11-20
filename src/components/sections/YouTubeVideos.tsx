"use client";

import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";

/**
 * Vídeos curados do canal @falandou.
 * Critério de seleção: profundidade pedagógica — cada vídeo demonstra
 * o método da escola (aprender inglês pelo contexto, não por decoreba).
 *
 * Para atualizar: substitua videoId, title e description.
 * Thumbnails são servidos automaticamente pelo CDN do YouTube (sem API key).
 */
const FEATURED_VIDEOS = [
  {
    videoId: "SdofxASoPk8",
    title: "Aprenda a Pensar em Inglês",
    description: "Por que traduzir mentalmente trava sua fluência — e como construir um circuito direto entre o inglês e o pensamento.",
    tag: "Método",
  },
  {
    videoId: "zDHuIXTSVyo",
    title: "Inglês com filmes: EXPENDABLE vs REPLACEABLE",
    description: "Uma cena de Project Hail Mary revela a diferença brutal entre duas palavras que a maioria usa como sinônimos.",
    tag: "Vocabulário avançado",
  },
  {
    videoId: "JBsRqQqR13c",
    title: 'Nunca mais fale "THE" errado',
    description: "A lógica por trás do artigo definido em inglês — por que dizemos \"the United States\" mas nunca \"the Brazil\".",
    tag: "Gramática",
  },
  {
    videoId: "lzaOKO0PFcU",
    title: "Name after — a expressão que profissionais erram",
    description: "Como usar \"named after\" corretamente em contextos formais e por que isso importa em inglês de alto nível.",
    tag: "Expressão",
    isShort: true,
  },
];

interface VideoCardProps {
  videoId: string;
  title: string;
  description: string;
  tag: string;
  isShort?: boolean;
}

function VideoCard({ videoId, title, description, tag, isShort = false }: VideoCardProps) {
  const [playing, setPlaying] = useState(false);

  const embedUrl = isShort
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`
    : `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="group flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all duration-300">
      {/* Thumbnail / Embed */}
      <div
        className={`relative overflow-hidden cursor-pointer ${isShort ? "aspect-[9/16] max-h-64" : "aspect-video"}`}
        onClick={() => setPlaying(true)}
      >
        {playing ? (
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <>
            {/* Thumbnail */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnailUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Overlay escuro */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300" />
            {/* Botão play */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110 shadow-2xl"
                style={{ backgroundColor: "#FF6820" }}
              >
                <Play size={22} fill="white" className="text-white ml-0.5" />
              </div>
            </div>
            {/* Tag */}
            <div className="absolute top-3 left-3">
              <span
                className="text-white text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: "rgba(255,104,32,0.85)", backdropFilter: "blur(4px)" }}
              >
                {tag}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Texto */}
      <div className="flex flex-col flex-1 p-5 gap-2">
        <h3 className="text-white font-semibold text-base leading-snug line-clamp-2">
          {title}
        </h3>
        <p className="text-white/55 text-sm leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium mt-1 transition-colors duration-200"
          style={{ color: "#FF6820" }}
          onClick={(e) => e.stopPropagation()}
        >
          Assistir no YouTube
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}

export default function YouTubeVideos() {
  return (
    <section className="py-24" style={{ backgroundColor: "#161616" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#FF6820" }}
          >
            Canal Falandou
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
            <h2
              className="font-display font-extrabold text-white leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
            >
              Aprenda o método antes de decidir.
            </h2>
            <a
              href="https://www.youtube.com/@falandou"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors duration-200 whitespace-nowrap"
            >
              Ver todos os vídeos
              <ExternalLink size={14} />
            </a>
          </div>
          <p className="text-white/55 text-lg mt-3 max-w-2xl">
            Cada vídeo mostra como ensinamos — pelo contexto real, não por regras decoradas.
          </p>
        </div>

        {/* Grid de vídeos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURED_VIDEOS.map((video) => (
            <VideoCard key={video.videoId} {...video} />
          ))}
        </div>
      </div>
    </section>
  );
}
