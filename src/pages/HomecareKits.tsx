import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomecareKitsSection from "@/components/HomecareKitsSection";
import ProductGridSection from "@/components/ProductGridSection";

const HomecareKitsPage = () => {
  const [activeView, setActiveView] = useState<"homecare" | "mega">("homecare");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-6 flex items-center gap-4 justify-center">
          <button
            onClick={() => setActiveView("homecare")}
            className={`px-5 py-2 rounded-full font-semibold ${activeView === "homecare" ? "bg-[#064734] text-white" : "bg-[#E6F5E3] text-[#064734]"}`}
          >
            Home Care Kits
          </button>
          <button
            onClick={() => setActiveView("mega")}
            className={`px-5 py-2 rounded-full font-semibold ${activeView === "mega" ? "bg-[#064734] text-white" : "bg-[#E6F5E3] text-[#064734]"}`}
          >
            Mega Saver Packs
          </button>
        </div>

        <HomecareKitsSection mode={activeView} />
      </section>
      <Footer />
    </div>
  );
};

export default HomecareKitsPage;
