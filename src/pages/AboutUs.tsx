import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustMarqueeStrip from "@/components/TrustMarqueeStrip";
import HeroSection from "@/components/about/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <HeroSection />
      <TrustMarqueeStrip />

      {/* About Us Content Section */}
      <section className="w-full" style={{ backgroundColor: "#F1FBD8" }}>
        <div className="max-w-[1318px] mx-auto px-4 md:px-[68px] py-12 md:py-16">
          <h2
            className="text-[28px] md:text-[40px] leading-[42px] md:leading-[60px] font-semibold text-[#064734] mb-6 md:mb-8"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            About Us
          </h2>

          <div
            className="space-y-5 md:space-y-6 text-[16px] md:text-[24px] leading-[160%] md:leading-[100%] text-[#064734]"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
          >
            <p>
              For decades, "clean" has come with a trade-off—
            </p>
            <p className="font-semibold">
              harsh chemicals, overpowering smells, and a quiet doubt: is this really safe?
            </p>
            <p>
              We created <strong>rePhyl</strong> to change that.
            </p>
            <p>
              At rePhyl, we believe that clean and safe aren't trade-offs, they're the standard.
            </p>
            <p>
              We create plant-powered home cleaning solutions designed to deliver powerful and effective cleaning without relying on harsh chemicals or overpowering synthetic fragrances. Every product is thoughtfully formulated to remove dirt, grime, and everyday buildup, while being gentle on your home and the people in it.
            </p>
            <p>
              At the heart of rePhyl is a simple idea: you shouldn't have to question the safety of the spaces you live in. No hidden toxins, no lingering fumes, no second thoughts.
            </p>
            <p>
              Bring home a clean that feels as good as it looks. Bring home the <strong>feeling of reset</strong>, the <strong>ease of relief</strong>, and the <strong>confidence of safety</strong>.
            </p>
            <p>
              By combining nature-backed ingredients with modern formulation science, we aim to redefine what home care can be: clean, safe, and refreshingly honest.
            </p>
            <p>
              Because a truly clean home isn't just spotless, it's one you can trust.
            </p>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default AboutUs;
