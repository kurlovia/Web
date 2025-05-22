// Header.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaLaptop, 
  FaTools, 
  FaShoppingCart, 
  FaUser,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const { cartItems } = useCart();
  const { currentUser } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="main-header">
      <div className="header-container">
        <button 
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <Link to="/" className="logo">TechZone</Link>

        <div className={`nav-content ${menuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`nav-button ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            <FaHome className="nav-icon" />
            <span>Главная</span>
          </Link>
          
          <Link 
            to="/catalog" 
            className={`nav-button ${location.pathname === '/catalog' ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            <FaLaptop className="nav-icon" />
            <span>Каталог</span>
          </Link>
          
          <Link 
            to="/services" 
            className={`nav-button ${location.pathname === '/services' ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            <FaTools className="nav-icon" />
            <span>Услуги</span>
          </Link>
          
          <div className="cart-button-container">
            <Link 
              to="/cart" 
              className={`nav-button ${location.pathname === '/cart' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <FaShoppingCart className="nav-icon" />
              <span>Корзина</span>
              {cartItems.length > 0 && (
                <span className="cart-badge">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>
          </div>
          
          <Link 
            to={currentUser ? "/profile" : "/profile"}
            className={`nav-button ${location.pathname === '/profile' ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            <FaUser className="nav-icon" />
            <span>{currentUser ? currentUser.name : 'Войти'}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;