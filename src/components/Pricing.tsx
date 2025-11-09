import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const pricingPlans = [
  {
    name: "Essential",
    price: "$299",
    description: "Perfect for intimate moments",
    features: [
      "1 hour photo session",
      "30 edited photos",
      "Online gallery",
      "Personal usage rights",
      "Digital downloads"
    ]
  },
  {
    name: "Professional",
    price: "$599",
    description: "Most popular choice",
    features: [
      "2 hour photo session",
      "75 edited photos",
      "Online gallery",
      "Commercial usage rights",
      "Digital downloads",
      "Print release",
      "One location change"
    ],
    popular: true
  },
  {
    name: "Premium",
    price: "$999",
    description: "Complete photography experience",
    features: [
      "4 hour photo session",
      "150+ edited photos",
      "Premium online gallery",
      "Full usage rights",
      "Digital downloads",
      "Print release",
      "Multiple locations",
      "Rush delivery (48h)",
      "Custom editing requests"
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
            Investment Options
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the perfect package for your photography needs. All packages include professional editing and personal consultation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                plan.popular ? 'border-accent border-2 shadow-glow' : 'border-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="font-calligraphy text-3xl mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{feature}</span>
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
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-12 text-sm">
          Custom packages available. Contact me to discuss your specific needs and requirements.
        </p>
      </div>
    </section>
  );
};
