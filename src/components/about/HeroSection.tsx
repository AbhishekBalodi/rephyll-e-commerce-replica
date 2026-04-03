import bottleBig from "@/assets/bottle-big.png";
import bottleMedium from "@/assets/bottle-medium.png";
import bottleSmall from "@/assets/bottle-small.png";
import cloverLime from "@/assets/clover-lime.png";

const HeroSection = () => {
  return (
    <section className="w-full bg-[#00301D] text-white relative overflow-hidden">
      
      {/* ================= CLOVERS (BACKGROUND) ================= */}
      <img src={cloverLime} className="absolute opacity-20 pointer-events-none"
        style={{ width: "153px", left: "0px", top: "0px" }} />

<img src={cloverLime} className="absolute opacity-20 pointer-events-none"
  style={{ width: "153px", left: "0px", top: "380px" }} />

  <img src={cloverLime} className="absolute opacity-20 pointer-events-none"
  style={{ width: "153px", left: "1350px", top: "380px" }} />

      <img src={cloverLime} className="absolute opacity-20 pointer-events-none"
        style={{ width: "153px", left: "496px", top: "0px" }} />

      <img src={cloverLime} className="absolute opacity-15 pointer-events-none"
        style={{ width: "153px", left: "642px", top: "391px" }} />

      <img src={cloverLime} className="absolute opacity-15 pointer-events-none"
        style={{ width: "153px", left: "1170px", top: "302px" }} />

      <img src={cloverLime} className="absolute opacity-20 pointer-events-none"
        style={{ width: "153px", left: "1350px", top: "0px" }} />

      {/* EXTRA CLOVERS for depth */}
      <img src={cloverLime} className="absolute opacity-10 pointer-events-none"
        style={{ width: "153px", left: "350px", top: "350px" }} />

      <img src={cloverLime} className="absolute opacity-10 pointer-events-none"
        style={{ width: "153px", left: "900px", top: "100px" }} />


      {/* ================= CONTENT WRAPPER ================= */}
      <div className="relative max-w-[1440px] mx-auto h-[542px]">

        {/* ================= LEFT TEXT ================= */}
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


        {/* ================= RIGHT SIDE CARDS ================= */}

        {/* BIG CARD */}
        <div
          className="absolute flex items-center justify-center rounded-[80px]"
          style={{
            width: "267px",
            height: "455.79px",
            top: "40px",
            left: "1018.5px",
            background: "linear-gradient(180deg, #064734 0%, #0C3E30 100%)"
          }}
        >
          <img
            src={bottleBig}
            alt=""
            className="h-[85%] object-contain"
          />
        </div>


        {/* MEDIUM CARD */}
        <div
          className="absolute flex items-center justify-center rounded-[80px]"
          style={{
            width: "300.59px",
            height: "251px",
            top: "40px",
            left: "703.5px",
            background: "linear-gradient(180deg, #064734 0%, #0C3E30 100%)"
          }}
        >
          <img
            src={bottleMedium}
            alt=""
            className="h-[80%] object-contain"
          />
        </div>


        {/* SMALL CARD */}
        <div
          className="absolute flex items-center justify-center rounded-[65px]"
          style={{
            width: "214.04px",
            height: "178.72px",
            top: "303px",
            left: "790.5px",
            background: "linear-gradient(180deg, #064734 0%, #0C3E30 100%)"
          }}
        >
          <img
            src={bottleSmall}
            alt=""
            className="h-[75%] object-contain"
          />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;