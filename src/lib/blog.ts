import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

export type FAQItem = { q: string; a: string };
export type TocItem = { id: string; text: string };

/**
 * Artigo do blog. Campos do frontmatter (SEO e Conteúdo — ver docs/seo-conteudo.md):
 * - titulo: H1, com a palavra-chave nos primeiros 50 caracteres (§16)
 * - titulo_seo: <title> com até 60 caracteres (§2). Sem ele, usa o titulo.
 * - descricao: meta description de 150–160 caracteres (§2). Sem ela, usa o resumo.
 * - palavra_chave e cluster: mapa de palavras-chave e topic clusters (§8, §9)
 * - pilar: true nas páginas pilar (mostra sumário navegável, §17)
 * - atualizado_em: data da última revisão (dateModified, §18)
 * - faq: 3–5 perguntas no fim do artigo, com FAQPage schema (§15)
 */
export type Article = {
  id: string;
  titulo: string;
  titulo_seo?: string;
  slug: string;
  resumo: string;
  descricao?: string;
  conteudo: string;
  categoria: string;
  imagem_capa?: string;
  created_at: string;
  atualizado_em?: string;
  tempo_leitura: number;
  publicado: boolean;
  palavra_chave?: string;
  cluster?: string;
  pilar: boolean;
  faq: FAQItem[];
  toc: TocItem[];
  /** ID de um vídeo do canal @falandou relacionado (Arquitetura §6). */
  video?: string;
};

function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Ids nos H2 (âncoras do sumário) e a lista do sumário. */
function withHeadingIds(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const out = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_m, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    let id = slugify(text) || `secao-${toc.length + 1}`;
    if (toc.some((t) => t.id === id)) id = `${id}-${toc.length + 1}`;
    toc.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
}

/** Tempo de leitura calculado do texto (200 palavras/min), arredondado para cima. */
function readingTime(markdown: string): number {
  const words = markdown.replace(/[#>*_`|\-[\]()]/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function readArticleFile(filename: string): Article | null {
  const slug = filename.replace(/\.mdx?$/, "");
  const filePath = path.join(CONTENT_DIR, filename);

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);

    if (data.publicado === false) return null;

    const { html, toc } = withHeadingIds(marked(content) as string);

    return {
      id: slug,
      slug,
      titulo: data.titulo ?? "Sem título",
      titulo_seo: data.titulo_seo,
      resumo: data.resumo ?? "",
      descricao: data.descricao,
      categoria: data.categoria ?? "Dicas de Estudo",
      imagem_capa: data.imagem_capa,
      created_at: data.created_at ?? new Date().toISOString(),
      atualizado_em: data.atualizado_em,
      tempo_leitura: readingTime(content),
      publicado: data.publicado ?? true,
      palavra_chave: data.palavra_chave,
      cluster: data.cluster,
      pilar: data.pilar === true,
      faq: Array.isArray(data.faq) ? (data.faq as FAQItem[]).filter((f) => f && f.q && f.a) : [],
      toc,
      video: data.video,
      conteudo: html,
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

/** Data da última revisão (ou da publicação). */
export function lastModified(a: Article): string {
  return a.atualizado_em ?? a.created_at;
}

/**
 * Divide o HTML antes do 4º H2 para o CTA de meio de artigo (SEO §15: depois do 3º H2).
 * Artigos com menos de 4 seções não recebem o CTA do meio (só o do fim).
 */
export function splitForMidCTA(html: string): [string, string | null] {
  const idx: number[] = [];
  const re = /<h2[\s>]/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) idx.push(m.index);
  if (idx.length < 4) return [html, null];
  return [html.slice(0, idx[3]), html.slice(idx[3])];
}

/** Página pilar mais recente — destaque no topo do /blog (SEO §13). */
export function getFeatured(): Article | null {
  const all = getArticles();
  return all.find((a) => a.pilar) ?? all[0] ?? null;
}

// Categorias (SEO §13): Carreira, Jurídico, CEFR e Certificações, Dicas de Estudo.
// O filtro do blog mostra só as que têm artigos publicados.
export const BLOG_CATEGORIES = ["Carreira", "Jurídico", "CEFR e Certificações", "Dicas de Estudo"];

export function getCategories(): string[] {
  const used = new Set(getArticles().map((a) => a.categoria));
  const known = BLOG_CATEGORIES.filter((c) => used.has(c));
  const others = [...used].filter((c) => !BLOG_CATEGORIES.includes(c));
  return ["Todos", ...known, ...others];
}

/** Mantido por compatibilidade: categorias com artigos publicados. */
export const categories = getCategories();
