import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ServicesWithPricing } from "@/components/ServicesWithPricing";
import { Portfolio } from "@/components/Portfolio";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <ServicesWithPricing />
      <Portfolio />
      <About />
      <Contact />
      <footer className="bg-secondary py-8 text-center text-muted-foreground border-t border-border">
        <p>&copy; 2024 Les Instants de Myriam. Tous droits réservés.</p>
      </footer>
    </main>
  );
};

export default Index;
