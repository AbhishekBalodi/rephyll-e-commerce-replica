import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhyChooseUs from "@/components/WhyChooseUs";

const OurStory = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            rePhyl
          </h1>
          <p
            className="text-lg md:text-xl font-semibold italic"
            style={{ fontFamily: "'Poppins', sans-serif", color: "#CEF17B" }}
          >
            Reset your space. Feel the relief. Trust what's left behind.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full" style={{ backgroundColor: "#F1FBD8" }}>
        <div className="max-w-[1318px] mx-auto px-4 md:px-[68px] py-12 md:py-16">
          <div
            className="space-y-5 md:space-y-6 text-[16px] md:text-[20px] leading-[160%] md:leading-[160%]"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: "#064734" }}
          >
            <p className="text-[18px] md:text-[24px] font-semibold italic">
              All it took was one breath to set us off on the pursuit for the holy trinity: clean, safe and fresh
            </p>

            <p>
              During a stay at a boutique hotel, our founders noticed something unusual. It wasn't just about the spotlessness, it was about how the room felt. The moment they walked in, everything slowed down. The air felt lighter. The space felt calmer. Breathing felt like a treat to the senses. A reset.
            </p>

            <p>And then they got back home.</p>

            <p className="font-semibold">That feeling? Gone.</p>

            <p>
              They realised that 'clean' at home came with a trade-off. Surfaces looked clean—but the experience felt clinical, chemical, and sometimes… uncomfortable. That didn't really sit right with them. And so came the questions: Why does "effective cleaning" have to smell so harsh? Why should feeling safe in our own home be a question mark? And most importantly, why can't clean feel this good every day?
            </p>

            <p>
              rePhyl came out of that search. The world didn't need more cleaning products. It needed a new definition of clean. One that doesn't just remove dirt, but removes doubt.
            </p>

            <p>
              We set out to recreate that sense of lightness using plant-powered ingredients and thoughtful formulations that work in harmony with your home, not against it. rePhyl gives you:
            </p>

            <ul className="list-none space-y-2 pl-4">
              <li className="font-semibold">• The ease of a quick reset</li>
              <li className="font-semibold">• The emotional relief of a calm space</li>
              <li className="font-semibold">• The confidence of complete safety</li>
            </ul>

            <p>No harsh chemicals.<br />No overwhelming fumes.<br />No second guessing.</p>

            <p>
              Just simple, effective cleaning that helps you reset— quickly, safely, and without stress.
            </p>

            <p className="font-semibold">
              Because in the end, clean isn't just about what you see.<br />
              It's about how your space makes you feel.
            </p>

            {/* <div className="text-center pt-4"> */}
              {/* <p className="text-[24px] md:text-[32px] font-bold" style={{ color: "#064734" }}>
                rePhyl
              </p> */}
              {/* <p className="italic font-semibold" style={{ color: "#064734" }}>
                Reset your space. Feel the relief. Trust what's left behind.
              </p> */}
            {/* </div> */}
          </div>
        </div>
      </section>

      {/* What Makes rePhyl Different */}
      <WhyChooseUs
        heading="The world doesn't need another cleaner. It needs a clean without doubt."
        subtext="Safe, effective cleaning that resets your space—without the stress or second thoughts."
      />

      <Footer />
    </div>
  );
};

export default OurStory;
