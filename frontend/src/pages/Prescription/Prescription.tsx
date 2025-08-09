import React, { useState } from 'react';
import { Upload, X, FileText, Camera, Shield, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface PrescriptionFile {
  id: string;
  file: File;
  preview: string;
  status: 'uploading' | 'success' | 'error';
}

interface PrescriptionForm {
  patientName: string;
  phoneNumber: string;
  email: string;
  address: string;
  doctorName: string;
  notes: string;
  urgency: 'normal' | 'urgent';
}

const Prescription: React.FC = () => {
  const [files, setFiles] = useState<PrescriptionFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState<PrescriptionForm>({
    patientName: '',
    phoneNumber: '',
    email: '',
    address: '',
    doctorName: '',
    notes: '',
    urgency: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (fileList: File[]) => {
    const validFiles = fileList.filter(file => {
      const isValidType = file.type.startsWith('image/') || file.type === 'application/pdf';
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      return isValidType && isValidSize;
    });

    validFiles.forEach(file => {
      const newFile: PrescriptionFile = {
        id: Math.random().toString(36).substring(7),
        file,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : '',
        status: 'uploading'
      };

      setFiles(prev => [...prev, newFile]);

      // Simulate upload
      setTimeout(() => {
        setFiles(prev => 
          prev.map(f => 
            f.id === newFile.id 
              ? { ...f, status: Math.random() > 0.1 ? 'success' : 'error' }
              : f
          )
        );
      }, 1500);
    });
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const handleInputChange = (field: keyof PrescriptionForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate success/error
    if (Math.random() > 0.1) {
      setSubmitStatus('success');
      // Reset form
      setFormData({
        patientName: '',
        phoneNumber: '',
        email: '',
        address: '',
        doctorName: '',
        notes: '',
        urgency: 'normal'
      });
      setFiles([]);
    } else {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  const isFormValid = () => {
    return formData.patientName && 
           formData.phoneNumber && 
           formData.email && 
           formData.address && 
           files.some(f => f.status === 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 py-16">
        <div className="container">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Upload Prescription
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Upload your prescription and get your medicines delivered to your doorstep
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container max-w-4xl">
          {submitStatus === 'success' && (
            <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-1">
                    Prescription Uploaded Successfully!
                  </h3>
                  <p className="text-green-600">
                    We have received your prescription. Our pharmacist will review it and contact you shortly with medicine availability and pricing.
                  </p>
                </div>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center">
                <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-1">
                    Upload Failed
                  </h3>
                  <p className="text-red-600">
                    There was an error uploading your prescription. Please try again.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Process Steps */}
            <div className="bg-blue-50 p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How it works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full p-2 mr-4 flex-shrink-0">
                    <Upload className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">1. Upload Prescription</h3>
                    <p className="text-sm text-gray-600">Upload clear photos of your prescription</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full p-2 mr-4 flex-shrink-0">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">2. Verification</h3>
                    <p className="text-sm text-gray-600">Our pharmacist verifies the prescription</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full p-2 mr-4 flex-shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">3. Quick Delivery</h3>
                    <p className="text-sm text-gray-600">Get medicines delivered within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              {/* File Upload Section */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Upload Prescription Images/PDF *
                </label>
                
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="mb-4">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg text-gray-600 mb-2">
                      Drag and drop your prescription files here
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      or click to browse files
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf"
                      onChange={handleFileInput}
                      className="hidden"
                      id="fileInput"
                    />
                    <label
                      htmlFor="fileInput"
                      className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <Camera className="h-5 w-5 mr-2" />
                      Choose Files
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    Supported formats: JPG, PNG, PDF | Max file size: 10MB
                  </p>
                </div>

                {/* Uploaded Files */}
                {files.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Uploaded Files</h4>
                    <div className="space-y-4">
                      {files.map((file) => (
                        <div key={file.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                          {/* File Preview */}
                          <div className="flex-shrink-0 mr-4">
                            {file.preview ? (
                              <img 
                                src={file.preview} 
                                alt="Preview" 
                                className="h-12 w-12 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <FileText className="h-6 w-6 text-red-600" />
                              </div>
                            )}
                          </div>

                          {/* File Info */}
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{file.file.name}</p>
                            <p className="text-sm text-gray-500">
                              {(file.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>

                          {/* Status */}
                          <div className="flex items-center mr-4">
                            {file.status === 'uploading' && (
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                            )}
                            {file.status === 'success' && (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            )}
                            {file.status === 'error' && (
                              <AlertCircle className="h-5 w-5 text-red-600" />
                            )}
                          </div>

                          {/* Remove Button */}
                          <button
                            type="button"
                            onClick={() => removeFile(file.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Patient Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Patient Name *
                    </label>
                    <input
                      type="text"
                      value={formData.patientName}
                      onChange={(e) => handleInputChange('patientName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter patient name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Doctor Name
                    </label>
                    <input
                      type="text"
                      value={formData.doctorName}
                      onChange={(e) => handleInputChange('doctorName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter doctor name"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Information</h3>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address *
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter complete delivery address"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="normal"
                        checked={formData.urgency === 'normal'}
                        onChange={(e) => handleInputChange('urgency', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-gray-700">Normal (24-48 hours)</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="urgent"
                        checked={formData.urgency === 'urgent'}
                        onChange={(e) => handleInputChange('urgency', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-gray-700">Urgent (Same day delivery)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any special instructions or notes..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={!isFormValid() || isSubmitting}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    isFormValid() && !isSubmitting
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Uploading...
                    </div>
                  ) : (
                    'Submit Prescription'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Important Notes */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-4">Important Notes</h3>
            <ul className="space-y-2 text-yellow-700">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Ensure your prescription is clearly visible and readable
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Valid prescriptions should be not older than 6 months
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Our pharmacist will verify the prescription before processing
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                You will receive a call within 2 hours for confirmation and payment
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Prescription;