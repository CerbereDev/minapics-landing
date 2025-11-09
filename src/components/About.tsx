import photographerPortrait from "@/assets/photographer-portrait.jpg";
import photographerWorking from "@/assets/photographer-working.jpg";

export const About = () => {
  return (
    <section id="about" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-calligraphy font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Passionate about capturing authentic moments and timeless memories
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-4xl font-calligraphy font-bold text-foreground">
              Hello, I'm Your Photographer
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              With over 10 years of experience in professional photography, I've had the privilege 
              of capturing countless precious moments for families, couples, and businesses. My 
              journey began with a simple passion for storytelling through images, and it has 
              evolved into a lifelong commitment to creating art that resonates with emotion and 
              authenticity.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Every photograph tells a story, and my goal is to help you tell yours in the most 
              beautiful and meaningful way possible. Whether it's the joy of a wedding day, the 
              intimacy of a family portrait, or the professionalism of corporate photography, I 
              approach each project with dedication, creativity, and attention to detail.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              I believe in building genuine connections with my clients, understanding their vision, 
              and bringing it to life through my lens. Let's create something beautiful together.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="border-l-2 border-accent pl-4">
                <div className="text-4xl font-calligraphy font-bold text-accent mb-1">10+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
              <div className="border-l-2 border-accent pl-4">
                <div className="text-4xl font-calligraphy font-bold text-accent mb-1">500+</div>
                <div className="text-muted-foreground">Happy Clients</div>
              </div>
              <div className="border-l-2 border-accent pl-4">
                <div className="text-4xl font-calligraphy font-bold text-accent mb-1">50+</div>
                <div className="text-muted-foreground">Awards Won</div>
              </div>
              <div className="border-l-2 border-accent pl-4">
                <div className="text-4xl font-calligraphy font-bold text-accent mb-1">1000+</div>
                <div className="text-muted-foreground">Projects Completed</div>
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
