import React from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import './ServicesPage.css';

const services = [
  {
    id: 'upgrade',
    title: "Апгрейд ПК",
    description: "Модернизация компонентов для повышения производительности",
    icon: "💻",
    image: "/images/services/upgrade.jpg"
  },
  {
    id: 'repair',
    title: "Ремонт ПК",
    description: "Диагностика и ремонт компьютерной техники",
    icon: "🔧",
    image: "/images/services/repair.jpg"
  },
  {
    id: 'custom',
    title: "Кастомизация",
    description: "Уникальный дизайн для вашего компьютера",
    icon: "🎨",
    image: "/images/services/custom.jpg"
  },
  {
    id: 'diagnostic',
    title: "Диагностика",
    description: "Полная проверка всех компонентов системы",
    icon: "🩺",
    image: "/images/services/diagnostic.jpg"
  }
];

const ServicesPage = () => {
  return (
    <div className="services-container">
      <div className="services-header">
        <h1>Наши услуги</h1>
        <p>Профессиональные решения для вашей техники</p>
      </div>
      
      <div className="services-grid">
        {services.map(service => (
          <Link to={`/services/${service.id}`} key={service.id}>
            <ServiceCard 
              title={service.title}
              description={service.description}
              icon={service.icon}
              image={service.image}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;