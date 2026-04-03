import { useState } from 'react';
import { ShoppingCart, ChevronRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import QuantityCapsule from './QuantityCapsule';
import bottleSurfaceCleaner from '@/assets/bottle-surface-cleaner.png';
import bottleDishwash from '@/assets/bottle-dishwash.png';
import bottleKitchenDegreaser from '@/assets/bottle-kitchen-degreaser.png';
import bottleToiletCleaner from '@/assets/bottle-toilet-cleaner.png';
import bottleFloorCleaner from '@/assets/bottle-big.png';
import bottleWallCleaner from '@/assets/bottle-hero-kd.png';
import bottleLaundryDetergent from '@/assets/bottle-hero-dl.png';
import bottleFabricWhitener from '@/assets/bottle-medium.png';
import bottleStainRemover from '@/assets/bottle-small.png';

const BUNDLES = [
  {
    id: 2001,
    name: 'Kitchen Essential Bundle',
    items: ['All Surface Cleaner', 'Dishwash Liquid', 'Kitchen Degreaser'],
    price: 799,
    originalPrice: 1047,
    discount: 20,
    images: [bottleSurfaceCleaner, bottleDishwash, bottleKitchenDegreaser],
  },
  {
    id: 2002,
    name: 'Washroom Essentials Bundle',
    items: ['Toilet Cleaner', 'Floor Cleaner', 'Glass Cleaner'],
    price: 849,
    originalPrice: 1077,
    discount: 21,
    images: [bottleToiletCleaner, bottleSurfaceCleaner, bottleFloorCleaner],
  },
  {
    id: 2003,
    name: 'Laundry Care Bundle',
    items: ['Laundry Detergent', 'Fabric Whitener', 'Stain Remover'],
    price: 899,
    originalPrice: 1124,
    discount: 20,
    images: [bottleLaundryDetergent, bottleFabricWhitener, bottleStainRemover],
  },
];

const MEGA_KITS = [
  {
    id: 3001,
    name: 'Mega Saver Pack A',
    price: 1299,
    originalPrice: 1647,
    discount: 21,
    images: [bottleSurfaceCleaner, bottleWallCleaner, bottleKitchenDegreaser],
  },
  {
    id: 3002,
    name: 'Mega Saver Pack B',
    price: 1399,
    originalPrice: 1787,
    discount: 22,
    images: [bottleDishwash, bottleLaundryDetergent, bottleToiletCleaner],
  },
  {
    id: 3003,
    name: 'Mega Saver Pack C',
    price: 1499,
    originalPrice: 1924,
    discount: 22,
    images: [bottleKitchenDegreaser, bottleSurfaceCleaner, bottleFabricWhitener],
  },
];

interface CardProps {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  cartQty: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
  currentImage: number;
  onRotate: () => void;
}

const ProductCard = ({
  name,
  price,
  originalPrice,
  discount,
  images,
  cartQty,
  onAdd,
  onIncrement,
  onDecrement,
  currentImage,
  onRotate,
}: CardProps) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden w-full max-w-[270px]">
      <div className="relative h-[220px] bg-[#EEF9EC]">
        <img
          src={images[currentImage]}
          alt={name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={onRotate}
          className="absolute right-3 top-3 z-20 bg-white rounded-full p-2 shadow"
        >
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-base font-semibold text-[#064734] line-clamp-2">{name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-[24px] font-bold text-[#064734]">₹{price}</span>
          <span className="text-sm text-[#8E939C] line-through">₹{originalPrice}</span>
        </div>
        <p className="text-sm text-[#739C78]">{discount}% off</p>
        {cartQty > 0 ? (
          <QuantityCapsule
            quantity={cartQty}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            size="sm"
            fullWidth
          />
        ) : (
          <button
            onClick={onAdd}
            className="w-full text-white bg-[#064734] py-2 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <ShoppingCart size={16} /> Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

interface HomecareKitsSectionProps {
  mode?: 'homecare' | 'mega';
  cardsOnly?: boolean;
}

const HomecareKitsSection = ({ mode = 'homecare', cardsOnly = false }: HomecareKitsSectionProps) => {
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();
  const [bundleImageIdx, setBundleImageIdx] = useState<Record<number, number>>({});
  const [megaImageIdx, setMegaImageIdx] = useState<Record<number, number>>({});
  const [homeTab, setHomeTab] = useState<'bundles' | 'single'>('bundles');

  const renderHomecare = () => {
    const activeItems = cardsOnly || homeTab === 'bundles'
      ? BUNDLES
      : BUNDLES.map((b) => ({ ...b, name: b.name.replace('Bundle', 'Single Product') }));

    return (
      <>
        {!cardsOnly && (
          <div className="flex gap-4 justify-center mb-6">
            <button
              onClick={() => setHomeTab('bundles')}
              className={`px-5 py-2 rounded-full ${homeTab === 'bundles' ? 'bg-[#064734] text-white' : 'bg-[#E6F5E3] text-[#064734]'}`}
            >
              Smart Bundles
            </button>
            <button
              onClick={() => setHomeTab('single')}
              className={`px-5 py-2 rounded-full ${homeTab === 'single' ? 'bg-[#064734] text-white' : 'bg-[#E6F5E3] text-[#064734]'}`}
            >
              Single Products
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeItems.map((item) => {
            const cartItem = items.find((i) => i.productId === item.id);
            const qty = cartItem?.quantity ?? 0;

            return (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                originalPrice={item.originalPrice}
                discount={item.discount}
                images={item.images}
                cartQty={qty}
                currentImage={bundleImageIdx[item.id] ?? 0}
                onRotate={() =>
                  setBundleImageIdx((prev) => ({
                    ...prev,
                    [item.id]: ((prev[item.id] ?? 0) + 1) % item.images.length,
                  }))
                }
                onAdd={() =>
                  addToCart({
                    productId: item.id,
                    name: item.name,
                    price: item.price,
                    originalPrice: item.originalPrice,
                    image: item.images[0],
                  })
                }
                onIncrement={() => updateQuantity(item.id, qty + 1)}
                onDecrement={() => (qty <= 1 ? removeFromCart(item.id) : updateQuantity(item.id, qty - 1))}
              />
            );
          })}
        </div>
      </>
    );
  };

  const renderMega = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {MEGA_KITS.map((kit) => {
        const cartItem = items.find((i) => i.productId === kit.id);
        const qty = cartItem?.quantity ?? 0;

        return (
          <ProductCard
            key={kit.id}
            id={kit.id}
            name={kit.name}
            price={kit.price}
            originalPrice={kit.originalPrice}
            discount={kit.discount}
            images={kit.images}
            cartQty={qty}
            currentImage={megaImageIdx[kit.id] ?? 0}
            onRotate={() =>
              setMegaImageIdx((prev) => ({
                ...prev,
                [kit.id]: ((prev[kit.id] ?? 0) + 1) % kit.images.length,
              }))
            }
            onAdd={() =>
              addToCart({
                productId: kit.id,
                name: kit.name,
                price: kit.price,
                originalPrice: kit.originalPrice,
                image: kit.images[0],
              })
            }
            onIncrement={() => updateQuantity(kit.id, qty + 1)}
            onDecrement={() => (qty <= 1 ? removeFromCart(kit.id) : updateQuantity(kit.id, qty - 1))}
          />
        );
      })}
    </div>
  );

  return (
    <section className={cardsOnly ? 'bg-transparent' : 'py-16 bg-[#F1F9EE]'}>
      {mode === 'homecare' ? renderHomecare() : renderMega()}
    </section>
  );
};

export default HomecareKitsSection;
