const crypto = require('crypto');
const axios = require('axios');
const express = require('express');
const router = express.Router();

const SBERBANK_API_URL = process.env.SBERBANK_API_URL || 'https://securepayments.sberbank.ru';
const SBERBANK_USERNAME = process.env.SBERBANK_USERNAME;
const SBERBANK_PASSWORD = process.env.SBERBANK_PASSWORD;

// Регистрация заказа
router.post('/register', async (req, res) => {
  try {
    const { amount, orderNumber, returnUrl } = req.body;
    
    const token = generateToken(orderNumber, amount);
    
    const response = await axios.post(`${SBERBANK_API_URL}/payment/rest/register.do`, {
      userName: SBERBANK_USERNAME,
      password: SBERBANK_PASSWORD,
      orderNumber,
      amount: amount * 100, // в копейках
      currency: '643', // RUB
      returnUrl,
      failUrl: returnUrl + '?status=fail',
      token
    });

    if (response.data.errorCode) {
      throw new Error(response.data.errorMessage);
    }

    res.json({ 
      formUrl: response.data.formUrl,
      orderId: response.data.orderId 
    });
  } catch (err) {
    console.error('Sberbank error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Проверка статуса заказа
router.post('/status', async (req, res) => {
  try {
    const { orderId } = req.body;
    
    const response = await axios.post(`${SBERBANK_API_URL}/payment/rest/getOrderStatusExtended.do`, {
      userName: SBERBANK_USERNAME,
      password: SBERBANK_PASSWORD,
      orderId,
      language: 'ru'
    });

    res.json(response.data);
  } catch (err) {
    console.error('Sberbank status error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Webhook обработчик
router.post('/webhook', async (req, res) => {
  try {
    const { mdOrder, orderNumber, status } = req.body;
    
    if (status === 1) { // 1 - успешная оплата
      await handleSuccessfulPayment(orderNumber, mdOrder);
    }

    res.status(200).end();
  } catch (err) {
    console.error('Sberbank webhook error:', err);
    res.status(500).end();
  }
});

function generateToken(orderNumber, amount) {
  const secret = process.env.SBERBANK_SECRET;
  return crypto
    .createHash('sha256')
    .update(`${orderNumber};${amount};${secret}`)
    .digest('hex');
}

async function handleSuccessfulPayment(orderNumber, mdOrder) {
  // Логика подтверждения платежа в вашей БД
  console.log('Sber payment succeeded:', orderNumber, mdOrder);
}

module.exports = router;