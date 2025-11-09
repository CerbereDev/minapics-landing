import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const pricingPlans = [
  {
    name: "After Day",
    price: "300€",
    priceNote: "200€ avec un autre forfait",
    description: "Parfait pour une séance intimiste",
    features: [
      "Séance photo extérieure d'environ 1H30",
      "Minimum de 60 photos couleurs et noir et blanc",
      "Photos travaillées en haute qualité",
      "Remise sur clé USB dans un packaging prévu à cet effet",
      "Idéal en complément de votre reportage mariage"
    ]
  },
  {
    name: "La Nina",
    price: "600€",
    description: "Les plus beaux instants condensés",
    features: [
      "Photographies de la cérémonie laïque ou religieuse",
      "3h de présence au vin d'honneur",
      "Minimum de 200 photos couleurs et noir et blanc",
      "Retranscription de l'ambiance et des détails",
      "Portraits de vos invités pris sur le vif",
      "Photos des mariés et de groupes",
      "Remise sur clé USB en haute qualité"
    ]
  },
  {
    name: "La Myna",
    price: "800€",
    description: "Les grands moments de votre mariage",
    features: [
      "Du bouquet jusqu'à la fin du vin d'honneur (18h)",
      "Minimum de 350 photos couleurs et noir et blanc",
      "Photos des mariés et de groupes",
      "Retranscription de l'ambiance et des détails",
      "Portraits de vos invités pris sur le vif",
      "Remise sur clé USB en haute qualité"
    ],
    popular: true
  },
  {
    name: "La Ultima",
    price: "900€",
    priceNote: "à partir de",
    description: "Formule complète - Tous vos souvenirs",
    features: [
      "Des préparatifs de la mariée jusqu'à la soirée",
      "Minimum de 400 photos couleurs et noir et blanc",
      "900€ jusqu'à l'ouverture de bal (20h)",
      "1100€ jusqu'au repas (22h)",
      "1300€ jusqu'au dessert en soirée",
      "Photos des mariés et de groupes",
      "Retranscription complète de votre journée",
      "Remise sur clé USB en haute qualité",
      "Supplément 60€ par demi-heure (après 3h30)",
      "Frais kilométrique: 0,60€/km après 20 km"
    ]
  }
];

const videoPricing = [
  {
    name: "VIDEO FILM",
    price: "850€",
    description: "Vidéo longue de votre mariage",
    features: [
      "Vidéo entre 30 et 80 minutes",
      "Des préparatifs jusqu'à la pièce montée",
      "Vidéo stabilisée Haute définition",
      "Montage studio professionnel (3 jours)",
      "Cérémonie filmée intégralement"
    ]
  },
  {
    name: "VIDEO CLIP Teaser",
    price: "500€",
    description: "Teaser vidéo de votre mariage",
    features: [
      "Vidéo entre 5 et 10 minutes",
      "Des préparatifs jusqu'à la pièce montée",
      "Vidéo stabilisée Haute définition",
      "Montage studio professionnel (1 jour)",
      "Cérémonie filmée intégralement"
    ]
  },
  {
    name: "Mommy Love",
    price: "300€",
    description: "Séance intimiste avec la future maman",
    features: [
      "Séance photo extérieure d'environ 2h",
      "Minimum de 60 photos couleurs et noir et blanc",
      "Photos travaillées en haute qualité",
      "Remise sur clé USB dans un packaging prévu à cet effet"
    ]
  }
];

export const Pricing = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-calligraphy text-5xl md:text-6xl mb-4 text-foreground">
            Tarifs
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez nos forfaits mariage adaptés à vos besoins. Chaque formule inclut un travail professionnel et une remise sur clé USB.
          </p>
        </div>

        {/* Wedding Photography Packages */}
        <div className="mb-16">
          <h3 className="font-calligraphy text-3xl md:text-4xl mb-8 text-center text-foreground">
            Forfaits Mariage
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index}
                className={`relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  plan.popular ? 'border-accent border-2 shadow-glow' : 'border-border'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Plus Populaire
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="font-calligraphy text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-muted-foreground text-sm">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    {plan.priceNote && (
                      <p className="text-sm text-muted-foreground mt-1">{plan.priceNote}</p>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-foreground/80 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={scrollToContact}
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-accent text-accent-foreground hover:bg-accent/90' 
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    Réserver
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Video & Other Services */}
        <div>
          <h3 className="font-calligraphy text-3xl md:text-4xl mb-8 text-center text-foreground">
            Vidéo & Autres Services
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {videoPricing.map((service, index) => (
              <Card 
                key={index}
                className="relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border"
              >
                <CardHeader className="text-center pb-4">
                  <CardTitle className="font-calligraphy text-2xl mb-2">{service.name}</CardTitle>
                  <CardDescription className="text-muted-foreground text-sm">{service.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">{service.price}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-foreground/80 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={scrollToContact}
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  >
                    Réserver
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <p className="text-center text-muted-foreground mt-12 text-sm">
          Forfaits personnalisés disponibles. Contactez-moi pour discuter de vos besoins spécifiques.
        </p>
      </div>
    </section>
  );
};
