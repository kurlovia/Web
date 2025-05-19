import React from 'react';
import { Link } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  return (
    <div className="order-success-container">
      <div className="order-success-card">
        <div className="success-icon">✓</div>
        <h1>Заказ успешно оформлен!</h1>
        <p>Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время для подтверждения.</p>
        <p>Номер вашего заказа: #{Math.floor(Math.random() * 1000000)}</p>
        
        <div className="success-actions">
          <Link to="/catalog" className="continue-shopping">
            Продолжить покупки
          </Link>
          <Link to="/profile" className="view-orders">
            Мои заказы
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;