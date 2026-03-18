import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import QuantityCapsule from "./QuantityCapsule";

const KITS = [
  {
    id: 1001,
    name: "Home Essentials Kit",
    items: ["All Surface Cleaner", "Toilet Cleaner", "Floor Cleaner"],
    price: 799,
    originalPrice: 1047,
    image: "",
  },
  {
    id: 1002,
    name: "Kitchen Rescue Kit",
    items: ["Dishwash Liquid", "Kitchen Degreaser", "All Surface Cleaner"],
    price: 749,
    originalPrice: 947,
    image: "",
  },
  {
    id: 1003,
    name: "Whole Home Kit",
    badge: "Best Value",
    items: ["All 5 Products", "Complete Home Solution", "Maximum Savings"],
    price: 1299,
    originalPrice: 1795,
    discount: 28,
    image: "",
  },
];

const HomecareKitsSection = () => {
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();

  const handleAddKit = (kit: typeof KITS[0]) => {
    addToCart({
      productId: kit.id,
      name: kit.name,
      price: kit.price,
      originalPrice: kit.originalPrice,
      image: kit.image || "/placeholder.svg",
    });
  };

  return (
    <div id="homecare-kits-section">
      {/* CTA Banner */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
            Everything Your Home Needs. In One Kit.
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            Curated combinations for effortless cleaning.
          </p>
          <button
            onClick={() => document.getElementById("kits-section")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-foreground text-background font-bold px-8 py-3 rounded-full hover:opacity-90 transition-colors text-sm"
          >
            Explore Kits
          </button>
        </div>
      </section>

      {/* Kits Grid */}
      <section id="kits-section" className="bg-background py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {KITS.map((kit) => {
              const cartItem = items.find((i) => i.productId === kit.id);
              const cartQty = cartItem?.quantity ?? 0;

              return (
                <div
                  key={kit.id}
                  className={`relative rounded-xl border p-6 flex flex-col ${
                    kit.badge ? "border-primary bg-primary/5" : "border-border bg-card"
                  }`}
                >
                  {kit.badge && (
                    <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                      {kit.badge}
                    </span>
                  )}

                  <h3 className="text-xl font-bold text-foreground mb-4">{kit.name}</h3>

                  <div className="flex flex-col gap-2 mb-6 flex-1">
                    {kit.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check size={16} className="text-primary flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-foreground">₹{kit.price}</span>
                    <span className="text-sm text-muted-foreground line-through">₹{kit.originalPrice}</span>
                    {kit.discount && (
                      <span className="text-xs font-bold text-accent-foreground bg-accent px-2 py-0.5 rounded">
                        Save {kit.discount}%
                      </span>
                    )}
                  </div>

                  <div className="mt-auto">
                    {cartQty > 0 ? (
                      <QuantityCapsule
                        quantity={cartQty}
                        onIncrement={(e) => { e.stopPropagation(); updateQuantity(kit.id, cartQty + 1); }}
                        onDecrement={(e) => { e.stopPropagation(); cartQty <= 1 ? removeFromCart(kit.id) : updateQuantity(kit.id, cartQty - 1); }}
                        size="sm"
                        fullWidth
                      />
                    ) : (
                      <button
                        onClick={() => handleAddKit(kit)}
                        className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-colors"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomecareKitsSection;
