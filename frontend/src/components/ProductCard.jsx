import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const IMG_BASE = 'http://localhost:8081/images/';
const FALLBACK = 'https://via.placeholder.com/300x225?text=No+Image';

export default function ProductCard({ product }) {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const hasDiscount = product.discount > 0;

  const handleAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) { addToast('Please login to add items to cart', 'warning'); return; }
    try {
      await addToCart(product.productId, 1);
      addToast(`${product.productName} added to cart!`, 'success');
    } catch (err) {
      addToast(err.response?.data?.message || 'Could not add to cart', 'error');
    }
  };

  return (
    <Link to={`/products/${product.productId}`} className="product-card animate-slide-up" style={{ textDecoration: 'none' }}>
      <div className="product-card__image-wrap">
        <img className="product-card__image" src={product.image && product.image !== 'default.png' ? IMG_BASE + product.image : FALLBACK} alt={product.productName} onError={e => { e.target.src = FALLBACK; }} />
        {hasDiscount && <span className="product-card__discount">-{product.discount}%</span>}
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{product.productName}</h3>
        <p className="product-card__desc">{product.description}</p>
        <div className="product-card__price-row">
          <span className="product-card__price">₹{product.specialPrice?.toFixed(2)}</span>
          {hasDiscount && <span className="product-card__original-price">₹{product.price?.toFixed(2)}</span>}
        </div>
        <button className="product-card__btn" onClick={handleAdd} disabled={product.quantity === 0}>
          {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </Link>
  );
}
