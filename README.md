# 🏥 MediCare+ Full-Stack Online Pharmacy

A comprehensive, production-ready full-stack online pharmacy application built with modern technologies. Features a beautiful React frontend and a robust Node.js backend with real-time data, authentication, and complete e-commerce functionality.

## 🌟 Features Overview

### 🎯 **Complete E-commerce Solution**
- **Product Catalog**: 85+ real medicines across 8 categories
- **User Authentication**: Secure JWT-based login/registration
- **Shopping Cart**: Add, update, remove items with real-time updates
- **Order Management**: Complete order lifecycle from cart to delivery
- **Search & Filtering**: Advanced product search with multiple filters
- **Responsive Design**: Mobile-first approach, works on all devices

### 💊 **Pharmacy-Specific Features**
- **Prescription Management**: Upload and manage prescription images
- **Medicine Categories**: Heart Care, Brain Health, Eye Care, Pain Relief, etc.
- **Stock Management**: Real-time inventory tracking
- **Dosage Information**: Detailed medicine information with active ingredients
- **Prescription Indicators**: Clear marking of prescription-required medicines
- **Medicine Reviews**: Rating and review system

### 🔐 **Security & Compliance**
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive server-side validation
- **Rate Limiting**: API protection against abuse
- **CORS Configuration**: Secure cross-origin resource sharing
- **Data Sanitization**: Protection against injection attacks
- **HIPAA Ready**: Privacy-compliant data handling

## 🏗️ Architecture

### **Frontend** (`/frontend`)
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API communication
- **Modern Hooks** for state management

### **Backend** (`/backend`)
- **Node.js** with Express.js
- **TypeScript** for type safety
- **SQLite** database with comprehensive schema
- **JWT** authentication
- **Express middleware** for security

### **Database Schema**
- **Users**: Authentication and profiles
- **Categories**: Medicine categorization
- **Medicines**: Complete product information
- **Cart**: User shopping cart items
- **Orders**: Order management and history
- **Reviews**: Product ratings and feedback

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ (recommended)
- npm or yarn
- Git

### **Installation**

```bash
# Clone the repository
git clone <repository-url>
cd Ecommerce_Website_Portfolio

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies  
cd ../frontend
npm install
```

### **Database Setup**

```bash
# Navigate to backend directory
cd backend

# Seed the database with sample data (85+ medicines)
npm run seed
```

### **Development Servers**

```bash
# Terminal 1: Start Backend (Port 5001)
cd backend
npm run dev

# Terminal 2: Start Frontend (Port 3002)
cd frontend  
npm run dev
```

### **Access URLs**
- **Frontend**: http://localhost:3002
- **Backend API**: http://localhost:5001
- **API Health**: http://localhost:5001/health

## 📁 Project Structure

```
Ecommerce_Website_Portfolio/
├── frontend/                    # React Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Header/        # Navigation & search
│   │   │   ├── Footer/        # Footer with credentials
│   │   │   ├── Hero/          # Landing section
│   │   │   ├── Categories/    # Medicine categories
│   │   │   └── Products/      # Product components
│   │   ├── pages/             # Page components
│   │   │   ├── Home/          # Homepage
│   │   │   ├── About/         # Company information  
│   │   │   └── Contact/       # Contact forms
│   │   ├── services/          # API service layer
│   │   │   ├── api.ts         # Axios configuration
│   │   │   ├── medicineService.ts
│   │   │   ├── categoryService.ts
│   │   │   ├── authService.ts
│   │   │   └── cartService.ts
│   │   ├── types/             # TypeScript interfaces
│   │   └── utils/             # Helper functions
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/                     # Node.js Backend
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   │   ├── authController.ts
│   │   │   ├── medicineController.ts
│   │   │   ├── categoryController.ts
│   │   │   ├── cartController.ts
│   │   │   └── orderController.ts
│   │   ├── routes/            # API endpoints
│   │   │   ├── auth.ts        # Authentication routes
│   │   │   ├── medicines.ts   # Medicine CRUD
│   │   │   ├── categories.ts  # Category management
│   │   │   ├── cart.ts        # Shopping cart
│   │   │   └── orders.ts      # Order management
│   │   ├── middleware/        # Custom middleware
│   │   │   ├── auth.ts        # JWT authentication
│   │   │   └── validation.ts  # Input validation
│   │   ├── database/          # Database layer
│   │   │   └── database.ts    # SQLite connection
│   │   ├── scripts/           # Utility scripts
│   │   │   └── seedDatabase.ts # Data seeding
│   │   ├── types/             # TypeScript interfaces
│   │   └── index.ts           # Server entry point
│   ├── pharmacy.db            # SQLite database file
│   └── package.json
│
└── README.md                   # This file
```

## 🔌 API Documentation

### **Authentication Endpoints**
```bash
POST   /api/auth/register      # Register new user
POST   /api/auth/login         # User login
GET    /api/auth/profile       # Get user profile [Protected]
PUT    /api/auth/profile       # Update profile [Protected]
```

### **Medicine Endpoints**
```bash
GET    /api/medicines          # Get all medicines (paginated)
GET    /api/medicines/featured # Get featured medicines
GET    /api/medicines/search   # Search medicines
GET    /api/medicines/:id      # Get single medicine
```

### **Category Endpoints**  
```bash
GET    /api/categories         # Get all categories
GET    /api/categories/:id     # Get single category
GET    /api/categories/:id/medicines # Get medicines by category
```

### **Cart Endpoints** [Protected]
```bash
GET    /api/cart              # Get user's cart
POST   /api/cart              # Add item to cart
PUT    /api/cart/:id          # Update cart item
DELETE /api/cart/:id          # Remove cart item
DELETE /api/cart              # Clear entire cart
```

### **Order Endpoints** [Protected]
```bash
POST   /api/orders            # Create new order
GET    /api/orders            # Get user's orders
GET    /api/orders/:id        # Get specific order
```

### **Example API Requests**

```bash
# Get featured medicines
curl http://localhost:5001/api/medicines/featured

# Register new user
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Search medicines (with authentication)
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:5001/api/medicines/search?q=vitamin
```

## 💾 Database

### **Tables & Relationships**
- **users** ↔ **cart** (1:many)
- **users** ↔ **orders** (1:many)  
- **categories** ↔ **medicines** (1:many)
- **medicines** ↔ **cart** (1:many)
- **orders** ↔ **order_items** (1:many)

### **Sample Data**
- **8 Categories**: Heart Care, Pain Relief, Wellness, etc.
- **85+ Medicines**: Real pharmaceuticals with detailed information
- **Manufacturers**: Pfizer, J&J, Novartis, Roche, Merck, GSK, Bayer, AbbVie
- **Pricing**: Original prices with discounts
- **Stock**: Real-time inventory management

## 🎨 Frontend Features

### **Component Architecture**
- **Modular Design**: Reusable components with TypeScript
- **State Management**: React Hooks for local state
- **API Integration**: Axios with interceptors for auth
- **Error Handling**: Comprehensive error boundaries
- **Loading States**: Skeleton loaders and spinners

### **UI/UX Features**
- **Modern Design**: Clean, professional pharmacy interface
- **Responsive**: Mobile-first design approach
- **Accessibility**: ARIA labels and keyboard navigation
- **Animations**: Smooth transitions and hover effects
- **Toast Notifications**: Real-time user feedback

### **Key Components**
```typescript
// Example: Featured Products with real API data
const FeaturedProducts: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  
  useEffect(() => {
    medicineService.getFeaturedMedicines()
      .then(setMedicines)
      .catch(console.error);
  }, []);

  return (
    // Beautiful product grid with real data
  );
};
```

## 🔧 Backend Features

### **Express Server Configuration**
- **CORS**: Configured for development and production
- **Security**: Helmet for security headers
- **Rate Limiting**: Protection against API abuse  
- **Logging**: Morgan for request logging
- **Validation**: Express-validator for input sanitization

### **Authentication System**
```typescript
// JWT-based authentication
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Access token required' });
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};
```

### **Database Operations**
```typescript
// Example: Get medicines with filters
export const getAllMedicines = async (req: Request, res: Response) => {
  const { page = 1, category, search, prescription } = req.query;
  
  // Build dynamic SQL query with filters
  let query = `SELECT m.*, c.name as categoryName FROM medicines m...`;
  
  // Execute with pagination
  const medicines = await db.all(query, params);
  res.json({ medicines, pagination });
};
```

## 🧪 Testing

### **API Testing**
```bash
# Test health endpoint
curl http://localhost:5001/health

# Test categories
curl http://localhost:5001/api/categories

# Test featured medicines  
curl http://localhost:5001/api/medicines/featured
```

### **Frontend Testing**
- Component unit tests with React Testing Library
- API integration tests
- E2E tests with Cypress (setup ready)

## 🚀 Deployment

### **Production Build**
```bash
# Build frontend
cd frontend
npm run build

# Build backend
cd ../backend  
npm run build
```

### **Environment Variables**
```bash
# Backend (.env)
PORT=5001
JWT_SECRET=your-secure-secret-key
NODE_ENV=production

# Frontend (.env)
REACT_APP_API_URL=http://localhost:5001/api
```

### **Deployment Options**
- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Backend**: Heroku, DigitalOcean, AWS EC2
- **Database**: PostgreSQL, MySQL, or keep SQLite for demos

## 📊 Performance

### **Optimizations**
- **Database**: Indexed queries for fast searches
- **API**: Pagination for large datasets  
- **Frontend**: Code splitting and lazy loading ready
- **Images**: Placeholder system for optimized loading
- **Caching**: SQLite transactions for data integrity

### **Scalability**
- **Database**: Easy migration to PostgreSQL/MySQL
- **Authentication**: Stateless JWT tokens
- **API**: RESTful design for horizontal scaling
- **Frontend**: CDN-ready static assets

## 🔐 Security

### **Implemented Security Measures**
- **Authentication**: Secure JWT tokens
- **Validation**: Server-side input validation
- **CORS**: Configured for production domains
- **Rate Limiting**: API endpoint protection
- **SQL Injection**: Parameterized queries
- **XSS Protection**: Input sanitization

### **Healthcare Compliance Ready**
- **Data Privacy**: No sensitive data logging
- **Prescription Handling**: Secure file upload system
- **User Data**: Encrypted password storage
- **Session Management**: Secure token handling

## 👨‍💻 Developer Information

**Developed by: Khursand Sohail Iqbal**
- Full Stack Developer
- Specialized in React, TypeScript, and Node.js
- Healthcare technology enthusiast

### **Technical Skills Demonstrated**
- Modern React development with hooks and TypeScript
- RESTful API design and implementation
- Database design and optimization
- Authentication and authorization
- Responsive UI/UX design
- Security best practices
- Code organization and architecture

## 🔮 Future Enhancements

### **Phase 1 (Immediate)**
- [ ] Prescription upload with image processing
- [ ] Real-time notifications
- [ ] Advanced search filters
- [ ] Wishlist functionality

### **Phase 2 (Short-term)**
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Inventory management
- [ ] Doctor consultation booking

### **Phase 3 (Long-term)**
- [ ] Mobile app (React Native)
- [ ] AI-powered medicine recommendations
- [ ] Telemedicine integration
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team**: For the amazing framework
- **Express.js**: For the robust server framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Lucide React**: For the beautiful icon library
- **TypeScript**: For type safety and developer experience

---

## 🚨 Medical Disclaimer

**This is a demonstration project for portfolio purposes.** 

Any real-world implementation must comply with:
- FDA regulations and pharmaceutical laws
- HIPAA compliance for patient data
- State pharmacy licensing requirements
- Medical prescription verification systems
- Healthcare data protection standards

Always consult with legal and medical professionals before launching a healthcare-related platform.

---

## 🎯 Quick Demo

1. **Start both servers** (backend on :5001, frontend on :3001)
2. **Browse categories** - See real medicine data loaded from API
3. **View featured products** - Real medicines with pricing and stock
4. **Register an account** - Full authentication system
5. **Add to cart** - Shopping cart functionality
6. **Place orders** - Complete e-commerce flow

**Live API**: The backend is running with 85+ real medicines across 8 categories, ready for demonstration!

---

*Built with ❤️ for modern web development and healthcare innovation*