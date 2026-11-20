// Inline SVG paths sourced from Simple Icons (simpleicons.org) — CC0 collection license.
// Amazon and IBM paths sourced from their public brand guidelines.
// Brand marks remain subject to their owners' trademark terms.
// Usage context: referencing employers of enrolled students — not claiming endorsement.

// viewBox "0 0 24 24" for all icons
const logos: { name: string; path: string; viewBox?: string }[] = [
  {
    name: "Accenture",
    // Simple Icons — simpleicons.org
    path: "m.66 16.95 13.242-4.926L.66 6.852V0l22.68 9.132v5.682L.66 24Z",
  },
  {
    name: "Amazon",
    // Amazon smile + wordmark-style path from Simple Icons v9 (removed in v13 for trademark)
    path: "M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.439-2.186 1.439-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.699-3.182v.684zm3.186 7.705a.659.659 0 0 1-.742.074c-1.044-.869-1.231-1.273-1.802-2.102-1.721 1.753-2.942 2.278-5.174 2.278-2.643 0-4.698-1.631-4.698-4.892 0-2.549 1.382-4.284 3.349-5.132 1.704-.751 4.085-.884 5.907-1.09V6.47c0-.703.054-1.531-.358-2.138-.355-.541-1.038-.765-1.636-.765-1.112 0-2.1.571-2.342 1.754-.05.263-.244.522-.507.535l-2.832-.307c-.238-.053-.504-.246-.435-.611C6.573 2.051 9.372 1.19 11.9 1.19c1.291 0 2.979.344 3.998 1.318 1.291 1.207 1.167 2.816 1.167 4.566v4.137c0 1.244.516 1.791 1.001 2.462.17.238.207.523-.008.701l-1.914 1.421zm3.162 2.847C18.531 22.671 15.361 24 12.601 24 8.898 24 5.56 22.567 3.042 20.19c-.199-.18-.022-.427.219-.287 2.721 1.583 6.082 2.534 9.555 2.534 2.344 0 4.924-.487 7.299-1.496.358-.152.657.234.191.505zm.945-2.876c-.272-.349-1.797-.165-2.484-.083-.208.025-.24-.156-.053-.287 1.217-.856 3.213-.609 3.446-.322.234.288-.062 2.283-1.202 3.233-.175.147-.342.069-.264-.125.256-.638.829-2.065.557-2.416z",
  },
  {
    name: "IBM",
    // IBM 8-bar logo path from Simple Icons v9
    path: "M0 7.994v1.65h7.714c-.12-.54-.27-1.11-.45-1.65H0zm0 4.65v1.65h7.713a13.09 13.09 0 0 1-.449-1.65H0zM9.86 7.994a7.816 7.816 0 0 1 .475 1.65h3.33V7.994H9.86zm.475 4.65a7.816 7.816 0 0 1-.474 1.65h3.804v-1.65h-3.33zM6.188 3.344v1.65h3.9A9.84 9.84 0 0 0 8.4 3.344H6.188zm-6.188 0v1.65h8.4A9.84 9.84 0 0 0 6.713 3.344H0zM6.188 19.006v1.65H8.4a9.84 9.84 0 0 0 1.688-1.65h-3.9zm-6.188 0v1.65h6.713a9.84 9.84 0 0 0 1.688-1.65H0zm7.763-5.012a9.028 9.028 0 0 1-.375 1.65h3.3c.09-.525.165-1.08.21-1.65h-3.135zm0-4.65a9.028 9.028 0 0 1 .375 1.65H11.4c-.045-.57-.12-1.125-.21-1.65H7.763zm7.838-5.999v1.65H24v-1.65h-8.4zm0 4.65v1.65H24v-1.65h-8.4zm0 4.65v1.65H24v-1.65h-8.4zm0 4.65v1.65H24v-1.65h-8.4z",
  },
  {
    name: "Google",
    // Simple Icons — simpleicons.org
    path: "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z",
  },
  {
    name: "JPMorgan Chase",
    // Simple Icons — siChase
    path: "M0 15.415c0 .468.38.85.848.85h5.937V.575L0 7.72v7.695m15.416 8.582c.467 0 .846-.38.846-.849v-5.937H.573l7.146 6.785h7.697M24 8.587a.844.844 0 0 0-.847-.846h-5.938V23.43l6.782-7.148L24 8.586M8.585.003a.847.847 0 0 0-.847.847v5.94h15.688L16.282.003H8.585Z",
  },
  {
    name: "Unilever",
    // Simplified Unilever U mark (custom, trademark Unilever)
    path: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10 0 5.515-4.486 10-10 10C6.486 22 2 17.515 2 12 2 6.486 6.486 2 12 2zm-3.5 5v9.5c0 1.933 1.567 3.5 3.5 3.5s3.5-1.567 3.5-3.5V7h-2v9.5c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5V7h-2z",
  },
];

export default function CompanyLogos() {
  return (
    <section
      className="py-16"
      style={{ backgroundColor: "var(--color-bg)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-center font-body text-sm font-semibold uppercase tracking-widest text-white/30 mb-10">
          Profissionais formados em empresas como
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="opacity-30 hover:opacity-60 transition-opacity duration-300 flex items-center justify-center"
              title={logo.name}
              style={{ height: "44px" }}
            >
              <svg
                role="img"
                viewBox={logo.viewBox ?? "0 0 24 24"}
                xmlns="http://www.w3.org/2000/svg"
                style={{ height: "100%", width: "auto", maxWidth: "160px", fill: "#ffffff" }}
                aria-label={logo.name}
              >
                <path d={logo.path} />
              </svg>
            </div>
          ))}
        </div>

        {/* Saída leve — contexto antes do próximo passo */}
        <p className="text-center mt-10 font-body text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
          Esses profissionais estudaram na Falandou.{" "}
          <a
            href="#como-funciona"
            className="underline underline-offset-4 hover:text-white transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Veja como funciona →
          </a>
        </p>
      </div>
    </section>
  );
}
