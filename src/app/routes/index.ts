import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route.js';
import { ServiceRoutes } from '../modules/service/service.route.js';
import { TechnicianRoutes } from '../modules/technician/technician.route.js';
import { CategoryRoutes } from '../modules/category/category.route.js';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/technicians',
    route: TechnicianRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
