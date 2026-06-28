import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiGrid, FiShoppingBag, FiTruck } from 'react-icons/fi';
import API from '../../api/axios';
import LoadingSpinner from '../../components/LoadingSpinner';

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

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get('/api/admin/orders').catch(() => ({ data: [] })),
      API.get('/api/public/products?pageSize=200').catch(() => ({ data: { content: [] } })),
      API.get('/api/public/category?pageSize=50').catch(() => ({ data: { content: [] } })),
    ]).then(([oRes, pRes, cRes]) => {
      setOrders(oRes.data || []);
      setProducts(pRes.data.content || []);
      setCategories(cRes.data.content || []);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page-container container animate-fade-in">
      <div className="page-header">
        <h1 className="page-header__title">Admin Dashboard</h1>
        <p className="page-header__subtitle">Overview of your store</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card glass-card--static">
          <div className="stat-card__icon stat-card__icon--primary"><FiShoppingBag /></div>
          <div><div className="stat-card__value">{orders.length}</div><div className="stat-card__label">Total Orders</div></div>
        </div>
        <div className="stat-card glass-card--static">
          <div className="stat-card__icon stat-card__icon--emerald"><FiPackage /></div>
          <div><div className="stat-card__value">{products.length}</div><div className="stat-card__label">Total Products</div></div>
        </div>
        <div className="stat-card glass-card--static">
          <div className="stat-card__icon stat-card__icon--amber"><FiGrid /></div>
          <div><div className="stat-card__value">{categories.length}</div><div className="stat-card__label">Categories</div></div>
        </div>
        <div className="stat-card glass-card--static">
          <div className="stat-card__icon stat-card__icon--coral"><FiTruck /></div>
          <div><div className="stat-card__value">{orders.filter(o => o.orderStatus?.toLowerCase().includes('delivered')).length}</div><div className="stat-card__label">Delivered</div></div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
        <Link to="/admin/orders" className="glass-card" style={{ padding: 'var(--space-xl)', textDecoration: 'none' }}>
          <FiShoppingBag style={{ fontSize: '2rem', color: 'var(--accent-primary)', marginBottom: 'var(--space-md)' }} />
          <h3 style={{ fontFamily: 'Outfit', marginBottom: 'var(--space-xs)' }}>Manage Orders</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-sm)' }}>View, track, and update order statuses</p>
        </Link>
        <Link to="/admin/categories" className="glass-card" style={{ padding: 'var(--space-xl)', textDecoration: 'none' }}>
          <FiGrid style={{ fontSize: '2rem', color: 'var(--accent-amber)', marginBottom: 'var(--space-md)' }} />
          <h3 style={{ fontFamily: 'Outfit', marginBottom: 'var(--space-xs)' }}>Manage Categories</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-sm)' }}>Add, edit, and remove product categories</p>
        </Link>
      </div>

      {orders.length > 0 && (
        <div style={{ marginTop: 'var(--space-2xl)' }}>
          <h2 className="section-heading">Recent Orders</h2>
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Order ID</th><th>Email</th><th>Date</th><th>Total</th><th>Status</th></tr></thead>
              <tbody>
                {orders.slice(0, 5).map(o => (
                  <tr key={o.orderId}>
                    <td style={{ fontWeight: 600 }}>#{o.orderId}</td>
                    <td>{o.email}</td>
                    <td>{o.orderDate}</td>
                    <td style={{ fontWeight: 600, color: 'var(--accent-emerald)' }}>₹{o.totalAmount?.toFixed(2)}</td>
                    <td><span className={`badge ${statusColor(o.orderStatus)}`}>{o.orderStatus}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
