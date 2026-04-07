import illustration from "@/assets/cleaning-people.png";
import cloverLime from "@/assets/clover-lime.png";
import starIcon from "@/assets/star.png";
import checkIcon from "@/assets/check.png";

const MoreThanProducts = () => {
  return (
    <section className="relative w-full min-h-[400px] md:h-[476px] overflow-hidden py-10 md:py-0">
      
      {/* BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#CEF17B] to-[#FFFFFF]" />

      {/* CLOVERS - desktop only */}
      <img src={cloverLime} className="absolute w-[153px] left-[290px] top-[10px] hidden md:block" style={{ opacity: 0.9, filter: "brightness(1.5)" }} />
      <img src={cloverLime} className="absolute w-[153px] left-[0px] top-[60px] hidden md:block" style={{ opacity: 0.9, filter: "brightness(1.5)" }} />
      <img src={cloverLime} className="absolute w-[153px] left-[40px] bottom-[10px] hidden md:block" style={{ opacity: 0.9, filter: "brightness(1.5)" }} />
      <img src={cloverLime} className="absolute w-[153px] right-[420px] top-[50px] hidden md:block" style={{ opacity: 0.4 }} />
      <img src={cloverLime} className="absolute w-[153px] right-[100px] top-[0px] hidden md:block" style={{ opacity: 0.5 }} />
      <img src={cloverLime} className="absolute w-[153px] right-[580px] bottom-[90px] hidden md:block" style={{ opacity: 0.6 }} />
      <img src={cloverLime} className="absolute w-[153px] right-[320px] bottom-[0px] hidden md:block" style={{ opacity: 0.45 }} />
      <img src={cloverLime} className="absolute w-[153px] right-[50px] top-[290px] hidden md:block" style={{ opacity: 0.5 }} />

      {/* CONTENT */}
      <div className="relative max-w-[1280px] mx-auto h-full flex flex-col md:flex-row items-center justify-between px-5 md:px-0 gap-6 md:gap-0">

        {/* LEFT SIDE */}
        <div className="w-full md:w-[600px]">
          <div className="flex items-center gap-2 bg-[#EDFFC3] w-[146px] h-[32px] md:h-[36px] rounded-full px-3">
            <img src={starIcon} className="w-[14px] h-[14px] md:w-[16px] md:h-[16px]" />
            <span className="text-[13px] md:text-[14px] font-medium text-[#064734] leading-[20px]">Smart Choice</span>
          </div>

          <h2 className="mt-3 md:mt-[16px] text-[28px] md:text-[40px] leading-[36px] md:leading-[60px] font-poppins font-semibold text-[#064734]">
            More than just products
          </h2>

          <p className="mt-2 md:mt-[8px] text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] text-[#064734]">
            rePhyl is not just about cleaning solutions.
          </p>

          <div className="mt-3 md:mt-[16px] space-y-2 md:space-y-[10px]">
            {[
              "It's about building better habits.",
              "It's about making conscious choices easier.",
              "It's about creating homes that feel as safe as they look.",
              "Every product we create is a step towards that vision.",
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2">
                <img src={checkIcon} className="w-[18px] h-[18px] md:w-[21px] md:h-[21px]" />
                <p className="text-[13px] md:text-[14px] leading-[20px] text-[#064734]">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full md:w-[619px] h-[250px] md:h-[450px] flex items-center justify-center">
          <img src={illustration} className="w-full md:w-[619px] h-full md:h-[450px] object-contain" />
        </div>
      </div>
    </section>
  );
};

export default MoreThanProducts;
