import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX, FiUser, FiPackage, FiMapPin, FiLogOut, FiGrid, FiShield } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { isAuthenticated, user, logout, hasRole } = useAuth();
  const { cartCount } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <FiShoppingCart className="logo-icon" /> ShopKart
        </Link>

        <div className="navbar__links">
          <NavLink to="/" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>Home</NavLink>
          <NavLink to="/products" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>Products</NavLink>
          {hasRole('ROLE_SELLER') && <NavLink to="/seller/dashboard" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>Seller Panel</NavLink>}
          {hasRole('ROLE_ADMIN') && <NavLink to="/admin/dashboard" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>Admin Panel</NavLink>}
        </div>

        <div className="navbar__actions">
          {isAuthenticated && (
            <Link to="/cart" className="navbar__cart">
              <FiShoppingCart />
              {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
            </Link>
          )}

          {isAuthenticated ? (
            <div className="navbar__user">
              <button className="navbar__user-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <FiUser /> {user?.username}
              </button>
              {dropdownOpen && (
                <div className="navbar__dropdown">
                  <Link to="/orders" className="navbar__dropdown-item" onClick={() => setDropdownOpen(false)}><FiPackage /> My Orders</Link>
                  <Link to="/addresses" className="navbar__dropdown-item" onClick={() => setDropdownOpen(false)}><FiMapPin /> Addresses</Link>
                  {hasRole('ROLE_SELLER') && <Link to="/seller/dashboard" className="navbar__dropdown-item" onClick={() => setDropdownOpen(false)}><FiGrid /> Seller Dashboard</Link>}
                  {hasRole('ROLE_ADMIN') && <Link to="/admin/dashboard" className="navbar__dropdown-item" onClick={() => setDropdownOpen(false)}><FiShield /> Admin Dashboard</Link>}
                  <div className="navbar__dropdown-divider"></div>
                  <button className="navbar__dropdown-item navbar__dropdown-item--danger" onClick={handleLogout}><FiLogOut /> Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">Sign In</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
            </>
          )}

          <button className="navbar__hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="navbar__mobile open">
          <NavLink to="/" className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>Home</NavLink>
          <NavLink to="/products" className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>Products</NavLink>
          {isAuthenticated && <NavLink to="/cart" className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>Cart ({cartCount})</NavLink>}
          {isAuthenticated && <NavLink to="/orders" className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>My Orders</NavLink>}
          {hasRole('ROLE_SELLER') && <NavLink to="/seller/dashboard" className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>Seller Dashboard</NavLink>}
          {hasRole('ROLE_ADMIN') && <NavLink to="/admin/dashboard" className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>Admin Dashboard</NavLink>}
          {isAuthenticated ? (
            <button className="navbar__mobile-link" onClick={() => { handleLogout(); setMobileOpen(false); }} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', color: 'var(--accent-coral)' }}>Sign Out</button>
          ) : (
            <>
              <NavLink to="/login" className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>Sign In</NavLink>
              <NavLink to="/register" className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>Sign Up</NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
