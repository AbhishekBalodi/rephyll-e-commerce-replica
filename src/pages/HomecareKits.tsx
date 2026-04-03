import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomecareKitsSection from "@/components/HomecareKitsSection";

const HomecareKitsPage = () => {
  const [activeView, setActiveView] = useState<"smart" | "mega">("smart");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-6 flex items-center gap-4 justify-center">
          <button
            onClick={() => setActiveView("smart")}
            className={`px-5 py-2 rounded-full font-semibold ${activeView === "smart" ? "bg-[#064734] text-white" : "bg-[#E6F5E3] text-[#064734]"}`}
          >
            Smart Bundles
          </button>
          <button
            onClick={() => setActiveView("mega")}
            className={`px-5 py-2 rounded-full font-semibold ${activeView === "mega" ? "bg-[#064734] text-white" : "bg-[#E6F5E3] text-[#064734]"}`}
          >
            Mega Saver Pack
          </button>
        </div>

        <HomecareKitsSection mode={activeView === "smart" ? "homecare" : "mega"} cardsOnly />
      </section>
      <Footer />
    </div>
  );
};

export default HomecareKitsPage;
