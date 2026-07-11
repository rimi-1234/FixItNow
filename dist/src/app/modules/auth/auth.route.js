import express from 'express';
import { AuthControllers } from './auth.controller';
import { auth } from '../../../middlewares/auth';
import { validateRequest } from '../../../middlewares/validateRequest.js';
import { AuthValidation } from './auth.validation.js';
const router = express.Router();
router.post('/register', validateRequest(AuthValidation.registerValidationSchema), AuthControllers.registerUser);
router.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUser);
router.get('/me', auth('ADMIN', 'CUSTOMER', 'TECHNICIAN'), AuthControllers.getMe);
export const AuthRoutes = router;
//# sourceMappingURL=auth.route.js.map