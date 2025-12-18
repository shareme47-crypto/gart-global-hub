import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, ArrowRight, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Radiation Therapy: Trends to Watch in 2025",
    excerpt: "Explore the emerging technologies and treatment approaches that are reshaping radiation oncology, from AI-driven planning to adaptive radiotherapy.",
    author: "Dr. Michael Roberts",
    date: "December 12, 2024",
    readTime: "8 min read",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&auto=format&fit=crop&q=60",
    featured: true,
  },
  {
    id: 2,
    title: "Building Patient Trust: Communication Strategies for RTs",
    excerpt: "Effective communication is key to patient outcomes. Learn proven strategies to build rapport and reduce anxiety in radiation therapy patients.",
    author: "Dr. Emily Watson",
    date: "December 8, 2024",
    readTime: "5 min read",
    category: "Patient Care",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    title: "Career Advancement Tips for Young Radiation Therapists",
    excerpt: "Practical advice for early-career professionals looking to advance in the field of radiation therapy and oncology.",
    author: "Prof. James Liu",
    date: "December 1, 2024",
    readTime: "6 min read",
    category: "Career",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    title: "Understanding FLASH Radiotherapy: A Paradigm Shift",
    excerpt: "An in-depth look at FLASH radiotherapy and its potential to revolutionize cancer treatment with ultra-high dose rates.",
    author: "Dr. Anna Schmidt",
    date: "November 25, 2024",
    readTime: "10 min read",
    category: "Research",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    title: "Quality Assurance Best Practices in Modern RT Departments",
    excerpt: "Essential QA protocols and workflows that every radiation therapy department should implement for optimal patient safety.",
    author: "Dr. Robert Kim",
    date: "November 18, 2024",
    readTime: "7 min read",
    category: "Quality",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    title: "Mental Health Support for Oncology Healthcare Workers",
    excerpt: "Addressing burnout and compassion fatigue in radiation therapy professionals. Resources and strategies for self-care.",
    author: "Dr. Sarah Park",
    date: "November 10, 2024",
    readTime: "6 min read",
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop&q=60",
  },
];

const Blog = () => {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              GART Blog
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Insights, research, and perspectives from leading radiation therapy 
              professionals around the world.
            </p>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
                  Featured Article
                </span>
                <article className="group grid lg:grid-cols-2 gap-8 bg-card rounded-3xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-video lg:aspect-auto overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary w-fit mb-4">
                      {featuredPost.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    <Button className="w-fit group/btn">
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </article>
              </div>
            </div>
          </section>
        )}

        {/* Blog Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-8">Latest Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary/10 text-secondary">
                        {post.category}
                      </span>
                      <h3 className="text-lg font-bold text-foreground mt-3 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{post.author}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  View All Articles
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-foreground mb-8">Browse by Topic</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {["Technology", "Patient Care", "Research", "Career", "Education", "Quality", "Wellness", "Leadership"].map((category) => (
                  <Button key={category} variant="outline" size="sm">
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
