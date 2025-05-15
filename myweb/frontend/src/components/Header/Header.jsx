import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHome, 
  FaLaptop, 
  FaDesktop, 
  FaMicrochip, 
  FaTools, 
  FaShoppingCart, 
  FaUser 
} from 'react-icons/fa';
import './Header.css';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const { cartItems } = useCart();

  return (
    <header className="main-header">
      <div className="header-container">
        <Link to="/" className="logo">TechZone</Link>
        
        <nav className="main-nav">
          <Link to="/" className="nav-link">
            <FaHome className="nav-icon" />
            <span>Главная</span>
          </Link>
          <Link to="/catalog" className="nav-link active">
            <FaLaptop className="nav-icon" />
            <span>Каталог</span>
          </Link>
          <Link to="/services" className="nav-link">
            <FaTools className="nav-icon" />
            <span>Услуги</span>
          </Link>
          <Link to="/cart" className="nav-link cart-link">
            <FaShoppingCart className="nav-icon" />
            <span>Корзина</span>
            {cartItems.length > 0 && (
              <span className="cart-counter">{cartItems.length}</span>
            )}
          </Link>
          <Link to="/profile" className="nav-link">
            <FaUser className="nav-icon" />
            <span>Профиль</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;