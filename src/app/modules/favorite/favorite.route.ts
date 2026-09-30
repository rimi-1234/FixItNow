import express from 'express';
import { FavoriteControllers } from './favorite.controller.js';
import { auth } from '../../../middlewares/auth.js';
import { Role } from '@prisma/client';

const router = express.Router();

router.get('/', auth(Role.CUSTOMER), FavoriteControllers.getFavorites);
router.get('/:technicianId', auth(Role.CUSTOMER), FavoriteControllers.isFavorite);
router.post('/:technicianId', auth(Role.CUSTOMER), FavoriteControllers.addFavorite);
router.delete('/:technicianId', auth(Role.CUSTOMER), FavoriteControllers.removeFavorite);

export const FavoriteRoutes = router;
