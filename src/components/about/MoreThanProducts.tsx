import illustration from "@/assets/cleaning-people.png";
import cloverLime from "@/assets/clover-lime.png";
import starIcon from "@/assets/star.png";
import checkIcon from "@/assets/check.png";

const MoreThanProducts = () => {
  return (
    <section className="relative w-full h-[476px] overflow-hidden">
      
      {/* ================= BACKGROUND GRADIENT ================= */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#CEF17B] to-[#FFFFFF]" />

      {/* ================= CLOVERS (LEFT → RIGHT INTENSITY) ================= */}
      <img src={cloverLime} className="absolute w-[153px] left-[290px] top-[10px]" style={{ opacity: 0.9,filter: "brightness(1.5)" }} />
      <img src={cloverLime} className="absolute w-[153px] left-[0px] top-[60px]" style={{ opacity: 0.9,filter: "brightness(1.5)"}} />
      <img src={cloverLime} className="absolute w-[153px] left-[40px] bottom-[10px]" style={{ opacity: 0.9,filter: "brightness(1.5)" }} />

      <img src={cloverLime} className="absolute w-[153px] right-[420px] top-[50px]" style={{ opacity: 0.4 }} />
      <img src={cloverLime} className="absolute w-[153px] right-[100px] top-[0px]" style={{ opacity: 0.5 }} />
      <img src={cloverLime} className="absolute w-[153px] right-[580px] bottom-[90px]" style={{ opacity: 0.6 }} />
      <img src={cloverLime} className="absolute w-[153px] right-[320px] bottom-[0px]" style={{ opacity: 0.45 }} />
      <img src={cloverLime} className="absolute w-[153px] right-[50px] top-[290px]" style={{ opacity: 0.5 }} />

      {/* ================= CONTENT ================= */}
      <div className="relative w-[1280px] mx-auto h-full flex items-center justify-between">

        {/* ================= LEFT SIDE ================= */}
        <div className="w-[600px]">

          {/* CAPSULE */}
          <div className="flex items-center gap-2 bg-[#EDFFC3] w-[146px] h-[36px] rounded-full px-3">
            <img src={starIcon} className="w-[16px] h-[16px]" />
            <span className="text-[14px] font-medium text-[#064734] leading-[20px]">
              Smart Choice
            </span>
          </div>

          {/* HEADING */}
          <h2 className="mt-[16px] text-[40px] leading-[60px] font-poppins font-semibold text-[#064734]">
            More than just products
          </h2>

          {/* SUBTEXT */}
          <p className="mt-[8px] text-[20px] leading-[28px] text-[#064734]">
            rePhyl is not just about cleaning solutions.
          </p>

          {/* BULLETS */}
          <div className="mt-[16px] space-y-[10px]">
            {[
              "It’s about building better habits.",
              "It’s about making conscious choices easier.",
              "It’s about creating homes that feel as safe as they look.",
              "Every product we create is a step towards that vision.",
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2">
                <img src={checkIcon} className="w-[21px] h-[21px]" />
                <p className="text-[14px] leading-[20px] text-[#064734]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div className="w-[619px] h-[450px] flex items-center justify-center">
          <img
            src={illustration}
            className="w-[619px] h-[450px] object-contain"
          />
        </div>

      </div>
    </section>
  );
};

export default MoreThanProducts;