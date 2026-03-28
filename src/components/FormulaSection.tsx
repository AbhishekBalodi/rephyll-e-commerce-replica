import clover from "@/assets/clover-lime.png";
import bottle from "@/assets/bottle.png"; // center product
import earth from "@/assets/earth.png";   // bottom globe
import cross from "@/assets/cross.png";   // red cross icon

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
            style={{
                height: "780px",
                background: "rgba(206, 241, 123, 0.3)",
            }}
        >
            {/* 🌿 CLOVERS BACKGROUND */}
            <img src={clover} className="absolute pointer-events-none" style={{ width: "280px", left: "-70px", top: "-50px", opacity: 0.5 }} />
            <img src={clover} className="absolute pointer-events-none" style={{ width: "260px", right: "-50px", top: "-40px", opacity: 0.5 }} />
            <img src={clover} className="absolute pointer-events-none" style={{ width: "300px", left: "-80px", bottom: "-60px", opacity: 0.5 }} />
            <img src={clover} className="absolute pointer-events-none" style={{ width: "270px", right: "-40px", bottom: "-50px", opacity: 0.5 }} />
            <img src={clover} className="absolute pointer-events-none" style={{ width: "240px", left: "50%", top: "30%", transform: "translateX(-50%)", opacity: 0.5 }} />
            <img src={clover} className="absolute pointer-events-none" style={{ width: "220px", left: "15%", top: "50%", opacity: 0.5 }} />
            <img src={clover} className="absolute pointer-events-none" style={{ width: "250px", right: "10%", bottom: "15%", opacity: 0.5 }} />

            {/* MAIN CONTAINER */}
            <div
                className="relative flex flex-col items-center"
                style={{
                    width: "1194px",
                    height: "631px",
                    marginTop: "83px",
                    gap: "20px",
                }}
            >
                {/* 🔹 HEADING */}
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

                {/* 🔥 CENTER VISUAL */}
                <div className="relative w-full flex justify-center items-center mt-6">

                    <div className="relative flex flex-col items-center justify-center mt-10">

                        {/* 🌍 EARTH (base) */}
                        <img
                            src={earth}
                            
                            style={{
                                width: "319px",
                                height: "272px",
                                marginTop: "150px",
                                marginRight: "10px",
                            }}
                        />

                        {/* 🧴 BOTTLE (overlapping top of earth) */}
                        <img
                            src={bottle}
                            className="absolute"
                            style={{
                                width: "117px",
                                top: "-80px", // key adjustment
                            }}
                        />

                    </div>

                    {/* 🔴 LEFT ITEMS */}
                    {itemsLeft.map((item, i) => (
                        <div
                            key={i}
                            className="absolute flex items-center gap-[5px]"
                            style={{
                                left: "300px",
                                top: item.top,
                            }}
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
                                <img
                                    src={cross}
                                    className="absolute w-[20px] h-[20px] top-[7px] left-[7px]"
                                />
                            </div>
                        </div>
                    ))}

                    {/* 🔴 RIGHT ITEMS */}
                    {itemsRight.map((item, i) => (
                        <div
                            key={i}
                            className="absolute flex items-center gap-[5px]"
                            style={{
                                right: "300px",
                                top: item.top,
                            }}
                        >
                            <div className="relative w-[35px] h-[35px]">
                                <div className="absolute w-full h-full rounded-full bg-red-500/10" />
                                <img
                                    src={cross}
                                    className="absolute w-[20px] h-[20px] top-[7px] left-[7px]"
                                />
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