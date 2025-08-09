import React, { useState, useEffect } from 'react';
import { Search, Grid3X3, List, Star, ShoppingCart, Heart, CheckCircle } from 'lucide-react';
import type { Medicine, Category } from '../../types';
import { medicineService } from '../../services/medicineService';
import { categoryService } from '../../services/categoryService';
import { useCart } from '../../contexts/CartContext';

const Medicines: React.FC = () => {
  const { addToCart } = useCart();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [prescriptionFilter, setPrescriptionFilter] = useState<string>('all');
  const [inStockFilter, setInStockFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMedicines();
  }, [currentPage, searchQuery, selectedCategory, prescriptionFilter, inStockFilter, sortBy]);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const filters = {
        page: currentPage,
        limit: 12,
        search: searchQuery || undefined,
        category: selectedCategory || undefined,
        prescription: prescriptionFilter === 'all' ? undefined : prescriptionFilter === 'yes',
        inStock: inStockFilter === 'all' ? undefined : inStockFilter === 'yes',
        sortBy: sortBy !== 'name' ? sortBy : undefined,
      };
      
      const response = await medicineService.getAllMedicines(filters);
      setMedicines(response.medicines);
      setTotalPages(response.pagination.totalPages);
    } catch (err) {
      console.error('Error fetching medicines:', err);
      setError('Failed to load medicines');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleFilterChange = (filterSetter: Function, value: string) => {
    setCurrentPage(1);
    filterSetter(value);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPrescriptionFilter('all');
    setInStockFilter('all');
    setSortBy('name');
    setCurrentPage(1);
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

  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  const MedicineGridCard = ({ medicine }: { medicine: Medicine }) => (
    <div className="bg-white border border-gray-200 rounded-xl hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Medicine Image */}
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

        {/* Medicine Image Placeholder */}
        <div className="w-full h-full bg-white rounded-lg flex items-center justify-center shadow-sm">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-6 mx-auto mb-3 w-20 h-20 flex items-center justify-center">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-sm text-gray-500 font-medium line-clamp-2">{medicine.name}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors">
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Medicine Info */}
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
  );

  const MedicineListCard = ({ medicine }: { medicine: Medicine }) => (
    <div className="bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="p-6 flex flex-col md:flex-row gap-6">
        {/* Medicine Image */}
        <div className="md:w-32 md:h-32 w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center relative">
          {/* Badges */}
          {medicine.originalPrice && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {calculateDiscount(medicine.originalPrice, medicine.price)}% OFF
            </div>
          )}
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-4 mx-auto mb-2 w-16 h-16 flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Medicine Details */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:justify-between mb-4">
            <div>
              <div className="text-sm text-blue-600 font-medium mb-1">
                {(medicine as any).categoryName || 'Medicine'}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {medicine.name}
              </h3>
              <p className="text-gray-600 mb-3">
                {medicine.description}
              </p>
              
              {/* Medicine Details */}
              <div className="space-y-1 mb-3">
                {medicine.activeIngredient && (
                  <div className="text-sm text-gray-500">
                    <strong>Active Ingredient:</strong> {medicine.activeIngredient}
                  </div>
                )}
                {medicine.dosage && (
                  <div className="text-sm text-gray-500">
                    <strong>Dosage:</strong> {medicine.dosage}
                  </div>
                )}
                {medicine.manufacturer && (
                  <div className="text-sm text-gray-500">
                    <strong>Manufacturer:</strong> {medicine.manufacturer}
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {renderStars(medicine.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {medicine.rating} ({medicine.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price and Actions */}
            <div className="md:text-right">
              <div className="flex items-center md:justify-end space-x-2 mb-2">
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
              <div className="mb-4">
                {(medicine.inStock === 1 || medicine.inStock === true) ? (
                  <div className="flex items-center md:justify-end text-green-600 text-sm">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    In Stock ({medicine.stockQuantity} available)
                  </div>
                ) : (
                  <div className="text-red-500 text-sm">
                    Out of Stock
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center ${
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
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="container">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              All Medicines
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Browse our comprehensive collection of authentic medicines and healthcare products
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search medicines..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </form>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => handleFilterChange(setSelectedCategory, e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <select
                value={prescriptionFilter}
                onChange={(e) => handleFilterChange(setPrescriptionFilter, e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Medicines</option>
                <option value="yes">Prescription Only</option>
                <option value="no">Over the Counter</option>
              </select>

              <select
                value={inStockFilter}
                onChange={(e) => handleFilterChange(setInStockFilter, e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Stock Status</option>
                <option value="yes">In Stock Only</option>
                <option value="no">Out of Stock</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => handleFilterChange(setSortBy, e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
              </select>

              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>

            {/* View Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'} hover:bg-blue-50 transition-colors`}
              >
                <Grid3X3 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'} hover:bg-blue-50 transition-colors`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading medicines...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          ) : medicines.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No medicines found matching your criteria.</p>
              <button
                onClick={clearFilters}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              {/* Results Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {medicines.length} Medicines Found
                </h2>
                <div className="text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
              </div>

              {/* Medicines Grid/List */}
              {viewMode === 'grid' ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                  {medicines.map((medicine) => (
                    <MedicineGridCard key={medicine.id} medicine={medicine} />
                  ))}
                </div>
              ) : (
                <div className="space-y-6 mb-12">
                  {medicines.map((medicine) => (
                    <MedicineListCard key={medicine.id} medicine={medicine} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center">
                  <div className="flex space-x-2">
                    {currentPage > 1 && (
                      <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Previous
                      </button>
                    )}
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                      const pageNum = currentPage - 2 + index;
                      if (pageNum < 1 || pageNum > totalPages) return null;
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-4 py-2 border rounded-lg transition-colors ${
                            pageNum === currentPage
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    {currentPage < totalPages && (
                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Medicines;