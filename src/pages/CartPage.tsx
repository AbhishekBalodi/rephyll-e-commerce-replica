import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, ShoppingBag, Trash2, Heart, ShieldCheck, Truck, BadgePercent, Tag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/contexts/WishlistContext";

const CartPage = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart, syncing } = useCart();
  const { token } = useAuth();
  const { addToWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!token) {
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }
    navigate("/checkout");
  };

  const MAX_QTY = 10;
  const totalMrp = items.reduce((s, i) => s + (i.originalPrice || i.price) * i.quantity, 0);
  const discount = Math.max(0, totalMrp - totalPrice);
  const shipping = totalPrice >= 499 || totalPrice === 0 ? 0 : 49;
  const finalAmount = totalPrice + shipping;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-14 pt-[120px] min-h-[calc(100vh-200px)]">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">Your Cart</h1>
        <p className="text-muted-foreground mb-8 text-base">
          {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? "s" : ""} in your cart`}
        </p>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground mb-6">No items in your cart yet.</p>
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 lg:gap-8 items-start">
            {/* LEFT: Items list */}
            <div className="space-y-5">
              {items.map((item) => {
                const itemMax = Math.min(MAX_QTY, item.maxQuantity ?? MAX_QTY);
                const lineTotal = item.price * item.quantity;
                const lineMrp = (item.originalPrice || item.price) * item.quantity;
                const lineDiscount = Math.max(0, lineMrp - lineTotal);
                const pct = item.originalPrice && item.originalPrice > item.price
                  ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                  : 0;
                return (
                  <div
                    key={`${item.productId}-${item.variantId || "default"}`}
                    className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row gap-5 p-5 md:p-6">
                      {/* Image */}
                      <Link
                        to="/shop"
                        className="w-full md:w-40 h-40 rounded-xl overflow-hidden bg-muted flex-shrink-0"
                      >
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col">
                        <h3 className="text-lg md:text-xl font-display font-bold text-foreground leading-snug mb-2">
                          {item.name}
                        </h3>

                        <div className="flex items-baseline flex-wrap gap-2 mb-2">
                          <span className="text-2xl font-bold text-foreground">₹{item.price}</span>
                          {item.originalPrice > item.price && (
                            <>
                              <span className="text-sm line-through text-muted-foreground">₹{item.originalPrice}</span>
                              <span className="text-sm font-bold text-[#388e3c]">{pct}% off</span>
                            </>
                          )}
                        </div>

                        <div className="text-xs text-muted-foreground mb-4 flex items-center gap-3 flex-wrap">
                          {item.stockLabel ? <span className="text-[#388e3c] font-semibold">{item.stockLabel}</span> : <span className="text-[#388e3c] font-semibold">In Stock</span>}
                          <span>• Max {itemMax}</span>
                          {lineDiscount > 0 && (
                            <span className="text-foreground">• You save ₹{lineDiscount}</span>
                          )}
                        </div>

                        {/* Quantity + line total */}
                        <div className="flex items-center justify-between gap-4 mt-auto">
                          <div className="inline-flex items-center border border-border rounded-full overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                              className="w-10 h-10 flex items-center justify-center hover:bg-accent transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="text-base font-bold w-10 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                              disabled={item.quantity >= itemMax}
                              className="w-10 h-10 flex items-center justify-center hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <p className="text-xl font-bold text-foreground">₹{lineTotal}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action strip */}
                    <div className="border-t border-border grid grid-cols-2 divide-x divide-border">
                      <button
                        onClick={() =>
                          addToWishlist({
                            productId: item.productId,
                            name: item.name,
                            price: item.price,
                            originalPrice: item.originalPrice,
                            image: item.image,
                            variantId: item.variantId,
                          })
                        }
                        className="flex items-center justify-center gap-2 py-4 text-sm md:text-base font-semibold text-foreground hover:bg-accent transition-colors"
                      >
                        <Heart size={18} />
                        Add to Wishlist
                      </button>
                      <button
                        onClick={() => removeFromCart(item.productId, item.variantId)}
                        className="flex items-center justify-center gap-2 py-4 text-sm md:text-base font-semibold text-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                      >
                        <Trash2 size={18} />
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Trust info row */}
              <div className="bg-card border border-border rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={22} className="text-primary flex-shrink-0" />
                  <span className="font-semibold text-foreground">Safe & Secure Payments</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck size={22} className="text-primary flex-shrink-0" />
                  <span className="font-semibold text-foreground">Free Shipping over ₹499</span>
                </div>
                <div className="flex items-center gap-3">
                  <BadgePercent size={22} className="text-primary flex-shrink-0" />
                  <span className="font-semibold text-foreground">Plant-Based, Family Safe</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Price Details */}
            <aside className="lg:sticky lg:top-[120px]">
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="text-base font-bold text-muted-foreground uppercase tracking-wide">Price Details</h2>
                </div>
                <div className="px-6 py-5 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground">Price ({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
                    <span className="text-foreground">₹{totalMrp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Discount</span>
                    <span className="text-[#388e3c] font-semibold">− ₹{discount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Delivery Charges</span>
                    <span className={shipping === 0 ? "text-[#388e3c] font-semibold" : "text-foreground"}>
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="border-t border-dashed border-border pt-3 flex justify-between text-base font-bold text-foreground">
                    <span>Total Amount</span>
                    <span>₹{finalAmount}</span>
                  </div>
                  {discount > 0 && (
                    <div className="bg-[#e8f5e9] text-[#1b5e20] text-sm font-semibold rounded-lg px-3 py-2 flex items-center gap-2">
                      <Tag size={16} />
                      You'll save ₹{discount} on this order!
                    </div>
                  )}
                  {syncing && (
                    <p className="text-xs text-muted-foreground">Syncing cart with server...</p>
                  )}
                </div>
                <div className="px-6 pb-6 space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors text-base shadow-sm"
                  >
                    {token ? "Proceed to Checkout" : "Login to Checkout"}
                  </button>
                  <div className="flex gap-3">
                    <Link
                      to="/shop"
                      className="flex-1 py-3 text-center border border-border rounded-xl text-sm font-semibold hover:bg-accent transition-colors"
                    >
                      Continue Shopping
                    </Link>
                    <button
                      onClick={clearCart}
                      className="flex-1 py-3 border border-border rounded-xl text-sm font-semibold hover:bg-accent transition-colors"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4 px-4">
                Safe and secure payments. Easy returns. 100% authentic products.
              </p>
            </aside>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default CartPage;
