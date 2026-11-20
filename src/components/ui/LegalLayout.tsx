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
      <main>
        <section className="pt-36 pb-12 md:pt-44 md:pb-16" style={{ backgroundColor: "#161616" }}>
          <div className="max-w-3xl mx-auto px-6">
            <p className="font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
              {eyebrow}
            </p>
            <h1 className="font-display font-extrabold text-white leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}>
              {title}
            </h1>
            <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Última atualização: {COMPANY.legalUpdatedAt}
            </p>
          </div>
        </section>
        <article className="legal py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6 font-body text-base leading-relaxed [&_h2]:font-display [&_h2]:font-extrabold [&_h2]:text-xl [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-[#161616] [&_p]:mb-4 [&_p]:text-[rgba(22,22,22,0.75)] [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-2 [&_li]:text-[rgba(22,22,22,0.75)] [&_a]:text-[#FF6820] [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-[#161616]">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
