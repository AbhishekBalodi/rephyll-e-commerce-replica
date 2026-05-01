import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, ShoppingBag } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-16 pt-[104px]">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">Your Cart</h1>
        <p className="text-muted-foreground mb-10">
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
          <>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variantId || "default"}`} className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="flex items-center gap-4 p-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-foreground truncate">{item.name}</h3>
                      <p className="text-sm text-foreground font-bold mt-1">
                        ₹{item.price}
                        {item.originalPrice > item.price && (
                          <span className="text-xs line-through text-muted-foreground ml-2">₹{item.originalPrice}</span>
                        )}
                      </p>
                      <div className="text-xs text-muted-foreground mt-1">
                        {item.stockLabel ? <span>{item.stockLabel}</span> : null}
                        {item.maxQuantity ? <span className="ml-2">• Max {item.maxQuantity}</span> : null}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                        className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                        className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <p className="text-sm font-bold text-foreground w-20 text-right">₹{item.price * item.quantity}</p>
                  </div>

                  <div className="border-t border-border px-4 py-3 flex items-center gap-5 text-sm font-semibold">
                    <button
                      onClick={() => removeFromCart(item.productId, item.variantId)}
                      className="text-foreground hover:text-destructive transition-colors"
                    >
                      Remove
                    </button>
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
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              {syncing && (
                <p className="text-sm text-muted-foreground mb-4">Syncing cart with server...</p>
              )}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Subtotal ({totalItems} items)</span>
                <span className="text-lg font-bold text-foreground">₹{totalPrice}</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={clearCart}
                  className="px-6 py-3 border border-border rounded-lg text-sm font-semibold hover:bg-accent transition-colors"
                >
                  Clear Cart
                </button>
                <button onClick={handleCheckout} className="flex-1 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm">
                  {token ? "Proceed to Checkout" : "Login to Checkout"}
                </button>
              </div>
            </div>
          </>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default CartPage;
