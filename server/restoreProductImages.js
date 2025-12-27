import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

// Product images mapping - slugs match generateSlug() output
const productImages = {
  'whey-protein-powder': ['/whey.png'],
  'mass-gainer': ['/massgainer.jpg'],
  'creatine-monohydrate': ['/creating.webp'],
  'bcaa': ['/BCAA.jpg'],
  'pre-workout': ['/pre-workout.webp'],
  'post-workout-recovery': ['/post-workout.jpg'],
  'casein-protein': ['/casein.png'],
  'testosterone-support': ['/testtosteronw.webp'],
  'omega-3-fish-oil': ['/omega.webp'],
  'multivitamins': ['/multivitamins.webp'],
};

const restoreProductImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/faras-supplements');
    console.log('✅ Connected to MongoDB');

    // Update each product with its correct image
    let updatedCount = 0;
    for (const [slug, images] of Object.entries(productImages)) {
      const result = await Product.updateOne(
        { slug },
        { $set: { images } }
      );
      if (result.modifiedCount > 0) {
        console.log(`✅ Updated images for: ${slug}`);
        updatedCount++;
      } else if (result.matchedCount > 0) {
        console.log(`ℹ️  Images already correct for: ${slug}`);
      } else {
        console.log(`⚠️  Product not found: ${slug}`);
      }
    }

    console.log(`\n✅ Restored images for ${updatedCount} products!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error restoring product images:', error);
    process.exit(1);
  }
};

restoreProductImages();

