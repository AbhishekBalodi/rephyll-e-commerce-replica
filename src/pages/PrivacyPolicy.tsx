import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WebsitePageHero from "@/components/WebsitePageHero";
import { useWebsitePageByPath } from "@/hooks/useWebsitePage";

const PrivacyPolicy = () => {
  const { data: pageData, loading } = useWebsitePageByPath("/privacy-policy");

  useEffect(() => {
    if (pageData) {
      document.title = pageData.metaTitle || "Privacy Policy - rePhyl";
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", pageData.metaDescription);
      }

      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", pageData.metaKeywords || "");
      }
    }
  }, [pageData]);

  // Fallback content
  const defaultContent = `
    <div>
      <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 12px;">Introduction</h2>
      <p>At rePhyl, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.rephyl.com, purchase products, or interact with our services.</p>
      <p style="margin-top: 8px;">By using our website, you consent to the practices described in this policy.</p>
    </div>
  `;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <WebsitePageHero
        page={pageData}
        fallbackTitle="Privacy Policy"
        fallbackDescription="Our commitment to protecting your personal information and privacy."
      />

      <section className="max-w-4xl mx-auto px-4 md:px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
          {pageData?.title || "rePhyl Privacy Policy"}
        </h1>

        {loading ? (
          <div className="text-center py-8">
            <p>Loading page content...</p>
          </div>
        ) : (
          <div
            className="space-y-8 text-foreground/80 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: pageData?.content || defaultContent,
            }}
          />
        )}
      </section>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
