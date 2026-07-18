import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'ORA Dental Studio — Luxury Dental Care',
  description: 'A premium, modern dental experience. Expert doctors, clean aesthetics, and advanced technology. Book your appointment at ORA Dental Studio.',
  keywords: 'dental clinic, luxury dentist, premium dental care, ORA dental',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
