'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CallbackModal({ isOpen, onClose }: CallbackModalProps) {
  const t = useTranslations('Callback');
  const [name, setName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Функция форматирования номера
  const formatPhone = (value: string) => {
    const cleaned = value.replace(/[^+\d]/g, '');
    if (!cleaned) return '';

    if (cleaned.startsWith('375')) {
      const digits = cleaned.slice(3).replace(/\D/g, '');
      const limited = digits.slice(0, 9);
      let formatted = '+375';
      if (limited.length > 0) {
        formatted += ` (${limited.slice(0, 2)}`;
        if (limited.length > 2) {
          formatted += `) ${limited.slice(2, 5)}`;
          if (limited.length > 5) {
            formatted += `-${limited.slice(5, 7)}`;
            if (limited.length > 7) {
              formatted += `-${limited.slice(7, 9)}`;
            }
          }
        }
      }
      return formatted;
    }

    if (!cleaned.startsWith('+')) {
      return `+${cleaned}`;
    }
    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatPhone(raw);
    setPhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const rawPhone = phone.replace(/[^\d+]/g, '');

    if (!name.trim() || !rawPhone) {
      alert(t('validationAlert'));
      return;
    }

    if (rawPhone.replace(/\D/g, '').length < 9) {
      alert(t('validationPhone'));
      return;
    }

    setLoading(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          patronymic: patronymic.trim(),
          phone: rawPhone,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('Server error:', res.status, text);
        setStatus('error');
        return;
      }

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setName('');
        setPatronymic('');
        setPhone('');
        setTimeout(() => {
          onClose();
          setStatus('idle');
        }, 2000);
      } else {
        console.error('API error:', data);
        setStatus('error');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-slate-800 rounded-2xl max-w-md w-full p-6 border border-slate-700 shadow-xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">{t('title')}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {status === 'success' ? (
              <div className="text-center py-6">
                <p className="text-green-400 text-lg">{t('successMessage')}</p>
                <p className="text-gray-300 mt-2">{t('successDesc')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {t('nameLabel')}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder={t('nameLabel')}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {t('patronymicLabel')}
                  </label>
                  <input
                    type="text"
                    value={patronymic}
                    onChange={(e) => setPatronymic(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder={t('patronymicLabel')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {t('phoneLabel')}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder={t('phonePlaceholder')}
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {t('phoneHint')}
                  </p>
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-sm">{t('errorMessage')}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? t('sending') : t('submitButton')}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}