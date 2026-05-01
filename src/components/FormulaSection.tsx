import bottle from "@/assets/bottle.png";
import earth from "@/assets/earth.png";
import cross from "@/assets/cross.png";
import check from "@/assets/check.png";
import bgFormula from "@/assets/bg-formula-section.png";

type ClaimItem = {
    text: string;
    status: "positive" | "negative";
};

type ClaimPosition = {
    topClass: string;
    sideOffsetClass: string;
};

const itemsLeft: ClaimItem[] = [
    { text: "Kids & Pets Safe", status: "positive" },
    { text: "Chlorine", status: "negative" },
    { text: "Synthetic Dyes", status: "negative" },
    { text: "Bleach", status: "negative" },
    { text: "Triclosan", status: "negative" },
];

const itemsRight: ClaimItem[] = [
    { text: "Hypoallergenic (no allergens)", status: "positive" },
    { text: "Phosphates", status: "negative" },
    { text: "Parabens", status: "negative" },
    { text: "Phthalates", status: "negative" },
    { text: "SLS/SLES (Harsh Sulfates)", status: "negative" },
];

const leftClaimPositions: ClaimPosition[] = [
    { topClass: "top-[92px] xl:top-[84px]", sideOffsetClass: "left-[4px] xl:left-[92px]" },
    { topClass: "top-[172px] xl:top-[154px]", sideOffsetClass: "left-[-10px] xl:left-[28px]" },
    { topClass: "top-[254px] xl:top-[234px]", sideOffsetClass: "left-[-20px] xl:left-[0px]" },
    { topClass: "top-[338px] xl:top-[316px]", sideOffsetClass: "left-[-4px] xl:left-[22px]" },
    { topClass: "top-[422px] xl:top-[396px]", sideOffsetClass: "left-[18px] xl:left-[88px]" },
];

const rightClaimPositions: ClaimPosition[] = [
    { topClass: "top-[92px] xl:top-[84px]", sideOffsetClass: "right-[4px] xl:right-[92px]" },
    { topClass: "top-[172px] xl:top-[154px]", sideOffsetClass: "right-[-10px] xl:right-[28px]" },
    { topClass: "top-[254px] xl:top-[234px]", sideOffsetClass: "right-[-20px] xl:right-[0px]" },
    { topClass: "top-[338px] xl:top-[316px]", sideOffsetClass: "right-[-4px] xl:right-[22px]" },
    { topClass: "top-[422px] xl:top-[396px]", sideOffsetClass: "right-[18px] xl:right-[88px]" },
];

const iconByStatus = {
    positive: check,
    negative: cross,
};

const iconBgByStatus = {
    positive: "bg-[#DFF6D8]",
    negative: "bg-red-500/10",
};

const ClaimBadge = ({
    item,
    reverse = false,
    mobile = false,
}: {
    item: ClaimItem;
    reverse?: boolean;
    mobile?: boolean;
}) => {
    const icon = (
        <div className={`relative shrink-0 rounded-full ${mobile ? "h-[28px] w-[28px]" : "h-[35px] w-[35px]"}`}>
            <div className={`absolute inset-0 rounded-full ${iconBgByStatus[item.status]}`} />
            <img
                src={iconByStatus[item.status]}
                alt={item.status === "positive" ? "Included benefit" : "Excluded ingredient"}
                className={`absolute ${mobile ? "left-[7px] top-[7px] h-[14px] w-[14px]" : "left-[7px] top-[7px] h-[20px] w-[20px]"}`}
            />
        </div>
    );

    const label = (
        <span
            style={{
                fontFamily: "Poppins",
                fontWeight: 500,
                fontSize: mobile ? "12px" : "18px",
                color: "#064734",
                textAlign: reverse && !mobile ? "right" : "left",
            }}
        >
            {item.text}
        </span>
    );

    return (
        <div
            className={`flex items-center gap-[8px] ${reverse && !mobile ? "justify-end" : "justify-start"} ${mobile ? "min-h-[44px] rounded-[18px] bg-white/40 px-3 py-2" : ""}`}
        >
            {reverse && !mobile ? label : icon}
            {reverse && !mobile ? icon : label}
        </div>
    );
};

const FormulaSection = () => {
    return (
        <section
            className="relative w-full flex justify-center overflow-hidden min-h-[800px] md:min-h-[940px] xl:min-h-[890px]"
        >
            <img
                src={bgFormula}
                alt=""
                aria-hidden="true"
                className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: 0 }}
            />

            {/* MOBILE LAYOUT */}
            <div className="relative z-10 w-full px-4 pt-8 pb-6 md:hidden">
                <div className="flex flex-col items-center text-center gap-2">
                    <h2
                        style={{
                            fontFamily: "Poppins",
                            fontWeight: 600,
                            fontSize: "40px",
                            lineHeight: "48px",
                            color: "#064734",
                        }}
                        className="text-[34px]"
                    >
                        Formulas Free From Harsh Chemicals
                    </h2>

                    <p
                        style={{
                            fontFamily: "Poppins",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "20px",
                            color: "#064734",
                        }}
                    >
                        Curated Combinations for Effortless Cleaning
                    </p>
                </div>

                <div className="relative mt-7 h-[320px] w-full max-w-[320px] mx-auto">
                    <img
                        src={earth}
                        alt=""
                        className="absolute left-1/2 bottom-[-10px] h-auto w-[236px] -translate-x-1/2"
                    />
                    <img
                        src={bottle}
                        alt=""
                        className="absolute left-1/2 bottom-[140px] h-auto w-[86px] -translate-x-1/2"
                    />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-3 max-w-[380px] mx-auto">
                    {itemsLeft.map((item, i) => (
                        <ClaimBadge key={`left-${i}`} item={item} mobile />
                    ))}

                    {itemsRight.map((item, i) => (
                        <ClaimBadge key={`right-${i}`} item={item} mobile />
                    ))}
                </div>
            </div>

            {/* DESKTOP LAYOUT */}
            <div
                className="relative hidden md:flex w-full max-w-[1180px] xl:max-w-[1280px] flex-col items-center px-6 xl:px-8 pb-16"
                style={{
                    marginTop: "83px",
                    gap: "20px",
                    zIndex: 1,
                }}
            >
                {/* HEADING */}
                <div className="flex flex-col items-center gap-[10px]">
                    <h2
                        style={{
                            fontFamily: "Poppins",
                            fontWeight: 600,
                            fontSize: "40px",
                            lineHeight: "60px",
                            color: "#064734",
                            textAlign: "center",
                        }}
                    >
                        Formulas Free From Harsh Chemicals
                    </h2>

                    <p
                        style={{
                            fontFamily: "Poppins",
                            fontWeight: 400,
                            fontSize: "20px",
                            lineHeight: "28px",
                            color: "#064734",
                            textAlign: "center",
                        }}
                    >
                        Curated Combinations for Effortless Cleaning
                    </p>
                </div>

                {/* CENTER VISUAL */}
                <div className="relative mt-6 h-[620px] xl:h-[520px] w-full">
                    {itemsLeft.map((item, i) => (
                        <div
                            key={item.text}
                            className={`absolute w-[240px] lg:w-[260px] xl:w-[320px] ${leftClaimPositions[i]?.topClass} ${leftClaimPositions[i]?.sideOffsetClass}`}
                        >
                            <ClaimBadge item={item} reverse />
                        </div>
                    ))}

                    {itemsRight.map((item, i) => (
                        <div
                            key={item.text}
                            className={`absolute w-[240px] lg:w-[260px] xl:w-[320px] ${rightClaimPositions[i]?.topClass} ${rightClaimPositions[i]?.sideOffsetClass}`}
                        >
                            <ClaimBadge item={item} />
                        </div>
                    ))}

                    <div className="absolute left-1/2 top-[110px] lg:top-[120px] xl:top-[54px] flex h-[430px] w-[320px] lg:w-[340px] xl:w-[360px] -translate-x-1/2 items-end justify-center">
                        <img
                            src={earth}
                            alt=""
                            aria-hidden="true"
                            className="h-[250px] w-[292px] lg:h-[262px] lg:w-[308px] xl:h-[272px] xl:w-[319px] object-contain"
                        />
                        <img
                            src={bottle}
                            alt=""
                            aria-hidden="true"
                            className="absolute left-1/2 w-[112px] lg:w-[120px] xl:w-[128px] -translate-x-1/2 object-contain bottom-[214px] lg:bottom-[224px] xl:bottom-[238px]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FormulaSection;
