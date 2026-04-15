import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import addressesApi from "@/services/addressesApi";

const AddressesPage = () => {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<{ addressType?: string; contactName?: string; mobile?: string; line1?: string; city?: string; postalCode?: string }>({ addressType: 'HOME' });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await addressesApi.getAddresses();
        const list = (res && typeof res === 'object' && 'success' in res) ? (res.data || []) : res;
        if (mounted && Array.isArray(list)) setAddresses(list);
      } catch (_) {}
    })();
    return () => { mounted = false; };
  }, []);

  const handleSave = async () => {
    if (!form.addressType) { alert('Please select address type'); return; }
    if (!form.line1 || !form.city) { alert('Please provide address line and city'); return; }
    setLoading(true);
    try {
      const payload = { addressType: form.addressType, contactName: form.contactName || '', mobile: form.mobile || '', line1: form.line1, city: form.city, postalCode: form.postalCode || '' };
      const res = await addressesApi.createAddress(payload);
      const created = (res && typeof res === 'object' && 'success' in res) ? (res.data || res) : res;
      setAddresses((s) => (Array.isArray(s) ? [...s, created] : [created]));
      setForm({});
      alert('Address saved');
    } catch (err: any) { alert(err.message || 'Address creation failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold mb-6">My Addresses</h1>

        <div className="mb-8">
          <h2 className="font-semibold mb-2">Saved Addresses</h2>
          {addresses.length === 0 ? (
            <p className="text-sm text-muted-foreground">No saved addresses yet.</p>
          ) : (
            <div className="space-y-3">
              {addresses.map((a) => (
                <div key={a.id} className="p-3 border rounded">
                  <div className="font-medium">{a.contactName || a.line1}</div>
                  <div className="text-sm text-muted-foreground">{a.line1}{a.line2 ? `, ${a.line2}` : ''} {a.city ? `, ${a.city}` : ''} {a.postalCode ? ` - ${a.postalCode}` : ''}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-6">
          <h2 className="font-semibold mb-2">Add New Address</h2>
          <div className="space-y-3 max-w-md">
            <label className="text-sm">Address Type</label>
            <select value={form.addressType} onChange={(e) => setForm({ ...form, addressType: e.target.value })} className="w-48 border px-3 py-2 rounded">
              <option value="HOME">Home</option>
              <option value="WORK">Work</option>
              <option value="OTHER">Other</option>
            </select>
            <input placeholder="Contact name" value={form.contactName || ''} onChange={(e) => setForm({ ...form, contactName: e.target.value })} className="w-full border px-3 py-2 rounded" />
            <input placeholder="Mobile" value={form.mobile || ''} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="w-full border px-3 py-2 rounded" />
            <input placeholder="Address line 1" value={form.line1 || ''} onChange={(e) => setForm({ ...form, line1: e.target.value })} className="w-full border px-3 py-2 rounded" />
            <input placeholder="City" value={form.city || ''} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full border px-3 py-2 rounded" />
            <input placeholder="Postal Code" value={form.postalCode || ''} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} className="w-48 border px-3 py-2 rounded" />
            <div className="flex gap-3">
              <button onClick={handleSave} disabled={loading} className="px-4 py-2 bg-primary text-white rounded">{loading ? 'Saving...' : 'Save Address'}</button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AddressesPage;
