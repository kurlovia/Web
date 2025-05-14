import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaList, FaTools, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/profile');
  };

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

      {/* User Info Section */}
      <div className="user-info">
        {currentUser ? (
          <>
            <span className="user-name">{currentUser.name}</span>
            <button onClick={handleLogout} className="logout-icon">
              <FaSignOutAlt />
            </button>
          </>
        ) : (
          <Link to="/profile" className="login-link">
            <FaUser /> Войти
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;