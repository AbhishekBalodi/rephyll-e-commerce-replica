import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useQuery } from '@tanstack/react-query';
import ordersApi from '@/services/ordersApi';
import { formatOrderStatus } from '@/lib/orderStatus';
import { Link } from 'react-router-dom';
import RequireAuth from '@/components/RequireAuth';
import { Package, ChevronRight, Filter } from 'lucide-react';

const OrdersPageContent = () => {
  const [page, setPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState<string>('');
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['orders', page, statusFilter],
    queryFn: () => ordersApi.listOrders({ page, size: 10, status: statusFilter || undefined }),
    retry: 2,
    staleTime: 10000,
  });
  
  // Log data for debugging
  useEffect(() => {
    console.log('📦 OrdersPage data:', data);
    console.log('📦 OrdersPage error:', error);
    console.log('📦 OrdersPage isLoading:', isLoading);
  }, [data, error, isLoading]);
  
  // Handle response structure - extract data from ApiResponse wrapper
  let payload = null;
  if (data) {
    console.log('📦 Raw API response:', data);
    try {
      if (typeof data === 'object') {
        // Check if response has success property (ApiResponse wrapper)
        if ('success' in data && data.success === true) {
          payload = data.data || null;
          console.log('✅ Parsed from ApiResponse wrapper, payload:', payload);
        } 
        // Check if it's a PageResponse directly
        else if ('content' in data && Array.isArray(data.content)) {
          payload = data;
          console.log('✅ Using as PageResponse directly, payload:', payload);
        }
        // Sometimes backend returns success=false - still try to show data
        else if ('success' in data && data.success === false) {
          console.warn('⚠️ API returned success=false, message:', data.message);
          // Try to extract data anyway
          payload = data.data || null;
        }
        else {
          console.warn('⚠️ Unknown response structure:', data);
        }
      }
    } catch (e) {
      console.error('❌ Error parsing response:', e);
    }
  }
  
  console.log('📦 Final processed payload:', { 
    exists: !!payload, 
    hasContent: !!payload?.content, 
    contentLength: payload?.content?.length, 
    totalPages: payload?.totalPages 
  });

  const getStatusColor = (status: string) => {
    if (status.includes('PENDING')) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    if (status.includes('CONFIRMED')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (status.includes('SHIPPED')) return 'bg-purple-50 text-purple-700 border-purple-200';
    if (status.includes('DELIVERED')) return 'bg-green-50 text-green-700 border-green-200';
    if (status.includes('CANCELLED')) return 'bg-red-50 text-red-700 border-red-200';
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const statusOptions = [
    { value: '', label: 'All Orders' },
    { value: 'PENDING_PAYMENT', label: 'Pending Payment' },
    { value: 'CONFIRMED', label: 'Confirmed' },
    { value: 'PACKED', label: 'Packed' },
    { value: 'SHIPPED', label: 'Shipped' },
    { value: 'DELIVERED', label: 'Delivered' },
    { value: 'CANCELLED', label: 'Cancelled' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-16 pt-[104px]">
        {/* DEBUG INFO - REMOVE LATER */}
        <div className="mb-4 p-3 bg-blue-100 border border-blue-300 rounded text-xs text-blue-900 font-mono overflow-auto max-h-40">
          <div><strong>🔍 DEBUG INFO:</strong></div>
          <div>Loading: {String(isLoading)}</div>
          <div>Has Data: {String(!!data)}</div>
          <div>Has Error: {String(!!error)} {error && ` - ${error.message}`}</div>
          <div>Payload Exists: {String(!!payload)}</div>
          <div>Content Count: {payload?.content?.length || 0}</div>
          <div>Total Pages: {payload?.totalPages || 'N/A'}</div>
          <div>Current Page: {page}</div>
          <div className="mt-2 text-blue-700">👉 Check browser console (F12) for full API response details</div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">Track and manage your orders</p>
        </div>

        {/* Status Filter */}
        <div className="mb-6 flex items-center gap-3">
          <Filter size={18} className="text-muted-foreground" />
          <select 
            value={statusFilter} 
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(0);
            }}
            className="px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="ml-3 text-muted-foreground">Loading orders...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-700">
              <strong>Error loading orders:</strong> {error instanceof Error ? error.message : 'Unknown error'}
            </p>
            <button
              onClick={() => refetch()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        ) : !payload || !payload.content || payload.content.length === 0 ? (
          <div className="text-center py-16">
            <Package size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-lg text-muted-foreground mb-4">No orders found</p>
            {statusFilter && (
              <p className="text-sm text-muted-foreground mb-4">
                Try clearing the status filter to see all orders
              </p>
            )}
            <Link to="/" className="text-primary font-medium hover:underline">
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {payload.content.map((order: any) => (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="block p-4 md:p-6 bg-card border border-border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">Order #{order.orderNumber || order.id}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.orderDate || order.confirmedAt || '').toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">₹{(order.grandTotal || order.subtotal || 0).toFixed(0)}</p>
                    <div className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                      {formatOrderStatus(order.status)}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 md:space-y-0 md:flex md:items-center md:justify-between text-sm">
                  <div className="text-muted-foreground">
                    <span className="font-medium text-foreground">{order.items?.length || 1}</span> item{(order.items?.length || 1) !== 1 ? 's' : ''}
                  </div>
                  <div className="flex items-center text-primary gap-1">
                    View details
                    <ChevronRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {payload && payload.totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-2">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-4 py-2 border border-border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
            >
              Previous
            </button>
            <span className="text-sm text-muted-foreground">
              Page {page + 1} of {payload.totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(payload.totalPages - 1, page + 1))}
              disabled={page >= payload.totalPages - 1}
              className="px-4 py-2 border border-border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
            >
              Next
            </button>
          </div>
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
