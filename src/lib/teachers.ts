// Fonte única dos professores — usada na seção Teachers da home e em /professores.

// Canal da escola — prova pública de como a Falandou ensina (ponto 42).
export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@falandou";
export type Teacher = {
  name: string;
  title: string;
  photo: string;
  credentials: string[];
  focus: string;
  specialty: string;
  bio: string;
};

export const teachers: Teacher[] = [
  {
    name: "Adriel Pelegrino",
    title: "Fundador & Professor",
    photo: "/images/prof-adriel.webp",
    credentials: ["Cambridge C2", "Filólogo e Linguista"],
    focus: "B2 – C2",
    specialty: "Entrevistas internacionais",
    bio: "7 anos treinando profissionais brasileiros para o mercado global. Especialista em comunicação de alto nível: negociações, entrevistas executivas e apresentações para clientes internacionais.",
  },
  {
    name: "Sara El Hamdaoui",
    title: "Professora",
    photo: "/images/prof-sara.webp",
    credentials: ["CELTA", "DELTA"],
    focus: "A1 – B1",
    specialty: "Inglês cotidiano",
    bio: "Pedagoga com formação europeia e certificações CELTA e DELTA — as mais exigentes para professores de inglês. Especializada em construir a base sólida que todo profissional precisa para crescer com confiança.",
  },
  {
    name: "Amanda Bennett",
    title: "Professora",
    photo: "/images/prof-amanda.webp",
    credentials: ["Cambridge", "IELTS", "TOEFL"],
    focus: "A1 – C2",
    specialty: "Literatura e escrita profissional",
    bio: "Pedagoga norte-americana com formação e prática em Cambridge, IELTS e TOEFL. Atende do nível A1 ao C2 com planos individualizados — do diagnóstico inicial até a preparação para certificação.",
  },
];

/** Âncora do perfil em /professores (ex.: "adriel-pelegrino"). */
export function teacherSlug(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Assinatura dos artigos do blog por categoria (revisão editorial §29 e §48 —
 * decisão da escola). O frontmatter `autor` sobrepõe a regra.
 */
export const AUTHOR_BY_CATEGORY: Record<string, string> = {
  "Carreira e Negócios": "Adriel Pelegrino",
  "Jurídico": "Adriel Pelegrino",
  "CEFR e Certificações": "Amanda Bennett",
  "Dicas de Estudo": "Sara El Hamdaoui",
};

export function articleAuthor(categoria: string, autor?: string): Teacher {
  const name = autor ?? AUTHOR_BY_CATEGORY[categoria] ?? "Adriel Pelegrino";
  return teachers.find((t) => t.name === name) ?? teachers[0];
}
