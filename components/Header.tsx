'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes, FaBolt } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('Header');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Логотип с молнией */}
        <Link 
          href="/" 
          className="flex items-center gap-2 text-2xl font-bold text-yellow-500 hover:text-yellow-400 transition"
        >
          <FaBolt className="text-yellow-500" />
          <span>ZEUS</span>
          <span className="text-sm text-gray-400 font-normal hidden sm:inline">| belelectric</span>
        </Link>

        {/* Десктопное меню */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link 
            href="#home" 
            className="text-gray-300 hover:text-yellow-500 transition font-medium"
          >
            {t('home')}
          </Link>
          <Link 
            href="#services" 
            className="text-gray-300 hover:text-yellow-500 transition font-medium"
          >
            {t('services')}
          </Link>
          <Link 
            href="#contact" 
            className="text-gray-300 hover:text-yellow-500 transition font-medium"
          >
            {t('contact')}
          </Link>
          <LanguageSwitcher />
        </nav>

        {/* Мобильная кнопка меню */}
        <button
          className="md:hidden text-2xl text-gray-300 hover:text-yellow-500 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Мобильное меню */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-700 py-4 px-4 flex flex-col space-y-3">
          <Link 
            href="#home" 
            onClick={() => setIsOpen(false)} 
            className="text-gray-300 hover:text-yellow-500 transition py-2"
          >
            {t('home')}
          </Link>
          <Link 
            href="#services" 
            onClick={() => setIsOpen(false)} 
            className="text-gray-300 hover:text-yellow-500 transition py-2"
          >
            {t('services')}
          </Link>
          <Link 
            href="#contact" 
            onClick={() => setIsOpen(false)} 
            className="text-gray-300 hover:text-yellow-500 transition py-2"
          >
            {t('contact')}
          </Link>
          <div className="pt-2">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}