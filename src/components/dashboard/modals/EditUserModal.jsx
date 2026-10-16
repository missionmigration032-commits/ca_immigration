import { useState } from 'react';
import { X } from 'lucide-react';

export default function EditUserModal({ user, onClose, onSave, token }) {
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    givenName: user?.givenName || '',
    familyName: user?.familyName || '',
    passport: user?.passport || '',
    dob: user?.dob || '',
    newPassword: '',
    role: user?.role || 'user'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = { ...formData };
    if (!payload.newPassword) {
      delete payload.newPassword;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.ok) {
        onSave(data.user || data);
        onClose();
      } else {
        setError(data.message || 'Failed to update user.');
      }
    } catch (err) {
      console.error('Update user error:', err);
      setError('Network error updating user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ca-modal-overlay">
      <div className="ca-modal-dialog">
        <div className="ca-modal-header">
          <h3>Edit User Account</h3>
          <button type="button" className="ca-modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="ca-modal-body">
            {error && (
              <div className="alert alert-danger" style={{ padding: '8px 12px', fontSize: '13px', marginBottom: '15px' }}>
                {error}
              </div>
            )}
            <div className="ca-form-grid">
              <div className="ca-form-group">
                <label>Given Name</label>
                <input
                  type="text"
                  className="ca-form-control"
                  value={formData.givenName}
                  onChange={(e) => setFormData({ ...formData, givenName: e.target.value })}
                />
              </div>
              <div className="ca-form-group">
                <label>Family Name</label>
                <input
                  type="text"
                  className="ca-form-control"
                  value={formData.familyName}
                  onChange={(e) => setFormData({ ...formData, familyName: e.target.value })}
                />
              </div>
            </div>

            <div className="ca-form-grid">
              <div className="ca-form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  className="ca-form-control"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                />
              </div>
              <div className="ca-form-group">
                <label>Passport Number</label>
                <input
                  type="text"
                  className="ca-form-control"
                  value={formData.passport}
                  onChange={(e) => setFormData({ ...formData, passport: e.target.value })}
                />
              </div>
            </div>

            <div className="ca-form-grid">
              <div className="ca-form-group">
                <label>Username (Required)</label>
                <input
                  type="text"
                  className="ca-form-control"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
              <div className="ca-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  className="ca-form-control"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="ca-form-grid">
              <div className="ca-form-group">
                <label>New Password (Leave blank to keep unchanged)</label>
                <input
                  type="password"
                  className="ca-form-control"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  placeholder="Enter new password"
                />
              </div>
              <div className="ca-form-group">
                <label>Role</label>
                <select
                  className="ca-form-control"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="user">User</option>
                  <option value="employe">Employee</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          </div>
          <div className="ca-modal-footer">
            <button type="button" className="ca-btn ca-btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="ca-btn ca-btn-primary" disabled={loading}>
              {loading ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
