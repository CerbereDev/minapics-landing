import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export const Hero = () => {
  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background/80" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-calligraphy font-bold mb-6 animate-fade-in leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Capturing Life&apos;s
          <span className="block text-accent mt-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Precious Moments</span>
        </h1>
        <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto animate-fade-in drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" style={{ animationDelay: "0.2s" }}>
          Professional photography that tells your unique story through stunning visual artistry
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Button 
            size="lg" 
            className="bg-accent text-white hover:bg-accent/90 shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.6)] transition-all font-semibold"
            onClick={scrollToPortfolio}
          >
            View Portfolio
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.5)] font-semibold"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get in Touch
          </Button>
        </div>
        
        <button 
          onClick={scrollToPortfolio}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer border-none bg-transparent"
          aria-label="Scroll to portfolio"
        >
          <ArrowDown className="w-8 h-8 text-accent" />
        </button>
      </div>
    </section>
  );
};
