import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import gartLogo from "@/assets/gart-logo.jpeg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/#about" },
    { 
      label: "Membership", 
      dropdown: [
        { label: "Join GART", href: "/signup" },
        { label: "Member Benefits", href: "/#benefits" },
      ]
    },
    { label: "Education", href: "/#mission" },
    { label: "RTT Professional Support", href: "/support-hub" },
    { label: "Meetings", href: "/events" },
    { 
      label: "Opportunities & Updates", 
      dropdown: [
        { label: "News", href: "/news" },
        { label: "Blog", href: "/blog" },
      ]
    },
    { label: "Social Welfare", href: "/social-welfare" },
    { label: "Advocacy", href: "/advocacy" },
    { label: "Contact", href: "/signup" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/" && !location.hash;
    if (href.startsWith("/#")) return location.pathname === "/" && location.hash === href.slice(1);
    return location.pathname === href;
  };

  const renderLink = (href: string, label: string, className: string, onClick?: () => void) => {
    if (href.startsWith("/#")) {
      return (
        <a href={href} className={className} onClick={onClick}>
          {label}
        </a>
      );
    }
    return (
      <Link to={href} className={className} onClick={onClick}>
        {label}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img src={gartLogo} alt="GART Logo" className="w-12 h-12 rounded-full object-cover" />
            <div className="flex flex-col">
              <span className="text-base font-bold text-primary leading-tight">Global Association</span>
              <span className="text-sm text-primary leading-tight">of Radiation Therapists</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              link.dropdown ? (
                <div 
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors py-2">
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                  </button>
                  <div 
                    className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                      activeDropdown === link.label ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                    }`}
                  >
                    <div className="w-48 bg-card rounded-md shadow-lg border border-border py-2 z-50">
                      {link.dropdown.map((subLink) => (
                        renderLink(
                          subLink.href,
                          subLink.label,
                          "block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors",
                          () => setActiveDropdown(null)
                        )
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                renderLink(
                  link.href!,
                  link.label,
                  `text-sm font-medium transition-colors duration-300 ${
                    isActive(link.href!) ? "text-primary" : "text-foreground hover:text-primary"
                  }`,
                  undefined
                )
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="xl:hidden py-4 border-t border-border animate-fade-in-up max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                link.dropdown ? (
                  <div key={link.label} className="border-b border-border pb-2 mb-2">
                    <button 
                      className="flex items-center justify-between w-full text-foreground font-medium py-2"
                      onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === link.label && (
                      <div className="pl-4 mt-2 space-y-2">
                        {link.dropdown.map((subLink) => (
                          renderLink(
                            subLink.href,
                            subLink.label,
                            "block text-foreground hover:text-primary transition-colors py-2",
                            () => { setIsOpen(false); setActiveDropdown(null); }
                          )
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div key={link.label}>
                    {renderLink(
                      link.href!,
                      link.label,
                      "text-foreground hover:text-primary font-medium transition-colors py-2 block",
                      () => setIsOpen(false)
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
