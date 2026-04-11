import bottle from "@/assets/bottle.png";
import earth from "@/assets/earth.png";
import cross from "@/assets/cross.png";
import bgFormula from "@/assets/bg-formula-section.png";

const itemsLeft = [
    { text: "Artificial Colours", top: "151px" },
    { text: "Chlorine", top: "225px" },
    { text: "Dyes", top: "300px" },
];

const itemsRight = [
    { text: "Artificial Fragrance", top: "151px" },
    { text: "Phosphates", top: "225px" },
    { text: "Parabens", top: "300px" },
];

const FormulaSection = () => {
    return (
        <section
            className="relative w-full flex justify-center overflow-hidden"
            style={{ height: "780px" }}
        >
            <img
                src={bgFormula}
                alt=""
                aria-hidden="true"
                className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: 0 }}
            />

            {/* MAIN CONTAINER */}
            <div
                className="relative flex flex-col items-center"
                style={{
                    width: "1194px",
                    height: "631px",
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
                <div className="relative w-full flex justify-center items-center mt-6">
                    <div className="relative flex flex-col items-center justify-center mt-10">
                        <img
                            src={earth}
                            style={{
                                width: "319px",
                                height: "272px",
                                marginTop: "150px",
                                marginRight: "10px",
                            }}
                        />
                        <img
                            src={bottle}
                            className="absolute"
                            style={{
                                width: "117px",
                                top: "-80px",
                            }}
                        />
                    </div>

                    {/* LEFT ITEMS */}
                    {itemsLeft.map((item, i) => (
                        <div
                            key={i}
                            className="absolute flex items-center gap-[5px]"
                            style={{ left: "300px", top: item.top }}
                        >
                            <span
                                style={{
                                    fontFamily: "Poppins",
                                    fontWeight: 500,
                                    fontSize: "18px",
                                    color: "#064734",
                                    textAlign: "right",
                                }}
                            >
                                {item.text}
                            </span>
                            <div className="relative w-[35px] h-[35px]">
                                <div className="absolute w-full h-full rounded-full bg-red-500/10" />
                                <img src={cross} className="absolute w-[20px] h-[20px] top-[7px] left-[7px]" />
                            </div>
                        </div>
                    ))}

                    {/* RIGHT ITEMS */}
                    {itemsRight.map((item, i) => (
                        <div
                            key={i}
                            className="absolute flex items-center gap-[5px]"
                            style={{ right: "300px", top: item.top }}
                        >
                            <div className="relative w-[35px] h-[35px]">
                                <div className="absolute w-full h-full rounded-full bg-red-500/10" />
                                <img src={cross} className="absolute w-[20px] h-[20px] top-[7px] left-[7px]" />
                            </div>
                            <span
                                style={{
                                    fontFamily: "Poppins",
                                    fontWeight: 500,
                                    fontSize: "18px",
                                    color: "#064734",
                                }}
                            >
                                {item.text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FormulaSection;
