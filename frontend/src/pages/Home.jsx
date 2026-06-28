import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';
import { SkeletonCard } from '../components/LoadingSpinner';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [pRes, cRes] = await Promise.all([
          API.get('/api/public/products?pageSize=8'),
          API.get('/api/public/category?pageSize=20'),
        ]);
        setProducts(pRes.data.content || []);
        setCategories(cRes.data.content || []);
      } catch {}
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero__bg-orb hero__bg-orb--1"></div>
        <div className="hero__bg-orb hero__bg-orb--2"></div>
        <div className="hero__bg-orb hero__bg-orb--3"></div>
        <div className="hero__content animate-fade-in">
          <h1 className="hero__title">Discover Premium Products</h1>
          <p className="hero__subtitle">Shop the latest trends with ShopKart — your one-stop destination for quality products at unbeatable prices.</p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Explore Products <FiArrowRight />
          </Link>
        </div>
      </section>

      <section className="section container">
        <h2 className="section-heading section-heading--center">Featured Products</h2>
        <div className="products-grid">
          {loading ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />) : products.map(p => <ProductCard key={p.productId} product={p} />)}
        </div>
        {!loading && products.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
            <Link to="/products" className="btn btn-secondary">View All Products <FiArrowRight /></Link>
          </div>
        )}
      </section>

      {categories.length > 0 && (
        <section className="section container">
          <h2 className="section-heading section-heading--center">Shop by Category</h2>
          <div className="categories-scroll" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
            {categories.map(c => (
              <Link key={c.categoryId} to={`/products?category=${c.categoryId}`} className="category-card">{c.categoryName}</Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
