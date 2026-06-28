import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import API from '../../api/axios';
import { useToast } from '../../context/ToastContext';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [adding, setAdding] = useState(false);
  const { addToast } = useToast();

  const fetchCategories = () =>
    API.get('/api/public/category?pageSize=100')
      .then(r => setCategories(r.data.content || []))
      .catch(() => {})
      .finally(() => setLoading(false));

  useEffect(() => { fetchCategories(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setAdding(true);
    try {
      await API.post('/api/public/category', { categoryName: newName.trim() });
      setNewName('');
      addToast('Category created!', 'success');
      fetchCategories();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to create category', 'error');
    }
    setAdding(false);
  };

  const handleUpdate = async (id) => {
    if (!editName.trim()) return;
    try {
      await API.put(`/api/public/category/${id}`, { categoryName: editName.trim() });
      setEditingId(null);
      addToast('Category updated!', 'success');
      fetchCategories();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this category? Products in this category may be affected.')) return;
    try {
      await API.delete(`/api/admin/category/${id}`);
      addToast('Category deleted', 'info');
      fetchCategories();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to delete', 'error');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page-container container animate-fade-in">
      <div className="page-header">
        <h1 className="page-header__title">Manage Categories</h1>
        <p className="page-header__subtitle">{categories.length} categories</p>
      </div>

      <form
        onSubmit={handleAdd}
        className="glass-card--static"
        style={{ padding: 'var(--space-lg)', marginBottom: 'var(--space-xl)', display: 'flex', gap: 'var(--space-md)', alignItems: 'flex-end' }}
      >
        <div className="form-group" style={{ flex: 1 }}>
          <label>New Category Name</label>
          <input
            className="input-field"
            placeholder="Enter category name..."
            value={newName}
            onChange={e => setNewName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={adding} style={{ height: 46 }}>
          <FiPlus /> {adding ? 'Adding...' : 'Add Category'}
        </button>
      </form>

      {categories.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">📁</div>
          <h3 className="empty-state__title">No Categories</h3>
          <p className="empty-state__text">Create your first category above.</p>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr><th>ID</th><th>Category Name</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {categories.map(c => (
                <tr key={c.categoryId}>
                  <td style={{ fontWeight: 600, width: 80 }}>#{c.categoryId}</td>
                  <td>
                    {editingId === c.categoryId ? (
                      <div className="inline-edit">
                        <input
                          className="input-field inline-edit__input"
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                          autoFocus
                          onKeyDown={e => { if (e.key === 'Enter') handleUpdate(c.categoryId); if (e.key === 'Escape') setEditingId(null); }}
                        />
                        <button className="btn btn-ghost btn-sm" style={{ color: 'var(--accent-emerald)' }} onClick={() => handleUpdate(c.categoryId)}><FiCheck /></button>
                        <button className="btn btn-ghost btn-sm" onClick={() => setEditingId(null)}><FiX /></button>
                      </div>
                    ) : (
                      <span>{c.categoryName}</span>
                    )}
                  </td>
                  <td>
                    <div className="table__actions">
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => { setEditingId(c.categoryId); setEditName(c.categoryName); }}
                      >
                        <FiEdit2 /> Edit
                      </button>
                      <button
                        className="btn btn-ghost btn-sm"
                        style={{ color: 'var(--accent-coral)' }}
                        onClick={() => handleDelete(c.categoryId)}
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
