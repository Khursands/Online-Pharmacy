import express from 'express';
import {
  getAllMedicines,
  getMedicineById,
  getFeaturedMedicines,
  searchMedicines
} from '../controllers/medicineController';
import { validatePagination, validateSearch } from '../middleware/validation';

const router = express.Router();

// GET /api/medicines - Get all medicines with pagination and filters
router.get('/', validatePagination, getAllMedicines);

// GET /api/medicines/featured - Get featured medicines
router.get('/featured', getFeaturedMedicines);

// GET /api/medicines/search - Search medicines
router.get('/search', validateSearch, searchMedicines);

// GET /api/medicines/:id - Get single medicine
router.get('/:id', getMedicineById);

export default router;