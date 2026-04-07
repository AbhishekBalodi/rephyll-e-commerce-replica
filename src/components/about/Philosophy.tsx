import clover from "@/assets/clover-green-dark.png";
import icon1 from "@/assets/philosophy-1.png";
import icon2 from "@/assets/philosophy-2.png";
import icon3 from "@/assets/philosophy-3.png";
import icon4 from "@/assets/philosophy-4.png";

const items = [
  { title: "Effective", desc: "Powerful enough to handle real homes and real messes.", icon: icon1 },
  { title: "Safe", desc: "Free from what doesn't belong in the spaces you live in.", icon: icon2 },
  { title: "Thoughtful", desc: "Designed with care for families, pets, and everyday life.", icon: icon3 },
  { title: "Reassuring", desc: "So you never have to second-guess what you're using.", icon: icon4 },
];

const Philosophy = () => {
  return (
    <section className="relative w-full min-h-[450px] md:h-[573px] bg-[#064734] overflow-hidden py-10 md:py-0">
      {/* CLOVERS - desktop */}
      <img src={clover} className="absolute w-[153px] top-[10px] right-[0px] hidden md:block" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] top-[0px] right-[200px] hidden md:block" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] bottom-[80px] left-[0px] hidden md:block" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] bottom-[0px] left-[350px] hidden md:block" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] bottom-[0px] right-[0px] hidden md:block" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] top-[80px] left-[0px] hidden md:block" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] top-[200px] right-[0px] hidden md:block" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] top-[10px] right-[1200px] hidden md:block" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] top-[10px] right-[400px] hidden md:block" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] top-[10px] right-[950px] hidden md:block" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] top-[390px] right-[400px] hidden md:block" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />

      {/* CONTENT */}
      <div className="relative max-w-[1280px] mx-auto flex flex-col items-center px-4 md:px-0 md:pt-[60px]">
        <h2 className="text-[28px] md:text-[40px] leading-[36px] md:leading-[60px] font-poppins font-semibold text-white text-center">
          Our philosophy
        </h2>
        <p className="text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-poppins text-white mt-2 md:mt-[8px]">
          We believe cleaning should be:
        </p>

        {/* WHITE CONTAINER */}
        <div className="mt-6 md:mt-[30px] w-full md:w-[1237px] md:h-[213px] bg-white rounded-[16px] md:rounded-[24px] px-4 py-5 md:px-[40px] md:py-[20px] grid grid-cols-2 md:flex md:items-center md:justify-between gap-4 md:gap-0">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2 md:gap-[12px] md:w-[220px]">
              <div className="w-[56px] h-[56px] md:w-[76px] md:h-[76px] bg-[#F1FBD7] rounded-full flex items-center justify-center">
                <img src={item.icon} className="w-[22px] h-[22px] md:w-[30px] md:h-[30px]" />
              </div>
              <h3 className="text-[15px] md:text-[18px] font-semibold text-[#064734] leading-[150%]">{item.title}</h3>
              <p className="text-[12px] md:text-[14px] leading-[150%] text-[#064734]">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* BOTTOM TEXT */}
        <p className="mt-4 md:mt-[24px] text-[14px] md:text-[20px] leading-[22px] md:leading-[28px] text-white text-center">
          Because true cleanliness isn't just about what you remove.
        </p>
        <p className="text-[14px] md:text-[20px] leading-[22px] md:leading-[28px] text-white font-bold text-center">
          It's about what you choose to keep out.
        </p>
      </div>
    </section>
  );
};

export default Philosophy;
