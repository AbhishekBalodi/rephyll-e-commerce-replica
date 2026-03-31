import icon1 from "@/assets/promise-1.png";
import icon2 from "@/assets/promise-2.png";
import icon3 from "@/assets/promise-3.png";
import icon4 from "@/assets/promise-4.png";

import cloverLime from "@/assets/clover-lime.png";

const promises = [
  { text: "Cleaning that performs", icon: icon1 },
  { text: "Ingredients you can trust", icon: icon2 },
  { text: "A home that feels safe", icon: icon3 },
  { text: "Peace of mind in every clean", icon: icon4 },
];

const Promises = () => {
  return (
    <section className="relative w-full h-[476px] overflow-hidden">

      {/* ================= BACKGROUND GRADIENT ================= */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#CEF17B] to-[#FFFFFF]" />

      {/* ================= CLOVERS ================= */}
      {/* Left side (faded) */}
      <img src={cloverLime} className="absolute opacity-10" style={{ width: 220, left: 10, top: 10  , opacity: 0.8,filter: "brightness(1.5)"}} />
      <img src={cloverLime} className="absolute opacity-10" style={{ width: 260, left: 200, top: 200  , opacity: 0.8,filter: "brightness(1.5)" }} />
      <img src={cloverLime} className="absolute opacity-10" style={{ width: 200, left: 500, top: 60  , opacity: 0.8,filter: "brightness(1.5)" }} />

      {/* Right side (stronger visibility) */}
      <img src={cloverLime} className="absolute opacity-25" style={{ width: 260, right: 220, top: 10  , opacity: 0.5}} />
      <img src={cloverLime} className="absolute opacity-25" style={{ width: 300, right: 50, top: 220 , opacity: 0.5 }} />
      <img src={cloverLime} className="absolute opacity-20" style={{ width: 180, right: 5, top: 20 , opacity: 0.5}} />
      {/* ================= CONTENT ================= */}
      <div className="relative w-[1280px] mx-auto flex flex-col items-center justify-center h-full">

        {/* TITLE */}
        <h2 className="text-[40px] leading-[60px] font-poppins font-semibold text-[#064734] text-center">
          Our Promises
        </h2>

        {/* SUBTEXT */}
        <p className="text-[20px] leading-[28px] font-poppins text-[#064734] mt-2 mb-10">
          We will always strive to give you:
        </p>

        {/* ================= CARDS ================= */}
        <div className="flex gap-[30px]">

          {promises.map((item, i) => (
            <div
              key={i}
              className="w-[275px] h-[201px] bg-[#064734] rounded-[24px] px-[32px] pt-[32px] pb-[24px] flex flex-col items-center justify-start gap-[24px]"
            >
              
              {/* ICON CIRCLE */}
              <div className="w-[76px] h-[76px] bg-[#F1FBD7] rounded-full flex items-center justify-center">
                <img src={item.icon} className="w-[30px] h-[30px]" />
              </div>

              {/* TEXT */}
              <p className="text-[18px] leading-[150%] font-semibold text-white text-center">
                {item.text}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Promises;