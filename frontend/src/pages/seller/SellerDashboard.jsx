import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiPackage, FiGrid } from 'react-icons/fi';
import API from '../../api/axios';
import { useToast } from '../../context/ToastContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const IMG_BASE = 'http://localhost:8081/images/';

export default function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const fetchProducts = () => API.get('/api/public/products?pageSize=200').then(r => setProducts(r.data.content || [])).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try { await API.delete(`/api/admin/products/${id}`); addToast('Product deleted', 'info'); fetchProducts(); } catch (err) { addToast(err.response?.data?.message || 'Delete failed', 'error'); }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page-container container animate-fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
        <div><h1 className="page-header__title">Seller Dashboard</h1><p className="page-header__subtitle">Manage your products</p></div>
        <Link to="/seller/products/add" className="btn btn-primary"><FiPlus /> Add Product</Link>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card glass-card--static"><div className="stat-card__icon stat-card__icon--primary"><FiPackage /></div><div><div className="stat-card__value">{products.length}</div><div className="stat-card__label">Total Products</div></div></div>
        <div className="stat-card glass-card--static"><div className="stat-card__icon stat-card__icon--emerald"><FiGrid /></div><div><div className="stat-card__value">{new Set(products.map(p => p.categoryId)).size || '—'}</div><div className="stat-card__label">Categories</div></div></div>
      </div>

      {products.length === 0 ? (
        <div className="empty-state"><h3 className="empty-state__title">No Products</h3><p className="empty-state__text">Add your first product to get started.</p><Link to="/seller/products/add" className="btn btn-primary"><FiPlus /> Add Product</Link></div>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Image</th><th>Name</th><th>Price</th><th>Discount</th><th>Stock</th><th>Actions</th></tr></thead>
            <tbody>
              {products.map(p => (
                <tr key={p.productId}>
                  <td><img className="table__image" src={p.image && p.image !== 'default.png' ? IMG_BASE + p.image : 'https://via.placeholder.com/48'} alt="" /></td>
                  <td style={{ fontWeight: 500 }}>{p.productName}</td>
                  <td>₹{p.specialPrice?.toFixed(2)}</td>
                  <td>{p.discount > 0 ? <span className="badge badge-danger">-{p.discount}%</span> : '—'}</td>
                  <td><span className={`badge ${p.quantity > 0 ? 'badge-success' : 'badge-danger'}`}>{p.quantity > 0 ? p.quantity : 'Out'}</span></td>
                  <td>
                    <div className="table__actions">
                      <Link to={`/seller/products/edit/${p.productId}`} className="btn btn-ghost btn-sm"><FiEdit2 /></Link>
                      <button className="btn btn-ghost btn-sm" style={{ color: 'var(--accent-coral)' }} onClick={() => handleDelete(p.productId)}><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
