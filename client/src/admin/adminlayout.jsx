import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './adminstyle/adminlayout.css'; // Importing the separate layout CSS

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clears the super admin session
    localStorage.removeItem('isAdminAuthenticated');
    // Redirects to the login page
    navigate('/admin/login');
  };

  return (
    <div className="admin-container">
      {/* Sidebar Section */}
      <div className="admin-sidebar">
        <div className="sidebar-top-group">
          <div className="sidebar-brand">
            <h2>Sky Dental</h2>
          </div>
          <ul className="sidebar-links">
            <li className={location.pathname === '/admin' ? 'active' : ''}>
              <Link to="/admin">Contact Messages</Link>
            </li>
          </ul>
        </div>
        
        {/* Logout Section at the Bottom */}
        <div className="sidebar-bottom">
          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content Viewport */}
      <div className="admin-main">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;