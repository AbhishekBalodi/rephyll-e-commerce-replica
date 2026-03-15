import { Instagram, Facebook, Youtube, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-16">
      {/* Wave SVG separator */}
      <div className="w-full">
        <svg viewBox="0 0 1440 120" className="w-full" preserveAspectRatio="none" style={{ height: "80px" }}>
          <path
            d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z"
            className="fill-primary"
          />
        </svg>
      </div>

      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Left: social */}
            <div>
              <p className="font-bold text-sm uppercase tracking-wider mb-4">
                SHOW US SOME ❤️ ON SOCIAL MEDIA
              </p>
              <div className="flex items-center gap-4 mb-6">
                <a 
                  href="https://www.instagram.com/rephyl.life?igsh=MTl2djZka2o5MHE3aA%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Instagram size={24} />
                </a>
                <a 
                  href="https://www.facebook.com/people/rePhyl/61583757478743/?mibextid=wwXIfr&rdid=SRTVJ4AdT7BTfmxo&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18EqdFprat%2F%3Fmibextid%3DwwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Facebook size={24} />
                </a>
                <Youtube size={24} className="cursor-pointer hover:opacity-80" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Mail size={16} className="opacity-90" />
                <a 
                  href="mailto:care@rephyl.com" 
                  className="text-sm opacity-90 hover:opacity-100 transition-opacity"
                >
                  care@rephyl.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="opacity-90" />
                <a 
                  href="tel:9313984685" 
                  className="text-sm opacity-90 hover:opacity-100 transition-opacity"
                >
                  +91 9313984685
                </a>
              </div>
            </div>

            {/* Center: brand */}
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-4xl font-extrabold tracking-tight">rePhyl</h2>
              <p className="text-xs uppercase tracking-[0.3em] mt-1 opacity-80">
                Have a Clean Day!
              </p>
            </div>

            {/* Right: links */}
            <div className="flex flex-col items-start md:items-end gap-3">
              {[
                "About Us",
                "We Are Eco-friendly",
                "We Care",
                "FAQs",
                "Contact Us",
                "Shipping Policy",
                "Refund Policy",
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm font-semibold hover:opacity-80 transition-opacity"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-6 border-t border-primary-foreground/20 text-center">
            <p className="text-xs opacity-70">
              Copyright © Rephyll Personal Care Private Limited 2026 |{" "}
              <a href="#" className="hover:opacity-100">Terms of Service</a> |{" "}
              <a href="#" className="hover:opacity-100">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
