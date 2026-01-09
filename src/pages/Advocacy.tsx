import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Scale, 
  Shield, 
  Users, 
  Globe, 
  Megaphone, 
  FileText, 
  HandHeart,
  Target,
  CheckCircle,
  ArrowRight,
  Mail
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Advocacy = () => {
  const policyPositions = [
    {
      icon: Shield,
      title: "Professional Recognition",
      description: "Advocating for the formal recognition of Radiation Therapists as essential healthcare professionals in national and international health systems."
    },
    {
      icon: Scale,
      title: "Standardised Education",
      description: "Promoting globally harmonised education standards and competency frameworks for radiation therapy professionals."
    },
    {
      icon: Users,
      title: "Workforce Development",
      description: "Supporting policies that address workforce shortages, fair compensation, and sustainable career pathways for radiation therapy professionals."
    },
    {
      icon: Globe,
      title: "Equitable Access to Care",
      description: "Championing universal access to quality radiation therapy services, particularly in underserved regions and developing nations."
    }
  ];

  const campaigns = [
    {
      title: "Global Standards Initiative",
      status: "Ongoing",
      description: "Working with international bodies to establish unified professional standards for radiation therapy practice worldwide.",
      objectives: [
        "Develop competency-based education frameworks",
        "Establish minimum practice standards",
        "Create pathways for international credential recognition"
      ]
    },
    {
      title: "RT Visibility Campaign",
      status: "Active",
      description: "Raising awareness about the critical role of Radiation Therapists in cancer care and multidisciplinary oncology teams.",
      objectives: [
        "Publish research highlighting RT contributions",
        "Engage with media and policymakers",
        "Celebrate World Radiography Day and related events"
      ]
    },
    {
      title: "Patient Safety Advocacy",
      status: "Ongoing",
      description: "Promoting best practices in radiation safety, quality assurance, and patient-centred care protocols.",
      objectives: [
        "Develop safety guidelines and protocols",
        "Support incident reporting systems",
        "Advocate for adequate staffing ratios"
      ]
    }
  ];

  const involvementWays = [
    {
      icon: Megaphone,
      title: "Become an Advocacy Ambassador",
      description: "Represent GART in your region by engaging with local policymakers, healthcare institutions, and professional bodies."
    },
    {
      icon: FileText,
      title: "Contribute to Position Papers",
      description: "Share your expertise by contributing to GART's policy documents, research submissions, and official statements."
    },
    {
      icon: Users,
      title: "Join Working Groups",
      description: "Participate in specialised committees focused on education standards, workforce issues, or patient safety initiatives."
    },
    {
      icon: HandHeart,
      title: "Support Awareness Campaigns",
      description: "Help spread the message through social media, community events, and professional networking opportunities."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Scale className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Advocacy
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-primary mb-6">
            Championing the Profession, Serving Patients
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            GART advocates for policies and standards that elevate the radiation therapy profession, 
            protect patient interests, and ensure equitable access to quality cancer care worldwide. 
            Together, we are the voice of radiation therapy professionals globally.
          </p>
        </div>
      </section>

      {/* Policy Positions Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Our Stance
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Policy Positions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              GART takes clear positions on key issues affecting radiation therapy professionals 
              and the patients we serve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {policyPositions.map((position, index) => (
              <Card key={index} className="border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                      <position.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-foreground mb-2">{position.title}</CardTitle>
                      <p className="text-muted-foreground leading-relaxed">{position.description}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Standards Campaigns */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
              Active Initiatives
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Professional Standards Campaigns
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our ongoing campaigns work to establish and maintain high professional standards 
              across the global radiation therapy community.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {campaigns.map((campaign, index) => (
              <Card key={index} className="border-border bg-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Target className="w-8 h-8 text-secondary" />
                    <span className="px-3 py-1 bg-secondary/20 text-secondary text-xs font-semibold rounded-full">
                      {campaign.status}
                    </span>
                  </div>
                  <CardTitle className="text-xl text-foreground">{campaign.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{campaign.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-foreground">Key Objectives:</p>
                    <ul className="space-y-2">
                      {campaign.objectives.map((objective, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Take Action
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get Involved in Advocacy
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your voice matters. Join fellow professionals in shaping the future of radiation therapy 
              practice and policy.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {involvementWays.map((way, index) => (
              <Card key={index} className="border-border text-center hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <way.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{way.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{way.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="max-w-3xl mx-auto">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Ready to Make a Difference?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Whether you are an experienced advocate or new to policy engagement, 
                  there is a role for you in GART's advocacy efforts.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/signup">
                    <Button className="group">
                      Join GART Today
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <a href="mailto:info@gart.org.in">
                    <Button variant="outline" className="gap-2">
                      <Mail className="w-4 h-4" />
                      Contact Advocacy Team
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Advocacy;