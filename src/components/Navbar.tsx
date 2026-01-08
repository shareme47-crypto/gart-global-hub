import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import gartLogo from "@/assets/gart-logo.jpeg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [membershipOpen, setMembershipOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "About", href: "/#about" },
    { label: "Education", href: "/#mission" },
    { label: "Support Hub", href: "/support-hub" },
    { label: "Resources", href: "/blog" },
  ];

  const membershipLinks = [
    { label: "Join GART", href: "/signup" },
    { label: "Member Benefits", href: "/#benefits" },
  ];

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return location.pathname === "/" && location.hash === href.slice(1);
    return location.pathname === href;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={gartLogo} alt="GART Logo" className="w-12 h-12 rounded-full object-cover" />
            <div className="flex flex-col">
              <span className="text-base font-bold text-primary leading-tight">Global Association</span>
              <span className="text-sm text-primary leading-tight">of Radiation Therapists</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              link.href.startsWith("/#") ? (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isActive(link.href) ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isActive(link.href) ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
            
            {/* Membership Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setMembershipOpen(true)}
              onMouseLeave={() => setMembershipOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors">
                Membership
                <ChevronDown className="w-4 h-4" />
              </button>
              {membershipOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-card rounded-md shadow-lg border border-border py-2">
                  {membershipLinks.map((link) => (
                    link.href.startsWith("/#") ? (
                      <a
                        key={link.label}
                        href={link.href}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        to={link.href}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    )
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Contact Button */}
          <div className="hidden lg:block">
            <Link to="/signup">
              <Button className="bg-primary hover:bg-primary-foreground hover:text-primary border border-primary">
                Contact
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in-up">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.href.startsWith("/#") ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-foreground hover:text-primary font-medium transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-foreground hover:text-primary font-medium transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <div className="border-t border-border pt-4">
                <span className="text-sm font-semibold text-muted-foreground mb-2 block">Membership</span>
                {membershipLinks.map((link) => (
                  link.href.startsWith("/#") ? (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-foreground hover:text-primary font-medium transition-colors py-2 block"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="text-foreground hover:text-primary font-medium transition-colors py-2 block"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                ))}
              </div>
              <Link to="/signup" onClick={() => setIsOpen(false)}>
                <Button className="mt-2 w-full">Contact</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
