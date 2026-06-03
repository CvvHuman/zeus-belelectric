'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section id="home" className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          {t('title')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-yellow-400 font-light mb-8"
        >
          {t('subtitle')}
        </motion.p>
        <motion.a
          href="#contact"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold py-3 px-8 rounded-full shadow-lg transition"
        >
          {t('cta')}
        </motion.a>
      </div>
    </section>
  );
}