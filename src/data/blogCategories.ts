// Cor de cada categoria do blog (SEO §13). Fora de lib/blog.ts porque
// aquele arquivo usa `fs` e não pode ser importado por componentes de cliente.
// Tons claros o bastante para texto legível sobre o fundo escuro do site.
export const CATEGORY_COLORS: Record<string, string> = {
  "Carreira e Negócios": "#FF8A4C",
  "Jurídico": "#B79BFF",
  "CEFR e Certificações": "#3FD0B8",
  "Dicas de Estudo": "#6FA8FF",
};

export function categoryColor(cat: string): string {
  return CATEGORY_COLORS[cat] ?? "#FF8A4C";
}
