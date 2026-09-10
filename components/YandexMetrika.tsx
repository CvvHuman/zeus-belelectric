'use client';

import Script from 'next/script';

export default function YandexMetrika() {
  return (
    <>
      {/* Загрузка основного скрипта Метрики */}
      <Script
        async
        src="https://mc.yandex.ru/metrika/tag.js"
        strategy="afterInteractive"
      />
      
      {/* Инициализация счетчика */}
      <Script
        id="yandex-metrika-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.ym = window.ym || function() {
              (window.ym.a = window.ym.a || []).push(arguments)
            };
            window.ym.l = 1 * new Date();

            ym(112113946, "init", {
                 clickmap:true,
                 trackLinks:true,
                 accurateTrackBounce:true,
                 webvisor:true
            });
          `,
        }}
      />
      
      <noscript>
        <div>
          <img 
            src="https://yandex.ru" 
            style={{ position: 'absolute', left: '-9999px' }} 
            alt="" 
          />
        </div>
      </noscript>
    </>
  );
}
