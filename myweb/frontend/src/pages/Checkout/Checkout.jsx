import React, { useState } from 'react';
import './Checkout.css';

const Checkout = ({ cart }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика оформления заказа
    alert('Заказ оформлен!');
  };

  return (
    <div className="checkout">
      <h1>Оформление заказа</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ваше имя"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Адрес доставки"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          required
        />
        <input
          type="tel"
          placeholder="Телефон"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          required
        />
        <button type="submit">Подтвердить заказ</button>
      </form>
    </div>
  );
};

export default Checkout;