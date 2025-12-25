import Link from 'next/link';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import WhyFaras from '@/components/home/WhyFaras';
import TrustedIngredients from '@/components/home/TrustedIngredients';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';

export const metadata: Metadata = {
  title: 'FARAS - Build Strength. Fuel Performance.',
  description: 'Premium fitness and muscle building supplements. Trusted by athletes worldwide.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
        <WhyFaras />
        <TrustedIngredients />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

