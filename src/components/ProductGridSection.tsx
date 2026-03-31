import productImg from "@/assets/product.png"; // replace with your actual image

import { Heart, Share2, ChevronRight, Star } from "lucide-react";

const ProductCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-[270px]">
      
      {/* IMAGE SECTION */}
      <div className="relative h-[200px] rounded-t-2xl bg-[linear-gradient(160deg,#CEF17B_0%,#FFFFFF_100%)] flex items-center justify-center">
        
        {/* TOP RIGHT ICONS */}
        <div className="absolute top-3 right-3 flex gap-2">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow">
            <Share2 size={16} />
          </div>
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow">
            <Heart size={16} />
          </div>
        </div>

        {/* PRODUCT IMAGE */}
        <img src={productImg} alt="product" className="h-[120px] object-contain" />

        {/* RIGHT ARROW */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow">
          <ChevronRight size={16} color="#364153" />
        </div>

        {/* DOTS */}
        <div className="absolute bottom-3 flex gap-1">
          <div className="w-6 h-1 bg-[#00301D] rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-4">
        
        {/* TITLE */}
        <h3 className="font-poppins font-semibold text-[16px] leading-[24px] text-[#464646]">
          Kitchen Essential Bundle
        </h3>

        {/* RATING */}
        <div className="flex items-center gap-2 mt-1">
          
          {/* STARS */}
          <div className="flex">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < 4 ? "#FBC700" : "none"}
                stroke="#FBC700"
              />
            ))}
          </div>

          <span className="text-sm text-[#464646]">4.0</span>
          <span className="text-sm text-[#8E939C]">(128 reviews)</span>
        </div>

        {/* PRICE */}
        <div className="flex items-center gap-3 mt-2">
          <span className="font-poppins font-bold text-[30px] text-[#064734] leading-[24px]">
            ₹799
          </span>
          <span className="font-poppins text-[16px] text-[#8E939C] line-through">
            ₹1047
          </span>
        </div>

        {/* BUTTON */}
        <button className="mt-4 w-full bg-[#064734] text-white py-3 rounded-xl flex items-center justify-center gap-2">
          Add to Box
        </button>
      </div>
    </div>
  );
};

const ProductGridSection = () => {
  return (
    <section className="w-full flex justify-center py-16">
      
      <div className="max-w-[1194px] w-full px-4">
        
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] justify-items-center">
          
          {/* 8 CARDS */}
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCard key={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProductGridSection;