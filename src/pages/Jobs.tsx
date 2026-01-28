import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Briefcase, Globe, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Jobs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Job Information
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Explore career opportunities in radiation allied health science from around the world.
            </p>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-card rounded-2xl border border-border p-12 text-center">
                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Coming Soon</h2>
                <p className="text-muted-foreground max-w-lg mx-auto mb-8 text-lg">
                  Job vacancy listings from worldwide opportunities in radiation allied health science 
                  will be available here soon. Stay connected with GART to access exclusive career opportunities.
                </p>
                
                <div className="grid sm:grid-cols-3 gap-6 mb-10">
                  <div className="bg-muted/50 rounded-xl p-6">
                    <Globe className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Global Opportunities</h3>
                    <p className="text-sm text-muted-foreground">Job listings from institutions worldwide</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-6">
                    <Search className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Easy Search</h3>
                    <p className="text-sm text-muted-foreground">Filter by location, specialty, and experience</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-6">
                    <Bell className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Job Alerts</h3>
                    <p className="text-sm text-muted-foreground">Get notified about new opportunities</p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/signup">
                    <Button size="lg">
                      Join GART for Updates
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" size="lg">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Jobs;