import React from 'react';
import Button from '../../../../components/common/Button/Button';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Мощные компьютеры для любых задач</h1>
        <p>Соберите свой идеальный ПК или выберите из готовых решений</p>
        <div className="hero-actions">
          <Button variant="primary">Конфигуратор</Button>
          <Button variant="outline">Каталог</Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;