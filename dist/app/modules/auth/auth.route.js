import express from 'express';
import { AuthControllers } from './auth.controller.js';
import { auth } from '../../../middlewares/auth.js';
import { validateRequest } from '../../../middlewares/validateRequest.js';
import { AuthValidation } from './auth.validation.js';
const router = express.Router();
router.post('/register', validateRequest(AuthValidation.registerValidationSchema), AuthControllers.registerUser);
router.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUser);
router.post('/demo-login', validateRequest(AuthValidation.demoLoginValidationSchema), AuthControllers.demoLoginUser);
router.post('/google', validateRequest(AuthValidation.googleLoginValidationSchema), AuthControllers.googleLogin);
router.get('/google', AuthControllers.googleStart);
router.get('/google/callback', AuthControllers.googleCallback);
router.get('/me', auth('ADMIN', 'CUSTOMER', 'TECHNICIAN'), AuthControllers.getMe);
router.patch('/me', auth('ADMIN', 'CUSTOMER', 'TECHNICIAN'), validateRequest(AuthValidation.updateProfileValidationSchema), AuthControllers.updateProfile);
export const AuthRoutes = router;
//# sourceMappingURL=auth.route.js.map