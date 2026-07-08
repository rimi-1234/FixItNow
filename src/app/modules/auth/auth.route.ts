import express from 'express';
import { AuthControllers } from './auth.controller';
import { auth } from '../../../middlewares/auth';
import { Role } from '@prisma/client';

const router = express.Router();

router.post('/register', AuthControllers.registerUser);
router.post('/login', AuthControllers.loginUser);

router.get(
  '/me',
  auth('ADMIN', 'CUSTOMER', 'TECHNICIAN'),
  AuthControllers.getMe
);

export const AuthRoutes = router;
