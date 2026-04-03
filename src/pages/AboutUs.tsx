import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustMarqueeStrip from "@/components/TrustMarqueeStrip";
import HeroSection from "@/components/about/HeroSection";
import WhyWeExist from "@/components/about/WhyWeExist";
import MoreThanProducts from "@/components/about/MoreThanProducts";
import Philosophy from "@/components/about/Philosophy";
import Promises from "@/components/about/Promises";
import BlogsSection from "@/components/BlogsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import TrustStrips from "@/components/TrustStrips";

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <HeroSection />
      <TrustMarqueeStrip />
      <WhyWeExist />
      <WhyChooseUs />

      {/* Already built section */}
      {/* <HowWeAreMakingDifference /> */}

      <MoreThanProducts />
      <Philosophy />
      <Promises />

      {/* Already existing section */}
      {/* <CleanLivingSection /> */}
      <TrustStrips />
      {/* <BlogsSection /> */}
      <Footer />
    </div>
  );
};

export default AboutUs;