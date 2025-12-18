import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const newsArticles = [
  {
    id: 1,
    title: "GART Announces Global Conference 2025 in Geneva",
    excerpt: "Join radiation therapy professionals from over 100 countries for our flagship annual conference featuring cutting-edge research presentations and workshops.",
    date: "December 15, 2024",
    readTime: "3 min read",
    category: "Announcement",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    title: "New Research: AI-Assisted Treatment Planning Shows Promising Results",
    excerpt: "A groundbreaking study published by GART members demonstrates significant improvements in treatment accuracy using artificial intelligence.",
    date: "December 10, 2024",
    readTime: "5 min read",
    category: "Research",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    title: "GART Partners with WHO on Radiation Safety Guidelines",
    excerpt: "New collaboration aims to establish global standards for radiation safety in cancer treatment facilities worldwide.",
    date: "December 5, 2024",
    readTime: "4 min read",
    category: "Partnership",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    title: "Member Spotlight: Dr. Sarah Chen Receives Excellence Award",
    excerpt: "Congratulations to Dr. Sarah Chen for her outstanding contributions to radiation therapy education in Southeast Asia.",
    date: "November 28, 2024",
    readTime: "2 min read",
    category: "Member News",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    title: "Updated Clinical Guidelines for Proton Therapy Released",
    excerpt: "GART's clinical committee has released comprehensive updated guidelines for proton therapy applications in pediatric oncology.",
    date: "November 20, 2024",
    readTime: "6 min read",
    category: "Guidelines",
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    title: "Cancer Awareness Campaign Reaches 1 Million People",
    excerpt: "Our community health initiative has successfully educated over one million people about early cancer detection and treatment options.",
    date: "November 15, 2024",
    readTime: "3 min read",
    category: "Campaign",
    image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&auto=format&fit=crop&q=60",
  },
];

const News = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Latest News
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Stay informed with the latest developments, announcements, and achievements 
              from the global radiation therapy community.
            </p>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {newsArticles.map((article) => (
                <article
                  key={article.id}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                        {article.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {article.date}
                      </div>
                      <Button variant="ghost" size="sm" className="group/btn">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More News
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Stay Updated
              </h2>
              <p className="text-muted-foreground mb-8">
                Subscribe to our newsletter and never miss important updates from GART.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-lg border border-border bg-background text-foreground flex-1 max-w-md"
                />
                <Button size="lg">Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default News;
