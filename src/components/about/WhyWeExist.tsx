import powerIcon from "@/assets/power-icon.png";
import safetyIcon from "@/assets/safety-icon.png";
import cloverLime from "@/assets/clover-lime.png";

const WhyWeExist = () => {
  return (
    <section className="relative w-full h-[733px] overflow-hidden">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[rgba(206,241,123,0.3)]" />

      {/* ================= CLOVERS ================= */}
      <img src={cloverLime} className="absolute opacity-60" style={{ width: 153, height: 153, left: 10, top: 24 }} />
      <img src={cloverLime} className="absolute opacity-60" style={{ width: 153, height: 153, left: 780, top: 10 }} />
      <img src={cloverLime} className="absolute opacity-60" style={{ width: 153, height: 153, left: 416, top: 19 }} />
      <img src={cloverLime} className="absolute opacity-60" style={{ width: 153, height: 153, left: 1079, top: 10 }} />
      <img src={cloverLime} className="absolute opacity-60" style={{ width: 153, height: 153, left: 1646, top: -31 }} />

      <img src={cloverLime} className="absolute opacity-60" style={{ width: 153, height: 153, left: 10, top: 340 }} />
      <img src={cloverLime} className="absolute opacity-60" style={{ width: 153, height: 153, left: 334, top: 656 }} />
      <img src={cloverLime} className="absolute opacity-60" style={{ width: 153, height: 153, left: 737, top: 656 }} />
      <img src={cloverLime} className="absolute opacity-60" style={{ width: 153, height: 153, left: 10, top: 580 }} />
      <img src={cloverLime} className="absolute opacity-60" style={{ width: 153, height: 153, left: 1639, top: 490 }} />
      <img src={cloverLime} className="absolute opacity-60" style={{ width: 153, height: 153, left: 1660, top: 288 }} />
      <img src={cloverLime} className="absolute opacity-60" style={{ width: 153, height: 153, left: 1370, top: 580 }} />
      <img src={cloverLime} className="absolute opacity-60" style={{ width: 153, height: 153, left: 1370, top: 20 }} />
      <img src={cloverLime} className="absolute opacity-60" style={{ width: 153, height: 153, left: 1340, top: 340 }} />

      {/* ================= MAIN CONTAINER ================= */}
      <div className="relative w-[1280px] mx-auto pt-[80px] flex flex-col items-center gap-6">

        {/* TITLE */}
        <h2 className="text-[40px] leading-[60px] font-poppins font-semibold text-[#064734] text-center">
          Why We Exist
        </h2>

        {/* ================= CARDS ROW ================= */}
        <div className="flex items-center gap-[10px] w-full max-w-[1200px] justify-center">

          {/* LEFT CARD */}
          <div className="w-[575px] h-[195px] bg-[#E2F5B2] rounded-[20px] px-[32px] py-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center">

            <div className="w-[66px] h-[66px] bg-[#CEF17B] rounded-full flex items-center justify-center mb-3">
              <img src={powerIcon} className="w-[20px] h-[20px] object-contain" />
            </div>

            <h3 className="text-[24px] leading-[48px] font-semibold text-[#064734] text-center">
              Choose Power
            </h3>

            <p className="text-[16px] leading-[28px] text-[#064734] text-center">
              Strong chemicals, harsh fumes, toxic residue
            </p>
          </div>

          {/* OR */}
          <div className="w-[40px] h-[48px] flex items-center justify-center">
            <span className="text-[30px] leading-[48px] font-bold text-[#064734]">
              Or
            </span>
          </div>

          {/* RIGHT CARD */}
          <div className="w-[610px] h-[195px] bg-[#E2F5B2] rounded-[20px] px-[32px] py-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center">

            <div className="w-[77px] h-[77px] bg-[#CEF17B] rounded-full flex items-center justify-center mb-3">
              <img src={safetyIcon} className="w-[24px] h-[24px] object-contain" />
            </div>

            <h3 className="text-[24px] leading-[48px] font-semibold text-[#064734] text-center">
              Choose safety
            </h3>

            <p className="text-[16px] leading-[28px] text-[#064734] text-center">
              Natural ingredients, weaker performance
            </p>
          </div>
        </div>

        {/* ================= DOWN ARROW ================= */}
        <div className="w-[60px] h-[60px] flex items-center justify-center">
          <span className="text-[40px] text-[#064734]">↓</span>
        </div>

        {/* ================= CTA BOX ================= */}
<div className="max-w-[1200px] w-full h-[180px] bg-[#064734] rounded-[20px] px-[32px] py-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center gap-[10px]">

          <p className="text-[24px] leading-[48px] font-semibold text-white text-center">
            We built rePhyl so you don’t have to choose
          </p>

          <div className="flex items-center gap-[16px]">

            {/* POWER BUTTON */}
            <button className="flex items-center gap-[10px] px-[40px] py-[16px] bg-[#CEF17B] rounded-[43px]">
              <img src={powerIcon} className="w-[16px] h-[16px] object-contain" />
              <span className="text-[16px] font-semibold text-[#064734]">
                Power
              </span>
            </button>

            {/* PLUS */}
            <span className="text-white text-[24px]">+</span>

            {/* SAFETY BUTTON */}
            <button className="flex items-center gap-[10px] px-[40px] py-[16px] bg-[#CEF17B] rounded-[43px]">
              <img src={safetyIcon} className="w-[16px] h-[16px] object-contain" />
              <span className="text-[16px] font-semibold text-[#064734]">
                Safety
              </span>
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyWeExist;