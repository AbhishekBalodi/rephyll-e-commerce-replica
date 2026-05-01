import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustMarqueeStrip from "@/components/TrustMarqueeStrip";
import WebsitePageHero from "@/components/WebsitePageHero";
import WhyChooseUs from "@/components/WhyChooseUs";
import { useWebsitePageByPath } from "@/hooks/useWebsitePage";

const AboutUs = () => {
  const { data: pageData, loading, error } = useWebsitePageByPath("/about");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update meta tags
    if (pageData) {
      document.title = pageData.metaTitle || "About Us - rePhyl";
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", pageData.metaDescription);
      }
      
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", pageData.metaKeywords);
      }
    }
  }, [pageData]);

  const handleReadMore = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full">

      <Navbar />

      <WebsitePageHero
        page={pageData}
        fallbackTitle="About Us"
        fallbackDescription="Clean that cares. Safety you can trust."
        buttonLabel="Read More"
        onButtonClick={handleReadMore}
      />
      <TrustMarqueeStrip />

      {/* ✅ NORMAL SECTION (centered content) */}
      <section className="w-full bg-[#F1FBD8] pt-4 md:pt-8" ref={contentRef}>
        <div className="max-w-[1318px] mx-auto px-4 md:px-[68px] pb-12 md:pb-16">
          {loading ? (
            <div className="text-center py-8">
              <p style={{ fontFamily: "'Poppins', sans-serif", color: "#064734" }}>Loading page content...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p style={{ fontFamily: "'Poppins', sans-serif", color: "#666" }}>
                Unable to load page content. Using default content.
              </p>
            </div>
          ) : pageData?.content ? (
            <div
              className="space-y-4 md:space-y-5 text-[16px] md:text-[20px] leading-[150%] md:leading-[150%]"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: "#064734" }}
              dangerouslySetInnerHTML={{ __html: pageData.content }}
            />
          ) : (
            // Fallback content if API returns no data
            <div
              className="space-y-4 md:space-y-5 text-[16px] md:text-[20px] leading-[150%] md:leading-[150%]"
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
          )}
        </div>
      </section>

      {/* ✅ FULL WIDTH SECTION (no constraints) */}
      <WhyChooseUs heading="Redefining what home care can be: clean, safe, and refreshingly honest." />

      <Footer />

    </div>
  );
};

export default AboutUs;