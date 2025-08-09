import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById
} from '../controllers/orderController';
import { authenticateToken } from '../middleware/auth';
import { validateCreateOrder, validatePagination } from '../middleware/validation';

const router = express.Router();

// All order routes require authentication
router.use(authenticateToken);

// POST /api/orders - Create new order
router.post('/', validateCreateOrder, createOrder);

// GET /api/orders - Get user's orders with pagination
router.get('/', validatePagination, getOrders);

// GET /api/orders/:id - Get specific order details
router.get('/:id', getOrderById);

export default router;