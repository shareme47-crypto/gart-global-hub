import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import linacImg from "@/assets/linac-machine.jpeg";

const membershipBenefits = [
  "Access to exclusive educational resources and webinars",
  "Discounted registration for conferences and workshops",
  "Subscription to GART Journal and newsletters",
  "Networking opportunities with global professionals",
  "Career center and job board access",
  "Professional development certificates",
  "Voting rights in GART elections",
  "Access to research grants and funding opportunities",
];

const membershipTypes = [
  {
    name: "Student Member",
    price: "Free",
    description: "For students enrolled in radiation therapy programs",
    features: ["Access to educational resources", "Student networking events", "Career guidance", "Newsletter subscription"],
  },
  {
    name: "Professional Member",
    price: "$150/year",
    description: "For practicing radiation therapists and technologists",
    features: ["All student benefits", "Conference discounts", "Journal access", "Committee participation", "Voting rights"],
    popular: true,
  },
  {
    name: "Fellow Member",
    price: "$250/year",
    description: "For senior professionals with 10+ years experience",
    features: ["All professional benefits", "Leadership opportunities", "Mentorship programs", "Research collaboration", "Advisory board eligibility"],
  },
];

const Signup = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    institution: "",
    role: "",
    membershipType: "professional",
    agreeTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest in joining GART. We'll review your application and contact you soon.",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Join GART Today
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Become part of a global community dedicated to advancing radiation therapy 
              excellence and improving patient outcomes worldwide.
            </p>
          </div>
        </section>

        {/* Membership Types */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
                Choose Your Membership
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {membershipTypes.map((type) => (
                  <div
                    key={type.name}
                    className={`relative rounded-2xl border p-6 ${
                      type.popular
                        ? "border-primary bg-primary/5 shadow-lg"
                        : "border-border bg-card"
                    }`}
                  >
                    {type.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-full bg-primary text-primary-foreground">
                        Most Popular
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-foreground mb-2">{type.name}</h3>
                    <p className="text-2xl font-bold text-primary mb-2">{type.price}</p>
                    <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
                    <ul className="space-y-2">
                      {type.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits & Form Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
              {/* Benefits */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Member Benefits
                </h2>
                <div className="rounded-2xl overflow-hidden mb-6">
                  <img
                    src={linacImg}
                    alt="Modern Linear Accelerator"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <ul className="space-y-3">
                  {membershipBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Signup Form */}
              <div className="bg-card rounded-2xl border border-border p-8">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Membership Application
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Institution/Hospital *
                    </label>
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Professional Role *
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="">Select your role</option>
                      <option value="student">Student</option>
                      <option value="radiation_therapist">Radiation Therapist</option>
                      <option value="radiation_technologist">Radiation Technologist</option>
                      <option value="dosimetrist">Dosimetrist</option>
                      <option value="medical_physicist">Medical Physicist</option>
                      <option value="radiation_oncologist">Radiation Oncologist</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Membership Type *
                    </label>
                    <select
                      name="membershipType"
                      value={formData.membershipType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="student">Student Member (Free)</option>
                      <option value="professional">Professional Member ($150/year)</option>
                      <option value="fellow">Fellow Member ($250/year)</option>
                    </select>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                    <label className="text-sm text-muted-foreground">
                      I agree to the GART Terms of Service and Privacy Policy. I understand that my 
                      membership is subject to approval.
                    </label>
                  </div>

                  <Button type="submit" size="lg" className="w-full group">
                    Submit Application
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
