import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from '../controllers/cartController';
import { authenticateToken } from '../middleware/auth';
import { validateAddToCart } from '../middleware/validation';

const router = express.Router();

// All cart routes require authentication
router.use(authenticateToken);

// GET /api/cart - Get user's cart
router.get('/', getCart);

// POST /api/cart - Add item to cart
router.post('/', validateAddToCart, addToCart);

// PUT /api/cart/:id - Update cart item quantity
router.put('/:id', updateCartItem);

// DELETE /api/cart/:id - Remove item from cart
router.delete('/:id', removeFromCart);

// DELETE /api/cart - Clear entire cart
router.delete('/', clearCart);

export default router;