import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Heart,
  Bookmark,
  Share2,
  Star
} from "lucide-react";

import type { ApiProduct, ApiVariant } from "@/types/api";

import {
  getProductImages,
  getSellingPrice,
  getMrp,
} from "@/lib/productHelpers";

import { useCart } from "@/contexts/CartContext";
import PackSelector, { generatePacks } from "./PackSelector";
import QuantityCapsule from "./QuantityCapsule";
import ProductDetailAccordion from "./ProductDetailAccordion";

interface ProductDetailProps {
  product: ApiProduct;
  onBack: () => void;
}

const FEATURES = [
  "Premium formula",
  "Eco-friendly packaging",
  "No Chemicals",
  "Child & Pet Safe",
];

const ProductDetail = ({ product }: ProductDetailProps) => {

  const navigate = useNavigate();

  const [activeImg, setActiveImg] = useState(0);
  const [selectedVariant] = useState<ApiVariant | undefined>(
    product.variants[0]
  );
  const [selectedPackId, setSelectedPackId] = useState<number>(1);

  const { items, addToCart, updateQuantity, removeFromCart } = useCart();

  const images = getProductImages(product);
  const price = getSellingPrice(product, selectedVariant);
  const mrp = getMrp(product, selectedVariant);

  const packs = generatePacks(price, mrp);
  const activePack = packs.find(p => p.id === selectedPackId) ?? packs[0];

  const cartKey = product.id * 100 + selectedPackId;
  const cartItem = items.find(i => i.productId === cartKey);
  const cartQty = cartItem?.quantity ?? 0;

  const prevImg = () => setActiveImg(p => (p > 0 ? p - 1 : images.length - 1));
  const nextImg = () => setActiveImg(p => (p < images.length - 1 ? p + 1 : 0));

  const handleAddToCart = () => {
    addToCart({
      productId: cartKey,
      name: product.name,
      price: activePack.totalPrice,
      originalPrice: activePack.originalPrice,
      image: images[0],
    }, 1);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10">

      <div className="grid md:grid-cols-2 gap-12 items-stretch">

        {/* LEFT */}
        <div className="flex flex-col h-full">

          <div className="relative flex-1 min-h-[500px] rounded-2xl bg-[#F6F6F6] flex items-center justify-center">
            <img src={images[activeImg]} className="h-[90%] object-contain" />

            <button onClick={prevImg} className="absolute left-3 top-1/2 -translate-y-1/2">
              <ChevronLeft />
            </button>

            <button onClick={nextImg} className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronRight />
            </button>
          </div>

          <div className="flex gap-3 mt-4">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImg(i)}
                className={`w-16 h-16 rounded-lg border cursor-pointer ${
                  activeImg === i ? "border-[#064734]" : "border-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-between">

          <div>

            {/* TITLE + ACTIONS */}
            <div className="flex justify-between items-start mb-2">

              <h1 className="text-[28px] font-semibold text-black font-[Poppins]">
                {product.name}
              </h1>

              <div className="flex items-center gap-2">

                <div className="flex items-center gap-1 px-3 py-1 bg-[#E2F3AF] rounded-full text-sm">
                  <Heart size={14} className="text-[#064734]" />
                  109
                </div>

                <div className="w-[34px] h-[34px] rounded-full bg-[#0647341A] flex items-center justify-center">
                  <Bookmark size={16} className="text-[#064734]" />
                </div>

                <div className="w-[34px] h-[34px] rounded-full bg-[#0647341A] flex items-center justify-center">
                  <Share2 size={16} className="text-[#064734]" />
                </div>

              </div>
            </div>

            {/* TEXT */}
            <p className="text-[16px] text-[#464646] font-medium font-[Poppins]">
              What if clean surface meant safer homes?
            </p>

            <p className="text-[16px] text-[#999999] font-[Poppins] mt-1 mb-4">
              {product.metaDescription}
            </p>

            {/* ✅ FEATURES (FIXED HERE ONLY) */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {FEATURES.map((item) => (
                <div key={item} className="flex items-center gap-2">

                  {/* CIRCLE BACKGROUND */}
                  <div className="w-5 h-5 rounded-full bg-[#CEF17B] flex items-center justify-center">
                    <Check size={12} className="text-[#064734]" />
                  </div>

                  <span className="text-sm text-[#064734]">{item}</span>
                </div>
              ))}
            </div>

            {/* PRICE */}
            <div className="mb-4">

              <div className="flex items-center gap-3">

                <span className="text-[34px] font-bold text-[#064734] font-[Inter]">
                  ₹{activePack.totalPrice}
                </span>

                <div className="flex items-center gap-1 px-2 py-1 bg-[#E2F3AF] rounded-full text-sm">
                  <Star size={14} fill="#064734" className="text-[#064734]" />
                  4.8
                </div>

                <div className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                  67 Reviews
                </div>

              </div>

              <div className="text-sm text-gray-500 mt-1">
                <span className="line-through mr-2">₹399</span>
                93% of buyers have recommended this.
              </div>
            </div>

            <PackSelector
              basePrice={price}
              baseMrp={mrp}
              selectedPack={selectedPackId}
              onSelectPack={setSelectedPackId}
            />

            <div className="flex gap-4 mt-4 mb-6">

              <QuantityCapsule
                quantity={cartQty}
                onIncrement={() => updateQuantity(cartKey, cartQty + 1)}
                onDecrement={() => updateQuantity(cartKey, cartQty - 1)}
              />

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#064734] text-white py-3 rounded-xl"
              >
                Add To Cart
              </button>

            </div>

          </div>

          <div className="text-[17px] font-semibold text-[#064734] font-[Poppins]">
            <ProductDetailAccordion product={product} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;