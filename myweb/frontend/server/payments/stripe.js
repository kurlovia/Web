const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const router = express.Router();

// Создание платежного интента
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'rub', metadata = {} } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // stripe работает в копейках/центах
      currency,
      metadata: {
        ...metadata,
        userId: req.user?.id || 'anonymous'
      }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Webhook для обработки событий
router.post('/webhook', express.raw({ type: 'application/json' }), 
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Обработка важных событий
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        await handleSuccessfulPayment(paymentIntent);
        break;
      case 'payment_intent.payment_failed':
        // Логика обработки неудачи
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  }
);

async function handleSuccessfulPayment(paymentIntent) {
  // Здесь логика подтверждения платежа в вашей БД
  console.log('Payment succeeded:', paymentIntent.id);
}

module.exports = router;