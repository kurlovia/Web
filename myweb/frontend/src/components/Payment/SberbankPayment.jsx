import { useState } from 'react';
import api from '../../api';

export default function SberbankPayment({ amount, orderId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    setLoading(true);
    try {
      const returnUrl = `${window.location.origin}/payment/result`;
      
      const { data } = await api.post('/payments/sberbank/register', {
        amount,
        orderNumber: orderId,
        returnUrl
      });

      window.location.href = data.formUrl; // Перенаправление на страницу Сбера
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sber-payment">
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Перенаправление...' : `Оплатить через Сбербанк ${amount} ₽`}
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
}