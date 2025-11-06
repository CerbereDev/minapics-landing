import { Camera, Users, Briefcase, Mountain, Palette, Heart } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Weddings",
    description: "Romantic and timeless wedding photography that captures every precious moment of your special day.",
  },
  {
    icon: Users,
    title: "Portraits",
    description: "Professional portrait sessions that reveal the unique personality and beauty of every subject.",
  },
  {
    icon: Briefcase,
    title: "Corporate",
    description: "High-quality corporate headshots and commercial photography for businesses and brands.",
  },
  {
    icon: Mountain,
    title: "Landscape",
    description: "Breathtaking landscape photography that showcases the natural beauty of the world around us.",
  },
  {
    icon: Palette,
    title: "Product",
    description: "Creative product photography that highlights the unique features and quality of your merchandise.",
  },
  {
    icon: Camera,
    title: "Events",
    description: "Comprehensive event coverage capturing the energy and emotion of your special occasions.",
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Services</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive photography services tailored to your unique needs and vision
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-card border border-border rounded-lg p-8 hover:border-accent/50 transition-all duration-300 hover:shadow-glow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
