import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import User from './models/User.js';
import Order from './models/Order.js';
import Blog from './models/Blog.js';

dotenv.config();

const checkDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/faras-supplements';
    console.log('Connecting to:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB\n');

    // Get counts
    const productCount = await Product.countDocuments();
    const userCount = await User.countDocuments();
    const orderCount = await Order.countDocuments();
    const blogCount = await Blog.countDocuments();

    console.log('📊 Database Statistics:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Products:  ${productCount}`);
    console.log(`Users:     ${userCount}`);
    console.log(`Orders:    ${orderCount}`);
    console.log(`Blogs:     ${blogCount}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Show products
    if (productCount > 0) {
      console.log('📦 Products:');
      const products = await Product.find().select('name slug price category images inStock').limit(10);
      products.forEach((p, i) => {
        console.log(`  ${i + 1}. ${p.name}`);
        console.log(`     Slug: ${p.slug}`);
        console.log(`     Price: KES ${p.price}`);
        console.log(`     Category: ${p.category}`);
        console.log(`     Images: ${p.images.join(', ') || 'None'}`);
        console.log(`     In Stock: ${p.inStock ? '✅' : '❌'}`);
        console.log('');
      });
      if (productCount > 10) {
        console.log(`  ... and ${productCount - 10} more products\n`);
      }
    }

    // Show users (without passwords)
    if (userCount > 0) {
      console.log('👥 Users:');
      const users = await User.find().select('name email role createdAt').limit(10);
      users.forEach((u, i) => {
        console.log(`  ${i + 1}. ${u.name} (${u.email})`);
        console.log(`     Role: ${u.role}`);
        console.log(`     Created: ${u.createdAt.toLocaleDateString()}`);
        console.log('');
      });
      if (userCount > 10) {
        console.log(`  ... and ${userCount - 10} more users\n`);
      }
    }

    // Show recent orders
    if (orderCount > 0) {
      console.log('🛒 Recent Orders:');
      const orders = await Order.find()
        .populate('user', 'name email')
        .sort({ createdAt: -1 })
        .limit(5);
      orders.forEach((o, i) => {
        console.log(`  ${i + 1}. Order #${o._id.toString().slice(-6)}`);
        console.log(`     User: ${o.user?.name || 'N/A'}`);
        console.log(`     Total: KES ${o.totalPrice}`);
        console.log(`     Status: ${o.status}`);
        console.log(`     Date: ${o.createdAt.toLocaleDateString()}`);
        console.log('');
      });
      if (orderCount > 5) {
        console.log(`  ... and ${orderCount - 5} more orders\n`);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error checking database:', error.message);
    process.exit(1);
  }
};

checkDatabase();

