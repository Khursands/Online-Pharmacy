import React, { useEffect, useState } from 'react';
import { Star, ShoppingCart, Heart, Shield, CheckCircle } from 'lucide-react';
import type { Medicine } from '../../types';
import { medicineService } from '../../services/medicineService';
import { useCart } from '../../contexts/CartContext';

const FeaturedProducts: React.FC = () => {
  const { addToCart } = useCart();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedMedicines = async () => {
      try {
        const data = await medicineService.getFeaturedMedicines();
        setMedicines(data);
      } catch (err) {
        console.error('Error fetching featured medicines:', err);
        setError('Failed to load featured products');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedMedicines();
  }, []);

  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : index < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Loading featured products...
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular and trusted medicines, carefully selected 
            by our pharmacy experts for quality and effectiveness.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {medicines.map((medicine) => (
            <div
              key={medicine.id}
              className="group bg-white border border-gray-200 rounded-xl hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 aspect-square p-6">
                {/* Discount Badge */}
                {medicine.originalPrice && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-lg">
                    {calculateDiscount(medicine.originalPrice, medicine.price)}% OFF
                  </div>
                )}

                {/* Prescription Badge */}
                {(medicine.prescription === 1 || medicine.prescription === true) && (
                  <div className="absolute top-3 right-3 bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full border border-blue-200">
                    Rx Required
                  </div>
                )}

                {/* Product Image Placeholder */}
                <div className="w-full h-full bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full p-6 mx-auto mb-3 w-20 h-20 flex items-center justify-center">
                      <Shield className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="text-sm text-gray-500 font-medium">{medicine.name}</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Category */}
                <div className="text-sm text-blue-600 font-medium mb-2">
                  {(medicine as any).categoryName || 'Medicine'}
                </div>

                {/* Name and Description */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {medicine.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {medicine.description}
                </p>

                {/* Active Ingredient and Dosage */}
                {medicine.activeIngredient && (
                  <div className="text-sm text-gray-500 mb-2">
                    <strong>Active:</strong> {medicine.activeIngredient}
                  </div>
                )}
                {medicine.dosage && (
                  <div className="text-sm text-gray-500 mb-4">
                    <strong>Dosage:</strong> {medicine.dosage}
                  </div>
                )}

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex space-x-1">
                    {renderStars(medicine.rating)}
                  </div>
                  <span className="text-sm text-gray-600">
                    {medicine.rating} ({medicine.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    ${medicine.price}
                  </span>
                  {medicine.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${medicine.originalPrice}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center mb-4">
                  {(medicine.inStock === 1 || medicine.inStock === true) ? (
                    <div className="flex items-center text-green-600 text-sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      In Stock ({medicine.stockQuantity} available)
                    </div>
                  ) : (
                    <div className="text-red-500 text-sm">
                      Out of Stock
                    </div>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center ${
                    (medicine.inStock === 1 || medicine.inStock === true)
                      ? 'bg-blue-600 hover:bg-blue-700 text-white animate-cart-bounce'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!(medicine.inStock === 1 || medicine.inStock === true)}
                  onClick={() => (medicine.inStock === 1 || medicine.inStock === true) && addToCart(medicine)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {(medicine.inStock === 1 || medicine.inStock === true) ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <button className="btn-primary">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;