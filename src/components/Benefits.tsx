import { useState } from "react";
import { 
  GraduationCap, 
  Network, 
  FileText, 
  Calendar, 
  Award, 
  HeartHandshake,
  ArrowRight,
  Target,
  Eye,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Benefits = () => {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const benefits = [
    {
      id: "continuing-education",
      icon: GraduationCap,
      title: "Continuing Education",
      description: "Access high-quality courses, webinars, and certification programs designed for radiation therapy professionals.",
      color: "primary",
      dialogContent: [
        "Access globally relevant, evidence-based learning modules and webinars.",
        "Gain certification and CPD recognition to strengthen credentials.",
        "Learn advanced technologies through skill-focused and case-based courses.",
        "Stay updated on best practices and evolving treatment standards.",
        "Flexible online learning supporting career growth and lifelong excellence.",
      ],
    },
    {
      id: "global-network",
      icon: Network,
      title: "Global Network",
      description: "Connect with peers worldwide, share experiences, and collaborate on advancing the profession.",
      color: "secondary",
      dialogContent: [
        "Connect and collaborate with professionals worldwide.",
        "Share clinical experiences, innovations, and best practices.",
        "Participate in forums, discussions, and international projects.",
        "Build mentorship, peer support, and professional identity.",
        "Expand global career opportunities within a trusted community.",
      ],
    },
    {
      id: "research-publications",
      icon: FileText,
      title: "Research & Publications",
      description: "Stay updated with the latest research, clinical guidelines, and peer-reviewed publications.",
      color: "primary",
      dialogContent: [
        "Access the latest research, guidelines, and evidence-based resources.",
        "Contribute to journals, forums, and collaborative research projects.",
        "Develop academic writing and publication skills.",
        "Promote ethical, high-quality scientific reporting.",
        "Translate research into improved patient care and practice.",
      ],
    },
    {
      id: "conferences-events",
      icon: Calendar,
      title: "Conferences & Events",
      description: "Participate in international conferences, workshops, and networking events throughout the year.",
      color: "secondary",
      dialogContent: [
        "Attend international conferences, workshops, and hybrid events.",
        "Network with global leaders and professional peers.",
        "Present research, innovations, and clinical experiences.",
        "Learn emerging technologies, workflows, and best practices.",
        "Build leadership, communication, and lifelong professional connections.",
      ],
    },
    {
      id: "professional-recognition",
      icon: Award,
      title: "Professional Recognition",
      description: "Earn credentials and recognition that validate your expertise and commitment to excellence.",
      color: "primary",
      dialogContent: [
        "Earn credentials validating expertise and professional excellence.",
        "Gain recognition for academic, clinical, and innovative contributions.",
        "Enhance professional profile and credibility globally.",
        "Support career progression and leadership development.",
        "Promote ethical, patient-centred, and quality-driven practice.",
      ],
    },
    {
      id: "advocacy-support",
      icon: HeartHandshake,
      title: "Advocacy & Support",
      description: "Join a community that advocates for the profession and supports members at every career stage.",
      color: "secondary",
      dialogContent: [
        "Advocate for professional rights, recognition, and fair standards.",
        "Represent members at policy, regulatory, and leadership levels.",
        "Support wellbeing, career challenges, and role development.",
        "Foster inclusive, ethical, and patient-centred practice.",
        "Strengthen the collective voice of the profession worldwide.",
      ],
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

        {/* Mission & Vision Summary Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          <div className="group relative p-6 rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                <Target className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <span className="text-primary text-xs font-semibold uppercase tracking-wider">Our Mission</span>
                <h3 className="text-lg font-bold text-foreground">Elevating Global Standards</h3>
              </div>
            </div>
          </div>
          
          <div className="group relative p-6 rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-7 h-7 text-secondary-foreground" />
              </div>
              <div>
                <span className="text-secondary text-xs font-semibold uppercase tracking-wider">Our Vision</span>
                <h3 className="text-lg font-bold text-foreground">Shaping the Future of Cancer Care</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              onClick={() => setOpenDialog(benefit.id)}
              className="group relative p-6 rounded-2xl border border-border bg-card overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500"
            >
              {/* Hover gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color === 'primary' ? 'from-primary/5 to-primary/10' : 'from-secondary/5 to-secondary/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Decorative corner */}
              <div className={`absolute top-0 right-0 w-20 h-20 ${benefit.color === 'primary' ? 'bg-primary/10' : 'bg-secondary/10'} rounded-bl-[4rem] opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl ${benefit.color === 'primary' ? 'gradient-hero' : 'gradient-accent'} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-md`}>
                  <benefit.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{benefit.description}</p>
                
                <div className={`inline-flex items-center gap-2 text-sm font-semibold ${benefit.color === 'primary' ? 'text-primary' : 'text-secondary'} group-hover:gap-3 transition-all duration-300`}>
                  <Sparkles className="w-4 h-4" />
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dialogs for each benefit */}
        {benefits.map((benefit) => (
          <Dialog key={benefit.id} open={openDialog === benefit.id} onOpenChange={() => setOpenDialog(null)}>
            <DialogContent className="sm:max-w-lg bg-card border-border">
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl ${benefit.color === 'primary' ? 'gradient-hero' : 'gradient-accent'} flex items-center justify-center shadow-md`}>
                    <benefit.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <DialogTitle className="text-2xl font-bold text-foreground">
                    {benefit.title}
                  </DialogTitle>
                </div>
                <DialogDescription className="sr-only">
                  Details about {benefit.title}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                {benefit.dialogContent.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                    <span className={`w-2.5 h-2.5 ${benefit.color === 'primary' ? 'bg-primary' : 'bg-secondary'} rounded-full mt-1.5 flex-shrink-0`} />
                    <p className="text-muted-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        ))}

        {/* CTA Banner */}
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl gradient-hero p-10 md:p-16">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary-foreground/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
            
            {/* Floating elements */}
            <div className="absolute top-10 left-10 w-4 h-4 bg-primary-foreground/20 rounded-full animate-float" />
            <div className="absolute bottom-16 right-20 w-6 h-6 bg-secondary/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 right-10 w-3 h-3 bg-primary-foreground/15 rounded-full animate-float" style={{ animationDelay: '2s' }} />
            
            <div className="relative z-10 text-center">
              <h3 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
                Ready to Advance Your Career?
              </h3>
              <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
                Join thousands of radiation therapy professionals who are making a difference 
                in cancer care worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button variant="hero" size="lg" className="group text-base px-8">
                    Join GART Today
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/events">
                  <Button variant="heroOutline" size="lg" className="text-base px-8">
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
