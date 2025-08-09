import { Request, Response } from 'express';
import { db } from '../database/database';

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await new Promise<any[]>((resolve, reject) => {
      db.all(`
        SELECT c.*, COUNT(m.id) as medicineCount
        FROM categories c
        LEFT JOIN medicines m ON c.id = m.categoryId AND m.isActive = 1
        WHERE c.isActive = 1
        GROUP BY c.id
        ORDER BY c.name
      `, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const category = await new Promise<any>((resolve, reject) => {
      db.get(`
        SELECT c.*, COUNT(m.id) as medicineCount
        FROM categories c
        LEFT JOIN medicines m ON c.id = m.categoryId AND m.isActive = 1
        WHERE c.id = ? AND c.isActive = 1
        GROUP BY c.id
      `, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};

export const getMedicinesByCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 20, search, prescription, inStock, sortBy } = req.query;
    console.log('Category medicines request:', { id, page, limit, search, prescription, inStock, sortBy });
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

    let query = `
      SELECT m.*, c.name as categoryName 
      FROM medicines m
      LEFT JOIN categories c ON m.categoryId = c.id
      WHERE m.categoryId = ? AND m.isActive = 1
    `;
    let countQuery = 'SELECT COUNT(*) as total FROM medicines WHERE categoryId = ? AND isActive = 1';
    const queryParams: any[] = [id];
    const countParams: any[] = [id];

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
    let orderBy = 'm.name ASC'; // default
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
          orderBy = 'm.name ASC';
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
    console.error('Error in getMedicinesByCategory:', error);
    res.status(500).json({ error: 'Failed to fetch medicines for category' });
  }
};