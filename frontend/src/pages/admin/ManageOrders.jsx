import { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import API from '../../api/axios';
import { useToast } from '../../context/ToastContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const STATUS_OPTIONS = ['Order Accepted!', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

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

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const { addToast } = useToast();

  const fetchOrders = () => API.get('/api/admin/orders').then(r => setOrders(r.data || [])).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await API.put(`/api/admin/orders/${orderId}/status?status=${encodeURIComponent(newStatus)}`);
      addToast(`Order #${orderId} updated to "${newStatus}"`, 'success');
      fetchOrders();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update status', 'error');
    }
  };

  if (loading) return <LoadingSpinner />;

  const filtered = filterStatus ? orders.filter(o => o.orderStatus === filterStatus) : orders;

  return (
    <div className="page-container container animate-fade-in">
      <div className="page-header">
        <h1 className="page-header__title">Manage Orders</h1>
        <p className="page-header__subtitle">{orders.length} total orders</p>
      </div>

      <div className="filters-row">
        <select className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">📦</div>
          <h3 className="empty-state__title">No Orders Found</h3>
          <p className="empty-state__text">{filterStatus ? 'No orders match this filter.' : 'No orders have been placed yet.'}</p>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Email</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Update Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <>
                  <tr key={o.orderId}>
                    <td style={{ fontWeight: 600 }}>#{o.orderId}</td>
                    <td>{o.email}</td>
                    <td>{o.orderDate}</td>
                    <td style={{ fontWeight: 600, color: 'var(--accent-emerald)' }}>₹{o.totalAmount?.toFixed(2)}</td>
                    <td><span className={`badge ${statusColor(o.orderStatus)}`}>{o.orderStatus}</span></td>
                    <td>
                      <select
                        className="status-select"
                        value={o.orderStatus}
                        onChange={e => handleStatusChange(o.orderId, e.target.value)}
                      >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => setExpanded(expanded === o.orderId ? null : o.orderId)}
                      >
                        {expanded === o.orderId ? <FiChevronUp /> : <FiChevronDown />}
                      </button>
                    </td>
                  </tr>
                  {expanded === o.orderId && (
                    <tr key={`${o.orderId}-details`}>
                      <td colSpan={7} style={{ background: 'rgba(255,255,255,0.02)', padding: 'var(--space-lg)' }}>
                        <h4 style={{ marginBottom: 'var(--space-sm)', color: 'var(--text-secondary)' }}>Order Items</h4>
                        {(o.orderItems || []).map(item => (
                          <div key={item.orderItemId} className="order-item">
                            <span className="order-item__name">{item.productDTO?.productName || 'Product'}</span>
                            <span className="order-item__qty">× {item.quantity}</span>
                            <span className="order-item__price">₹{item.orderedProductPrice?.toFixed(2)}</span>
                          </div>
                        ))}
                        {o.payment && (
                          <p style={{ marginTop: 'var(--space-sm)', fontSize: 'var(--font-sm)', color: 'var(--text-muted)' }}>
                            Payment: {o.payment.paymentMethod} — {o.payment.pgStatus}
                          </p>
                        )}
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
