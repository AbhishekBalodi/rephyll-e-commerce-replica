import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WebsitePageHero from "@/components/WebsitePageHero";
import { useWebsitePageByPath } from "@/hooks/useWebsitePage";

const RefundPolicy = () => {
  const { data: pageData, loading } = useWebsitePageByPath("/refund-policy");

  useEffect(() => {
    if (pageData) {
      document.title = pageData.metaTitle || "Return & Refund Policy - rePhyl";
      
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
      <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 12px;">Overview</h2>
      <p>At rePhyl, we strive to ensure that every customer is satisfied with their purchase. This Return & Refund Policy outlines the conditions under which returns, replacements, or refunds may be processed.</p>
    </div>
  `;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <WebsitePageHero
        page={pageData}
        fallbackTitle="Return & Refund Policy"
        fallbackDescription="Returns, replacements, and refund terms for your rePhyl purchases."
      />

      <section className="max-w-4xl mx-auto px-4 md:px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
          {pageData?.title || "rePhyl – Return & Refund Policy"}
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

export default RefundPolicy;
