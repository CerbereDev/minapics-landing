import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";
import portfolio7 from "@/assets/portfolio-7.jpg";
import portfolio8 from "@/assets/portfolio-8.jpg";
import portfolio9 from "@/assets/portfolio-9.jpg";
import portfolio10 from "@/assets/portfolio-10.jpg";
import portfolio11 from "@/assets/portfolio-11.jpg";
import portfolio12 from "@/assets/portfolio-12.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const portfolioItems = [
  { src: portfolio1, alt: "Wedding couple portrait at golden hour" },
  { src: portfolio2, alt: "Professional corporate headshot" },
  { src: portfolio3, alt: "Luxury product photography with dramatic lighting" },
  { src: portfolio4, alt: "Dramatic mountain landscape at sunset" },
  { src: portfolio5, alt: "High fashion editorial photography" },
  { src: portfolio6, alt: "Joyful family portrait in natural setting" },
  { src: portfolio7, alt: "Wedding ceremony ring exchange moment" },
  { src: portfolio8, alt: "Elegant bride portrait in garden setting" },
  { src: portfolio9, alt: "Wedding couple dancing at reception" },
  { src: portfolio10, alt: "Wedding bouquet and rings detail shot" },
  { src: portfolio11, alt: "Joyful wedding guests celebration" },
  { src: portfolio12, alt: "Romantic sunset couple silhouette" },
];

export const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-calligraphy font-bold mb-4">Portfolio</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Une sélection soignée de mes plus beaux travaux, présentant des styles et sujets variés
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {portfolioItems.map((item, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="group relative overflow-hidden rounded-lg aspect-[4/5] animate-fade-in cursor-pointer">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>
    </section>
  );
};
