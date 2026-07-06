import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('📥 Получены данные:', body);

    const { name, patronymic, phone } = body;

    if (!name || !phone) {
      console.warn('⚠️ Не заполнены обязательные поля');
      return NextResponse.json(
        { error: 'Имя и телефон обязательны' },
        { status: 400 }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    console.log('🔐 TELEGRAM_BOT_TOKEN:', token ? '✅ установлен' : '❌ отсутствует');
    console.log('🔐 TELEGRAM_CHAT_ID:', chatId ? '✅ установлен' : '❌ отсутствует');

    if (!token || !chatId) {
      console.error('❌ Переменные окружения не заданы');
      return NextResponse.json(
        { error: 'Ошибка конфигурации сервера' },
        { status: 500 }
      );
    }

    const message = `
🔔 *Новая заявка на звонок!*

👤 *Имя:* ${name}
👨‍💼 *Отчество:* ${patronymic || 'не указано'}
📞 *Телефон:* ${phone}
    `;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    console.log('📤 Отправка в Telegram...');

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const data = await response.json();
    console.log('📩 Ответ Telegram:', data);

    if (!response.ok) {
      console.error('❌ Ошибка Telegram API:', data);
      return NextResponse.json(
        { error: `Ошибка Telegram: ${data.description || 'неизвестная'}` },
        { status: 500 }
      );
    }

    console.log('✅ Заявка отправлена в Telegram');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Ошибка в /api/callback:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}