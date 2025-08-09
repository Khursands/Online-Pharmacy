import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile
} from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';
import { validateRegister, validateLogin } from '../middleware/validation';

const router = express.Router();

// POST /api/auth/register - Register new user
router.post('/register', validateRegister, register);

// POST /api/auth/login - User login
router.post('/login', validateLogin, login);

// GET /api/auth/profile - Get user profile (protected)
router.get('/profile', authenticateToken, getProfile);

// PUT /api/auth/profile - Update user profile (protected)
router.put('/profile', authenticateToken, updateProfile);

export default router;