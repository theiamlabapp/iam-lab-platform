import { BrandStatement } from "@/components/BrandStatement";
import { ComingSoonSection } from "@/components/ComingSoonSection";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";

export default function Home() {
  return (
    <div id="top" className="flex min-h-screen flex-col bg-[#fefefe] text-[#111111]">
      <Header />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <ServicesSection />
        <BrandStatement />
        <ComingSoonSection />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
