'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  howToUse: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  numReviews: number;
}

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useStore();

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      product: product._id,
      name: product.name,
      image: product.images[0] || '',
      price: product.price,
      quantity,
    });
    toast.success('Added to cart!');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {product ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  {/* Product Image */}
                  <div className="relative">
                    <button
                      onClick={onClose}
                      className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      {product.images && product.images[0] ? (
                        <img
                          src={product.images[0].startsWith('http') ? product.images[0] : product.images[0].startsWith('/uploads') ? `http://localhost:5000${product.images[0]}` : product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col">
                    <div className="flex-1">
                      <p className="text-primary font-semibold text-sm mb-2">{product.category}</p>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h2>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-lg ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-gray-600 text-sm">({product.numReviews} reviews)</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                        {product.comparePrice && (
                          <>
                            <span className="text-xl text-gray-500 line-through">${product.comparePrice}</span>
                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                              Save {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
                            </span>
                          </>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 mb-6">{product.description}</p>

                      {/* Benefits */}
                      {product.benefits && product.benefits.length > 0 && (
                        <div className="mb-6">
                          <h3 className="font-semibold text-gray-900 mb-2">Key Benefits:</h3>
                          <ul className="space-y-1">
                            {product.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start gap-2 text-gray-700">
                                <span className="text-primary mt-1">✓</span>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Stock Status */}
                      <div className="mb-6">
                        {product.inStock ? (
                          <p className="text-green-600 font-semibold">✓ In Stock ({product.stockQuantity} available)</p>
                        ) : (
                          <p className="text-red-600 font-semibold">✗ Out of Stock</p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="border-t pt-6 space-y-4">
                      {/* Quantity */}
                      <div className="flex items-center gap-4">
                        <label className="text-gray-900 font-semibold">Quantity:</label>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="w-16 text-center font-semibold">{quantity}</span>
                          <button
                            onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                            className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-4">
                        <button
                          onClick={handleAddToCart}
                          disabled={!product.inStock}
                          className="flex-1 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Add to Cart
                        </button>
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={onClose}
                          className="flex-1 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-lg transition-all text-center"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

