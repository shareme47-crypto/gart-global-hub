import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, GraduationCap, Award, Users, Globe, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Education = () => {
  const programmes = [
    {
      icon: GraduationCap,
      title: "Continuing Professional Development",
      description: "Structured CPD programmes designed to help radiation allied health science professionals maintain and enhance their clinical competencies throughout their careers.",
      features: ["Online learning modules", "Accredited workshops", "Self-assessment tools", "CPD tracking system"],
    },
    {
      icon: BookOpen,
      title: "Clinical Training Resources",
      description: "Comprehensive educational materials covering the latest techniques in radiation allied health science, from foundational concepts to advanced procedures.",
      features: ["Treatment planning guides", "Protocol documentation", "Case study libraries", "Best practice guidelines"],
    },
    {
      icon: Award,
      title: "Certification Programmes",
      description: "Professional certification pathways that validate expertise and demonstrate commitment to excellence in radiation allied health science practice.",
      features: ["Specialty certifications", "Advanced practice credentials", "Leadership qualifications", "Research competencies"],
    },
    {
      icon: Users,
      title: "Mentorship & Training",
      description: "Structured mentorship programmes connecting experienced practitioners with emerging professionals to foster knowledge transfer and career growth.",
      features: ["One-to-one mentoring", "Peer learning networks", "Clinical supervision", "Career guidance"],
    },
  ];

  const upcomingCourses = [
    {
      title: "Advanced IMRT Techniques",
      date: "March 2026",
      format: "Online",
      level: "Advanced",
    },
    {
      title: "Patient Communication Skills",
      date: "April 2026",
      format: "Hybrid",
      level: "All Levels",
    },
    {
      title: "Quality Assurance in RT",
      date: "May 2026",
      format: "In-Person",
      level: "Intermediate",
    },
    {
      title: "Leadership in Healthcare",
      date: "June 2026",
      format: "Online",
      level: "Senior",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Professional Education
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Education & Training
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              GART is committed to advancing the knowledge and skills of radiation allied health science 
              professionals worldwide through comprehensive educational programmes, resources, 
              and professional development opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Educational Programmes */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Educational Programmes
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our educational initiatives are designed to support radiation allied health science professionals at 
              every stage of their professional journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {programmes.map((programme, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <programme.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {programme.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {programme.description}
                </p>
                <ul className="space-y-2">
                  {programme.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-primary mb-4">
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">Global Learning Network</span>
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Education Without Borders
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                GART's educational programmes are accessible to radiation allied health science professionals 
                worldwide. Our online learning platform, regional workshops, and international 
                conferences ensure that quality education reaches practitioners regardless of 
                their geographic location.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ArrowRight className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">Multilingual learning resources</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ArrowRight className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">Flexible online learning options</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ArrowRight className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">Regional training partnerships</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ArrowRight className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">International faculty network</span>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card rounded-xl p-6 border border-border text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Countries Reached</div>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border text-center">
                <div className="text-3xl font-bold text-primary mb-2">200+</div>
                <div className="text-sm text-muted-foreground">Courses Available</div>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border text-center">
                <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                <div className="text-sm text-muted-foreground">Professionals Trained</div>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border text-center">
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Courses */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-primary mb-4">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">Upcoming Learning Opportunities</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Featured Courses
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our upcoming educational offerings and register to advance your 
              professional development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {upcomingCourses.map((course, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded inline-block mb-4">
                  {course.level}
                </div>
                <h3 className="font-semibold text-foreground mb-3">{course.title}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {course.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {course.format}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link to="/events">View All Courses & Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Invest in Your Professional Growth
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Join GART today to access our full range of educational resources, 
            training programmes, and professional development opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/signup">Become a Member</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Education;
