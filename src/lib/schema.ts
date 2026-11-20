// Dados estruturados (schema.org) — Arquitetura da Informação §10.
// Renderizados com <JsonLd data={...} /> (src/components/ui/JsonLd.tsx).
import { COMPANY } from "@/data/company";
import { PLANS } from "@/data/plans";
import { YOUTUBE_CHANNEL_URL } from "@/lib/teachers";

const BASE = "https://2026.falandou.com";

const ORG_REF = { "@type": "EducationalOrganization", name: COMPANY.legalName, url: `${BASE}/` };

/** Organization — home. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: COMPANY.legalName,
    alternateName: COMPANY.brand,
    url: `${BASE}/`,
    email: COMPANY.privacyEmail,
    description:
      "Escola de inglês profissional: plano individual, sessões 1 a 1 e exame CEFR antes e depois de cada ciclo de 90 dias.",
    sameAs: [YOUTUBE_CHANNEL_URL, "https://instagram.com/falandou", "https://linkedin.com/company/falandou"],
  };
}

function priceNumber(price: string) {
  return Number(price.replace(/[^\d,]/g, "").replace(",", "."));
}

/** Course — /planos e páginas por perfil. Ofertas = planos de src/data/plans.ts. */
export function courseSchema(opts: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: opts.name,
    description: opts.description,
    url: `${BASE}${opts.path}`,
    inLanguage: "en",
    provider: ORG_REF,
    educationalCredentialAwarded: "Exame de nível CEFR antes e depois do ciclo (aplicado pela escola)",
    timeRequired: "P90D",
    offers: PLANS.map((p) => ({
      "@type": "Offer",
      name: `Plano ${p.name} — ${p.sessions}`,
      price: priceNumber(p.price).toFixed(2),
      priceCurrency: "BRL",
      category: "Mensalidade",
      url: `${BASE}/planos/`,
    })),
  };
}

/** FAQPage — páginas com perguntas frequentes. */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
