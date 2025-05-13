import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './HeroSection.css';

const heroSlides = [
  {
    tag: "Эксклюзив",
    title: "HYPERPC APEX",
    subtitle: "Симуляторные системы для аттестации и анализа",
    specs: ["RTX 4090", "i9-13900K"],
    cta: "Узнать блоки +",
    bgImage: "/assets/hero-bg1.jpg"
  },
  {
    tag: "Акция",
    title: "GAMER PRO SERIES",
    subtitle: "Максимальная производительность для киберспорта",
    specs: ["RTX 4080", "Ryzen 9 7950X"],
    cta: "Собрать систему",
    bgImage: "/assets/hero-bg2.jpg"
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(nextSlide, 7000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  const current = heroSlides[currentSlide];

  return (
    <section 
      className="hero-section"
      style={{ backgroundImage: `url(${current.bgImage})` }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <button className="hero-arrow left" onClick={prevSlide}>
        <FaChevronLeft />
      </button>

      <div className="hero-content">
        <div className="hero-tag">{current.tag}</div>
        <h1>{current.title}</h1>
        <p className="hero-subtitle">{current.subtitle}</p>
        
        <div className="hero-specs">
          {current.specs.map((spec, index) => (
            <div key={index} className="spec-item">
              <span className="spec-value">{spec}</span>
              {index === 0 && <span className="spec-label">Видеокарта</span>}
              {index === 1 && <span className="spec-label">Процессор</span>}
            </div>
          ))}
        </div>
        
        <button className="hero-button">{current.cta}</button>
      </div>

      <button className="hero-arrow right" onClick={nextSlide}>
        <FaChevronRight />
      </button>

      <div className="hero-dots">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;