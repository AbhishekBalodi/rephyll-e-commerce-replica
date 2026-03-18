import { Instagram, Facebook, Youtube, Mail, Phone, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoBlack from "@/assets/logo-black.png";
import cloverLime from "@/assets/clover-lime.png";
import { apiService } from "@/services/apiService";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNav = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await apiService.subscribeNewsletter(email);
      toast({ title: "Subscribed!", description: "You've been added to our newsletter." });
      setEmail("");
    } catch {
      toast({ title: "Subscribed!", description: "Thank you for signing up." });
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-secondary/60 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Stay In Touch */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-foreground mb-4">Stay In Touch</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Sign up for exclusive offers, original stories, events and more.
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center border-b border-foreground/30 pb-1 mb-8">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                required
              />
              <button type="submit" disabled={loading} className="text-foreground hover:text-primary transition-colors">
                <ArrowRight size={20} />
              </button>
            </form>

            <h4 className="text-base font-bold text-foreground mb-3">Contact us</h4>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-muted-foreground" />
                <a href="mailto:care@rephyl.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  care@rephyl.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-muted-foreground" />
                <a href="tel:9313984685" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  +91 9313984685
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Shop All", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Why Choose Us", path: "/why-choose-us" },
                { label: "Testimonials", path: "/testimonials" },
                { label: "FAQs", path: "/faqs" },
                { label: "Contact Us", path: "/contact" },
                { label: "Track Your Order", path: "/contact" },
              ].map((link) => (
                <button key={link.label} onClick={() => handleNav(link.path)} className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left">
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Policies</h3>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Terms of Service", path: "/terms" },
                { label: "Privacy Policy", path: "/privacy-policy" },
                { label: "Refund & Return Policy", path: "/refund-policy" },
                { label: "Shipping Policy", path: "/terms" },
              ].map((link) => (
                <button key={link.label} onClick={() => handleNav(link.path)} className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left">
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social + Brand */}
          <div className="flex flex-col items-start md:items-end">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Show us some ❤️ on social media
            </h3>
            <div className="flex items-center gap-4 mb-8">
              <a href="https://www.instagram.com/rephyl.life" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/people/rePhyl/61583757478743/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube size={18} />
              </a>
            </div>

            <div className="mt-auto">
              <h2 className="text-3xl font-display font-light tracking-wide text-foreground">rePhyl</h2>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mt-1">Have a Clean Day!</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            Copyright © Rephyll Personal Care Private Limited 2026 |{" "}
            <button onClick={() => handleNav("/terms")} className="hover:text-foreground transition-colors">Terms of Service</button> |{" "}
            <button onClick={() => handleNav("/privacy-policy")} className="hover:text-foreground transition-colors">Privacy Policy</button> |{" "}
            <button onClick={() => handleNav("/refund-policy")} className="hover:text-foreground transition-colors">Refund & Return Policy</button>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
