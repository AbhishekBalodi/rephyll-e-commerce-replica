import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Leaf, ShieldCheck, Baby, Droplets } from "lucide-react";
import type { ApiProduct, ApiVariant } from "@/types/api";

import {
  getProductImages,
  getSellingPrice,
  getMrp,
  getDiscount,
  parseVariantAttributes,
  isInStock
} from "@/lib/productHelpers";

import { useCart } from "@/contexts/CartContext";
import PackSelector, { generatePacks } from "./PackSelector";
import QuantityCapsule from "./QuantityCapsule";
import ProductDetailAccordion from "./ProductDetailAccordion";

interface ProductDetailProps {
  product: ApiProduct;
  onBack: () => void;
}

const WHATS_IN_ICONS = [
  { label: "Plant-Based", icon: Leaf },
  { label: "Non-Toxic", icon: ShieldCheck },
  { label: "Child & Pet Safe", icon: Baby },
  { label: "Biodegradable", icon: Droplets },
];

const ProductDetail = ({ product, onBack }: ProductDetailProps) => {

  const navigate = useNavigate();

  const [activeImg, setActiveImg] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ApiVariant | undefined>(
    product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [selectedPackId, setSelectedPackId] = useState<number>(1);

  const { items, addToCart, updateQuantity, removeFromCart } = useCart();

  const images = getProductImages(product);
  const price = getSellingPrice(product, selectedVariant);
  const mrp = getMrp(product, selectedVariant);
  const discount = getDiscount(product, selectedVariant);
  const inStock = isInStock(product, selectedVariant);

  const packs = generatePacks(price, mrp);
  const activePack = packs.find((p) => p.id === selectedPackId) ?? packs[0];

  const cartKey = product.id * 100 + selectedPackId;
  const cartItem = items.find((i) => i.productId === cartKey);
  const cartQty = cartItem?.quantity ?? 0;

  const description =
    product.ingredients ||
    product.metaDescription ||
    product.productDetails ||
    "No description available.";

  const prevImg = () => setActiveImg((p) => (p > 0 ? p - 1 : images.length - 1));
  const nextImg = () => setActiveImg((p) => (p < images.length - 1 ? p + 1 : 0));

  const handleAddToCart = () => {
    addToCart({
      productId: cartKey,
      name: selectedVariant
        ? `${product.name} - ${selectedVariant.variantName} (${activePack.label})`
        : `${product.name} (${activePack.label})`,
      price: activePack.totalPrice,
      originalPrice: activePack.originalPrice,
      image: images[0],
    }, 1);
  };

  const handleIncrement = () => updateQuantity(cartKey, cartQty + 1);
  const handleDecrement = () => {
    if (cartQty <= 1) removeFromCart(cartKey);
    else updateQuantity(cartKey, cartQty - 1);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10">

      <button
        onClick={() => { onBack(); navigate("/"); }}
        className="text-sm text-gray-500 mb-6"
      >
        ← Back
      </button>

      {/* ✅ IMPORTANT CHANGE HERE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">

        {/* ✅ LEFT SIDE IMAGE (NOW FULL HEIGHT) */}
        <div className="flex flex-col h-full">

          <div className="relative flex-1 rounded-2xl overflow-hidden bg-[#F6F6F6] flex items-center justify-center">
            <img
              src={images[activeImg]}
              alt={product.name}
              className="w-full h-full object-contain"
            />

            {images.length > 1 && (
              <>
                <button onClick={prevImg} className="absolute left-3 top-1/2 -translate-y-1/2">
                  <ChevronLeft />
                </button>
                <button onClick={nextImg} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <ChevronRight />
                </button>
              </>
            )}
          </div>

          <div className="flex gap-3 mt-4">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImg(i)}
                className={`w-16 h-16 rounded-lg cursor-pointer border ${
                  activeImg === i ? "border-[#064734]" : "border-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ✅ RIGHT SIDE */}
        <div className="flex flex-col h-full">

          <h1 className="text-[28px] font-semibold text-[#064734] mb-2">
            {product.name}
          </h1>

          <p className="text-sm text-gray-600 mb-4">
            {description}
          </p>

          {/* FEATURES */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {WHATS_IN_ICONS.map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#E2F3AF] flex items-center justify-center">
                  <Icon size={16} className="text-[#064734]" />
                </div>
                <span className="text-sm text-[#064734]">{label}</span>
              </div>
            ))}
          </div>

          {/* VARIANTS */}
          {product.variants.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">Select Variant</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => {
                  const attrs = parseVariantAttributes(v.variantAttributes);
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3 py-2 rounded-lg border ${
                        selectedVariant?.id === v.id
                          ? "border-[#064734] bg-[#E2F3AF]"
                          : "border-gray-300"
                      }`}
                    >
                      {v.variantName}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* PACK */}
          <PackSelector
            basePrice={price}
            baseMrp={mrp}
            selectedPack={selectedPackId}
            onSelectPack={setSelectedPackId}
          />

          {/* PRICE */}
          <div className="mt-4 mb-4">
            <span className="text-3xl font-bold text-[#064734]">
              ₹{activePack.totalPrice.toFixed(0)}
            </span>
          </div>

          {/* CART */}
          <div className="mb-6">
            {cartQty > 0 ? (
              <QuantityCapsule
                quantity={cartQty}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#064734] text-white py-3 rounded-xl"
              >
                Add To Cart
              </button>
            )}
          </div>

          {/* ACCORDION */}
          <ProductDetailAccordion product={product} />

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;