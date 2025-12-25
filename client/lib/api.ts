import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data: any) => api.put('/auth/profile', data),
};

// Products API
export const productsAPI = {
  getAll: (params?: any) => api.get('/products', { params }),
  getBySlug: (slug: string) => api.get(`/products/${slug}`),
};

// Orders API
export const ordersAPI = {
  create: (data: any) => api.post('/orders', data),
  getAll: () => api.get('/orders'),
  getById: (id: string) => api.get(`/orders/${id}`),
  updatePayment: (id: string, data: any) => api.post(`/orders/${id}/pay`, data),
};

// Blog API
export const blogAPI = {
  getAll: (params?: any) => api.get('/blog', { params }),
  getBySlug: (slug: string) => api.get(`/blog/${slug}`),
};

// Stripe API
export const stripeAPI = {
  createPaymentIntent: (data: { amount: number; orderId: string }) =>
    api.post('/stripe/create-payment-intent', data),
};

// Admin API
export const adminAPI = {
  // Products
  createProduct: (data: FormData) =>
    api.post('/admin/products', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  updateProduct: (id: string, data: FormData) =>
    api.put(`/admin/products/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  deleteProduct: (id: string) => api.delete(`/admin/products/${id}`),
  
  // Orders
  getAllOrders: () => api.get('/admin/orders'),
  updateOrderStatus: (id: string, status: string) =>
    api.put(`/admin/orders/${id}/status`, { status }),
  
  // Blog
  createPost: (data: FormData) =>
    api.post('/admin/blog', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  updatePost: (id: string, data: FormData) =>
    api.put(`/admin/blog/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  deletePost: (id: string) => api.delete(`/admin/blog/${id}`),
  
  // Stats
  getStats: () => api.get('/admin/stats'),
};

export default api;

