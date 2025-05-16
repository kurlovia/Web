import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import './ServicesPage.css';

const services = [
  {
    id: 'upgrade',
    title: "Апгрейд ПК",
    description: "Модернизация компонентов для повышения производительности",
    image: "/images/services/upgrade.jpg"
  },
  {
    id: 'repair',
    title: "Ремонт ПК",
    description: "Диагностика и ремонт компьютерной техники",
    image: "/images/services/repair.jpg"
  },
  {
    id: 'diagnostic',
    title: "Диагностика",
    description: "Полная проверка всех компонентов системы",
    image: "/images/services/diagnostic.jpg"
  }
];

const ServicesPage = () => {
  const breadcrumbs = [
    { path: '/', name: 'Главная' },
    { path: '/services', name: 'Услуги' }
  ];

  return (
    <div className="catalog-page">
      <Breadcrumbs items={breadcrumbs} />
      
      <div className="catalog-header">
        <h1>Наши услуги</h1>
        <p className="catalog-description">
          Профессиональные решения для вашей техники
        </p>
      </div>

      <div className="categories-grid">
        {services.map(service => (
          <Link to={`/services/${service.id}`} key={service.id} className="category-card">
            <div className="card-image">
              <img src={service.image} alt={service.title} />
            </div>
            <div className="card-content">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="category-link">Подробнее →</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;