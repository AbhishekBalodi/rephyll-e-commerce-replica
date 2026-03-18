import { Minus, Plus } from "lucide-react";

interface QuantityCapsuleProps {
  quantity: number;
  onIncrement: (e: React.MouseEvent) => void;
  onDecrement: (e: React.MouseEvent) => void;
  size?: "sm" | "md";
}

const QuantityCapsule = ({ quantity, onIncrement, onDecrement, size = "md" }: QuantityCapsuleProps) => {
  const isSmall = size === "sm";
  return (
    <div className={`inline-flex items-center border-2 border-primary rounded-full overflow-hidden ${isSmall ? "" : ""}`}>
      <button
        onClick={onDecrement}
        className={`hover:bg-muted transition-colors ${isSmall ? "px-3 py-2" : "px-5 py-3"}`}
      >
        <Minus size={isSmall ? 14 : 18} />
      </button>
      <span className={`font-bold text-center ${isSmall ? "px-3 py-2 text-sm min-w-[36px]" : "px-5 py-3 text-base min-w-[48px]"}`}>
        {quantity}
      </span>
      <button
        onClick={onIncrement}
        className={`hover:bg-muted transition-colors ${isSmall ? "px-3 py-2" : "px-5 py-3"}`}
      >
        <Plus size={isSmall ? 14 : 18} />
      </button>
    </div>
  );
};

export default QuantityCapsule;
