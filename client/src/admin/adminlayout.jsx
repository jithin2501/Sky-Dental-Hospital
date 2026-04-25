import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './adminstyle/adminlayout.css';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || 'Admin';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = 'Sky Dental Dashboard';
    return () => {
      document.title = 'Sky Dental Hospital | Odayanchal, Parapally, Kanhangad';
    };
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="admin-container">

      {/* ── Mobile Top Bar ── */}
      <div className="admin-mobile-topbar">
        {sidebarOpen ? (
          <button
            className="admin-close-toggle"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        ) : (
          <>
            <button
              className="admin-hamburger"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <span />
              <span />
              <span />
            </button>
            <span className="admin-mobile-title">DENTAL DASHBOARD</span>
          </>
        )}
      </div>

      {/* ── Sidebar Overlay (mobile backdrop) ── */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <div className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>

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
            <li className={location.pathname === '/admin/gallery' ? 'active' : ''}>
              <Link to="/admin/gallery">Gallery Management</Link>
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
          <div className="sidebar-logout-container">
            <button className="logout-btn" onClick={handleLogout}>Sign Out</button>
          </div>
        </div>
      </div>

      <div className="admin-main">{children}</div>
    </div>
  );
};

export default AdminLayout;