import api from './api';
import type { Category } from '../types';
import type { MedicineResponse } from './medicineService';

export const categoryService = {
  // Get all categories
  getAllCategories: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get single category by ID
  getCategoryById: async (id: string): Promise<Category> => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  // Get medicines by category
  getMedicinesByCategory: async (id: string, page = 1, limit = 20, filters?: { search?: string; prescription?: boolean; inStock?: boolean; sortBy?: string }): Promise<MedicineResponse> => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    if (filters?.search) params.append('search', filters.search);
    if (filters?.prescription !== undefined) params.append('prescription', filters.prescription.toString());
    if (filters?.inStock !== undefined) params.append('inStock', filters.inStock.toString());
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);

    const response = await api.get(`/categories/${id}/medicines?${params.toString()}`);
    return response.data;
  }
};