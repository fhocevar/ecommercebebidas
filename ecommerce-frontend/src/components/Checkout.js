import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-public-key-from-stripe');

const Checkout = () => {
  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const [amount, setAmount] = useState(0); // Valor do pagamento

  const handleSubmit = async (e) => {
    e.preventDefault();

    const stripe = await stripePromise;
    
    // Criar o Payment Intent no backend
    const response = await fetch('/payments/process', {
      method: 'POST',
      body: JSON.stringify({
        paymentIntentId, // O id do paymentIntent que foi retornado do backend
        amount, // Valor a ser cobrado
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const { clientSecret } = await response.json();

    // Confirmar o pagamento com Stripe.js
    const result = await stripe.confirmCardPayment(clientSecret);

    if (result.error) {
      console.error('Payment failed:', result.error.message);
    } else {
      console.log('Payment successful!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Pay</button>
    </form>
  );
};

export default Checkout;