import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const About = () => {
  // Function to render GART with colored letters
  const renderColoredGART = () => (
    <span className="font-bold">
      <span className="text-primary">G</span>lobal{" "}
      <span className="text-primary">A</span>ssociation of{" "}
      <span className="text-primary">R</span>adiation{" "}
      <span className="text-primary">T</span>herapists
    </span>
  );

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Tagline */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            About GART
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Empowering Professionals,{" "}
            <span className="text-gradient">Improving Cancer Care</span>
          </h2>
        </div>

        {/* Who We Are */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 border-l-4 border-primary pl-4">
            Who We Are
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The {renderColoredGART()} (<span className="text-primary font-bold">GART</span>) is an independent, international, 
            non-governmental professional body founded in 2026. We represent Radiation Therapists and allied health 
            experts across the radiation sciences and cancer care. Our foundation is built upon pillars of 
            education, collaboration, research, and professional leadership and advancement of global 
            standards in patient care.
          </p>
        </div>

        {/* Mission Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 border-l-4 border-secondary pl-4">
                Our Mission
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                GART's mission is to advance education, professional practice, collaboration, research, 
                and service across radiation allied health professions. We are committed to excellence 
                in cancer care and uphold our societal responsibility to improve patient outcomes worldwide.
              </p>
            </div>
            <div className="lg:mt-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="mission-commitments" className="border border-border rounded-lg bg-card shadow-sm">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 rounded-lg">
                    <span className="text-left font-semibold text-foreground">
                      Mission Objectives
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>Global standards, ethics, and excellence in professional practice</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>Lifelong learning through education, research, and innovation</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>International collaboration, leadership, and multidisciplinary teamwork</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 border-l-4 border-primary pl-4">
                Our Vision
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A world where radiation allied health professionals are empowered, united, and recognised 
                as leaders in cancer care. Guided by equity, compassion, and excellence, GART strives to 
                be the leading global voice for professional advancement, ethical leadership, and 
                patient-centred practice in the radiation sciences.
              </p>
            </div>
            <div className="lg:mt-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="vision-objectives" className="border border-border rounded-lg bg-card shadow-sm">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 rounded-lg">
                    <span className="text-left font-semibold text-foreground">
                      Vision Objectives
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                        <span>Advance global education, standards, and ethical leadership</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                        <span>Foster collaboration, research, and innovation</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                        <span>Serve patients and communities through awareness and professional excellence</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 border-l-4 border-secondary pl-4">
            Our Core Values
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Integrity, ethics, and professional excellence",
              "Collaboration, mutual respect, and teamwork",
              "Compassion, empathy, and human dignity",
              "Inclusivity, equity, and social responsibility",
              "Commitment to service for patients, profession, and society",
            ].map((value, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors flex items-center gap-3"
              >
                <span className="w-3 h-3 bg-gradient-to-br from-primary to-secondary rounded-full flex-shrink-0" />
                <p className="text-muted-foreground">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
