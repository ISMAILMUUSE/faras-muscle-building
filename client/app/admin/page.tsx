'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStore } from '@/lib/store';
import { adminAPI, productsAPI } from '@/lib/api';
import toast from 'react-hot-toast';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

interface Order {
  _id: string;
  user: { name: string; email: string };
  totalPrice: number;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState<'stats' | 'products' | 'orders'>('stats');
  const [stats, setStats] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (user.role !== 'admin') {
      router.push('/');
      return;
    }

    loadData();
  }, [user, router]);

  const loadData = async () => {
    try {
      const [statsRes, productsRes, ordersRes] = await Promise.all([
        adminAPI.getStats(),
        productsAPI.getAll(),
        adminAPI.getAllOrders(),
      ]);
      setStats(statsRes.data);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await adminAPI.deleteProduct(id);
      toast.success('Product deleted');
      loadData();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleUpdateOrderStatus = async (id: string, status: string) => {
    try {
      await adminAPI.updateOrderStatus(id, status);
      toast.success('Order status updated');
      loadData();
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-dark-lighter">
            {['stats', 'products', 'orders'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-4 px-6 font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Stats Tab */}
          {activeTab === 'stats' && stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-dark-light rounded-lg p-6 border border-dark-lighter">
                <p className="text-gray-400 mb-2">Total Products</p>
                <p className="text-3xl font-bold text-white">{stats.totalProducts}</p>
              </div>
              <div className="bg-dark-light rounded-lg p-6 border border-dark-lighter">
                <p className="text-gray-400 mb-2">Total Orders</p>
                <p className="text-3xl font-bold text-white">{stats.totalOrders}</p>
              </div>
              <div className="bg-dark-light rounded-lg p-6 border border-dark-lighter">
                <p className="text-gray-400 mb-2">Total Users</p>
                <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
              </div>
              <div className="bg-dark-light rounded-lg p-6 border border-dark-lighter">
                <p className="text-gray-400 mb-2">Total Revenue</p>
                <p className="text-3xl font-bold text-white">${stats.totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Products</h2>
                <button
                  onClick={() => router.push('/admin/products/new')}
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg"
                >
                  Add Product
                </button>
              </div>
              <div className="bg-dark-light rounded-lg border border-dark-lighter overflow-hidden">
                <table className="w-full">
                  <thead className="bg-dark-lighter">
                    <tr>
                      <th className="px-6 py-3 text-left text-white font-semibold">Name</th>
                      <th className="px-6 py-3 text-left text-white font-semibold">Category</th>
                      <th className="px-6 py-3 text-left text-white font-semibold">Price</th>
                      <th className="px-6 py-3 text-left text-white font-semibold">Stock</th>
                      <th className="px-6 py-3 text-left text-white font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id} className="border-t border-dark-lighter">
                        <td className="px-6 py-4 text-white">{product.name}</td>
                        <td className="px-6 py-4 text-gray-400">{product.category}</td>
                        <td className="px-6 py-4 text-white">${product.price}</td>
                        <td className="px-6 py-4">
                          <span className={product.inStock ? 'text-primary' : 'text-red-500'}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="text-red-400 hover:text-red-300 font-semibold"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Orders</h2>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-dark-light rounded-lg p-6 border border-dark-lighter"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-white font-semibold">Order #{order._id.slice(-8)}</p>
                        <p className="text-gray-400 text-sm">{order.user?.name} ({order.user?.email})</p>
                        <p className="text-gray-400 text-sm">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-white">${order.totalPrice.toFixed(2)}</p>
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                          className="mt-2 px-3 py-1 bg-dark border border-dark-lighter rounded-lg text-white"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

