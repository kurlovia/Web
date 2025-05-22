import React from 'react';
// import Header from '../../components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts';
// import PromoSlider from './components/PromoSlider/PromoSlider';
import './HomePage.css';
import 'C:/git/Web/myweb/frontend/src/styles/responsive.css';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* <Header /> */}
      <HeroSection />
      <FeaturedProducts />
      {/* <PromoSlider /> */}
    </div>
  );
};

export default HomePage;