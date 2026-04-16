import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import profileApi from '@/services/profileApi';
import RequireAuth from '@/components/RequireAuth';
import { User, LogOut, Save } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePageContent = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [form, setForm] = useState<any>({});
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await profileApi.getProfile();
        const payload = (res && typeof res === 'object' && 'success' in res) ? (res.data || res) : res;
        if (mounted && payload) { 
          setProfile(payload); 
          setForm({ 
            displayName: payload.displayName || '', 
            email: payload.email || '', 
            mobile: payload.mobile || '', 
            gstin: payload.gstin || '', 
            pan: payload.pan || '', 
            creditLimit: payload.creditLimit || 0,
            paymentTermsDays: payload.paymentTermsDays || 0,
            notes: payload.notes || '' 
          }); 
        }
      } catch (err) {
        console.error('Failed to fetch profile', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = { 
        displayName: form.displayName, 
        email: form.email, 
        mobile: form.mobile, 
        gstin: form.gstin, 
        pan: form.pan,
        creditLimit: form.creditLimit || 0,
        paymentTermsDays: form.paymentTermsDays || 0,
        notes: form.notes 
      };
      const res = await profileApi.updateProfile(payload);
      const out = (res && typeof res === 'object' && 'success' in res) ? (res.data || res) : res;
      alert('Profile updated successfully');
      setProfile(out);
    } catch (err: any) { 
      alert(err.message || 'Update failed'); 
    }
    finally { setLoading(false); }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="max-w-3xl mx-auto px-4 md:px-6 py-16 pt-[104px]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/50 rounded-full flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">My Profile</h1>
              <p className="text-muted-foreground">Logged in as {user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 text-destructive border border-destructive rounded-lg hover:bg-red-50 flex items-center gap-2 font-medium"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 md:p-8">
          <h2 className="text-lg font-semibold mb-6">Account Information</h2>
          
          <div className="grid gap-6 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Display Name *</label>
                <input 
                  value={form.displayName} 
                  onChange={(e) => setForm({ ...form, displayName: e.target.value })} 
                  className="w-full border border-border px-4 py-2 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Your display name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input 
                  type="email"
                  value={form.email} 
                  onChange={(e) => setForm({ ...form, email: e.target.value })} 
                  className="w-full border border-border px-4 py-2 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Mobile</label>
                <input 
                  value={form.mobile} 
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })} 
                  className="w-full border border-border px-4 py-2 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="10-digit mobile number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">GSTIN (Optional)</label>
                <input 
                  value={form.gstin} 
                  onChange={(e) => setForm({ ...form, gstin: e.target.value })} 
                  className="w-full border border-border px-4 py-2 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="GST Identification Number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">PAN (Optional)</label>
              <input 
                value={form.pan} 
                onChange={(e) => setForm({ ...form, pan: e.target.value })} 
                className="w-full border border-border px-4 py-2 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Permanent Account Number"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Credit Limit (₹)</label>
                <input 
                  type="number"
                  value={form.creditLimit} 
                  onChange={(e) => setForm({ ...form, creditLimit: parseFloat(e.target.value) || 0 })} 
                  className="w-full border border-border px-4 py-2 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="0"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Payment Terms (Days)</label>
                <input 
                  type="number"
                  value={form.paymentTermsDays} 
                  onChange={(e) => setForm({ ...form, paymentTermsDays: parseInt(e.target.value) || 0 })} 
                  className="w-full border border-border px-4 py-2 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Additional Notes</label>
              <textarea 
                value={form.notes} 
                onChange={(e) => setForm({ ...form, notes: e.target.value })} 
                rows={4}
                className="w-full border border-border px-4 py-2 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Add any additional information..."
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={handleSave} 
              disabled={loading} 
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
            >
              <Save size={18} />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {profile && (
          <div className="mt-8 p-4 bg-muted rounded-lg text-sm text-muted-foreground">
            <p className="font-medium mb-2">Account Details:</p>
            <div className="space-y-1 text-xs">
              <p>Customer ID: {profile.id}</p>
              <p>Person ID: {profile.personId}</p>
              <p>Customer Code: {profile.customerCode}</p>
              {profile.creditLimit ? <p>Credit Limit: ₹{profile.creditLimit}</p> : null}
              {profile.paymentTermsDays ? <p>Payment Terms: {profile.paymentTermsDays} days</p> : null}
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

const ProfilePage = () => (
  <RequireAuth>
    <ProfilePageContent />
  </RequireAuth>
);

export default ProfilePage;
