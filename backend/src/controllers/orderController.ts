import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/database';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { shippingAddress, paymentMethod = 'cod', prescriptionImage, notes } = req.body;

    // Get cart items
    const cartItems = await new Promise<any[]>((resolve, reject) => {
      db.all(`
        SELECT c.*, m.name, m.price, m.inStock, m.stockQuantity, m.prescription
        FROM cart c
        LEFT JOIN medicines m ON c.medicineId = m.id
        WHERE c.userId = ? AND m.isActive = 1
      `, [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Check stock availability
    for (const item of cartItems) {
      if (!item.inStock || item.stockQuantity < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for ${item.name}` });
      }
    }

    // Check if prescription is required
    const requiresPrescription = cartItems.some(item => item.prescription);
    if (requiresPrescription && !prescriptionImage) {
      return res.status(400).json({ error: 'Prescription image is required for prescription medicines' });
    }

    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderId = uuidv4();

    // Create order
    await new Promise<void>((resolve, reject) => {
      db.run(`
        INSERT INTO orders (id, userId, totalAmount, shippingAddress, paymentMethod, prescriptionImage, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [orderId, userId, totalAmount, shippingAddress, paymentMethod, prescriptionImage, notes], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Create order items and update stock
    for (const item of cartItems) {
      const orderItemId = uuidv4();
      
      // Add order item
      await new Promise<void>((resolve, reject) => {
        db.run(`
          INSERT INTO order_items (id, orderId, medicineId, quantity, price)
          VALUES (?, ?, ?, ?, ?)
        `, [orderItemId, orderId, item.medicineId, item.quantity, item.price], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      // Update medicine stock
      await new Promise<void>((resolve, reject) => {
        db.run(`
          UPDATE medicines 
          SET stockQuantity = stockQuantity - ?, 
              inStock = CASE WHEN (stockQuantity - ?) <= 0 THEN 0 ELSE 1 END
          WHERE id = ?
        `, [item.quantity, item.quantity, item.medicineId], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }

    // Clear cart
    await new Promise<void>((resolve, reject) => {
      db.run('DELETE FROM cart WHERE userId = ?', [userId], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    res.status(201).json({
      message: 'Order placed successfully',
      orderId,
      totalAmount: parseFloat(totalAmount.toFixed(2))
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

    const orders = await new Promise<any[]>((resolve, reject) => {
      db.all(`
        SELECT * FROM orders 
        WHERE userId = ? 
        ORDER BY createdAt DESC 
        LIMIT ? OFFSET ?
      `, [userId, parseInt(limit as string), offset], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    // Get order items for each order
    for (const order of orders) {
      const orderItems = await new Promise<any[]>((resolve, reject) => {
        db.all(`
          SELECT oi.*, m.name, m.image
          FROM order_items oi
          LEFT JOIN medicines m ON oi.medicineId = m.id
          WHERE oi.orderId = ?
        `, [order.id], (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      });
      order.items = orderItems;
    }

    const totalResult = await new Promise<any>((resolve, reject) => {
      db.get('SELECT COUNT(*) as total FROM orders WHERE userId = ?', [userId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    const total = totalResult.total;
    const totalPages = Math.ceil(total / parseInt(limit as string));

    res.json({
      orders,
      pagination: {
        currentPage: parseInt(page as string),
        totalPages,
        totalItems: total,
        itemsPerPage: parseInt(limit as string)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;

    const order = await new Promise<any>((resolve, reject) => {
      db.get('SELECT * FROM orders WHERE id = ? AND userId = ?', [id, userId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const orderItems = await new Promise<any[]>((resolve, reject) => {
      db.all(`
        SELECT oi.*, m.name, m.image, m.activeIngredient, m.dosage
        FROM order_items oi
        LEFT JOIN medicines m ON oi.medicineId = m.id
        WHERE oi.orderId = ?
      `, [id], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    order.items = orderItems;
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};