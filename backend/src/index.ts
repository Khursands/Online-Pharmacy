import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';

// Routes
import medicineRoutes from './routes/medicines';
import categoryRoutes from './routes/categories';
import authRoutes from './routes/auth';
import cartRoutes from './routes/cart';
import orderRoutes from './routes/orders';

// Database
import { initializeDatabase } from './database/database';

const app = express();
const PORT = process.env.PORT || 5001;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] 
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://127.0.0.1:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Logging
app.use(morgan('combined'));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0' 
  });
});

// API Routes
app.use('/api/medicines', medicineRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ 
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message 
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
      
      if (process.env.NODE_ENV !== 'production') {
        console.log('\n📋 Available Endpoints:');
        console.log('┌─────────────────────────────────────────┐');
        console.log('│ Medicine Routes:                        │');
        console.log('│ GET    /api/medicines                   │');
        console.log('│ GET    /api/medicines/featured          │');
        console.log('│ GET    /api/medicines/search            │');
        console.log('│ GET    /api/medicines/:id               │');
        console.log('│                                         │');
        console.log('│ Category Routes:                        │');
        console.log('│ GET    /api/categories                  │');
        console.log('│ GET    /api/categories/:id              │');
        console.log('│ GET    /api/categories/:id/medicines    │');
        console.log('│                                         │');
        console.log('│ Auth Routes:                            │');
        console.log('│ POST   /api/auth/register               │');
        console.log('│ POST   /api/auth/login                  │');
        console.log('│ GET    /api/auth/profile     [Protected]│');
        console.log('│ PUT    /api/auth/profile     [Protected]│');
        console.log('│                                         │');
        console.log('│ Cart Routes:                 [Protected]│');
        console.log('│ GET    /api/cart                        │');
        console.log('│ POST   /api/cart                        │');
        console.log('│ PUT    /api/cart/:id                    │');
        console.log('│ DELETE /api/cart/:id                    │');
        console.log('│ DELETE /api/cart                        │');
        console.log('│                                         │');
        console.log('│ Order Routes:                [Protected]│');
        console.log('│ POST   /api/orders                      │');
        console.log('│ GET    /api/orders                      │');
        console.log('│ GET    /api/orders/:id                  │');
        console.log('└─────────────────────────────────────────┘');
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();