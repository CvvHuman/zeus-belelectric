'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section id="home" className="relative overflow-hidden bg-[#030712] text-white py-28 md:py-44 flex items-center justify-center min-h-[85vh]">
      
      {/* 1. Инженерная 3D-картинка с выкрученным контрастом для сочности линий */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none select-none filter brightness-125 contrast-150 saturate-150">
        <Image 
          src="/blueprint.jpg" // Убедитесь, что расширение .jpg совпадает с вашим файлом в public
          alt="Инженерное проектирование электросетей"
          fill
          priority
          className="object-cover object-center scale-105"
        />
      </div>

      {/* 2. Радиальный градиент: выжигает серые участки по краям экрана и оставляет чистый темный фон */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(3,7,18,0.2)_0%,rgba(3,7,18,0.8)_50%,rgba(3,7,18,1)_90%)] z-0 pointer-events-none" />
      
      {/* 3. Линейный градиент: плавно уводит картинку в сплошной черный цвет к блоку ниже */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030712] z-0 pointer-events-none" />

      {/* 4. Неоновое свечение в тон линиям чертежа за текстом */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Контент */}
      <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">

        {/* Главный заголовок */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
        >
          {t('title')}
        </motion.h1>

        {/* Подзаголовок */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-4 font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        >
          {t('subtitle')}
        </motion.p>

        {/* Место работы (на прежнем месте) */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-yellow-400 font-bold mb-12 tracking-wider uppercase drop-shadow-[0_2px_5px_rgba(0,0,0,0.7)]"
        >
          {t('location')}
        </motion.p>

        {/* Кнопка */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <a
            href="#contact"
            className="inline-block bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-slate-950 font-bold text-lg py-4 px-12 rounded-xl shadow-[0_0_30px_rgba(234,179,8,0.25)] hover:shadow-[0_0_40px_rgba(234,179,8,0.45)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            {t('cta')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
