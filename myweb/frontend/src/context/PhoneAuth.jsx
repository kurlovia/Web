import React, { useState } from 'react';
import axios from 'axios';

const PhoneAuth = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' или 'code'

  const sendCode = async () => {
    try {
      await axios.post('http://your-laravel-api/api/send-code', { phone });
      setStep('code');
    } catch (error) {
      alert('Ошибка отправки кода');
    }
  };

  const verifyCode = async () => {
    try {
      const { data } = await axios.post('http://your-laravel-api/api/verify-code', {
        phone,
        code,
      });
      localStorage.setItem('token', data.token);
      alert('Успешный вход!');
    } catch (error) {
      alert('Неверный код');
    }
  };

  return (
    <div>
      {step === 'phone' && (
        <div>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (XXX) XXX-XX-XX"
          />
          <button onClick={sendCode}>Отправить код</button>
        </div>
      )}

      {step === 'code' && (
        <div>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Введите код из SMS"
          />
          <button onClick={verifyCode}>Подтвердить</button>
        </div>
      )}
    </div>
  );
};

export default PhoneAuth;