import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '', role: 'user' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      await register(form.username, form.email, form.password, form.role);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="hero__bg-orb hero__bg-orb--1"></div>
      <div className="hero__bg-orb hero__bg-orb--2"></div>
      <div className="auth-card">
        <div className="auth-card__logo">ShopKart</div>
        <h1 className="auth-card__title">Create Account</h1>
        <p className="auth-card__subtitle">Join ShopKart today</p>
        {error && <div className="auth-card__error">{error}</div>}
        <form className="auth-card__form" onSubmit={handleSubmit}>
          <div className="input-group">
            <FiUser className="input-icon" />
            <input className="input-field" placeholder="Username" value={form.username} onChange={set('username')} required minLength={3} maxLength={20} />
          </div>
          <div className="input-group">
            <FiMail className="input-icon" />
            <input className="input-field" type="email" placeholder="Email" value={form.email} onChange={set('email')} required />
          </div>
          <div className="input-group">
            <FiLock className="input-icon" />
            <input className="input-field" type={showPass ? 'text' : 'password'} placeholder="Password" value={form.password} onChange={set('password')} required minLength={6} />
            <button type="button" className="input-action" onClick={() => setShowPass(!showPass)}>{showPass ? <FiEyeOff /> : <FiEye />}</button>
          </div>
          <div className="input-group">
            <FiLock className="input-icon" />
            <input className="input-field" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={set('confirmPassword')} required />
          </div>
          <div>
            <label>Register as</label>
            <div className="role-toggle">
              <button type="button" className={`role-toggle__btn ${form.role === 'user' ? 'role-toggle__btn--active' : ''}`} onClick={() => setForm(p => ({ ...p, role: 'user' }))}>🛒 Buyer</button>
              <button type="button" className={`role-toggle__btn ${form.role === 'seller' ? 'role-toggle__btn--active' : ''}`} onClick={() => setForm(p => ({ ...p, role: 'seller' }))}>🏪 Seller</button>
            </div>
          </div>
          <button className="btn btn-primary btn-lg" type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <div className="auth-card__footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
