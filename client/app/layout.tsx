import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'FARAS - Premium Fitness & Muscle Building Supplements',
  description: 'Build Strength. Fuel Performance. Premium supplements for fitness enthusiasts and athletes.',
  keywords: 'fitness supplements, protein, creatine, pre-workout, muscle building, strength training',
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

