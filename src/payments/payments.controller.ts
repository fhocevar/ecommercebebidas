import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('process')
  async processPayment(
    @Body('paymentIntentId') paymentIntentId: string,
    @Body('amount') amount: number
  ) {
    return this.paymentsService.processPayment(paymentIntentId, amount);
  }
}