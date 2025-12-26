'use client';

import { motion } from 'framer-motion';

const ingredients = [
  'Whey Protein Isolate',
  'Creatine Monohydrate',
  'BCAAs',
  'Beta-Alanine',
  'Citrulline Malate',
  'L-Glutamine',
  'Magnesium',
  'Zinc',
];

export default function TrustedIngredients() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Trusted Ingredients
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We use only the highest quality, research-backed ingredients in every product
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={ingredient}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-lg p-6 text-center border border-gray-200 hover:border-primary transition-all shadow-sm"
            >
              <div className="text-primary text-3xl mb-3">✓</div>
              <p className="text-gray-900 font-semibold">{ingredient}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 bg-white rounded-lg p-8 border border-primary/30 shadow-sm"
        >
          <p className="text-center text-gray-700 text-lg">
            <span className="text-primary font-semibold">Quality First:</span> Every ingredient is 
            carefully selected and tested to meet our strict quality standards. We never compromise 
            on purity or potency.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

