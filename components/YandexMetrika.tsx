'use client';

import Script from 'next/script';

export default function YandexMetrika() {
  return (
    <>
      <Script
        src="https://yandex.ru"
        strategy="afterInteractive"
      />
      <Script id="yandex-metrika-init" strategy="afterInteractive">
        {`
          window.ym = window.ym || function() {
            (window.ym.a = window.ym.a || []).push(arguments)
          };
          window.ym.l = 1 * new Date();

          ym(112113946, "init", {
               clickmap:true,
               trackLinks:true,
               accurateTrackBounce:true,
               webvisor:true,
               trackHash:true // Обязательно для одностраничников на Next.js
          });
        `}
      </Script>
    </>
  );
}
