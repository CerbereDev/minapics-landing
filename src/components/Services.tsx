import serviceWeddings from "@/assets/service-weddings.jpg";
import servicePortraits from "@/assets/service-portraits.jpg";
import serviceCorporate from "@/assets/service-corporate.jpg";
import serviceLandscape from "@/assets/service-landscape.jpg";
import serviceProduct from "@/assets/service-product.jpg";
import serviceEvents from "@/assets/service-events.jpg";

const services = [
  {
    image: serviceWeddings,
    title: "Weddings",
    description: "Romantic and timeless wedding photography that captures every precious moment of your special day.",
  },
  {
    image: servicePortraits,
    title: "Portraits",
    description: "Professional portrait sessions that reveal the unique personality and beauty of every subject.",
  },
  {
    image: serviceCorporate,
    title: "Corporate",
    description: "High-quality corporate headshots and commercial photography for businesses and brands.",
  },
  {
    image: serviceLandscape,
    title: "Landscape",
    description: "Breathtaking landscape photography that showcases the natural beauty of the world around us.",
  },
  {
    image: serviceProduct,
    title: "Product",
    description: "Creative product photography that highlights the unique features and quality of your merchandise.",
  },
  {
    image: serviceEvents,
    title: "Events",
    description: "Comprehensive event coverage capturing the energy and emotion of your special occasions.",
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-24 px-4 bg-secondary">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-calligraphy font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional photography services tailored to capture your most precious moments
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in shadow-sm group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-3xl font-calligraphy font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
