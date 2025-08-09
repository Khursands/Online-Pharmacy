import api from './api';
import type { Medicine } from '../types';

export interface MedicineFilters {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  prescription?: boolean;
  inStock?: boolean;
  sortBy?: string;
}

export interface MedicineResponse {
  medicines: Medicine[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export const medicineService = {
  // Get all medicines with filters
  getAllMedicines: async (filters: MedicineFilters = {}): Promise<MedicineResponse> => {
    const params = new URLSearchParams();
    
    // Add each filter parameter if it has a value
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.category) params.append('category', filters.category);
    if (filters.search) params.append('search', filters.search);
    if (filters.prescription !== undefined) params.append('prescription', filters.prescription.toString());
    if (filters.inStock !== undefined) params.append('inStock', filters.inStock.toString());
    if (filters.sortBy) params.append('sortBy', filters.sortBy);

    const response = await api.get(`/medicines?${params.toString()}`);
    return response.data;
  },

  // Get featured medicines
  getFeaturedMedicines: async (): Promise<Medicine[]> => {
    const response = await api.get('/medicines/featured');
    return response.data;
  },

  // Get single medicine by ID
  getMedicineById: async (id: string): Promise<Medicine> => {
    const response = await api.get(`/medicines/${id}`);
    return response.data;
  },

  // Search medicines
  searchMedicines: async (query: string): Promise<Medicine[]> => {
    const response = await api.get(`/medicines/search?q=${encodeURIComponent(query)}`);
    return response.data;
  }
};