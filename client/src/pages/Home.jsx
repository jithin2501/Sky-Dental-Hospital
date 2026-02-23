import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import CEOSection from '../components/CEOSection';
import VideoSection from '../components/VideoSection';
import ProvidersGrid from '../components/ProvidersGrid';
import Services from '../components/Services';
import FacilitiesSection from '../components/FacilitiesSection';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <AboutSection />
      <CEOSection />
      <VideoSection />
      <ProvidersGrid />
      <Services />
      <FacilitiesSection />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;
