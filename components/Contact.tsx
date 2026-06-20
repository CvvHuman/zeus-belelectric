'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaTelegram, FaInstagram, FaPhoneAlt } from 'react-icons/fa';

export default function Contact() {
  const t = useTranslations('Contact');
  const phone = t('phone');
  const phone2 = t('phone2');
  const instagramUrl = t('instagramUrl');

  return (
    <section id="contact" className="py-16 bg-slate-900">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 border border-slate-700"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            {t('description')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <a
              href={`https://wa.me/${phone2.replace(/[^0-9+]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition"
            >
              <FaWhatsapp size={20} />
              {t('whatsapp')}
            </a>
            <a
              href={`https://t.me/${phone.replace(/[^0-9+]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition"
            >
              <FaTelegram size={20} />
              {t('telegram')}
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition"
            >
              <FaInstagram size={20} />
              {t('instagram')}
            </a>
            <a
              href={`tel:${phone2}`}
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold py-3 px-6 rounded-full shadow-lg transition"
            >
              <FaPhoneAlt size={20} />
              {t('call')}
            </a>
          </div>
          
          <p className="text-gray-400 text-sm">
            📞 {phone}
          </p>

          <p className="text-gray-400 text-sm">
            📞 {phone2}
          </p>
        </motion.div>

      </div>
    </section>
  );
}