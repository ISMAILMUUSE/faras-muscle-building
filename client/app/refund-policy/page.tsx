'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Refund Policy</h1>
            <div className="text-gray-300 space-y-6 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">30-Day Money-Back Guarantee</h2>
                <p>
                  We stand behind the quality of our products. If you're not completely satisfied with your 
                  purchase, you may return unopened products within 30 days of delivery for a full refund.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Return Conditions</h2>
                <p>To be eligible for a refund, products must:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Be in their original, unopened packaging</li>
                  <li>Be returned within 30 days of delivery</li>
                  <li>Include the original receipt or order confirmation</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Return Process</h2>
                <ol className="list-decimal list-inside ml-4 space-y-2">
                  <li>Contact our customer service team at support@faras.com to initiate a return</li>
                  <li>Receive a Return Authorization (RA) number</li>
                  <li>Package the product securely with the RA number clearly visible</li>
                  <li>Ship the product back to us using a trackable shipping method</li>
                  <li>Once we receive and inspect the product, we'll process your refund</li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Refund Processing</h2>
                <p>
                  Refunds will be processed to the original payment method within 5-10 business days after 
                  we receive and inspect the returned product. Shipping costs are non-refundable unless the 
                  return is due to our error.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Damaged or Defective Products</h2>
                <p>
                  If you receive a damaged or defective product, please contact us immediately. We will 
                  arrange for a replacement or full refund, including return shipping costs.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Non-Refundable Items</h2>
                <p>
                  The following items are not eligible for return or refund:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Opened or used products</li>
                  <li>Products returned after 30 days</li>
                  <li>Products without original packaging</li>
                  <li>Digital products or downloadable content</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                <p>
                  If you have any questions about our refund policy, please contact us at support@faras.com 
                  or call 1-800-FARAS-01.
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

