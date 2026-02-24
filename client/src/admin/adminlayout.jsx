import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './adminstyle/adminlayout.css';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve role for visibility control
  const userRole = localStorage.getItem('userRole') || 'Admin';

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    navigate('/admin/login');
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className="sidebar-top-group">
          <div className="sidebar-brand">
            <h2>DENTAL DASHBOARD</h2>
          </div>
          <ul className="sidebar-links">
            <li className={location.pathname === '/admin' ? 'active' : ''}>
              <Link to="/admin">Contact Messages</Link>
            </li>
            <li className={location.pathname === '/admin/video' ? 'active' : ''}>
        <Link to="/admin/video">Video Management</Link>
      </li>
            
            {userRole === 'Superadmin' && (
              <li className={location.pathname === '/admin/users' ? 'active' : ''}>
                <Link to="/admin/users">User Management</Link>
              </li>
            )}
          </ul>
        </div>
        
        <div className="sidebar-bottom">
          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>

      <div className="admin-main">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;