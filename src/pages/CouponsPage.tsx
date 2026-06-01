import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { previewCheckout } from "@/services/checkoutApi";
import { listVisibleCoupons, type CouponCatalogItem, type CouponValidateResult } from "@/services/couponsApi";
import { getStoredCheckoutCoupons, setStoredCheckoutCoupons } from "@/lib/checkoutCoupon";
import { useNavigate, useLocation } from "react-router-dom";
import { Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CouponsPage = () => {
  const [coupons, setCoupons] = useState<CouponCatalogItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = (location.state as any)?.returnTo as string | undefined;
  const { toast } = useToast();
  const { token } = useAuth();
  const { items } = useCart();
  const addressId = (location.state as any)?.addressId as number | undefined;

  useEffect(() => {
    if (!token) {
      setError("Please log in to view coupons.");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const list = await listVisibleCoupons(0, 20);
        if (!mounted) return;
        setCoupons(list);
      } catch (err: any) {
        console.error(err);
        if (mounted) {
          const message = err?.message || "Failed to load coupons";
          if (/401|403|404/.test(message)) {
            setError("Coupon list requires a valid login session. Please sign in and try again.");
          } else {
            setError(message);
          }
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    void load();
    return () => {
      mounted = false;
    };
  }, [token, location.pathname, navigate]);

  const handleApply = async (code: string) => {
    setApplyingCoupon(true);
    const stored: CouponValidateResult = {
      valid: true,
      couponCode: code,
      discountAmount: null,
      applicableAmount: null,
      message: "Applied from Coupons page",
      allowStackable: true,
    };

    const existingCoupons = getStoredCheckoutCoupons();
    const nextStoredCoupons = [...existingCoupons.filter((coupon) => coupon.couponCode !== code), stored];
    setStoredCheckoutCoupons(nextStoredCoupons);

    const nextState: Record<string, unknown> = {
      ...(location.state ? (location.state as Record<string, unknown>) : {}),
      appliedCoupon: code,
    };
    delete nextState.returnTo;

    if (addressId && items.length > 0) {
      try {
        const previewResponse = await previewCheckout({
          deliveryAddressId: addressId,
          paymentMethod: "CASHFREE",
          items: items.map((item) => ({ variantId: item.variantId, quantity: item.quantity })),
          couponCodes: nextStoredCoupons.map((coupon) => coupon.couponCode),
          useGreenPoints: false,
        });
        const previewData = (previewResponse && typeof previewResponse === "object" && "success" in previewResponse)
          ? ((previewResponse as any).data || previewResponse)
          : previewResponse;
        if (previewData) {
          nextState.initialPreview = previewData;
        }
      } catch (err: any) {
        console.error("Coupon preview failed:", err);
      }
    }

    toast({ title: "Coupon applied", description: `${code} will be applied at order review.` });

    if (returnTo) {
      navigate(returnTo, { state: nextState });
    } else if (addressId) {
      navigate("/order-review", { state: nextState });
    } else {
      navigate("/checkout", { state: nextState });
    }

    setApplyingCoupon(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 max-w-[1200px] mx-auto px-4 md:px-8 lg:px-16 py-12 pt-[120px]">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
          <Tag size={22} /> Available Coupons
        </h1>

        {loading && <p className="text-sm text-muted-foreground">Loading coupons...</p>}
        {error && <p className="text-sm text-destructive">{error}</p>}
        {!loading && !coupons.length && <p className="text-sm text-muted-foreground">No coupons available right now.</p>}

        <div className="grid gap-4 mt-6 md:grid-cols-2">
          {coupons.map((coupon) => (
            <div key={coupon.code} className="p-5 border border-border rounded-2xl bg-background/70 shadow-sm">
              <div className="flex flex-col gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-semibold text-xl tracking-tight">{coupon.code}</h2>
                    <span className="rounded-full bg-[#e6f4ea] px-2 py-1 text-[11px] font-semibold uppercase text-[#064734]">
                      {coupon.discountType ?? "Coupon"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{coupon.description || "No additional description available."}</p>
                </div>

                <div className="grid gap-2 text-sm text-muted-foreground">
                  <div className="flex justify-between gap-4">
                    <span className="font-semibold text-foreground">Value</span>
                    <span>{coupon.discountValue != null ? `${coupon.discountValue}${coupon.discountType === "PERCENTAGE" ? "%" : ""}` : "N/A"}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="font-semibold text-foreground">Min order</span>
                    <span>{coupon.minOrderAmount != null ? `₹${coupon.minOrderAmount}` : "None"}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="font-semibold text-foreground">Max discount cap</span>
                    <span>{coupon.maxDiscountAmount != null ? `₹${coupon.maxDiscountAmount}` : "None"}</span>
                  </div>
                  {coupon.applicableScope && (
                    <div className="flex justify-between gap-4">
                      <span className="font-semibold text-foreground">Scope</span>
                      <span>{coupon.applicableScope}</span>
                    </div>
                  )}
                </div>

                {(coupon.termsAndConditions?.length || coupon.applicableProducts?.length || coupon.applicableCategories?.length) && (
                  <div className="rounded-xl border border-border bg-slate-50 p-3 text-sm text-muted-foreground">
                    <div className="font-semibold text-foreground mb-2">Coupon conditions</div>
                    {coupon.termsAndConditions?.length ? (
                      <ul className="list-disc list-inside space-y-1">
                        {coupon.termsAndConditions.map((term, idx) => (
                          <li key={idx}>{term}</li>
                        ))}
                      </ul>
                    ) : null}
                    {coupon.applicableProducts?.length ? (
                      <p className="mt-2"><span className="font-semibold text-foreground">Products:</span> {coupon.applicableProducts.join(", ")}</p>
                    ) : null}
                    {coupon.applicableCategories?.length ? (
                      <p className="mt-2"><span className="font-semibold text-foreground">Categories:</span> {coupon.applicableCategories.join(", ")}</p>
                    ) : null}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => void handleApply(coupon.code)}
                    disabled={applyingCoupon}
                    className="rounded-xl bg-[#064734] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#043a2b] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {applyingCoupon ? "Applying..." : "Apply coupon"}
                  </button>
                  <button
                    onClick={() => navigator.clipboard?.writeText(coupon.code)}
                    className="text-sm font-semibold text-primary underline"
                  >
                    Copy code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CouponsPage;
