import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WebsitePageHero from "@/components/WebsitePageHero";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/services/apiService";
import { useWebsitePageByPath } from "@/hooks/useWebsitePage";

const ContactUs = () => {
  const { data: pageData } = useWebsitePageByPath("/contact");
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", message: "" });
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ALLOWED_ATTACHMENT_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp", "pdf"];
  const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(`[ContactUs] Field changed: ${name}`);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[ContactUs] Form submitted with data:", formData);

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      console.warn("[ContactUs] Validation failed: empty fields");
      toast({
        title: "Validation Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (formData.message.trim().length < 10) {
      console.warn("[ContactUs] Validation failed: message too short");
      toast({
        title: "Validation Error",
        description: "Message must be at least 10 characters.",
        variant: "destructive",
      });
      return;
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
    if (!isEmailValid) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (attachment) {
      if (attachment.size > MAX_ATTACHMENT_BYTES) {
        toast({
          title: "Validation Error",
          description: "Attachment must be less than or equal to 10MB.",
          variant: "destructive",
        });
        return;
      }

      const extension = attachment.name.split(".").pop()?.toLowerCase() || "";
      if (!ALLOWED_ATTACHMENT_EXTENSIONS.includes(extension)) {
        toast({
          title: "Validation Error",
          description: "Allowed file types: jpg, jpeg, png, gif, webp, pdf.",
          variant: "destructive",
        });
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const response = await apiService.submitCustomerContactQuery({
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.trim(),
        message: formData.message.trim(),
        attachment,
      });
      console.log("[ContactUs] Submission successful:", response);

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });

      setFormData({ name: "", email: "", mobile: "", message: "" });
      setAttachment(null);
    } catch (error: any) {
      console.error("[ContactUs] Submission failed:", error.message);
      toast({
        title: "Submission Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
      <WebsitePageHero
        page={pageData}
        fallbackTitle="Contact Us"
        fallbackDescription="Get in touch with our team for support, orders, or product questions."
      />

      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-2">{pageData?.title || "Contact Us"}</h1>
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
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              maxLength={100}
              className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              maxLength={255}
              className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Your Mobile (optional)"
              value={formData.mobile}
              onChange={handleChange}
              maxLength={20}
              className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              maxLength={2000}
              className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <div>
              <input
                type="file"
                name="attachment"
                accept=".jpg,.jpeg,.png,.gif,.webp,.pdf"
                onChange={(e) => {
                  const nextFile = e.target.files?.[0] ?? null;
                  setAttachment(nextFile);
                }}
                className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-primary-foreground"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Optional attachment (max 10MB): jpg, jpeg, png, gif, webp, pdf.
              </p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
