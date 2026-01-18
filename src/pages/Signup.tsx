import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Check, 
  ArrowRight, 
  GraduationCap, 
  Stethoscope, 
  UserCheck, 
  Heart,
  FileText,
  CreditCard,
  Globe,
  Award,
  Users,
  BookOpen,
  Shield,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Membership Categories Data
const membershipCategories = [
  {
    id: "student",
    name: "Student Member",
    subtitle: "Radiotherapy Technology / Radiation Allied Health Professionals",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
    eligibility: [
      "Currently enrolled in a recognized academic program in Radiotherapy Technology or Allied Radiation Health Sciences.",
      "Student must select course duration (2 / 3 / 4 years) and current year of study at the time of application."
    ],
    requiredDocument: "Valid Student Identity Card (ID) for the current academic year.",
    fees: [
      { region: "Indian Students", amount: "₹200 per year" },
      { region: "International Students", amount: "USD 10 per year" },
      { region: "LMIC Students", amount: "USD 4 per year" }
    ],
    feeNote: "Fee calculated based on selected course duration and current year of study (e.g., 3-year course = fee × number of remaining years)",
    benefits: [
      "Access to educational webinars, learning resources, and selected training modules.",
      "Reduced registration fees for conferences, workshops, and academic events.",
      "Exposure to global professional standards and best practices.",
      "Networking opportunities with professionals and mentors.",
      "Career guidance, academic development, and research awareness.",
      "Digital membership certificate and student recognition within GART."
    ]
  },
  {
    id: "allied",
    name: "Radiation Allied Health Professional Member",
    subtitle: "Except Radiation Therapists",
    icon: Stethoscope,
    color: "from-green-500 to-emerald-500",
    eligibility: [
      "Practicing allied health professionals in radiation sciences (e.g., Radiographers, Nuclear Medicine Technologists, Medical Imaging professionals, etc.)."
    ],
    requiredDocument: "Upload valid registration number issued by the respective national regulatory authority.",
    fees: [
      { region: "Indian Members", amount: "₹1000 for 5 years" },
      { region: "International Members", amount: "USD 50 for 5 years" },
      { region: "LMIC Members", amount: "USD 20 for 5 years" }
    ],
    feeNote: "Renewal required after 5 years.",
    benefits: [
      "Full access to continuing education programs, webinars, and professional development activities.",
      "Eligibility to participate in conferences, workshops, and academic forums.",
      "Opportunities for research collaboration and professional networking.",
      "Professional recognition through GART membership.",
      "Access to international guidelines, publications, and best practice updates.",
      "Advocacy and professional support at national and global levels."
    ]
  },
  {
    id: "therapist",
    name: "Radiation Therapist Member",
    subtitle: "Qualified and Practicing Radiation Therapists",
    icon: UserCheck,
    color: "from-purple-500 to-violet-500",
    eligibility: [
      "Qualified and practicing Radiation Therapists."
    ],
    requiredDocument: "Upload valid registration number issued by the respective national regulatory authority.",
    fees: [
      { region: "Indian Members", amount: "₹1000 for 5 years" },
      { region: "International Members", amount: "USD 50 for 5 years" },
      { region: "LMIC Members", amount: "USD 20 for 5 years" }
    ],
    feeNote: "Renewal required after 5 years.",
    benefits: [
      "Full access to advanced education programs, certifications, and specialized training.",
      "Eligibility to present, publish, and contribute to research and academic activities.",
      "Priority access and discounted registration for GART conferences and workshops.",
      "Global professional recognition and networking opportunities.",
      "Participation in committees, leadership roles, and policy discussions.",
      "Advocacy for professional standards, role expansion, and ethical practice."
    ]
  },
  {
    id: "volunteer",
    name: "Volunteer Member",
    subtitle: "Support GART's Educational, Social & Advocacy Initiatives",
    icon: Heart,
    color: "from-orange-500 to-red-500",
    eligibility: [
      "Individuals willing to support GART's educational, social, advocacy, and outreach initiatives."
    ],
    requiredDocument: "Upload valid National Identity Card.",
    fees: [
      { region: "Indian Members", amount: "₹500 for 5 years or any voluntary donation" },
      { region: "International Members", amount: "USD 40 for 5 years or any donation above this" },
      { region: "LMIC Members", amount: "USD 20 for 5 years or any donation above this" }
    ],
    feeNote: "",
    benefits: [
      "Active participation in blood donation camps, cancer awareness drives, screening programs, and community health initiatives.",
      "Involvement in patient education programs, public outreach, and professional awareness campaigns.",
      "Opportunity to assist in conferences, workshops, CME programs, and social responsibility projects.",
      "Recognition as a GART Volunteer for service to healthcare and society.",
      "Certificate of contribution for participation in humanitarian and professional activities.",
      "Networking with healthcare professionals and leaders in radiation sciences."
    ]
  }
];

const generalBenefits = [
  "Access to GART's global education, research, and professional resources.",
  "Participation in international conferences, workshops, and academic activities.",
  "Professional recognition and career development opportunities.",
  "Advocacy, ethical leadership, and continuous professional support."
];

const paymentPolicy = [
  "Indian members pay in INR.",
  "International members pay in USD.",
  "LMIC members are eligible for concessional fees as listed above.",
  "All international payments will be processed in USD equivalent to INR fees, as applicable.",
  "Membership activation is subject to successful payment and document verification."
];

// LMIC Countries List
const lmicCountries = [
  "Afghanistan", "Bangladesh", "Benin", "Bhutan", "Bolivia", "Burkina Faso", "Burundi",
  "Cambodia", "Cameroon", "Central African Republic", "Chad", "Comoros", "Congo",
  "Côte d'Ivoire", "Djibouti", "Egypt", "El Salvador", "Eritrea", "Eswatini", "Ethiopia",
  "Gambia", "Ghana", "Guatemala", "Guinea", "Guinea-Bissau", "Haiti", "Honduras",
  "India", "Indonesia", "Kenya", "Kiribati", "Kyrgyzstan", "Lao PDR", "Lesotho",
  "Liberia", "Madagascar", "Malawi", "Mali", "Mauritania", "Micronesia", "Moldova",
  "Mongolia", "Morocco", "Mozambique", "Myanmar", "Nepal", "Nicaragua", "Niger",
  "Nigeria", "North Korea", "Pakistan", "Papua New Guinea", "Philippines", "Rwanda",
  "São Tomé and Príncipe", "Senegal", "Sierra Leone", "Solomon Islands", "Somalia",
  "South Sudan", "Sri Lanka", "Sudan", "Syria", "Tajikistan", "Tanzania", "Timor-Leste",
  "Togo", "Tunisia", "Uganda", "Ukraine", "Uzbekistan", "Vanuatu", "Vietnam",
  "Yemen", "Zambia", "Zimbabwe"
];

// Student Registration Form Component
const StudentRegistrationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    mobile: "",
    email: "",
    city: "",
    state: "",
    country: "",
    instituteName: "",
    courseName: "",
    courseDuration: "",
    currentYear: "",
    university: "",
    declaration: false
  });

  const isLMIC = lmicCountries.includes(formData.country);
  const isIndia = formData.country === "India";
  
  const calculateFee = () => {
    if (!formData.courseDuration || !formData.currentYear) return null;
    const remainingYears = parseInt(formData.courseDuration) - parseInt(formData.currentYear) + 1;
    if (isIndia) return `₹${200 * remainingYears}`;
    if (isLMIC) return `USD ${4 * remainingYears}`;
    return `USD ${10 * remainingYears}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "Redirecting to payment gateway...",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section A: Personal Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">A</span>
          Personal Details
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Date of Birth *</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Gender *</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Mobile Number *</label>
            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email Address *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">City *</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">State *</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Country *</label>
            <input type="text" name="country" value={formData.country} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
        </div>
      </div>

      {/* Section B: Academic Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">B</span>
          Academic Details
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1">Institute / College Name *</label>
            <input type="text" name="instituteName" value={formData.instituteName} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Course Name *</label>
            <input type="text" name="courseName" value={formData.courseName} onChange={handleChange} required placeholder="e.g., Radiotherapy Technology"
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">University / Board *</label>
            <input type="text" name="university" value={formData.university} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Course Duration *</label>
            <div className="flex gap-4 mt-2">
              {["2", "3", "4"].map(year => (
                <label key={year} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="courseDuration" value={year} checked={formData.courseDuration === year} onChange={handleChange}
                    className="w-4 h-4 text-primary" />
                  <span className="text-sm">{year} Years</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Current Year of Study *</label>
            <div className="flex gap-4 mt-2">
              {["1", "2", "3", "4"].map(year => (
                <label key={year} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="currentYear" value={year} checked={formData.currentYear === year} onChange={handleChange}
                    className="w-4 h-4 text-primary" />
                  <span className="text-sm">{year}{year === "1" ? "st" : year === "2" ? "nd" : year === "3" ? "rd" : "th"}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section C: Document Upload */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">C</span>
          Document Upload
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Passport Size Photograph *</label>
            <input type="file" accept=".jpg,.jpeg,.png" required
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium" />
            <p className="text-xs text-muted-foreground mt-1">JPG / PNG format</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Student ID Card *</label>
            <input type="file" accept=".jpg,.jpeg,.png,.pdf" required
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium" />
            <p className="text-xs text-muted-foreground mt-1">PDF / JPG / PNG format</p>
          </div>
        </div>
      </div>

      {/* Section D: Fee Calculation */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">D</span>
          Fee Calculation
        </h3>
        <div className="bg-muted/50 rounded-xl p-6 border border-border">
          <div className="grid sm:grid-cols-3 gap-4 text-sm mb-4">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <span>Indian Students: ₹200 × Remaining Years</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <span>International: USD 10 × Remaining Years</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <span>LMIC: USD 4 × Remaining Years</span>
            </div>
          </div>
          {calculateFee() && (
            <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">Payable Amount:</p>
              <p className="text-2xl font-bold text-primary">{calculateFee()}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {isIndia ? "Indian Student" : isLMIC ? "LMIC Student" : "International Student"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Section E: Declaration */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">E</span>
          Declaration
        </h3>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleChange} required
            className="mt-1 w-4 h-4" />
          <span className="text-sm text-muted-foreground">
            I declare that the information provided is true and I am currently enrolled in the above course.
          </span>
        </label>
      </div>

      <Button type="submit" size="lg" className="w-full group">
        Proceed to Payment
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </form>
  );
};

// Professional Registration Form Component (for Allied Health & Radiation Therapist)
const ProfessionalRegistrationForm = ({ type }: { type: "allied" | "therapist" }) => {
  const { toast } = useToast();
  const [applicationType, setApplicationType] = useState<"fresh" | "renewal">("fresh");
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    mobile: "",
    email: "",
    city: "",
    state: "",
    country: "",
    profession: "",
    organization: "",
    department: "",
    experience: "",
    authorityName: "",
    registrationNumber: "",
    registrationValidity: "",
    eligibility1: false,
    eligibility2: false,
    eligibility3: false,
    gartMembershipNumber: "",
    previousExpiryDate: "",
    declaration: false
  });

  const isLMIC = lmicCountries.includes(formData.country);
  const isIndia = formData.country === "India";

  const getFee = () => {
    if (isIndia) return "₹1,000 (Valid for 5 Years)";
    if (isLMIC) return "USD 20 (Valid for 5 Years)";
    return "USD 50 (Valid for 5 Years)";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "Redirecting to payment gateway...",
    });
  };

  const eligibilityLabels = type === "allied" ? [
    "I am a qualified Radiation Allied Health Professional (Radiographer, Nuclear Medicine Technologist, Dosimetrist, Medical Physicist, Registered Nurses, etc.).",
    "I hold a valid registration with a recognized national regulatory authority.",
    "I am currently practicing or professionally engaged in radiation sciences or allied healthcare."
  ] : [
    "I am a qualified Radiation Therapist.",
    "I hold a valid registration with a recognized national regulatory authority.",
    "I am currently practicing or professionally involved in radiation therapy services."
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section A: Application Type */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">A</span>
          Application Type
        </h3>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="applicationType" checked={applicationType === "fresh"} onChange={() => setApplicationType("fresh")}
              className="w-4 h-4 text-primary" />
            <span className="font-medium">Fresh Registration</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="applicationType" checked={applicationType === "renewal"} onChange={() => setApplicationType("renewal")}
              className="w-4 h-4 text-primary" />
            <span className="font-medium">Renewal</span>
          </label>
        </div>
      </div>

      {/* Section B: Personal Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">B</span>
          Personal Details
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Date of Birth *</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Gender *</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Mobile Number *</label>
            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email Address *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">City *</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">State *</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Country *</label>
            <input type="text" name="country" value={formData.country} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
        </div>
      </div>

      {/* Section C: Professional Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">C</span>
          Professional Details
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {type === "allied" ? "Profession / Designation *" : "Current Designation *"}
            </label>
            <input type="text" name="profession" value={formData.profession} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Organization / Hospital / Institute *</label>
            <input type="text" name="organization" value={formData.organization} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Department *</label>
            <input type="text" name="department" value={formData.department} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Years of Experience *</label>
            <input type="number" name="experience" value={formData.experience} onChange={handleChange} required min="0"
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
        </div>
      </div>

      {/* Section D: Eligibility Criteria */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">D</span>
          Eligibility Criteria (Mandatory)
        </h3>
        <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
          {eligibilityLabels.map((label, index) => (
            <label key={index} className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name={`eligibility${index + 1}`} checked={formData[`eligibility${index + 1}` as keyof typeof formData] as boolean} onChange={handleChange} required
                className="mt-1 w-4 h-4" />
              <span className="text-sm text-muted-foreground">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Section E: Registration Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">E</span>
          Registration Details
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">National Authority Name *</label>
            <input type="text" name="authorityName" value={formData.authorityName} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Registration Number *</label>
            <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Registration Validity *</label>
            <input type="date" name="registrationValidity" value={formData.registrationValidity} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
        </div>
      </div>

      {/* Section F: Document Upload */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">F</span>
          Document Upload
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Passport Size Photograph *</label>
            <input type="file" accept=".jpg,.jpeg,.png" required
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium" />
            <p className="text-xs text-muted-foreground mt-1">JPG / PNG format</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Registration Certificate *</label>
            <input type="file" accept=".jpg,.jpeg,.png,.pdf" required
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium" />
            <p className="text-xs text-muted-foreground mt-1">PDF / JPG / PNG format</p>
          </div>
        </div>
      </div>

      {/* Section G: Renewal Details (Conditional) */}
      {applicationType === "renewal" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-sm font-bold text-orange-500">G</span>
            Renewal Details
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">GART Membership Registration Number *</label>
              <input type="text" name="gartMembershipNumber" value={formData.gartMembershipNumber} onChange={handleChange} required
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Previous Membership Expiry Date *</label>
              <input type="date" name="previousExpiryDate" value={formData.previousExpiryDate} onChange={handleChange} required
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Previous GART Membership Certificate (Optional)</label>
              <input type="file" accept=".jpg,.jpeg,.png,.pdf"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium" />
            </div>
          </div>
        </div>
      )}

      {/* Section H: Membership Fee */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">{applicationType === "renewal" ? "H" : "G"}</span>
          Membership Fee
        </h3>
        <div className="bg-muted/50 rounded-xl p-6 border border-border">
          <div className="grid sm:grid-cols-3 gap-4 text-sm mb-4">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              <span>Indian: ₹1,000 (5 Years)</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              <span>International: USD 50 (5 Years)</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              <span>LMIC: USD 20 (5 Years)</span>
            </div>
          </div>
          {formData.country && (
            <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">Payable Amount:</p>
              <p className="text-2xl font-bold text-primary">{getFee()}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {isIndia ? "Indian Member" : isLMIC ? "LMIC Member" : "International Member"}
              </p>
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-3">Note: Renewal is required after the completion of the membership period.</p>
        </div>
      </div>

      {/* Section I: Declaration */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">{applicationType === "renewal" ? "I" : "H"}</span>
          Declaration
        </h3>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleChange} required
            className="mt-1 w-4 h-4" />
          <span className="text-sm text-muted-foreground">
            I confirm that I meet all eligibility criteria and that the information provided is {type === "allied" ? "accurate and verifiable" : "true and verifiable"}.
          </span>
        </label>
      </div>

      <Button type="submit" size="lg" className="w-full group">
        Proceed to Payment
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </form>
  );
};

// Volunteer Registration Form Component
const VolunteerRegistrationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    mobile: "",
    email: "",
    city: "",
    state: "",
    country: "",
    occupation: "",
    organization: "",
    areasOfInterest: [] as string[],
    declaration: false
  });

  const isLMIC = lmicCountries.includes(formData.country);
  const isIndia = formData.country === "India";

  const getFee = () => {
    if (isIndia) return "₹500 (Valid for 5 Years) or any voluntary donation";
    if (isLMIC) return "USD 20 (Valid for 5 Years) or any donation above this";
    return "USD 40 (Valid for 5 Years) or any donation above this";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "Redirecting to payment gateway...",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section A: Personal Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">A</span>
          Personal Details
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Date of Birth *</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Gender *</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Mobile Number *</label>
            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email Address *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">City *</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">State *</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Country *</label>
            <input type="text" name="country" value={formData.country} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
        </div>
      </div>

      {/* Section B: Background Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">B</span>
          Background Details
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Occupation *</label>
            <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Organization (if any)</label>
            <input type="text" name="organization" value={formData.organization} onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
        </div>
      </div>

      {/* Section C: Document Upload */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">C</span>
          Document Upload
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Passport Size Photograph *</label>
            <input type="file" accept=".jpg,.jpeg,.png" required
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium" />
            <p className="text-xs text-muted-foreground mt-1">JPG / PNG format</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">National Identity Card *</label>
            <input type="file" accept=".jpg,.jpeg,.png,.pdf" required
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium" />
            <p className="text-xs text-muted-foreground mt-1">PDF / JPG / PNG format</p>
          </div>
        </div>
      </div>

      {/* Section D: Membership Fee */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">D</span>
          Membership Fee
        </h3>
        <div className="bg-muted/50 rounded-xl p-6 border border-border">
          <div className="grid sm:grid-cols-3 gap-4 text-sm mb-4">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" />
              <span>Indian: ₹500 (5 Years) or donation</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" />
              <span>International: USD 40+ donation</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" />
              <span>LMIC: USD 20+ donation</span>
            </div>
          </div>
          {formData.country && (
            <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">Minimum Contribution:</p>
              <p className="text-2xl font-bold text-primary">{getFee()}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {isIndia ? "Indian Member" : isLMIC ? "LMIC Member" : "International Member"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Section E: Declaration */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">E</span>
          Declaration
        </h3>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleChange} required
            className="mt-1 w-4 h-4" />
          <span className="text-sm text-muted-foreground">
            I am willing to support GART's educational, social, advocacy, and outreach initiatives. The information provided is true and accurate.
          </span>
        </label>
      </div>

      <Button type="submit" size="lg" className="w-full group">
        Proceed to Payment
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </form>
  );
};

// Eligibility & Benefits Tab Content
const EligibilityBenefitsContent = ({ category }: { category: typeof membershipCategories[0] }) => (
  <div className="space-y-8">
    {/* Eligibility */}
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5 text-primary" />
        Eligibility
      </h3>
      <ul className="space-y-3">
        {category.eligibility.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Required Document */}
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5 text-primary" />
        Required Document
      </h3>
      <p className="text-muted-foreground">{category.requiredDocument}</p>
    </div>

    {/* Membership Fee */}
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-primary" />
        Membership Fee
      </h3>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        {category.fees.map((fee, index) => (
          <div key={index} className="bg-muted/50 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">{fee.region}</p>
            <p className="text-lg font-bold text-primary">{fee.amount}</p>
          </div>
        ))}
      </div>
      {category.feeNote && (
        <p className="text-sm text-muted-foreground italic">{category.feeNote}</p>
      )}
    </div>

    {/* Benefits */}
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Award className="w-5 h-5 text-primary" />
        Benefits
      </h3>
      <ul className="space-y-3">
        {category.benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <span className="text-muted-foreground">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// Main Signup Component
const Signup = () => {
  const [activeCategory, setActiveCategory] = useState("student");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Users className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">Join Our Global Community</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              GART Membership
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Become part of a global community dedicated to advancing radiation therapy 
              excellence and improving patient outcomes worldwide.
            </p>
          </div>
        </section>

        {/* Membership Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
                Choose Your Membership Category
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Select the membership category that best fits your professional status and career goals.
              </p>

              {/* Category Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {membershipCategories.map((category) => {
                  const Icon = category.icon;
                  const isActive = activeCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left group ${
                        isActive
                          ? "border-primary bg-primary/5 shadow-lg"
                          : "border-border bg-card hover:border-primary/50 hover:shadow-md"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-1">{category.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{category.subtitle}</p>
                      {isActive && (
                        <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Category Details */}
              {membershipCategories.map((category) => {
                if (category.id !== activeCategory) return null;
                const Icon = category.icon;
                return (
                  <div key={category.id} className="bg-card rounded-2xl border border-border overflow-hidden">
                    {/* Category Header */}
                    <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Icon className="w-8 h-8" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">{category.name}</h2>
                          <p className="text-white/80">{category.subtitle}</p>
                        </div>
                      </div>
                    </div>

                    {/* Tabs */}
                    <Tabs defaultValue="eligibility" className="p-6">
                      <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="eligibility" className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Eligibility & Benefits
                        </TabsTrigger>
                        <TabsTrigger value="registration" className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Registration
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="eligibility">
                        <EligibilityBenefitsContent category={category} />
                      </TabsContent>

                      <TabsContent value="registration">
                        <div className="bg-muted/30 rounded-xl p-6">
                          {category.id === "student" && <StudentRegistrationForm />}
                          {category.id === "allied" && <ProfessionalRegistrationForm type="allied" />}
                          {category.id === "therapist" && <ProfessionalRegistrationForm type="therapist" />}
                          {category.id === "volunteer" && <VolunteerRegistrationForm />}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* General Benefits & Payment Policy */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
              {/* General Benefits */}
              <div className="bg-card rounded-2xl border border-border p-8">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-primary" />
                  General Benefits for All Members
                </h3>
                <ul className="space-y-4">
                  {generalBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Payment Policy */}
              <div className="bg-card rounded-2xl border border-border p-8">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-primary" />
                  Payment Policy
                </h3>
                <ul className="space-y-4">
                  {paymentPolicy.map((policy, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">{index + 1}</span>
                      </div>
                      <span className="text-muted-foreground">{policy}</span>
                    </li>
                  ))}
                </ul>
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
