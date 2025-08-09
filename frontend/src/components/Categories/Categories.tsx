import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Brain, Eye, Users, Activity, Pill } from 'lucide-react';
import type { Category } from '../../types';
import { categoryService } from '../../services/categoryService';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getIcon = (categoryName: string) => {
    const iconClass = "h-8 w-8 text-white";
    switch (categoryName) {
      case 'Heart Care':
        return <Heart className={iconClass} />;
      case 'Brain & Mental Health':
        return <Brain className={iconClass} />;
      case 'Eye Care':
        return <Eye className={iconClass} />;
      case 'Family Care':
        return <Users className={iconClass} />;
      case 'Wellness':
        return <Activity className={iconClass} />;
      case 'General Medicine':
        return <Pill className={iconClass} />;
      case 'Pain Relief':
        return <Heart className={iconClass} />;
      case 'Diabetes Care':
        return <Activity className={iconClass} />;
      default:
        return <Pill className={iconClass} />;
    }
  };

  const getGradient = (index: number) => {
    const gradients = [
      'from-red-500 to-red-600',
      'from-purple-500 to-purple-600', 
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-orange-500 to-orange-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
      'from-yellow-500 to-yellow-600',
    ];
    return gradients[index % gradients.length];
  };

  if (loading) {
    return (
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Loading categories...
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="h-24 bg-gray-200 rounded-lg mb-4"></div>
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
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the right medicines and healthcare products for your specific needs. 
            All products are verified and approved by healthcare professionals.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              to={`/category/${category.id}`}
              key={category.id}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2 block"
            >
              {/* Category Icon Header */}
              <div className={`bg-gradient-to-r ${getGradient(index)} p-6`}>
                <div className="flex items-center justify-between">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3">
                    {getIcon(category.name)}
                  </div>
                  <div className="text-white text-right">
                    <div className="text-2xl font-bold">{(category as any).medicineCount || 0}+</div>
                    <div className="text-sm opacity-90">Products</div>
                  </div>
                </div>
              </div>

              {/* Category Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {category.description}
                </p>
                
                {/* Features List */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                    Prescription & OTC available
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                    Expert consultation available
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                    Fast delivery guarantee
                  </div>
                </div>

                <div className="w-full py-2 px-4 border border-gray-200 rounded-lg text-gray-700 group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-700 transition-all duration-200 font-medium text-center">
                  Browse Category
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <button className="btn-primary">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;