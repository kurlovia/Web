import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import OrderServiceForm from '../../../components/OrderServiceForm/OrderServiceForm';
import Notification from '../../../components/Notification/Notification';
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
  diagnostic: {
    title: "Диагностика",
    description: "Комплексная проверка всех компонентов системы для выявления неисправностей.",
    details: [
      "Проверка аппаратных компонентов",
      "Тестирование системы охлаждения",
      "Диагностика операционной системы",
      "Проверка на вирусы и вредоносное ПО",
      "Составление отчета о состоянии системы"
    ],
    price: "от 1 500 ₽",
    image: "/images/services/diagnostic-detail.jpg"
  }
};

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const service = servicesData[serviceId];

  const handleOrderSubmit = (orderData) => {
    console.log('Данные заказа:', orderData);
    // Здесь можно добавить отправку данных на сервер
    alert(`Спасибо, ${orderData.name}! Ваша заявка на "${orderData.service}" принята. Мы свяжемся с вами в ближайшее время.`);
    setShowOrderForm(false);
  };
const closeNotification = () => {
    setNotification(null);
  };
  if (!service) {
    return (
      <div className="service-detail-container">
        <div className="service-not-found">
          <h1>Услуга не найдена</h1>
          <p>Извините, запрошенная услуга не существует.</p>
          <Link to="/services" className="back-button">Вернуться к услугам</Link>
        </div>
      </div>
    );
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
          
          <button 
            className="order-button" 
            onClick={() => setShowOrderForm(true)}
          >
            Заказать услугу
          </button>
        </div>
      </div>

      {showOrderForm && (
        <OrderServiceForm
          serviceTitle={service.title}
          onClose={() => setShowOrderForm(false)}
          onSubmit={handleOrderSubmit}
        />
      )}

      {notification && (
        <Notification 
          message={notification.message} 
          onClose={closeNotification} 
        />
      )}
    </div>
  );
};

export default ServiceDetail;