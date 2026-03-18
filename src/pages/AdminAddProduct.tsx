import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";

interface QuantityOption {
  qty: number;
  price: number;
  originalPrice: number;
}

const AdminAddProduct = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [howToUse, setHowToUse] = useState("");
  const [keyFeatures, setKeyFeatures] = useState("");
  const [whatsIn, setWhatsIn] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [quantityOptions, setQuantityOptions] = useState<QuantityOption[]>([
    { qty: 1, price: 0, originalPrice: 0 },
  ]);

  const categoryOptions = ["Washroom Care", "Floor & Surface Care", "Kitchen Care", "Laundry Care", "Home Care Kits"];

  const toggleCategory = (cat: string) => {
    setCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  };

  const addQuantityOption = () => {
    setQuantityOptions((prev) => [...prev, { qty: prev.length + 1, price: 0, originalPrice: 0 }]);
  };

  const removeQuantityOption = (index: number) => {
    if (quantityOptions.length <= 1) return;
    setQuantityOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantityOption = (index: number, field: keyof QuantityOption, value: number) => {
    setQuantityOptions((prev) => prev.map((opt, i) => (i === index ? { ...opt, [field]: value } : opt)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      toast({ title: "Error", description: "Name and description are required.", variant: "destructive" });
      return;
    }
    if (categories.length === 0) {
      toast({ title: "Error", description: "Select at least one category.", variant: "destructive" });
      return;
    }

    const productData = {
      name: name.trim(),
      description: description.trim(),
      howToUse: howToUse.trim(),
      keyFeatures: keyFeatures.split("\n").filter(Boolean),
      whatsIn: whatsIn.split("\n").filter(Boolean),
      categories,
      quantityOptions,
    };

    // TODO: Send to backend API when product CRUD endpoint is ready
    console.log("Product data:", productData);
    toast({ title: "Product Saved", description: "Product has been added successfully." });
    navigate("/");
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">Only admin users can add products.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="max-w-3xl mx-auto px-4 md:px-6 py-16">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">Add New Product</h1>
        <p className="text-muted-foreground mb-10">Fill in the product details below</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Product Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Plant-Based Floor Cleaner - Citrus - 500ml"
              className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
              required maxLength={200}
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed product description..."
              rows={4}
              className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              required maxLength={2000}
            />
          </div>

          {/* How to Use */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">How to Use</label>
            <textarea
              value={howToUse}
              onChange={(e) => setHowToUse(e.target.value)}
              placeholder="Step-by-step usage instructions..."
              rows={3}
              className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              maxLength={2000}
            />
          </div>

          {/* Key Features */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Key Features (one per line)</label>
            <textarea
              value={keyFeatures}
              onChange={(e) => setKeyFeatures(e.target.value)}
              placeholder={"Plant-based formula\nSafe for sensitive skin\nBiodegradable"}
              rows={4}
              className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              maxLength={2000}
            />
          </div>

          {/* What's In */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">What's In (one per line)</label>
            <textarea
              value={whatsIn}
              onChange={(e) => setWhatsIn(e.target.value)}
              placeholder={"Coconut-derived surfactants\nOrganic essential oils\nPurified water"}
              rows={3}
              className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              maxLength={2000}
            />
          </div>

          {/* Categories */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Categories *</label>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
                    categories.includes(cat)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:bg-accent"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Pricing */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Quantity & Pricing</label>
            <div className="space-y-3">
              {quantityOptions.map((opt, i) => (
                <div key={i} className="flex items-center gap-3 bg-card border border-border rounded-lg p-3">
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground">Qty</label>
                    <input
                      type="number"
                      min={1}
                      value={opt.qty}
                      onChange={(e) => updateQuantityOption(i, "qty", parseInt(e.target.value) || 1)}
                      className="w-full border border-border rounded px-3 py-1.5 text-sm bg-background text-foreground outline-none focus:ring-1 focus:ring-primary/30 mt-0.5"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground">Selling Price (₹)</label>
                    <input
                      type="number"
                      min={0}
                      value={opt.price}
                      onChange={(e) => updateQuantityOption(i, "price", parseInt(e.target.value) || 0)}
                      className="w-full border border-border rounded px-3 py-1.5 text-sm bg-background text-foreground outline-none focus:ring-1 focus:ring-primary/30 mt-0.5"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground">MRP (₹)</label>
                    <input
                      type="number"
                      min={0}
                      value={opt.originalPrice}
                      onChange={(e) => updateQuantityOption(i, "originalPrice", parseInt(e.target.value) || 0)}
                      className="w-full border border-border rounded px-3 py-1.5 text-sm bg-background text-foreground outline-none focus:ring-1 focus:ring-primary/30 mt-0.5"
                    />
                  </div>
                  <div className="flex-shrink-0 pt-4">
                    {opt.originalPrice > 0 && opt.price > 0 && opt.price < opt.originalPrice && (
                      <span className="text-xs font-bold text-primary">
                        {Math.round(((opt.originalPrice - opt.price) / opt.originalPrice) * 100)}% off
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeQuantityOption(i)}
                    className="pt-4 text-muted-foreground hover:text-destructive transition-colors"
                    disabled={quantityOptions.length <= 1}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addQuantityOption}
              className="mt-3 flex items-center gap-1 text-sm text-primary font-semibold hover:underline"
            >
              <Plus size={16} /> Add quantity option
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm"
          >
            Add Product
          </button>
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default AdminAddProduct;
