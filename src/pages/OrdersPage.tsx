import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useQuery } from '@tanstack/react-query';
import ordersApi from '@/services/ordersApi';
import { formatOrderStatus } from '@/lib/orderStatus';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useQuery(['orders', page], () => ordersApi.listOrders({ page, size: 10 }));
  const payload = (data && typeof data === 'object' && 'success' in data) ? (data.data || data) : data;

  // Redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem('rephyl_token');
    if (!token) window.location.href = '/login';
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : !payload || !payload.content || payload.content.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Order #</th>
                  <th className="py-2">Date</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Total</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {payload.content.map((o: any) => (
                  <tr key={o.id} className="border-b">
                    <td className="py-2">{o.orderNumber || o.id}</td>
                    <td className="py-2">{new Date(o.orderDate || o.confirmedAt || '').toLocaleString()}</td>
                    <td className="py-2">{formatOrderStatus(o.status)}</td>
                    <td className="py-2">₹{o.grandTotal?.toFixed(0) ?? o.subtotal}</td>
                    <td className="py-2"><Link to={`/orders/${o.id}`} className="text-primary">View</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default OrdersPage;
