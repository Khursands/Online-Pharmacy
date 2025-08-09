import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Brain, Eye, Users, Activity, Pill, ArrowRight } from 'lucide-react';
import type { Category } from '../../types';
import { categoryService } from '../../services/categoryService';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const getIcon = (categoryName: string) => {
    const iconClass = "h-12 w-12 text-white";
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
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
          <div className="container">
            <div className="text-center text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Medicine Categories
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Loading categories...
              </p>
            </div>
          </div>
        </section>

        <div className="container py-12">
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
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
          <div className="container">
            <div className="text-center text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Medicine Categories
              </h1>
              <p className="text-xl text-red-200">
                {error}
              </p>
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
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Medicine Categories
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Explore our comprehensive range of healthcare categories to find the right medicines for your needs
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                to={`/category/${category.id}`}
                key={category.id}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 block"
              >
                {/* Category Icon Header */}
                <div className={`bg-gradient-to-r ${getGradient(index)} p-8`}>
                  <div className="flex items-center justify-between">
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
                      {getIcon(category.name)}
                    </div>
                    <div className="text-white text-right">
                      <div className="text-3xl font-bold">{category.medicineCount}+</div>
                      <div className="text-sm opacity-90">Products</div>
                    </div>
                  </div>
                </div>

                {/* Category Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  
                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-sm text-gray-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Prescription & OTC available
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Expert consultation available
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Fast delivery guarantee
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3 px-4 border border-gray-200 rounded-lg group-hover:bg-blue-50 group-hover:border-blue-200 transition-all duration-200">
                    <span className="font-medium text-gray-700 group-hover:text-blue-700">
                      Browse {category.name}
                    </span>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need Help Finding the Right Medicine?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our healthcare professionals are here to help you find the right treatment for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Contact Us
            </Link>
            <Link
              to="/medicines"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Browse All Medicines
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoriesPage;