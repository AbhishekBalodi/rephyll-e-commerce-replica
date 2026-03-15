import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10">Terms of Service</h1>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">1. Introduction</h2>
            <p>
              Welcome to Rephyll. These Terms of Service govern your use of our website and purchase of our products. By accessing or using our services, you agree to be bound by these terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">2. Products & Pricing</h2>
            <p>
              All product descriptions, images, and prices are provided for informational purposes and are subject to change without notice. We make every effort to ensure accuracy but do not warrant that descriptions or pricing are error-free.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">3. Orders & Payment</h2>
            <p>
              By placing an order, you agree to provide accurate and complete information. We reserve the right to refuse or cancel any order for any reason, including product availability, pricing errors, or suspected fraud.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">4. Shipping & Delivery</h2>
            <p>
              We ship pan-India. Delivery timelines are estimates and may vary based on your location. Rephyll is not liable for delays caused by courier services or force majeure events.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">5. Returns & Refunds</h2>
            <p>
              If you receive a damaged or defective product, please contact us within 7 days of delivery at care@rephyl.com. We will arrange a replacement or refund at our discretion.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">6. Intellectual Property</h2>
            <p>
              All content on this website, including text, images, logos, and trademarks, is the property of Rephyll Personal Care Private Limited and is protected by applicable intellectual property laws.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">7. Limitation of Liability</h2>
            <p>
              Rephyll shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our total liability shall not exceed the amount paid by you for the specific product in question.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">8. Contact</h2>
            <p>
              For any questions regarding these Terms of Service, please contact us at{" "}
              <a href="mailto:care@rephyl.com" className="text-primary underline">care@rephyl.com</a> or call{" "}
              <a href="tel:9313984685" className="text-primary underline">+91 9313984685</a>.
            </p>
          </div>

          <p className="text-sm text-center pt-4">
            Last updated: March 2026 | Rephyll Personal Care Private Limited
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfService;
