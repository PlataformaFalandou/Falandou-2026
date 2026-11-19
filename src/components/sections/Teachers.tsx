"use client";

import Image from "next/image";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackCTAClick } from "@/lib/analytics";

const teachers = [
  {
    name: "Adriel Pelegrino",
    title: "Fundador & Professor",
    photo: "/images/prof-adriel.png",
    credentials: ["Cambridge C2", "Filólogo e Linguista"],
    focus: "B2 – C2",
    specialty: "Entrevistas internacionais",
    bio: "7 anos treinando profissionais brasileiros para o mercado global. Especialista em comunicação de alto nível: negociações, entrevistas executivas e apresentações para clientes internacionais.",
  },
  {
    name: "Sara El Hamdaoui",
    title: "Professora",
    photo: "/images/prof-sara.jpg",
    credentials: ["CELTA", "DELTA"],
    focus: "A1 – B1",
    specialty: "Inglês cotidiano",
    bio: "Pedagoga com formação europeia e certificações CELTA e DELTA — as mais exigentes para professores de inglês. Especializada em construir a base sólida que todo profissional precisa para crescer com confiança.",
  },
  {
    name: "Amanda Bennett",
    title: "Professora",
    photo: "/images/prof-amanda.png",
    credentials: ["Cambridge", "IELTS", "TOEFL"],
    focus: "A1 – C2",
    specialty: "Literatura e escrita profissional",
    bio: "Pedagoga norte-americana com domínio completo dos principais exames internacionais. Atende todos os níveis com foco em fluência real — do diagnóstico inicial até a certificação.",
  },
];

export default function Teachers() {
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: "#161616" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
            Quem vai te ensinar
          </p>
          <h2
            className="font-display font-extrabold text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Professores reais, credenciais verificáveis.
          </h2>
          <p className="font-body text-white/50 text-lg mt-4 max-w-xl mx-auto">
            Cada profissional é atribuído a um professor com base no diagnóstico CEFR e no objetivo do ciclo.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teachers.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col"
              style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
            >
              {/* Photo */}
              <div className="relative w-full aspect-square overflow-hidden">
                <Image
                  src={t.photo}
                  alt={t.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Focus badge */}
                <div
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: "#FF6820" }}
                >
                  Foco {t.focus}
                </div>
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display font-extrabold text-white text-xl mb-0.5">{t.name}</h3>
                <p className="font-body text-white/40 text-sm mb-4">{t.title}</p>

                {/* Credentials */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {t.credentials.map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: "rgba(255,104,32,0.15)", color: "#FF6820", border: "1px solid rgba(255,104,32,0.3)" }}
                    >
                      {c}
                    </span>
                  ))}
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold text-white/50"
                    style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                  >
                    {t.specialty}
                  </span>
                </div>

                {/* Bio */}
                <p className="font-body text-white/60 text-sm leading-relaxed flex-1">{t.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA — visitante acabou de conhecer o time */}
        <div className="mt-16 text-center">
          <p className="font-body text-base mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
            Seu professor será escolhido com base no seu diagnóstico CEFR e objetivo.
          </p>
          <a
            href={getWhatsAppUrl("hero")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick("teachers")}
            className="inline-flex items-center gap-3 font-body font-bold text-base px-8 py-4 rounded-full transition-all duration-300 hover:opacity-90 hover:scale-105"
            style={{ backgroundColor: "#FF6820", color: "#fff" }}
          >
            Falar com nossa equipe
          </a>
        </div>
      </div>
    </section>
  );
}
