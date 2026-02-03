import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import News from "./pages/News";
import Blog from "./pages/Blog";
import Events from "./pages/Events";
import Jobs from "./pages/Jobs";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminMemberships from "./pages/AdminMemberships";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import SupportHub from "./pages/SupportHub";
import SocialWelfare from "./pages/SocialWelfare";
import Advocacy from "./pages/Advocacy";
import Contact from "./pages/Contact";
import Education from "./pages/Education";
import MemberBenefits from "./pages/MemberBenefits";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/news" element={<News />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/events" element={<Events />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/memberships" element={<AdminMemberships />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/support-hub" element={<SupportHub />} />
          <Route path="/social-welfare" element={<SocialWelfare />} />
          <Route path="/advocacy" element={<Advocacy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/education" element={<Education />} />
          <Route path="/member-benefits" element={<MemberBenefits />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
