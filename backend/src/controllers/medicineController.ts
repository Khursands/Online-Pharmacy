import { Request, Response } from 'express';
import { db } from '../database/database';
import { Medicine, Category } from '../types';

export const getAllMedicines = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, category, search, prescription, inStock, sortBy } = req.query;
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    
    let query = `
      SELECT m.*, c.name as categoryName 
      FROM medicines m
      LEFT JOIN categories c ON m.categoryId = c.id
      WHERE m.isActive = 1
    `;
    let countQuery = 'SELECT COUNT(*) as total FROM medicines m WHERE m.isActive = 1';
    const queryParams: any[] = [];
    const countParams: any[] = [];

    if (category) {
      query += ' AND m.categoryId = ?';
      countQuery += ' AND m.categoryId = ?';
      queryParams.push(category);
      countParams.push(category);
    }

    if (search) {
      query += ' AND (m.name LIKE ? OR m.description LIKE ? OR m.activeIngredient LIKE ?)';
      countQuery += ' AND (m.name LIKE ? OR m.description LIKE ? OR m.activeIngredient LIKE ?)';
      const searchPattern = `%${search}%`;
      queryParams.push(searchPattern, searchPattern, searchPattern);
      countParams.push(searchPattern, searchPattern, searchPattern);
    }

    if (prescription !== undefined) {
      query += ' AND m.prescription = ?';
      countQuery += ' AND m.prescription = ?';
      queryParams.push(prescription === 'true' ? 1 : 0);
      countParams.push(prescription === 'true' ? 1 : 0);
    }

    if (inStock !== undefined) {
      query += ' AND m.inStock = ?';
      countQuery += ' AND m.inStock = ?';
      queryParams.push(inStock === 'true' ? 1 : 0);
      countParams.push(inStock === 'true' ? 1 : 0);
    }

    // Add sorting
    let orderBy = 'm.createdAt DESC'; // default
    if (sortBy) {
      switch (sortBy) {
        case 'name':
          orderBy = 'm.name ASC';
          break;
        case 'price':
          orderBy = 'm.price ASC';
          break;
        case 'rating':
          orderBy = 'm.rating DESC, m.reviewCount DESC';
          break;
        default:
          orderBy = 'm.createdAt DESC';
      }
    }

    query += ` ORDER BY ${orderBy} LIMIT ? OFFSET ?`;
    queryParams.push(parseInt(limit as string), offset);

    const medicines = await new Promise<any[]>((resolve, reject) => {
      db.all(query, queryParams, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    const totalResult = await new Promise<any>((resolve, reject) => {
      db.get(countQuery, countParams, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    const total = totalResult.total;
    const totalPages = Math.ceil(total / parseInt(limit as string));

    res.json({
      medicines,
      pagination: {
        currentPage: parseInt(page as string),
        totalPages,
        totalItems: total,
        itemsPerPage: parseInt(limit as string)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch medicines' });
  }
};

export const getMedicineById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const medicine = await new Promise<any>((resolve, reject) => {
      db.get(`
        SELECT m.*, c.name as categoryName 
        FROM medicines m
        LEFT JOIN categories c ON m.categoryId = c.id
        WHERE m.id = ? AND m.isActive = 1
      `, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    res.json(medicine);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch medicine' });
  }
};

export const getFeaturedMedicines = async (req: Request, res: Response) => {
  try {
    const medicines = await new Promise<any[]>((resolve, reject) => {
      db.all(`
        SELECT m.*, c.name as categoryName 
        FROM medicines m
        LEFT JOIN categories c ON m.categoryId = c.id
        WHERE m.isActive = 1 AND m.inStock = 1
        ORDER BY m.rating DESC, m.reviewCount DESC
        LIMIT 6
      `, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch featured medicines' });
  }
};

export const searchMedicines = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.json([]);
    }

    const medicines = await new Promise<any[]>((resolve, reject) => {
      db.all(`
        SELECT m.*, c.name as categoryName 
        FROM medicines m
        LEFT JOIN categories c ON m.categoryId = c.id
        WHERE m.isActive = 1 AND (
          m.name LIKE ? OR 
          m.description LIKE ? OR 
          m.activeIngredient LIKE ?
        )
        ORDER BY 
          CASE WHEN m.name LIKE ? THEN 1 ELSE 2 END,
          m.rating DESC
        LIMIT 10
      `, [`%${q}%`, `%${q}%`, `%${q}%`, `${q}%`], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search medicines' });
  }
};