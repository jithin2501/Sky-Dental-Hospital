import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './adminstyle/admincontact.css';

const AdminLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="admin-container">
      {/* Sidebar - Fixed on the left */}
      <div className="admin-sidebar">
        <div className="sidebar-brand">
          <h2>Sky Dental</h2>
        </div>
        <ul className="sidebar-links">
          <li className={location.pathname === '/admin' ? 'active' : ''}>
            <Link to="/admin">Contact Messages</Link>
          </li>
          <li><Link to="/admin/videos">Upload Video</Link></li>
          <li><Link to="/admin/properties">Manage Properties</Link></li>
        </ul>
        <div className="sidebar-bottom">
          <button className="logout-btn">Log Out</button>
        </div>
      </div>

      {/* Main Content - Dynamic area */}
      <div className="admin-main">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;