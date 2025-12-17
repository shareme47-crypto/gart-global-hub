import { BookOpen, Users, Shield, Globe, Lightbulb, Award } from "lucide-react";

const Mission = () => {
  const missionPoints = [
    {
      icon: BookOpen,
      title: "Advancing Education & Research",
      description: "Providing accessible, high-quality continuing education, professional development resources, and fostering research to innovate radiation therapy techniques and improve patient outcomes.",
    },
    {
      icon: Users,
      title: "Unifying the Profession",
      description: "Creating a strong, inclusive international network for Radiation Therapists to share knowledge, experiences, and best practices across borders.",
    },
    {
      icon: Shield,
      title: "Championing Professional Excellence",
      description: "Advocating for the vital role of RTs in oncology, promoting the highest ethical standards, and supporting evidence-based practice across all healthcare settings.",
    },
  ];

  const visionPoints = [
    {
      icon: Globe,
      title: "Equal Access to Education",
      description: "Every radiation therapy professional has equal access to cutting-edge education and training, regardless of location.",
    },
    {
      icon: Lightbulb,
      title: "Standardized Global Care",
      description: "Optimal, standardized, and safe radiation treatment is delivered globally, ensuring quality care everywhere.",
    },
    {
      icon: Award,
      title: "RTs as Healthcare Leaders",
      description: "Radiation Therapists are fully recognized as leaders in cancer care, driving technological and clinical advancements.",
    },
  ];

  return (
    <section id="mission" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Mission Section */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="text-center mb-16">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Our Mission
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Elevating Global Standards
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The mission of GART is to elevate the global standard of radiation therapy care 
              through education, unity, and professional excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {missionPoints.map((point, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden"
              >
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform duration-300">
                    <point.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{point.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
              Our Vision
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Shaping the Future of{" "}
              <span className="text-gradient">Cancer Care</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We envision a world where radiation therapy professionals are equipped, 
              recognized, and empowered to deliver the best possible patient outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {visionPoints.map((point, index) => (
              <div
                key={index}
                className="text-center p-8"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center mb-6 animate-float"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <point.icon className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{point.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
