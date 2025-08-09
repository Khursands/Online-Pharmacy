import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, Heart, Phone } from 'lucide-react';

interface HeaderProps {
  cartItemsCount?: number;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="container flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              <span>Emergency: +1-800-PHARMACY</span>
            </div>
            <span>Free delivery on orders over $50</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>24/7 Customer Support</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zM4 6h2v2h2v2H6v2H4V10H2V8h2V6zm0 6h2v2h2v2H6v2H4v-2H2v-2h2v-2zm8-6h2v2h2v2h-2v2h-2V10h-2V8h2V6z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-700">MediCare+</h1>
              <p className="text-sm text-gray-600">Your Trusted Online Pharmacy</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search medicines, health products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Heart className="h-6 w-6" />
            </button>
            
            <button className="flex items-center p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <User className="h-6 w-6" />
            </button>
            
            <Link 
              to="/cart"
              className="relative flex items-center p-2 text-gray-600 hover:text-blue-600 transition-colors group"
            >
              <ShoppingCart className={`h-6 w-6 ${cartItemsCount > 0 ? 'animate-cart-pulse' : ''}`} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-cart-badge">
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block mt-4">
          <ul className="flex space-x-8">
            <li>
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/medicines"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Medicines
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                to="/prescription"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Upload Prescription
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="container py-4">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/medicines"
                  className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Medicines
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/prescription"
                  className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Upload Prescription
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;