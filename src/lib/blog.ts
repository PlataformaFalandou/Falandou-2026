import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

export type Article = {
  id: string;
  titulo: string;
  slug: string;
  resumo: string;
  conteudo: string;
  categoria: string;
  imagem_capa?: string;
  created_at: string;
  tempo_leitura?: number;
  publicado: boolean;
  /** ID de um vídeo do canal @falandou relacionado (Arquitetura §6). */
  video?: string;
};

function readArticleFile(filename: string): Article | null {
  const slug = filename.replace(/\.mdx?$/, "");
  const filePath = path.join(CONTENT_DIR, filename);

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);

    if (data.publicado === false) return null;

    return {
      id: slug,
      slug,
      titulo: data.titulo ?? "Sem título",
      resumo: data.resumo ?? "",
      categoria: data.categoria ?? "Dicas",
      imagem_capa: data.imagem_capa,
      created_at: data.created_at ?? new Date().toISOString(),
      tempo_leitura: data.tempo_leitura,
      publicado: data.publicado ?? true,
      video: data.video,
      conteudo: marked(content) as string,
    };
  } catch {
    return null;
  }
}

export function getArticles(categoria?: string): Article[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const articles = files
    .map(readArticleFile)
    .filter((a): a is Article => a !== null)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  if (categoria && categoria !== "todos" && categoria !== "Todos") {
    return articles.filter((a) => a.categoria === categoria);
  }

  return articles;
}

export function getArticleBySlug(slug: string): Article | null {
  const mdx = path.join(CONTENT_DIR, `${slug}.mdx`);
  const md = path.join(CONTENT_DIR, `${slug}.md`);
  const file = fs.existsSync(mdx) ? mdx : fs.existsSync(md) ? md : null;
  if (!file) return null;
  return readArticleFile(path.basename(file));
}

// Arquitetura §6 — categorias recomendadas, nesta ordem. O filtro do blog mostra
// só as que têm artigos publicados (sem categoria vazia).
export const BLOG_CATEGORIES = [
  "Vocabulário Profissional",
  "Gramática Funcional",
  "Carreira Internacional",
  "Método",
  "CEFR",
];

export function getCategories(): string[] {
  const used = new Set(getArticles().map((a) => a.categoria));
  const known = BLOG_CATEGORIES.filter((c) => used.has(c));
  const others = [...used].filter((c) => !BLOG_CATEGORIES.includes(c));
  return ["Todos", ...known, ...others];
}

/** Mantido por compatibilidade: categorias com artigos publicados. */
export const categories = getCategories();