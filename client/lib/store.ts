'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Store {
  cart: CartItem[];
  user: User | null;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setUser: (user: User | null) => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      cart: [],
      user: null,
      
      addToCart: (item) => {
        const cart = get().cart;
        const existingItem = cart.find((i) => i.product === item.product);
        
        if (existingItem) {
          set({
            cart: cart.map((i) =>
              i.product === item.product
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ cart: [...cart, item] });
        }
      },
      
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((i) => i.product !== productId) });
      },
      
      updateCartQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
        } else {
          set({
            cart: get().cart.map((i) =>
              i.product === productId ? { ...i, quantity } : i
            ),
          });
        }
      },
      
      clearCart: () => set({ cart: [] }),
      
      setUser: (user) => set({ user }),
      
      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      
      getCartItemCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'faras-store',
    }
  )
);

