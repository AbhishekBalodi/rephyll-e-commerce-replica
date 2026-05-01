import bgAvailable from "@/assets/bg-available-on.png";
import availableOnRef from "@/assets/available-on-ref.png";

const PLATFORMS = ["amazon", "blinkit", "zepto"] as const;

const AmazonLogo = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div
      role="img"
      aria-label="Amazon"
      className="h-[70%] w-[92%] bg-no-repeat"
      style={{
        backgroundImage: `url(${availableOnRef})`,
        backgroundSize: "80% auto",
        backgroundPosition: "1.5% 51%",
      }}
    />
  </div>
);

const BlinkitLogo = () => (
  <div className="flex h-full w-full items-center justify-center">
    <span className="text-[34px] font-semibold leading-none tracking-[-0.04em] text-[#F3B51B] md:text-[40px]">blinkit</span>
  </div>
);

const ZeptoLogo = () => (
  <div className="flex h-full w-full flex-col items-center justify-center gap-1 md:gap-2">
    <span className="text-[34px] font-semibold leading-none tracking-[-0.05em] text-[#7E27E8] md:text-[41px]">zepto</span>
    <span className="rounded-full bg-[#F3B51B1A] px-2 py-0.5 text-[11px] font-semibold tracking-[0.02em] text-[#7E27E8] md:px-3 md:text-[12px]">
      Coming Soon
    </span>
  </div>
);

const PlatformLogo = ({ platform }: { platform: (typeof PLATFORMS)[number] }) => {
  switch (platform) {
    case "amazon":
      return <AmazonLogo />;
    case "blinkit":
      return <BlinkitLogo />;
    case "zepto":
      return <ZeptoLogo />;
    default:
      return null;
  }
};

const WeAreAvailableOnSection = () => {
  return (
    <section
      className="relative w-full flex justify-center overflow-hidden"
      style={{ minHeight: "320px" }}
    >
      <img
        src={bgAvailable}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 h-full w-full object-cover md:hidden"
        style={{ zIndex: 0 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          zIndex: 0,
          backgroundImage: `url(${bgAvailable})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
        }}
      />

      <div
        className="relative flex w-full max-w-[1440px] flex-col items-center justify-center gap-4 px-3 py-8 text-center md:h-[490px] md:justify-start md:gap-6 md:pt-8 md:pb-[86px]"
        style={{ zIndex: 1 }}
      >
        <h2
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(28px, 5vw, 40px)",
            lineHeight: "1.2",
            color: "#FFFFFF",
          }}
        >
          We Are Available On
        </h2>

        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(14px, 3vw, 20px)",
            lineHeight: "1.4",
            color: "#FFFFFF",
          }}
        >
          Curated Combinations for Effortless Cleaning
        </p>

        <div className="relative flex w-full items-center justify-center">
          <div
            className="mx-auto mt-1 inline-flex h-auto w-full max-w-[760px] items-center justify-between gap-2 rounded-[24px] bg-white px-4 py-4 shadow-[0_16px_40px_rgba(0,0,0,0.12)] md:mt-5 md:h-[170px] md:max-w-[820px] md:gap-6 md:px-10 md:py-0"
          >
            {PLATFORMS.map((platform) => (
              <div
                key={platform}
                className="flex h-[70px] min-w-0 flex-1 items-center justify-center md:h-[102px]"
              >
                <PlatformLogo platform={platform} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeAreAvailableOnSection;
