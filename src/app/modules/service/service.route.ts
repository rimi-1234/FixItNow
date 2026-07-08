import express from 'express';
import { ServiceControllers } from './service.controller.js';

const router = express.Router();

router.get('/', ServiceControllers.getAllServices);

export const ServiceRoutes = router;
