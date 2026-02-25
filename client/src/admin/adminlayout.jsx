import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './adminstyle/adminlayout.css';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || 'Admin';

  useEffect(() => {
    document.title = 'Sky Dental Dashboard';
    return () => {
      document.title = 'Sky Dental Hospital';
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    navigate('/admin/login', { replace: true });
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
            <li className={location.pathname === '/admin/team' ? 'active' : ''}>
              <Link to="/admin/team">Team Management</Link>
            </li>
            <li className={location.pathname === '/admin/team-details' ? 'active' : ''}>
              <Link to="/admin/team-details">Team Details</Link>
            </li>
            <li className={location.pathname === '/admin/reviews' ? 'active' : ''}>
              <Link to="/admin/reviews">Review Management</Link>
            </li>
            <li className={location.pathname === '/admin/review-qr' ? 'active' : ''}>
              <Link to="/admin/review-qr">Review QR Code</Link>
            </li>
            <li className={location.pathname.startsWith('/admin/analytics') ? 'active' : ''}>
              <Link to="/admin/analytics">Analytics Dashboard</Link>
            </li>
            {userRole === 'Superadmin' && (
              <li className={location.pathname === '/admin/users' ? 'active' : ''}>
                <Link to="/admin/users">User Management</Link>
              </li>
            )}
          </ul>
        </div>

        <div className="sidebar-bottom">
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </div>
      </div>

      <div className="admin-main">{children}</div>
    </div>
  );
};

export default AdminLayout;