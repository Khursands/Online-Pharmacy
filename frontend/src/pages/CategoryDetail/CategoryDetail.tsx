import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Search, Grid3X3, List, Star, ShoppingCart, CheckCircle, AlertCircle } from 'lucide-react';
import type { Medicine, Category } from '../../types';
import { categoryService } from '../../services/categoryService';
import { useCart } from '../../contexts/CartContext';

const CategoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [category, setCategory] = useState<Category | null>(null);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [prescriptionFilter, setPrescriptionFilter] = useState<string>('all');
  const [inStockFilter, setInStockFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (id) {
      fetchCategory();
      fetchCategoryMedicines();
    }
  }, [id, currentPage, searchQuery, prescriptionFilter, inStockFilter, sortBy]);

  const fetchCategory = async () => {
    try {
      if (!id) return;
      const data = await categoryService.getCategoryById(id);
      setCategory(data);
    } catch (err) {
      console.error('Error fetching category:', err);
      setError('Failed to load category details');
    }
  };

  const fetchCategoryMedicines = async () => {
    try {
      if (!id) return;
      setLoading(true);
      const filters = {
        search: searchQuery || undefined,
        prescription: prescriptionFilter === 'all' ? undefined : prescriptionFilter === 'yes',
        inStock: inStockFilter === 'all' ? undefined : inStockFilter === 'yes',
        sortBy: sortBy !== 'name' ? sortBy : undefined,
      };
      const response = await categoryService.getMedicinesByCategory(id, currentPage, 12, filters);
      setMedicines(response.medicines);
      setTotalPages(response.pagination.totalPages);
    } catch (err) {
      console.error('Error fetching category medicines:', err);
      setError('Failed to load medicines');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterSetter: Function, value: string) => {
    setCurrentPage(1);
    filterSetter(value);
  };

  const clearFilters = () => {
    setSearchQuery('');
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
      </div>

      {/* Medicine Info */}
      <div className="p-6">
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

  if (loading && !category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading category...</p>
        </div>
      </div>
    );
  }

  if (error && !category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Category Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/categories"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="container">
          {/* Breadcrumb */}
          <div className="flex items-center text-blue-100 mb-6">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/categories" className="hover:text-white transition-colors">
              Categories
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{category?.name}</span>
          </div>

          <div className="flex items-start justify-between">
            <div className="text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {category?.name}
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl">
                {category?.description}
              </p>
              <div className="flex items-center mt-6">
                <span className="text-2xl font-bold">{category?.medicineCount}+</span>
                <span className="ml-2 text-blue-100">medicines available</span>
              </div>
            </div>
            <Link
              to="/categories"
              className="flex items-center text-blue-100 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search medicines in this category..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
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
          ) : medicines.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">No medicines found in this category.</p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              {/* Results Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {medicines.length} Medicines in {category?.name}
                </h2>
                <div className="text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
              </div>

              {/* Medicines Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {medicines.map((medicine) => (
                  <MedicineGridCard key={medicine.id} medicine={medicine} />
                ))}
              </div>

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

export default CategoryDetail;