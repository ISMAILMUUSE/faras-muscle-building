'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStore } from '@/lib/store';
import { ordersAPI, authAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

interface Order {
  _id: string;
  orderItems: any[];
  totalPrice: number;
  status: string;
  createdAt: string;
  isPaid: boolean;
  isDelivered: boolean;
}

export default function AccountPage() {
  const router = useRouter();
  const { user, setUser } = useStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    setProfileData({
      name: user.name,
      email: user.email,
      phone: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
      },
    });

    ordersAPI.getAll()
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user, router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await authAPI.updateProfile(profileData);
      setUser(res.data);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-8">My Account</h1>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-dark-lighter">
            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-4 px-6 font-semibold transition-colors ${
                activeTab === 'profile'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-4 px-6 font-semibold transition-colors ${
                activeTab === 'orders'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Order History
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-light rounded-lg p-8 border border-dark-lighter max-w-2xl"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Address</label>
                  <input
                    type="text"
                    placeholder="Street"
                    value={profileData.address.street}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      address: { ...profileData.address, street: e.target.value },
                    })}
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg text-white focus:outline-none focus:border-primary mb-2"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="City"
                      value={profileData.address.city}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        address: { ...profileData.address, city: e.target.value },
                      })}
                      className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg text-white focus:outline-none focus:border-primary"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={profileData.address.state}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        address: { ...profileData.address, state: e.target.value },
                      })}
                      className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all"
                >
                  Update Profile
                </button>
              </form>
            </motion.div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {loading ? (
                <div className="text-gray-400">Loading orders...</div>
              ) : orders.length === 0 ? (
                <div className="text-gray-400">No orders yet.</div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="bg-dark-light rounded-lg p-6 border border-dark-lighter"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-white font-semibold">Order #{order._id.slice(-8)}</p>
                          <p className="text-gray-400 text-sm">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-white">${order.totalPrice.toFixed(2)}</p>
                          <p className={`text-sm ${
                            order.status === 'delivered' ? 'text-primary' :
                            order.status === 'cancelled' ? 'text-red-500' :
                            'text-yellow-500'
                          }`}>
                            {order.status}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{order.orderItems.length} item(s)</span>
                        {order.isPaid && <span className="text-primary">✓ Paid</span>}
                        {order.isDelivered && <span className="text-primary">✓ Delivered</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

