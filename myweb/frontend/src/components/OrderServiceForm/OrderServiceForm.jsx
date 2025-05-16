import React, { useState, useRef } from 'react';
import './OrderServiceForm.css';

const OrderServiceForm = ({ serviceTitle, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    comment: ''
  });
  const [isClosing, setIsClosing] = useState(false);
  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, service: serviceTitle });
  };
  
const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className={`order-form-overlay ${isClosing ? 'closing' : ''}`}>
      <div 
        ref={formRef}
        className={`order-form-container ${isClosing ? 'closing' : ''}`}
      >
        <button className="order-form-close" onClick={onClose}>×</button>
        <h2 className="order-form-title">Заказ услуги: {serviceTitle}</h2>
        
        <form className="order-form" onSubmit={handleSubmit}>
          <div className="order-form-group">
            <label className="order-form-label">Ваше имя:</label>
            <input
              className="order-form-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="order-form-group">
            <label className="order-form-label">Телефон:</label>
            <input
              className="order-form-input"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="order-form-group">
            <label className="order-form-label">Email:</label>
            <input
              className="order-form-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="order-form-group">
            <label className="order-form-label">Комментарий:</label>
            <textarea
              className="order-form-textarea"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="order-form-submit">
            Отправить заявку
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderServiceForm;