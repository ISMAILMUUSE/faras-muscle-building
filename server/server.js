import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import blogRoutes from './routes/blog.js';
import adminRoutes from './routes/admin.js';
import stripeRoutes from './routes/stripe.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/stripe', stripeRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'FARAS API is running' });
});

// Database test endpoint
app.get('/api/test-db', async (req, res) => {
  try {
    const Product = (await import('./models/Product.js')).default;
    const productCount = await Product.countDocuments();
    const featuredCount = await Product.countDocuments({ featured: true });
    const allProducts = await Product.find().limit(5).select('name featured');
    
    res.json({
      connected: mongoose.connection.readyState === 1,
      database: mongoose.connection.db.databaseName,
      totalProducts: productCount,
      featuredProducts: featuredCount,
      sampleProducts: allProducts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/faras-supplements';
    console.log('Connecting to MongoDB:', mongoUri);
    
    // Close any existing connection first
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ MongoDB connected');
    
    // Verify connection and check products
    const dbName = mongoose.connection.db.databaseName;
    console.log(`📦 Database: ${dbName}`);
    
    // Quick check to verify products exist
    const Product = (await import('./models/Product.js')).default;
    const productCount = await Product.countDocuments();
    console.log(`📊 Products in database: ${productCount}`);
    
    if (productCount === 0) {
      console.warn('⚠️  WARNING: No products found in database!');
      console.log('💡 Run: npm run seed');
    } else {
      console.log('✅ Products are available');
      // Show sample products
      const sampleProducts = await Product.find().limit(3).select('name featured');
      sampleProducts.forEach(p => {
        console.log(`   - ${p.name} (featured: ${p.featured})`);
      });
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Handle port already in use error gracefully
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use.`);
    console.log(`💡 Try one of these solutions:`);
    console.log(`   1. Kill the process: kill -9 $(lsof -ti:${PORT})`);
    console.log(`   2. Use a different port: PORT=5001 npm run dev`);
    process.exit(1);
  } else {
    throw err;
  }
});

