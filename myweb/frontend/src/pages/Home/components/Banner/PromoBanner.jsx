import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './PromoBanner.css';

const banners = [
  {
    title: "Скидка 20% на игровые ПК",
    subtitle: "Только этой недели!",
    bgColor: "#4CAF50",
    textColor: "#fff"
  },
  {
    title: "Бесплатная доставка",
    subtitle: "При заказе от 100 000₽",
    bgColor: "#2196F3",
    textColor: "#fff"
  },
  {
    title: "Апгрейд в подарок",
    subtitle: "При покупке от 150 000₽",
    bgColor: "#FF9800",
    textColor: "#000"
  }
];

const PromoBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentBanner = banners[currentIndex];

  return (
    <div 
      className="promo-banner"
      style={{ 
        backgroundColor: currentBanner.bgColor,
        color: currentBanner.textColor
      }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <button className="nav-button prev" onClick={prevSlide}>
        <FaChevronLeft />
      </button>
      
      <div className="banner-content">
        <h3>{currentBanner.title}</h3>
        <p>{currentBanner.subtitle}</p>
        <button className="action-button">Подробнее</button>
      </div>
      
      <button className="nav-button next" onClick={nextSlide}>
        <FaChevronRight />
      </button>
      
      <div className="dots-container">
        {banners.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoBanner;