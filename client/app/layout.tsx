import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'FARAS NUTRITION - Premium Muscle Building Supplements',
  description: 'Fuel Your Strength. Build Your Power. Premium muscle building supplements.',
  keywords: 'fitness supplements, protein, creatine, pre-workout, muscle building, strength training, KES',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

