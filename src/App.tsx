import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import FAQs from "./pages/FAQs.tsx";
import ContactUs from "./pages/ContactUs.tsx";
import TermsOfService from "./pages/TermsOfService.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import RefundPolicy from "./pages/RefundPolicy.tsx";
import NotFound from "./pages/NotFound.tsx";
import WhyChooseUsPage from "./pages/WhyChooseUsPage.tsx";
import TestimonialsPage from "./pages/TestimonialsPage.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import BlogsPage from "./pages/BlogsPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import AdminAddProduct from "./pages/AdminAddProduct.tsx";
import ProductPage from "./pages/ProductPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/admin/add-product" element={<AdminAddProduct />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
