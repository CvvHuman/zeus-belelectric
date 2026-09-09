'use client';

export default function YandexMetrika() {
  return (
    <>
      {/* Прямое жесткое подключение тега скрипта без оптимизаций Next.js */}
      <script
        async
        src="https://yandex.ru"
      />
      
      {/* Прямая инициализация */}
      <script
        id="yandex-metrika-init"
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
