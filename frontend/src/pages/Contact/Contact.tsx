import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Shield } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert('Thank you for your message. We\'ll get back to you within 24 hours!');
  };

  return (
    <main className="py-16">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our medicines or services? Our expert team is here to help you 24/7. 
            Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>
            
            {/* Emergency Helpline */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-red-600 rounded-lg p-3">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Emergency Helpline</h3>
                  <p className="text-red-600 text-lg font-bold mb-1">+1-800-PHARMACY</p>
                  <p className="text-red-600 text-lg font-bold mb-2">+1-800-742-7622</p>
                  <p className="text-gray-600 text-sm">Available 24/7 for urgent medical queries</p>
                </div>
              </div>
            </div>

            {/* Regular Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 rounded-lg p-3">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
                  <p className="text-gray-600 mb-1">General Inquiries: support@medicareplus.com</p>
                  <p className="text-gray-600 mb-1">Orders & Shipping: orders@medicareplus.com</p>
                  <p className="text-gray-600 mb-1">Prescriptions: prescriptions@medicareplus.com</p>
                  <p className="text-gray-500 text-sm">Response time: Within 2-4 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-600 rounded-lg p-3">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
                  <p className="text-gray-600 mb-2">Chat with our pharmacy experts in real-time</p>
                  <button className="btn-secondary text-sm">
                    Start Chat Now
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 rounded-lg p-3">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Our Office</h3>
                  <p className="text-gray-600 mb-1">123 Healthcare Street</p>
                  <p className="text-gray-600 mb-1">Medical District, NY 10001</p>
                  <p className="text-gray-600 mb-1">United States</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-yellow-600 rounded-lg p-3">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Support Hours</h3>
                  <p className="text-gray-600 mb-1">Customer Support: 24/7</p>
                  <p className="text-gray-600 mb-1">Pharmacy Consultation: 6 AM - 11 PM EST</p>
                  <p className="text-gray-600 mb-1">Order Processing: 24/7</p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Your Privacy is Protected</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• All communications are encrypted and secure</li>
                <li>• HIPAA compliant handling of medical information</li>
                <li>• Licensed pharmacists review all prescription queries</li>
                <li>• Your personal data is never shared with third parties</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="prescription">Prescription Inquiry</option>
                      <option value="order">Order Status</option>
                      <option value="product">Product Information</option>
                      <option value="shipping">Shipping Question</option>
                      <option value="billing">Billing Support</option>
                      <option value="consultation">Medical Consultation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Please describe your inquiry in detail..."
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> For urgent medical emergencies, please call our 24/7 helpline at +1-800-PHARMACY 
                    or contact your local emergency services immediately.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center text-lg py-3"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </button>

                <p className="text-sm text-gray-500 text-center">
                  We typically respond within 2-4 hours during business hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;