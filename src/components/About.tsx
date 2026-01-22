import { Target, Eye, Heart, Shield, Users } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const About = () => {
  const coreValues = [
    {
      icon: Shield,
      text: "Integrity, ethics, and professional excellence",
    },
    {
      icon: Users,
      text: "Collaboration, mutual respect, and teamwork",
    },
    {
      icon: Heart,
      text: "Compassion, empathy, and human dignity",
    },
    {
      icon: Target,
      text: "Inclusivity, equity, and social responsibility",
    },
    {
      icon: Eye,
      text: "Commitment to service for patients, profession, and society",
    },
  ];

  return (
    <section id="about" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm uppercase tracking-wider mb-6">
            About GART
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Empowering Professionals,{" "}
            <span className="text-gradient">Improving Cancer Care</span>
          </h2>
        </div>

        {/* Who We Are - Featured Card */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="relative p-8 md:p-12 rounded-3xl bg-card border border-border shadow-lg overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-1 h-12 bg-gradient-to-b from-primary to-secondary rounded-full" />
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  Who We Are
                </h3>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
                The <span className="font-bold"><span className="text-primary">G</span>lobal{" "}
                <span className="text-primary">A</span>ssociation of{" "}
                <span className="text-primary">R</span>adiation{" "}
                <span className="text-primary">T</span>herapists</span>{" "}
                (<span className="text-primary font-bold">GART</span>) is an independent, international, 
                non-governmental professional body founded in 2026. We represent Radiation Therapists and allied health 
                experts across the radiation sciences and cancer care. Our foundation is built upon pillars of 
                education, collaboration, research, and professional leadership and advancement of global 
                standards in patient care.
              </p>
            </div>
          </div>
        </div>


        {/* Core Values */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Our Core Values
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="group p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed pt-2">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
