import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useQuery } from '@tanstack/react-query';
import ordersApi from '@/services/ordersApi';
import { formatOrderStatus } from '@/lib/orderStatus';
import RequireAuth from '@/components/RequireAuth';
import { ArrowLeft, Package, XCircle, Truck, Leaf } from 'lucide-react';

const CANCELLABLE_STATUSES = ['PENDING_PAYMENT', 'CONFIRMED'];

const formatDateTime = (value?: string | null) => {
  if (!value) return 'N/A';

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

const OrderDetailContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState('');
  const [isDownloadingInvoice, setIsDownloadingInvoice] = useState(false);
  const [invoiceError, setInvoiceError] = useState('');

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['order', id],
    queryFn: () => ordersApi.getOrderById(Number(id)),
    enabled: !!id,
    retry: 2,
    staleTime: 10000,
  });

  // Parse wrapped / direct payload safely
  let payload: any = null;

  if (data) {
    try {
      if (typeof data === 'object') {
        if ('success' in data && data.success === true) {
          payload = data.data || null;
        } else if ('id' in data || 'orderNumber' in data) {
          payload = data;
        } else if ('success' in data && data.data) {
          payload = data.data;
        }
      }
    } catch (err) {
      console.error('Order detail parse error:', err);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('rephyl_token');
    if (!token) navigate('/login');
  }, [navigate]);

  const getStatusColor = (status: string) => {
    if (!status) return 'bg-gray-50 text-gray-700 border-gray-200';
    if (status.includes('PENDING')) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    if (status.includes('CONFIRMED')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (status.includes('PACKED')) return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    if (status.includes('SHIPPED')) return 'bg-purple-50 text-purple-700 border-purple-200';
    if (status.includes('DELIVERED')) return 'bg-green-50 text-green-700 border-green-200';
    if (status.includes('CANCELLED')) return 'bg-red-50 text-red-700 border-red-200';
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const handleCancelOrder = async () => {
    if (!id || !window.confirm('Are you sure you want to cancel this order?')) return;
    setCancelling(true);
    setCancelError('');
    try {
      await ordersApi.cancelOrder(Number(id));
      await refetch();
    } catch (err: any) {
      setCancelError(err?.message || 'Could not cancel the order. Please try again.');
    } finally {
      setCancelling(false);
    }
  };

  const isDelivered = String(payload?.status || '').toUpperCase().includes('DELIVERED');

  const handleDownloadInvoice = async () => {
    if (!id) return;

    setIsDownloadingInvoice(true);
    setInvoiceError('');

    try {
      const { blob, fileName } = await ordersApi.getOrderInvoice(Number(id));
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (err: any) {
      setInvoiceError(err?.message || 'Failed to download invoice. Please try again.');
    } finally {
      setIsDownloadingInvoice(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1">

      <section className="max-w-4xl mx-auto px-4 md:px-6 py-16 pt-[104px]">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="ml-3 text-muted-foreground">Loading order...</p>
          </div>
        ) : error ? (
          <div className="border border-red-200 bg-red-50 rounded-lg p-5 text-center">
            <p className="text-red-700 font-medium">Failed to load order.</p>
            <button
              onClick={() => refetch()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Retry
            </button>
          </div>
        ) : !payload ? (
          <div className="text-center py-16">
            <Package size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-lg text-muted-foreground">Order not found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div className="border border-border rounded-xl p-6 bg-card">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">
                    Order #{payload.orderNumber || payload.id}
                  </h1>

                  <p className="text-sm text-muted-foreground mt-2">
                    {new Date(
                      payload.orderDate ||
                        payload.confirmedAt ||
                        payload.createdAt
                    ).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                <div className="text-left md:text-right space-y-2">
                  <p className="text-2xl font-bold">
                    ₹{(payload.grandTotal || 0).toFixed(0)}
                  </p>

                  <div
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                      payload.status
                    )}`}
                  >
                    {formatOrderStatus(payload.status)}
                  </div>

                  {CANCELLABLE_STATUSES.includes(payload.status) && (
                    <div>
                      <button
                        onClick={handleCancelOrder}
                        disabled={cancelling}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-300 text-red-600 text-xs font-semibold hover:bg-red-50 disabled:opacity-60 transition-colors"
                      >
                        <XCircle size={14} />
                        {cancelling ? 'Cancelling...' : 'Cancel Order'}
                      </button>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Cancellation is available while the order is pending payment or confirmed. Once it is packed, shipped, or delivered, cancellation is blocked.
                      </p>
                    </div>
                  )}
                  {cancelError && (
                    <p className="text-xs text-red-600">{cancelError}</p>
                  )}

                  {isDelivered && (
                    <div>
                      <button
                        onClick={handleDownloadInvoice}
                        disabled={isDownloadingInvoice}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary/30 text-primary text-xs font-semibold hover:bg-primary/5 disabled:opacity-60 transition-colors"
                      >
                        {isDownloadingInvoice ? 'Generating Invoice...' : 'Download Invoice'}
                      </button>
                      {invoiceError && (
                        <p className="mt-2 text-xs text-red-600">{invoiceError}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-border rounded-xl p-5 bg-card">
                <h2 className="font-semibold mb-3">Order Information</h2>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between gap-4"><span>Order Number</span><span className="text-foreground font-medium">{payload.orderNumber || 'N/A'}</span></div>
                  <div className="flex justify-between gap-4"><span>Status</span><span className="text-right text-foreground font-medium">{formatOrderStatus(payload.status)}</span></div>
                  <div className="flex justify-between gap-4"><span>Order Date</span><span className="text-right text-foreground font-medium">{formatDateTime(payload.orderDate)}</span></div>
                  <div className="flex justify-between gap-4"><span>Confirmed At</span><span className="text-right text-foreground font-medium">{formatDateTime(payload.confirmedAt)}</span></div>
                  <div className="flex justify-between gap-4"><span>Customer Name</span><span className="text-foreground font-medium">{payload.customerName || payload.shipToName || 'N/A'}</span></div>
                  {payload.remarks && <div className="pt-2 border-t"><span className="block text-xs uppercase tracking-wide mb-1">Remarks</span><p className="text-foreground">{payload.remarks}</p></div>}
                </div>
              </div>

              <div className="border border-border rounded-xl p-5 bg-card">
                <h2 className="font-semibold mb-3">Delivery Information</h2>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between gap-4"><span>Ship To</span><span className="text-foreground font-medium">{payload.shipToName || 'N/A'}</span></div>
                  <div className="flex justify-between gap-4"><span>Phone</span><span className="text-foreground font-medium">{payload.shipToPhone || 'N/A'}</span></div>
                  <div className="pt-2 border-t">
                    <span className="block text-xs uppercase tracking-wide mb-1">Address</span>
                    <p className="text-foreground">{payload.shipToAddress || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracking */}
            {(payload.trackingNumber || payload.shippingPartnerName) && (
              <div className="border border-border rounded-xl p-5 bg-card flex items-start gap-3">
                <Truck size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm space-y-1">
                  <p className="font-semibold">Shipping</p>
                  {payload.shippingPartnerName && (
                    <p className="text-muted-foreground">Partner: {payload.shippingPartnerName}</p>
                  )}
                  {payload.trackingNumber && (
                    <p className="text-muted-foreground">
                      Tracking #:{' '}
                      {payload.trackingNumber}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Summary */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-border rounded-xl p-5 bg-card">
                <h2 className="font-semibold mb-3">Payment</h2>
                <p className="text-sm text-muted-foreground">
                  Method: {payload.paymentMethod || 'N/A'}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Status: {formatOrderStatus(payload.status)}
                </p>

              </div>

              <div className="border border-border rounded-xl p-5 bg-card">
                <h2 className="font-semibold mb-3">Totals</h2>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Order ID</span>
                    <span className="font-medium">{payload.id ?? 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{payload.subtotal || 0}</span>
                  </div>
                  {payload.shippingAmount > 0 && (
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>₹{payload.shippingAmount}</span>
                    </div>
                  )}
                  {(payload.couponDiscountAmount > 0 || payload.discountAmount > 0) && (
                    <div className="flex justify-between text-[#388e3c]">
                      <span>Discount</span>
                      <span>-₹{payload.couponDiscountAmount || payload.discountAmount || 0}</span>
                    </div>
                  )}
                  {payload.greenPointsRedemptionValue > 0 && (
                    <div className="flex justify-between text-[#388e3c]">
                      <span className="flex items-center gap-1"><Leaf size={12} /> Green Points</span>
                      <span>-₹{payload.greenPointsRedemptionValue}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold pt-2 border-t mt-2">
                    <span>Total</span>
                    <span>₹{payload.grandTotal || 0}</span>
                  </div>
                </div>
                {(payload.greenPointsEarned > 0 || payload.greenPointsRedeemed > 0) && (
                  <div className="mt-3 pt-3 border-t border-dashed text-xs space-y-1 text-[#388e3c] font-medium">
                    {payload.greenPointsEarned > 0 && (
                      <p className="flex items-center gap-1"><Leaf size={11} /> +{payload.greenPointsEarned} Green Points earned</p>
                    )}
                    {payload.greenPointsRedeemed > 0 && (
                      <p className="flex items-center gap-1"><Leaf size={11} /> {payload.greenPointsRedeemed} pts redeemed = ₹{payload.greenPointsRedemptionValue}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Items */}
            <div className="border border-border rounded-xl p-6 bg-card">
              <h2 className="text-lg font-semibold mb-4">Items</h2>

              <div className="space-y-4">
                {payload.items?.map((item: any) => (
                  <div
                    key={item.id}
                    className="border border-border rounded-lg p-4 flex justify-between gap-4"
                  >
                    <div>
                      <p className="font-medium">
                        {item.productName || 'Product'}
                      </p>

                      {item.variantLabel && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.variantLabel}
                        </p>
                      )}

                      {item.sku && (
                        <p className="text-xs text-muted-foreground mt-1">
                          SKU: {item.sku}
                        </p>
                      )}
                    </div>

                    <div className="text-right text-sm">
                      <p>Qty: {item.orderedQty ?? item.quantity ?? 1}</p>
                      <p className="font-semibold mt-1">
                        ₹{item.lineTotal || item.unitPrice || 0}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </section>

      </main>
      <Footer />
    </div>
  );
};

const OrderDetail = () => (
  <RequireAuth>
    <OrderDetailContent />
  </RequireAuth>
);

export default OrderDetail;