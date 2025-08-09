import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type { Medicine } from '../types';
import { useToast } from './ToastContext';

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (medicine: Medicine, quantity?: number) => void;
  removeFromCart: (medicineId: string) => void;
  updateQuantity: (medicineId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (medicineId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { showSuccess, showError, showInfo, showWarning } = useToast();
  const toastTimeoutRef = useRef<Map<string, number>>(new Map());

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('pharmacy-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pharmacy-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + (item.medicine.price * item.quantity), 0);

  const addToCart = useCallback((medicine: Medicine, quantity: number = 1) => {
    // Check if medicine is in stock
    if (!(medicine.inStock === 1 || medicine.inStock === true)) {
      showError('Out of Stock', 'This medicine is currently out of stock');
      return;
    }

    // Prevent duplicate toasts within 1000ms for the same medicine
    const currentTime = Date.now();
    const lastToastTime = toastTimeoutRef.current.get(medicine.id) || 0;
    
    if (currentTime - lastToastTime < 1000) {
      // Still update cart, but don't show toast
      setCartItems(prev => {
        const existingItem = prev.find(item => item.medicine.id === medicine.id);
        
        if (existingItem) {
          const newQuantity = existingItem.quantity + quantity;
          
          if (newQuantity > medicine.stockQuantity) {
            return prev;
          }
          
          return prev.map(item =>
            item.medicine.id === medicine.id
              ? { ...item, quantity: newQuantity }
              : item
          );
        } else {
          if (quantity > medicine.stockQuantity) {
            return prev;
          }
          
          return [...prev, { medicine, quantity }];
        }
      });
      return;
    }

    // Update the last toast time
    toastTimeoutRef.current.set(medicine.id, currentTime);

    setCartItems(prev => {
      const existingItem = prev.find(item => item.medicine.id === medicine.id);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        
        // Check stock limit
        if (newQuantity > medicine.stockQuantity) {
          showWarning('Stock Limit', `Only ${medicine.stockQuantity} items available`);
          return prev;
        }
        
        showSuccess('Cart Updated', `${medicine.name} quantity updated`);
        return prev.map(item =>
          item.medicine.id === medicine.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        // Check stock for new item
        if (quantity > medicine.stockQuantity) {
          showWarning('Stock Limit', `Only ${medicine.stockQuantity} items available`);
          return prev;
        }
        
        showSuccess('Added to Cart', `${medicine.name} added to cart`);
        return [...prev, { medicine, quantity }];
      }
    });
  }, [showSuccess, showError, showWarning]);

  const removeFromCart = useCallback((medicineId: string) => {
    setCartItems(prev => {
      const item = prev.find(item => item.medicine.id === medicineId);
      if (item) {
        showInfo('Removed from Cart', `${item.medicine.name} removed from cart`);
      }
      return prev.filter(item => item.medicine.id !== medicineId);
    });
  }, [showInfo]);

  const updateQuantity = useCallback((medicineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(medicineId);
      return;
    }

    setCartItems(prev => prev.map(item => {
      if (item.medicine.id === medicineId) {
        // Check stock limit
        if (quantity > item.medicine.stockQuantity) {
          showWarning('Stock Limit', `Only ${item.medicine.stockQuantity} items available`);
          return item;
        }
        return { ...item, quantity };
      }
      return item;
    }));
  }, [removeFromCart, showWarning]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    showInfo('Cart Cleared', 'All items removed from cart');
  }, [showInfo]);

  const isInCart = useCallback((medicineId: string) => {
    return cartItems.some(item => item.medicine.id === medicineId);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart
    }}>
      {children}
    </CartContext.Provider>
  );
};