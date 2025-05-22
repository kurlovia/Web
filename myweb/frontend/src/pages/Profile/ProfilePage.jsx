import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaUserEdit, FaSave, FaPhone } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState('email'); // 'email' или 'sms'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const [orders, setOrders] = useState([]);
  const { currentUser, login, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
    
    if (currentUser) {
      const userOrders = JSON.parse(localStorage.getItem('orders')) || [];
      setOrders(userOrders.filter(order => order.userId === currentUser.id));
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleUpdateProfile = () => {
    const updatedUser = { 
      ...currentUser, 
      name: formData.name || currentUser.name,
      email: formData.email || currentUser.email,
      phone: formData.phone || currentUser.phone
    };

    const updatedUsers = users.map(user => 
      user.id === currentUser.id ? updatedUser : user
    );

    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    updateUser(updatedUser);
    setEditMode(false);
  };

  // SMS-аутентификация
  const sendSMSCode = async () => {
    try {
      await axios.post('/api/auth/sms/send-code', { phone: formData.phone });
      alert('Код отправлен на ваш номер!');
    } catch (error) {
      alert('Ошибка при отправке кода');
    }
  };

  const verifySMSCode = async () => {
    try {
      const { data } = await axios.post('/api/auth/sms/verify', { 
        phone: formData.phone, 
        code: formData.password 
      });
      localStorage.setItem('token', data.token);
      login(data.user);
      navigate('/');
    } catch (error) {
      alert('Неверный код подтверждения');
    }
  };

  const handleRegister = async () => {
    const existingUser = users.find(user => user.email === formData.email);
    if (existingUser) {
      setErrors({ email: 'Этот email уже зарегистрирован!' });
      return;
    }

    if (!formData.email.includes('@')) {
      setErrors({ email: 'Введите корректный email' });
      return;
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone || null
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    login(newUser);
    navigate('/');
  };

  const handleLogin = () => {
    try {
      const user = users.find(u => 
        u.email === formData.email && u.password === formData.password
      );
      
      if (user) {
        login(user);
        navigate('/');
      } else {
        setErrors({ password: 'Неверный email или пароль' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Произошла ошибка при входе' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMethod === 'sms') {
      verifySMSCode();
    } else if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  if (currentUser) {
    return (
      <div className="profile-container">
        <div className="profile-content">
          <div className="profile-header">
            <h2>Личный кабинет</h2>
            <div className="profile-actions">
              <button 
                onClick={() => setEditMode(!editMode)}
                className="action-button"
              >
                <FaUserEdit /> {editMode ? 'Отменить' : 'Редактировать'}
              </button>
              <button 
                onClick={() => {
                  logout();
                  navigate('/profile');
                }}
                className="action-button logout"
              >
                Выйти
              </button>
            </div>
          </div>

          {editMode ? (
            <div className="profile-section">
              <h3>Редактирование профиля</h3>
              <div className="form-group">
                <label>Имя</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || currentUser.name || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || currentUser.email || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Телефон</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || currentUser.phone || ''}
                  onChange={handleChange}
                  placeholder="+7 (XXX) XXX-XX-XX"
                />
              </div>
              <button 
                onClick={handleUpdateProfile}
                className="save-button"
              >
                <FaSave /> Сохранить изменения
              </button>
            </div>
          ) : (
            <div className="profile-section">
              <h3>Мой профиль</h3>
              <div className="profile-info">
                <p><strong>Имя:</strong> {currentUser.name}</p>
                <p><strong>Email:</strong> {currentUser.email}</p>
                {currentUser.phone && <p><strong>Телефон:</strong> {currentUser.phone}</p>}
              </div>
            </div>
          )}

          <div className="profile-section">
            <h3>История заказов</h3>
            {orders.length > 0 ? (
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="order-item">
                    <p><strong>Заказ #{order.id}</strong></p>
                    <p>Дата: {new Date(order.date).toLocaleDateString()}</p>
                    <p>Сумма: {order.total} руб.</p>
                    <p>Статус: {order.status}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>У вас пока нет заказов</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="auth-form">
        <h2>{isLogin ? 'Вход в аккаунт' : 'Регистрация'}</h2>

        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setAuthMethod('email')}
            className={`auth-method-switch ${authMethod === 'email' ? 'active' : ''}`}
          >
            По email
          </button>
          <button 
            onClick={() => setAuthMethod('sms')}
            className={`auth-method-switch ${authMethod === 'sms' ? 'active' : ''}`}
          >
            По SMS
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {authMethod === 'sms' ? (
            <>
              <div className="form-group">
                <label>Номер телефона</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+7 (XXX) XXX-XX-XX"
                  required
                />
              </div>
              <button 
                type="button"
                onClick={sendSMSCode}
                className="auth-button"
                style={{ marginBottom: '15px' }}
              >
                <FaPhone /> Отправить код
              </button>
              <div className="form-group">
                <label>Код из SMS</label>
                <input
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Введите 6-значный код"
                  required
                />
              </div>
            </>
          ) : (
            <>
              {!isLogin && (
                <div className="form-group">
                  <label>Имя</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required={!isLogin}
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
                  required={authMethod === 'email'}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label>{authMethod === 'sms' ? 'Код из SMS' : 'Пароль'}</label>
                <input
                  type={authMethod === 'sms' ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={authMethod === 'email' ? 6 : undefined}
                  placeholder={authMethod === 'sms' ? 'Введите код' : ''}
                />
              </div>
              {authMethod === 'email' && !isLogin && (
                <div className="form-group">
                  <label>Телефон (необязательно)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 (XXX) XXX-XX-XX"
                  />
                </div>
              )}
            </>
          )}

          <button type="submit" className="auth-button">
            {authMethod === 'sms' ? 'Подтвердить' : isLogin ? 'Войти' : 'Зарегистрироваться'}
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