import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Shield,
  Award,
  Users,
  Heart
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zM4 6h2v2h2v2H6v2H4V10H2V8h2V6zm0 6h2v2h2v2H6v2H4v-2H2v-2h2v-2zm8-6h2v2h2v2h-2v2h-2V10h-2V8h2V6z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">MediCare+</h3>
                <p className="text-sm text-gray-400">Your Trusted Online Pharmacy</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              Providing quality healthcare products and exceptional service since 2018. 
              Your health and wellness are our top priorities.
            </p>

            {/* Certifications */}
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Certifications</h4>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center bg-gray-800 px-3 py-2 rounded-lg text-sm">
                  <Shield className="h-4 w-4 mr-2 text-green-400" />
                  FDA Approved
                </div>
                <div className="flex items-center bg-gray-800 px-3 py-2 rounded-lg text-sm">
                  <Award className="h-4 w-4 mr-2 text-blue-400" />
                  ISO 9001
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-300 hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="/products" className="text-gray-300 hover:text-blue-400 transition-colors">All Products</a></li>
              <li><a href="/prescription" className="text-gray-300 hover:text-blue-400 transition-colors">Upload Prescription</a></li>
              <li><a href="/consultation" className="text-gray-300 hover:text-blue-400 transition-colors">Online Consultation</a></li>
              <li><a href="/track-order" className="text-gray-300 hover:text-blue-400 transition-colors">Track Your Order</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Popular Categories</h4>
            <ul className="space-y-3">
              <li><a href="/category/heart-care" className="text-gray-300 hover:text-blue-400 transition-colors">Heart Care</a></li>
              <li><a href="/category/vitamins" className="text-gray-300 hover:text-blue-400 transition-colors">Vitamins & Supplements</a></li>
              <li><a href="/category/pain-relief" className="text-gray-300 hover:text-blue-400 transition-colors">Pain Relief</a></li>
              <li><a href="/category/diabetes" className="text-gray-300 hover:text-blue-400 transition-colors">Diabetes Care</a></li>
              <li><a href="/category/skin-care" className="text-gray-300 hover:text-blue-400 transition-colors">Skin Care</a></li>
              <li><a href="/category/baby-care" className="text-gray-300 hover:text-blue-400 transition-colors">Baby & Mother Care</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Get In Touch</h4>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Emergency Helpline</p>
                  <p className="text-gray-300">+1-800-PHARMACY</p>
                  <p className="text-gray-300">+1-800-742-7622</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Email Support</p>
                  <p className="text-gray-300">support@medicareplus.com</p>
                  <p className="text-gray-300">orders@medicareplus.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Address</p>
                  <p className="text-gray-300">123 Healthcare Street</p>
                  <p className="text-gray-300">Medical District, NY 10001</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Support Hours</p>
                  <p className="text-gray-300">24/7 Available</p>
                  <p className="text-gray-300">Always here for you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Credits & Statistics Section */}
      <div className="border-t border-gray-800">
        <div className="container py-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Statistics */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Our Impact</h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-6 w-6 text-blue-400 mr-2" />
                    <span className="text-2xl font-bold text-white">50,000+</span>
                  </div>
                  <p className="text-gray-400 text-sm">Happy Customers</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Heart className="h-6 w-6 text-red-400 mr-2" />
                    <span className="text-2xl font-bold text-white">1M+</span>
                  </div>
                  <p className="text-gray-400 text-sm">Lives Improved</p>
                </div>
              </div>
            </div>

            {/* Developer Credits */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Developed By</h4>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-600 rounded-full p-2">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Khursand Sohail Iqbal</p>
                    <p className="text-gray-400 text-sm">Full Stack Developer</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm text-gray-300">
                  <p>• React & TypeScript Development</p>
                  <p>• Modern UI/UX Design</p>
                  <p>• Responsive & Accessible Design</p>
                </div>
                {/* Social Links for Developer */}
                <div className="flex space-x-3 mt-4">
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media & Legal */}
      <div className="border-t border-gray-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Media */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-gray-400">Follow us:</span>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-400">
              <a href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="/shipping" className="hover:text-blue-400 transition-colors">Shipping Policy</a>
              <a href="/returns" className="hover:text-blue-400 transition-colors">Returns & Refunds</a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-950 py-4">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2024 MediCare+ Online Pharmacy. All rights reserved.</p>
            <p>Licensed Pharmacy • Secure Payments • Fast Delivery</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;