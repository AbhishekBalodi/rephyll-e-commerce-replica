import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryBar from "@/components/CategoryBar";
import TrustMarqueeStrip from "@/components/TrustMarqueeStrip";
import HomecareKitsSection from "@/components/HomecareKitsSection";

// Lazy load below-the-fold components for performance
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const TrustStrips = lazy(() => import("@/components/TrustStrips"));
const BlogsSection = lazy(() => import("@/components/BlogsSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <HeroCarousel />
        <CategoryBar />
        <TrustMarqueeStrip />
        <HomecareKitsSection showKitsTab={false} />
        <Suspense fallback={<div className="py-12" />}>
          <WhyChooseUs heading="Bring home the feeling of reset, the ease of relief, and the confidence of safety." />
        </Suspense>
        <Suspense fallback={<div className="py-12" />}>
          <TrustStrips />
        </Suspense>
        {/* <VideoReelsSection /> */}
        <Suspense fallback={<div className="py-12" />}>
          <BlogsSection />
        </Suspense>
      </main>
      <Suspense fallback={<div className="py-12" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
