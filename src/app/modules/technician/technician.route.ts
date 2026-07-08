import express from 'express';
import { TechnicianControllers } from './technician.controller.js';
import { auth } from '../../../middlewares/auth.js';
import { Role } from '@prisma/client';
import { validateRequest } from '../../../middlewares/validateRequest.js';
import { TechnicianValidation } from './technician.validation.js';

const router = express.Router();

router.get('/', TechnicianControllers.getAllTechnicians);
router.get('/:id', TechnicianControllers.getTechnicianById);

router.put('/profile', auth(Role.TECHNICIAN), validateRequest(TechnicianValidation.updateTechnicianProfileValidationSchema), TechnicianControllers.updateProfile);
router.put('/availability', auth(Role.TECHNICIAN), TechnicianControllers.updateAvailability);
router.get('/bookings', auth(Role.TECHNICIAN), TechnicianControllers.getTechnicianBookings);
router.patch('/bookings/:id', auth(Role.TECHNICIAN), TechnicianControllers.updateBookingStatus);

export const TechnicianRoutes = router;
