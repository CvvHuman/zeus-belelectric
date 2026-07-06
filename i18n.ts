import { getRequestConfig } from 'next-intl/server';
import ruMessages from './messages/ru.json';
import enMessages from './messages/en.json';

export const locales = ['ru', 'en'] as const;
export const defaultLocale = 'ru';
export type Locale = typeof locales[number];

// Убираем явное указание Record<...> – TypeScript сам выведет правильный тип
const messagesMap = {
  ru: ruMessages,
  en: enMessages,
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = requested && locales.includes(requested as Locale)
    ? requested as Locale
    : defaultLocale;

  return {
    locale,
    messages: messagesMap[locale],
  };
});