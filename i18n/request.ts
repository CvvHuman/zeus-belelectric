// i18n/request.ts
import { getRequestConfig } from 'next-intl/server';

export const locales = ['ru', 'en'] as const;
export const defaultLocale = 'ru';

export default getRequestConfig(async ({ locale }) => {
  // Подставляем дефолтную локаль, если почему-то не пришла своя
  const resolvedLocale = locale ?? defaultLocale;
  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default
  };
});