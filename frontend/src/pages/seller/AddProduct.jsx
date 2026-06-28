import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload } from 'react-icons/fi';
import API from '../../api/axios';
import { useToast } from '../../context/ToastContext';

export default function AddProduct() {
  const [form, setForm] = useState({ productName: '', description: '', price: '', discount: '0', quantity: '' });
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => { API.get('/api/public/category?pageSize=50').then(r => { setCategories(r.data.content || []); if (r.data.content?.length) setCategoryId(r.data.content[0].categoryId); }).catch(() => {}); }, []);

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) { setImage(file); setPreview(URL.createObjectURL(file)); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryId) { addToast('Select a category', 'warning'); return; }
    setLoading(true);
    try {
      const res = await API.post(`/api/admin/categories/${categoryId}/products`, {
        productName: form.productName, description: form.description,
        price: parseFloat(form.price), discount: parseFloat(form.discount), quantity: parseInt(form.quantity),
      });
      if (image) {
        const fd = new FormData();
        fd.append('image', image);
        await API.put(`/api/admin/products/${res.data.productId}/image`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      addToast('Product added!', 'success');
      navigate('/seller/dashboard');
    } catch (err) { addToast(err.response?.data?.message || 'Failed to add product', 'error'); }
    setLoading(false);
  };

  return (
    <div className="page-container container animate-fade-in">
      <div className="page-header"><h1 className="page-header__title">Add New Product</h1></div>
      <form className="form-card glass-card--static" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group form-grid--full"><label>Product Name</label><input className="input-field" value={form.productName} onChange={set('productName')} required /></div>
          <div className="form-group form-grid--full"><label>Description</label><textarea className="input-field" value={form.description} onChange={set('description')} required /></div>
          <div className="form-group"><label>Price (₹)</label><input className="input-field" type="number" step="0.01" min="0" value={form.price} onChange={set('price')} required /></div>
          <div className="form-group"><label>Discount (%)</label><input className="input-field" type="number" min="0" max="100" value={form.discount} onChange={set('discount')} /></div>
          <div className="form-group"><label>Stock Quantity</label><input className="input-field" type="number" min="0" value={form.quantity} onChange={set('quantity')} required /></div>
          <div className="form-group"><label>Category</label><select className="input-field" value={categoryId} onChange={e => setCategoryId(e.target.value)} required>{categories.map(c => <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>)}</select></div>
          <div className="form-group form-grid--full">
            <label>Product Image</label>
            <label className="image-upload">
              <input type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
              <FiUpload style={{ fontSize: '2rem', color: 'var(--text-muted)' }} />
              <p style={{ color: 'var(--text-muted)', marginTop: 'var(--space-sm)' }}>Click to upload image</p>
              {preview && <img src={preview} alt="Preview" className="image-upload__preview" />}
            </label>
          </div>
        </div>
        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={() => navigate('/seller/dashboard')}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Adding...' : 'Add Product'}</button>
        </div>
      </form>
    </div>
  );
}
