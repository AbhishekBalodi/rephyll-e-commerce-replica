import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import cloverLime from "@/assets/clover-lime.png";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <img src={cloverLime} alt="" className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">our story</h1>
          <p className="text-lg md:text-xl font-semibold">
            Keep your home forever fresh and your planet looking new. All with the power of nature.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16 space-y-6 text-center text-foreground">
        <p>
          Ever wonder why you can't be in the room when using an ordinary floor cleaner? It's because it contains corrosive acids that create pungent vapours that are harmful if inhaled.
        </p>
        <p>
          The ordinary cleaners you've been using all these years, the same ones that are meant to care for your home and clothes do the exact opposite. These cleaners contain toxic ingredients that are harmful for your skin, your clothes and the planet.
        </p>
        <p>
          At Rephyll we are reinventing home care. Our plant-based cleaners contain <strong>zero</strong> toxins and are <strong>safe</strong> for everyone in your family. Your pets included! They are also <strong>great</strong> at cleaning.
        </p>
        <p>
          Every product we create is rooted in bio-based ingredients that are chosen for their plant-based goodness.
        </p>
        <p>
          We have a growing community on Instagram. Follow us on{" "}
          <a
            href="https://www.instagram.com/rephyl.life"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold underline"
          >
            @rephyl.life
          </a>{" "}
          where we promise to be the most positive environment page you'll ever see!
        </p>
      </section>

      {/* Values */}
      <section className="bg-accent/20 py-16">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-2xl font-bold italic mb-4">honest. innovative. responsible.</h3>
            <p className="text-sm text-muted-foreground">
              Each of our products are created keeping total transparency, sustainability at heart, and innovation in formulation. We disclose our complete ingredient list and make conscious choices that minimise our ecological impact.
            </p>
          </div>
          <div className="bg-background rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4">cleaning efficacy</h3>
            <p className="text-sm text-muted-foreground">
              There is a common myth that plant-based and natural products are not effective. This could not be further from the truth. Our products are tested and proven to be as effective — if not better — than traditional cleaners.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">eco responsibility</h3>
            <p className="text-sm text-muted-foreground">
              We are committed to processing and recycling all the plastic we introduce. We use recyclable packaging and biodegradable formulas to minimise our environmental footprint.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
