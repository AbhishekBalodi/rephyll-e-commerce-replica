import bottleBig from "@/assets/bottle-big.png";
import bottleMedium from "@/assets/bottle-medium.png";
import bottleSmall from "@/assets/bottle-small.png";
import cloverLime from "@/assets/clover-lime.png";

const HeroSection = () => {
  return (
    <section className="w-full bg-[#00301D] text-white relative overflow-hidden">
      
      {/* CLOVERS - desktop */}
      <img src={cloverLime} className="absolute opacity-20 pointer-events-none hidden md:block" style={{ width: "153px", height: "153px", left: "0px", top: "0px" }} />
      <img src={cloverLime} className="absolute opacity-20 pointer-events-none hidden md:block" style={{ width: "153px", height: "153px", left: "0px", top: "380px" }} />
      <img src={cloverLime} className="absolute opacity-20 pointer-events-none hidden md:block" style={{ width: "153px", height: "153px", left: "1350px", top: "380px" }} />
      <img src={cloverLime} className="absolute opacity-20 pointer-events-none hidden md:block" style={{ width: "153px", height: "153px", left: "496px", top: "0px" }} />
      <img src={cloverLime} className="absolute opacity-15 pointer-events-none hidden md:block" style={{ width: "153px", height: "153px", left: "642px", top: "391px" }} />
      <img src={cloverLime} className="absolute opacity-15 pointer-events-none hidden md:block" style={{ width: "153px", height: "153px", left: "1170px", top: "302px" }} />
      <img src={cloverLime} className="absolute opacity-20 pointer-events-none hidden md:block" style={{ width: "153px", height: "153px", left: "1350px", top: "0px" }} />
      <img src={cloverLime} className="absolute opacity-10 pointer-events-none hidden md:block" style={{ width: "153px", height: "153px", left: "350px", top: "350px" }} />
      <img src={cloverLime} className="absolute opacity-10 pointer-events-none hidden md:block" style={{ width: "153px", height: "153px", left: "900px", top: "100px" }} />

      {/* Mobile clovers */}
      <img src={cloverLime} className="absolute opacity-15 pointer-events-none md:hidden" style={{ width: "80px", height: "80px", right: "0px", top: "0px" }} />
      <img src={cloverLime} className="absolute opacity-15 pointer-events-none md:hidden" style={{ width: "80px", height: "80px", left: "0px", bottom: "0px" }} />

      {/* CONTENT WRAPPER */}
      {/* Desktop */}
      <div className="relative hidden md:block max-w-[1440px] mx-auto h-[542px]">
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
      <div className="md:hidden flex flex-col items-center px-6 py-12 text-center gap-6">
        <h1 className="font-poppins font-semibold text-[28px] leading-[120%]">
          Clean that cares.<br />Safety you can trust.
        </h1>
        <p className="text-[14px] text-white/80 border-l-2 border-[#CEF17B] pl-3 text-left max-w-[280px]">
          At rePhyl, we believe your home should never be a place of compromise.
        </p>
        <button className="bg-[#CEF17B] text-[#00301D] px-5 py-2.5 rounded-full font-semibold text-[14px]">
          Read More →
        </button>

        {/* Bottles row on mobile */}
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
