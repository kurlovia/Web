import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';
import 'C:/git/Web/myweb/frontend/src/styles/responsive.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="cart-page">
      <h1>Ваша корзина</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Ваша корзина пуста</p>
          <Link to="/catalog" className="continue-shopping">
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={`${item.id}-${item.size}`} className="cart-item">
                {/* Картинка товара */}
                <div className="item-image">
                  <img 
                    src={item.image || '/images/default-product.jpg'} 
                    alt={item.name} 
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = '/images/default-product.jpg'
                    }}
                  />
                </div>
                
                {/* Основная информация о товаре */}
                <div className="item-details">
                  <h3 className="item-title">{item.name}</h3>
                  
                  {item.size && <p className="item-size">Размер: {item.size}</p>}
                  {item.color && <p className="item-color">Цвет: {item.color}</p>}
                  
                  <div className="item-price">
                    <span className="price-single">{item.price} ₽</span>
                    <span className="price-total">= {item.price * item.quantity} ₽</span>
                  </div>
                </div>
                
                {/* Управление количеством */}
                <div className="item-controls">
                  <div className="quantity-selector">
                    <button
                      className="quantity-btn minus"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                      className="quantity-input"
                    />
                    <button
                      className="quantity-btn plus"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                  >
                    <span className="icon-trash">🗑️</span>
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="summary-row">
              <span>Товары ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
              <span>{total} ₽</span>
            </div>
            
            <div className="summary-total">
              <h3>Итого:</h3>
              <h3>{total} ₽</h3>
            </div>
            
            <div className="cart-actions">
              <button onClick={clearCart} className="clear-btn">
                Очистить корзину
              </button>
              <Link to="/checkout" className="checkout-btn">
                Оформить заказ
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;