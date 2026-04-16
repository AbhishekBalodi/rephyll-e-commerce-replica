import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-16 pt-[104px]">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
          Terms of Service
        </h1>

        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Introduction</h2>
            <p>
              Welcome to rephyl.com. These Terms of Service ("Terms") govern your use of our website and the
              products, services, and content offered by rePhyl (hereinafter referred to as "rePhyl", "Company",
              "we", "our", or "us").
            </p>
            <p className="mt-2">
              By accessing or using this website, purchasing products, or interacting with our services, you agree
              to comply with and be bound by these Terms. Please read them carefully before using the website.
            </p>
            <p className="mt-2">If you do not agree with any part of these Terms, please refrain from using our website.</p>
            <p className="mt-2">These Terms apply to all visitors, users, customers, and others who access the website.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Website Use</h2>
            <p className="mb-2">
              Our website provides information, educational content, and access to purchase plant-based home care
              products and related solutions. By using this website, you agree that you will:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use the website only for lawful purposes</li>
              <li>Not misuse the website or attempt to disrupt its functionality</li>
              <li>Not attempt to access restricted areas without authorization</li>
              <li>Not copy, reproduce, or distribute website content without permission</li>
            </ul>
            <p className="mt-2">Any misuse of the website may result in termination of access.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Product Information</h2>
            <p className="mb-2">
              We make every effort to ensure that product descriptions, images, pricing, and availability are
              accurate and up to date. However, we do not guarantee that:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>All product descriptions are completely error-free</li>
              <li>Colors shown on screens perfectly match the actual product</li>
              <li>Product availability will always remain unchanged</li>
            </ul>
            <p className="mt-2">
              rePhyl reserves the right to modify product details, pricing, or discontinue products without prior notice.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Pricing & Payments</h2>
            <p>All prices listed on the website are in Indian Rupees (INR) unless stated otherwise.</p>
            <p className="mt-2">Prices are inclusive of applicable taxes unless specified.</p>
            <p className="mt-2">We reserve the right to change pricing at any time without prior notice.</p>
            <p className="mt-2">Payments made on our website are processed through secure third-party payment gateways.</p>
            <p className="mt-2">We do not store sensitive payment details such as card numbers or banking credentials.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Orders & Acceptance</h2>
            <p className="mb-2">Once you place an order on our website:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>You will receive an order confirmation email</li>
              <li>Orders are subject to acceptance and availability</li>
              <li>We reserve the right to cancel or refuse any order</li>
            </ul>
            <p className="mt-3 mb-2">Orders may be cancelled in cases including but not limited to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Payment issues</li>
              <li>Product stock unavailability</li>
              <li>Suspected fraudulent transactions</li>
            </ul>
            <p className="mt-2">
              If an order is cancelled after payment, the amount will be refunded as per our Refund & Return Policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Shipping & Delivery</h2>
            <p className="mb-2">We aim to deliver orders within the estimated timelines mentioned on the website. Delivery timelines may vary depending on:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Location</li>
              <li>Logistics availability</li>
              <li>Public holidays</li>
              <li>Unexpected disruptions</li>
            </ul>
            <p className="mt-2">rePhyl shall not be liable for delays caused by courier partners or circumstances beyond our control.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Intellectual Property</h2>
            <p>All content available on this website including logos, product designs, text, images, graphics, and branding elements are the intellectual property of rePhyl and are protected under applicable intellectual property laws.</p>
            <p className="mt-2">Unauthorized use, reproduction, or distribution of this content is strictly prohibited.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites or services. These links are provided for
              convenience only. rePhyl does not control or endorse the content, policies, or practices of any
              third-party websites and is not responsible for any damages or issues arising from their use.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Limitation of Liability</h2>
            <p className="mb-2">rePhyl shall not be liable for any indirect, incidental, or consequential damages resulting from:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use or inability to use the website</li>
              <li>Purchase or use of products</li>
              <li>Website interruptions or errors</li>
              <li>Third-party service failures</li>
            </ul>
            <p className="mt-2">Our liability shall not exceed the value of the product purchased.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Product Usage Disclaimer</h2>
            <p className="mb-2">rePhyl products are designed for home cleaning and hygiene purposes. Customers should always follow:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Instructions on the product label</li>
              <li>Recommended dilution guidelines</li>
              <li>Safety precautions mentioned on packaging</li>
            </ul>
            <p className="mt-2">Improper usage of products is the responsibility of the user.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Privacy</h2>
            <p>
              Your use of this website is also governed by our Privacy Policy, which explains how we collect,
              use, and protect your personal information. By using our website, you consent to our data practices
              as outlined in the Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Changes to Terms</h2>
            <p>
              We reserve the right to update or modify these Terms at any time. Any changes will be posted on
              this page. Your continued use of the website after updates means you accept the revised Terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Governing Law</h2>
            <p>
              These Terms shall be governed by and interpreted in accordance with the laws of India.
              Any disputes arising from the use of this website shall fall under the jurisdiction of the
              courts located in New Delhi, India.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Contact Us</h2>
            <p>If you have any questions regarding these Terms of Service, please contact us.</p>
            <p className="mt-2 font-semibold text-foreground">rePhyl Customer Support</p>
            <p>Email: <a href="mailto:care@rephyl.com" className="text-primary hover:underline">care@rephyl.com</a></p>
            <p>Website: <a href="https://www.rephyl.com" className="text-primary hover:underline">www.rephyl.com</a></p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TermsOfService;
