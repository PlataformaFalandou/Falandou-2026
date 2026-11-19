import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import ForWhom from "@/components/sections/ForWhom";
import Journey from "@/components/sections/Journey";
import Testimonials from "@/components/sections/Testimonials";
import CompanyLogos from "@/components/sections/CompanyLogos";
import Teachers from "@/components/sections/Teachers";
import MidCTA from "@/components/sections/MidCTA";
import FAQ from "@/components/sections/FAQ";
import BlogPreview from "@/components/sections/BlogPreview";
import Footer from "@/components/ui/Footer";
import ScrollRevealInit from "@/components/ui/ScrollRevealInit";

export default function HomePage() {
  return (
    <>
      <ScrollRevealInit />
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <CompanyLogos />
        <ForWhom />
        <Journey />
        <Testimonials />
        <Teachers />
        <MidCTA />
        <FAQ />
        <BlogPreview />
      </main>
      <Footer />
    </>
  );
}
