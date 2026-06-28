import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import API from '../api/axios';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddr, setSelectedAddr] = useState(null);
  const [showNewAddr, setShowNewAddr] = useState(false);
  const [addrForm, setAddrForm] = useState({ street: '', buildingName: '', city: '', state: '', country: '', pincode: '' });
  const [placing, setPlacing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { cart, fetchCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([API.get('/api/address/user'), fetchCart()])
      .then(([r]) => { setAddresses(r.data || []); if (r.data.length) setSelectedAddr(r.data[0].addressId); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSaveAddr = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/api/address', addrForm);
      setAddresses(p => [...p, res.data]);
      setSelectedAddr(res.data.addressId);
      setShowNewAddr(false);
      setAddrForm({ street: '', buildingName: '', city: '', state: '', country: '', pincode: '' });
      addToast('Address saved!', 'success');
    } catch (err) { addToast(err.response?.data?.message || 'Failed to save address', 'error'); }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddr) { addToast('Please select an address', 'warning'); return; }
    setPlacing(true);
    try {
      await API.post('/api/order/users/payments/Cash On Delivery', {
        addressId: selectedAddr, pgName: 'Cash On Delivery', pgPaymentId: 'COD_' + Date.now(), pgStatus: 'Pending', pgResponseMessage: 'Cash on Delivery'
      });
      await fetchCart();
      addToast('Order placed successfully! 🎉', 'success');
      navigate('/orders');
    } catch (err) { addToast(err.response?.data?.message || 'Order failed', 'error'); }
    setPlacing(false);
  };

  if (loading) return <LoadingSpinner />;
  const items = cart?.products || [];

  const steps = [
    { num: 1, label: 'Address' },
    { num: 2, label: 'Payment' },
    { num: 3, label: 'Review' },
  ];

  return (
    <div className="page-container container animate-fade-in">
      <div className="page-header"><h1 className="page-header__title">Checkout</h1></div>

      <div className="checkout-steps">
        {steps.map(s => (
          <div key={s.num} className={`checkout-step ${step === s.num ? 'checkout-step--active' : step > s.num ? 'checkout-step--done' : ''}`}>
            <span className="checkout-step__num">{step > s.num ? <FiCheck /> : s.num}</span>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="checkout-section">
        {step === 1 && (
          <div className="glass-card--static" style={{ padding: 'var(--space-xl)' }}>
            <h2 style={{ fontFamily: 'Outfit', marginBottom: 'var(--space-lg)' }}>Select Address</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {addresses.map(a => (
                <label key={a.addressId} className={`address-card ${selectedAddr === a.addressId ? 'address-card--selected' : ''}`} onClick={() => setSelectedAddr(a.addressId)}>
                  <input type="radio" name="address" className="address-card__radio" checked={selectedAddr === a.addressId} onChange={() => setSelectedAddr(a.addressId)} />
                  <div><strong>{a.buildingName}</strong>, {a.street}<br />{a.city}, {a.state} - {a.pincode}<br />{a.country}</div>
                </label>
              ))}
            </div>
            {!showNewAddr ? (
              <button className="btn btn-secondary" style={{ marginTop: 'var(--space-md)' }} onClick={() => setShowNewAddr(true)}>+ Add New Address</button>
            ) : (
              <form className="address-form" style={{ marginTop: 'var(--space-lg)' }} onSubmit={handleSaveAddr}>
                <div className="form-group"><label>Street</label><input className="input-field" value={addrForm.street} onChange={e => setAddrForm(p => ({ ...p, street: e.target.value }))} required minLength={5} /></div>
                <div className="form-group"><label>Building</label><input className="input-field" value={addrForm.buildingName} onChange={e => setAddrForm(p => ({ ...p, buildingName: e.target.value }))} required minLength={5} /></div>
                <div className="form-group"><label>City</label><input className="input-field" value={addrForm.city} onChange={e => setAddrForm(p => ({ ...p, city: e.target.value }))} required minLength={3} /></div>
                <div className="form-group"><label>State</label><input className="input-field" value={addrForm.state} onChange={e => setAddrForm(p => ({ ...p, state: e.target.value }))} required minLength={2} /></div>
                <div className="form-group"><label>Country</label><input className="input-field" value={addrForm.country} onChange={e => setAddrForm(p => ({ ...p, country: e.target.value }))} required minLength={2} /></div>
                <div className="form-group"><label>Pincode</label><input className="input-field" value={addrForm.pincode} onChange={e => setAddrForm(p => ({ ...p, pincode: e.target.value }))} required minLength={6} /></div>
                <div className="address-form--full" style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'flex-end' }}>
                  <button type="button" className="btn btn-ghost" onClick={() => setShowNewAddr(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Address</button>
                </div>
              </form>
            )}
            <div style={{ marginTop: 'var(--space-xl)', textAlign: 'right' }}>
              <button className="btn btn-primary" disabled={!selectedAddr} onClick={() => setStep(2)}>Continue to Payment →</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="glass-card--static" style={{ padding: 'var(--space-xl)' }}>
            <h2 style={{ fontFamily: 'Outfit', marginBottom: 'var(--space-lg)' }}>Payment Method</h2>
            <label className="address-card address-card--selected" style={{ cursor: 'default' }}>
              <input type="radio" checked readOnly className="address-card__radio" />
              <div><strong>💵 Cash on Delivery</strong><br /><span style={{ color: 'var(--text-muted)', fontSize: 'var(--font-sm)' }}>Pay when your order arrives</span></div>
            </label>
            <div style={{ marginTop: 'var(--space-xl)', display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
              <button className="btn btn-primary" onClick={() => setStep(3)}>Review Order →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="glass-card--static" style={{ padding: 'var(--space-xl)' }}>
            <h2 style={{ fontFamily: 'Outfit', marginBottom: 'var(--space-lg)' }}>Order Review</h2>
            {items.map(p => (
              <div key={p.productId} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-sm) 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <span>{p.productName} × {p.quantity}</span>
                <span style={{ fontWeight: 600 }}>₹{(p.specialPrice * p.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-md) 0', fontFamily: 'Outfit', fontSize: 'var(--font-xl)', fontWeight: 700 }}>
              <span>Total</span><span style={{ color: 'var(--accent-emerald)' }}>₹{cart?.totalPrice?.toFixed(2)}</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-sm)', marginBottom: 'var(--space-md)' }}>Payment: Cash on Delivery</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-ghost" onClick={() => setStep(2)}>← Back</button>
              <button className="btn btn-primary btn-lg" onClick={handlePlaceOrder} disabled={placing}>{placing ? 'Placing Order...' : '🎉 Place Order'}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
