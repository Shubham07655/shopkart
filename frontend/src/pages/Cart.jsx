import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMinus, FiPlus, FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import LoadingSpinner from '../components/LoadingSpinner';

const IMG_BASE = 'http://localhost:8081/images/';
const FALLBACK = 'https://via.placeholder.com/100x100?text=No+Image';

export default function Cart() {
  const { cart, fetchCart, updateQuantity, removeFromCart } = useCart();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchCart().finally(() => setLoading(false)); }, []);

  const handleQty = async (productId, operation) => {
    try { await updateQuantity(productId, operation); } catch (err) { addToast(err.response?.data?.message || 'Error updating', 'error'); }
  };

  const handleRemove = async (productId) => {
    if (!cart) return;
    try { await removeFromCart(cart.cartId, productId); addToast('Item removed', 'info'); } catch (err) { addToast('Error removing item', 'error'); }
  };

  if (loading) return <LoadingSpinner />;

  const items = cart?.products || [];

  return (
    <div className="page-container container animate-fade-in">
      <div className="page-header"><h1 className="page-header__title">Shopping Cart</h1></div>
      {items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon"><FiShoppingCart /></div>
          <h3 className="empty-state__title">Your cart is empty</h3>
          <p className="empty-state__text">Explore our products and add items to your cart.</p>
          <Link to="/products" className="btn btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {items.map(p => (
              <div key={p.productId} className="cart-item">
                <img className="cart-item__image" src={p.image && p.image !== 'default.png' ? IMG_BASE + p.image : FALLBACK} alt={p.productName} onError={e => { e.target.src = FALLBACK; }} />
                <div className="cart-item__info">
                  <div>
                    <div className="cart-item__name">{p.productName}</div>
                    <div className="cart-item__price">₹{p.specialPrice?.toFixed(2)}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="cart-item__controls">
                      <button className="cart-item__qty-btn" onClick={() => handleQty(p.productId, 'delete')}><FiMinus /></button>
                      <span style={{ fontWeight: 600, minWidth: 28, textAlign: 'center' }}>{p.quantity}</span>
                      <button className="cart-item__qty-btn" onClick={() => handleQty(p.productId, 'increase')}><FiPlus /></button>
                    </div>
                    <button className="cart-item__remove" onClick={() => handleRemove(p.productId)}><FiTrash2 /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary glass-card--static">
            <h3 style={{ fontFamily: 'Outfit', fontSize: 'var(--font-xl)', marginBottom: 'var(--space-md)' }}>Order Summary</h3>
            <div className="cart-summary__row"><span>Items ({items.length})</span></div>
            <div className="cart-summary__total"><span>Total</span><span>₹{cart?.totalPrice?.toFixed(2)}</span></div>
            <Link to="/checkout" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 'var(--space-md)' }}>Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
}
