'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

// Расширяем глобальный интерфейс Window
declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
  }
}

// Компонент отслеживания переходов
function MetrikaTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Небольшая задержка, чтобы Next.js успел полностью обновить DOM перед отправкой хита
    const handleHit = () => {
      if (typeof window !== 'undefined' && window.ym) {
        const queryString = searchParams.toString();
        const url = pathname + (queryString ? `?${queryString}` : '');
        window.ym(112113946, 'hit', url);
      }
    };

    // Используем requestAnimationFrame или таймер, чтобы дать DOM обновиться
    const timer = setTimeout(handleHit, 100);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
}

export default function YandexMetrika() {
  return (
    <>
      <Suspense fallback={null}>
        <MetrikaTracking />
      </Suspense>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t),k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://yandex.ru", "ym");

          ym(112113946, "init", {
               clickmap:true,
               trackLinks:true,
               accurateTrackBounce:true,
               webvisor:true
          });
        `}
      </Script>
    </>
  );
}
