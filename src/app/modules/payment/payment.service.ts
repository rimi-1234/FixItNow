import Stripe from 'stripe';
import prisma from '../../../lib/prisma.js';
import config from '../../../config/index.js';

const stripe = new Stripe(config.stripe_secret_key, {
  apiVersion: '2025-06-30.basil',
});

const createPaymentIntent = async (customerId: string, bookingId: string) => {
  // Verify the booking exists & is ACCEPTED
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { service: true, payment: true },
  });

  if (!booking) throw new Error('Booking not found');
  if (booking.customerId !== customerId) throw new Error('Access denied: Not your booking');
  if (booking.status !== 'ACCEPTED') throw new Error('Booking must be ACCEPTED before payment');
  if (booking.payment) throw new Error('Payment already exists for this booking');

  const amount = Math.round(booking.service.price * 100); // Convert to cents

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    metadata: {
      bookingId: booking.id,
      customerId,
    },
  });

  // Create a pending payment record
  const payment = await prisma.payment.create({
    data: {
      bookingId: booking.id,
      transactionId: paymentIntent.id,
      amount: booking.service.price,
      method: 'card',
      provider: 'STRIPE',
      status: 'PENDING',
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    payment,
  };
};

const confirmPayment = async (rawBody: Buffer, sig: string) => {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      config.stripe_webhook_secret
    );
  } catch (err: any) {
    throw new Error(`Webhook signature verification failed: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const bookingId = paymentIntent.metadata.bookingId;

    await prisma.payment.update({
      where: { bookingId },
      data: {
        status: 'COMPLETED',
        paidAt: new Date(),
      },
    });

    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'PAID' },
    });
  }

  if (event.type === 'payment_intent.payment_failed') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const bookingId = paymentIntent.metadata.bookingId;

    await prisma.payment.update({
      where: { bookingId },
      data: { status: 'FAILED' },
    });
  }

  return { received: true };
};

const getUserPayments = async (customerId: string) => {
  return prisma.payment.findMany({
    where: {
      booking: { customerId },
    },
    include: {
      booking: {
        include: {
          service: true,
          technician: { select: { id: true, email: true } },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
};

const getPaymentDetails = async (paymentId: string, customerId: string) => {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: {
      booking: {
        include: {
          service: true,
          technician: { select: { id: true, email: true } },
          customer: { select: { id: true, email: true } },
        },
      },
    },
  });

  if (!payment) throw new Error('Payment not found');
  if (payment.booking.customerId !== customerId) throw new Error('Access denied');

  return payment;
};

export const PaymentServices = {
  createPaymentIntent,
  confirmPayment,
  getUserPayments,
  getPaymentDetails,
};
