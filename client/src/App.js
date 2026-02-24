import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import DoctorProfile from './pages/DoctorProfile';
import ServiceDetail from './pages/ServiceDetail';
import FacilityDetail from './pages/FacilityDetail';
import VideoManagement from './admin/VideoManagement';
import TeamManagement from './admin/TeamManagement'; // ✅ New

// Admin Imports
import AdminContact from './admin/admincontact'; 
import UserManagement from './admin/usermanagement';
import Login from './admin/auth/login';

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem('isAdminAuthenticated') === 'true';
  };

  const isSuperAdmin = () => {
    return localStorage.getItem('userRole') === 'Superadmin';
  };

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<DoctorProfile />} />
        <Route path="/team/:id" element={<DoctorProfile />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/facility/:slug" element={<FacilityDetail />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected - All Admins */}
        <Route
          path="/admin"
          element={isAuthenticated() ? <AdminContact /> : <Navigate to="/admin/login" />}
        />

        {/* Protected - Superadmin only */}
        <Route
          path="/admin/video"
          element={isAuthenticated() && isSuperAdmin() ? <VideoManagement /> : <Navigate to="/admin" />}
        />
        <Route
          path="/admin/team"
          element={isAuthenticated() && isSuperAdmin() ? <TeamManagement /> : <Navigate to="/admin" />}
        />
        <Route
          path="/admin/users"
          element={isAuthenticated() && isSuperAdmin() ? <UserManagement /> : <Navigate to="/admin" />}
        />

        {/* Catch-all */}
        <Route path="/admin/*" element={<Navigate to="/admin" />} />
      </Routes>
    </Router>
  );
}

export default App;