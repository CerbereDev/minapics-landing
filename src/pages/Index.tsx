import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <footer className="bg-secondary py-8 text-center text-muted-foreground border-t border-border">
        <p>&copy; 2024 Professional Photography. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default Index;
