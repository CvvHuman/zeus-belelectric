'use client';

import { useTranslations } from 'next-intl';
import { FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-gray-400 py-8 border-t border-slate-800">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">{t('rights')}</p>
        <div className="flex justify-center gap-6 mt-4">
          <a
            href="https://www.instagram.com/zeus.belelectric"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-500 transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram size={24} />
          </a>
        </div>
        <p className="text-xs mt-4">⚡ {t('social')}</p>
      </div>
    </footer>
  );
}