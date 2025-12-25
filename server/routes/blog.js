import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

// @route   GET /api/blog
// @desc    Get all published blog posts
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = { published: true };
    if (category) query.category = category;

    const posts = await Blog.find(query).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/blog/:slug
// @desc    Get single blog post
router.get('/:slug', async (req, res) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug, published: true });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Increment views
    post.views += 1;
    await post.save();
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

