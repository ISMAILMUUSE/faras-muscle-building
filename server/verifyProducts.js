import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const verifyProducts = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/faras-supplements';
    console.log('Connecting to:', mongoUri);
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB\n');

    // Check products
    const productCount = await Product.countDocuments();
    console.log(`Total products in database: ${productCount}`);
    
    if (productCount > 0) {
      const products = await Product.find().limit(5);
      console.log('\nSample products:');
      products.forEach(p => {
        console.log(`  - ${p.name} (${p.category}) - ${p.slug}`);
      });
    } else {
      console.log('\n⚠️  No products found!');
      console.log('Checking if collection exists...');
      
      // List all collections
      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log('\nCollections in database:');
      collections.forEach(col => {
        console.log(`  - ${col.name}`);
      });
      
      // Try to find products in products collection directly
      const productsCollection = mongoose.connection.db.collection('products');
      const directCount = await productsCollection.countDocuments();
      console.log(`\nDirect count from 'products' collection: ${directCount}`);
      
      if (directCount > 0) {
        const directProducts = await productsCollection.find().limit(3).toArray();
        console.log('\nDirect products from collection:');
        directProducts.forEach(p => {
          console.log(`  - ${p.name || 'No name'}`);
        });
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

verifyProducts();

