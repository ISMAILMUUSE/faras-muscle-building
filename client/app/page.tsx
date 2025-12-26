import Link from 'next/link';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import TrustedIngredients from '@/components/home/TrustedIngredients';
import Testimonials from '@/components/home/Testimonials';

export const metadata: Metadata = {
  title: 'FARAS NUTRITION - Fuel Your Strength. Build Your Power.',
  description: 'Premium muscle building supplements. Fuel Your Strength. Build Your Power.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
        <TrustedIngredients />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

