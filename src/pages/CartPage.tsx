import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, ShoppingBag, Trash2, Heart, ShieldCheck, Truck, BadgePercent, Tag, Building2, HandCoins } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useEffect, useMemo, useState } from "react";
import { useProductList } from "@/hooks/useProducts";
import { buildProductPath } from "@/lib/routeHelpers";
import { getProductImage, getVariantDiscountPercent, getVariantMrp } from "@/lib/productHelpers";
import { getProductById } from "@/services/productApi";
import type { ApiProduct } from "@/types/api";
import { useToast } from "@/hooks/use-toast";

type SuggestedDisplayMeta = {
  price: number;
  mrp: number;
  discount: number;
  rating: number;
  reviewCount: number;
};

const CartPage = () => {
  const { items, totalItems, totalPrice, addToCart, updateQuantity, removeFromCart, clearCart, refreshCart, syncing } = useCart();
  const { token } = useAuth();
  const { addToWishlist } = useWishlist();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [addingSuggestedId, setAddingSuggestedId] = useState<number | null>(null);
  const [suggestedMeta, setSuggestedMeta] = useState<Record<number, SuggestedDisplayMeta>>({});
  const { data: suggestedData, isLoading: suggestedLoading } = useProductList({ page: 0, size: 24 });

  useEffect(() => {
    if (!token) return;

    void refreshCart();

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void refreshCart();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [token, refreshCart]);

  const handleCheckout = () => {
    if (!token) {
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }
    navigate("/checkout");
  };

  const MAX_QTY = 10;

  const suggestedProducts = useMemo(() => {
    const all = suggestedData?.content ?? [];
    if (!all.length) return [];

    const inCart = new Set(items.map((item) => item.productId));
    return all.filter((product) => !inCart.has(product.id)).slice(0, 8);
  }, [suggestedData?.content, items]);

  const centeredSuggestedProducts = useMemo(() => {
    if (suggestedProducts.length <= 1) return suggestedProducts;

    const arranged = new Array<ApiProduct>(suggestedProducts.length);
    const centerIndex = Math.floor((suggestedProducts.length - 1) / 2);
    let leftIndex = centerIndex - 1;
    let rightIndex = centerIndex + 1;

    suggestedProducts.forEach((product, index) => {
      if (index === 0) {
        arranged[centerIndex] = product;
        return;
      }

      if (index % 2 === 1) {
        arranged[leftIndex] = product;
        leftIndex -= 1;
        return;
      }

      arranged[rightIndex] = product;
      rightIndex += 1;
    });

    return arranged.filter(Boolean) as ApiProduct[];
  }, [suggestedProducts]);

  useEffect(() => {
    if (!centeredSuggestedProducts.length) return;

    let alive = true;

    const loadSuggestedMeta = async () => {
      const entries = await Promise.all(
        centeredSuggestedProducts.map(async (product) => {
          try {
            const detail = await getProductById(product.id);
            const variant = detail.variants?.[0];
            if (!variant) return [product.id, null] as const;

            const price = variant.price;
            const mrp = getVariantMrp(detail, variant);
            const discount = getVariantDiscountPercent(detail, variant);
            const rating = (product as ApiProduct & { rating?: number }).rating ?? 4.6;
            const reviewCount = (product as ApiProduct & { reviewCount?: number }).reviewCount ?? 42;

            return [
              product.id,
              {
                price,
                mrp,
                discount,
                rating,
                reviewCount,
              } satisfies SuggestedDisplayMeta,
            ] as const;
          } catch {
            return [product.id, null] as const;
          }
        })
      );

      if (!alive) return;

      setSuggestedMeta((prev) => {
        const next = { ...prev };
        for (const [id, meta] of entries) {
          if (meta) next[id] = meta;
        }
        return next;
      });
    };

    void loadSuggestedMeta();

    return () => {
      alive = false;
    };
  }, [centeredSuggestedProducts]);

  const paymentOptions: Array<
    | { key: string; label: string; type: "logo"; logo: string }
    | { key: string; label: string; type: "icon"; icon: "bank" | "cod" }
    | { key: string; label: string; type: "paytm" }
  > = [
    { key: "upi", label: "UPI", type: "logo", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" },
    { key: "visa", label: "Visa", type: "logo", logo: "https://cdn.simpleicons.org/visa/1A1F71" },
    { key: "mastercard", label: "Mastercard", type: "logo", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" },
    { key: "rupay", label: "RuPay", type: "logo", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d1/RuPay.svg" },
    { key: "amex", label: "Amex", type: "logo", logo: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" },
    { key: "paytm", label: "Paytm", type: "paytm" },
    { key: "gpay", label: "Google Pay", type: "logo", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" },
    { key: "phonepe", label: "PhonePe", type: "logo", logo: "https://cdn.simpleicons.org/phonepe" },
    { key: "netbanking", label: "Net Banking", type: "icon", icon: "bank" },
    { key: "cod", label: "COD", type: "icon", icon: "cod" },
  ];

  const totalMrp = items.reduce((s, i) => s + (i.originalPrice || i.price) * i.quantity, 0);
  const discount = Math.max(0, totalMrp - totalPrice);
  const finalAmount = totalPrice;

  const handleAddSuggestedProduct = async (product: ApiProduct) => {
    try {
      setAddingSuggestedId(product.id);
      const detail = await getProductById(product.id);
      const variant = detail.variants?.[0];

      if (!variant?.id) {
        toast({ title: "Unable to add", description: "No sellable variant found for this product.", variant: "destructive" });
        return;
      }

      addToCart({
        productId: product.id,
        name: product.name,
        price: variant.price,
        originalPrice: getVariantMrp(detail, variant),
        image: getProductImage(product),
        variantId: variant.id,
        maxQuantity:
          Math.min(
            10,
            variant.inventory?.maxCartQuantity ??
              variant.inventory?.totalStock ??
              Number.POSITIVE_INFINITY
          ),
      });

      toast({ title: "Added to Cart", description: `${product.name} added to your cart.` });
    } catch (error: any) {
      toast({ title: "Could not load product", description: error?.message || "Please try again.", variant: "destructive" });
    } finally {
      setAddingSuggestedId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-14 pt-[150px] md:pt-[170px] min-h-[calc(100vh-200px)]">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-3">Your Cart</h1>
        <p className="text-muted-foreground mb-10 text-base md:text-lg">
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
                    className="bg-background border-2 border-[#2f7a63] rounded-2xl overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row gap-5 p-5 md:p-6">
                      {/* Image */}
                      <Link
                        to="/shop"
                        className="w-full md:w-40 aspect-square rounded-xl overflow-hidden bg-muted flex-shrink-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
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

                        <div className="text-sm md:text-base text-muted-foreground mb-4 flex items-center gap-3 flex-wrap">
                          {item.stockLabel ? <span className="text-[#388e3c] font-semibold">{item.stockLabel}</span> : <span className="text-[#388e3c] font-semibold">In Stock</span>}
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
                    <div className="grid grid-cols-2 border-t border-[#2f7a63]">
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
                        className="flex items-center justify-center gap-2 border-r border-[#2f7a63] py-4 text-sm font-semibold text-foreground transition-colors hover:bg-accent md:text-base"
                      >
                        <Heart size={18} />
                        Add to Wishlist
                      </button>
                      <button
                        onClick={() => removeFromCart(item.productId, item.variantId)}
                        className="flex items-center justify-center gap-2 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-destructive/10 hover:text-destructive md:text-base"
                      >
                        <Trash2 size={18} />
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Trust info row */}
              <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
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

              <div className="py-4">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">You May Also Like</h3>

                {suggestedLoading ? (
                  <p className="text-sm text-muted-foreground">Loading suggested products...</p>
                ) : suggestedProducts.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No related suggestions available right now.</p>
                ) : (
                  <div className="flex flex-wrap justify-start gap-3 md:gap-4">
                    {centeredSuggestedProducts.map((product) => (
                      <div key={product.id} className="w-[160px] md:w-[190px] border border-border rounded-xl overflow-hidden bg-white">
                        <Link to={buildProductPath(product)} className="block aspect-square bg-muted">
                          <img
                            src={getProductImage(product)}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/placeholder.svg";
                            }}
                          />
                        </Link>

                        <div className="p-2.5">
                          {(() => {
                            const meta = suggestedMeta[product.id];
                            const price = meta?.price ?? product.basePrice;
                            const mrp = meta?.mrp ?? product.basePrice;
                            const showOriginalPrice = mrp > price;
                            const discountPct = showOriginalPrice
                              ? (meta?.discount ?? Math.round(((mrp - price) / mrp) * 100))
                              : 0;
                            const rating = meta?.rating ?? 4.6;
                            const reviewCount = meta?.reviewCount ?? 42;

                            return (
                              <>
                          <p className="text-xs md:text-sm font-semibold text-foreground line-clamp-2 min-h-[34px]">
                            {product.name}
                          </p>
                          <div className="flex items-end gap-1 mt-1">
                            <span className="text-base md:text-lg font-bold text-[#064734] leading-none">₹{price.toFixed(0)}</span>
                            {showOriginalPrice && (
                              <span className="text-[11px] text-[#8E939C] line-through">₹{mrp.toFixed(0)}</span>
                            )}
                            {discountPct > 0 && (
                              <span className="rounded-full bg-[#E2F3AF] px-1.5 py-0.5 text-[9px] font-semibold text-[#064734]">
                                Save {discountPct}%
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1 mt-1.5 min-h-[16px]">
                            <div className="flex items-center gap-[1px]">
                              {Array.from({ length: 5 }).map((_, i) => {
                                const filled = i < Math.floor(rating);
                                return (
                                  <svg
                                    key={i}
                                    width="10"
                                    height="9.5"
                                    viewBox="0 0 14 13"
                                    fill="#FBC700"
                                    opacity={filled ? 1 : 0.35}
                                    stroke="#FBC700"
                                    strokeWidth="1.33"
                                  >
                                    <path d="M7 1l1.76 3.57 3.94.57-2.85 2.78.67 3.93L7 10.27l-3.52 1.58.67-3.93L1.3 5.14l3.94-.57z" />
                                  </svg>
                                );
                              })}
                            </div>
                            <span className="text-[10px] font-semibold text-[#464646]">{rating.toFixed(1)}</span>
                            <span className="text-[10px] text-[#8E939C]">({reviewCount})</span>
                          </div>

                          <button
                            onClick={() => handleAddSuggestedProduct(product)}
                            disabled={addingSuggestedId === product.id}
                            className="mt-2 w-full py-2 rounded-lg bg-[#064734] text-white text-xs md:text-sm font-semibold disabled:opacity-60"
                          >
                            {addingSuggestedId === product.id ? "Loading..." : "Add to Cart"}
                          </button>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Price Details */}
            <aside className="lg:sticky lg:top-[120px]">
              <div className="bg-background border-2 border-[#2f7a63] rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="text-base font-bold text-[#064734] uppercase tracking-wide">Price Details</h2>
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
                  <p className="text-xs text-muted-foreground">
                    Shipping will be calculated on the order review page.
                  </p>
                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors text-base shadow-sm"
                  >
                    {token ? "Proceed to Checkout" : "Login to Checkout"}
                  </button>
                  <div className="flex gap-3">
                    <Link
                      to="/shop"
                      className="flex-1 rounded-xl border border-[#2f7a63] py-3 text-center text-sm font-semibold transition-colors hover:bg-accent"
                    >
                      Continue Shopping
                    </Link>
                    <button
                      onClick={clearCart}
                      className="flex-1 rounded-xl border border-[#2f7a63] py-3 text-sm font-semibold transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4 px-4">
                Safe and secure payments. Easy returns. 100% authentic products.
              </p>

              {/*
              <div className="mt-4 bg-card border border-border rounded-2xl p-4">
              </div>
              */}
              <div className="mt-4 p-4">
                <h3 className="text-sm md:text-base font-bold text-foreground mb-3">We Accept</h3>
                <div className="grid grid-cols-5 gap-4">
                  {paymentOptions.map((mode) => (
                    <div
                      key={mode.key}
                      className="flex items-center justify-center"
                      title={mode.label}
                    >
                      {mode.type === "logo" ? (
                        <img
                          src={mode.logo}
                          alt={mode.label}
                          className="h-8 md:h-10 w-auto max-w-[72px] object-contain"
                          loading="lazy"
                        />
                      ) : mode.type === "paytm" ? (
                        <div className="flex items-center leading-none select-none">
                          <span className="text-xl md:text-2xl font-black tracking-tight" style={{ color: "#002970" }}>pay</span>
                          <span className="text-xl md:text-2xl font-black tracking-tight" style={{ color: "#00BAF2" }}>tm</span>
                        </div>
                      ) : mode.icon === "bank" ? (
                        <div className="flex flex-col items-center gap-1">
                          <Building2 size={24} className="text-[#064734]" />
                          <span className="text-[11px] font-semibold text-[#064734] leading-none text-center">Net Banking</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <HandCoins size={24} className="text-[#064734]" />
                          <span className="text-sm font-bold text-[#064734] leading-none">COD</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        )}
      </section>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
