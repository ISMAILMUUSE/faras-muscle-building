'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Shipping Policy</h1>
            <div className="text-gray-300 space-y-6 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Shipping Methods</h2>
                <p>
                  We offer several shipping options to meet your needs:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong>Standard Shipping:</strong> 5-7 business days - $10 (Free on orders over $100)</li>
                  <li><strong>Expedited Shipping:</strong> 2-3 business days - $20</li>
                  <li><strong>Overnight Shipping:</strong> Next business day - $35</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Processing Time</h2>
                <p>
                  Orders are typically processed within 1-2 business days. Orders placed on weekends 
                  or holidays will be processed on the next business day. You will receive a shipping 
                  confirmation email with tracking information once your order has shipped.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Shipping Locations</h2>
                <p>
                  We currently ship within the United States. We're working on expanding our shipping 
                  to international locations. Sign up for our newsletter to be notified when international 
                  shipping becomes available.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Shipping Address</h2>
                <p>
                  Please ensure your shipping address is correct at checkout. We are not responsible for 
                  orders shipped to incorrect addresses provided by the customer. If you need to change 
                  your shipping address, contact us immediately after placing your order.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Order Tracking</h2>
                <p>
                  Once your order ships, you'll receive a tracking number via email. You can use this 
                  number to track your package on the carrier's website. If you have any questions about 
                  your shipment, please contact our customer service team.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Delayed Shipments</h2>
                <p>
                  While we strive to deliver orders on time, delays may occur due to weather, carrier 
                  issues, or other factors beyond our control. We will notify you if there are any 
                  significant delays with your order.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Lost or Damaged Packages</h2>
                <p>
                  If your package is lost or damaged during shipping, please contact us immediately. 
                  We will work with the carrier to resolve the issue and ensure you receive your order 
                  or a full refund.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                <p>
                  If you have any questions about shipping, please contact us at support@faras.com or 
                  call 1-800-FARAS-01.
                </p>
              </section>

              <p className="text-gray-400 text-sm mt-8">
                Last Updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

