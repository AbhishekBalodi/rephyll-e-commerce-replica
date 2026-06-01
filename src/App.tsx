import { Suspense, lazy, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import RouteSeoManager from "@/components/RouteSeoManager";
import RequireAuth from "./components/RequireAuth";

const Index = lazy(() => import("./pages/Index.tsx"));
const AboutUs = lazy(() => import("./pages/AboutUs.tsx"));
const OurStory = lazy(() => import("./pages/OurStory.tsx"));
const FAQs = lazy(() => import("./pages/FAQs.tsx"));
const ContactUs = lazy(() => import("./pages/ContactUs.tsx"));
const TermsOfService = lazy(() => import("./pages/TermsOfService.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const WhyChooseUsPage = lazy(() => import("./pages/WhyChooseUsPage.tsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));
const BlogsPage = lazy(() => import("./pages/BlogsPage.tsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.tsx"));
const SignupPage = lazy(() => import("./pages/SignupPage.tsx"));
const CartPage = lazy(() => import("./pages/CartPage.tsx"));
const AdminAddProduct = lazy(() => import("./pages/AdminAddProduct.tsx"));
const ProductPage = lazy(() => import("./pages/ProductPage.tsx"));
const CategoryPage = lazy(() => import("./pages/CategoryPage.tsx"));
const ShopSection = lazy(() => import("./pages/ShopSection.tsx"));
const HomecareKitsPage = lazy(() => import("./pages/HomecareKits.tsx"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage.tsx"));
const OrderReviewPage = lazy(() => import("./pages/OrderReviewPage.tsx"));
const PaymentReturnPage = lazy(() => import("./pages/PaymentReturnPage.tsx"));
const PaymentConfirmationPage = lazy(() => import("./pages/PaymentConfirmationPage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const OrderDetail = lazy(() => import("./pages/OrderDetail"));
const ProfilePage = lazy(() => import("./pages/ProfilePage.tsx"));
const AddressesPage = lazy(() => import("./pages/AddressesPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const GreenRewardsPage = lazy(() => import("./pages/GreenRewardsPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const CouponsPage = lazy(() => import("./pages/CouponsPage"));

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search]);

  return null;
};

const RouteFallback = () => (
  <div className="min-h-screen bg-background pt-[120px] text-foreground flex items-start justify-center">
    <p className="text-sm text-muted-foreground">Loading...</p>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <RouteSeoManager />
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <Suspense fallback={<RouteFallback />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/shop" element={<ShopSection />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/our-story" element={<OurStory />} />
                  <Route path="/homecare-kits" element={<HomecareKitsPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-review" element={<OrderReviewPage />} />
                  <Route path="/payment-return" element={<PaymentReturnPage />} />
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
                  <Route path="/rewards" element={<RequireAuth><GreenRewardsPage /></RequireAuth>} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/coupons" element={<RequireAuth><CouponsPage /></RequireAuth>} />
                  <Route path="/:categorySlug/:slug" element={<ProductPage />} />
                  <Route path="/product/:slug" element={<ProductPage />} />
                  <Route path="/:slug" element={<CategoryPage />} />
                  <Route path="/admin/add-product" element={<AdminAddProduct />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
