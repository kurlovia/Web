import React from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import './ServiceDetail.css';

const servicesData = {
  upgrade: {
    title: "Апгрейд ПК",
    description: "Мы предлагаем профессиональную модернизацию вашего компьютера с использованием качественных комплектующих.",
    details: [
      "Замена процессора и системы охлаждения",
      "Установка современной видеокарты",
      "Добавление оперативной памяти",
      "Замена HDD на SSD",
      "Оптимизация системы"
    ],
    price: "от 5 000 ₽",
    image: "/images/services/upgrade-detail.jpg"
  },
  repair: {
    title: "Ремонт ПК",
    description: "Квалифицированный ремонт любой сложности с гарантией на работы.",
    details: [
      "Диагностика неисправностей",
      "Замена неработающих компонентов",
      "Чистка от пыли и замена термопасты",
      "Ремонт материнских плат",
      "Восстановление данных"
    ],
    price: "от 3 000 ₽",
    image: "/images/services/repair-detail.jpg"
  },
  // Добавьте другие услуги по аналогии
};

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const service = servicesData[serviceId];

  if (!service) {
    return <div>Услуга не найдена</div>;
  }

  const breadcrumbs = [
    { path: '/', name: 'Главная' },
    { path: '/services', name: 'Услуги' },
    { path: `/services/${serviceId}`, name: service.title }
  ];

  return (
    <div className="service-detail-container">
      <Breadcrumbs items={breadcrumbs} />
      
      <div className="service-detail">
        <div className="service-image">
          <img src={service.image} alt={service.title} />
        </div>
        
        <div className="service-info">
          <h1>{service.title}</h1>
          <p className="service-description">{service.description}</p>
          
          <div className="service-price">
            <span>Стоимость:</span>
            <strong>{service.price}</strong>
          </div>
          
          <div className="service-features">
            <h3>Что входит в услугу:</h3>
            <ul>
              {service.details.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          <button className="order-button">Заказать услугу</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;