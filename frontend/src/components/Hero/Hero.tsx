import React from 'react';
import { ArrowRight, Shield, Clock, Truck, Star } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-green-50 py-16 lg:py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Health, 
                <span className="text-blue-600"> Our Priority</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Get authentic medicines delivered to your doorstep. Fast, reliable, and secure - 
                your trusted online pharmacy with 24/7 support.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-green-600 mr-2" />
                <span>100% Authentic</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-blue-600 mr-2" />
                <span>24/7 Available</span>
              </div>
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-green-600 mr-2" />
                <span>Free Delivery</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary flex items-center justify-center">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="btn-outline">
                Upload Prescription
              </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-blue-600">50K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-green-600">15K+</div>
                <div className="text-sm text-gray-600">Medicines Available</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <div className="text-2xl lg:text-3xl font-bold text-yellow-500">4.9</div>
                  <Star className="h-5 w-5 text-yellow-400 ml-1 fill-current" />
                </div>
                <div className="text-sm text-gray-600">Customer Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image/Illustration */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8">
              {/* Main illustration placeholder */}
              <div className="bg-gradient-to-br from-primary-100 to-green-100 rounded-xl h-80 lg:h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="bg-white rounded-full p-6 mx-auto w-20 h-20 flex items-center justify-center shadow-lg">
                    <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zM4 6h2v2h2v2H6v2H4V10H2V8h2V6zm0 6h2v2h2v2H6v2H4v-2H2v-2h2v-2zm8-6h2v2h2v2h-2v2h-2V10h-2V8h2V6z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700">Professional Healthcare</h3>
                  <p className="text-gray-500">Trusted by medical professionals</p>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 border-2 border-green-100">
                <div className="flex items-center space-x-2">
                  <div className="bg-green-100 rounded-full p-2">
                    <Shield className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">FDA Approved</div>
                    <div className="text-xs text-gray-500">Certified Quality</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 border-2 border-primary-100">
                <div className="flex items-center space-x-2">
                  <div className="bg-primary-100 rounded-full p-2">
                    <Truck className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Fast Delivery</div>
                    <div className="text-xs text-gray-500">Same Day Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;