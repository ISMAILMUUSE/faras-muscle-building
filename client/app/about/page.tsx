'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About FARAS</h1>
            <p className="text-xl text-gray-600">Building strength, fueling performance</p>
          </motion.div>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-50 rounded-lg p-8 border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg">
                At FARAS, we believe that everyone deserves access to premium-quality supplements 
                that support their fitness journey. Our mission is to provide athletes, fitness 
                enthusiasts, and anyone committed to their health with science-backed supplements 
                that deliver real results.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 rounded-lg p-8 border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong className="text-gray-900">Science-Backed:</strong> Every product is formulated based on the latest research and proven ingredients.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong className="text-gray-900">Quality First:</strong> We never compromise on purity, potency, or quality.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong className="text-gray-900">Transparency:</strong> We believe in complete transparency about our ingredients and processes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong className="text-gray-900">Athlete Focused:</strong> Designed by athletes, for athletes.</span>
                </li>
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 rounded-lg p-8 border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
              <p className="text-lg">
                We're committed to helping you achieve your fitness goals. Whether you're just 
                starting your fitness journey or you're a seasoned athlete, FARAS is here to support 
                you every step of the way. We stand behind every product with our satisfaction 
                guarantee and are always here to answer your questions.
              </p>
            </motion.section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

