import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-16 pt-[104px]">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
          rePhyl – Return & Refund Policy
        </h1>

        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Overview</h2>
            <p>
              At rePhyl, we strive to ensure that every customer is satisfied with their purchase.
              This Return & Refund Policy outlines the conditions under which returns, replacements,
              or refunds may be processed.
            </p>
            <p className="mt-2">
              By purchasing products from our website www.rephyl.com or any official sales channels,
              you agree to the terms outlined below.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Return Eligibility</h2>
            <p className="mb-2">We accept return or replacement requests under the following conditions:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Product received is damaged or defective</li>
              <li>Product received is incorrect</li>
              <li>Product packaging is tampered with during delivery</li>
            </ul>
            <p className="mt-3 mb-2">To be eligible for a return or replacement:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The request must be raised within 48 hours of delivery</li>
              <li>The product must remain unused</li>
              <li>Original packaging must be intact</li>
              <li>Proof of purchase must be available</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Non-Returnable Items</h2>
            <p className="mb-2">Due to hygiene and safety reasons, the following items are not eligible for return:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Products that have been opened or used</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Return Process</h2>
            <p className="mb-2">To initiate a return or replacement:</p>
            <ol className="list-decimal pl-6 space-y-1">
              <li>Email us at <a href="mailto:care@rephyl.com" className="text-primary hover:underline">care@rephyl.com</a></li>
              <li>Include your order number and reason for return</li>
              <li>Attach images of the product if damaged or incorrect</li>
              <li>Our support team will review the request within 2–3 business days</li>
            </ol>
            <p className="mt-2">
              If approved, our logistics partner will arrange a pickup or guide you through the return process.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Refund Policy</h2>
            <p>
              Once the returned product is received and inspected, we will notify you of the approval
              or rejection of your refund.
            </p>
            <p className="mt-2 mb-2">If approved:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Refunds will be processed within 5–7 business days</li>
              <li>The amount will be credited to the original payment method</li>
            </ul>
            <p className="mt-2">
              Please note that shipping charges (if applicable) are non-refundable unless the return
              is due to our error.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Replacement Policy</h2>
            <p>
              In cases where the product is damaged or incorrect, we may offer a replacement instead of a refund.
              Replacement products will be shipped after verification of the issue and may take 5–7 business days
              depending on location.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Cancellation Policy</h2>
            <p>
              Orders can be cancelled only before they are dispatched from our warehouse.
              Once the order has been shipped, cancellation may not be possible and the standard
              return policy will apply.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Contact Us</h2>
            <p>If you have any questions about our Return & Refund Policy, please contact us:</p>
            <p className="mt-2">Customer Support: <a href="mailto:care@rephyl.com" className="text-primary hover:underline">care@rephyl.com</a></p>
            <p>Website: <a href="https://www.rephyl.com" className="text-primary hover:underline">www.rephyl.com</a></p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default RefundPolicy;
