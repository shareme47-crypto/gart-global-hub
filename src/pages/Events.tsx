import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, MapPin, Clock, Users, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const upcomingEvents = [
  {
    id: 1,
    title: "GART Annual Global Conference 2025",
    description: "Join us for our flagship event featuring keynote speakers, research presentations, workshops, and networking opportunities with radiation therapy professionals worldwide.",
    date: "March 15-18, 2025",
    location: "Geneva, Switzerland",
    type: "Conference",
    attendees: "2000+ Expected",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
    featured: true,
  },
  {
    id: 2,
    title: "Advanced IMRT/VMAT Workshop",
    description: "Hands-on workshop covering advanced intensity-modulated and volumetric arc therapy techniques with live demonstrations.",
    date: "February 8-9, 2025",
    location: "Virtual Event",
    type: "Workshop",
    attendees: "500 Spots",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    title: "Proton Therapy Symposium",
    description: "Expert discussions on the latest developments in proton therapy, including pediatric applications and emerging indications.",
    date: "January 25, 2025",
    location: "Boston, USA",
    type: "Symposium",
    attendees: "300 Spots",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    title: "Cancer Awareness Webinar Series",
    description: "Free monthly webinar series focused on community education about cancer prevention, early detection, and treatment options.",
    date: "Monthly - First Friday",
    location: "Online",
    type: "Webinar",
    attendees: "Open to All",
    image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    title: "Regional Chapter Meeting - Asia Pacific",
    description: "Quarterly meeting for GART members in the Asia Pacific region. Discuss regional initiatives and network with local professionals.",
    date: "February 20, 2025",
    location: "Singapore",
    type: "Meeting",
    attendees: "200 Expected",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    title: "Young Professionals Leadership Summit",
    description: "Exclusive event for early-career radiation therapists focusing on leadership skills, career development, and mentorship.",
    date: "April 5-6, 2025",
    location: "London, UK",
    type: "Summit",
    attendees: "150 Spots",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&auto=format&fit=crop&q=60",
  },
];

const pastEvents = [
  {
    title: "World RT Day 2024 Celebration",
    date: "November 8, 2024",
    attendees: "5000+ Participants",
  },
  {
    title: "Fall Education Series",
    date: "October 2024",
    attendees: "1200 Attendees",
  },
  {
    title: "GART Research Symposium 2024",
    date: "September 2024",
    attendees: "800 Attendees",
  },
];

const Events = () => {
  const featuredEvent = upcomingEvents.find(event => event.featured);
  const regularEvents = upcomingEvents.filter(event => !event.featured);

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
              Connect, learn, and grow with radiation therapy professionals through 
              our conferences, workshops, webinars, and community initiatives.
            </p>
          </div>
        </section>

        {/* Featured Event */}
        {featuredEvent && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
                  Featured Event
                </span>
                <div className="group relative rounded-3xl overflow-hidden">
                  <img
                    src={featuredEvent.image}
                    alt={featuredEvent.title}
                    className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-secondary text-secondary-foreground mb-4">
                      {featuredEvent.type}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold text-background mb-4">
                      {featuredEvent.title}
                    </h2>
                    <p className="text-background/80 mb-6 max-w-2xl">
                      {featuredEvent.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-6 text-sm text-background/70 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        {featuredEvent.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        {featuredEvent.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        {featuredEvent.attendees}
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
        )}

        {/* Upcoming Events */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-8">Upcoming Events</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularEvents.map((event) => (
                  <article
                    key={event.id}
                    className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full bg-primary text-primary-foreground">
                        {event.type}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2">
                          {event.location === "Virtual Event" || event.location === "Online" ? (
                            <Globe className="w-4 h-4 text-primary" />
                          ) : (
                            <MapPin className="w-4 h-4 text-primary" />
                          )}
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          {event.attendees}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Learn More
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Past Events */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Past Events</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {pastEvents.map((event, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-xl border border-border p-6 text-center"
                  >
                    <h3 className="font-bold text-foreground mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{event.date}</p>
                    <p className="text-xs text-primary font-medium">{event.attendees}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Want to Host an Event?
              </h2>
              <p className="text-muted-foreground mb-8">
                GART supports member-led events and regional chapter activities. 
                Contact us to learn about hosting or sponsoring events.
              </p>
              <Button size="lg">Contact Us</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
