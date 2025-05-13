import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './PromoSlider.css';

const slides = [
  {
    title: "Скидка 20% на игровые ПК",
    subtitle: "Только этой недели!",
    cta: "Подробнее",
    bg: "linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)"
  },
  {
    title: "Бесплатная сборка",
    subtitle: "При покупке от 150 000₽",
    cta: "Условия акции",
    bg: "linear-gradient(135deg, #2196F3 0%, #0D47A1 100%)"
  },
    {
    title: "Апгрейд в подарок",
    subtitle: "При покупке от 150 000₽",
    bgColor: "#FF9800",
    textColor: "#000",
    cta: "Узнать",
    bg: "linear-gradient(132deg,rgb(20, 31, 19) 0%, #0D47A1 100%)"
  }
];

const PromoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="promo-slider">
      <button className="slider-arrow left" onClick={prevSlide}>
        <FaChevronLeft />
      </button>
      
      <div 
        className="slider-content"
        style={{ background: slides[currentSlide].bg }}
      >
        <h3>{slides[currentSlide].title}</h3>
        <p>{slides[currentSlide].subtitle}</p>
        <button className="action-button">{slides[currentSlide].cta}</button>
      </div>
      
      <button className="slider-arrow right" onClick={nextSlide}>
        <FaChevronRight />
      </button>
      
      <div className="slider-dots">
        {slides.map((_, index) => (
          <span 
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoSlider;