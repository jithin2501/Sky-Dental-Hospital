import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import DoctorProfile from './pages/DoctorProfile';
import ServiceDetail from './pages/ServiceDetail';
import FacilityDetail from './pages/FacilityDetail';

// Updated import path for the new folder structure
import AdminContact from './admin/admincontact'; 

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
        
        {/* Updated component name to match the new import */}
        <Route path="/admin" element={<AdminContact />} />
      </Routes>
    </Router>
  );
}

export default App;