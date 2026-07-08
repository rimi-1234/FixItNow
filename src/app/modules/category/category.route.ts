import express from 'express';
import { CategoryControllers } from './category.controller.js';

const router = express.Router();

router.get('/', CategoryControllers.getAllCategories);

export const CategoryRoutes = router;
