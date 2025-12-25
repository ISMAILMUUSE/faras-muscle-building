'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { productsAPI } from '@/lib/api';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  featured: boolean;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsAPI.getAll({ featured: 'true' })
      .then((res) => {
        setProducts(res.data.slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-dark-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">Loading products...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-dark-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Featured Products
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our most popular supplements, trusted by athletes worldwide
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Link href={`/products/${product.slug}`}>
                <div className="bg-dark rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all transform hover:scale-105 border border-dark-lighter">
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
                      <span className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Save {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-primary text-sm font-semibold mb-2">{product.category}</p>
                    <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-white">${product.price}</span>
                      {product.comparePrice && (
                        <span className="text-gray-500 line-through">${product.comparePrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/shop"
            className="inline-block px-8 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all"
          >
            View All Products
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

