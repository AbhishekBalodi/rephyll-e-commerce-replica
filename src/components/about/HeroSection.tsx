import bottleBig from "@/assets/bottle-big.png";
import bottleMedium from "@/assets/bottle-medium.png";
import bottleSmall from "@/assets/bottle-small.png";
import bgAboutHero from "@/assets/bg-about-hero.png";

const HeroSection = () => {
  return (
    <section className="w-full text-white relative overflow-hidden">
      <img
        src={bgAboutHero}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

      {/* Desktop */}
      <div className="relative hidden md:block max-w-[1440px] mx-auto h-[542px]" style={{ zIndex: 1 }}>
        <div className="absolute left-[120px] top-[140px] max-w-[520px]">
          <h1 className="font-poppins font-semibold text-[48px] leading-[120%] mb-6">
            Clean that cares. <br />
            Safety you can trust.
          </h1>
          <p className="text-[16px] text-white/80 mb-6 border-l-2 border-[#CEF17B] pl-4">
            At rePhyl, we believe your home should never be a place of compromise.
          </p>
          <button className="bg-[#CEF17B] text-[#00301D] px-6 py-3 rounded-full font-semibold">
            Read More →
          </button>
        </div>

        <div className="absolute flex items-center justify-center rounded-[80px]" style={{ width: "267px", height: "455.79px", top: "40px", left: "1018.5px", background: "linear-gradient(180deg, #064734 0%, #0C3E30 100%)" }}>
          <img src={bottleBig} alt="" className="h-[85%] object-contain" />
        </div>
        <div className="absolute flex items-center justify-center rounded-[80px]" style={{ width: "300.59px", height: "251px", top: "40px", left: "703.5px", background: "linear-gradient(180deg, #064734 0%, #0C3E30 100%)" }}>
          <img src={bottleMedium} alt="" className="h-[80%] object-contain" />
        </div>
        <div className="absolute flex items-center justify-center rounded-[65px]" style={{ width: "214.04px", height: "178.72px", top: "303px", left: "790.5px", background: "linear-gradient(180deg, #064734 0%, #0C3E30 100%)" }}>
          <img src={bottleSmall} alt="" className="h-[75%] object-contain" />
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden relative flex flex-col items-center px-6 py-12 text-center gap-6" style={{ zIndex: 1 }}>
        <h1 className="font-poppins font-semibold text-[28px] leading-[120%]">
          Clean that cares.<br />Safety you can trust.
        </h1>
        <p className="text-[14px] text-white/80 border-l-2 border-[#CEF17B] pl-3 text-left max-w-[280px]">
          At rePhyl, we believe your home should never be a place of compromise.
        </p>
        <button className="bg-[#CEF17B] text-[#00301D] px-5 py-2.5 rounded-full font-semibold text-[14px]">
          Read More →
        </button>
        <div className="flex items-end justify-center gap-3 mt-2">
          <div className="w-[80px] h-[110px] rounded-[30px] flex items-center justify-center" style={{ background: "linear-gradient(180deg, #064734 0%, #0C3E30 100%)" }}>
            <img src={bottleMedium} alt="" className="h-[80%] object-contain" />
          </div>
          <div className="w-[90px] h-[150px] rounded-[35px] flex items-center justify-center" style={{ background: "linear-gradient(180deg, #064734 0%, #0C3E30 100%)" }}>
            <img src={bottleBig} alt="" className="h-[85%] object-contain" />
          </div>
          <div className="w-[70px] h-[90px] rounded-[25px] flex items-center justify-center" style={{ background: "linear-gradient(180deg, #064734 0%, #0C3E30 100%)" }}>
            <img src={bottleSmall} alt="" className="h-[75%] object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
