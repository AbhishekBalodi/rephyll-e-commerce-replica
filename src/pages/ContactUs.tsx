import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-2">Contact Us</h1>
        <p className="text-center text-muted-foreground mb-12">
          We'd love to hear from you! Reach out to us through any of the channels below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="flex flex-col items-center text-center p-6 bg-accent/10 rounded-2xl">
            <Mail className="text-primary mb-3" size={32} />
            <h3 className="font-bold mb-1">Email</h3>
            <a href="mailto:care@rephyl.com" className="text-primary hover:underline">
              care@rephyl.com
            </a>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-accent/10 rounded-2xl">
            <Phone className="text-primary mb-3" size={32} />
            <h3 className="font-bold mb-1">Phone</h3>
            <a href="tel:9313984685" className="text-primary hover:underline">
              +91 9313984685
            </a>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-accent/10 rounded-2xl">
            <MapPin className="text-primary mb-3" size={32} />
            <h3 className="font-bold mb-1">Address</h3>
            <p className="text-sm text-muted-foreground">Mumbai, Maharashtra, India</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Send us a message</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;
