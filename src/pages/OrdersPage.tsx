import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useQuery } from '@tanstack/react-query';
import ordersApi from '@/services/ordersApi';
import { formatOrderStatus } from '@/lib/orderStatus';
import { Link } from 'react-router-dom';
import RequireAuth from '@/components/RequireAuth';
import {
  Package,
  ChevronRight,
  Filter,
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

const OrdersPageContent = () => {
  const [page, setPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState('');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['orders', page, statusFilter],
    queryFn: () =>
      ordersApi.listOrders({
        page,
        size: 10,
        sortBy: 'orderDate',
        direction: 'DESC',
        status: statusFilter || undefined,
      }),
    retry: 2,
    staleTime: 10000,
  });

  // Safe response parser
  let payload: any = null;

  if (data) {
    try {
      if (typeof data === 'object') {
        if ('success' in data && data.success === true) {
          payload = data.data || null;
        } else if ('content' in data) {
          payload = data;
        } else if ('success' in data && data.data) {
          payload = data.data;
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  const orders = payload?.content || [];
  const totalPages = payload?.totalPages || 0;

  const statusOptions = [
    { value: '', label: 'All Orders' },
    { value: 'PENDING_PAYMENT', label: 'Pending Payment' },
    { value: 'CONFIRMED', label: 'Confirmed' },
    { value: 'PACKED', label: 'Packed' },
    { value: 'SHIPPED', label: 'Shipped' },
    { value: 'DELIVERED', label: 'Delivered' },
    { value: 'CANCELLED', label: 'Cancelled' },
  ];

  const getStatusColor = (status: string) => {
    if (!status) return 'bg-gray-50 text-gray-700 border-gray-200';
    if (status.includes('PENDING'))
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    if (status.includes('CONFIRMED'))
      return 'bg-blue-50 text-blue-700 border-blue-200';
    if (status.includes('PACKED'))
      return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    if (status.includes('SHIPPED'))
      return 'bg-purple-50 text-purple-700 border-purple-200';
    if (status.includes('DELIVERED'))
      return 'bg-green-50 text-green-700 border-green-200';
    if (status.includes('CANCELLED'))
      return 'bg-red-50 text-red-700 border-red-200';

    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="max-w-5xl mx-auto px-4 md:px-6 py-16 pt-[104px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">My Orders</h1>
            <p className="text-muted-foreground mt-2">
              Track, manage and review your purchases
            </p>
          </div>

          <div className="hidden md:flex h-14 w-14 rounded-2xl bg-primary/10 items-center justify-center">
            <ShoppingBag className="text-primary" size={26} />
          </div>
        </div>

        {/* Filter */}
        <div className="mb-8 flex items-center gap-3 bg-card border border-border rounded-xl p-4">
          <Filter size={18} className="text-muted-foreground" />

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(0);
            }}
            className="w-full md:w-72 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {statusOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="mt-4 text-muted-foreground">Loading orders...</p>
          </div>
        ) : error ? (
          /* Error */
          <div className="border border-red-200 bg-red-50 rounded-xl p-6 text-center">
            <p className="text-red-700 font-medium">
              Failed to load your orders.
            </p>

            <button
              onClick={() => refetch()}
              className="mt-4 px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        ) : orders.length === 0 ? (
          /* Empty */
          <div className="py-20 text-center border border-border rounded-2xl bg-card">
            <Package
              size={54}
              className="mx-auto text-muted-foreground/30 mb-4"
            />

            <h2 className="text-xl font-semibold mb-2">No Orders Found</h2>

            <p className="text-muted-foreground mb-6">
              {statusFilter
                ? 'Try changing the filter to view more orders.'
                : 'Looks like you haven’t placed an order yet.'}
            </p>

            <Link
              to="/shop"
              className="inline-flex px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Orders */}
            <div className="space-y-5">
              {orders.map((order: any) => (
                <Link
                  key={order.id}
                  to={`/orders/${order.id}`}
                  className="block border border-border rounded-2xl bg-card p-5 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                    {/* Left */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">
                          Order #{order.orderNumber || order.id}
                        </h3>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {formatOrderStatus(order.status)}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">
                        {new Date(
                          order.orderDate ||
                            order.confirmedAt ||
                            order.createdAt
                        ).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>

                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {order.items?.length || 1}
                        </span>{' '}
                        item{(order.items?.length || 1) > 1 ? 's' : ''}
                      </div>
                    </div>

                    {/* Right */}
                    <div className="md:text-right">
                      <p className="text-2xl font-bold">
                        ₹{(order.grandTotal || 0).toFixed(0)}
                      </p>

                      <div className="mt-4 inline-flex items-center gap-1 text-primary font-medium">
                        View Details
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border border-border rounded-2xl p-4 bg-card">
                <button
                  onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                  disabled={page === 0}
                  className="px-4 py-2 rounded-xl border border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition inline-flex items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  Previous
                </button>

                <p className="text-sm text-muted-foreground">
                  Page <span className="font-semibold">{page + 1}</span> of{' '}
                  <span className="font-semibold">{totalPages}</span>
                </p>

                <button
                  onClick={() =>
                    setPage((prev) =>
                      Math.min(totalPages - 1, prev + 1)
                    )
                  }
                  disabled={page >= totalPages - 1}
                  className="px-4 py-2 rounded-xl border border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition inline-flex items-center gap-2"
                >
                  Next
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <Footer />
    </div>
  );
};

const OrdersPage = () => (
  <RequireAuth>
    <OrdersPageContent />
  </RequireAuth>
);

export default OrdersPage;