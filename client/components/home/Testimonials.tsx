'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Alex Johnson',
    role: 'Professional Bodybuilder',
    image: '👤',
    rating: 5,
    text: 'FARAS supplements have been a game-changer for my training. The quality is unmatched, and I\'ve seen incredible results.',
  },
  {
    name: 'Sarah Martinez',
    role: 'Fitness Coach',
    image: '👤',
    rating: 5,
    text: 'I recommend FARAS to all my clients. The products are clean, effective, and the customer service is outstanding.',
  },
  {
    name: 'Mike Chen',
    role: 'Powerlifter',
    image: '👤',
    rating: 5,
    text: 'Best supplements I\'ve ever used. The pre-workout gives me insane energy, and the protein mixes perfectly.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust FARAS for their fitness journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                  {testimonial.image}
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

