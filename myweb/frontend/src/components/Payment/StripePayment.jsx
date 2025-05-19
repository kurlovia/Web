import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import api from '../../api';

// Добавляем проверку на наличие ключа Stripe
const stripePromise = process.env.REACT_APP_STRIPE_PUBLIC_KEY 
  ? loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
  : null;

function StripeForm({ amount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Проверяем, что Stripe и Elements загружены
    if (!stripe || !elements) {
      setError('Платежная система не загружена');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Получаем client_secret с сервера
      const { data } = await api.post('/payments/stripe/create-payment-intent', { 
        amount: Math.round(amount * 100) // Конвертируем в центы
      });

      // 2. Подтверждаем платеж на стороне Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret, 
        {
          payment_method: {
            card: elements.getElement(CardElement),
          }
        }
      );

      if (stripeError) {
        throw stripeError;
      }
      
      // Вызываем колбэк при успешной оплате
      onSuccess(paymentIntent);
    } catch (err) {
      setError(err.message || 'Ошибка при обработке платежа');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <CardElement 
        options={{ 
          style: { 
            base: { 
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#ff5252',
            },
          },
          hidePostalCode: true,
        }} 
      />
      {error && <div className="error">{error}</div>}
      <button 
        type="submit" 
        disabled={!stripe || loading}
        className="pay-button"
      >
        {loading ? 'Обработка...' : `Оплатить ${amount} ₽`}
      </button>
    </form>
  );
}

export default function StripePayment({ amount, onSuccess }) {
  // Проверяем, что StripePromise загружен
  if (!stripePromise) {
    return <div>Платежная система недоступна</div>;
  }

  return (
    <Elements stripe={stripePromise}>
      <StripeForm 
        amount={amount} 
        onSuccess={onSuccess || ((paymentIntent) => {
          console.log('Payment succeeded:', paymentIntent);
          alert('Платеж успешно завершен!');
        })} 
      />
    </Elements>
  );
}