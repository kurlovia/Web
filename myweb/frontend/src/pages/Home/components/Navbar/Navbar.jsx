import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) setCurrentUser(JSON.parse(user));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    window.location.reload();
  };

  return (
    <nav className="navbar">
      {/* Ваше существующее меню */}

      <div className="profile-wrapper">
        {currentUser ? (
          <div className="profile-container">
            <button 
              className="profile-btn"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <FaUser />
            </button>
            
            {isProfileOpen && (
              <div className="profile-dropdown">
                <div className="profile-info">
                  <p>Имя: {currentUser.name}</p>
                  <p>Email: {currentUser.email}</p>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                  Выйти
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="login-link">
            Войти
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;