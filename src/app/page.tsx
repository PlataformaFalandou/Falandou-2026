import Navbar from "@/components/ui/Navbar";
import HeroAB from "@/components/sections/HeroAB";
import StatsBar from "@/components/sections/StatsBar";
import ForWhom from "@/components/sections/ForWhom";
import Journey from "@/components/sections/Journey";
import MetodoTeaser from "@/components/sections/MetodoTeaser";
import ComparisonTable from "@/components/sections/ComparisonTable";
import ProofStats from "@/components/sections/ProofStats";
import Testimonials from "@/components/sections/Testimonials";
import YouTubeVideos from "@/components/sections/YouTubeVideos";
import Teachers from "@/components/sections/Teachers";
import MidCTA from "@/components/sections/MidCTA";
import ROIFrame from "@/components/sections/ROIFrame";
import FAQ from "@/components/sections/FAQ";
import LeadMagnet from "@/components/sections/LeadMagnet";
import BlogPreview from "@/components/sections/BlogPreview";
import Footer from "@/components/ui/Footer";
import ScrollRevealInit from "@/components/ui/ScrollRevealInit";
import ScrollTracker from "@/components/ui/ScrollTracker";

// Uma coisa por seção (ponto 35): promessa → identificação → processo →
// diferença → prova → humanização → valor → objeções → ação → nutrição.
export default function HomePage() {
  return (
    <>
      <ScrollRevealInit />
      <ScrollTracker />
      <Navbar />
      <main>
        <HeroAB />
        {/* Ponto 38: identificação logo após a Hero; credenciais vêm depois */}
        <ForWhom />
        <StatsBar />
        <Journey />
        <MetodoTeaser />
        <ComparisonTable />
        <ProofStats />
        <Testimonials />
        <YouTubeVideos />
        <Teachers />
        <ROIFrame />
        <FAQ />
        <MidCTA />
        <LeadMagnet />
        <BlogPreview />
      </main>
      <Footer />
    </>
  );
}
