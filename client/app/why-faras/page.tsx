'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const reasons = [
  {
    title: 'Premium Quality Ingredients',
    description: 'We source only the highest quality ingredients from trusted suppliers. Every ingredient is tested for purity and potency before it goes into our products.',
    icon: '🌱',
  },
  {
    title: 'Science-Backed Formulas',
    description: 'Our products are formulated based on the latest scientific research. We don\'t use marketing hype—we use proven ingredients at effective dosages.',
    icon: '🔬',
  },
  {
    title: 'Third-Party Tested',
    description: 'All our supplements undergo rigorous third-party testing to ensure they meet our strict quality standards. You can trust what\'s on the label.',
    icon: '✅',
  },
  {
    title: 'Athlete Approved',
    description: 'Our products are trusted by professional athletes, fitness coaches, and serious fitness enthusiasts worldwide. Join the FARAS community.',
    icon: '💪',
  },
  {
    title: 'Transparent Labeling',
    description: 'We believe in complete transparency. Every ingredient is clearly listed, and we never use proprietary blends to hide dosages.',
    icon: '📋',
  },
  {
    title: 'Customer Satisfaction',
    description: 'Your satisfaction is our priority. We offer a money-back guarantee and are always here to help with any questions or concerns.',
    icon: '💯',
  },
];

export default function WhyFarasPage() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose FARAS?</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We're not just another supplement company. We're committed to excellence, 
              quality, and helping you achieve your fitness goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-light rounded-lg p-6 border border-dark-lighter hover:border-primary transition-all"
              >
                <div className="text-4xl mb-4">{reason.icon}</div>
                <h2 className="text-xl font-bold text-white mb-3">{reason.title}</h2>
                <p className="text-gray-400">{reason.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg p-8 border border-primary/30 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience the Difference?</h2>
            <p className="text-gray-300 mb-6 text-lg">
              Join thousands of satisfied customers who trust FARAS for their fitness journey.
            </p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

