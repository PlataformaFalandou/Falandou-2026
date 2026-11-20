/** Insere dados estruturados (schema.org) na página. */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify não escapa "</script>"; os dados vêm só de arquivos do projeto.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
