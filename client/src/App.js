import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import DoctorProfile from './pages/DoctorProfile';
import ServiceDetail from './pages/ServiceDetail';
import FacilityDetail from './pages/FacilityDetail';

// Admin Imports
import AdminContact from './admin/admincontact'; 
import UserManagement from './admin/usermanagement'; // Import the new User Management component
import Login from './admin/auth/login';

function App() {
  // Function to check if the admin is authenticated
  const isAuthenticated = () => {
    return localStorage.getItem('isAdminAuthenticated') === 'true'; //
  };

  // Function to check if the current user is a Superadmin
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
        
        {/* Admin Login Route */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Contact Messages Route - Accessible by all Admins */}
        <Route 
          path="/admin" 
          element={isAuthenticated() ? <AdminContact /> : <Navigate to="/admin/login" />} 
        />

        {/* Protected User Management Route - Accessible ONLY by Superadmin */}
        <Route 
          path="/admin/users" 
          element={
            isAuthenticated() && isSuperAdmin() 
              ? <UserManagement /> 
              : <Navigate to="/admin" />
          } 
        />

        {/* Catch-all redirect for admin sub-paths */}
        <Route path="/admin/*" element={<Navigate to="/admin" />} />
      </Routes>
    </Router>
  );
}

export default App;