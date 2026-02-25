import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CodeSnippet {
  language: string;
  code: string;
}

const codeExamples: CodeSnippet[] = [
  {
    language: 'Telegram Bot',
    code: `// Прием заявок через Telegram-бот
bot.command('start', async (ctx) => {
  await ctx.reply(
    'Добро пожаловать! 👋\\n' +
    'Я помогу записаться на услугу.\\n\\n' +
    'Выберите удобное время:',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '📅 Сегодня 14:00', callback_data: 'book_today_14' }],
          [{ text: '📅 Завтра 10:00', callback_data: 'book_tomorrow_10' }],
          [{ text: '📞 Позвоните мне', callback_data: 'call_me' }]
        ]
      }
    }
  );
});

// Обработка записи
bot.on('callback_query', async (ctx) => {
  const customer = {
    name: ctx.from.first_name,
    telegram_id: ctx.from.id,
    booking: ctx.callbackQuery.data
  };
  
  // Создание сделки в CRM
  await createCRMLead(customer);
  
  // Уведомление администратора
  await notifyManager(customer);
  
  ctx.answerCbQuery('✅ Записали! Ждём вас');
});`,
  },
  {
    language: 'CRM Integration',
    code: `// Автоматическое создание сделки в AmoCRM
async function syncToCRM(customerData) {
  const lead = await amocrm.leads.create({
    name: \`Заявка от \${customerData.name}\`,
    price: customerData.service_price,
    custom_fields_values: [
      {
        field_id: 123456, // Telegram ID
        values: [{ value: customerData.telegram_id }]
      },
      {
        field_id: 123457, // Источник
        values: [{ value: 'Telegram Bot' }]
      }
    ],
    _embedded: {
      tags: [
        { name: 'telegram' },
        { name: 'горячий-лид' }
      ]
    }
  });

  // Добавление в воронку продаж
  await amocrm.leads.update(lead.id, {
    status_id: 142, // Статус "Новая заявка"
    responsible_user_id: getResponsibleManager()
  });

  // Отправка welcome-сообщения
  await sendWelcomeMessage(customerData);
  
  return lead.id;
}`,
  },
  {
    language: 'Auto-mailing',
    code: `// Персонализированные рассылки
async function sendSegmentedCampaign() {
  // Получение сегментов клиентов
  const vipClients = await getCustomers({ segment: 'VIP' });
  const regularClients = await getCustomers({ segment: 'Regular' });
  
  // VIP-клиенты: эксклюзивная акция
  for (const client of vipClients) {
    await telegram.sendMessage(client.chat_id, 
      \`\${client.name}, специально для вас! 🎁\\n\\n\` +
      \`Эксклюзивная скидка 30% на премиум-услуги.\\n\` +
      \`Действует до конца недели.\`,
      {
        reply_markup: {
          inline_keyboard: [[
            { text: '🎁 Активировать скидку', 
              callback_data: 'promo_vip30' }
          ]]
        }
      }
    );
  }
  
  // Обычные клиенты: стандартная акция
  for (const client of regularClients) {
    await telegram.sendMessage(client.chat_id,
      \`Привет, \${client.name}! 👋\\n\\n\` +
      \`Скидка 15% на любую услугу при записи сегодня.\`,
      {
        reply_markup: {
          inline_keyboard: [[
            { text: '📅 Записаться', 
              callback_data: 'book_now' }
          ]]
        }
      }
    );
  }
  
  console.log(\`Отправлено: \${vipClients.length + regularClients.length} сообщений\`);
}`,
  },
  {
    language: 'Analytics',
    code: `// Ежедневная аналитика в Google Sheets
import { google } from 'googleapis';

async function updateDailyAnalytics() {
  const today = new Date().toISOString().split('T')[0];
  
  // Сбор данных за день
  const stats = {
    newLeads: await countNewLeads(),
    convertedLeads: await countConvertedLeads(),
    revenue: await calculateRevenue(),
    avgCheck: await getAverageCheck(),
    activeClients: await countActiveClients()
  };
  
  // Запись в Google Sheets
  const sheets = google.sheets({ version: 'v4', auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Аналитика!A:F',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [[
        today,
        stats.newLeads,
        stats.convertedLeads,
        \`\${(stats.convertedLeads / stats.newLeads * 100).toFixed(1)}%\`,
        \`\${stats.revenue.toLocaleString('ru-RU')} ₽\`,
        \`\${stats.avgCheck.toLocaleString('ru-RU')} ₽\`
      ]]
    }
  });
  
  // Уведомление руководителю
  await notifyOwner(\`
📊 Отчёт за \${today}:\\n
📈 Новых заявок: \${stats.newLeads}\\n
✅ Конверсия: \${(stats.convertedLeads / stats.newLeads * 100).toFixed(1)}%\\n
💰 Выручка: \${stats.revenue.toLocaleString('ru-RU')} ₽\\n
🎯 Средний чек: \${stats.avgCheck.toLocaleString('ru-RU')} ₽
  \`);
}`,
  },
];

const CodeExample = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const codeContainerRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Прокрутка к началу кода при смене вкладки
  useEffect(() => {
    if (codeContainerRef.current) {
      codeContainerRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  return (
    <section className="py-20 border-t border-border">
      <div className="px-8 md:px-20 lg:px-40 xl:px-56">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-block px-6 py-0.5 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <span className="text-sm font-semibold text-primary">Готовые решения</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Автоматизация, которая работает из коробки
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Мы используем проверенные технологии и готовые модули для быстрого запуска вашей автоматизации. 
              Не нужно ждать недели разработки — система готова за 48 часов.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1 flex-shrink-0">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-foreground font-semibold mb-1">Готовые шаблоны</h4>
                  <p className="text-muted-foreground text-sm">Используем проверенные решения для вашей отрасли</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1 flex-shrink-0">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-foreground font-semibold mb-1">Быстрое внедрение</h4>
                  <p className="text-muted-foreground text-sm">Настройка и запуск автоматизации за 2 дня</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1 flex-shrink-0">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-foreground font-semibold mb-1">Полная поддержка</h4>
                  <p className="text-muted-foreground text-sm">Обучение команды и техническая поддержка 24/7</p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              asChild
            >
              <Link to="/contacts">
                Начать автоматизацию
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>

          {/* Right: Code Display */}
          <div className="relative">
            <div className="bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
              {/* Tabs */}
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary border-b border-border overflow-x-auto hide-scrollbar">
                {codeExamples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      activeTab === index
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    {example.language}
                  </button>
                ))}
              </div>

              {/* Code Content */}
              <div className="relative">
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={handleCopy}
                    className="p-2 bg-secondary hover:bg-accent border border-border rounded-lg transition-all"
                    title="Скопировать код"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>

                <div ref={codeContainerRef} className="p-6 max-h-[400px] overflow-y-auto hide-scrollbar">
                  <pre className="text-sm text-foreground leading-relaxed font-mono">
                    <code>{codeExamples[activeTab].code}</code>
                  </pre>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="px-6 py-3 bg-secondary border-t border-border">
                <p className="text-xs text-muted-foreground">
                  💡 Пример реального кода из наших проектов
                </p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeExample;

