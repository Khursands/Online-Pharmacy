import express from 'express';
import {
  getAllCategories,
  getCategoryById,
  getMedicinesByCategory
} from '../controllers/categoryController';
import { validatePagination } from '../middleware/validation';

const router = express.Router();

// GET /api/categories - Get all categories
router.get('/', getAllCategories);

// GET /api/categories/:id - Get single category
router.get('/:id', getCategoryById);

// GET /api/categories/:id/medicines - Get medicines by category
router.get('/:id/medicines', validatePagination, getMedicinesByCategory);

export default router;