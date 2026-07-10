import express from 'express';
import { PaymentControllers } from './payment.controller.js';
import { auth } from '../../../middlewares/auth.js';
import { Role } from '@prisma/client';

const router = express.Router();

// POST /api/payments/create — Create Stripe payment intent (customer only)
router.post('/create', auth(Role.CUSTOMER), PaymentControllers.createPayment);

// POST /api/payments/confirm — Stripe webhook (raw body, no JWT)
router.post(
  '/confirm',
  express.raw({ type: 'application/json' }),
  PaymentControllers.confirmPayment
);

// GET /api/payments — List my payments
router.get('/', auth(Role.CUSTOMER), PaymentControllers.getUserPayments);

// GET /api/payments/:id — Get payment details
router.get('/:id', auth(Role.CUSTOMER), PaymentControllers.getPaymentDetails);

export const PaymentRoutes = router;
