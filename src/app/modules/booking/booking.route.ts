import express from 'express';
import { BookingControllers } from './booking.controller.js';
import { auth } from '../../../middlewares/auth.js';
import { Role } from '@prisma/client';

const router = express.Router();

router.post('/', auth(Role.CUSTOMER), BookingControllers.createBooking);
router.get('/', auth(Role.CUSTOMER), BookingControllers.getUserBookings);
router.get('/:id', auth(Role.CUSTOMER), BookingControllers.getBookingDetails);

export const BookingRoutes = router;
