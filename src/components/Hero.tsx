import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import therapistImg from "@/assets/radiation-therapist.jpeg";

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${therapistImg})` }}
      />
      <div className="absolute inset-0 bg-primary/75" />

      <div className="container mx-auto px-4 pt-40 pb-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in-up tracking-wide">
            <span className="text-orange-400">G</span>LOBAL <span className="text-orange-400">A</span>SSOCIATION OF
            <br />
            <span className="text-orange-400">R</span>ADIATION <span className="text-orange-400">T</span>HERAPISTS
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-100">
            Advancing the Practice of Radiation Therapy Worldwide
          </p>

          {/* CTA Button */}
          <div className="animate-fade-in-up animation-delay-200">
            <a href="#about">
              <Button 
                size="lg" 
                className="bg-primary-foreground/10 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-10 py-6 text-lg font-semibold"
              >
                Learn More
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
