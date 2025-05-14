import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import './ProfilePage.css';

const ProfilePage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [errors, setErrors] = useState({}); // Добавлено состояние для ошибок
  const navigate = useNavigate();

  // Загрузка пользователей из localStorage при монтировании
  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
    
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      setCurrentUser(JSON.parse(loggedInUser));
      navigate('/'); // Перенаправляем на главную если уже авторизован
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRegister = () => {
    const newUser = {
      id: Date.now(),
      ...formData
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    setIsLogin(true); // Переключаем на форму входа
    setFormData({ email: formData.email, password: '', name: '' }); // Очищаем только пароль
    
    alert('Регистрация успешна! Теперь войдите в аккаунт.');
  };

  const handleLogin = () => {
    const user = users.find(u => 
      u.email === formData.email && u.password === formData.password
    );
    
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/'); // Перенаправляем на главную
    } else {
      alert('Неверный email или пароль');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Валидация email
    const newErrors = {};
    if (!formData.email.includes('@')) {
      newErrors.email = 'Введите корректный email';
    }
    
    setErrors(newErrors);
    
    // Если ошибок нет, продолжаем
    if (Object.keys(newErrors).length === 0) {
      if (isLogin) {
        handleLogin();
      } else {
        handleRegister();
      }
    }
  };

  if (currentUser) {
    return (
      <div className="profile-container">
        <div className="auth-form">
          <h2>Добро пожаловать, {currentUser.name}!</h2>
          <button 
            onClick={() => {
              localStorage.removeItem('currentUser');
              setCurrentUser(null);
            }}
            className="logout-button"
          >
            Выйти
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="auth-form">
        <h2>{isLogin ? 'Вход в аккаунт' : 'Регистрация'}</h2>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Имя</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
          
          <button type="submit" className="auth-button">
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>
        
        <div className="social-auth">
          <button type="button" className="social-button google">
            <FaGoogle style={{ marginRight: 10 }} /> Войти через Google
          </button>
          <button type="button" className="social-button facebook">
            <FaFacebook style={{ marginRight: 10 }} /> Войти через Facebook
          </button>
        </div>

        <div className="auth-switch">
          {isLogin ? (
            <p>Нет аккаунта? <button onClick={() => setIsLogin(false)}>Зарегистрироваться</button></p>
          ) : (
            <p>Уже есть аккаунт? <button onClick={() => setIsLogin(true)}>Войти</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;