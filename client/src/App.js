import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import DoctorProfile from './pages/DoctorProfile';
import ServiceDetail from './pages/ServiceDetail';
import FacilityDetail from './pages/FacilityDetail';
import ReviewPage from './pages/ReviewPage';

import AdminContact       from './admin/admincontact';
import UserManagement     from './admin/usermanagement';
import VideoManagement    from './admin/VideoManagement';
import TeamManagement     from './admin/TeamManagement';
import TeamDetails        from './admin/TeamDetails';
import ReviewManagement   from './admin/ReviewManagement';
import ReviewQR           from './admin/ReviewQR';
import AnalyticsDashboard from './admin/AnalyticsDashboard';
import Login              from './admin/auth/login';

import analyticsTracker from './utils/analyticsTracker';
analyticsTracker.init();

const isAuthenticated = () =>
  localStorage.getItem('isAdminAuthenticated') === 'true';

const isSuperAdmin = () =>
  localStorage.getItem('userRole') === 'Superadmin';

const ProtectedRoute = ({ element, superAdminOnly = false }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  if (superAdminOnly && !isSuperAdmin()) {
    return <Navigate to="/admin" replace />;
  }

  return element;
};

const LoginRoute = () => {
  if (isAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }
  return <Login />;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<DoctorProfile />} />
        <Route path="/team/:id" element={<DoctorProfile />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/facility/:slug" element={<FacilityDetail />} />
        <Route path="/leave-review" element={<ReviewPage />} />

        <Route path="/admin/login" element={<LoginRoute />} />

        <Route path="/admin" element={<ProtectedRoute element={<AdminContact />} />} />
        <Route path="/admin/reviews" element={<ProtectedRoute element={<ReviewManagement />} />} />
        <Route path="/admin/review-qr" element={<ProtectedRoute element={<ReviewQR />} />} />
        <Route path="/admin/analytics" element={<ProtectedRoute element={<AnalyticsDashboard />} />} />
        <Route path="/admin/video" element={<ProtectedRoute element={<VideoManagement />} />} />
        <Route path="/admin/team" element={<ProtectedRoute element={<TeamManagement />} />} />
        <Route path="/admin/team-details" element={<ProtectedRoute element={<TeamDetails />} />} />

        <Route path="/admin/users" element={<ProtectedRoute element={<UserManagement />} superAdminOnly />} />

        <Route path="/admin/*" element={<Navigate to="/admin" replace />} />

      </Routes>
    </Router>
  );
}

export default App;