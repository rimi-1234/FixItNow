import Stripe from 'stripe';
import { randomUUID } from 'node:crypto';
import SSLCommerzPayment from 'sslcommerz-lts';
import prisma from '../../../lib/prisma.js';
import config from '../../../config/index.js';
import { PaymentProvider } from '@prisma/client';

const stripe = new Stripe(config.stripe_secret_key as string);

const getSslCommerzClient = () =>
  new SSLCommerzPayment(
    config.sslcommerz_store_id,
    config.sslcommerz_store_passwd,
    config.sslcommerz_is_live
  );

const createStripePaymentIntent = async (bookingId: string, amount: number) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: 'usd',
    metadata: { bookingId },
  });

  const payment = await prisma.payment.create({
    data: {
      bookingId,
      transactionId: paymentIntent.id,
      amount,
      method: 'card',
      provider: 'STRIPE',
      status: 'PENDING',
    },
  });

  return {
    provider: 'STRIPE' as const,
    clientSecret: paymentIntent.client_secret,
    payment,
  };
};

const createSslCommerzSession = async (
  bookingId: string,
  amount: number,
  customerEmail: string
) => {
  const tranId = `FIXITNOW_${randomUUID()}`;
  const baseUrl = config.app_url || 'http://localhost:5000';

  const sslcz = getSslCommerzClient();
  const apiResponse = await sslcz.init({
    total_amount: amount,
    currency: 'BDT',
    tran_id: tranId,
    success_url: `${baseUrl}/api/payments/sslcommerz/success`,
    fail_url: `${baseUrl}/api/payments/sslcommerz/fail`,
    cancel_url: `${baseUrl}/api/payments/sslcommerz/cancel`,
    ipn_url: `${baseUrl}/api/payments/sslcommerz/ipn`,
    shipping_method: 'NO',
    product_name: 'FixItNow Service Booking',
    product_category: 'Service',
    product_profile: 'general',
    cus_name: customerEmail,
    cus_email: customerEmail,
    cus_add1: 'N/A',
    cus_city: 'N/A',
    cus_postcode: '0000',
    cus_country: 'Bangladesh',
    cus_phone: '00000000000',
  });

  if (apiResponse.status !== 'SUCCESS' || !apiResponse.GatewayPageURL) {
    throw Object.assign(
      new Error(apiResponse.failedreason || 'Failed to initiate SSLCommerz session'),
      { statusCode: 502 }
    );
  }

  const payment = await prisma.payment.create({
    data: {
      bookingId,
      transactionId: tranId,
      amount,
      method: 'sslcommerz',
      provider: 'SSLCOMMERZ',
      status: 'PENDING',
    },
  });

  return {
    provider: 'SSLCOMMERZ' as const,
    gatewayUrl: apiResponse.GatewayPageURL,
    payment,
  };
};

const createPaymentIntent = async (
  customerId: string,
  bookingId: string,
  provider: PaymentProvider = 'STRIPE'
) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { service: true, payment: true, customer: true },
  });

  if (!booking) throw Object.assign(new Error('Booking not found'), { statusCode: 404 });
  if (booking.customerId !== customerId)
    throw Object.assign(new Error('Access denied: Not your booking'), { statusCode: 403 });
  if (booking.status !== 'ACCEPTED')
    throw Object.assign(new Error('Booking must be ACCEPTED before payment'), { statusCode: 400 });
  if (booking.payment)
    throw Object.assign(new Error('Payment already exists for this booking'), { statusCode: 400 });

  if (provider === 'SSLCOMMERZ') {
    return createSslCommerzSession(booking.id, booking.service.price, booking.customer.email);
  }

  return createStripePaymentIntent(booking.id, booking.service.price);
};

const confirmPayment = async (rawBody: Buffer | string, sig: string) => {
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

// Shared by the SSLCommerz `success` redirect and `ipn` server-to-server callback.
const validateSslCommerzTransaction = async (tranId: string, valId: string) => {
  const payment = await prisma.payment.findFirst({ where: { transactionId: tranId } });
  if (!payment) throw Object.assign(new Error('Payment record not found for this transaction'), { statusCode: 404 });

  const sslcz = getSslCommerzClient();
  const validation = await sslcz.validate({ val_id: valId });

  if (validation.status !== 'VALID' && validation.status !== 'VALIDATED') {
    await prisma.payment.update({ where: { id: payment.id }, data: { status: 'FAILED' } });
    throw Object.assign(new Error('SSLCommerz payment validation failed'), { statusCode: 400 });
  }

  const updatedPayment = await prisma.payment.update({
    where: { id: payment.id },
    data: { status: 'COMPLETED', paidAt: new Date() },
  });

  await prisma.booking.update({
    where: { id: payment.bookingId },
    data: { status: 'PAID' },
  });

  return updatedPayment;
};

const markSslCommerzTransactionFailed = async (tranId: string) => {
  const payment = await prisma.payment.findFirst({ where: { transactionId: tranId } });
  if (!payment) return null;

  return prisma.payment.update({
    where: { id: payment.id },
    data: { status: 'FAILED' },
  });
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

  if (!payment) throw Object.assign(new Error('Payment not found'), { statusCode: 404 });
  if (payment.booking.customerId !== customerId)
    throw Object.assign(new Error('Access denied'), { statusCode: 403 });

  return payment;
};

export const PaymentServices = {
  createPaymentIntent,
  confirmPayment,
  validateSslCommerzTransaction,
  markSslCommerzTransactionFailed,
  getUserPayments,
  getPaymentDetails,
};
