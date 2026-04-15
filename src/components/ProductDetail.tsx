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

import type { ApiProductDetail, ApiVariant } from "@/types/api";

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
  product: ApiProductDetail;
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
  const [selectedVariant, setSelectedVariant] = useState<ApiVariant | undefined>(
    product.variants?.[0]
  );
  const [selectedPackId, setSelectedPackId] = useState<number>(1);

  const { items, addToCart, updateQuantity, removeFromCart } = useCart();

  const images = getProductImages(product);
  const price = selectedVariant?.price ?? getSellingPrice(product);
  const mrp = getMrp(product);

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
      variantId: selectedVariant?.id,
      maxQuantity: selectedVariant?.inventory?.maxCartQuantity ?? selectedVariant?.inventory?.totalStock ?? null,
      stockLabel: selectedVariant?.inventory?.stockLabel ?? null,
    }, 1);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 md:py-10">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-stretch">

        {/* LEFT - Image */}
        <div className="flex flex-col h-full">
          <div className="relative flex-1 min-h-[300px] md:min-h-[500px] rounded-2xl bg-[#F6F6F6] flex items-center justify-center">
            <img src={images[activeImg]} className="h-[80%] md:h-[90%] object-contain" />

            <button onClick={prevImg} className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2">
              <ChevronLeft />
            </button>

            <button onClick={nextImg} className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2">
              <ChevronRight />
            </button>
          </div>

          <div className="flex gap-2 md:gap-3 mt-3 md:mt-4 overflow-x-auto scrollbar-hide">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImg(i)}
                className={`w-12 h-12 md:w-16 md:h-16 rounded-lg border cursor-pointer flex-shrink-0 ${
                  activeImg === i ? "border-[#064734]" : "border-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT - Details */}
        <div className="flex flex-col justify-between">

          <div>
            {/* TITLE + ACTIONS */}
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-[22px] md:text-[28px] font-semibold text-black font-[Poppins]">
                {product.name}
              </h1>

              <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
                <div className="flex items-center gap-1 px-2 md:px-3 py-1 bg-[#E2F3AF] rounded-full text-xs md:text-sm">
                  <Heart size={12} className="text-[#064734] md:w-3.5 md:h-3.5" />
                  109
                </div>
                <div className="w-[30px] h-[30px] md:w-[34px] md:h-[34px] rounded-full bg-[#0647341A] flex items-center justify-center">
                  <Bookmark size={14} className="text-[#064734]" />
                </div>
                <div className="w-[30px] h-[30px] md:w-[34px] md:h-[34px] rounded-full bg-[#0647341A] flex items-center justify-center">
                  <Share2 size={14} className="text-[#064734]" />
                </div>
              </div>
            </div>

            <p className="text-[14px] md:text-[16px] text-[#464646] font-medium font-[Poppins]">
              What if clean surface meant safer homes?
            </p>

            <p className="text-[13px] md:text-[16px] text-[#999999] font-[Poppins] mt-1 mb-3 md:mb-4">
              {product.seoDescription || product.description}
            </p>

            {/* FEATURES */}
            <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6">
              {FEATURES.map((item) => (
                <div key={item} className="flex items-center gap-1.5 md:gap-2">
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#CEF17B] flex items-center justify-center">
                    <Check size={10} className="text-[#064734] md:w-3 md:h-3" />
                  </div>
                  <span className="text-xs md:text-sm text-[#064734]">{item}</span>
                </div>
              ))}
            </div>

            {/* Payment icons row - mobile */}
            <div className="flex items-center gap-3 mb-3 md:hidden">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-5 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="Mastercard" className="h-5 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5 object-contain" />
            </div>

            {/* PRICE */}
            <div className="mb-3 md:mb-4">
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-[28px] md:text-[34px] font-bold text-[#064734] font-[Inter]">
                  ₹{activePack.totalPrice}
                </span>
                <div className="flex items-center gap-1 px-2 py-1 bg-[#E2F3AF] rounded-full text-xs md:text-sm">
                  <Star size={12} fill="#064734" className="text-[#064734] md:w-3.5 md:h-3.5" />
                  4.8
                </div>
                <div className="px-2 py-1 bg-gray-100 rounded-full text-xs md:text-sm text-gray-600">
                  67 Reviews
                </div>
              </div>

              <div className="text-xs md:text-sm text-gray-500 mt-1">
                <span className="line-through mr-2">₹399</span>
                93% of buyers have recommended this.
              </div>
            </div>

            {/* Variant selector */}
            {product.variants && product.variants.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                {product.variants.map((v) => {
                  const label = v.attrsCombo.split(",").map(p => p.split("=")[1]).join(", ");
                  const isSelected = selectedVariant?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium border transition-all ${
                        isSelected
                          ? "bg-[#064734] text-white border-[#064734]"
                          : "bg-white text-[#064734] border-[#064734]/30 hover:border-[#064734]"
                      }`}
                    >
                      {label} — ₹{v.price}
                    </button>
                  );
                })}
              </div>
            )}

            <PackSelector
              basePrice={price}
              baseMrp={mrp}
              selectedPack={selectedPackId}
              onSelectPack={setSelectedPackId}
            />

            <div className="flex gap-3 md:gap-4 mt-3 md:mt-4 mb-4 md:mb-6">
              <QuantityCapsule
                quantity={cartQty}
                onIncrement={(e: any) => {
                  e?.preventDefault?.();
                  const variantMax = selectedVariant?.inventory?.maxCartQuantity ?? null;
                  const localMax = cartItem?.maxQuantity ?? null;
                  const max = variantMax ?? localMax ?? null;
                  const next = max ? Math.min(cartQty + 1, max) : cartQty + 1;
                  updateQuantity(cartKey, next);
                }}
                onDecrement={(e: any) => { e?.preventDefault?.(); updateQuantity(cartKey, cartQty - 1); }}
              />

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#064734] text-white py-2.5 md:py-3 rounded-xl text-[14px] md:text-[16px]"
              >
                Add To Cart
              </button>
            </div>
          </div>

          <div className="text-[15px] md:text-[17px] font-semibold text-[#064734] font-[Poppins]">
            <ProductDetailAccordion product={product} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
