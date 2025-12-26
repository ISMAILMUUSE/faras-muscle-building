'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const faqs = [
  {
    question: 'What makes FARAS supplements different?',
    answer: 'FARAS supplements are formulated with science-backed ingredients at effective dosages. We use only premium quality ingredients and third-party test all our products for purity and potency. We believe in complete transparency and never use proprietary blends to hide dosages.',
  },
  {
    question: 'Are FARAS supplements safe?',
    answer: 'Yes, all FARAS supplements are manufactured in FDA-registered facilities and undergo rigorous third-party testing. However, we always recommend consulting with a healthcare professional before starting any new supplement regimen, especially if you have pre-existing medical conditions or are taking medications.',
  },
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping typically takes 5-7 business days. We also offer expedited shipping options at checkout. Orders over $100 qualify for free standard shipping.',
  },
  {
    question: 'Can I return products if I\'m not satisfied?',
    answer: 'Yes, we offer a 30-day money-back guarantee on all unopened products. If you\'re not satisfied with your purchase, contact our customer service team for a return authorization.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Currently, we ship within the United States. We\'re working on expanding our shipping to international locations. Sign up for our newsletter to be notified when international shipping becomes available.',
  },
  {
    question: 'How should I store my supplements?',
    answer: 'Store all supplements in a cool, dry place away from direct sunlight. Keep containers tightly closed and out of reach of children. Most products have a shelf life of 2-3 years when stored properly.',
  },
  {
    question: 'Can I stack multiple supplements?',
    answer: 'Yes, many of our supplements are designed to work well together. For example, you can combine our pre-workout with creatine, and use protein and BCAAs for recovery. However, we recommend starting with one product at a time to assess how your body responds. Always consult a healthcare professional if you have concerns.',
  },
  {
    question: 'Are your products suitable for vegetarians/vegans?',
    answer: 'Some of our products are suitable for vegetarians and vegans. Check the product label and description for specific dietary information. Our plant-based protein options are clearly marked.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600">Find answers to common questions about FARAS supplements</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 text-gray-700 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-gray-50 rounded-lg p-8 border border-primary/20 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
            <p className="text-gray-700 mb-6">
              Our customer service team is here to help. Contact us and we'll get back to you as soon as possible.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

