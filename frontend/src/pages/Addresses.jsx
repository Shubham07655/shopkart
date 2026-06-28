import { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import API from '../api/axios';
import { useToast } from '../context/ToastContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ street: '', buildingName: '', city: '', state: '', country: '', pincode: '' });
  const { addToast } = useToast();

  const fetchAddresses = () => API.get('/api/address/user').then(r => setAddresses(r.data || [])).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { fetchAddresses(); }, []);

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editing) { await API.put(`/api/address/${editing}`, form); addToast('Address updated', 'success'); }
      else { await API.post('/api/address', form); addToast('Address added', 'success'); }
      setForm({ street: '', buildingName: '', city: '', state: '', country: '', pincode: '' });
      setEditing(null); setShowForm(false); fetchAddresses();
    } catch (err) { addToast(err.response?.data?.message || 'Error saving', 'error'); }
  };

  const handleEdit = (a) => { setForm(a); setEditing(a.addressId); setShowForm(true); };

  const handleDelete = async (id) => {
    if (!confirm('Delete this address?')) return;
    try { await API.delete(`/api/address/${id}`); addToast('Address deleted', 'info'); fetchAddresses(); } catch { addToast('Error deleting', 'error'); }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page-container container animate-fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <div><h1 className="page-header__title">My Addresses</h1></div>
        <button className="btn btn-primary" onClick={() => { setEditing(null); setForm({ street: '', buildingName: '', city: '', state: '', country: '', pincode: '' }); setShowForm(!showForm); }}><FiPlus /> Add Address</button>
      </div>

      {showForm && (
        <form className="glass-card--static" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }} onSubmit={handleSave}>
          <h3 style={{ fontFamily: 'Outfit', marginBottom: 'var(--space-md)' }}>{editing ? 'Edit Address' : 'New Address'}</h3>
          <div className="address-form">
            <div className="form-group"><label>Street</label><input className="input-field" value={form.street} onChange={set('street')} required minLength={5} /></div>
            <div className="form-group"><label>Building</label><input className="input-field" value={form.buildingName} onChange={set('buildingName')} required minLength={5} /></div>
            <div className="form-group"><label>City</label><input className="input-field" value={form.city} onChange={set('city')} required minLength={3} /></div>
            <div className="form-group"><label>State</label><input className="input-field" value={form.state} onChange={set('state')} required minLength={2} /></div>
            <div className="form-group"><label>Country</label><input className="input-field" value={form.country} onChange={set('country')} required minLength={2} /></div>
            <div className="form-group"><label>Pincode</label><input className="input-field" value={form.pincode} onChange={set('pincode')} required minLength={6} /></div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'flex-end', marginTop: 'var(--space-md)' }}>
            <button type="button" className="btn btn-ghost" onClick={() => { setShowForm(false); setEditing(null); }}>Cancel</button>
            <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Save'}</button>
          </div>
        </form>
      )}

      {addresses.length === 0 && !showForm ? (
        <div className="empty-state"><div className="empty-state__icon">📍</div><h3 className="empty-state__title">No Addresses</h3><p className="empty-state__text">Add your first delivery address.</p></div>
      ) : (
        <div className="addresses-grid">
          {addresses.map(a => (
            <div key={a.addressId} className="glass-card address-card-manage">
              <p><strong>{a.buildingName}</strong></p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-sm)' }}>{a.street}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-sm)' }}>{a.city}, {a.state} - {a.pincode}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-sm)' }}>{a.country}</p>
              <div className="address-card-manage__actions">
                <button className="btn btn-ghost btn-sm" onClick={() => handleEdit(a)}><FiEdit2 /> Edit</button>
                <button className="btn btn-ghost btn-sm" style={{ color: 'var(--accent-coral)' }} onClick={() => handleDelete(a.addressId)}><FiTrash2 /> Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
