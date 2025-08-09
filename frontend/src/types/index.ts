export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  categoryId: string;
  inStock: number | boolean;
  stockQuantity: number;
  prescription: number | boolean;
  rating: number;
  reviewCount: number;
  activeIngredient?: string;
  dosage?: string;
  manufacturer?: string;
  expiryDate?: string;
  batchNumber?: string;
  sideEffects?: string;
  contraindications?: string;
  isActive?: number | boolean;
  createdAt?: string;
  updatedAt?: string;
  categoryName?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  isActive: number | boolean;
  createdAt: string;
  updatedAt: string;
  medicineCount: number;
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}