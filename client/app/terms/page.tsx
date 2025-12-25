'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms & Conditions</h1>
            <div className="text-gray-300 space-y-6 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using the FARAS website, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to these terms, please do not use 
                  our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
                <p>
                  Permission is granted to temporarily download one copy of the materials on FARAS's website 
                  for personal, non-commercial transitory viewing only. This is the grant of a license, not 
                  a transfer of title.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Product Information</h2>
                <p>
                  We strive to provide accurate product information, including descriptions, images, and 
                  pricing. However, we do not warrant that product descriptions or other content on this site 
                  is accurate, complete, reliable, current, or error-free.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Pricing</h2>
                <p>
                  All prices are in USD and are subject to change without notice. We reserve the right to 
                  modify prices at any time. Prices do not include shipping and handling charges unless 
                  otherwise stated.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Orders</h2>
                <p>
                  When you place an order, you are making an offer to purchase products at the prices stated. 
                  We reserve the right to accept or reject any order. If we reject an order, we will notify 
                  you and refund any payment made.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Payment</h2>
                <p>
                  Payment must be received before we ship your order. We accept major credit cards and other 
                  payment methods as indicated on our website. All payments are processed securely through 
                  our payment processor.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Disclaimer</h2>
                <p>
                  The materials on FARAS's website are provided on an 'as is' basis. FARAS makes no warranties, 
                  expressed or implied, and hereby disclaims and negates all other warranties including, without 
                  limitation, implied warranties or conditions of merchantability, fitness for a particular 
                  purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Limitations</h2>
                <p>
                  In no event shall FARAS or its suppliers be liable for any damages (including, without 
                  limitation, damages for loss of data or profit, or due to business interruption) arising 
                  out of the use or inability to use the materials on FARAS's website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Revisions</h2>
                <p>
                  FARAS may revise these terms of service at any time without notice. By using this website, 
                  you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Contact Information</h2>
                <p>
                  If you have any questions about these Terms & Conditions, please contact us at 
                  support@faras.com.
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

