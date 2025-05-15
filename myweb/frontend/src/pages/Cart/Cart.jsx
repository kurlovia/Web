import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cart, removeFromCart, clearCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h1>Ваша корзина</h1>
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <h3>{item.name}</h3>
                <p>Цена: {item.price} руб.</p>
                <p>Количество: {item.quantity}</p>
                <button onClick={() => removeFromCart(item.id)}>Удалить</button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Итого: {total} руб.</h3>
            <Link to="/checkout">
              <button className="checkout-btn">Оформить заказ</button>
            </Link>
            <button onClick={clearCart} className="clear-btn">Очистить корзину</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;