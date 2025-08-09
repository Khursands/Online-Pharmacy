import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CheckCircle } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';

const Cart: React.FC = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const { showSuccess } = useToast();

  const handleCheckout = () => {
    showSuccess('Checkout Initiated', 'Redirecting to payment...');
    // TODO: Implement actual checkout logic
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
          <div className="container">
            <div className="text-center text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Shopping Cart
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Your cart is currently empty
              </p>
            </div>
          </div>
        </section>

        {/* Empty Cart */}
        <section className="py-16">
          <div className="container max-w-2xl text-center">
            <div className="bg-white rounded-xl shadow-lg p-12">
              <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any medicines to your cart yet. 
                Browse our collection and find the medicines you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/medicines"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Browse Medicines
                </Link>
                <Link
                  to="/categories"
                  className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Shop by Category
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="container">
          <div className="flex items-center justify-between text-white">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Shopping Cart
              </h1>
              <p className="text-xl text-blue-100">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <Link
              to="/medicines"
              className="flex items-center text-blue-100 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Cart Items</h2>
                    <button
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center transition-colors"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear Cart
                    </button>
                  </div>
                </div>

                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.medicine.id} className="p-6">
                      <div className="flex items-start gap-6">
                        {/* Medicine Image */}
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>

                        {/* Medicine Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {item.medicine.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                            {item.medicine.description}
                          </p>
                          
                          {/* Medicine Info */}
                          <div className="space-y-1 mb-4">
                            {item.medicine.activeIngredient && (
                              <div className="text-sm text-gray-500">
                                <strong>Active:</strong> {item.medicine.activeIngredient}
                              </div>
                            )}
                            {item.medicine.dosage && (
                              <div className="text-sm text-gray-500">
                                <strong>Dosage:</strong> {item.medicine.dosage}
                              </div>
                            )}
                            {(item.medicine.prescription === 1 || item.medicine.prescription === true) && (
                              <div className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                                Rx Required
                              </div>
                            )}
                          </div>

                          {/* Quantity and Price */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-500">Quantity:</span>
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() => updateQuantity(item.medicine.id, item.quantity - 1)}
                                  className="p-2 hover:bg-gray-50 transition-colors"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.medicine.id, item.quantity + 1)}
                                  className="p-2 hover:bg-gray-50 transition-colors"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">
                                ${(item.medicine.price * item.quantity).toFixed(2)}
                              </div>
                              <div className="text-sm text-gray-500">
                                ${item.medicine.price} each
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.medicine.id)}
                          className="text-red-500 hover:text-red-700 p-2 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">${(cartTotal * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${(cartTotal * 1.08).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4"
                >
                  Proceed to Checkout
                </button>

                <div className="text-center">
                  <Link
                    to="/medicines"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Security Features */}
                <div className="mt-6 pt-6 border-t">
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Free delivery on orders over $50</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>24/7 customer support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;