import photographerPortrait from "@/assets/photographer-portrait.jpg";
import photographerWorking from "@/assets/photographer-working.jpg";

export const About = () => {
  return (
    <section id="about" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-calligraphy font-bold mb-4">À Propos</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Passionnée par la capture de moments authentiques et de souvenirs intemporels
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-4xl font-calligraphy font-bold text-foreground">
              Bonjour, je suis Myriam
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Avec plus de 10 ans d&apos;expérience en photographie professionnelle, j&apos;ai eu le privilège 
              de capturer d&apos;innombrables moments précieux pour des familles, des couples et des entreprises. Mon 
              parcours a commencé par une simple passion pour la narration à travers les images, et il a 
              évolué vers un engagement à vie pour créer un art qui résonne avec l&apos;émotion et 
              l&apos;authenticité.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Chaque photographie raconte une histoire, et mon objectif est de vous aider à raconter la vôtre de la manière 
              la plus belle et significative possible. Que ce soit la joie d&apos;un jour de mariage, l&apos;intimité 
              d&apos;un portrait de famille ou le professionnalisme de la photographie d&apos;entreprise, j&apos;aborde 
              chaque projet avec dévouement, créativité et attention aux détails.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Je crois en la construction de connexions authentiques avec mes clients, en comprenant leur vision 
              et en la concrétisant à travers mon objectif. Créons ensemble quelque chose de magnifique.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="border-l-2 border-accent pl-4">
                <div className="text-4xl font-calligraphy font-bold text-accent mb-1">10+</div>
                <div className="text-muted-foreground">Années d&apos;Expérience</div>
              </div>
              <div className="border-l-2 border-accent pl-4">
                <div className="text-4xl font-calligraphy font-bold text-accent mb-1">500+</div>
                <div className="text-muted-foreground">Clients Satisfaits</div>
              </div>
              <div className="border-l-2 border-accent pl-4">
                <div className="text-4xl font-calligraphy font-bold text-accent mb-1">50+</div>
                <div className="text-muted-foreground">Prix Remportés</div>
              </div>
              <div className="border-l-2 border-accent pl-4">
                <div className="text-4xl font-calligraphy font-bold text-accent mb-1">1000+</div>
                <div className="text-muted-foreground">Projets Réalisés</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={photographerPortrait}
                alt="Professional photographer portrait"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={photographerWorking}
                alt="Photographer at work in studio"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
