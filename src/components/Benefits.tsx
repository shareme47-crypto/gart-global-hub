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
    <section id="benefits" className="py-24 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm uppercase tracking-wider mb-6">
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

        {/* Benefits Grid - Static Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group relative p-6 rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                {/* Subtle hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  {/* Icon container */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl gradient-hero p-10 md:p-16">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary-foreground/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
            
            <div className="relative z-10 text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                Ready to Advance Your Career?
              </h3>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
                Join thousands of radiation therapy professionals who are making a 
                difference in cancer care worldwide.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 shadow-lg">
                  <Link to="/signup">
                    Join GART Today
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 text-primary-foreground hover:bg-white/10 font-semibold px-8">
                  <Link to="/events">View Events</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
