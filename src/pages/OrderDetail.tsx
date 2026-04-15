import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useQuery } from '@tanstack/react-query';
import ordersApi from '@/services/ordersApi';
import { formatOrderStatus } from '@/lib/orderStatus';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(['order', id], () => ordersApi.getOrderById(Number(id)), { enabled: !!id });
  const payload = (data && typeof data === 'object' && 'success' in data) ? (data.data || data) : data;

  useEffect(() => {
    const token = localStorage.getItem('rephyl_token');
    if (!token) navigate('/login');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="max-w-4xl mx-auto px-4 py-12">
        <button onClick={() => navigate(-1)} className="mb-4 text-sm text-primary">Back</button>
        {isLoading ? (
          <p>Loading...</p>
        ) : !payload ? (
          <p>Order not found.</p>
        ) : (
          <div>
            <h1 className="text-xl font-semibold mb-2">Order {payload.orderNumber || payload.id}</h1>
            <p className="mb-2">Status: {formatOrderStatus(payload.status)}</p>
            <p className="mb-4">Total: ₹{payload.grandTotal}</p>

            <h2 className="font-semibold mt-4 mb-2">Items</h2>
            <ul className="space-y-2">
              {payload.items && payload.items.map((it: any) => (
                <li key={it.id} className="flex justify-between border p-3 rounded">
                  <div>
                    <div className="font-medium">{it.productName}</div>
                    <div className="text-sm text-muted">{it.variantLabel}</div>
                  </div>
                  <div>
                    <div>Qty: {it.orderedQty ?? it.quantity}</div>
                    <div>₹{it.unitPrice}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default OrderDetail;
