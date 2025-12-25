'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStore } from '@/lib/store';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal, clearCart } = useStore();
  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-dark">
        <Navbar />
        <main className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Your Cart is Empty</h1>
            <p className="text-gray-400 mb-8">Start adding products to your cart!</p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <motion.div
                  key={item.product}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-dark-light rounded-lg p-6 border border-dark-lighter flex gap-6"
                >
                  <div className="w-24 h-24 bg-dark-lighter rounded-lg overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <img
                        src={item.image.startsWith('http') ? item.image : `http://localhost:5000${item.image}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
                    <p className="text-xl font-bold text-primary mb-4">${item.price}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartQuantity(item.product, item.quantity - 1)}
                          className="w-8 h-8 bg-dark border border-dark-lighter rounded-lg text-white hover:bg-dark-lighter"
                        >
                          -
                        </button>
                        <span className="w-12 text-center text-white font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product, item.quantity + 1)}
                          className="w-8 h-8 bg-dark border border-dark-lighter rounded-lg text-white hover:bg-dark-lighter"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          removeFromCart(item.product);
                          toast.success('Removed from cart');
                        }}
                        className="text-red-400 hover:text-red-300 font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-white">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </motion.div>
              ))}
              <button
                onClick={() => {
                  clearCart();
                  toast.success('Cart cleared');
                }}
                className="text-red-400 hover:text-red-300 font-semibold"
              >
                Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-dark-light rounded-lg p-6 border border-dark-lighter sticky top-24">
                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-dark-lighter pt-4 flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                {subtotal < 100 && (
                  <p className="text-primary text-sm mb-6">
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
                <Link
                  href="/checkout"
                  className="block w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all text-center"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/shop"
                  className="block w-full py-3 mt-4 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-lg transition-all text-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

