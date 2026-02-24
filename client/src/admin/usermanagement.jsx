import React, { useState, useEffect } from 'react';
import AdminLayout from './adminlayout';
import './adminstyle/admincontact.css';
import './adminstyle/usermanagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ username: '', password: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users');
      const dbData = await res.json();
      
      const superAdminEntry = {
        _id: 'static-super',
        username: process.env.REACT_APP_ADMIN_USERNAME || 'superadmin',
        role: 'Superadmin',
        status: 'Active',
        lastLogin: new Date().toISOString() 
      };

      setUsers([superAdminEntry, ...dbData]);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setFormData({ username: '', password: '' });
        fetchUsers();
      }
    } catch (err) {
      console.error("Creation error:", err);
    }
  };

  const handleDelete = async (id, role) => {
    if (role === 'Superadmin') return;
    if (window.confirm("Are you sure you want to delete this admin?")) {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, { method: 'DELETE' });
      if (res.ok) fetchUsers();
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <h1>USER MANAGEMENT</h1>
      </div>

      <div className="user-management-container">
        <h2>Create New Admin User</h2>
        <form onSubmit={handleCreate} className="user-form">
          <div className="user-form-group">
            <label className="input-label">Username:</label>
            <input type="text" className="admin-input" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} required />
          </div>
          <div className="user-form-group">
            <label className="input-label">Password:</label>
            <input type="password" className="admin-input" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          </div>
          <button type="submit" className="btn-create-admin">Create Admin Account</button>
        </form>
      </div>

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
            {users.map(user => (
              <tr key={user._id}>
                <td className="text-center bold-text">{user.username}</td>
                <td className="text-center">
                  <span className={`role-badge ${user.role === 'Superadmin' ? 'badge-super' : 'badge-admin'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="text-center status-active">Active</td>
                <td className="text-center">{new Date(user.lastLogin || Date.now()).toLocaleString('en-GB')}</td>
                <td className="text-center">
                  {user.role !== 'Superadmin' && (
                    <button onClick={() => handleDelete(user._id, user.role)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '18px'}}>
                        🗑️
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;