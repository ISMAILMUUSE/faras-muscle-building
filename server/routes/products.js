import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products with filters
router.get('/', async (req, res) => {
  try {
    // Verify MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      console.error('[Products API] MongoDB not connected! State:', mongoose.connection.readyState);
      return res.status(503).json({ message: 'Database not connected' });
    }

    const { category, minPrice, maxPrice, featured, search } = req.query;
    const query = {};

    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    if (search) {
      // Escape special regex characters and create search pattern
      const searchPattern = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.$or = [
        { name: { $regex: searchPattern, $options: 'i' } },
        { description: { $regex: searchPattern, $options: 'i' } },
        { category: { $regex: searchPattern, $options: 'i' } },
        { slug: { $regex: searchPattern, $options: 'i' } },
      ];
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Check total products first
    const totalProducts = await Product.countDocuments({});
    console.log(`[Products API] Total products in DB: ${totalProducts}`);
    console.log(`[Products API] Query:`, JSON.stringify(query, null, 2));
    
    const products = await Product.find(query).sort({ createdAt: -1 });
    console.log(`[Products API] Found ${products.length} products`);
    
    if (products.length === 0 && totalProducts > 0) {
      console.warn(`[Products API] ⚠️  Query returned 0 results but DB has ${totalProducts} products`);
      console.log(`[Products API] Query details:`, query);
    }
    
    if (search) {
      console.log(`[Products API] Search term: "${search}"`);
      products.forEach(p => console.log(`  - ${p.name} (${p.category})`));
    }
    
    res.json(products.length ? products : []);
  } catch (error) {
    console.error('[Products API] Error:', error.message);
    console.error('[Products API] Stack:', error.stack);
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/products/:slug
// @desc    Get single product by slug
router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

