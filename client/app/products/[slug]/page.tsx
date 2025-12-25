'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { productsAPI } from '@/lib/api';
import { useStore } from '@/lib/store';
import toast from 'react-hot-toast';

interface Product {
  _id: string;
  name: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  howToUse: string;
  warnings: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  numReviews: number;
}

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useStore();

  useEffect(() => {
    if (params.slug) {
      productsAPI.getBySlug(params.slug as string)
        .then((res) => {
          setProduct(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [params.slug]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-dark">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-gray-400">Loading product...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-dark">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-gray-400">Product not found</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="aspect-square bg-dark-light rounded-lg overflow-hidden mb-4 border border-dark-lighter">
                {product.images && product.images[selectedImage] ? (
                  <img
                    src={product.images[selectedImage].startsWith('http') ? product.images[selectedImage] : `http://localhost:5000${product.images[selectedImage]}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-primary' : 'border-dark-lighter'
                      }`}
                    >
                      <img
                        src={img.startsWith('http') ? img : `http://localhost:5000${img}`}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <p className="text-primary font-semibold mb-2">{product.category}</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-xl ${i < Math.floor(product.rating) ? 'text-primary' : 'text-gray-600'}`}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-400">({product.numReviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-white">${product.price}</span>
                {product.comparePrice && (
                  <>
                    <span className="text-2xl text-gray-500 line-through">${product.comparePrice}</span>
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Save {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-6 text-lg">{product.description}</p>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <p className="text-primary font-semibold">✓ In Stock ({product.stockQuantity} available)</p>
                ) : (
                  <p className="text-red-500 font-semibold">✗ Out of Stock</p>
                )}
              </div>

              {/* Quantity & Add to Cart */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <label className="text-white font-semibold">Quantity:</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-dark-light border border-dark-lighter rounded-lg text-white hover:bg-dark-lighter"
                    >
                      -
                    </button>
                    <span className="w-16 text-center text-white font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                      className="w-10 h-10 bg-dark-light border border-dark-lighter rounded-lg text-white hover:bg-dark-lighter"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>

              {/* Disclaimer */}
              <div className="bg-dark-light border border-yellow-500/30 rounded-lg p-4 mb-8">
                <p className="text-yellow-400 text-sm">
                  ⚠️ These products are not intended to diagnose, treat, cure, or prevent any disease. 
                  Always consult a healthcare professional before use.
                </p>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <div className="border-b border-dark-lighter mb-8">
              <div className="flex gap-8">
                <button className="pb-4 border-b-2 border-primary text-primary font-semibold">
                  Benefits
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Benefits */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Benefits</h2>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ingredients */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-gray-300">• {ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* How to Use */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-4">How to Use</h2>
              <p className="text-gray-300 text-lg">{product.howToUse}</p>
            </div>

            {/* Warnings */}
            <div className="mt-12 bg-dark-light border border-red-500/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Warnings</h2>
              <p className="text-gray-300">{product.warnings}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

