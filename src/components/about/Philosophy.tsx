import clover from "@/assets/clover-dark-green.png";

import icon1 from "@/assets/philosophy-1.png";
import icon2 from "@/assets/philosophy-2.png";
import icon3 from "@/assets/philosophy-3.png";
import icon4 from "@/assets/philosophy-4.png";

const items = [
  {
    title: "Effective",
    desc: "Powerful enough to handle real homes and real messes.",
    icon: icon1,
  },
  {
    title: "Safe",
    desc: "Free from what doesn’t belong in the spaces you live in.",
    icon: icon2,
  },
  {
    title: "Thoughtful",
    desc: "Designed with care for families, pets, and everyday life.",
    icon: icon3,
  },
  {
    title: "Reassuring",
    desc: "So you never have to second-guess what you're using.",
    icon: icon4,
  },
];

const Philosophy = () => {
  return (
    <section className="relative w-full h-[573px] bg-[#064734] overflow-hidden">

      {/* ================= CLOVERS (MATCHED TO FIGMA) ================= */}
      <img src={clover} className="absolute w-[153px] top-[10px] right-[0px]" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] top-[-120px] right-[300px]" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] bottom-[80px] left-[-80px]" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] bottom-[-40px] left-[350px]" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] bottom-[-80px] right-[0px]" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] top-[80px] left-[-120px]" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] top-[290px] right-[0px]" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] top-[10px] right-[1300px]" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] top-[390px] right-[1300px]" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] top-[10px] right-[400px]" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] top-[10px] right-[950px]" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] top-[390px] right-[400px]" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />



      {/* ================= CONTENT ================= */}
      <div className="relative w-[1280px] mx-auto flex flex-col items-center pt-[60px]">

        {/* TITLE */}
        <h2 className="text-[40px] leading-[60px] font-poppins font-semibold text-white text-center">
          Our philosophy
        </h2>

        {/* SUBTEXT */}
        <p className="text-[20px] leading-[28px] font-poppins text-white mt-[8px]">
          We believe cleaning should be:
        </p>

        {/* ================= WHITE CONTAINER ================= */}
        <div className="mt-[30px] w-[1237px] h-[213px] bg-white rounded-[24px] px-[40px] py-[20px] flex items-center justify-between">

          {items.map((item, i) => (
            <div
              key={i}
              className="w-[220px] flex flex-col items-center text-center gap-[12px]"
            >
              {/* ICON */}
              <div className="w-[76px] h-[76px] bg-[#F1FBD7] rounded-full flex items-center justify-center">
                <img src={item.icon} className="w-[30px] h-[30px]" />
              </div>

              {/* TITLE */}
              <h3 className="text-[18px] font-semibold text-[#064734] leading-[150%]">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-[14px] leading-[150%] text-[#064734]">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

        {/* ================= BOTTOM TEXT ================= */}
        <p className="mt-[24px] text-[20px] leading-[28px] text-white text-center">
          Because true cleanliness isn’t just about what you remove.
        </p>

        <p className="text-[20px] leading-[28px] text-white font-bold text-center">
          It’s about what you choose to keep out.
        </p>

      </div>
    </section>
  );
};

export default Philosophy;