import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './adminlayout';
import './adminstyle/admincontact.css';
import './adminstyle/usermanagement.css';

// ── Attach JWT to every request ────────────────────────────────────────────────
const authFetch = (url, options = {}) => {
  const token = localStorage.getItem('token');
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
};

const UserManagement = () => {
  const [users, setUsers]       = useState([]);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');
  const [loading, setLoading]   = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate                = useNavigate();

  const isSuperadmin = localStorage.getItem('userRole') === 'Superadmin';

  useEffect(() => {
    if (!isSuperadmin) {
      navigate('/admin', { replace: true });
    } else {
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const res    = await authFetch('/api/users');
      const dbData = await res.json();

      if (!res.ok) {
        console.error('Failed to fetch users:', dbData.message);
        return;
      }

      // ✅ Read Superadmin's last login from localStorage (set at login time)
      const superAdminLastLogin = localStorage.getItem('lastLogin');

      const superAdminEntry = {
        _id:       'static-super',
        username:  process.env.REACT_APP_ADMIN_USERNAME || 'admin',
        role:      'Superadmin',
        status:    'Active',
        lastLogin: superAdminLastLogin || null,
      };

      setUsers([superAdminEntry, ...dbData]);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);
    try {
      const res  = await authFetch('/api/users', {
        method: 'POST',
        body:   JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess(`Admin "${data.username}" created successfully!`);
        setFormData({ username: '', password: '' });
        fetchUsers();
      } else {
        setError(data.message || 'Failed to create user.');
      }
    } catch (err) {
      setError('Connection failed. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const res = await authFetch(`/api/users/${id}/toggle`, { method: 'PATCH' });
      if (res.ok) {
        fetchUsers();
      } else {
        const data = await res.json();
        alert(data.message || 'Toggle failed.');
      }
    } catch (err) {
      console.error('Toggle failed:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return;
    try {
      const res = await authFetch(`/api/users/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchUsers();
      } else {
        const data = await res.json();
        alert(data.message || 'Delete failed.');
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page-header"><h1>USER MANAGEMENT</h1></div>

      {/* ── Create Form ── */}
      <div className="user-management-container">
        <h2>Create New Admin User</h2>
        <p>Create credentials for a new admin user who can access this portal.</p>

        {error   && <p style={{ color: 'red',   marginBottom: 8 }}>{error}</p>}
        {success && <p style={{ color: 'green', marginBottom: 8 }}>{success}</p>}

        <form onSubmit={handleCreate} className="user-form">
          <div className="user-form-group">
            <label className="input-label">Username:</label>
            <input
              type="text"
              className="admin-input"
              placeholder="Enter new username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>
          <div className="user-form-group">
            <label className="input-label">Password:</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="admin-input"
                placeholder="Password must be at least 8 characters long"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                minLength={8}
                required
                style={{ paddingRight: '45px' }}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="password-toggle-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="password-toggle-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button type="submit" className="btn-create-admin" disabled={loading}>
            {loading ? 'Creating…' : 'Create Admin Account'}
          </button>
        </form>
      </div>

      {/* ── Users Table ── */}
      <div className="admin-table-card">
        <div className="existing-users-header">
          <h2>Existing Admin Users</h2>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th className="text-center">USERNAME</th>
              <th className="text-center">ROLE</th>
              <th className="text-center">STATUS</th>
              <th className="text-center">LAST LOGIN</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center" style={{ padding: '20px', color: '#888' }}>
                  No users found.
                </td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user._id}>
                  <td className="text-center bold-text">{user.username}</td>
                  <td className="text-center">
                    <span className={`role-badge ${user.role === 'Superadmin' ? 'badge-super' : 'badge-admin'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className={`text-center ${user.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                    {user.status}
                  </td>
                  <td className="text-center">
                    {user.lastLogin
                      ? new Date(user.lastLogin).toLocaleString('en-GB')
                      : '—'}
                  </td>
                  <td className="text-center">
                    {user.role !== 'Superadmin' && isSuperadmin && (
                      <div className="action-btns">
                        <button
                          className="action-icon-btn"
                          title={user.status === 'Active' ? 'Deactivate' : 'Activate'}
                          onClick={() => handleToggleStatus(user._id)}
                        >
                          <img
                            src={user.status === 'Active'
                              ? '/images/usermanagement logo/Active.png'
                              : '/images/usermanagement logo/Inactive.png'}
                            className="mgmt-icon"
                            alt={user.status === 'Active' ? 'Deactivate' : 'Activate'}
                          />
                        </button>
                        <button
                          className="action-icon-btn"
                          title="Delete"
                          onClick={() => handleDelete(user._id)}
                        >
                          <img src="/images/usermanagement logo/Delete.png" className="mgmt-icon" alt="Delete" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;