import { Instagram, Facebook, Youtube, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cloverDark from "@/assets/clover-green-dark.png";
import logoGreen from "@/assets/logo-green-cropped.png";
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
      <div className="max-w-6xl mx-auto px-6">

        {/* TOP SECTION */}
        <div className="flex flex-col lg:flex-row justify-between gap-16">

          {/* LEFT SIDE (LOGO + LINKS) */}
          <div className="flex flex-col md:flex-row gap-16 flex-1">

            {/* LOGO */}
            {/* <div className="flex flex-col items-start">
              <img src={cloverDark} className="w-16 mb-3" />
              <img src={logoGreen} className="w-28 -mt-6 mb-2" />
              <p className="text-sm text-white/60">
                Plant-powered cleaning for modern homes.
              </p>
            </div> */}

            {/* QUICK LINKS */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="flex flex-col gap-2 text-white/60 text-sm">
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
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* POLICIES */}
            <div>
              <h3 className="font-semibold mb-4">Policies</h3>
              <div className="flex flex-col gap-2 text-white/60 text-sm">
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
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CONTACT */}
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>

              <div className="flex flex-col gap-2 text-white/60 text-sm">
                {[
                  { label: "care@rephyl.com", type: "mailto", value: "care@rephyl.com" },
                  { label: "+91 9313984685", type: "tel", value: "9313984685" },
                  { label: "Why Choose Us", path: "/why-choose-us" },
                  { label: "Testimonials", path: "/testimonials" },
                  { label: "FAQs", path: "/faqs" },
                  { label: "Contact us", path: "/contact" },
                ].map((item) => {
                  // 👉 EMAIL
                  if (item.type === "mailto") {
                    return (
                      <a
                        key={item.label}
                        href={`mailto:${item.value}`}
                        className="hover:text-white transition"
                      >
                        {item.label}
                      </a>
                    );
                  }

                  // 👉 PHONE
                  if (item.type === "tel") {
                    return (
                      <a
                        key={item.label}
                        href={`tel:${item.value}`}
                        className="hover:text-white transition"
                      >
                        {item.label}
                      </a>
                    );
                  }

                  // 👉 NORMAL NAV BUTTONS
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleNav(item.path)}
                      className="text-left hover:text-white transition"
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* SUBSCRIBE CARD */}
          <div className="bg-white/10 rounded-xl p-6 w-full max-w-xs">
            <h3 className="font-semibold mb-4">Subscribe</h3>

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
              Hello, we are rePhyl. trying to make an effort to put the right people for you to get the best results. Just insight
            </p>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 my-10"></div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* LOGO TEXT */}
          <h2 className="text-2xl font-bold">rePhyl</h2>

          {/* COPYRIGHT */}
          <p className="text-sm text-white/60">
            ©2026 rePhyl. All rights reserved.
          </p>

          {/* SOCIALS */}
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/rephyl.life"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#064734] transition"
            >
              <Instagram size={16} />
            </a>

            <a
              href="https://www.facebook.com/people/rePhyl/61583757478743/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#064734] transition"
            >
              <Facebook size={16} />
            </a>

            <a
              href="https://www.youtube.com/"  // replace with your real channel
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#064734] transition"
            >
              <Youtube size={16} />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;