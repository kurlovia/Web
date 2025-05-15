import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
              <div key={`${item.id}-${item.quantity}`} className="cart-item">
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>Цена: {item.price} руб. × {item.quantity}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Итого: {total} руб.</h3>
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