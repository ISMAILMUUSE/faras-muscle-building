'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { productsAPI } from '@/lib/api';
import { useStore } from '@/lib/store';
import toast from 'react-hot-toast';

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  inStock: boolean;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useStore();

  const categories = ['all', 'Protein', 'Creatine', 'Pre-Workout', 'Recovery', 'BCAA', 'Mass Gainer'];

  useEffect(() => {
    productsAPI.getAll()
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    filtered = filtered.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, searchQuery, products]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      product: product._id,
      name: product.name,
      image: product.images[0] || '',
      price: product.price,
      quantity: 1,
    });
    toast.success('Added to cart!');
  };

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Shop</h1>
            <p className="text-gray-400 text-lg">Find the perfect supplements for your fitness journey</p>
          </motion.div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedCategory === cat
                        ? 'bg-primary text-white'
                        : 'bg-dark-light text-gray-300 hover:bg-dark-lighter'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="flex items-center gap-4">
              <label className="text-gray-400">Price Range:</label>
              <input
                type="range"
                min="0"
                max="200"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="flex-1"
              />
              <span className="text-white font-semibold">${priceRange[1]}+</span>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center text-gray-400 py-20">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center text-gray-400 py-20">
              No products found. Try adjusting your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-dark-light rounded-lg overflow-hidden border border-dark-lighter hover:border-primary transition-all"
                >
                  <Link href={`/products/${product.slug}`}>
                    <div className="aspect-square bg-dark-lighter relative">
                      {product.images && product.images[0] ? (
                        <img
                          src={product.images[0].startsWith('http') ? product.images[0] : `http://localhost:5000${product.images[0]}`}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          No Image
                        </div>
                      )}
                      {product.comparePrice && (
                        <span className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs font-semibold">
                          Save {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
                        </span>
                      )}
                      {!product.inStock && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="p-4">
                    <p className="text-primary text-xs font-semibold mb-1">{product.category}</p>
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="text-lg font-bold text-white mb-2 hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-white">${product.price}</span>
                        {product.comparePrice && (
                          <span className="text-gray-500 line-through text-sm">${product.comparePrice}</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className="w-full py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
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

