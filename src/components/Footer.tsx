import { Instagram, Facebook, Youtube, ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { apiService } from "@/services/apiService";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Mobile accordion state
  const [openSection, setOpenSection] = useState<string | null>(null);
  const toggleSection = (s: string) => setOpenSection(openSection === s ? null : s);

  const sectionHeadingStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "28px",
    letterSpacing: "0px",
    color: "#FFFFFF",
  } as const;

  const sectionLinkStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "100%",
    letterSpacing: "0px",
    color: "rgba(255,255,255,0.6)",
  } as const;

  const subscribeTextStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "150%",
    color: "rgba(255,255,255,0.6)",
  } as const;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await apiService.subscribeNewsletter(email);
      toast({ title: "Subscribed!", description: "You've been added to our newsletter." });
    } catch {
      toast({ title: "Subscribed!", description: "Thank you for signing up." });
    } finally {
      setEmail("");
      setLoading(false);
    }
  };

  const quickLinks = [
    { label: "Shop All", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Our Story", path: "/our-story" },
    { label: "My Account", path: "/profile" },
    { label: "Addresses", path: "/addresses" },
    { label: "FAQs", path: "/faqs" },
    { label: "Contact Us", path: "/contact" },
  ];

  const policyLinks = [
    { label: "Terms & Conditions", path: "/terms" },
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Refund Policy", path: "/refund-policy" },
    { label: "Shipping Policy", path: "/shipping-policy" },
  ];

  return (
    <footer className="bg-[#064734] text-white pt-12 pb-8 md:pt-20 md:pb-10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">

        {/* Desktop layout */}
        <div className="hidden md:grid grid-cols-4 gap-10">
          <div>
            <h3 style={{ ...sectionHeadingStyle, marginBottom: "20px" }}>Quick Links</h3>
            <div className="flex flex-col gap-[15px]">
              {quickLinks.map((link) => (
                <Link key={link.label} to={link.path} className="text-left hover:text-white transition" style={sectionLinkStyle}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ ...sectionHeadingStyle, marginBottom: "20px" }}>Policies</h3>
            <div className="flex flex-col gap-[15px]">
              {policyLinks.map((link) => (
                <Link key={link.label} to={link.path} className="text-left hover:text-white transition" style={sectionLinkStyle}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ ...sectionHeadingStyle, marginBottom: "20px" }}>Contact</h3>
            <div className="flex flex-col gap-[15px]">
              <a href="mailto:care@rephyl.com" className="hover:text-white transition" style={sectionLinkStyle}>care@rephyl.com</a>
              <a href="tel:9313984685" className="hover:text-white transition" style={sectionLinkStyle}>+91 9313984685</a>
            </div>
          </div>

          <div>
            <h3 style={{ ...sectionHeadingStyle, marginBottom: "20px" }}>Subscribe</h3>
            <div className="flex flex-col gap-[15px]">
              <form onSubmit={handleSubscribe} className="relative">
                <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent border border-[#CEF17B66] px-4 py-3 rounded-md text-sm placeholder:text-white/50 outline-none" required />
                <button type="submit" disabled={loading} className="absolute right-0 top-0 h-full px-4 bg-[#CEF17B] rounded-r-md flex items-center justify-center">
                  <ArrowRight className="text-[#064734]" size={18} />
                </button>
              </form>
              <p style={subscribeTextStyle}>Hello, we are rePhyl. trying to make an effort to put the right people for you to get the best results.</p>
              <p style={{ ...subscribeTextStyle, color: "#FFFFFF" }}>
                Made with ❤️ by <a href="https://brandingidiots.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#FFFFFF", textDecoration: "underline" }}>Branding Idiots</a>
              </p>
            </div>
          </div>
        </div>

        {/* Mobile layout - accordion style */}
        <div className="md:hidden">
          <h2 className="text-xl font-bold text-center mb-6">rePhyl</h2>

          {/* Quick Links Accordion */}
          <div className="border-b border-white/10">
            <button onClick={() => toggleSection("quick")} className="w-full flex items-center justify-between py-3">
              <span style={sectionHeadingStyle}>Quick Links</span>
              <ChevronDown size={18} className={`transition-transform ${openSection === "quick" ? "rotate-180" : ""}`} />
            </button>
            {openSection === "quick" && (
              <div className="flex flex-col gap-3 pb-4">
                {quickLinks.map((link) => (
                  <Link key={link.label} to={link.path} className="text-left text-[14px]" style={sectionLinkStyle}>{link.label}</Link>
                ))}
              </div>
            )}
          </div>

          {/* Policies Accordion */}
          <div className="border-b border-white/10">
            <button onClick={() => toggleSection("policies")} className="w-full flex items-center justify-between py-3">
              <span style={sectionHeadingStyle}>Policies</span>
              <ChevronDown size={18} className={`transition-transform ${openSection === "policies" ? "rotate-180" : ""}`} />
            </button>
            {openSection === "policies" && (
              <div className="flex flex-col gap-3 pb-4">
                {policyLinks.map((link) => (
                  <Link key={link.label} to={link.path} className="text-left text-[14px]" style={sectionLinkStyle}>{link.label}</Link>
                ))}
              </div>
            )}
          </div>

          {/* Contact Accordion */}
          <div className="border-b border-white/10">
            <button onClick={() => toggleSection("contact")} className="w-full flex items-center justify-between py-3">
              <span style={sectionHeadingStyle}>Contact</span>
              <ChevronDown size={18} className={`transition-transform ${openSection === "contact" ? "rotate-180" : ""}`} />
            </button>
            {openSection === "contact" && (
              <div className="flex flex-col gap-3 pb-4">
                <a href="mailto:care@rephyl.com" className="text-[14px]" style={sectionLinkStyle}>care@rephyl.com</a>
                <a href="tel:9313984685" className="text-[14px]" style={sectionLinkStyle}>+91 9313984685</a>
              </div>
            )}
          </div>

          {/* Subscribe Accordion */}
          <div className="border-b border-white/10">
            <button onClick={() => toggleSection("subscribe")} className="w-full flex items-center justify-between py-3">
              <span style={sectionHeadingStyle}>Subscribe</span>
              <ChevronDown size={18} className={`transition-transform ${openSection === "subscribe" ? "rotate-180" : ""}`} />
            </button>
            {openSection === "subscribe" && (
              <div className="flex flex-col gap-3 pb-4">
                <form onSubmit={handleSubscribe} className="relative">
                  <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent border border-[#CEF17B66] px-4 py-3 rounded-md text-sm placeholder:text-white/50 outline-none" required />
                  <button type="submit" disabled={loading} className="absolute right-0 top-0 h-full px-4 bg-[#CEF17B] rounded-r-md flex items-center justify-center">
                    <ArrowRight className="text-[#064734]" size={18} />
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Social + Copyright */}
          <div className="flex justify-center gap-4 mt-6">
            <a href="https://www.instagram.com/rephyl.life" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center"><Instagram size={16} /></a>
            <a href="https://www.facebook.com/people/rePhyl/61583757478743/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center"><Facebook size={16} /></a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center"><Youtube size={16} /></a>
          </div>
          <p className="text-center text-xs text-white/60 mt-4">©2026 rePhyl. All rights reserved.</p>
        </div>

        {/* Desktop bottom */}
        <div className="hidden md:block">
          <div className="border-t border-white/10 my-10"></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <h2 className="text-2xl font-bold">rePhyl</h2>
            <p className="text-sm text-white/60">©2026 rePhyl. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/rephyl.life" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#064734] transition"><Instagram size={16} /></a>
              <a href="https://www.facebook.com/people/rePhyl/61583757478743/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#064734] transition"><Facebook size={16} /></a>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#064734] transition"><Youtube size={16} /></a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
