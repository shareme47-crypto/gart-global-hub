import { Mail, MapPin, Phone, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import gartLogo from "@/assets/gart-logo-new.jpeg";

const Footer = () => {
  const quickLinks = [
    { label: "About Us", href: "/#about" },
    { label: "Our Mission", href: "/#mission" },
    { label: "Member Benefits", href: "/member-benefits" },
    { label: "Resources", href: "/education" },
    { label: "Contact Us", href: "/contact" },
  ];

  const resources = [
    { label: "News", href: "/news" },
    { label: "Events", href: "/events" },
    { label: "Join GART", href: "/signup" },
    { label: "Member Login", href: "/login" },
    { label: "Career Center", href: "/jobs" },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/feed/?trk=guest_homepage-basic_nav-header-signin", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/GART_RTT", label: "Twitter" },
    { icon: Instagram, href: "https://www.instagram.com/garthealthcare?igsh=MWRrb3JjMmE0cGJwbw==", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/share/1DsYDAt1xi/", label: "Facebook" },
  ];

  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={gartLogo} alt="GART Logo" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <span className="text-xl font-bold block">G.A.R.T</span>
                <span className="text-xs text-background/60">Est. 2026</span>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              The Global Association of Radiation Therapists — uniting professionals 
              worldwide to advance excellence in cancer care.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith("/#") ? (
                    <a
                      href={link.href}
                      className="text-background/70 hover:text-secondary transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "auto" })}
                      className="text-background/70 hover:text-secondary transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-lg mb-6">Resources</h4>
            <ul className="space-y-3">
              {resources.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith("#") ? (
                    <a
                      href={link.href}
                      className="text-background/70 hover:text-secondary transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "auto" })}
                      className="text-background/70 hover:text-secondary transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-background/70 text-sm leading-relaxed">
                  FLAT NO-1004, 3RD FLOOR<br />
                  PLOT NO GH-18, B/10, ROYCE, VAISHALI<br />
                  SECTOR-3, I E SAHIBABAD, Ghaziabad<br />
                  Uttar Pradesh, 201010
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <a
                  href="mailto:info@gart.org.in"
                  className="text-background/70 hover:text-secondary transition-colors text-sm"
                >
                  info@gart.org.in
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <a
                  href="tel:+918447234938"
                  className="text-background/70 hover:text-secondary transition-colors text-sm"
                >
                  +91-8447234938
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/50 text-sm">
              © {new Date().getFullYear()} Global Association of Radiation Therapists. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-background/50 hover:text-secondary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-background/50 hover:text-secondary text-sm transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
