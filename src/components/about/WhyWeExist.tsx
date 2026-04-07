import powerIcon from "@/assets/power-icon.png";
import safetyIcon from "@/assets/safety-icon.png";
import cloverLime from "@/assets/clover-lime.png";

const WhyWeExist = () => {
  return (
    <section className="relative w-full min-h-[500px] md:h-[733px] overflow-hidden py-10 md:py-0">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[rgba(206,241,123,0.3)]" />

      {/* CLOVERS - desktop only */}
      <img src={cloverLime} className="absolute opacity-60 hidden md:block" style={{ width: 153, height: 153, left: 10, top: 24 }} />
      <img src={cloverLime} className="absolute opacity-60 hidden md:block" style={{ width: 153, height: 153, left: 780, top: 10 }} />
      <img src={cloverLime} className="absolute opacity-60 hidden md:block" style={{ width: 153, height: 153, left: 416, top: 19 }} />
      <img src={cloverLime} className="absolute opacity-60 hidden md:block" style={{ width: 153, height: 153, left: 1079, top: 10 }} />
      <img src={cloverLime} className="absolute opacity-60 hidden md:block" style={{ width: 153, height: 153, left: 10, top: 340 }} />
      <img src={cloverLime} className="absolute opacity-60 hidden md:block" style={{ width: 153, height: 153, left: 334, top: 656 }} />
      <img src={cloverLime} className="absolute opacity-60 hidden md:block" style={{ width: 153, height: 153, left: 10, top: 580 }} />
      <img src={cloverLime} className="absolute opacity-60 hidden md:block" style={{ width: 153, height: 153, left: 1370, top: 580 }} />
      <img src={cloverLime} className="absolute opacity-60 hidden md:block" style={{ width: 153, height: 153, left: 1370, top: 20 }} />
      <img src={cloverLime} className="absolute opacity-60 hidden md:block" style={{ width: 153, height: 153, left: 1340, top: 340 }} />

      {/* MAIN CONTAINER */}
      <div className="relative max-w-[1280px] mx-auto px-4 md:px-0 md:pt-[80px] flex flex-col items-center gap-4 md:gap-6">

        <h2 className="text-[28px] md:text-[40px] leading-[40px] md:leading-[60px] font-poppins font-semibold text-[#064734] text-center">
          Why We Exist
        </h2>

        {/* CARDS ROW */}
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-[10px] w-full max-w-[1200px] justify-center">
          {/* LEFT CARD */}
          <div className="w-full md:w-[575px] h-auto md:h-[195px] bg-[#E2F5B2] rounded-[16px] md:rounded-[20px] px-5 md:px-[32px] py-5 md:py-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center">
            <div className="w-[52px] h-[52px] md:w-[66px] md:h-[66px] bg-[#CEF17B] rounded-full flex items-center justify-center mb-2 md:mb-3">
              <img src={powerIcon} className="w-[16px] h-[16px] md:w-[20px] md:h-[20px] object-contain" />
            </div>
            <h3 className="text-[20px] md:text-[24px] leading-[32px] md:leading-[48px] font-semibold text-[#064734] text-center">
              Choose Power
            </h3>
            <p className="text-[14px] md:text-[16px] leading-[22px] md:leading-[28px] text-[#064734] text-center">
              Strong chemicals, harsh fumes, toxic residue
            </p>
          </div>

          {/* OR */}
          <div className="w-[40px] h-[40px] md:h-[48px] flex items-center justify-center">
            <span className="text-[24px] md:text-[30px] leading-[48px] font-bold text-[#064734]">Or</span>
          </div>

          {/* RIGHT CARD */}
          <div className="w-full md:w-[610px] h-auto md:h-[195px] bg-[#E2F5B2] rounded-[16px] md:rounded-[20px] px-5 md:px-[32px] py-5 md:py-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center">
            <div className="w-[56px] h-[56px] md:w-[77px] md:h-[77px] bg-[#CEF17B] rounded-full flex items-center justify-center mb-2 md:mb-3">
              <img src={safetyIcon} className="w-[18px] h-[18px] md:w-[24px] md:h-[24px] object-contain" />
            </div>
            <h3 className="text-[20px] md:text-[24px] leading-[32px] md:leading-[48px] font-semibold text-[#064734] text-center">
              Choose safety
            </h3>
            <p className="text-[14px] md:text-[16px] leading-[22px] md:leading-[28px] text-[#064734] text-center">
              Natural ingredients, weaker performance
            </p>
          </div>
        </div>

        {/* DOWN ARROW */}
        <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] flex items-center justify-center">
          <span className="text-[30px] md:text-[40px] text-[#064734]">↓</span>
        </div>

        {/* CTA BOX */}
        <div className="max-w-[1200px] w-full h-auto md:h-[180px] bg-[#064734] rounded-[16px] md:rounded-[20px] px-5 md:px-[32px] py-5 md:py-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center gap-3 md:gap-[10px]">
          <p className="text-[18px] md:text-[24px] leading-[28px] md:leading-[48px] font-semibold text-white text-center">
            We built rePhyl so you don't have to choose
          </p>
          <div className="flex items-center gap-3 md:gap-[16px]">
            <button className="flex items-center gap-2 md:gap-[10px] px-6 md:px-[40px] py-3 md:py-[16px] bg-[#CEF17B] rounded-[43px]">
              <img src={powerIcon} className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] object-contain" />
              <span className="text-[14px] md:text-[16px] font-semibold text-[#064734]">Power</span>
            </button>
            <span className="text-white text-[20px] md:text-[24px]">+</span>
            <button className="flex items-center gap-2 md:gap-[10px] px-6 md:px-[40px] py-3 md:py-[16px] bg-[#CEF17B] rounded-[43px]">
              <img src={safetyIcon} className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] object-contain" />
              <span className="text-[14px] md:text-[16px] font-semibold text-[#064734]">Safety</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWeExist;
