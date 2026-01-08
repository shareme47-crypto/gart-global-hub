import { 
  BookOpen, 
  GraduationCap, 
  Compass, 
  Briefcase, 
  Globe, 
  FileCheck, 
  FileText, 
  ClipboardCheck, 
  Users, 
  Wrench, 
  Heart, 
  Sparkles, 
  Target,
  FolderOpen,
  BookMarked,
  Shield,
  Lightbulb,
  Video,
  ChevronRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SupportHub = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Professional Development
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            RTT Professional{" "}
            <span className="text-gradient">Support Hub</span>
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-primary mb-6">
            Learn • Grow • Connect Globally
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A dedicated platform supporting Radiation Therapists and allied health professionals 
            in academic growth, career development, and professional excellence worldwide. 
            Your gateway to continuous learning, global opportunities, and career advancement.
          </p>
        </div>
      </section>

      {/* Learn & Grow Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-xl">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Learn & Grow – Insight
                </h2>
                <p className="text-muted-foreground">Structured education for professional excellence</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Access structured online learning programs, professional certifications, 
                  and academic updates designed for radiation therapy professionals. Our 
                  platform offers exam-oriented resources, self-paced modules, and 
                  evidence-based education to support your continuous professional development.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Online Learning", "Certifications", "Self-Paced", "Evidence-Based"].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: GraduationCap, label: "Academic Updates" },
                  { icon: ClipboardCheck, label: "Exam Resources" },
                  { icon: BookMarked, label: "Study Materials" },
                  { icon: Video, label: "Video Lectures" },
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-card border border-border rounded-xl text-center hover:border-primary/50 transition-colors">
                    <item.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* List of Courses */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                List of Courses
              </h3>
              <div className="bg-muted/50 rounded-lg p-8 text-center">
                <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-semibold text-foreground mb-2">Available Soon</p>
                <p className="text-muted-foreground">Enrollment form will be added</p>
                <span className="inline-block mt-4 px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Guidance Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-secondary/10 rounded-xl">
                <Compass className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Career Guidance
                </h2>
                <p className="text-muted-foreground">National and international career planning support</p>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              Comprehensive career planning support for radiation therapy professionals seeking 
              opportunities both nationally and internationally. From pathway planning to 
              documentation assistance, we guide you through every step of your career journey.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Briefcase,
                  title: "Career Planning & Pathways",
                  description: "Clinical, academic, research, and leadership career tracks tailored to your goals."
                },
                {
                  icon: Globe,
                  title: "International Opportunities",
                  description: "Explore opportunities in UK, Ireland, Canada, UAE, Australia, and beyond."
                },
                {
                  icon: FileCheck,
                  title: "Registration Pathways",
                  description: "Guidance for HCPC, CORU, CAMRT, DHA / DOH / MOH registration processes."
                },
                {
                  icon: FileText,
                  title: "Documentation Support",
                  description: "CV preparation, Statement of Purpose, and experience letter assistance."
                },
                {
                  icon: ClipboardCheck,
                  title: "Exams & Interview Preparation",
                  description: "Structured preparation for licensing exams and job interviews."
                },
                {
                  icon: Users,
                  title: "Mentorship & Counseling",
                  description: "One-on-one mentorship and professional counseling support."
                },
              ].map((item, index) => (
                <div key={index} className="p-6 bg-card border border-border rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-secondary/10 rounded-lg flex-shrink-0">
                      <item.icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skill Development Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Wrench className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Skill Development
                </h2>
                <p className="text-muted-foreground">Continuous skill upgradation and professional growth</p>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              Enhance your capabilities through workshops, expert-led training sessions, 
              case discussions, and continuous skill upgradation programs designed for 
              modern radiation therapy practice.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Heart,
                  title: "Clinical Skill Enhancement",
                  items: ["Treatment planning", "Patient positioning", "Quality assurance", "Safety protocols"],
                  color: "primary"
                },
                {
                  icon: Users,
                  title: "Professional & Soft Skills",
                  items: ["Communication", "Team collaboration", "Patient interaction", "Leadership basics"],
                  color: "secondary"
                },
                {
                  icon: Sparkles,
                  title: "Advanced & Emerging Skills",
                  items: ["AI in radiotherapy", "Adaptive planning", "SBRT/SRS techniques", "Proton therapy"],
                  color: "primary"
                },
                {
                  icon: Target,
                  title: "Career-Oriented Skills",
                  items: ["Research methodology", "Publication writing", "Presentation skills", "Grant applications"],
                  color: "secondary"
                },
              ].map((category, index) => (
                <div key={index} className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
                  <div className={`p-3 bg-${category.color}/10 rounded-lg w-fit mb-4`}>
                    <category.icon className={`w-6 h-6 text-${category.color}`} />
                  </div>
                  <h3 className="font-bold text-foreground mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-muted/50 rounded-xl p-6 text-center">
              <p className="text-muted-foreground">
                Workshops and training sessions are being scheduled.{" "}
                <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-medium">
                  Coming Soon
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Materials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-secondary/10 rounded-xl">
                <FolderOpen className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Resource Materials
                </h2>
                <p className="text-muted-foreground">Trusted academic, clinical, and research resources</p>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              Access a comprehensive library of trusted academic, clinical, research, and 
              career resources curated specifically for radiation therapy professionals 
              and allied health practitioners.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="study" className="border border-border rounded-xl bg-card">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <BookMarked className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-foreground">Study Notes & Exam Guides</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        Comprehensive study notes for licensing exams
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        Practice questions and mock tests
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        Exam preparation strategies
                      </li>
                    </ul>
                    <span className="inline-block mt-3 px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs">
                      Coming Soon
                    </span>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sops" className="border border-border rounded-xl bg-card">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-secondary" />
                      <span className="font-semibold text-foreground">SOPs, QA Protocols & Safety</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-secondary" />
                        Standard operating procedures templates
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-secondary" />
                        Quality assurance checklists
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-secondary" />
                        Radiation safety resources
                      </li>
                    </ul>
                    <span className="inline-block mt-3 px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs">
                      Coming Soon
                    </span>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="research" className="border border-border rounded-xl bg-card">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Lightbulb className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-foreground">Research & Innovation</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        Research methodology guides
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        Latest innovation updates
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        Publication assistance
                      </li>
                    </ul>
                    <span className="inline-block mt-3 px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs">
                      Coming Soon
                    </span>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="media" className="border border-border rounded-xl bg-card">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Video className="w-5 h-5 text-secondary" />
                      <span className="font-semibold text-foreground">Lectures & Webinars</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-secondary" />
                        Recorded expert lectures
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-secondary" />
                        Webinar archives
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-secondary" />
                        Expert panel discussions
                      </li>
                    </ul>
                    <span className="inline-block mt-3 px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs">
                      Coming Soon
                    </span>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SupportHub;
