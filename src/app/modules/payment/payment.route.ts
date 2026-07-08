import express from 'express';
import { PaymentControllers } from './payment.controller.js';
import { auth } from '../../../middlewares/auth.js';
import { Role } from '@prisma/client';

const router = express.Router();

router.post('/create', auth(Role.CUSTOMER), PaymentControllers.createPayment);
router.post('/confirm', PaymentControllers.confirmPayment); // webhook usually doesn't have jwt
router.get('/', auth(Role.CUSTOMER), PaymentControllers.getUserPayments);
router.get('/:id', auth(Role.CUSTOMER), PaymentControllers.getPaymentDetails);

export const PaymentRoutes = router;
