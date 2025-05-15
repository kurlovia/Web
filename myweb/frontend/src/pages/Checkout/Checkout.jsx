import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, total, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    payment: 'card',
    delivery: 'courier',
    comments: ''
  });
  const [errors, setErrors] = useState({});

  // Валидация email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Валидация телефона (минимальная проверка)
  const validatePhone = (phone) => {
    return phone.replace(/\D/g, '').length >= 10;
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Введите ФИО';
      if (!formData.email) {
        newErrors.email = 'Введите email';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Некорректный email';
      }
      if (!formData.phone) {
        newErrors.phone = 'Введите телефон';
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = 'Телефон слишком короткий';
      }
    }

    if (step === 2 && formData.delivery === 'courier' && !formData.address.trim()) {
      newErrors.address = 'Введите адрес доставки';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setStep(step + 1);
    window.scrollTo(0, 0); // Прокрутка вверх при переходе
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    // Здесь можно добавить отправку данных на сервер
    console.log('Order submitted:', { 
      ...formData, 
      items: cartItems, 
      total,
      date: new Date().toISOString() 
    });
    
    clearCart();
    // Перенаправление на страницу успешного оформления
    window.location.href = '/order-success';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Форматирование телефона
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';
    
    if (value.length > 0) {
      formattedValue = `+7 (${value.substring(1, 4)}) ${value.substring(4, 7)}-${value.substring(7, 9)}-${value.substring(9, 11)}`;
    }
    
    setFormData(prev => ({ ...prev, phone: formattedValue }));
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-message">
        <h2>Ваша корзина пуста</h2>
        <p>Прежде чем оформить заказ, добавьте товары в корзину</p>
        <a href="/catalog" className="back-to-catalog">Вернуться в каталог</a>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-form">
        <h1>Оформление заказа</h1>
        
        <div className="checkout-progress">
          <div className="progress-steps">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <div className="step-title">Контактные данные</div>
            </div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <div className="step-title">Доставка</div>
            </div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <div className="step-title">Оплата</div>
            </div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(step - 1) * 50}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Шаг 1: Контактные данные */}
          {step === 1 && (
            <div className="form-section">
              <h2>Контактная информация</h2>
              
              <div className={`form-group ${errors.name ? 'error' : ''}`}>
                <label htmlFor="name">ФИО*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Иванов Иван Иванович"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className={`form-group ${errors.email ? 'error' : ''}`}>
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="example@mail.com"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className={`form-group ${errors.phone ? 'error' : ''}`}>
                <label htmlFor="phone">Телефон*</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  required
                  placeholder="+7 (999) 123-45-67"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>
          )}

          {/* Шаг 2: Доставка */}
          {step === 2 && (
            <div className="form-section">
              <h2>Способ доставки</h2>
              
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="delivery"
                    value="courier"
                    checked={formData.delivery === 'courier'}
                    onChange={handleChange}
                  />
                  <div className="radio-content">
                    <span className="radio-title">Курьерская доставка</span>
                    <span className="radio-description">Доставка по указанному адресу</span>
                  </div>
                </label>
                
                <label className="radio-option">
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={formData.delivery === 'pickup'}
                    onChange={handleChange}
                  />
                  <div className="radio-content">
                    <span className="radio-title">Самовывоз</span>
                    <span className="radio-description">Забрать из нашего магазина</span>
                  </div>
                </label>
              </div>

              {formData.delivery === 'courier' && (
                <div className={`form-group ${errors.address ? 'error' : ''}`}>
                  <label htmlFor="address">Адрес доставки*</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Город, улица, дом, квартира"
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="comments">Комментарий к заказу</label>
                <textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Особенности доставки, пожелания и т.д."
                  rows="3"
                ></textarea>
              </div>
            </div>
          )}

          {/* Шаг 3: Оплата */}
          {step === 3 && (
            <div className="form-section">
              <h2>Способ оплаты</h2>
              
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={formData.payment === 'card'}
                    onChange={handleChange}
                  />
                  <div className="radio-content">
                    <span className="radio-title">Банковской картой</span>
                    <span className="radio-description">Оплата онлайн</span>
                  </div>
                </label>
                
                <label className="radio-option">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={formData.payment === 'cash'}
                    onChange={handleChange}
                  />
                  <div className="radio-content">
                    <span className="radio-title">Наличными при получении</span>
                    <span className="radio-description">Только для самовывоза</span>
                  </div>
                </label>
              </div>

              <div className="order-summary">
                <h3>Ваш заказ</h3>
                <div className="order-items">
                  {cartItems.map(item => (
                    <div key={item.id} className="order-item">
                      <div className="item-name">
                        <span>{item.name}</span>
                        <span>× {item.quantity}</span>
                      </div>
                      <div className="item-price">{item.price * item.quantity} ₽</div>
                    </div>
                  ))}
                </div>
                <div className="order-total">
                  <span>Итого:</span>
                  <span className="total-price">{total} ₽</span>
                </div>
              </div>
            </div>
          )}

          <div className="form-navigation">
            {step > 1 ? (
              <button 
                type="button" 
                className="nav-btn prev-btn"
                onClick={prevStep}
              >
                Назад
              </button>
            ) : (
              <a href="/cart" className="nav-btn prev-btn">
                Вернуться в корзину
              </a>
            )}
            
            {step < 3 ? (
              <button 
                type="button" 
                className="nav-btn next-btn"
                onClick={nextStep}
              >
                Продолжить
              </button>
            ) : (
              <button 
                type="submit" 
                className="submit-btn"
                disabled={Object.keys(errors).length > 0}
              >
                Подтвердить заказ
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;