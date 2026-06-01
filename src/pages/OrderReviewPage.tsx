import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Loader2, MapPin, Pencil, ShoppingBag, Tag, Leaf, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RequireAuth from "@/components/RequireAuth";
import CheckoutProgressBar from "@/components/CheckoutProgressBar";
import { useCart } from "@/contexts/CartContext";
import { clearStoredCheckoutCoupons, getStoredCheckoutCoupons, setStoredCheckoutCoupons } from "@/lib/checkoutCoupon";
import {
  clearStoredGreenPointsCheckoutSummary,
  setStoredGreenPointsCheckoutSummary,
} from "@/lib/greenPointsCheckout";
import { previewCheckout, startPaymentSession, verifyPaymentSession, confirmPaymentSession } from "@/services/checkoutApi";
import addressesApi from "@/services/addressesApi";
import { validateCoupon, type CouponValidateResult } from "@/services/couponsApi";
import { getRewardsBalance, type RewardsBalance } from "@/services/rewardsApi";

const CASHFREE_JS_URL = (import.meta.env.VITE_CASHFREE_SDK_URL as string | undefined)?.trim() || "";
const GREEN_POINTS_MIN_POINTS = Number(import.meta.env.VITE_GREEN_POINTS_MIN_POINTS || 500);
const GREEN_POINTS_MIN_SUBTOTAL = Number(import.meta.env.VITE_GREEN_POINTS_MIN_SUBTOTAL || 100);

type CashfreeFactory = (config: { mode: string }) => {
  checkout: (options: { paymentSessionId: string; redirectTarget?: "_self" | "_blank" | "_modal" }) => Promise<unknown>;
};

declare global {
  interface Window {
    Cashfree?: CashfreeFactory;
  }
}

interface LocationState {
  addressId?: number;
  paymentRetry?: boolean;
  merchantOrderId?: string;
  paymentStatus?: string;
  retryAllowed?: boolean;
  appliedCoupon?: string | null;
  initialPreview?: any | null;
}

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

const OrderReviewPageContent = () => {
  const { items, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as LocationState | null) || null;
  const storedCoupons = getStoredCheckoutCoupons();

  const [addressId, setAddressId] = useState<number | null>(state?.addressId ?? null);
  const [selectedAddress, setSelectedAddress] = useState<any | null>(null);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [validating, setValidating] = useState(false);
  const [retryMessage, setRetryMessage] = useState("");
  // Tracks which checkout step is visually active; advances to 3 when payment modal is open
  const [paymentStep, setPaymentStep] = useState<1 | 2 | 3>(2);

  // Coupon state
  const [couponInput, setCouponInput] = useState("");
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [appliedCoupons, setAppliedCoupons] = useState<CouponValidateResult[]>(
    storedCoupons.length > 0
      ? storedCoupons
      : state?.appliedCoupon
        ? [{ valid: true, couponCode: state.appliedCoupon, discountAmount: null, applicableAmount: null, message: "", allowStackable: true }]
        : []
  );
  const [couponError, setCouponError] = useState("");
  const couponCodes = appliedCoupons.map((c) => c.couponCode);

  // Green Points state
  const [rewards, setRewards] = useState<RewardsBalance | null>(null);
  const [loadingRewards, setLoadingRewards] = useState(false);
  const [updatingGreenPoints, setUpdatingGreenPoints] = useState(false);
  const [useGreenPoints, setUseGreenPoints] = useState(false);
  const [greenPointsMessage, setGreenPointsMessage] = useState("");

  useEffect(() => {
    const incomingCoupon = state?.appliedCoupon;
    if (!incomingCoupon) return;
    if (appliedCoupons.some((coupon) => coupon.couponCode === incomingCoupon)) return;

    const applyIncomingCoupon = async () => {
      setApplyingCoupon(true);
      setCouponError("");

      try {
        const cartItems = items
          .map((i) => ({ variantId: i.variantId, quantity: i.quantity }))
          .filter((item) => item.variantId);

        const result = await validateCoupon({
          code: incomingCoupon,
          items: cartItems,
          appliedCouponCodes: couponCodes,
        });

        if (result.valid) {
          const nextCoupons = [...appliedCoupons.filter((c) => c.couponCode !== result.couponCode), result];
          setAppliedCoupons(nextCoupons);
          if (addressId) {
            await fetchPreview(addressId, nextCoupons, useGreenPoints);
          }
          navigate(location.pathname, {
            replace: true,
            state: {
              ...(state ?? {}),
              appliedCoupon: null,
            },
          });
        } else {
          setCouponError(result.message || "Coupon is not valid.");
        }
      } catch (err: any) {
        setCouponError(err?.message || "Could not validate coupon.");
      } finally {
        setApplyingCoupon(false);
      }
    };

    void applyIncomingCoupon();
  }, [state?.appliedCoupon, appliedCoupons, couponCodes, addressId, items, useGreenPoints, location.pathname, navigate, state]);

  // Preview data (from API)
  const [previewData, setPreviewData] = useState<any | null>(state?.initialPreview ?? null);
  const [loadingPreview, setLoadingPreview] = useState(false);

  const totalMrp = useMemo(
    () => items.reduce((sum, item) => sum + (item.originalPrice || item.price) * item.quantity, 0),
    [items]
  );
  const discount = Math.max(0, totalMrp - totalPrice);
  const cartSignature = useMemo(
    () =>
      items
        .map((item) => `${item.variantId || "na"}:${item.quantity}`)
        .sort()
        .join("|"),
    [items]
  );
  const appliedCouponSignature = useMemo(
    () => appliedCoupons.map((coupon) => coupon.couponCode).sort().join("|"),
    [appliedCoupons]
  );

  const couponDiscount = previewData?.discountAmount ?? appliedCoupons.reduce((s, c) => s + (c.discountAmount ?? 0), 0);
  const greenPointsDiscount = previewData?.greenPointsRedemptionValue ?? 0;
  const shippingAmount = previewData?.shippingAmount ?? 0;
  const taxAmount = previewData?.taxTotal ?? 0;
  const backendSubtotal = previewData?.subtotal ?? totalPrice;
  const productDiscount = Math.max(0, totalMrp - backendSubtotal);
  const finalPayable =
    previewData?.payableAfterGreenPoints ??
    previewData?.grandTotal ??
    Math.max(0, totalPrice - couponDiscount - greenPointsDiscount);
  const earnGreenPoints = previewData?.earnGreenPoints ?? 0;
  const previewGreenPointsAvailable = Number(previewData?.greenPointsAvailable ?? rewards?.pointsBalance ?? 0);
  const previewMaxRedemptionValue = Number(previewData?.maxRedemptionValue ?? 0);
  const rewardsRupeeRate = rewards && rewards.pointsBalance > 0
    ? rewards.redeemableValue / rewards.pointsBalance
    : 0;
  const previewGreenPointsValue = previewGreenPointsAvailable * rewardsRupeeRate;
  const greenPointsUsed =
    useGreenPoints && rewardsRupeeRate > 0 && greenPointsDiscount > 0
      ? Math.min(previewGreenPointsAvailable, Math.round(greenPointsDiscount / rewardsRupeeRate))
      : 0;
  const remainingGreenPoints = Math.max(0, previewGreenPointsAvailable - greenPointsUsed);
  const remainingGreenPointsValue = remainingGreenPoints * rewardsRupeeRate;
  const nearestExpiryTimestamp = rewards?.nearestExpiry ? new Date(rewards.nearestExpiry).getTime() : null;
  const hasExpiredNearestBucket = typeof nearestExpiryTimestamp === "number" && nearestExpiryTimestamp <= Date.now();
  const pointsToMinRedeem = Math.max(0, (rewards?.minPointsForRedemption ?? 0) - previewGreenPointsAvailable);
  const subtotalForRedeemCheck = Math.max(0, backendSubtotal - taxAmount);
  const pointsToConfiguredMin = Math.max(0, GREEN_POINTS_MIN_POINTS - previewGreenPointsAvailable);
  const pointsToMinSubtotal = Math.max(0, GREEN_POINTS_MIN_SUBTOTAL - subtotalForRedeemCheck);
  const hasPreviewMaxRedemptionValue = Boolean(
    previewData && typeof previewData === "object" && "maxRedemptionValue" in previewData
  );
  const canRedeemByPreview = !hasPreviewMaxRedemptionValue || previewMaxRedemptionValue > 0;
  const canRedeemGreenPoints = Boolean(
    rewards &&
    !hasExpiredNearestBucket &&
    previewGreenPointsAvailable >= Math.max(rewards.minPointsForRedemption ?? 0, GREEN_POINTS_MIN_POINTS) &&
    subtotalForRedeemCheck > GREEN_POINTS_MIN_SUBTOTAL &&
    canRedeemByPreview
  );

  const getItemDiscountPercent = (price: number, mrp: number) => {
    if (mrp <= price) return 0;
    return Math.round(((mrp - price) / mrp) * 100);
  };

  const loadCashfreeScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (!CASHFREE_JS_URL) {
        reject(new Error("Cashfree SDK URL is not configured."));
        return;
      }

      if (window.Cashfree) {
        resolve();
        return;
      }

      const existingScript = document.querySelector(`script[src="${CASHFREE_JS_URL}"]`) as HTMLScriptElement | null;
      if (existingScript) {
        if (window.Cashfree) {
          resolve();
          return;
        }

        existingScript.addEventListener("load", () => resolve(), { once: true });
        existingScript.addEventListener("error", () => reject(new Error("Failed to load Cashfree SDK")), { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = CASHFREE_JS_URL;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Cashfree SDK"));
      document.body.appendChild(script);
    });
  };

  const isMobileScreen = () => {
    return window.innerWidth < 768; // md breakpoint in Tailwind
  };

  const launchCashfreeCheckout = async (paymentSessionId: string, cashfreeMode?: string) => {
    const rawMode = (cashfreeMode || "sandbox").toLowerCase();
    const normalizedMode: "sandbox" | "production" =
      rawMode === "production" || rawMode === "prod" || rawMode === "live"
        ? "production"
        : "sandbox";

    await loadCashfreeScript();

    if (!window.Cashfree) {
      throw new Error("Cashfree SDK is not available");
    }

    const instance = window.Cashfree({ mode: normalizedMode });
    
    // Use modal on desktop/tablet (width >= 768px), page redirect on mobile
    const redirectTarget = isMobileScreen() ? "_self" : "_modal";
    
    await instance.checkout({
      paymentSessionId,
      redirectTarget,
    });
  };

  const buildPaymentRequest = () => {
    if (!addressId) {
      throw new Error("Please select a delivery address");
    }

    const invalidItems = items.filter((i) => !i.variantId);
    if (invalidItems.length > 0) {
      const names = invalidItems.map((i) => i.name).join(", ");
      throw new Error(`Cart has invalid items: ${names}. Please add items again.`);
    }

    return {
      deliveryAddressId: addressId,
      paymentMethod: "CASHFREE",
      items: items.map((i) => ({
        variantId: i.variantId,
        quantity: i.quantity,
      })),
      couponCodes: couponCodes.length > 0 ? couponCodes : undefined,
      useGreenPoints,
    };
  };

  // Fetch live checkout preview whenever address, coupons, or green points toggle changes
  const fetchPreview = async (
    addrId: number,
    nextCoupons: CouponValidateResult[] = appliedCoupons,
    nextUseGreenPoints: boolean = useGreenPoints,
    options?: { throwOnError?: boolean }
  ) => {
    if (!addrId || items.length === 0) return;
    setLoadingPreview(true);
    try {
      const body = {
        deliveryAddressId: addrId,
        paymentMethod: "CASHFREE",
        items: items.map((i) => ({ variantId: i.variantId, quantity: i.quantity })),
        couponCodes: nextCoupons.map((coupon) => coupon.couponCode).length > 0 ? nextCoupons.map((coupon) => coupon.couponCode) : undefined,
        useGreenPoints: nextUseGreenPoints,
      };
      const res = await previewCheckout(body);
      const data = res?.success ? res.data : res;
      setPreviewData(data ?? null);
      return data ?? null;
    } catch (err) {
      // Preserve the last successful preview so tax/shipping/grand total never reset on failed apply.
      if (options?.throwOnError) {
        throw err;
      }
      return null;
    } finally {
      setLoadingPreview(false);
    }
  };

  const handleApplyCoupon = async () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    setCouponError("");
    setApplyingCoupon(true);
    try {
      const cartItems = items.map((i) => ({ variantId: i.variantId!, quantity: i.quantity })).filter((i) => i.variantId);
      const result = await validateCoupon({
        code,
        items: cartItems,
        appliedCouponCodes: couponCodes,
      });
      if (result.valid) {
        const nextCoupons = [...appliedCoupons.filter((c) => c.couponCode !== result.couponCode), result];
        setAppliedCoupons(nextCoupons);
        setCouponInput("");
        if (addressId) {
          await fetchPreview(addressId, nextCoupons, useGreenPoints);
        }
      } else {
        setCouponError(result.message);
      }
    } catch (err: any) {
      setCouponError(err?.message || "Could not validate coupon.");
    } finally {
      setApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = (code: string) => {
    const nextCoupons = appliedCoupons.filter((c) => c.couponCode !== code);
    setAppliedCoupons(nextCoupons);
    setStoredCheckoutCoupons(nextCoupons);
    if (addressId) {
      void fetchPreview(addressId, nextCoupons, useGreenPoints);
    }
    if (state?.appliedCoupon === code) {
      navigate(location.pathname, {
        replace: true,
        state: {
          ...(state ?? {}),
          appliedCoupon: null,
        },
      });
    }
  };

  const handleApplyGreenPoints = async () => {
    if (!addressId || !canRedeemGreenPoints || useGreenPoints) return;

    setUpdatingGreenPoints(true);
    setGreenPointsMessage("");
    try {
      const nextPreview = await fetchPreview(addressId, appliedCoupons, true, { throwOnError: true });
      const redeemedValue = Number(nextPreview?.greenPointsRedemptionValue ?? 0);
      const applied = redeemedValue > 0;

      setUseGreenPoints(applied);
      if (!applied) {
        clearStoredGreenPointsCheckoutSummary();
        const apiMessage =
          typeof nextPreview?.message === "string" && nextPreview.message.trim().length > 0
            ? nextPreview.message
            : "Green Points could not be applied for this order.";
        setGreenPointsMessage(apiMessage);
      } else if (rewardsRupeeRate > 0) {
        const pointsUsed = Math.min(previewGreenPointsAvailable, Math.round(redeemedValue / rewardsRupeeRate));
        const remainingPoints = Math.max(0, previewGreenPointsAvailable - pointsUsed);
        setStoredGreenPointsCheckoutSummary({
          pointsBalance: previewGreenPointsAvailable,
          redeemableValue: previewGreenPointsValue,
          pointsRate: rewardsRupeeRate,
          redeemedValue,
          pointsUsed,
          remainingPoints,
          remainingRedeemableValue: remainingPoints * rewardsRupeeRate,
          subtotal: backendSubtotal,
          payableAfterGreenPoints: Number(nextPreview?.payableAfterGreenPoints ?? nextPreview?.grandTotal ?? 0),
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (err: any) {
      setUseGreenPoints(false);
      clearStoredGreenPointsCheckoutSummary();
      setGreenPointsMessage(err?.message || "Green Points could not be applied for this order.");
    } finally {
      setUpdatingGreenPoints(false);
    }
  };

  const handleRemoveGreenPoints = async () => {
    if (!addressId || !useGreenPoints) return;

    setUpdatingGreenPoints(true);
    setGreenPointsMessage("");
    setUseGreenPoints(false);
    clearStoredGreenPointsCheckoutSummary();
    try {
      await fetchPreview(addressId, appliedCoupons, false);
    } finally {
      setUpdatingGreenPoints(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!addressId) {
      alert("Please choose delivery address");
      return;
    }

    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setPlacingOrder(true);
    try {
      setValidating(true);
      const body = buildPaymentRequest();
      const requestedQtyByVariant = getRequestedQtyByVariant(items);
      const previewResponse = await previewCheckout(body);
      const previewData = (previewResponse && typeof previewResponse === "object" && "success" in previewResponse)
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

      setValidating(false);

      const startResponse = await startPaymentSession(body);
      const sessionData = (startResponse && typeof startResponse === "object" && "success" in startResponse)
        ? ((startResponse as any).data || startResponse)
        : startResponse;

      const merchantOrderId: string | undefined = sessionData?.merchantOrderId;
      const paymentSessionId: string | undefined = sessionData?.paymentSessionId;

      if (!merchantOrderId || !paymentSessionId) {
        throw new Error("Online payment session was not created. Please try again.");
      }

      // Advance progress bar to step 3 (Payment) while the payment modal/page is open
      setPaymentStep(3);
      try {
        await launchCashfreeCheckout(paymentSessionId, sessionData?.cashfreeMode);
      } finally {
        // Reset back to step 2 if user dismissed the modal without paying
        setPaymentStep(2);
      }

      const verificationResponse = await verifyPaymentSession(merchantOrderId);
      const verificationData =
        verificationResponse && typeof verificationResponse === "object" && "success" in verificationResponse
          ? ((verificationResponse as any).data || null)
          : verificationResponse;
      const paymentStatus = verificationData?.paymentStatus || "PENDING";
      const retryAllowed = verificationData?.expiresAt
        ? new Date(verificationData.expiresAt).getTime() > Date.now()
        : true;

      if (paymentStatus === "PAID") {
        // ✅ CONFIRM payment with backend
        try {
          const orderIds = sessionData?.orders?.map((order: any) => order.id).filter((id: any) => id != null) || [];
          if (orderIds.length > 0) {
            await confirmPaymentSession({
              orderIds,
              paymentMethod: "CASHFREE",
            });
          }
        } catch (confirmErr: any) {
          console.error("Error confirming payment:", confirmErr?.message || confirmErr);
          // Continue to confirmation page even if confirm fails (might have been confirmed already)
        }
        clearStoredCheckoutCoupons();
        navigate(`/payment/confirmation?merchantOrderId=${encodeURIComponent(merchantOrderId)}`);
        return;
      }

      navigate("/order-review", {
        replace: true,
        state: {
          addressId,
          paymentRetry: true,
          merchantOrderId,
          paymentStatus,
          retryAllowed,
        },
      });
    } catch (err: any) {
      alert(err?.message || "Could not place order");
    } finally {
      setValidating(false);
      setPlacingOrder(false);
    }
  };

  useEffect(() => {
    if (!addressId) {
      navigate("/checkout", { replace: true });
      return;
    }

    let mounted = true;
    (async () => {
      try {
        setLoadingAddress(true);
        const res = await addressesApi.getAddresses();
        const list = (res && typeof res === "object" && "success" in res) ? ((res as any).data || []) : res;
        if (!mounted || !Array.isArray(list)) return;

        const found = list.find((a: any) => (a.id || a.addressId) === addressId) || null;
        setSelectedAddress(found);
      } catch {
        if (mounted) setSelectedAddress(null);
      } finally {
        if (mounted) setLoadingAddress(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [addressId, navigate]);

  useEffect(() => {
    if (!state?.paymentRetry) return;

    if (state.retryAllowed === false) {
      setRetryMessage("Previous payment attempt failed and the payment window may have expired. Please start a new payment session.");
    } else {
      setRetryMessage(`Previous payment attempt was not successful (${state.paymentStatus || "UNKNOWN"}). Please retry payment.`);
    }

    navigate(location.pathname, {
      replace: true,
      state: {
        addressId,
      },
    });
  }, [addressId, location.pathname, navigate, state?.paymentRetry, state?.paymentStatus, state?.retryAllowed]);

  useEffect(() => {
    setStoredCheckoutCoupons(appliedCoupons);
  }, [appliedCoupons]);

  // Load rewards balance once
  useEffect(() => {
    let mounted = true;
    setLoadingRewards(true);
    getRewardsBalance()
      .then((data) => { if (mounted) setRewards(data); })
      .catch(() => { if (mounted) setRewards(null); })
      .finally(() => { if (mounted) setLoadingRewards(false); });
    return () => { mounted = false; };
  }, []);

  // Refresh preview whenever summary-driving state changes.
  useEffect(() => {
    if (!addressId || items.length === 0) return;
    void fetchPreview(addressId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressId, cartSignature, appliedCouponSignature, useGreenPoints]);

  useEffect(() => {
    if (!useGreenPoints || greenPointsDiscount <= 0 || rewardsRupeeRate <= 0) return;

    const pointsUsed = Math.min(previewGreenPointsAvailable, Math.round(greenPointsDiscount / rewardsRupeeRate));
    const remainingPoints = Math.max(0, previewGreenPointsAvailable - pointsUsed);

    setStoredGreenPointsCheckoutSummary({
      pointsBalance: previewGreenPointsAvailable,
      redeemableValue: previewGreenPointsValue,
      pointsRate: rewardsRupeeRate,
      redeemedValue: greenPointsDiscount,
      pointsUsed,
      remainingPoints,
      remainingRedeemableValue: remainingPoints * rewardsRupeeRate,
      subtotal: backendSubtotal,
      payableAfterGreenPoints: Number(previewData?.payableAfterGreenPoints ?? previewData?.grandTotal ?? 0),
      updatedAt: new Date().toISOString(),
    });
  }, [backendSubtotal, greenPointsDiscount, previewData?.grandTotal, previewData?.payableAfterGreenPoints, previewGreenPointsAvailable, previewGreenPointsValue, rewardsRupeeRate, useGreenPoints]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-8 py-10 md:py-16 pt-[152px] md:pt-[176px]">
        <CheckoutProgressBar currentStep={paymentStep} />

        <div className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Order Review</h1>
        </div>

        {retryMessage && (
          <div className="mb-5 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-900">
            {retryMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 lg:gap-8">
          <div className="space-y-5">
            <div className="border-b border-border pb-6 md:pb-7">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h2 className="text-lg md:text-xl font-bold flex items-center gap-2 text-[#064734]">
                  <MapPin size={20} />
                  Delivering To
                </h2>
                <button
                  onClick={() => navigate("/checkout", { state: { prefillAddressId: addressId } })}
                  className="inline-flex items-center gap-1 text-base font-semibold text-primary hover:underline"
                >
                  <Pencil size={16} />
                  Edit
                </button>
              </div>

              {loadingAddress ? (
                <p className="text-base text-muted-foreground">Loading address...</p>
              ) : selectedAddress ? (
                <div className="text-base leading-7">
                  <p className="font-semibold text-foreground text-lg">{selectedAddress.contactName}</p>
                  <p className="text-muted-foreground">{selectedAddress.mobile}</p>
                  <p className="text-foreground mt-1.5">{selectedAddress.line1}</p>
                  {selectedAddress.line2 ? <p className="text-foreground mt-0.5">{selectedAddress.line2}</p> : null}
                  <p className="text-foreground">{selectedAddress.city} {selectedAddress.postalCode ? `- ${selectedAddress.postalCode}` : ""}</p>
                </div>
              ) : (
                <p className="text-base text-destructive">Selected address not found. Please go back and choose another address.</p>
              )}
            </div>

            <div className="border-b border-border pb-6 md:pb-7">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                  <ShoppingBag size={20} />
                  Order Items ({totalItems})
                </h2>
                <button
                  onClick={() => navigate("/cart")}
                  className="inline-flex items-center gap-1 text-base font-semibold text-primary hover:underline"
                >
                  <Pencil size={16} />
                  Edit Cart
                </button>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.variantId || "default"}`} className="flex gap-4 border-b border-border pb-4 md:pb-5">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-base md:text-lg leading-snug">{item.name}</p>
                      <p className="text-sm md:text-base text-muted-foreground mt-1">Qty: {item.quantity}</p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="text-lg md:text-xl font-bold text-[#064734]">₹{item.price}</span>
                        {item.originalPrice > item.price && (
                          <span className="text-sm text-muted-foreground line-through">₹{item.originalPrice}</span>
                        )}
                        {item.originalPrice > item.price && (
                          <span className="rounded-full bg-[#E2F3AF] px-2 py-0.5 text-xs font-semibold text-[#064734]">
                            Save {getItemDiscountPercent(item.price, item.originalPrice)}%
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-base md:text-lg font-bold whitespace-nowrap">₹{item.price * item.quantity}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-[140px] h-fit px-0 py-1 md:px-0 md:py-1 space-y-4">
            {/* Coupon Input */}
            <div className="border border-border rounded-xl p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Tag size={15} className="text-primary" />
                  Coupon Code
                </h3>
                <Link
                  to="/coupons"
                  state={{
                    ...(location.state as Record<string, unknown> | null) || {},
                    returnTo: location.pathname,
                    addressId,
                    appliedCoupon: state?.appliedCoupon ?? null,
                  }}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  View All Coupons
                </Link>
              </div>
              {appliedCoupons.length > 0 && (
                <div className="space-y-2 mb-3">
                  {appliedCoupons.map((c) => (
                    <div key={c.couponCode} className="flex items-center justify-between bg-[#e8f5e9] rounded-lg px-3 py-2 text-sm text-[#1b5e20] font-semibold">
                      <span>{c.couponCode}{c.discountAmount != null ? ` — ₹${c.discountAmount.toFixed(0)} off` : ""}</span>
                      <button onClick={() => handleRemoveCoupon(c.couponCode)} aria-label="Remove coupon">
                        <X size={14} className="text-red-500 hover:text-red-700" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <input
                  value={couponInput}
                  onChange={(e) => { setCouponInput(e.target.value); setCouponError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                  placeholder="Enter coupon code"
                  className="flex-1 px-3 py-2 border border-border rounded-lg text-sm bg-background"
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={applyingCoupon || !couponInput.trim()}
                  className="px-3 py-2 rounded-lg bg-[#064734] text-white text-sm font-semibold disabled:opacity-60"
                >
                  {applyingCoupon ? <Loader2 size={14} className="animate-spin" /> : "Apply"}
                </button>
              </div>
              {couponError && <p className="text-xs text-red-600 mt-1.5">{couponError}</p>}
            </div>

            {/* Green Points Toggle */}
            <div className="border border-border rounded-xl p-4">
              <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                <Leaf size={15} className="text-[#388e3c]" />
                Green Rewards Points
              </h3>
              {loadingRewards ? (
                <p className="text-xs text-muted-foreground">Loading points...</p>
              ) : rewards ? (
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-foreground">
                      {useGreenPoints ? remainingGreenPoints : previewGreenPointsAvailable} pts = <span className="font-bold text-[#388e3c]">₹{(useGreenPoints ? remainingGreenPointsValue : previewGreenPointsValue).toFixed(0)}</span>
                    </span>
                    {useGreenPoints ? (
                      <button
                        type="button"
                        onClick={handleRemoveGreenPoints}
                        disabled={updatingGreenPoints || loadingPreview}
                        className="px-3 py-1.5 rounded-md border border-red-200 text-red-600 text-xs font-semibold disabled:opacity-60"
                      >
                        {updatingGreenPoints ? "Removing..." : "Remove"}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleApplyGreenPoints}
                        disabled={!canRedeemGreenPoints || updatingGreenPoints || loadingPreview}
                        className="px-3 py-1.5 rounded-md bg-[#064734] text-white text-xs font-semibold disabled:opacity-60"
                      >
                        {updatingGreenPoints ? "Applying..." : "Apply"}
                      </button>
                    )}
                  </div>
                  {useGreenPoints && greenPointsDiscount > 0 && (
                    <p className="text-xs text-[#388e3c] font-semibold">
                      Used {greenPointsUsed} pts for ₹{greenPointsDiscount.toFixed(2)}. Remaining balance: {remainingGreenPoints} pts = ₹{remainingGreenPointsValue.toFixed(2)}
                    </p>
                  )}
                  {!canRedeemGreenPoints && pointsToMinRedeem > 0 && (
                    <p className="text-xs text-muted-foreground mt-1.5">
                      You need {pointsToMinRedeem} more points to redeem (min {rewards.minPointsForRedemption} pts)
                    </p>
                  )}
                  {!canRedeemGreenPoints && pointsToConfiguredMin > 0 && (
                    <p className="text-xs text-muted-foreground mt-1.5">
                      Minimum {GREEN_POINTS_MIN_POINTS} points required to apply Green Points.
                    </p>
                  )}
                  {!canRedeemGreenPoints && pointsToMinSubtotal > 0 && (
                    <p className="text-xs text-muted-foreground mt-1.5">
                      Subtotal should be more than ₹{GREEN_POINTS_MIN_SUBTOTAL} to apply Green Points.
                    </p>
                  )}
                  {!canRedeemGreenPoints && pointsToMinRedeem <= 0 && hasPreviewMaxRedemptionValue && previewMaxRedemptionValue <= 0 && (
                    <p className="text-xs text-muted-foreground mt-1.5">
                      {previewData?.message
                        ? `Green Points not redeemable: ${previewData.message}`
                        : "Green Points are not redeemable for this checkout yet. Validation comes from preview API (cart value, serviceability, and account rules)."}
                    </p>
                  )}
                  {greenPointsMessage && (
                    <p className="text-xs text-red-600 mt-1.5">{greenPointsMessage}</p>
                  )}
                  {hasExpiredNearestBucket && (
                    <p className="text-xs text-red-600 mt-1.5">
                      Some points have reached expiry. Please refresh rewards balance before applying.
                    </p>
                  )}
                  {rewards.nearestExpiry && (
                    <p className="text-xs text-orange-600 mt-1">
                      {(rewards.expiringPoints || []).reduce((sum, point) => sum + (point.remainingPoints || 0), 0)} pts expiring by {new Date(rewards.nearestExpiry).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Not available</p>
              )}
              <div className="mt-3 pt-3 border-t border-dashed border-border">
                <Link to="/rewards" className="text-xs font-semibold text-primary hover:underline">
                  View full rewards balance and history
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <h3 className="text-base uppercase tracking-wide text-[#064734] font-bold mb-4">Order Summary</h3>

              <div className="space-y-3 text-base">
                {/* Base Price Subtotal and Product Discount rows hidden
                <div className="flex items-center justify-between">
                  <span>Base Price Subtotal</span>
                  <span>₹{totalMrp.toFixed(0)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Product Discount</span>
                  <span className="text-[#388e3c] font-semibold">- ₹{productDiscount.toFixed(0)}</span>
                </div>
                */}
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>₹{backendSubtotal.toFixed(0)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex items-center justify-between">
                    <span>Coupon Discount</span>
                    <span className="text-[#388e3c] font-semibold">- ₹{couponDiscount.toFixed(0)}</span>
                  </div>
                )}
                {greenPointsDiscount > 0 && (
                  <div className="flex items-center justify-between">
                    <span>Green Points</span>
                    <span className="text-[#388e3c] font-semibold">- ₹{greenPointsDiscount.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span>Tax (GST)</span>
                  <span>₹{taxAmount.toFixed(0)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span>{shippingAmount > 0 ? `₹${shippingAmount.toFixed(0)}` : "FREE"}</span>
                </div>
                <div className="border-t border-dashed border-border pt-3 flex items-center justify-between text-xl font-bold">
                  <span>Total Payable</span>
                  <span className="flex items-center gap-2">
                    {loadingPreview && <Loader2 size={14} className="animate-spin text-muted-foreground" />}
                    ₹{finalPayable.toFixed ? finalPayable.toFixed(0) : finalPayable}
                  </span>
                </div>
                {earnGreenPoints > 0 && (
                  <p className="text-xs text-[#388e3c] font-semibold flex items-center gap-1">
                    <Leaf size={12} /> You'll earn {earnGreenPoints} Green Points on this order
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={placingOrder || validating || items.length === 0 || !selectedAddress}
              className="w-full px-5 py-3.5 rounded-xl bg-[#064734] text-white text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {(placingOrder || validating) ? <Loader2 size={16} className="animate-spin" /> : null}
              {validating ? "Validating..." : placingOrder ? "Starting payment..." : `Place Order • ₹${finalPayable.toFixed ? finalPayable.toFixed(0) : finalPayable}`}
            </button>

            <p className="text-sm text-muted-foreground text-center">Safe and secure payments. Easy returns.</p>
          </aside>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
};

const OrderReviewPage = () => (
  <RequireAuth>
    <OrderReviewPageContent />
  </RequireAuth>
);

export default OrderReviewPage;
