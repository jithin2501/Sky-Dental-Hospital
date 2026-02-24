import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './adminstyle/admincontact.css';

const AdminLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className="sidebar-brand">
          <h2>Sky Dental</h2>
        </div>
        <ul className="sidebar-links">
          <li className={location.pathname === '/admin' ? 'active' : ''}>
            <Link to="/admin">Contact Messages</Link>
          </li>
          {/* Extra links removed */}
        </ul>
      </div>

      <div className="admin-main">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;