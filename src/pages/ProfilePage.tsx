import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import profileApi from '@/services/profileApi';

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await profileApi.getProfile();
        const payload = (res && typeof res === 'object' && 'success' in res) ? (res.data || res) : res;
        if (mounted) { setProfile(payload); setForm({ displayName: payload.displayName || '', email: payload.email || '', mobile: payload.mobile || '', gstin: payload.gstin || '', pan: payload.pan || '', notes: payload.notes || '' }); }
      } catch (_) {}
    })();
    return () => { mounted = false; };
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = { displayName: form.displayName, email: form.email, mobile: form.mobile, gstin: form.gstin, pan: form.pan, notes: form.notes };
      const res = await profileApi.updateProfile(payload);
      const out = (res && typeof res === 'object' && 'success' in res) ? (res.data || res) : res;
      alert('Profile updated');
      setProfile(out);
    } catch (err: any) { alert(err.message || 'Update failed'); }
    finally { setLoading(false); }
  };

  const token = localStorage.getItem('rephyl_token');
  if (!token) { window.location.href = '/login'; return null; }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block text-sm mb-1">Mobile</label>
            <input value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block text-sm mb-1">GSTIN</label>
            <input value={form.gstin} onChange={(e) => setForm({ ...form, gstin: e.target.value })} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block text-sm mb-1">PAN</label>
            <input value={form.pan} onChange={(e) => setForm({ ...form, pan: e.target.value })} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block text-sm mb-1">Notes</label>
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full border px-3 py-2 rounded" />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={loading} className="px-4 py-2 bg-primary text-white rounded">{loading ? 'Saving...' : 'Save'}</button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProfilePage;
