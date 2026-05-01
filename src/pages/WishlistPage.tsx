import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

const WishlistPage = () => {
  const { items, totalItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-16 pt-[104px]">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">Your Wishlist</h1>
        <p className="text-muted-foreground mb-10">
          {totalItems === 0 ? "No products in wishlist" : `${totalItems} item${totalItems !== 1 ? "s" : ""} saved`}
        </p>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">Products you save will appear here.</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId || "default"}`}
                  className="flex items-center gap-4 bg-card border border-border rounded-xl p-4"
                >
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-foreground truncate">{item.name}</h3>
                    <p className="text-sm text-foreground font-bold mt-1">
                      ₹{item.price}
                      {item.originalPrice > item.price && (
                        <span className="text-xs line-through text-muted-foreground ml-2">₹{item.originalPrice}</span>
                      )}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (!item.variantId) return;
                      addToCart(
                        {
                          productId: item.productId,
                          name: item.name,
                          price: item.price,
                          originalPrice: item.originalPrice,
                          image: item.image,
                          variantId: item.variantId,
                        },
                        1
                      );
                    }}
                    disabled={!item.variantId}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>

                  <button
                    onClick={() => removeFromWishlist(item.productId, item.variantId)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={clearWishlist}
              className="px-6 py-3 border border-border rounded-lg text-sm font-semibold hover:bg-accent transition-colors"
            >
              Clear Wishlist
            </button>
          </>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default WishlistPage;
