'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { formatKES } from '@/lib/utils';
import toast from 'react-hot-toast';

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  category: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useStore();

  const handleAddToCart = () => {
    if (product.inStock) {
      addToCart({
        product: product._id,
        name: product.name,
        image: product.images[0] || '',
        price: product.price,
        quantity: 1,
      });
      toast.success('Added to cart!');
    } else {
      toast.error('Product is out of stock');
    }
  };

  const getImageUrl = (path: string) => {
    if (path.startsWith('http')) return path;
    if (path.startsWith('/uploads')) return `http://localhost:5000${path}`;
    return path;
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all flex flex-col"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="aspect-square bg-gray-50 relative p-4">
          {product.images && product.images[0] ? (
            <img
              src={getImageUrl(product.images[0])}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-base font-semibold text-gray-900 mb-2 hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
        </Link>
        <div className="mb-4 mt-auto">
          <span className="text-lg font-bold text-gray-900">{formatKES(product.price)}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <Link
            href={`/products/${product.slug}`}
            className="px-4 py-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-primary hover:text-primary font-semibold rounded transition-all text-sm whitespace-nowrap"
          >
            View Product
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

