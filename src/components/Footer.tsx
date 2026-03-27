import { Instagram, Facebook, Youtube, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    } catch {
      toast({ title: "Subscribed!", description: "Thank you for signing up." });
    } finally {
      setEmail("");
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#064734] text-white pt-20 pb-10">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* TOP SECTION - equal spacing */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* QUICK LINKS */}
          <div>
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "16px", lineHeight: "28px", letterSpacing: "0px", color: "#FFFFFF", marginBottom: "16px" }}>
              Quick Links
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { label: "Shop All", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Why Choose Us", path: "/why-choose-us" },
                { label: "Testimonials", path: "/testimonials" },
                { label: "FAQs", path: "/faqs" },
                { label: "Contact Us", path: "/contact" },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.path)}
                  className="text-left hover:text-white transition"
                  style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: "16px", lineHeight: "100%", letterSpacing: "0px", color: "rgba(255,255,255,0.6)" }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* POLICIES */}
          <div>
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "16px", lineHeight: "28px", letterSpacing: "0px", color: "#FFFFFF", marginBottom: "16px" }}>
              Policies
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { label: "Terms & Conditions", path: "/terms" },
                { label: "Privacy Policy", path: "/privacy-policy" },
                { label: "Refund Policy", path: "/refund-policy" },
                { label: "Shipping Policy", path: "/shipping-policy" },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.path)}
                  className="text-left hover:text-white transition"
                  style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: "16px", lineHeight: "100%", letterSpacing: "0px", color: "rgba(255,255,255,0.6)" }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "16px", lineHeight: "28px", letterSpacing: "0px", color: "#FFFFFF", marginBottom: "16px" }}>
              Contact
            </h3>
            <div className="flex flex-col gap-2">
              <a href="mailto:care@rephyl.com" className="hover:text-white transition" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: "16px", lineHeight: "100%", color: "rgba(255,255,255,0.6)" }}>
                care@rephyl.com
              </a>
              <a href="tel:9313984685" className="hover:text-white transition" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: "16px", lineHeight: "100%", color: "rgba(255,255,255,0.6)" }}>
                +91 9313984685
              </a>
            </div>
          </div>

          {/* SUBSCRIBE */}
          <div>
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "16px", lineHeight: "28px", letterSpacing: "0px", color: "#FFFFFF", marginBottom: "16px" }}>
              Subscribe
            </h3>

            <form onSubmit={handleSubscribe} className="relative mb-4">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border border-[#CEF17B66] px-4 py-3 rounded-md text-sm placeholder:text-white/50 outline-none"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-0 top-0 h-full px-4 bg-[#CEF17B] rounded-r-md flex items-center justify-center"
              >
                <ArrowRight className="text-[#064734]" size={18} />
              </button>
            </form>

            <p className="text-sm text-white/60">
              Hello, we are rePhyl. trying to make an effort to put the right people for you to get the best results.
            </p>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 my-10"></div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <h2 className="text-2xl font-bold">rePhyl</h2>
          <p className="text-sm text-white/60">©2026 rePhyl. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/rephyl.life" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#064734] transition">
              <Instagram size={16} />
            </a>
            <a href="https://www.facebook.com/people/rePhyl/61583757478743/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#064734] transition">
              <Facebook size={16} />
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#064734] transition">
              <Youtube size={16} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
