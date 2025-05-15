import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaHome, 
  FaLaptop, 
  FaTools, 
  FaShoppingCart, 
  FaUser,
  FaSignOutAlt 
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext'; // Добавляем импорт useCart
import './Header.css';

const Header = () => {
  const { cartItems } = useCart(); // Теперь useCart определен
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Не показывать шапку на главной странице
  if (location.pathname === '/') return null;

  return (
    <header className="main-header">
      <div className="header-container">
        <Link to="/" className="logo">TechZone</Link>
        
        <nav className="main-nav">
          <Link to="/catalog" className={`nav-link ${location.pathname === '/catalog' ? 'active' : ''}`}>
            <FaLaptop className="nav-icon" />
            <span>Каталог</span>
          </Link>
          <Link to="/services" className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}>
            <FaTools className="nav-icon" />
            <span>Услуги</span>
          </Link>
          <Link to="/cart" className={`nav-link cart-link ${location.pathname === '/cart' ? 'active' : ''}`}>
            <FaShoppingCart className="nav-icon" />
            <span>Корзина</span>
            {cartItems.length > 0 && (
              <span className="cart-counter">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </Link>
        </nav>

        <div className="user-info">
          {currentUser ? (
            <div className="user-dropdown">
              <button className="user-btn">
                <FaUser className="nav-icon" />
                <span>{currentUser.name}</span>
              </button>
              <div className="dropdown-content">
                <p>{currentUser.email}</p>
                <button 
                  onClick={() => {
                    logout();
                    navigate('/');
                  }} 
                  className="logout-btn"
                >
                  <FaSignOutAlt /> Выйти
                </button>
              </div>
            </div>
          ) : (
            <Link to="/profile" className="login-link">
              <FaUser /> Войти
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;