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
    comments: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: ''
  });
  const [errors, setErrors] = useState({});
  const [orderSuccess, setOrderSuccess] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    return phone.replace(/\D/g, '').length >= 10;
  };

  const validateCardNumber = (number) => {
    return number.replace(/\D/g, '').length === 16;
  };

  const validateCardExpiry = (expiry) => {
    return /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiry);
  };

  const validateCardCvc = (cvc) => {
    return cvc.length === 3;
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

    if (step === 3) {
      if (formData.delivery === 'courier' || formData.payment === 'card') {
        if (!formData.cardNumber) {
          newErrors.cardNumber = 'Введите номер карты';
        } else if (!validateCardNumber(formData.cardNumber)) {
          newErrors.cardNumber = 'Некорректный номер карты';
        }
        if (!formData.cardExpiry) {
          newErrors.cardExpiry = 'Введите срок действия';
        } else if (!validateCardExpiry(formData.cardExpiry)) {
          newErrors.cardExpiry = 'Некорректный срок';
        }
        if (!formData.cardCvc) {
          newErrors.cardCvc = 'Введите CVC';
        } else if (!validateCardCvc(formData.cardCvc)) {
          newErrors.cardCvc = 'Некорректный CVC';
        }
        if (!formData.cardName.trim()) {
          newErrors.cardName = 'Введите имя на карте';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    console.log('Order submitted:', { 
      ...formData, 
      items: cartItems, 
      total,
      date: new Date().toISOString() 
    });
    
    clearCart();
    setOrderSuccess(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

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

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    let formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    if (formattedValue.length > 19) formattedValue = formattedValue.substring(0, 19);
    setFormData(prev => ({ ...prev, cardNumber: formattedValue }));
  };

  const handleCardExpiryChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    let formattedValue = value;
    if (value.length > 2) {
      formattedValue = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
    }
    if (formattedValue.length > 5) formattedValue = formattedValue.substring(0, 5);
    setFormData(prev => ({ ...prev, cardExpiry: formattedValue }));
  };

  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <div className="empty-cart-message">
        <h2>Ваша корзина пуста</h2>
        <p>Прежде чем оформить заказ, добавьте товары в корзину</p>
        <a href="/catalog" className="back-to-catalog">Вернуться в каталог</a>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="order-success-container">
        <div className="order-success-message">
          <h2>Заказ успешно оформлен!</h2>
          <p>Номер вашего заказа: #{Math.floor(Math.random() * 1000000)}</p>
          <p>Мы отправили детали заказа на {formData.email}</p>
          <a href="/" className="back-to-home">Вернуться на главную</a>
        </div>
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
                    <span className="radio-title">
                      {formData.delivery === 'courier' ? 'Онлайн оплата картой' : 'Картой при получении'}
                    </span>
                  </div>
                </label>
                
                {formData.delivery === 'pickup' && (
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
                    </div>
                  </label>
                )}
              </div>

              {(formData.delivery === 'courier' || formData.payment === 'card') && (
                <div className="card-details">
                  <div className={`form-group ${errors.cardNumber ? 'error' : ''}`}>
                    <label htmlFor="cardNumber">Номер карты*</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />
                    {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                  </div>

                  <div className="card-row">
                    <div className={`form-group ${errors.cardExpiry ? 'error' : ''}`}>
                      <label htmlFor="cardExpiry">Срок действия*</label>
                      <input
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleCardExpiryChange}
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                      {errors.cardExpiry && <span className="error-message">{errors.cardExpiry}</span>}
                    </div>

                    <div className={`form-group ${errors.cardCvc ? 'error' : ''}`}>
                      <label htmlFor="cardCvc">CVC*</label>
                      <input
                        type="text"
                        id="cardCvc"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleChange}
                        placeholder="123"
                        maxLength="3"
                      />
                      {errors.cardCvc && <span className="error-message">{errors.cardCvc}</span>}
                    </div>
                  </div>

                  <div className={`form-group ${errors.cardName ? 'error' : ''}`}>
                    <label htmlFor="cardName">Имя на карте*</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      placeholder="IVAN IVANOV"
                    />
                    {errors.cardName && <span className="error-message">{errors.cardName}</span>}
                  </div>
                </div>
              )}

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