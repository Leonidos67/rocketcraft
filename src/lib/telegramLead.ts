const TELEGRAM_BOT_TOKEN = '8691731821:AAHLKtCL3K3YjlU9_i0Uy8ofJE_k2aiJLhg';
const TELEGRAM_CHAT_ID = '-5112335677';

export const sendTelegramLead = async (text: string) => {
  const response = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      (errorData as { description?: string }).description || 'Не удалось отправить заявку'
    );
  }

  return response.json();
};

const withTimestamp = (title: string) =>
  `\n\n${title}\n⏰ Время отправки: ${new Date().toLocaleString('ru-RU')}\n\n`;

export const formatHeaderLeadMessage = (data: {
  name: string;
  phone: string;
  serviceLabel: string;
  saasExample?: {
    id: string;
    title: string;
    brand?: string;
  };
}) => {
  let message = withTimestamp('📋 НОВАЯ ЗАЯВКА (шапка):');
  message += `Имя: ${data.name}\n`;
  message += `Телефон: ${data.phone}\n`;
  message += `Услуга: ${data.serviceLabel}\n`;
  if (data.saasExample) {
    const productName = [data.saasExample.brand, data.saasExample.title]
      .filter(Boolean)
      .join(' ');
    message += `\n💻 Пример SaaS: ${productName || data.saasExample.title}`;
    message += `\n🆔 ID продукта: ${data.saasExample.id}`;
    message += `\n🔗 Страница: /product-preview/${data.saasExample.id}\n`;
  }
  return message;
};

const CONTACT_BUSINESS_LABELS: Record<string, string> = {
  cafe: 'Кафе и рестораны',
  barber: 'Барбершопы и салоны',
  fitness: 'Фитнес и спорт',
  studio: 'Студии услуг',
  retail: 'Розничная торговля',
  other: 'Другое',
};

export const formatContactSectionMessage = (data: {
  name: string;
  phone: string;
  telegram?: string;
  businessType?: string;
  comment?: string;
}) => {
  let message = withTimestamp('📋 НОВАЯ ЗАЯВКА (контакты):');
  message += `Имя: ${data.name}\n`;
  message += `Телефон: ${data.phone}\n`;
  if (data.telegram?.trim()) {
    message += `Telegram: ${data.telegram.trim()}\n`;
  }
  if (data.businessType) {
    message += `Тип бизнеса: ${CONTACT_BUSINESS_LABELS[data.businessType] || data.businessType}\n`;
  }
  if (data.comment?.trim()) {
    message += `Комментарий: ${data.comment.trim()}\n`;
  }
  return message;
};

const BRIEF_COMPANY_SIZE_LABELS: Record<string, string> = {
  '1-10': '1-10 сотрудников',
  '11-50': '11-50 сотрудников',
  '51-200': '51-200 сотрудников',
  '201-500': '201-500 сотрудников',
  '500+': 'Более 500 сотрудников',
};

const BRIEF_INDUSTRY_LABELS: Record<string, string> = {
  retail: 'Розничная торговля',
  manufacturing: 'Производство',
  finance: 'Финансы',
  healthcare: 'Здравоохранение',
  education: 'Образование',
  tech: 'Технологии',
  other: 'Другое',
};

const BRIEF_BUDGET_LABELS: Record<string, string> = {
  'under-50k': 'До 50 000 ₽',
  '50k-100k': '50 000 - 100 000 ₽',
  '100k-250k': '100 000 - 250 000 ₽',
  '250k-500k': '250 000 - 500 000 ₽',
  'over-500k': 'Более 500 000 ₽',
  'prefer-not-to-say': 'Предпочитаю не указывать',
};

export type BriefLeadData = {
  problems: string[];
  customProblem: string;
  companySize: string;
  industry: string;
  geography: string;
  aiUsage: string;
  aiUsageDetails: string;
  mainGoal: string;
  urgency: string;
  budget: string;
  name: string;
  email: string;
  company: string;
  messenger: string;
};

export const formatBriefLeadMessage = (data: BriefLeadData) => {
  let message = withTimestamp('📋 НОВАЯ ЗАЯВКА (бриф):');

  if (data.problems.length > 0) {
    message += `Проблемы: ${data.problems.join(', ')}\n`;
    if (data.customProblem.trim()) {
      message += `Уточнение проблемы: ${data.customProblem.trim()}\n`;
    }
  }

  if (data.companySize) {
    message += `Размер компании: ${BRIEF_COMPANY_SIZE_LABELS[data.companySize] || data.companySize}\n`;
  }
  if (data.industry) {
    message += `Отрасль: ${BRIEF_INDUSTRY_LABELS[data.industry] || data.industry}\n`;
  }
  if (data.geography.trim()) {
    message += `География: ${data.geography.trim()}\n`;
  }

  if (data.aiUsage) {
    message += `Использует ИИ: ${data.aiUsage === 'yes' ? 'Да' : 'Нет'}\n`;
    if (data.aiUsage === 'yes' && data.aiUsageDetails.trim()) {
      message += `Где использует ИИ: ${data.aiUsageDetails.trim()}\n`;
    }
  }

  if (data.mainGoal.trim()) {
    message += `Основная цель: ${data.mainGoal.trim()}\n`;
  }
  if (data.urgency.trim()) {
    message += `Срочность: ${data.urgency.trim()}\n`;
  }
  if (data.budget) {
    message += `Бюджет: ${BRIEF_BUDGET_LABELS[data.budget] || data.budget}\n`;
  }

  if (data.name.trim()) message += `Имя: ${data.name.trim()}\n`;
  if (data.email.trim()) message += `Email: ${data.email.trim()}\n`;
  if (data.company.trim()) message += `Компания: ${data.company.trim()}\n`;
  if (data.messenger.trim()) message += `Мессенджер: ${data.messenger.trim()}\n`;

  return message;
};

export const formatProductPreviewLeadMessage = (data: {
  userName: string;
  companyName: string;
  productName: string;
}) => {
  let message = withTimestamp('📋 ИНТЕРЕС К SaaS-ПРЕВЬЮ:');
  message += `Имя: ${data.userName}\n`;
  message += `Компания: ${data.companyName}\n`;
  message += `Продукт: ${data.productName}\n`;
  message += `🔗 Страница: /product-preview\n`;
  return message;
};
