import React from 'react';
import { Shield, Award, Users, Heart, Clock, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  return (
    <main className="py-16">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About MediCare+
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner in healthcare since 2018. We're committed to providing 
            safe, authentic, and affordable medicines to improve lives worldwide.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-blue-50 rounded-xl p-8">
            <div className="bg-blue-600 rounded-lg p-3 w-fit mb-4">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To make quality healthcare accessible to everyone by providing authentic medicines, 
              expert consultation, and exceptional service. We believe healthcare is a fundamental 
              right, not a privilege.
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-8">
            <div className="bg-green-600 rounded-lg p-3 w-fit mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To become the world's most trusted online pharmacy platform, setting new standards 
              for quality, safety, and customer care in the digital healthcare industry.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-4 w-fit mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">50,000+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>

          <div className="text-center">
            <div className="bg-green-100 rounded-full p-4 w-fit mx-auto mb-4">
              <Award className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">15,000+</div>
            <div className="text-gray-600">Medicines Available</div>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-4 w-fit mx-auto mb-4">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">6</div>
            <div className="text-gray-600">Years of Service</div>
          </div>

          <div className="text-center">
            <div className="bg-yellow-100 rounded-full p-4 w-fit mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
            <div className="text-gray-600">Customer Satisfaction</div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 rounded-full p-4 w-fit mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Safety First</h3>
              <p className="text-gray-600">
                Every medicine is thoroughly verified and authenticated before reaching our customers. 
                Your safety is our top priority.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 rounded-full p-4 w-fit mx-auto mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Care</h3>
              <p className="text-gray-600">
                24/7 support from certified pharmacists and healthcare professionals. 
                We're always here when you need us.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 rounded-full p-4 w-fit mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-600">
                Committed to the highest standards in everything we do, from product quality 
                to customer service.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gray-50 rounded-xl p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Leadership Team</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Led by healthcare professionals and technology experts with decades of combined experience 
            in pharmacy, medicine, and digital innovation.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="bg-blue-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Dr. Sarah Johnson</h3>
                <p className="text-blue-600 font-medium mb-2">Chief Pharmacist</p>
                <p className="text-gray-600 text-sm">PharmD, 15+ years experience</p>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="bg-green-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Michael Chen</h3>
                <p className="text-green-600 font-medium mb-2">Chief Technology Officer</p>
                <p className="text-gray-600 text-sm">MS Computer Science, 12+ years</p>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="bg-blue-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Dr. Emily Rodriguez</h3>
                <p className="text-blue-600 font-medium mb-2">Medical Director</p>
                <p className="text-gray-600 text-sm">MD, Internal Medicine, 18+ years</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;