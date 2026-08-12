import express from 'express';
import { ContactControllers } from './contact.controller.js';
import { auth } from '../../../middlewares/auth.js';
import { Role } from '@prisma/client';
const router = express.Router();
router.post('/', ContactControllers.createMessage);
router.get('/', auth(Role.ADMIN), ContactControllers.getMessages);
router.patch('/:id/read', auth(Role.ADMIN), ContactControllers.markRead);
export const ContactRoutes = router;
//# sourceMappingURL=contact.route.js.map