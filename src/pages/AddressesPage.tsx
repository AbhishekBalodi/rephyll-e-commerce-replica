import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import addressesApi from "@/services/addressesApi";
import RequireAuth from "@/components/RequireAuth";
import { Trash2, Edit2, Check, MapPin } from "lucide-react";

const AddressesPageContent = () => {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState<{ addressType?: string; contactName?: string; mobile?: string; line1?: string; line2?: string; city?: string; state?: string; postalCode?: string; isDefault?: boolean }>({ addressType: 'HOME' });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await addressesApi.getAddresses();
        const list = (res && typeof res === 'object' && 'success' in res) ? (res.data || []) : res;
        if (mounted && Array.isArray(list)) setAddresses(list);
      } catch (err) {
        console.error('Failed to fetch addresses', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleSave = async () => {
    if (!form.addressType) { alert('Please select address type'); return; }
    if (!form.line1 || !form.city) { alert('Please provide address line and city'); return; }
    setLoading(true);
    try {
      const payload = { 
        addressType: form.addressType, 
        contactName: form.contactName || '', 
        mobile: form.mobile || '', 
        line1: form.line1, 
        line2: form.line2 || '',
        city: form.city, 
        state: form.state || '',
        postalCode: form.postalCode || '',
        isDefault: form.isDefault || false
      };
      
      if (editing) {
        // Update existing address
        const res = await addressesApi.updateAddress(editing, payload);
        const updated = (res && typeof res === 'object' && 'success' in res) ? (res.data || res) : res;
        setAddresses((s) => s.map((a) => a.id === editing ? updated : a));
        alert('Address updated successfully');
        setEditing(null);
      } else {
        // Create new address
        const res = await addressesApi.createAddress(payload);
        const created = (res && typeof res === 'object' && 'success' in res) ? (res.data || res) : res;
        setAddresses((s) => (Array.isArray(s) ? [...s, created] : [created]));
        alert('Address saved successfully');
      }
      
      setForm({ addressType: 'HOME' });
    } catch (err: any) { 
      alert(err.message || (editing ? 'Address update failed' : 'Address creation failed')); 
    }
    finally { setLoading(false); }
  };

  const handleEdit = (address: any) => {
    setEditing(address.id);
    setForm({
      addressType: address.addressType,
      contactName: address.contactName,
      mobile: address.mobile,
      line1: address.line1,
      line2: address.line2,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      isDefault: address.isDefault,
    });
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditing(null);
    setForm({ addressType: 'HOME' });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;
    setDeleting(id);
    try {
      console.log(`🗑️ Attempting to delete address ${id}...`);
      await addressesApi.deleteAddress(id);
      setAddresses((s) => s.filter((a) => a.id !== id));
      alert('✅ Address deleted successfully');
    } catch (err: any) {
      console.error('❌ Delete error:', err);
      const errorMsg = err.message || 'Failed to delete address';
      
      // Provide helpful error messages
      if (errorMsg.includes('404')) {
        alert('⚠️ Delete address is not yet available. Please contact support or try again later.');
      } else if (errorMsg.includes('401') || errorMsg.includes('403')) {
        alert('⚠️ You do not have permission to delete this address.');
      } else {
        alert(`Error: ${errorMsg}`);
      }
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-16 pt-[104px]">
        <h1 className="text-3xl font-bold mb-2">My Addresses</h1>
        <p className="text-muted-foreground mb-8">Manage your delivery and billing addresses</p>

        {/* Status Banner - Removed as features now available */}

        <div className="mb-12">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MapPin size={20} />
            Saved Addresses
          </h2>
          {addresses.length === 0 ? (
            <p className="text-sm text-muted-foreground bg-muted p-4 rounded">No saved addresses yet. Add one below.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {addresses.map((a) => (
                <div key={a.id} className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-foreground">{a.contactName || 'Address'}</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wide">{a.addressType}</div>
                    </div>
                    {a.isDefault && (
                      <div className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">Default</div>
                    )}
                  </div>
                  <div className="text-sm text-foreground mb-3 space-y-1">
                    <div>{a.line1}</div>
                    {a.line2 && <div>{a.line2}</div>}
                    <div>{a.city}{a.state ? `, ${a.state}` : ''}</div>
                    {a.postalCode && <div className="font-medium">{a.postalCode}</div>}
                    {a.mobile && <div className="text-muted-foreground text-xs">{a.mobile}</div>}
                  </div>
                  <div className="flex gap-3 justify-between">
                    <button
                      onClick={() => handleEdit(a)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 transition-colors"
                    >
                      <Edit2 size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      disabled={deleting === a.id}
                      className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 size={14} />
                      {deleting === a.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-6">{editing ? 'Edit Address' : 'Add New Address'}</h2>
          <div className="grid gap-4 max-w-2xl">
            <div>
              <label className="text-sm font-medium mb-2 block">Address Type *</label>
              <select 
                value={form.addressType || 'HOME'} 
                onChange={(e) => setForm({ ...form, addressType: e.target.value })} 
                className="w-full border border-border px-3 py-2 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="HOME">Home</option>
                <option value="WORK">Work</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium mb-2 block">Contact Name</label>
                <input 
                  placeholder="Full name" 
                  value={form.contactName || ''} 
                  onChange={(e) => setForm({ ...form, contactName: e.target.value })} 
                  className="w-full border border-border px-3 py-2 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Mobile</label>
                <input 
                  placeholder="10-digit mobile number" 
                  value={form.mobile || ''} 
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })} 
                  className="w-full border border-border px-3 py-2 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Address Line 1 *</label>
              <input 
                placeholder="Street address" 
                value={form.line1 || ''} 
                onChange={(e) => setForm({ ...form, line1: e.target.value })} 
                className="w-full border border-border px-3 py-2 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Address Line 2</label>
              <input 
                placeholder="Apartment, suite, etc. (optional)" 
                value={form.line2 || ''} 
                onChange={(e) => setForm({ ...form, line2: e.target.value })} 
                className="w-full border border-border px-3 py-2 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="text-sm font-medium mb-2 block">City *</label>
                <input 
                  placeholder="City" 
                  value={form.city || ''} 
                  onChange={(e) => setForm({ ...form, city: e.target.value })} 
                  className="w-full border border-border px-3 py-2 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">State</label>
                <input 
                  placeholder="State" 
                  value={form.state || ''} 
                  onChange={(e) => setForm({ ...form, state: e.target.value })} 
                  className="w-full border border-border px-3 py-2 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Postal Code *</label>
                <input 
                  placeholder="Postal code" 
                  value={form.postalCode || ''} 
                  onChange={(e) => setForm({ ...form, postalCode: e.target.value })} 
                  className="w-full border border-border px-3 py-2 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input 
                type="checkbox"
                checked={form.isDefault || false}
                onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                className="rounded"
              />
              <label className="ml-2 text-sm">Set as default address</label>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={handleSave} 
                disabled={loading} 
                className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Check size={18} />
                {loading ? 'Saving...' : 'Save Address'}
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

const AddressesPage = () => (
  <RequireAuth>
    <AddressesPageContent />
  </RequireAuth>
);

export default AddressesPage;
