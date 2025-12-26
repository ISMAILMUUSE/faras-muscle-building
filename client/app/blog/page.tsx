'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { blogAPI } from '@/lib/api';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  image?: string;
  category: string;
  author: string;
  createdAt: string;
  views: number;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Fitness', 'Nutrition', 'Recovery', 'Training', 'Supplements'];

  useEffect(() => {
    blogAPI.getAll()
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">FARAS Blog</h1>
            <p className="text-xl text-gray-600">Fitness tips, nutrition advice, and supplement education</p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blog Posts */}
          {loading ? (
            <div className="text-center text-gray-600 py-20">Loading posts...</div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center text-gray-600 py-20">No posts found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-primary transition-all h-full flex flex-col shadow-sm">
                      {post.image ? (
                        <div className="aspect-video bg-gray-100 relative">
                          <img
                            src={post.image.startsWith('http') ? post.image : `http://localhost:5000${post.image}`}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-gray-100 flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-primary text-sm font-semibold">{post.category}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-600 text-sm">{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 mb-4 flex-1">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 text-sm">By {post.author}</span>
                          <span className="text-gray-600 text-sm">{post.views} views</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

