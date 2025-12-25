'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const features = [
  {
    icon: '🔬',
    title: 'Science-Backed Formulas',
    description: 'Every product is formulated based on the latest research and proven ingredients.',
  },
  {
    icon: '✅',
    title: 'Third-Party Tested',
    description: 'All supplements undergo rigorous testing to ensure purity and potency.',
  },
  {
    icon: '💪',
    title: 'Athlete Approved',
    description: 'Trusted by professional athletes and fitness enthusiasts worldwide.',
  },
  {
    icon: '🌱',
    title: 'Premium Ingredients',
    description: 'We source only the highest quality ingredients from trusted suppliers.',
  },
  {
    icon: '📦',
    title: 'Fast Shipping',
    description: 'Get your supplements delivered quickly and securely to your door.',
  },
  {
    icon: '💯',
    title: '100% Satisfaction',
    description: 'Not satisfied? We offer a money-back guarantee on all products.',
  },
];

export default function WhyFaras() {
  return (
    <section className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Why Choose FARAS?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We're committed to helping you achieve your fitness goals with premium quality supplements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-dark-light rounded-lg p-6 border border-dark-lighter hover:border-primary transition-all"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/why-faras"
            className="inline-block px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-lg transition-all"
          >
            Learn More About FARAS
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

