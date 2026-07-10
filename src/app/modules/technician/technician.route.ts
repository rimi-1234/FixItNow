import express from 'express';
import { TechnicianControllers } from './technician.controller.js';
import { auth } from '../../../middlewares/auth.js';
import { Role } from '@prisma/client';
import { validateRequest } from '../../../middlewares/validateRequest.js';
import { TechnicianValidation } from './technician.validation.js';

const router = express.Router();

// NOTE: Static routes must be registered before the dynamic `/:id` route,
// otherwise Express would match e.g. "/bookings" or "/profile" as an `:id` param.
router.put(
  '/profile',
  auth(Role.TECHNICIAN),
  validateRequest(TechnicianValidation.updateTechnicianProfileValidationSchema),
  TechnicianControllers.updateProfile
);
router.put(
  '/availability',
  auth(Role.TECHNICIAN),
  validateRequest(TechnicianValidation.updateAvailabilityValidationSchema),
  TechnicianControllers.updateAvailability
);
router.get('/bookings', auth(Role.TECHNICIAN), TechnicianControllers.getTechnicianBookings);
router.patch('/bookings/:id', auth(Role.TECHNICIAN), TechnicianControllers.updateBookingStatus);

router.get(
  '/',
  validateRequest(TechnicianValidation.getAllTechniciansValidationSchema),
  TechnicianControllers.getAllTechnicians
);
router.get('/:id', TechnicianControllers.getTechnicianById);

export const TechnicianRoutes = router;
