'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-8">Privacy Policy</h1>
            <div className="text-black space-y-6 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">1. Information We Collect</h2>
                <p>
                  We collect information that you provide directly to us, including when you create an account, 
                  make a purchase, subscribe to our newsletter, or contact us. This may include your name, email 
                  address, shipping address, phone number, and payment information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">2. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Process and fulfill your orders</li>
                  <li>Send you order confirmations and updates</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">3. Information Sharing</h2>
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share 
                  your information with service providers who assist us in operating our website and conducting 
                  our business, as long as they agree to keep this information confidential.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">4. Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your personal information. However, 
                  no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute 
                  security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">5. Your Rights</h2>
                <p>
                  You have the right to access, update, or delete your personal information at any time. 
                  You can also opt-out of marketing communications by clicking the unsubscribe link in our emails.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">6. Cookies</h2>
                <p>
                  We use cookies to enhance your experience on our website. You can choose to disable cookies 
                  through your browser settings, though this may affect website functionality.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">7. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by 
                  posting the new policy on this page and updating the "Last Updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">8. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at support@faras.com.
                </p>
              </section>

              <p className="text-gray-600 text-sm mt-8">
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

