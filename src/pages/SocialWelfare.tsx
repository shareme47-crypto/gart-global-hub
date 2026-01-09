import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Users, Droplets, HandHeart, Mail, Globe, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SocialWelfare = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <Heart className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Social Welfare
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-primary mb-6">
            "Care Beyond the Clinic"
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            GART is deeply committed to supporting cancer patients, their families, and the wider community 
            through awareness, compassion, and meaningful community engagement. We believe that healthcare 
            extends beyond treatment rooms—it reaches into the hearts and lives of those we serve.
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">What We Do</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cancer Awareness */}
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">Cancer Awareness</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  We conduct public education programs focused on cancer prevention, early detection, 
                  and the importance of timely treatment. Our outreach programs reach communities 
                  to spread awareness and dispel myths about cancer care.
                </p>
              </CardContent>
            </Card>

            {/* Blood Donation */}
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                  <Droplets className="w-7 h-7 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl text-foreground">Blood Donation Initiatives</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  We organize and support blood donation camps in collaboration with hospitals, 
                  institutions, and community organizations. Every drop counts in saving lives 
                  and supporting cancer patients undergoing treatment.
                </p>
              </CardContent>
            </Card>

            {/* Patient Support */}
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-14 h-14 bg-secondary/50 rounded-full flex items-center justify-center mb-4">
                  <HandHeart className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">Support for Cancer Patients</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  We provide emotional support, guidance, referrals, and assistance for underprivileged 
                  patients. Our support services are subject to available resources and organizational 
                  capacity, but our commitment to compassion remains unwavering.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How You Can Support */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">How You Can Support</h2>
          
          <div className="max-w-2xl mx-auto">
            <Card className="border-border">
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-foreground">
                      <strong>Volunteering in awareness programs</strong> – Join our community outreach initiatives
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-foreground">
                      <strong>Participating in blood donation camps</strong> – Your donation can save lives
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-foreground">
                      <strong>Supporting patient welfare initiatives</strong> – Help us help those in need
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-foreground">
                      <strong>Contributing through donations</strong> – Every contribution makes a difference
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-4">
            Donate to Support Cancer Care
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Your generosity helps us extend our reach and impact in supporting cancer patients and their families.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="border-border text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">₹</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">UPI / Bank Transfer</h3>
                <p className="text-sm text-muted-foreground">Details coming soon</p>
              </CardContent>
            </Card>
            
            <Card className="border-border text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Online Donation Portal</h3>
                <p className="text-sm text-muted-foreground">Launching soon</p>
              </CardContent>
            </Card>
            
            <Card className="border-border text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Corporate / Institutional Support</h3>
                <p className="text-sm text-muted-foreground">By request</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">Contact Us</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <a 
              href="mailto:info@gart.org.in" 
              className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>info@gart.org.in</span>
            </a>
            <a 
              href="https://www.gart.org.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
            >
              <Globe className="w-5 h-5" />
              <span>www.gart.org.in</span>
            </a>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-muted/50 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-3 max-w-4xl mx-auto">
            <AlertTriangle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <strong>Disclaimer:</strong> All welfare activities conducted by GART are subject to the availability 
              of funds, partnerships, and organizational capacity. We strive to do our best within our means to 
              support those in need.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SocialWelfare;
