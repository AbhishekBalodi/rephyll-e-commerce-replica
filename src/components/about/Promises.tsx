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
    <section className="relative w-full min-h-[400px] md:h-[476px] overflow-hidden py-10 md:py-0">
      {/* BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#CEF17B] to-[#FFFFFF]" />

      {/* CLOVERS - desktop */}
      <img src={cloverLime} className="absolute hidden md:block" style={{ width: 153, height: 153, left: 10, top: 10, opacity: 0.8, filter: "brightness(1.5)" }} />
      <img src={cloverLime} className="absolute hidden md:block" style={{ width: 153, height: 153, left: 200, top: 200, opacity: 0.8, filter: "brightness(1.5)" }} />
      <img src={cloverLime} className="absolute hidden md:block" style={{ width: 153, height: 153, left: 500, top: 60, opacity: 0.8, filter: "brightness(1.5)" }} />
      <img src={cloverLime} className="absolute hidden md:block" style={{ width: 153, height: 153, left: 10, top: 240, opacity: 0.8, filter: "brightness(1.5)" }} />
      <img src={cloverLime} className="absolute hidden md:block" style={{ width: 153, height: 153, right: 220, top: 10, opacity: 0.5 }} />
      <img src={cloverLime} className="absolute hidden md:block" style={{ width: 153, height: 153, right: 5, top: 250, opacity: 0.5 }} />
      <img src={cloverLime} className="absolute hidden md:block" style={{ width: 153, height: 153, right: 5, top: 20, opacity: 0.5 }} />

      {/* CONTENT */}
      <div className="relative max-w-[1280px] mx-auto flex flex-col items-center justify-center h-full px-4 md:px-0">
        <h2 className="text-[28px] md:text-[40px] leading-[36px] md:leading-[60px] font-poppins font-semibold text-[#064734] text-center">
          Our Promises
        </h2>
        <p className="text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-poppins text-[#064734] mt-2 mb-6 md:mb-10">
          We will always strive to give you:
        </p>

        {/* CARDS */}
        <div className="grid grid-cols-2 md:flex gap-4 md:gap-[30px]">
          {promises.map((item, i) => (
            <div
              key={i}
              className="w-full md:w-[275px] h-auto md:h-[201px] bg-[#064734] rounded-[16px] md:rounded-[24px] px-4 md:px-[32px] pt-5 md:pt-[32px] pb-4 md:pb-[24px] flex flex-col items-center justify-start gap-3 md:gap-[24px]"
            >
              <div className="w-[56px] h-[56px] md:w-[76px] md:h-[76px] bg-[#F1FBD7] rounded-full flex items-center justify-center">
                <img src={item.icon} className="w-[22px] h-[22px] md:w-[30px] md:h-[30px]" />
              </div>
              <p className="text-[14px] md:text-[18px] leading-[150%] font-semibold text-white text-center">
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
