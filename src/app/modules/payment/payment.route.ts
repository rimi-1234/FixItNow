import express from 'express';
import { PaymentControllers } from './payment.controller.js';
import { auth } from '../../../middlewares/auth.js';
import { Role } from '@prisma/client';
import { validateRequest } from '../../../middlewares/validateRequest.js';
import { PaymentValidation } from './payment.validation.js';

const router = express.Router();

// POST /api/payments/create — Create a Stripe or SSLCommerz payment session (customer only)
router.post(
  '/create',
  auth(Role.CUSTOMER),
  validateRequest(PaymentValidation.createPaymentValidationSchema),
  PaymentControllers.createPayment
);

// POST /api/payments/confirm — Stripe webhook (raw body is parsed in app.ts before this route)
router.post('/confirm', PaymentControllers.confirmPayment);

// SSLCommerz callback URLs (public — called by SSLCommerz's servers/browser redirects)
router.post('/sslcommerz/success', PaymentControllers.sslcommerzSuccess);
router.post('/sslcommerz/fail', PaymentControllers.sslcommerzFail);
router.post('/sslcommerz/cancel', PaymentControllers.sslcommerzCancel);
router.post('/sslcommerz/ipn', PaymentControllers.sslcommerzIPN);

// GET /api/payments — List my payments
router.get('/', auth(Role.CUSTOMER), PaymentControllers.getUserPayments);

// GET /api/payments/:id — Get payment details
router.get('/:id', auth(Role.CUSTOMER), PaymentControllers.getPaymentDetails);

export const PaymentRoutes = router;
