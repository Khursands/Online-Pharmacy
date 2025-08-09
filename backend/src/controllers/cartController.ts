import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/database';

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const cartItems = await new Promise<any[]>((resolve, reject) => {
      db.all(`
        SELECT c.*, m.name, m.price, m.image, m.inStock, m.stockQuantity, m.prescription
        FROM cart c
        LEFT JOIN medicines m ON c.medicineId = m.id
        WHERE c.userId = ? AND m.isActive = 1
        ORDER BY c.createdAt DESC
      `, [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.json({
      items: cartItems,
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { medicineId, quantity = 1 } = req.body;

    // Check if medicine exists and is active
    const medicine = await new Promise<any>((resolve, reject) => {
      db.get('SELECT * FROM medicines WHERE id = ? AND isActive = 1', [medicineId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    if (!medicine.inStock || medicine.stockQuantity < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    // Check if item already in cart
    const existingCartItem = await new Promise<any>((resolve, reject) => {
      db.get('SELECT * FROM cart WHERE userId = ? AND medicineId = ?', [userId, medicineId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (existingCartItem) {
      // Update quantity
      const newQuantity = existingCartItem.quantity + quantity;
      if (newQuantity > medicine.stockQuantity) {
        return res.status(400).json({ error: 'Insufficient stock for requested quantity' });
      }

      await new Promise<void>((resolve, reject) => {
        db.run('UPDATE cart SET quantity = ? WHERE id = ?', [newQuantity, existingCartItem.id], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    } else {
      // Add new item to cart
      const cartItemId = uuidv4();
      await new Promise<void>((resolve, reject) => {
        db.run(`
          INSERT INTO cart (id, userId, medicineId, quantity)
          VALUES (?, ?, ?, ?)
        `, [cartItemId, userId, medicineId, quantity], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }

    res.json({ message: 'Item added to cart successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity <= 0) {
      return res.status(400).json({ error: 'Quantity must be greater than 0' });
    }

    // Check if cart item belongs to user
    const cartItem = await new Promise<any>((resolve, reject) => {
      db.get('SELECT * FROM cart WHERE id = ? AND userId = ?', [id, userId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // Check medicine stock
    const medicine = await new Promise<any>((resolve, reject) => {
      db.get('SELECT stockQuantity FROM medicines WHERE id = ?', [cartItem.medicineId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (quantity > medicine.stockQuantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    await new Promise<void>((resolve, reject) => {
      db.run('UPDATE cart SET quantity = ? WHERE id = ?', [quantity, id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    res.json({ message: 'Cart item updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart item' });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;

    const result = await new Promise<any>((resolve, reject) => {
      db.run('DELETE FROM cart WHERE id = ? AND userId = ?', [id, userId], function(err) {
        if (err) reject(err);
        else resolve(this);
      });
    });

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    await new Promise<void>((resolve, reject) => {
      db.run('DELETE FROM cart WHERE userId = ?', [userId], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear cart' });
  }
};