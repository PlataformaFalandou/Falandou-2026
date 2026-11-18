import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
};

export async function getArticles(categoria?: string) {
  let query = supabase
    .from("artigos")
    .select("id, titulo, slug, resumo, categoria, imagem_capa, created_at, tempo_leitura, publicado")
    .eq("publicado", true)
    .order("created_at", { ascending: false });

  if (categoria && categoria !== "todos") {
    query = query.eq("categoria", categoria);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
  return data as Article[];
}

export async function getArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from("artigos")
    .select("*")
    .eq("slug", slug)
    .eq("publicado", true)
    .single();

  if (error) return null;
  return data as Article;
}

export const categories = [
  "Todos",
  "Dicas",
  "Pronúncia",
  "Vocabulário",
  "Gramática",
  "Listening",
  "Motivação",
  "Entretenimento",
];
