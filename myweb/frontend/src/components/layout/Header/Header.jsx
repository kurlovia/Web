import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaList, FaTools, FaShoppingCart } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">PC Home</Link>
        
        <nav className="nav">
          <Link to="/catalog" className="nav-link">
            <FaList className="nav-icon" /> Каталог
          </Link>
          <Link to="/services" className="nav-link">
            <FaTools className="nav-icon" /> Услуги
          </Link>
          <Link to="/cart" className="nav-link">
            <FaShoppingCart className="nav-icon" /> Корзина
          </Link>
          <Link to="/profile" className="nav-link">
            <FaUser className="nav-icon" /> Профиль
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;