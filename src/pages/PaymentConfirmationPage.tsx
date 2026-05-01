import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, CircleAlert, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RequireAuth from "@/components/RequireAuth";
import { useCart } from "@/contexts/CartContext";
import { verifyPaymentSession } from "@/services/checkoutApi";

type VerificationPayload = {
  expiresAt?: string;
  paymentMethod?: string;
  gateway?: string;
  merchantOrderId?: string;
  paymentSessionId?: string;
  cashfreeMode?: string;
  paymentStatus?: string;
  totalAmount?: number;
  orders?: any[];
};

const PaymentConfirmationPageContent = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const merchantOrderId = searchParams.get("merchantOrderId") || "";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [payload, setPayload] = useState<VerificationPayload | null>(null);
  const cartCleared = useRef(false);

  const paymentStatus = payload?.paymentStatus || "PENDING";
  const isPaid = paymentStatus === "PAID";
  const retryAllowed = useMemo(() => {
    if (isPaid) return false;
    if (!payload?.expiresAt) return true;
    return new Date(payload.expiresAt).getTime() > Date.now();
  }, [isPaid, payload?.expiresAt]);

  const verifyNow = async () => {
    if (!merchantOrderId) return;
    setLoading(true);
    setError("");
    try {
      const res = await verifyPaymentSession(merchantOrderId);
      const data = (res && typeof res === "object" && "success" in res) ? ((res as any).data || null) : res;
      if (!data) {
        throw new Error("Empty verify response");
      }
      setPayload(data as VerificationPayload);
    } catch (err: any) {
      setError(err?.message || "Unable to verify payment status right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!merchantOrderId) return;
    void verifyNow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [merchantOrderId]);

  useEffect(() => {
    if (merchantOrderId) return;

    navigate("/checkout", { replace: true });
  }, [merchantOrderId, navigate]);

  useEffect(() => {
    if (!isPaid || cartCleared.current) return;
    cartCleared.current = true;
    clearCart();
  }, [isPaid, clearCart]);

  useEffect(() => {
    if (!payload || isPaid) return;

    navigate("/checkout", {
      replace: true,
      state: {
        paymentRetry: true,
        merchantOrderId,
        paymentStatus,
        retryAllowed,
      },
    });
  }, [payload, isPaid, merchantOrderId, navigate, paymentStatus, retryAllowed]);

  useEffect(() => {
    if (loading || payload || !error) return;

    navigate("/checkout", {
      replace: true,
      state: {
        paymentRetry: true,
        merchantOrderId,
        paymentStatus: "UNKNOWN",
        retryAllowed: true,
      },
    });
  }, [error, loading, merchantOrderId, navigate, payload]);

  if (!merchantOrderId) {
    return null;
  }

  if (!payload && loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <section className="max-w-5xl mx-auto px-4 md:px-6 py-16 pt-[104px]">
          <div className="border border-border rounded-2xl p-6 bg-card flex items-center gap-3 text-muted-foreground">
            <Loader2 size={18} className="animate-spin" />
            <span>Verifying payment...</span>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (!payload || !isPaid) {
    return null;
  }

  const statusClassName = isPaid
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : paymentStatus === "PENDING"
      ? "bg-yellow-50 text-yellow-700 border-yellow-200"
      : "bg-red-50 text-red-700 border-red-200";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-16 pt-[104px]">
        <div className="mb-8 border border-border rounded-2xl p-6 bg-card">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Payment Confirmation</h1>
              <p className="text-muted-foreground mt-2">
                {merchantOrderId ? `Merchant Order: ${merchantOrderId}` : "Missing merchant order id"}
              </p>
            </div>

            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-semibold ${statusClassName}`}>
              {isPaid ? <CheckCircle2 size={16} /> : paymentStatus === "PENDING" ? <Loader2 size={16} className="animate-spin" /> : <CircleAlert size={16} />}
              <span>{paymentStatus}</span>
            </div>
          </div>

          {!merchantOrderId && (
            <div className="mt-5 p-4 rounded-lg border border-red-200 bg-red-50 text-red-700">
              Missing merchant order id. Please restart checkout.
            </div>
          )}

          {error && (
            <div className="mt-5 p-4 rounded-lg border border-red-200 bg-red-50 text-red-700">
              {error}
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/orders")}
              className="px-4 py-2 rounded-lg border border-border hover:bg-accent"
            >
              View Orders
            </button>

            <Link to="/shop" className="px-4 py-2 rounded-lg border border-border hover:bg-accent">
              Continue Shopping
            </Link>
          </div>
        </div>

        {payload && (
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="border border-border rounded-xl p-5 bg-card">
              <h2 className="font-semibold mb-3">Payment</h2>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Method: {payload.paymentMethod || "CASHFREE"}</p>
                <p>Gateway: {payload.gateway || "CASHFREE"}</p>
                <p>Status: {paymentStatus}</p>
                {payload.expiresAt && <p>Expires At: {new Date(payload.expiresAt).toLocaleString("en-IN")}</p>}
              </div>
            </div>

            <div className="border border-border rounded-xl p-5 bg-card">
              <h2 className="font-semibold mb-3">Totals</h2>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Total Amount</span>
                  <span className="font-semibold">₹{payload.totalAmount || 0}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="border border-border rounded-xl p-6 bg-card">
          <h2 className="text-lg font-semibold mb-4">Orders</h2>

          {!payload?.orders || payload.orders.length === 0 ? (
            <p className="text-sm text-muted-foreground">Order details will appear after verification.</p>
          ) : (
            <div className="space-y-4">
              {payload.orders.map((order: any) => (
                <div key={order.id || order.orderNumber} className="border border-border rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">Order #{order.orderNumber || order.id}</h3>
                      <p className="text-sm text-muted-foreground mt-1">Status: {order.status || "PENDING_PAYMENT"}</p>
                      {order.paymentConfirmedAt && (
                        <p className="text-sm text-muted-foreground">Confirmed At: {new Date(order.paymentConfirmedAt).toLocaleString("en-IN")}</p>
                      )}
                    </div>
                    <div className="text-left md:text-right">
                      <p className="font-semibold">₹{order.grandTotal || order.totalAmount || payload?.totalAmount || 0}</p>
                      {order.id && (
                        <Link to={`/orders/${order.id}`} className="text-sm text-primary hover:underline">
                          View Details
                        </Link>
                      )}
                    </div>
                  </div>

                  {Array.isArray(order.items) && order.items.length > 0 && (
                    <div className="mt-4 border-t border-border pt-3 space-y-2">
                      {order.items.map((item: any) => (
                        <div key={item.id || `${item.productId}-${item.variantId}`} className="flex justify-between text-sm">
                          <div>
                            <p>{item.productName || item.sku || "Item"}</p>
                            {item.variantLabel && <p className="text-xs text-muted-foreground">{item.variantLabel}</p>}
                          </div>
                          <div className="text-right">
                            <p>Qty: {item.orderedQty ?? item.quantity ?? 1}</p>
                            <p className="font-medium">₹{item.lineTotal ?? (item.unitPrice || 0) * (item.orderedQty ?? item.quantity ?? 1)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

const PaymentConfirmationPage = () => (
  <RequireAuth>
    <PaymentConfirmationPageContent />
  </RequireAuth>
);

export default PaymentConfirmationPage;
