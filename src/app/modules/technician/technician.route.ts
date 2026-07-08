import express from 'express';
import { TechnicianControllers } from './technician.controller.js';

const router = express.Router();

router.get('/', TechnicianControllers.getAllTechnicians);
router.get('/:id', TechnicianControllers.getTechnicianById);

export const TechnicianRoutes = router;
