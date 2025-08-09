export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  address?: string;
  role: 'customer' | 'admin' | 'pharmacist';
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  categoryId: string;
  inStock: boolean;
  stockQuantity: number;
  prescription: boolean;
  activeIngredient: string;
  dosage: string;
  manufacturer: string;
  expiryDate: string;
  batchNumber: string;
  rating: number;
  reviewCount: number;
  sideEffects?: string;
  contraindications?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  userId: string;
  medicineId: string;
  quantity: number;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: 'cod' | 'card' | 'upi';
  paymentStatus: 'pending' | 'paid' | 'failed';
  prescriptionImage?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  medicineId: string;
  quantity: number;
  price: number;
  createdAt: string;
}

export interface Prescription {
  id: string;
  userId: string;
  image: string;
  status: 'pending' | 'approved' | 'rejected';
  pharmacistId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  medicineId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}