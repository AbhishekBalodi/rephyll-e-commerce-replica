import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import Index from "./pages/Index.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import OurStory from "./pages/OurStory.tsx";
import FAQs from "./pages/FAQs.tsx";
import ContactUs from "./pages/ContactUs.tsx";
import TermsOfService from "./pages/TermsOfService.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import RefundPolicy from "./pages/RefundPolicy.tsx";
import NotFound from "./pages/NotFound.tsx";
import WhyChooseUsPage from "./pages/WhyChooseUsPage.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import BlogsPage from "./pages/BlogsPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import AdminAddProduct from "./pages/AdminAddProduct.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import ShopSection from "./pages/ShopSection.tsx";
import HomecareKitsPage from "./pages/HomecareKits.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import PaymentConfirmationPage from "./pages/PaymentConfirmationPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetail from "./pages/OrderDetail";
import ProfilePage from "./pages/ProfilePage.tsx";
import AddressesPage from "./pages/AddressesPage";
import WishlistPage from "./pages/WishlistPage";
import RequireAuth from "./components/RequireAuth";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<ShopSection/>} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/homecare-kits" element={<HomecareKitsPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/payment/confirmation" element={<RequireAuth><PaymentConfirmationPage /></RequireAuth>} />
              <Route path="/b2b-orders" element={<ContactUs />} />
              <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/orders" element={<RequireAuth><OrdersPage /></RequireAuth>} />
              <Route path="/orders/:id" element={<RequireAuth><OrderDetail /></RequireAuth>} />
              <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
              <Route path="/addresses" element={<RequireAuth><AddressesPage /></RequireAuth>} />
              <Route path="/checkout" element={<RequireAuth><CheckoutPage /></RequireAuth>} />
              <Route path="/:categorySlug/:slug" element={<ProductPage />} />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/admin/add-product" element={<AdminAddProduct />} />
              <Route path="*" element={<NotFound />} />
              </Routes>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
