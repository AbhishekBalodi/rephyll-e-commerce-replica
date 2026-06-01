import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import addressesApi from "@/services/addressesApi";
import { previewCheckout } from "@/services/checkoutApi";
import { getStoredCheckoutCoupons } from "@/lib/checkoutCoupon";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import RequireAuth from "@/components/RequireAuth";
import CheckoutProgressBar from "@/components/CheckoutProgressBar";
import { Loader2 } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  CircleCheck,
  Home,
  Leaf,
  Lock,
  ShieldCheck,
  Truck,
} from "lucide-react";

const formatCurrency = (value: number) => `₹${Math.round(value)}`;

const DEFAULT_COUNTRY_ID = 101;

const reassuranceItems = [
  { icon: Leaf, label: "Plant-Based", sublabel: "Ingredients" },
  { icon: ShieldCheck, label: "No Harmful", sublabel: "Chemicals" },
  { icon: Lock, label: "100% Safe", sublabel: "for Pets & Kids" },
  { icon: CircleCheck, label: "Secure Payments", sublabel: "100% Protected" },
  { icon: Truck, label: "Easy Returns", sublabel: "No Questions Asked" },
];

const deliveryAssuranceItems = [
  { icon: Leaf, label: "Pets & Kids", sublabel: "Safe" },
  { icon: Lock, label: "Secure", sublabel: "Payments" },
  { icon: CircleCheck, label: "Easy", sublabel: "Returns" },
];

const getRequestedQtyByVariant = (items: Array<{ variantId?: number | null; quantity: number }>) => {
  const qtyMap = new Map<number, number>();

  items.forEach((item) => {
    if (!item.variantId) return;
    const current = qtyMap.get(item.variantId) || 0;
    qtyMap.set(item.variantId, current + item.quantity);
  });

  return qtyMap;
};

const getAvailabilityErrorMessage = (
  previewItems: any[],
  requestedQtyByVariant: Map<number, number>
) => {
  const unavailableItems = previewItems.filter((item) => {
    if (item?.serviceable === false) return true;
    if (item?.stockAvailable === false) return true;
    if (item?.inStock === false) return true;
    if (item?.available === false) return true;

    const availableQty =
      typeof item?.availableQty === "number"
        ? item.availableQty
        : typeof item?.availableQuantity === "number"
          ? item.availableQuantity
          : null;

    const variantId = item?.variantId || item?.productVariantId;
    const requestedQty = variantId ? requestedQtyByVariant.get(variantId) : undefined;

    return availableQty !== null && typeof requestedQty === "number" && availableQty < requestedQty;
  });

  if (unavailableItems.length === 0) return "";

  const names = unavailableItems
    .slice(0, 3)
    .map((item) => item?.productName || item?.name || "item")
    .join(", ");

  return unavailableItems.length > 3
    ? `Some items are unavailable or out of stock (${names}, and more).`
    : `Some items are unavailable or out of stock (${names}).`;
};

const getPreviewItemBreakdown = (previewData: any | null) => {
  const previewItems = Array.isArray(previewData?.items) ? previewData.items : [];
  if (previewItems.length === 0) return null;

  const subtotalExTax = previewItems.reduce((sum: number, item: any) => {
    const quantity = Number(item?.quantity ?? item?.orderedQty ?? 0) || 0;
    const netUnitPrice = Number(item?.netUnitPrice ?? 0) || 0;
    return sum + (netUnitPrice * quantity);
  }, 0);

  const taxTotal = previewItems.reduce((sum: number, item: any) => {
    const quantity = Number(item?.quantity ?? item?.orderedQty ?? 0) || 0;
    const taxPerUnit = Number(item?.taxAmount ?? 0) || 0;
    return sum + (taxPerUnit * quantity);
  }, 0);

  return {
    subtotalExTax,
    taxTotal,
    subtotalInclTax: subtotalExTax + taxTotal,
  };
};



const CheckoutPageContent = () => {
  const { items, totalItems, totalPrice } = useCart();
  const { user } = useAuth();
  const [addressId, setAddressId] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [continuingToReview, setContinuingToReview] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [newAddress, setNewAddress] = useState<{
    addressType?: string;
    contactName?: string;
    mobile?: string;
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    landmark?: string;
    notes?: string;
    isDefault?: boolean;
    countryId?: number;
  }>({ addressType: "HOME", isDefault: true, countryId: DEFAULT_COUNTRY_ID });
  const [deliveryInstructionsOpen, setDeliveryInstructionsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const storedCoupons = getStoredCheckoutCoupons();

  const checkoutState = (location.state as { prefillAddressId?: number; appliedCoupon?: string | null } | null) ?? null;
  const prefillAddressId = checkoutState?.prefillAddressId;
  const appliedCoupon = checkoutState?.appliedCoupon ?? storedCoupons[0]?.couponCode ?? null;
  const totalMrp = useMemo(
    () => items.reduce((sum, item) => sum + (item.originalPrice || item.price) * item.quantity, 0),
    [items]
  );
  const discount = Math.max(0, totalMrp - totalPrice);
  const couponCodes = storedCoupons.map((coupon) => coupon.couponCode);
  const couponSignature = useMemo(() => couponCodes.slice().sort().join("|"), [couponCodes]);
  const [previewData, setPreviewData] = useState<any | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const selectedAddress = useMemo(
    () => addresses.find((address) => (address.id || address.addressId) === addressId) || null,
    [addresses, addressId]
  );
  const cartSignature = useMemo(
    () =>
      items
        .map((item) => `${item.variantId || "na"}:${item.quantity}`)
        .sort()
        .join("|"),
    [items]
  );

  const previewItemBreakdown = useMemo(() => getPreviewItemBreakdown(previewData), [previewData]);
  const subtotalAmount = previewItemBreakdown?.subtotalInclTax ?? previewData?.subtotal ?? totalPrice;
  const backendSubtotal = subtotalAmount;
  const displaySubtotal = previewData
    ? previewItemBreakdown?.subtotalExTax ?? Math.max(0, backendSubtotal - (previewData?.taxTotal ?? 0))
    : totalPrice;
  const productDiscount = Math.max(0, totalMrp - backendSubtotal);
  const couponDiscount = previewData?.discountAmount ?? 0;
  const taxAmount = previewItemBreakdown?.taxTotal ?? previewData?.taxTotal ?? 0;
  const shippingAmount = previewData?.shippingAmount ?? 0;
  const grandTotal = Math.max(0, backendSubtotal + shippingAmount - couponDiscount);

  useEffect(() => {
    if (!selectedAddress) return;

    // Keep form fields aligned with API response when a saved address is selected.
    setNewAddress((prev) => ({
      ...prev,
      addressType: selectedAddress.addressType || prev.addressType,
      contactName: selectedAddress.contactName || "",
      mobile: selectedAddress.mobile || "",
      line1: selectedAddress.line1 || "",
      line2: selectedAddress.line2 || "",
      city: selectedAddress.city || "",
      state: selectedAddress.state || "",
      postalCode: selectedAddress.postalCode || "",
      landmark: selectedAddress.line2 || "",
      isDefault: Boolean(selectedAddress.isDefault),
      countryId: selectedAddress.countryId || prev.countryId || DEFAULT_COUNTRY_ID,
    }));
  }, [selectedAddress]);

  const handleContinue = async () => {
    if (!addressId) {
      alert("Please select or create a delivery address");
      return;
    }

    const invalidItems = items.filter((item) => !item.variantId);
    if (invalidItems.length > 0) {
      alert("Some cart items are invalid. Please remove and add them again.");
      return;
    }

    setContinuingToReview(true);
    try {
      const requestedQtyByVariant = getRequestedQtyByVariant(items);

      const previewResponse = await previewCheckout({
        deliveryAddressId: Number(addressId),
        paymentMethod: "CASHFREE",
        items: items.map((item) => ({
          variantId: item.variantId,
          quantity: item.quantity,
        })),
        couponCodes: couponCodes.length > 0 ? couponCodes : undefined,
        useGreenPoints: false,
      });

      const previewData =
        previewResponse && typeof previewResponse === "object" && "success" in previewResponse
          ? ((previewResponse as any).data || null)
          : previewResponse;

      if (!previewData?.serviceable) {
        throw new Error(previewData?.message || "Address is not serviceable for one or more items.");
      }

      const previewItems = Array.isArray(previewData?.items) ? previewData.items : [];
      const availabilityError = getAvailabilityErrorMessage(previewItems, requestedQtyByVariant);
      if (availabilityError) {
        throw new Error(availabilityError);
      }

      navigate("/order-review", {
        state: {
          addressId,
          appliedCoupon,
          initialPreview: previewData,
        },
      });
    } catch (err: any) {
      alert(err?.message || "Could not prepare order review.");
    } finally {
      setContinuingToReview(false);
    }
  };

  useEffect(() => {
    if (!addressId || items.length === 0) {
      setPreviewData(null);
      return;
    }

    let mounted = true;
    setLoadingPreview(true);
    void previewCheckout({
      deliveryAddressId: Number(addressId),
      paymentMethod: "CASHFREE",
      items: items.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
      })),
      couponCodes: couponCodes.length > 0 ? couponCodes : undefined,
      useGreenPoints: false,
    })
      .then((res) => {
        const data = res?.success ? res.data : res;
        if (mounted) setPreviewData(data ?? null);
      })
      .catch(() => {
        if (mounted) setPreviewData(null);
      })
      .finally(() => {
        if (mounted) setLoadingPreview(false);
      });

    return () => {
      mounted = false;
    };
  }, [addressId, cartSignature, couponSignature]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await addressesApi.getAddresses();
        const list = (res && typeof res === 'object' && 'success' in res) ? (res.data || []) : res;
        if (mounted && Array.isArray(list)) setAddresses(list);
      } catch (_) {
        // ignore
      }
    })();
    return () => { mounted = false; };
  }, []);

  // auto-select prefilled/default/first address when addresses are loaded
  useEffect(() => {
    if (!addresses || addresses.length === 0) return;
    if (prefillAddressId) {
      const matched = addresses.find((a) => (a.id || a.addressId) === prefillAddressId);
      if (matched) {
        setAddressId(matched.id || matched.addressId || "");
        return;
      }
    }

    const def = addresses.find((a) => a.isDefault === true || a.is_default === true);
    if (def) {
      setAddressId(def.id || def.addressId || "");
      return;
    }

    const firstAddress = addresses[0];
    if (firstAddress) {
      setAddressId(firstAddress.id || firstAddress.addressId || "");
    }
  }, [addresses, prefillAddressId]);

  const handleCreateAddress = async () => {
    if (!newAddress.addressType) { alert('Please select address type'); return; }
    if (!newAddress.contactName || !newAddress.mobile || !newAddress.postalCode || !newAddress.line1 || !newAddress.city) {
      alert('Please fill full name, phone number, pincode, address and city');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        addressType: newAddress.addressType,
        contactName: newAddress.contactName || '',
        mobile: newAddress.mobile || '',
        line1: newAddress.line1,
        line2: newAddress.landmark || newAddress.line2 || '',
        city: newAddress.city,
        state: newAddress.state || '',
        postalCode: newAddress.postalCode || '',
        countryId: newAddress.countryId || DEFAULT_COUNTRY_ID,
        isDefault: newAddress.isDefault || false,
      };
      const res = await addressesApi.createAddress(payload);
      const created = (res && typeof res === 'object' && 'success' in res) ? (res.data || res) : res;
      setAddresses((s) => (Array.isArray(s) ? [...s, created] : [created]));
      setAddressId(created.id || created.addressId || "");
      setNewAddress({ addressType: 'HOME', isDefault: true, countryId: DEFAULT_COUNTRY_ID });
      alert('Address saved');
    } catch (err: any) {
      alert(err.message || 'Address creation failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="mx-auto max-w-[1240px] px-4 pb-16 pt-[128px] md:px-6 lg:px-8 lg:pt-[140px]">
        <CheckoutProgressBar currentStep={1} />

        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Shipping Details</h1>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>Step 1 of 3</span>
            <span className="hidden md:inline">•</span>
            <span>Your data is safe and secure with us.</span>
          </div>
          <p className="text-sm text-muted-foreground">Logged in as: {user?.email}</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_380px]">
          <div className="space-y-6">
            <div className="py-2">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary">
                    <Home size={18} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#064734]">Delivery Address</h2>
                  </div>
                </div>
              </div>

              {addresses.length > 0 ? (
                <div className="mb-5">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <label className="block text-sm font-semibold text-[#064734]">Choose an address</label>
                    <button
                      type="button"
                      className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
                      onClick={() => {
                        const el = document.getElementById("checkout-new-address");
                        el?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                    >
                      Add a new address
                    </button>
                  </div>
                  <select
                    value={addressId as any}
                    onChange={(e) => setAddressId(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full rounded-2xl border-2 border-[#064734] bg-background px-4 py-3 text-sm outline-none transition focus:border-[#064734]"
                  >
                    <option value="">-- Select saved address --</option>
                    {addresses.map((a) => {
                      const optionId = a.id || a.addressId;
                      return (
                      <option key={optionId} value={optionId}>
                        {a.line1}
                        {a.city ? `, ${a.city}` : ""}
                        {a.postalCode ? ` - ${a.postalCode}` : ""}
                      </option>
                    )})}
                  </select>
                  {selectedAddress && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Delivering to {selectedAddress.contactName || "saved address"}
                      {selectedAddress.mobile ? ` • ${selectedAddress.mobile}` : ""}
                    </p>
                  )}
                </div>
              ) : (
                <div className="mb-5 rounded-2xl border border-dashed border-border bg-background px-4 py-4 text-sm text-muted-foreground">
                  No saved addresses found. Add a new delivery address below.
                </div>
              )}

              <div id="checkout-new-address" className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#064734]">Full Name</label>
                  <input
                    placeholder="Enter full name"
                    value={newAddress.contactName || ""}
                    onChange={(e) => setNewAddress({ ...newAddress, contactName: e.target.value })}
                    className="w-full rounded-2xl border-2 border-[#064734] bg-background px-4 py-3 text-sm outline-none transition focus:border-[#064734]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#064734]">Phone Number</label>
                  <input
                    placeholder="Enter phone number"
                    value={newAddress.mobile || ""}
                    onChange={(e) => setNewAddress({ ...newAddress, mobile: e.target.value })}
                    className="w-full rounded-2xl border-2 border-[#064734] bg-background px-4 py-3 text-sm outline-none transition focus:border-[#064734]"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#064734]">Pincode</label>
                <input
                  placeholder="Enter pincode"
                  value={newAddress.postalCode || ""}
                  onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                  className="w-full rounded-2xl border-2 border-[#064734] bg-background px-4 py-3 text-sm outline-none transition focus:border-[#064734]"
                />
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#064734]">City</label>
                  <input
                    placeholder="City"
                    value={newAddress.city || ""}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    className="w-full rounded-2xl border-2 border-[#064734] bg-background px-4 py-3 text-sm outline-none transition focus:border-[#064734]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#064734]">State</label>
                  <input
                    placeholder="State"
                    value={newAddress.state || ""}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    className="w-full rounded-2xl border-2 border-[#064734] bg-background px-4 py-3 text-sm outline-none transition focus:border-[#064734]"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#064734]">Address (House No., Building, Street, Area)</label>
                <input
                  placeholder="Enter complete address"
                  value={newAddress.line1 || ""}
                  onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
                  className="w-full rounded-2xl border-2 border-[#064734] bg-background px-4 py-3 text-sm outline-none transition focus:border-[#064734]"
                />
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#064734]">Landmark (Optional)</label>
                  <input
                    placeholder="E.g. Near Koramangala Park"
                    value={newAddress.landmark || ""}
                    onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })}
                    className="w-full rounded-2xl border-2 border-[#064734] bg-background px-4 py-3 text-sm outline-none transition focus:border-[#064734]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#064734]">Address Type</label>
                  <select
                    value={newAddress.addressType}
                    onChange={(e) => setNewAddress({ ...newAddress, addressType: e.target.value })}
                    className="w-full rounded-2xl border-2 border-[#064734] bg-background px-4 py-3 text-sm outline-none transition focus:border-[#064734]"
                  >
                    <option value="HOME">Home</option>
                    <option value="WORK">Work</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>

              <label className="mt-5 flex items-center gap-3 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={newAddress.isDefault || false}
                  onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <span>Save this address for faster checkout</span>
              </label>

              <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-secondary/20">
                <button
                  type="button"
                  onClick={() => setDeliveryInstructionsOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">Add Delivery Instructions (Optional)</p>
                    <p className="text-xs text-muted-foreground">Add notes for your delivery partner</p>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-muted-foreground transition-transform duration-300 ${deliveryInstructionsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {deliveryInstructionsOpen && (
                  <div className="border-t border-border bg-card px-4 py-4">
                    <textarea
                      rows={3}
                      placeholder="Gate number, floor, nearby landmark, or any special note"
                      value={newAddress.notes || ""}
                      onChange={(e) => setNewAddress({ ...newAddress, notes: e.target.value })}
                      className="w-full resize-none rounded-2xl border-2 border-[#064734] bg-background px-4 py-3 text-sm outline-none transition focus:border-[#064734]"
                    />
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <button
                  onClick={() => navigate("/cart")}
                  className="inline-flex items-center gap-2 rounded-2xl px-1 py-2 text-sm font-semibold text-foreground transition hover:text-primary"
                >
                  <ArrowLeft size={16} />
                  Back to Cart
                </button>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={handleCreateAddress}
                    disabled={loading}
                    className="rounded-2xl border border-primary px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary/5 disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save Address"}
                  </button>
                  <button
                    onClick={handleContinue}
                    disabled={loading || continuingToReview || items.length === 0 || !addressId}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {continuingToReview ? "Preparing Review..." : "Order Review"}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {items.length === 0 && (
                <p className="mt-4 text-sm text-destructive">Your cart is empty. Add items before continuing.</p>
              )}
            </div>

            <div className="grid gap-3 py-4 md:grid-cols-5">
              {reassuranceItems.map(({ icon: Icon, label, sublabel }) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl bg-background/80 px-3 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">{sublabel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-4 xl:sticky xl:top-[148px] xl:self-start">
            <div className="py-2 md:px-0">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-[#064734]">Your Order</h2>
                  <p className="text-sm text-muted-foreground">({totalItems} item{totalItems !== 1 ? "s" : ""})</p>
                </div>
                <button
                  onClick={() => navigate("/cart")}
                  className="text-sm font-semibold text-primary underline-offset-4 transition hover:underline"
                >
                  Edit Cart
                </button>
              </div>

              <div className="space-y-4">
                {items.map((item) => {
                  const itemMrp = item.originalPrice || item.price;
                  const itemDiscountPct = itemMrp > item.price
                    ? Math.round(((itemMrp - item.price) / itemMrp) * 100)
                    : 0;

                  return (
                  <div key={`${item.productId}-${item.variantId || "default"}`} className="flex gap-3">
                    <div className="h-20 w-20 overflow-hidden rounded-2xl border border-border bg-background">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="line-clamp-2 text-sm font-semibold text-foreground">{item.name}</p>
                          <p className="mt-1 text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          <div className="mt-1 flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-[#064734]">{formatCurrency(item.price)}</span>
                            {itemMrp > item.price && (
                              <span className="text-xs text-muted-foreground line-through">{formatCurrency(itemMrp)}</span>
                            )}
                            {itemDiscountPct > 0 && (
                              <span className="rounded-full bg-[#E2F3AF] px-2 py-0.5 text-[11px] font-semibold text-[#064734]">
                                Save {itemDiscountPct}%
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="whitespace-nowrap text-sm font-semibold text-foreground">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                )})}
              </div>

              <div className="mt-5 space-y-3 border-t border-dashed border-border pt-5">
                {/* Base Price Subtotal and Product Discount rows hidden
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-[#064734]">Base Price Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
                  <span className="font-semibold text-[#064734]">{formatCurrency(totalMrp)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-[#064734]">Product Discount</span>
                  <span className="font-semibold text-[#064734]">-{formatCurrency(productDiscount)}</span>
                </div>
                */}
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-[#064734]">Subtotal</span>
                  <span className="font-semibold text-[#064734]">{formatCurrency(displaySubtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-[#064734]">Tax (GST)</span>
                  <span className="font-semibold text-[#064734]">{formatCurrency(taxAmount)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-[#064734]">Shipping</span>
                  <span className="font-semibold text-[#064734]">
                    {shippingAmount === 0 ? "FREE" : formatCurrency(shippingAmount)}
                  </span>
                </div>
              </div>

              <div className="mt-5 border-t border-dashed border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-foreground">Total Amount</span>
                  <span className="text-2xl font-bold text-primary inline-flex items-center gap-2">
                    {loadingPreview ? <Loader2 size={14} className="animate-spin text-muted-foreground" /> : null}
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 py-3">
                {deliveryAssuranceItems.map(({ icon: Icon, label, sublabel }) => (
                  <div key={label} className="flex flex-col items-center gap-2 text-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold leading-tight text-foreground">{label}</p>
                      <p className="text-[11px] leading-tight text-muted-foreground">{sublabel}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleContinue}
                disabled={loading || continuingToReview || items.length === 0 || !addressId}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50 xl:hidden"
              >
                {continuingToReview ? "Preparing Review..." : "Order Review"}
                <ArrowRight size={16} />
              </button>
            </div>
          </aside>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
};

const CheckoutPage = () => (
  <RequireAuth>
    <CheckoutPageContent />
  </RequireAuth>
);

export default CheckoutPage;
