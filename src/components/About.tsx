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
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm uppercase tracking-wider">
            About GART
          </span>
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

        {/* Mission & Vision Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
          {/* Mission Card */}
          <div className="group relative p-8 rounded-3xl bg-card border border-border shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center shadow-glow">
                  <Target className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our Mission</span>
                  <h3 className="text-xl font-bold text-foreground">Elevating Global Standards</h3>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                GART's mission is to advance education, professional practice, collaboration, research, 
                and service across radiation allied health professions. We are committed to excellence 
                in cancer care and uphold our societal responsibility to improve patient outcomes worldwide.
              </p>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="mission-objectives" className="border-0">
                  <AccordionTrigger className="px-4 py-3 rounded-xl bg-primary/5 hover:bg-primary/10 hover:no-underline transition-colors">
                    <span className="text-sm font-semibold text-primary">
                      View Mission Objectives
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <ul className="space-y-3">
                      {[
                        "Global standards, ethics, and excellence in professional practice",
                        "Lifelong learning through education, research, and innovation",
                        "International collaboration, leadership, and multidisciplinary teamwork",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Vision Card */}
          <div className="group relative p-8 rounded-3xl bg-card border border-border shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center">
                  <Eye className="w-7 h-7 text-secondary-foreground" />
                </div>
                <div>
                  <span className="text-secondary text-sm font-semibold uppercase tracking-wider">Our Vision</span>
                  <h3 className="text-xl font-bold text-foreground">Shaping the Future of Cancer Care</h3>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                A world where radiation allied health professionals are empowered, united, and recognised 
                as leaders in cancer care. Guided by equity, compassion, and excellence, GART strives to 
                be the leading global voice for professional advancement, ethical leadership, and 
                patient-centred practice in the radiation sciences.
              </p>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="vision-objectives" className="border-0">
                  <AccordionTrigger className="px-4 py-3 rounded-xl bg-secondary/10 hover:bg-secondary/15 hover:no-underline transition-colors">
                    <span className="text-sm font-semibold text-secondary">
                      View Vision Objectives
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <ul className="space-y-3">
                      {[
                        "Advance global education, standards, and ethical leadership",
                        "Foster collaboration, research, and innovation",
                        "Serve patients and communities through awareness and professional excellence",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                          <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
