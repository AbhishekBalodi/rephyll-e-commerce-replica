interface Pack {
  id: number;
  label: string;
  quantity: number;
  totalPrice: number;
  originalPrice: number;
  pricePerPack: number;
  discount: number;
}

interface PackSelectorProps {
  basePrice: number;
  baseMrp: number;
  selectedPack: number;
  onSelectPack: (packId: number) => void;
}

function generatePacks(basePrice: number, baseMrp: number): Pack[] {
  return [
    {
      id: 1,
      label: "Pack of 1",
      quantity: 1,
      totalPrice: basePrice,
      originalPrice: baseMrp,
      pricePerPack: basePrice,
      discount: 0,
    },
    {
      id: 2,
      label: "Pack of 2",
      quantity: 2,
      totalPrice: +(basePrice * 2 * 0.98).toFixed(2),
      originalPrice: +(baseMrp * 2).toFixed(2),
      pricePerPack: +(basePrice * 0.98).toFixed(2),
      discount: Math.round(((baseMrp * 2 - basePrice * 2 * 0.98) / (baseMrp * 2)) * 100),
    },
    {
      id: 3,
      label: "Pack of 3",
      quantity: 3,
      totalPrice: +(basePrice * 3 * 0.96).toFixed(2),
      originalPrice: +(baseMrp * 3).toFixed(2),
      pricePerPack: +(basePrice * 0.96).toFixed(2),
      discount: Math.round(((baseMrp * 3 - basePrice * 3 * 0.96) / (baseMrp * 3)) * 100),
    },
  ];
}

const PackSelector = ({ basePrice, baseMrp, selectedPack, onSelectPack }: PackSelectorProps) => {
  const packs = generatePacks(basePrice, baseMrp);

  return (
    <div className="grid grid-cols-3 gap-3">
      {packs.map((pack) => {
        const isSelected = selectedPack === pack.id;
        return (
          <button
            key={pack.id}
            onClick={() => onSelectPack(pack.id)}
            className={`rounded-lg border-2 text-left transition-all ${isSelected
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/40"
              }`}
          >
            {/* Header */}
            <div className={`px-3 py-2 text-center font-semibold text-sm border-b ${isSelected ? "border-primary/30" : "border-border"
              }`}>
              {pack.label}
            </div>
            {/* Body */}
            <div className="px-3 py-3 text-center flex flex-col items-center justify-between h-[90px]">

              {/* PRICE */}
              <div className="flex items-center justify-center gap-1 flex-wrap">
                <span className="font-bold text-foreground text-sm">
                  ₹{pack.totalPrice.toFixed(2)}
                </span>
                {pack.originalPrice > pack.totalPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    ₹{pack.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* SAVE BADGE OR SPACER */}
              {pack.discount > 0 ? (
                <span className="inline-block text-[10px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                  Save {pack.discount}%
                </span>
              ) : (
                <div className="h-[18px]" />  // 👈 THIS FIXES ALIGNMENT
              )}

              {/* PER PACK */}
              <p className="text-xs text-muted-foreground">
                ₹{pack.pricePerPack.toFixed(2)} / Pack
              </p>

            </div>
          </button>
        );
      })}
    </div>
  );
};

export { generatePacks };
export type { Pack };
export default PackSelector;
