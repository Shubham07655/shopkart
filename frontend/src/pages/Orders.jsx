import { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import API from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';

const statusColor = (s) => {
  if (!s) return 'badge-info';
  const l = s.toLowerCase();
  if (l.includes('accepted')) return 'badge-primary';
  if (l.includes('processing')) return 'badge-warning';
  if (l.includes('shipped')) return 'badge-info';
  if (l.includes('delivered')) return 'badge-success';
  if (l.includes('cancel')) return 'badge-danger';
  return 'badge-primary';
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    API.get('/api/user/orders').then(r => setOrders(r.data || [])).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page-container container animate-fade-in">
      <div className="page-header"><h1 className="page-header__title">My Orders</h1><p className="page-header__subtitle">Track your order history</p></div>
      {orders.length === 0 ? (
        <div className="empty-state"><div className="empty-state__icon">📦</div><h3 className="empty-state__title">No Orders Yet</h3><p className="empty-state__text">Your order history will appear here.</p></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {orders.map(o => (
            <div key={o.orderId} className="order-card glass-card" onClick={() => setExpanded(expanded === o.orderId ? null : o.orderId)} style={{ cursor: 'pointer' }}>
              <div className="order-card__header">
                <span className="order-card__id">Order #{o.orderId}</span>
                <span className="order-card__date">{o.orderDate}</span>
              </div>
              <div className="order-card__row">
                <span className={`badge ${statusColor(o.orderStatus)}`}>{o.orderStatus}</span>
                <span className="order-card__total">₹{o.totalAmount?.toFixed(2)}</span>
                {expanded === o.orderId ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              {expanded === o.orderId && (
                <div className="order-card__details">
                  <h4 style={{ marginBottom: 'var(--space-sm)', color: 'var(--text-secondary)' }}>Items</h4>
                  {(o.orderItems || []).map(item => (
                    <div key={item.orderItemId} className="order-item">
                      <span className="order-item__name">{item.productDTO?.productName || 'Product'}</span>
                      <span className="order-item__qty">× {item.quantity}</span>
                      <span className="order-item__price">₹{item.orderedProductPrice?.toFixed(2)}</span>
                    </div>
                  ))}
                  {o.payment && <p style={{ marginTop: 'var(--space-sm)', fontSize: 'var(--font-sm)', color: 'var(--text-muted)' }}>Payment: {o.payment.paymentMethod} ({o.payment.pgStatus})</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
