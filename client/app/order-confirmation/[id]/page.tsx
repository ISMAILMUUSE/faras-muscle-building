'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ordersAPI } from '@/lib/api';

interface Order {
  _id: string;
  orderItems: any[];
  totalPrice: number;
  status: string;
  createdAt: string;
  shippingAddress: any;
}

export default function OrderConfirmationPage() {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      ordersAPI.getById(params.id as string)
        .then((res) => {
          setOrder(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-gray-400">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-dark">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-gray-400">Order not found</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="text-6xl mb-4">✓</div>
            <h1 className="text-4xl font-bold text-white mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-400">Thank you for your purchase</p>
          </motion.div>

          <div className="bg-dark-light rounded-lg p-8 border border-dark-lighter space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Order Details</h2>
              <p className="text-gray-400">Order ID: {order._id}</p>
              <p className="text-gray-400">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-400">Status: <span className="text-primary">{order.status}</span></p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Items</h3>
              <div className="space-y-2">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex justify-between text-gray-300">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-dark-lighter pt-4">
              <div className="flex justify-between text-xl font-bold text-white">
                <span>Total</span>
                <span>${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {order.shippingAddress && (
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Shipping Address</h3>
                <p className="text-gray-300">
                  {order.shippingAddress.street}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                  {order.shippingAddress.country}
                </p>
              </div>
            )}

            <div className="flex gap-4 pt-6">
              <Link
                href="/account"
                className="flex-1 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all text-center"
              >
                View Orders
              </Link>
              <Link
                href="/shop"
                className="flex-1 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-lg transition-all text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

