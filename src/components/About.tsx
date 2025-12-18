import { Target, Eye, Heart } from "lucide-react";
import protonTherapy from "@/assets/proton-therapy.jpeg";

const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Who We Are
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Empowering Radiation Therapy Excellence{" "}
            <span className="text-gradient">Worldwide</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The Global Association of Radiation Therapists (GART) is a premier international 
            professional society dedicated to advancing the practice, education, and science 
            of radiation therapy worldwide.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-full" />
              <div className="pl-8">
                <h3 className="text-xl font-bold text-foreground mb-3">Our Foundation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We serve as a central hub for Radiation Therapists (RTs), Radiation Therapy 
                  Technologists (RTTs), and Dosimetrists across the globe, uniting them under 
                  a shared commitment to excellence in patient care and technological innovation.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-secondary to-primary rounded-full" />
              <div className="pl-8">
                <h3 className="text-xl font-bold text-foreground mb-3">Our Purpose</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Founded to address the evolving needs of the profession, GART provides a 
                  platform for knowledge exchange, standardization of best practices, and 
                  advocacy for the critical role RTs play in the multidisciplinary cancer care team.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary via-secondary to-primary rounded-full" />
              <div className="pl-8">
                <h3 className="text-xl font-bold text-foreground mb-3">Our Commitment</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We aim to support our members' professional journeys from student to expert 
                  practitioner, ensuring that the highest quality of radiation therapy is 
                  accessible to all patients worldwide.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Image & Feature Cards */}
          <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={protonTherapy} 
                alt="Advanced Proton Therapy Equipment" 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="grid gap-4">
              {[
                {
                  icon: Target,
                  title: "Focused Mission",
                  description: "Elevating global standards through education, research, and professional development.",
                  color: "bg-primary/10 text-primary",
                },
                {
                  icon: Eye,
                  title: "Clear Vision",
                  description: "To be the internationally recognized authority for radiation therapy professionals.",
                  color: "bg-secondary/10 text-secondary",
                },
                {
                  icon: Heart,
                  title: "Core Values",
                  description: "Excellence, integrity, collaboration, and unwavering commitment to patient care.",
                  color: "bg-accent text-accent-foreground",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group p-5 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-lg ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
