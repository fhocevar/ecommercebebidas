import { Injectable } from '@nestjs/common';
import * as stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripeClient: stripe.Stripe;

  constructor() {
    this.stripeClient = new stripe.Stripe('your-stripe-secret-key', {
      apiVersion: '2024-12-18.acacia',  // Atualize para a versão mais recente
    });
  }

  // Processar o pagamento
  async processPayment(paymentIntentId: string, amount: number) {
    try {
      const paymentIntent = await this.stripeClient.paymentIntents.create({
        amount, // Quantidade a ser cobrada (em centavos)
        currency: 'usd', // Moeda
        payment_method: paymentIntentId, // ID do método de pagamento
        confirm: true, // Confirma o pagamento
      });

      return paymentIntent;
    } catch (error) {
      throw new Error(`Payment failed: ${error.message}`);
    }
  }
}
