'use client';

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStore } from '@/lib/store';
import { ordersAPI, stripeAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

function CheckoutForm() {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const { cart, getCartTotal, clearCart } = useStore();
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) return;

    const token = Cookies.get('token');
    if (!token) {
      toast.error('Please login to checkout');
      router.push('/login');
      return;
    }

    setLoading(true);

    try {
      // Create order
      const orderRes = await ordersAPI.create({
        orderItems: cart,
        shippingAddress,
        paymentMethod: 'stripe',
      });

      // Create payment intent
      const paymentRes = await stripeAPI.createPaymentIntent({
        amount: total,
        orderId: orderRes.data._id,
      });

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        paymentRes.data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        }
      );

      if (error) {
        toast.error(error.message || 'Payment failed');
        setLoading(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // Update order
        await ordersAPI.updatePayment(orderRes.data._id, {
          paymentResult: {
            id: paymentIntent.id,
            status: paymentIntent.status,
            update_time: new Date().toISOString(),
          },
        });

        clearCart();
        toast.success('Order placed successfully!');
        router.push(`/order-confirmation/${orderRes.data._id}`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-dark-light rounded-lg p-6 border border-dark-lighter">
        <h2 className="text-xl font-bold text-white mb-4">Shipping Address</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Street Address"
            required
            value={shippingAddress.street}
            onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
            className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg text-white focus:outline-none focus:border-primary"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              required
              value={shippingAddress.city}
              onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
              className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg text-white focus:outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="State"
              required
              value={shippingAddress.state}
              onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
              className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg text-white focus:outline-none focus:border-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="ZIP Code"
              required
              value={shippingAddress.zipCode}
              onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
              className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg text-white focus:outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="Country"
              required
              value={shippingAddress.country}
              onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
              className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg text-white focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      <div className="bg-dark-light rounded-lg p-6 border border-dark-lighter">
        <h2 className="text-xl font-bold text-white mb-4">Payment Information</h2>
        <div className="bg-dark p-4 rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#ffffff',
                  '::placeholder': {
                    color: '#9ca3af',
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-dark-light rounded-lg p-6 border border-dark-lighter">
        <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
        <div className="space-y-2 mb-4">
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
          <div className="border-t border-dark-lighter pt-2 flex justify-between text-xl font-bold text-white">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
}

export default function CheckoutPage() {
  const { cart } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/cart');
    }
  }, [cart, router]);

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-8">Checkout</h1>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </main>
      <Footer />
    </div>
  );
}

