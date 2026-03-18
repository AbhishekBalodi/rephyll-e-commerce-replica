import { Instagram, Facebook, Youtube } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cloverDark from "@/assets/clover-green-dark.png";
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
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        {/* Top row: Logo + Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <img src={cloverDark} alt="rePhyl" className="w-12 h-12 mb-3" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Plant-powered cleaning for modern homes.
            </p>
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
                { label: "Terms & Conditions", path: "/terms" },
                { label: "Privacy Policy", path: "/privacy-policy" },
                { label: "Refund Policy", path: "/refund-policy" },
                { label: "Shipping Policy", path: "/terms" },
              ].map((link) => (
                <button key={link.label} onClick={() => handleNav(link.path)} className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left">
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Contact</h3>
            <div className="flex flex-col gap-2.5">
              <a href="mailto:care@rephyl.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                care@rephyl.com
              </a>
              <a href="tel:9313984685" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                +91 9313984685
              </a>
            </div>
          </div>
        </div>

        {/* Stay in Touch - full width */}
        <div className="border-t border-border pt-10 mb-10">
          <h3 className="text-lg font-bold text-foreground mb-4">Stay in Touch</h3>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-lg bg-primary text-accent font-bold text-sm hover:opacity-90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Social + Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            Show us some ❤️
          </p>
          <div className="flex items-center gap-4">
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
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 rePhyl. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
