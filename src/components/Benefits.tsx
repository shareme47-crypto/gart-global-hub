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
  X
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

        {/* Mission & Vision Summary Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          <div className="p-6 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Our Mission</h3>
            </div>
            <p className="text-muted-foreground">Elevating Global Standards</p>
          </div>
          <div className="p-6 rounded-2xl border border-border bg-gradient-to-br from-secondary/5 to-secondary/10 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                <Eye className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Our Vision</h3>
            </div>
            <p className="text-muted-foreground">Shaping the Future of Cancer Care</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              onClick={() => setOpenDialog(benefit.id)}
              className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
              <p className="text-primary text-xs mt-3 group-hover:underline">Click to learn more →</p>
            </div>
          ))}
        </div>

        {/* Dialogs for each benefit */}
        {benefits.map((benefit) => (
          <Dialog key={benefit.id} open={openDialog === benefit.id} onOpenChange={() => setOpenDialog(null)}>
            <DialogContent className="sm:max-w-lg bg-card border-border">
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <DialogTitle className="text-xl font-bold text-foreground">
                    {benefit.title}
                  </DialogTitle>
                </div>
                <DialogDescription className="text-muted-foreground sr-only">
                  Details about {benefit.title}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 mt-4">
                {benefit.dialogContent.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        ))}

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
