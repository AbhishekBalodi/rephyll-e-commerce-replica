export type OrderStatus =
  | 'PENDING_PAYMENT'
  | 'DRAFT'
  | 'CONFIRMED'
  | 'PACKED'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'EXPIRED'
  | 'CANCELLED';

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING_PAYMENT: 'Pending Payment',
  DRAFT: 'Draft',
  CONFIRMED: 'Confirmed',
  PACKED: 'Packed',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  EXPIRED: 'Expired',
  CANCELLED: 'Cancelled',
};

export function formatOrderStatus(status?: string) {
  if (!status) return 'Unknown';
  return (ORDER_STATUS_LABELS as any)[status] || status;
}
