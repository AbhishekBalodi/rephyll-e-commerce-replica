import { useState } from "react";
import { X, Info, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

const REEL_VIDEOS = [
  { src: "/videos/cleaning-1.mp4", title: "Natural Dishwashing Liquid", productId: 2 },
  { src: "/videos/cleaning-2.mp4", title: "Eco-Friendly Floor Cleaner", productId: 5 },
  { src: "/videos/cleaning-3.mp4", title: "Toilet Bowl Cleaner", productId: 4 },
];

const VideoReelsSection = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [showProductInfo, setShowProductInfo] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const activeReel = activeVideo !== null ? REEL_VIDEOS[activeVideo] : null;
  const activeProduct = activeReel ? PRODUCTS.find((p) => p.id === activeReel.productId) : null;

  const handleVideoClick = (index: number) => {
    setActiveVideo(index);
    setShowProductInfo(false);
  };

  const handleClose = () => {
    setActiveVideo(null);
    setShowProductInfo(false);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeProduct) return;
    addToCart({
      productId: activeProduct.id,
      name: activeProduct.name,
      price: activeProduct.price,
      originalPrice: activeProduct.originalPrice,
      image: activeProduct.images[0],
    });
  };

  const handleGoToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleClose();
    navigate("/cart");
  };

  return (
    <>
      <section className="bg-background py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-10">
            Our Happy Families
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {REEL_VIDEOS.map((reel, i) => {
              const product = PRODUCTS.find((p) => p.id === reel.productId);
              return (
                <div
                  key={i}
                  className="relative rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => handleVideoClick(i)}
                >
                  <div className="aspect-[9/16] bg-muted">
                    <video
                      src={reel.src}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload="metadata"
                    />
                  </div>
                  {product && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
                      <div className="flex items-center gap-2">
                        <img src={product.images[0]} alt={product.name} className="w-8 h-8 rounded object-cover flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-white text-xs font-semibold truncate">{product.name}</p>
                          <p className="text-white/80 text-xs">
                            ₹{product.price} <span className="line-through text-white/50">₹{product.originalPrice}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fullscreen Video Popup */}
      {activeVideo !== null && activeReel && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
          >
            <X size={24} className="text-white" />
          </button>

          <video
            src={activeReel.src}
            className="w-full h-full object-contain"
            autoPlay
            loop
            playsInline
            controls
          />

          {/* Product bar at bottom */}
          {activeProduct && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-4">
              <div className="max-w-lg mx-auto flex items-center gap-3">
                <img src={activeProduct.images[0]} alt={activeProduct.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-white text-sm font-semibold truncate">{activeProduct.name}</p>
                  <p className="text-white/80 text-sm">
                    ₹{activeProduct.price} <span className="line-through text-white/50">₹{activeProduct.originalPrice}</span>
                  </p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setShowProductInfo(!showProductInfo); }}
                  className="bg-white text-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-white/90 transition-colors flex items-center gap-1"
                >
                  <Info size={14} /> MORE INFO
                </button>
                <button
                  onClick={handleAddToCart}
                  className="bg-primary text-primary-foreground text-xs font-bold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1"
                >
                  <ShoppingCart size={14} /> ADD TO CART
                </button>
                <button
                  onClick={handleGoToCart}
                  className="bg-accent text-accent-foreground text-xs font-bold p-2 rounded-lg hover:opacity-90 transition-colors"
                  title="Go to Cart"
                >
                  <ShoppingCart size={16} />
                </button>
              </div>

              {showProductInfo && (
                <div className="max-w-lg mx-auto mt-4 bg-card rounded-xl p-4 border border-border">
                  <div className="flex gap-3 mb-3">
                    <img src={activeProduct.images[0]} alt={activeProduct.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-foreground mb-1">{activeProduct.name}</h4>
                      <p className="text-lg font-bold text-foreground">
                        ₹{activeProduct.price} <span className="text-sm line-through text-muted-foreground">₹{activeProduct.originalPrice}</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    {activeProduct.description.substring(0, 150)}...
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default VideoReelsSection;
