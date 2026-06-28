import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';
import { SkeletonCard } from '../components/LoadingSpinner';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const categoryFilter = searchParams.get('category') || '';
  const [sortBy, setSortBy] = useState('productId');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    API.get('/api/public/category?pageSize=50').then(r => setCategories(r.data.content || [])).catch(() => {});
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url;
        if (search.trim()) {
          url = `/api/public/products/keyword/${encodeURIComponent(search)}?pageNumber=${page}&pageSize=12&sortBy=${sortBy}&sortOrder=${sortOrder}`;
        } else if (categoryFilter) {
          url = `/api/public/categories/${categoryFilter}/products?pageNumber=${page}&pageSize=12&sortBy=${sortBy}&sortOrder=${sortOrder}`;
        } else {
          url = `/api/public/products?pageNumber=${page}&pageSize=12&sortBy=${sortBy}&sortOrder=${sortOrder}`;
        }
        const res = await API.get(url);
        setProducts(res.data.content || []);
        setTotalPages(res.data.totalPages || 0);
      } catch {
        setProducts([]);
        setTotalPages(0);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [page, categoryFilter, search, sortBy, sortOrder]);

  const handleCategoryChange = (catId) => {
    setPage(0);
    setSearch('');
    if (catId) setSearchParams({ category: catId });
    else setSearchParams({});
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(0);
    if (categoryFilter) setSearchParams({});
  };

  return (
    <div className="page-container container animate-fade-in">
      <div className="page-header">
        <h1 className="page-header__title">All Products</h1>
        <p className="page-header__subtitle">Browse our collection of premium products</p>
      </div>

      <div className="filters-row">
        <div className="search-bar" style={{ flex: 1 }}>
          <FiSearch className="search-bar__icon" />
          <input className="search-bar__input" placeholder="Search products..." value={search} onChange={handleSearch} />
        </div>
        <select className="filter-select" value={categoryFilter} onChange={e => handleCategoryChange(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>)}
        </select>
        <select className="filter-select" value={`${sortBy}-${sortOrder}`} onChange={e => { const [sb, so] = e.target.value.split('-'); setSortBy(sb); setSortOrder(so); setPage(0); }}>
          <option value="productId-asc">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="productName-asc">Name: A-Z</option>
          <option value="productName-desc">Name: Z-A</option>
        </select>
      </div>

      {loading ? (
        <div className="products-grid">{Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)}</div>
      ) : products.length === 0 ? (
        <div className="empty-state"><div className="empty-state__icon">🔍</div><h3 className="empty-state__title">No Products Found</h3><p className="empty-state__text">Try adjusting your search or filters.</p></div>
      ) : (
        <div className="products-grid">{products.map(p => <ProductCard key={p.productId} product={p} />)}</div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button className="pagination__btn" disabled={page === 0} onClick={() => setPage(p => p - 1)}>←</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} className={`pagination__btn ${i === page ? 'pagination__btn--active' : ''}`} onClick={() => setPage(i)}>{i + 1}</button>
          ))}
          <button className="pagination__btn" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>→</button>
        </div>
      )}
    </div>
  );
}
