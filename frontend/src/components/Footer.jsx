import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <div className="footer__brand">ShopKart</div>
          <p className="footer__text" style={{ marginTop: 4 }}>Premium E-Commerce Experience</p>
        </div>
        <div className="footer__links">
          <Link to="/" className="footer__link">Home</Link>
          <Link to="/products" className="footer__link">Products</Link>
          <span className="footer__link">About</span>
          <span className="footer__link">Contact</span>
        </div>
        <p className="footer__text">© {new Date().getFullYear()} ShopKart. All rights reserved.</p>
      </div>
    </footer>
  );
}
