import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiMinus, FiPlus, FiShoppingCart, FiCheck } from 'react-icons/fi';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import LoadingSpinner from '../components/LoadingSpinner';

const IMG_BASE = 'http://localhost:8081/images/';
const FALLBACK = 'https://via.placeholder.com/500x500?text=No+Image';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get('/api/public/products?pageSize=200');
        const found = (res.data.content || []).find(p => String(p.productId) === String(id));
        setProduct(found || null);
      } catch {}
      setLoading(false);
    };
    fetch();
  }, [id]);

  const handleAdd = async () => {
    if (!isAuthenticated) { addToast('Please login to add items to cart', 'warning'); return; }
    setAdding(true);
    try {
      await addToCart(product.productId, qty);
      setAdded(true);
      addToast(`${product.productName} added to cart!`, 'success');
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to add to cart', 'error');
    }
    setAdding(false);
  };

  if (loading) return <LoadingSpinner />;
  if (!product) return <div className="page-container container"><div className="empty-state"><h3 className="empty-state__title">Product Not Found</h3></div></div>;

  const hasDiscount = product.discount > 0;
  const inStock = product.quantity > 0;

  return (
    <div className="page-container container animate-fade-in">
      <div className="product-detail">
        <div className="product-detail__image-wrap">
          <img className="product-detail__image" src={product.image && product.image !== 'default.png' ? IMG_BASE + product.image : FALLBACK} alt={product.productName} onError={e => { e.target.src = FALLBACK; }} />
        </div>
        <div className="product-detail__info">
          <h1 className="product-detail__name">{product.productName}</h1>
          <div className="product-detail__price-box">
            <span className="product-detail__special-price">₹{product.specialPrice?.toFixed(2)}</span>
            {hasDiscount && <span className="product-detail__original">₹{product.price?.toFixed(2)}</span>}
            {hasDiscount && <span className="badge badge-danger">-{product.discount}% OFF</span>}
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{product.description}</p>
          <div className={`product-detail__stock ${inStock ? 'product-detail__stock--in' : 'product-detail__stock--out'}`}>
            {inStock ? `✓ In Stock (${product.quantity} available)` : '✗ Out of Stock'}
          </div>
          {inStock && (
            <>
              <div className="product-detail__qty">
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Quantity:</span>
                <button className="product-detail__qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}><FiMinus /></button>
                <span className="product-detail__qty-val">{qty}</span>
                <button className="product-detail__qty-btn" onClick={() => setQty(q => Math.min(product.quantity, q + 1))}><FiPlus /></button>
              </div>
              <button className={`btn ${added ? 'btn-success' : 'btn-primary'} btn-lg`} onClick={handleAdd} disabled={adding} style={{ marginTop: 'var(--space-sm)' }}>
                {added ? <><FiCheck /> Added!</> : adding ? 'Adding...' : <><FiShoppingCart /> Add to Cart</>}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
