import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Heart,
  Bookmark,
  Share2,
  Star,
  AlertCircle
} from "lucide-react";

import type { ApiProductDetail, ApiVariant } from "@/types/api";

import {
  getProductImages,
  getSellingPrice,
  getMrp,
} from "@/lib/productHelpers";

import { useCart } from "@/contexts/CartContext";
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

  const { items, addToCart, updateQuantity } = useCart();

  const variantsByAttribute = useMemo(() => {
    if (!product.attrs || product.attrs.length === 0) return null;

    const organized: Record<
      string,
      Array<{ value: string; variants: ApiVariant[] }>
    > = {};

    product.attrs.forEach((attr) => {
      organized[attr.attributeName] = attr.values!.map((val) => ({
        value: val,
        variants:
          product.variants?.filter((v) =>
            v.attrsCombo.includes(`${attr.attributeName}=${val}`)
          ) || [],
      }));
    });

    return organized;
  }, [product.attrs, product.variants]);

  const images = getProductImages(product);
  const price = selectedVariant?.price ?? getSellingPrice(product);
  const mrp = getMrp(product);

  const cartItem = items.find(
    (i) =>
      i.productId === product.id &&
      i.variantId === selectedVariant?.id
  );

  const cartQty = cartItem?.quantity ?? 0;

  const prevImg = () =>
    setActiveImg((p) => (p > 0 ? p - 1 : images.length - 1));

  const nextImg = () =>
    setActiveImg((p) => (p < images.length - 1 ? p + 1 : 0));

  const handleAddToCart = () => {
    if (!selectedVariant || !selectedVariant.id) {
      alert("Please select a variant");
      return;
    }

    const maxCartQuantity = selectedVariant?.inventory?.available
      ? selectedVariant.inventory.totalStock
      : 0;

    const stockLabel = selectedVariant?.inventory?.available
      ? `${selectedVariant.inventory.totalStock} in stock`
      : "Out of stock";

    addToCart(
      {
        productId: product.id,
        name: product.name,
        price: selectedVariant.price,
        originalPrice: mrp,
        image: images[0],
        variantId: selectedVariant.id,
        maxQuantity: maxCartQuantity || null,
        stockLabel: stockLabel || null,
      },
      1
    );
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-[150px] md:pt-[175px] pb-8 md:pb-12 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start">

        {/* LEFT */}
        <div className="flex flex-col h-full min-h-[400px] md:min-h-[600px]">
          <div className="relative flex-1 rounded-2xl bg-[#F6F6F6] flex items-center justify-center overflow-hidden">
            <img
              src={images[activeImg]}
              className="w-full h-full object-contain"
              alt="Product"
              loading="lazy"
            />

            <button
              onClick={prevImg}
              className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-md"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={nextImg}
              className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-md"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="flex gap-2 md:gap-3 mt-3 md:mt-4 overflow-x-auto scrollbar-hide">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImg(i)}
                className={`w-12 h-12 md:w-16 md:h-16 rounded-lg border cursor-pointer flex-shrink-0 ${
                  activeImg === i
                    ? "border-[#064734]"
                    : "border-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-between">
          <div>

            {/* TITLE */}
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-[22px] md:text-[28px] font-semibold text-black font-[Poppins]">
                {product.name}
              </h1>

              <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
                <div className="flex items-center gap-1 px-2 md:px-3 py-1 bg-[#E2F3AF] rounded-full text-xs md:text-sm">
                  <Heart size={12} className="text-[#064734]" />
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
                    <Check size={10} className="text-[#064734]" />
                  </div>
                  <span className="text-xs md:text-sm text-[#064734]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* PRICE */}
            <div className="mb-3 md:mb-4">
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-[28px] md:text-[34px] font-bold text-[#064734] font-[Inter]">
                  ₹{price}
                </span>

                <div className="flex items-center gap-1 px-2 py-1 bg-[#E2F3AF] rounded-full text-xs md:text-sm">
                  <Star size={12} fill="#064734" className="text-[#064734]" />
                  4.8
                </div>

                <div className="px-2 py-1 bg-gray-100 rounded-full text-xs md:text-sm text-gray-600">
                  67 Reviews
                </div>
              </div>

              <div className="text-xs md:text-sm text-gray-500 mt-1">
                <span className="line-through mr-2">₹{mrp}</span>
                93% of buyers have recommended this.
              </div>
            </div>

            {/* VARIANTS */}
            {product.variants && product.variants.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 mb-5">
                {product.variants.map((variant, index) => {
                  const isSelected =
                    selectedVariant?.id === variant.id;

                  return (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`border rounded-xl p-4 text-center transition-all ${
                        isSelected
                          ? "border-[#064734] bg-[#F3FBF7]"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="text-sm font-semibold text-[#064734] mb-2">
                        Pack of {index + 1}
                      </div>

                      <div className="text-xl font-bold text-black">
                        ₹{variant.price}
                      </div>

                      <div className="text-xs text-gray-400 line-through">
                        ₹{mrp}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* STOCK */}
            {selectedVariant && (
              <div
                className={`mb-3 md:mb-4 p-2 md:p-3 rounded flex items-center gap-2 ${
                  selectedVariant.inventory?.available
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                <AlertCircle size={16} />
                <span className="text-xs md:text-sm font-medium">
                  {selectedVariant.inventory?.available
                    ? `${selectedVariant.inventory.totalStock} in stock`
                    : "Out of stock"}
                </span>
              </div>
            )}

            {/* CART */}
            <div className="flex gap-3 md:gap-4 mt-3 md:mt-4 mb-4 md:mb-6">
              <QuantityCapsule
                quantity={cartQty}
                onIncrement={(e: any) => {
                  e?.preventDefault?.();

                  if (!selectedVariant?.id) return;

                  const max =
                    selectedVariant?.inventory?.totalStock ?? null;

                  const next = max
                    ? Math.min(cartQty + 1, max)
                    : cartQty + 1;

                  updateQuantity(
                    product.id,
                    next,
                    selectedVariant.id
                  );
                }}
                onDecrement={(e: any) => {
                  e?.preventDefault?.();

                  if (!selectedVariant?.id) return;

                  updateQuantity(
                    product.id,
                    cartQty - 1,
                    selectedVariant.id
                  );
                }}
              />

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#064734] text-white py-2.5 md:py-3 rounded-xl text-[14px] md:text-[16px]"
              >
                Add To Cart
              </button>
            </div>
          </div>

          {/* ACCORDION */}
          <div className="text-[15px] md:text-[17px] font-semibold text-[#064734] font-[Poppins]">
            <ProductDetailAccordion product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;