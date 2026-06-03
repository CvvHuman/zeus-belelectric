'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FaPlug, FaNetworkWired, FaBolt, FaHome, FaTools, FaRulerCombined } from 'react-icons/fa';

const icons = [
  FaPlug,              // розетка → электромонтаж под ключ
  FaNetworkWired,      // сеть → слаботочные системы
  FaBolt,              // молния → замена проводки
  FaHome,              // дом → сборка электрощитов
  FaTools,             // инструменты → диагностика и ремонт
  FaRulerCombined      // линейка/рулетка → консультация и замер
];

export default function ServicesList() {
  const t = useTranslations('Services');
  const services = t.raw('items') as Array<{ title: string; description: string }>;

  return (
    <section id="services" className="py-16 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
        >
          {t('title')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-slate-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-slate-700"
              >
                <div className="p-6">
                  <div className="text-yellow-500 text-4xl mb-4">
                    <IconComponent />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                  <p className="text-gray-300">{service.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}