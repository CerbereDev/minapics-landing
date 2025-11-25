import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import serviceWeddings from "@/assets/service-weddings.jpg";

const servicesWithPricing = [
  {
    image: serviceWeddings,
    title: "Weddings",
    description: "Romantic and timeless wedding photography that captures every precious moment of your special day.",
    packages: [
      {
        name: "After Day",
        price: "300€",
        priceNote: "200€ avec un autre forfait",
        features: [
          "Séance photo extérieure d'environ 1H30",
          "Minimum de 60 photos couleurs et noir et blanc",
          "Photos travaillées en haute qualité",
          "Remise sur clé USB dans un packaging prévu à cet effet",
        ]
      },
      {
        name: "La Nina",
        price: "600€",
        features: [
          "Photographies de la cérémonie laïque ou religieuse",
          "3h de présence au vin d'honneur",
          "Minimum de 200 photos couleurs et noir et blanc",
          "Retranscription de l'ambiance et des détails",
        ]
      },
      {
        name: "La Myna",
        price: "800€",
        popular: true,
        features: [
          "Du bouquet jusqu'à la fin du vin d'honneur (18h)",
          "Minimum de 350 photos couleurs et noir et blanc",
          "Photos des mariés et de groupes",
          "Retranscription de l'ambiance et des détails",
        ]
      },
      {
        name: "La Ultima",
        price: "900€",
        priceNote: "à partir de",
        features: [
          "Des préparatifs de la mariée jusqu'à la soirée",
          "Minimum de 400 photos couleurs et noir et blanc",
          "900€ jusqu'à l'ouverture de bal (20h)",
          "1100€ jusqu'au repas (22h)",
        ]
      }
    ]
  }
];

export const ServicesWithPricing = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-24 px-4 bg-secondary">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-calligraphy font-bold mb-4">Services & Tarifs</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional photography services with detailed pricing for your special moments
          </p>
        </div>
        
        <div className="space-y-24">
          {servicesWithPricing.map((service, serviceIndex) => (
            <div
              key={service.title}
              className="animate-fade-in"
              style={{ animationDelay: `${serviceIndex * 0.1}s` }}
            >
              {/* Service Header with Image */}
              <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden mb-12 shadow-lg">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent flex items-end">
                  <div className="p-8 md:p-12 w-full">
                    <h3 className="text-4xl md:text-5xl font-calligraphy font-bold mb-4">{service.title}</h3>
                    <p className="text-lg text-muted-foreground max-w-3xl">{service.description}</p>
                  </div>
                </div>
              </div>

              {/* Pricing Packages */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
                {service.packages.map((pkg) => (
                  <Card 
                    key={pkg.name}
                    className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                      pkg.popular ? 'border-primary border-2' : ''
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                        Populaire
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl font-calligraphy">{pkg.name}</CardTitle>
                      <CardDescription className="text-3xl font-bold text-foreground mt-2">
                        {pkg.price}
                        {pkg.priceNote && (
                          <span className="text-sm font-normal text-muted-foreground block mt-1">
                            {pkg.priceNote}
                          </span>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-3">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        onClick={scrollToContact}
                        className="w-full mt-4"
                        variant={pkg.popular ? "default" : "outline"}
                      >
                        Réserver
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
