import React from 'react';
import HeroSection from './components/HeroSection';
import FeaturedProducts from './components/FeaturedProducts';
import CategoriesSection from './components/CategoriesSection';
import ServicesSection from './components/ServicesSection';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
      <ServicesSection />
    </div>
  );
};

export default HomePage;