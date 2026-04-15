import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { previewCheckout, startPaymentSession } from "@/services/checkoutApi";
import addressesApi from "@/services/addressesApi";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const [addressId, setAddressId] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<any | null>(null);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [newAddress, setNewAddress] = useState<{ addressType?: string; contactName?: string; mobile?: string; line1?: string; city?: string; postalCode?: string }>({ addressType: 'HOME' });
  const navigate = useNavigate();

  const buildPreviewRequest = () => {
    return {
      deliveryAddressId: addressId || null,
      items: items.map((i) => ({ variantId: (i as any).variantId || i.productId, quantity: i.quantity })),
    };
  };

  const handlePreview = async () => {
    setLoading(true);
    try {
      const body = buildPreviewRequest();
      const res = await previewCheckout(body);
      if (res && typeof res === 'object' && 'success' in res) {
        if (!res.success) throw new Error(res.message || 'Preview failed');
        setPreview(res.data || null);
      } else {
        setPreview(res || null);
      }
    } catch (err: any) {
      alert(err.message || "Preview failed");
    } finally {
      setLoading(false);
    }
  };

  const handleStart = async () => {
    setLoading(true);
    try {
      // Ensure preview was called and address is serviceable
      if (preview && preview.serviceable === false) throw new Error(preview.message || 'Address not serviceable');
      const body = buildPreviewRequest();
      const res = await startPaymentSession(body);
      if (res && typeof res === 'object' && 'success' in res && res.success === false) throw new Error(res.message || 'Start failed');
      // For demo: assume success and clear cart, navigate to homepage
      clearCart();
      navigate("/", { replace: true });
      alert("Order created (demo): " + JSON.stringify(res));
    } catch (err: any) {
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
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-16">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        {preview && preview.serviceable === false && (
          <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded">
            <div className="font-semibold">Delivery not serviceable</div>
            <div className="text-sm">{preview.message}</div>
            <div className="mt-2 text-sm">
              <a
                href={typeof preview.postalCode !== 'undefined' ? `mailto:care@rephyl.com?subject=${encodeURIComponent(`Serviceability issue for pincode ${preview.postalCode}`)}&body=${encodeURIComponent(preview.message || '')}` : 'mailto:care@rephyl.com'}
                className="underline"
              >Contact support</a>
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
          <button onClick={handlePreview} disabled={loading} className="px-4 py-2 bg-primary text-primary-foreground rounded">{loading ? "Working..." : "Validate & Preview"}</button>
          <button onClick={handleStart} disabled={loading || items.length === 0 || (preview && preview.serviceable === false)} className="px-4 py-2 bg-emerald-700 text-white rounded">{loading ? "Starting..." : "Start Payment Session"}</button>
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

export default CheckoutPage;
