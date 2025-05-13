import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">PC Store</Link>
        <nav className="nav">
          <Link to="/">Главная</Link>
          <Link to="/configurator">Конфигуратор</Link>
          <Link to="/compare">Сравнение</Link>
          <Link to="/cart">Корзина</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;