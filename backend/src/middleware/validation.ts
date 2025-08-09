import { body, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: errors.array() 
    });
  }
  next();
};

export const validateRegister = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().isLength({ min: 2, max: 50 }),
  body('phone').optional().isMobilePhone('any'),
  handleValidationErrors
];

export const validateLogin = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
  handleValidationErrors
];

export const validateAddToCart = [
  body('medicineId').isUUID(),
  body('quantity').isInt({ min: 1, max: 10 }),
  handleValidationErrors
];

export const validateCreateOrder = [
  body('shippingAddress').trim().isLength({ min: 10, max: 200 }),
  body('paymentMethod').isIn(['cod', 'card', 'upi']),
  body('notes').optional().isLength({ max: 500 }),
  handleValidationErrors
];

export const validatePagination = [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  handleValidationErrors
];

export const validateSearch = [
  query('q').optional().isLength({ min: 2, max: 100 }),
  handleValidationErrors
];