import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-16 pt-[104px]">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
          rePhyl Privacy Policy
        </h1>

        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Introduction</h2>
            <p>
              At rePhyl, we respect your privacy and are committed to protecting your personal information.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you
              visit our website www.rephyl.com, purchase products, or interact with our services.
            </p>
            <p className="mt-2">By using our website, you consent to the practices described in this policy.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Information We Collect</h2>
            <p className="mb-2">We may collect personal information that you voluntarily provide when you:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Create an account</li>
              <li>Place an order</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact customer support</li>
              <li>Participate in promotions or surveys</li>
            </ul>
            <p className="mt-3 mb-2">Information collected may include:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Shipping & billing address</li>
              <li>Payment information</li>
              <li>Order history</li>
            </ul>
            <p className="mt-3 mb-2">We may also automatically collect certain information such as:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>IP address</li>
              <li>Device information</li>
              <li>Browser type</li>
              <li>Website usage data</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Process and fulfill orders</li>
              <li>Deliver products and services</li>
              <li>Improve website performance</li>
              <li>Communicate order updates</li>
              <li>Provide customer support</li>
              <li>Send promotional emails or offers</li>
              <li>Detect fraud and ensure security</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Sharing Your Information</h2>
            <p>We do not sell your personal information.</p>
            <p className="mt-2 mb-2">However, we may share your information with trusted third parties such as:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Payment processors</li>
              <li>Shipping and logistics partners</li>
              <li>Marketing platforms</li>
              <li>Website analytics providers</li>
            </ul>
            <p className="mt-2">These partners only receive the information necessary to perform their services.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Data Security</h2>
            <p className="mb-2">We implement appropriate security measures to protect your personal data. These include:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Secure payment gateways</li>
              <li>Data encryption</li>
              <li>Restricted access to sensitive data</li>
            </ul>
            <p className="mt-2">However, no method of online transmission is completely secure.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Cookies</h2>
            <p className="mb-2">Our website may use cookies and tracking technologies to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Improve website functionality</li>
              <li>Analyze website traffic</li>
              <li>Personalize user experience</li>
            </ul>
            <p className="mt-2">You may disable cookies through your browser settings if preferred.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Third Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy
              practices of those websites and encourage you to review their policies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Your Rights</h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your information</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <p className="mt-2">You can contact us to exercise these rights.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Children's Privacy</h2>
            <p>
              Our website is not intended for individuals under the age of 18 years.
              We do not knowingly collect personal data from minors.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Policy Updates</h2>
            <p>
              We may update this Privacy Policy periodically. Any changes will be posted on this page
              with an updated effective date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Contact Information</h2>
            <p>If you have any questions regarding this Privacy Policy, please contact us.</p>
            <p className="mt-2 font-semibold text-foreground">rePhyl Support</p>
            <p>Email: <a href="mailto:care@rephyl.com" className="text-primary hover:underline">care@rephyl.com</a></p>
            <p>Website: <a href="https://www.rephyl.com" className="text-primary hover:underline">www.rephyl.com</a></p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
