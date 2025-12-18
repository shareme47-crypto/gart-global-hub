import { 
  GraduationCap, 
  Network, 
  FileText, 
  Calendar, 
  Award, 
  HeartHandshake,
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Benefits = () => {
  const benefits = [
    {
      icon: GraduationCap,
      title: "Continuing Education",
      description: "Access high-quality courses, webinars, and certification programs designed for radiation therapy professionals.",
    },
    {
      icon: Network,
      title: "Global Network",
      description: "Connect with peers worldwide, share experiences, and collaborate on advancing the profession.",
    },
    {
      icon: FileText,
      title: "Research & Publications",
      description: "Stay updated with the latest research, clinical guidelines, and peer-reviewed publications.",
    },
    {
      icon: Calendar,
      title: "Conferences & Events",
      description: "Participate in international conferences, workshops, and networking events throughout the year.",
    },
    {
      icon: Award,
      title: "Professional Recognition",
      description: "Earn credentials and recognition that validate your expertise and commitment to excellence.",
    },
    {
      icon: HeartHandshake,
      title: "Advocacy & Support",
      description: "Join a community that advocates for the profession and supports members at every career stage.",
    },
  ];

  return (
    <section id="benefits" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Member Benefits
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Why Join <span className="text-gradient">GART</span>?
          </h2>
          <p className="text-lg text-muted-foreground">
            As a GART member, you gain access to resources and opportunities that 
            will elevate your career and enhance patient care.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl gradient-hero p-10 md:p-14">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-2xl" />
            
            <div className="relative z-10 text-center">
              <h3 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Advance Your Career?
              </h3>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Join thousands of radiation therapy professionals who are making a difference 
                in cancer care worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button variant="hero" size="lg" className="group">
                    Join GART Today
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/events">
                  <Button variant="heroOutline" size="lg">
                    View Events
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
