import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const About = () => {
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
            The Global Academy of Radiation Therapists (GART) is an independent, non-governmental, 
            international professional association established in 2025. We represent Radiation Therapists, 
            Radiographers, Nuclear Medicine professionals, and allied health professionals involved in 
            radiation sciences and cancer care globally. Our foundation is built upon the pillars of 
            education, collaboration, research, professional leadership, and the advancement of global 
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
                and service across radiation therapy, radiology, diagnostic imaging, and nuclear medicine 
                allied health professions. We are committed to excellence in cancer care and uphold our 
                societal responsibility to improve patient outcomes worldwide.
              </p>
            </div>
            <div className="lg:mt-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="mission-commitments" className="border border-border rounded-lg bg-card shadow-sm">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 rounded-lg">
                    <span className="text-left font-semibold text-foreground">
                      To fulfil this mission, GART is committed to:
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>Global standards in education, ethics, and professional practice</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>Excellence and lifelong learning</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>Global knowledge exchange and collaboration</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>Professional leadership and multidisciplinary teamwork</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>Research, innovation, and societal impact</span>
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
                We envision a world where radiation therapy and allied health professionals are globally 
                empowered, professionally united, and recognized as leaders in cancer care. Through equity, 
                compassion, and excellence, we strive to improve cancer outcomes for all patients, 
                regardless of geography or circumstance. GART aspires to be the foremost voice for 
                professional advancement, ethical leadership, and patient-centered care in the radiation sciences.
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
                        <span>Advance global education and lifelong professional development</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                        <span>Foster national and international collaboration</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                        <span>Promote research, innovation, and evidence-based practice</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                        <span>Uphold professional standards and ethical leadership</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                        <span>Serve patients and communities through cancer awareness and support</span>
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
            Core Values
          </h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="core-values" className="border border-border rounded-lg bg-card shadow-sm">
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 rounded-lg">
                <span className="text-left font-semibold text-foreground text-lg">
                  Our Core Values
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { title: "Integrity & Ethical Practice", description: "Upholding the highest standards of honesty and professional ethics in all endeavors." },
                    { title: "Professional Excellence", description: "Striving for the highest quality in education, practice, and patient care." },
                    { title: "Collaboration & Mutual Respect", description: "Working together across disciplines and borders with respect for diverse perspectives." },
                    { title: "Compassion & Human Dignity", description: "Treating every patient and colleague with empathy, care, and respect." },
                    { title: "Inclusivity & Equity", description: "Ensuring equal access to opportunities and resources for all professionals globally." },
                    { title: "Social Responsibility", description: "Contributing to the well-being of communities and advancing public health." },
                    { title: "Commitment to Service", description: "Dedicating ourselves to serving patients, the profession, and society at large." },
                  ].map((value, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      <h4 className="font-semibold text-foreground mb-2">{value.title}</h4>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default About;
