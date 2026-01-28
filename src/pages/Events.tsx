import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, MapPin, Clock, Users, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Events & Programs
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Connect, learn, and grow with radiation allied health science professionals through 
              our conferences, workshops, webinars, and community initiatives.
            </p>
          </div>
        </section>

        {/* Featured Event - Inauguration */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
                Featured Event
              </span>
              <div className="group relative rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60"
                  alt="GART Inauguration Ceremony"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-secondary text-secondary-foreground mb-4">
                    Inauguration Ceremony
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold text-background mb-4">
                    Inauguration Ceremony of GART
                  </h2>
                  <p className="text-background/80 mb-6 max-w-2xl">
                    Join us for the official inauguration ceremony of the Global Association of Radiation Therapists 
                    at Fortis Memorial Research Institute, Gurgaon.
                  </p>
                  <div className="flex flex-wrap items-center gap-6 text-sm text-background/70 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      21 February 2026
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Fortis Memorial Research Institute, Gurgaon
                    </div>
                  </div>
                  <Link to="/signup">
                    <Button variant="hero" size="lg" className="group/btn">
                      Register Now
                      <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events - Coming Soon */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-8">Upcoming Events</h2>
              <div className="bg-card rounded-2xl border border-border p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Coming Soon</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  We're planning exciting events, workshops, and conferences for our members. 
                  Stay tuned for updates on upcoming programs.
                </p>
                <Link to="/signup">
                  <Button variant="outline">
                    Join GART to Get Notified
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Want to Host an Event?
              </h2>
              <p className="text-muted-foreground mb-8">
                GART supports member-led events and regional chapter activities. 
                Contact us to learn about hosting or sponsoring events.
              </p>
              <Link to="/contact">
                <Button size="lg">Contact Us</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;