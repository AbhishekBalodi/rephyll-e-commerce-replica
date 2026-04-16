import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustMarqueeStrip from "@/components/TrustMarqueeStrip";
import HeroSection from "@/components/about/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";

const AboutUs = () => {
  return (
    <div className="w-full">

      <Navbar />

      <HeroSection />
      <TrustMarqueeStrip />

      {/* ✅ NORMAL SECTION (centered content) */}
      <section className="w-full bg-[#F1FBD8] pt-[104px]">
        <div className="max-w-[1318px] mx-auto px-4 md:px-[68px] py-12 md:py-16">
          <h2
            className="text-[18px] md:text-[40px] leading-[100%] md:leading-[60px] font-semibold mb-6 md:mb-8"
            style={{ fontFamily: "'Poppins', sans-serif", color: "#064734" }}
          >
            <span className="md:text-black">About Us</span>
          </h2>

          <div
            className="space-y-5 md:space-y-6 text-[18px] md:text-[24px] leading-[100%] md:leading-[100%]"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: "#064734" }}
          >
            <p className="md:text-black">For decades, "clean" has come with a trade-off—</p>

            <p className="font-semibold md:text-black">
              harsh chemicals, overpowering smells, and a quiet doubt: is this really safe?
            </p>

            <p className="md:text-black">We created <strong>rePhyl</strong> to change that.</p>

            <p className="md:text-black">
              At rePhyl, we believe that clean and safe aren't trade-offs, they're the standard.
            </p>

            <p className="md:text-black">
              We create plant-powered home cleaning solutions designed to deliver powerful and effective cleaning without relying on harsh chemicals or overpowering synthetic fragrances.
            </p>

            <p className="md:text-black">
              At the heart of rePhyl is a simple idea: you shouldn't have to question the safety of the spaces you live in.
            </p>

            <p className="md:text-black">
              Bring home the <strong>feeling of reset</strong>, the <strong>ease of relief</strong>, and the <strong>confidence of safety</strong>.
            </p>

            <p className="md:text-black">
              By combining nature-backed ingredients with modern formulation science, we aim to redefine what home care can be.
            </p>

            <p className="md:text-black">
              Because a truly clean home isn't just spotless, it's one you can trust.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ FULL WIDTH SECTION (no constraints) */}
      <WhyChooseUs heading="Redefining what home care can be: clean, safe, and refreshingly honest." />

      <Footer />

    </div>
  );
};

export default AboutUs;