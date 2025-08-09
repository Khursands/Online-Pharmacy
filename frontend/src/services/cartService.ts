import api from './api';
import type { CartItem } from '../types';

export interface CartResponse {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

export interface AddToCartData {
  medicineId: string;
  quantity: number;
}

export const cartService = {
  // Get user's cart
  getCart: async (): Promise<CartResponse> => {
    const response = await api.get('/cart');
    return response.data;
  },

  // Add item to cart
  addToCart: async (data: AddToCartData): Promise<{ message: string }> => {
    const response = await api.post('/cart', data);
    return response.data;
  },

  // Update cart item quantity
  updateCartItem: async (id: string, quantity: number): Promise<{ message: string }> => {
    const response = await api.put(`/cart/${id}`, { quantity });
    return response.data;
  },

  // Remove item from cart
  removeFromCart: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/cart/${id}`);
    return response.data;
  },

  // Clear entire cart
  clearCart: async (): Promise<{ message: string }> => {
    const response = await api.delete('/cart');
    return response.data;
  }
};