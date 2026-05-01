import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { previewCheckout, startPaymentSession, verifyPaymentSession } from "@/services/checkoutApi";
import addressesApi from "@/services/addressesApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import RequireAuth from "@/components/RequireAuth";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";

const CASHFREE_JS_URL = "https://sdk.cashfree.com/js/v3/cashfree.js";

type CashfreeFactory = (config: { mode: string }) => {
  checkout: (options: { paymentSessionId: string; redirectTarget?: "_self" | "_blank" | "_modal" }) => Promise<unknown>;
};

declare global {
  interface Window {
    Cashfree?: CashfreeFactory;
  }
}

interface StockValidationResult {
  valid: boolean;
  invalidItems: Array<{
    productName: string;
    orderedQty: number;
    availableQty: number;
    message: string;
  }>;
}

const CheckoutPageContent = () => {
  const { items, totalItems, totalPrice } = useCart();
  const { user } = useAuth();
  const [addressId, setAddressId] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(false);
  const [preview, setPreview] = useState<any | null>(null);
  const [stockValidation, setStockValidation] = useState<StockValidationResult | null>(null);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [newAddress, setNewAddress] = useState<{ addressType?: string; contactName?: string; mobile?: string; line1?: string; city?: string; postalCode?: string }>({ addressType: 'HOME' });
  const [retryMessage, setRetryMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const loadCashfreeScript = () => {
    return new Promise<void>((resolve, reject) => {
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

        if (existingScript.dataset.loaded === "true") {
          reject(new Error("Cashfree SDK was loaded but is unavailable in this page context"));
          return;
        }

        existingScript.addEventListener("load", () => resolve(), { once: true });
        existingScript.addEventListener("error", () => reject(new Error("Failed to load Cashfree SDK")), { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = CASHFREE_JS_URL;
      script.async = true;
      script.onload = () => {
        script.dataset.loaded = "true";
        resolve();
      };
      script.onerror = () => reject(new Error("Failed to load Cashfree SDK"));
      document.body.appendChild(script);
    });
  };

  const launchCashfreeCheckout = async (paymentSessionId: string, cashfreeMode?: string) => {
    const mode = (cashfreeMode || "sandbox").toLowerCase();
    const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);

    // Live mode generally requires HTTPS + whitelisted production domain.
    if (mode === "production" && isLocal) {
      throw new Error("Live Cashfree mode is blocked on localhost. Use sandbox locally or test on your whitelisted HTTPS domain.");
    }

    await loadCashfreeScript();

    if (!window.Cashfree) {
      throw new Error("Cashfree SDK is not available");
    }

    const instance = window.Cashfree({ mode: cashfreeMode || "sandbox" });
    await instance.checkout({
      paymentSessionId,
      redirectTarget: "_modal",
    });
  };

  const buildPreviewRequest = () => {
    // CRITICAL: Validate all items have variantId before checkout
    const invalidItems = items.filter((i) => !i.variantId);
    
    if (invalidItems.length > 0) {
      const itemsList = invalidItems.map((i) => `${i.name} (ID: ${i.productId})`).join(', ');
      const errorMsg = `Invalid cart items without variant information: ${itemsList}. Please clear your browser cache and add items again.`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    // Build request with ONLY variantId, never productId
    const itemsForCheckout = items.map((i) => ({
      variantId: i.variantId,
      quantity: i.quantity
    }));

    return {
      deliveryAddressId: addressId || null,
      paymentMethod: "CASHFREE",
      items: itemsForCheckout,
    };
  };

  // Pre-checkout stock validation
  const validateStock = async () => {
    setValidating(true);
    try {
      const body = buildPreviewRequest(); // This will throw if items invalid
      const res = await previewCheckout(body);
      const previewData = (res && typeof res === 'object' && 'success' in res) ? (res.data || null) : res;
      
      if (!previewData) throw new Error('Failed to validate stock');

      // Check if all items are serviceable
      const invalidItems = previewData.items?.filter((item: any) => item.serviceable === false) || [];
      
      const validation: StockValidationResult = {
        valid: previewData.serviceable && invalidItems.length === 0,
        invalidItems: invalidItems.map((item: any) => ({
          productName: item.productName || item.sku,
          orderedQty: item.quantity,
          availableQty: item.stockLabel ? parseInt(item.stockLabel) : 0,
          message: item.message || 'Item not available',
        })),
      };

      setStockValidation(validation);
      setPreview(previewData);
      
      if (!validation.valid) {
        throw new Error('Some items are out of stock or not serviceable for your location');
      }
      
      return validation;
    } catch (err: any) {
      setStockValidation({
        valid: false,
        invalidItems: [],
      });
      throw err;
    } finally {
      setValidating(false);
    }
  };

  const handleStart = async () => {
    if (!addressId) {
      alert('Please select or create a delivery address');
      return;
    }

    setLoading(true);
    try {
      const validation = await validateStock();
      if (!validation.valid) {
        alert('Some items are out of stock or not serviceable for your location');
        return;
      }

      const body = buildPreviewRequest();
      const res = await startPaymentSession(body);
      if (res && typeof res === 'object' && 'success' in res && res.success === false) {
        throw new Error(res.message || 'Start failed');
      }
      
      const sessionData = (res && typeof res === 'object' && 'success' in res) ? (res.data || res) : res;
      const merchantOrderId: string | undefined = sessionData?.merchantOrderId;
      const paymentSessionId: string | undefined = sessionData?.paymentSessionId;
      const paymentMethod: string | undefined = sessionData?.paymentMethod;
      const backendMessage: string | undefined =
        (res && typeof res === "object" && "message" in res && typeof res.message === "string" ? res.message : undefined) ||
        (sessionData && typeof sessionData === "object" && "message" in sessionData && typeof sessionData.message === "string" ? sessionData.message : undefined);

      if (paymentMethod && paymentMethod !== "CASHFREE") {
        throw new Error(backendMessage || `Online payment is currently unavailable. Backend returned payment method: ${paymentMethod}`);
      }

      if (!merchantOrderId || !paymentSessionId) {
        throw new Error(backendMessage || "Online payment session was not created. Please try again later.");
      }

      await launchCashfreeCheckout(paymentSessionId, sessionData?.cashfreeMode);

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
        navigate(`/payment/confirmation?merchantOrderId=${encodeURIComponent(merchantOrderId)}`);
        return;
      }

      navigate("/checkout", {
        replace: true,
        state: {
          paymentRetry: true,
          merchantOrderId,
          paymentStatus,
          retryAllowed,
        },
      });
    } catch (err: any) {
      console.error('❌ Checkout error:', err);
      alert(err.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    const state = location.state as { paymentRetry?: boolean; paymentStatus?: string; retryAllowed?: boolean } | null;
    if (!state?.paymentRetry) return;

    if (state.retryAllowed === false) {
      setRetryMessage("Previous payment attempt failed and the payment window may have expired. Please start a new payment session.");
    } else {
      setRetryMessage(`Previous payment attempt was not successful (${state.paymentStatus || "UNKNOWN"}). Please retry payment.`);
    }

    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

  // auto-select default address when addresses are loaded
  useEffect(() => {
    if (!addresses || addresses.length === 0) return;
    const def = addresses.find((a) => a.isDefault === true || a.is_default === true);
    if (def) setAddressId(def.id || def.addressId || null);
  }, [addresses]);

  const handleCreateAddress = async () => {
    if (!newAddress.addressType) { alert('Please select address type'); return; }
    if (!newAddress.line1 || !newAddress.city) { alert('Please provide address line and city'); return; }
    setLoading(true);
    try {
      const payload = { addressType: newAddress.addressType, contactName: newAddress.contactName || '', mobile: newAddress.mobile || '', line1: newAddress.line1, city: newAddress.city, postalCode: newAddress.postalCode || '' };
      const res = await addressesApi.createAddress(payload);
      const created = (res && typeof res === 'object' && 'success' in res) ? (res.data || res) : res;
      setAddresses((s) => (Array.isArray(s) ? [...s, created] : [created]));
      setAddressId(created.id || created.addressId || null);
      setNewAddress({ addressType: 'HOME' });
      alert('Address saved');
    } catch (err: any) {
      alert(err.message || 'Address creation failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-16 pt-[104px]">
        <h1 className="text-2xl font-bold mb-2">Checkout</h1>
        <p className="text-muted-foreground mb-6">Logged in as: {user?.email}</p>

        {retryMessage && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-900">
            {retryMessage}
          </div>
        )}

        {/* Stock Validation Alert */}
        {stockValidation && !stockValidation.valid && stockValidation.invalidItems.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
              <div>
                <h3 className="font-semibold text-red-900 mb-2">Stock Validation Failed</h3>
                <ul className="text-sm text-red-800 space-y-1">
                  {stockValidation.invalidItems.map((item, idx) => (
                    <li key={idx}>• {item.productName}: Ordered {item.orderedQty}, but {item.message}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Stock Validation Success */}
        {stockValidation && stockValidation.valid && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex gap-3 items-center">
              <CheckCircle className="text-green-600" size={20} />
              <div>
                <h3 className="font-semibold text-green-900">Stock Validated!</h3>
                <p className="text-sm text-green-800">All items are in stock and your address is serviceable. Ready to proceed to payment.</p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm mb-2">Delivery Address</label>
          {addresses.length > 0 ? (
            <select value={addressId as any} onChange={(e) => setAddressId(e.target.value === "" ? "" : Number(e.target.value))} className="w-80 px-3 py-2 border rounded">
              <option value="">-- Select saved address --</option>
              {addresses.map((a) => (
                <option key={a.id} value={a.id}>{a.line1}{a.city ? `, ${a.city}` : ''}{a.postalCode ? ` - ${a.postalCode}` : ''}</option>
              ))}
            </select>
          ) : (
            <div className="text-sm text-muted-foreground">No saved addresses. Use the form below to add one.</div>
          )}

          <div className="mt-3 max-w-md">
            <h3 className="text-sm font-medium mb-2">Add address (quick)</h3>
            <label className="text-sm">Address Type</label>
            <select value={newAddress.addressType} onChange={(e) => setNewAddress({ ...newAddress, addressType: e.target.value })} className="w-48 border px-3 py-2 rounded mb-2">
              <option value="HOME">Home</option>
              <option value="WORK">Work</option>
              <option value="OTHER">Other</option>
            </select>
            <input placeholder="Contact name" value={newAddress.contactName || ''} onChange={(e) => setNewAddress({ ...newAddress, contactName: e.target.value })} className="w-full border px-3 py-2 rounded mb-2" />
            <input placeholder="Mobile" value={newAddress.mobile || ''} onChange={(e) => setNewAddress({ ...newAddress, mobile: e.target.value })} className="w-full border px-3 py-2 rounded mb-2" />
            <input placeholder="Address line 1" value={newAddress.line1 || ''} onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })} className="w-full border px-3 py-2 rounded mb-2" />
            <input placeholder="City" value={newAddress.city || ''} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} className="w-full border px-3 py-2 rounded mb-2" />
            <input placeholder="Postal Code" value={newAddress.postalCode || ''} onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })} className="w-48 border px-3 py-2 rounded mb-2" />
            <div className="flex gap-3 mt-2">
              <button onClick={handleCreateAddress} disabled={loading} className="px-4 py-2 bg-primary text-primary-foreground rounded">{loading ? 'Saving...' : 'Save Address'}</button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold">Items ({totalItems})</h2>
          <div className="mt-2 space-y-2">
            {items.map((it) => (
              <div key={it.productId} className="flex justify-between">
                <div>{it.name} x {it.quantity}</div>
                <div>₹{it.price * it.quantity}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm">Subtotal</div>
            <div className="font-bold">₹{totalPrice}</div>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={handleStart} 
            disabled={loading || validating || items.length === 0 || !addressId} 
            className="px-4 py-2 bg-emerald-700 text-white rounded hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {(loading || validating) && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Starting..." : validating ? "Validating..." : "Pay Securely"}
          </button>
        </div>

        {preview && (
          <div className="mt-6 p-4 border rounded bg-white">
            <h3 className="font-semibold mb-2">Preview</h3>
            <div className="text-sm mb-2">{preview.serviceable ? <span className="text-emerald-700">Serviceable</span> : <span className="text-destructive">Not Serviceable</span>} {preview.message}</div>
            <div className="space-y-2">
              {Array.isArray(preview.items) ? preview.items.map((it: any, idx: number) => (
                <div key={idx} className="flex justify-between text-xs">
                  <div>{it.productName || it.sku} x {it.quantity} {it.variantLabel ? `(${it.variantLabel})` : ''}</div>
                  <div className="text-right">
                    <div>{it.lineTotal ? `₹${it.lineTotal}` : ''}</div>
                    <div className="text-muted-foreground">{it.stockLabel || ''} {it.serviceable === false ? ' • Not serviceable' : ''}</div>
                  </div>
                </div>
              )) : <pre className="text-xs overflow-auto max-h-60">{JSON.stringify(preview, null, 2)}</pre>}
            </div>
          </div>
        )}
      </section>
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
