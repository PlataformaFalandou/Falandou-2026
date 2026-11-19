"use client";

// Logos via Simple Icons CDN (simpleicons.org) — CC0 collection license.
// Brand marks remain subject to their owners' trademark terms.
// Usage context: referencing employers of enrolled students — not claiming company endorsement.

const companies = [
  { name: "Accenture",      slug: "accenture" },
  { name: "Amazon",         slug: "amazon" },
  { name: "IBM",            slug: "ibm" },
  { name: "Google",         slug: "google" },
  { name: "JPMorgan Chase", slug: "jpmorganchase" },
  { name: "Unilever",       slug: "unilever" },
];

export default function CompanyLogos() {
  return (
    <section
      className="py-16"
      style={{ backgroundColor: "#0e0e0e", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-center font-body text-sm font-semibold uppercase tracking-widest text-white/30 mb-10">
          Profissionais formados em empresas como
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {companies.map((c) => (
            <div
              key={c.name}
              className="opacity-30 hover:opacity-60 transition-opacity duration-300 flex items-center justify-center"
              title={c.name}
              style={{ height: "32px" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/${c.slug}/ffffff`}
                alt={c.name}
                style={{ height: "100%", width: "auto", maxWidth: "130px", objectFit: "contain" }}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const span = document.createElement("span");
                  span.textContent = c.name;
                  span.style.cssText = "color:white;font-size:13px;font-weight:600;letter-spacing:0.05em;";
                  target.parentNode?.appendChild(span);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
