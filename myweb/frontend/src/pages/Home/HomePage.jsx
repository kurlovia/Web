import React from 'react';
import Header from '../../components/layout/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import PromoSlider from './components/PromoSlider/PromoSlider';
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <HeroSection />
      <PromoSlider />
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;