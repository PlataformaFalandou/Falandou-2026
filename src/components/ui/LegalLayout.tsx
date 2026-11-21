import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { COMPANY } from "@/data/company";

/** Moldura das páginas legais (/politica-de-privacidade e /termos). */
export default function LegalLayout({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="conteudo">
        <section className="pt-36 pb-12 md:pt-44 md:pb-16" style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="max-w-3xl mx-auto px-5 md:px-8">
            <p className="font-body text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#FF6820" }}>
              {eyebrow}
            </p>
            <h1 className="font-display font-extrabold text-white leading-tight mb-4" style={{ fontSize: "var(--text-h1)" }}>
              {title}
            </h1>
            <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Última atualização: {COMPANY.legalUpdatedAt}
            </p>
          </div>
        </section>
        <article className="legal py-16 md:py-20 bg-surface">
          <div className="max-w-3xl mx-auto px-5 md:px-8 font-body text-base leading-relaxed [&_h2]:font-display [&_h2]:font-extrabold [&_h2]:text-xl [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-ink [&_p]:mb-4 [&_p]:text-[rgba(245,246,241,0.85)] [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-2 [&_li]:text-[rgba(245,246,241,0.85)] [&_a]:text-[#FF6820] [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-ink">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
