export type BusinessType =
  | 'retail'
  | 'manufacturing'
  | 'services'
  | 'logistics'
  | 'it'
  | 'other';

export type CurrencyCode = 'RUB' | 'USD';

export type AutomationTaskId = 'leads' | 'data' | 'control' | 'analysis' | 'support';

export type EmployeeRangeId = '0-10' | '10-20' | '20-50' | '50-100' | '100+';

export interface EmployeeRange {
  id: EmployeeRangeId;
  label: string;
  calcValue: number;
  iconCount: number;
}

export interface RoiFormState {
  businessType: BusinessType;
  employeeRange: EmployeeRangeId | null;
  salary: number;
  routineHours: number;
  currency: CurrencyCode;
  selectedTasks: AutomationTaskId[];
}

export interface RoiCalculationResult {
  monthlySavings: number;
  savings1Month: number;
  savings3Months: number;
  savings12Months: number;
  freedEmployees: number;
  roiPercent: number;
  paybackMonths: number;
  annualLoss: number;
  automationCoverage: number;
  employeeCount: number;
  employeeRangeLabel: string;
  iconCount: number;
}

export const IMPLEMENTATION_COST_RUB = 250_000;
export const USD_EXCHANGE_RATE = 92;

export const EMPLOYEE_RANGES: EmployeeRange[] = [
  { id: '0-10', label: '0–10', calcValue: 5, iconCount: 10 },
  { id: '10-20', label: '10–20', calcValue: 15, iconCount: 20 },
  { id: '20-50', label: '20–50', calcValue: 35, iconCount: 50 },
  { id: '50-100', label: '50–100', calcValue: 75, iconCount: 80 },
  { id: '100+', label: '100+', calcValue: 120, iconCount: 110 },
];

export const BUSINESS_TYPES: {
  id: BusinessType;
  label: string;
  hint: string;
}[] = [
  { id: 'retail', label: 'Розничная торговля', hint: 'Магазины и e-commerce' },
  { id: 'manufacturing', label: 'Производство', hint: 'Цеха и линии выпуска' },
  { id: 'services', label: 'Услуги', hint: 'Сервисные компании' },
  { id: 'logistics', label: 'Логистика', hint: 'Склады и доставка' },
  { id: 'it', label: 'IT', hint: 'Продукт и разработка' },
  { id: 'other', label: 'Другое', hint: 'Смешанная модель' },
];

export const AUTOMATION_TASKS: {
  id: AutomationTaskId;
  label: string;
  shortLabel: string;
  impact: number;
}[] = [
  {
    id: 'leads',
    label: 'Обработка заявок и первичные ответы',
    shortLabel: 'Заявки',
    impact: 0.14,
  },
  {
    id: 'data',
    label: 'Ввод данных и отчётность',
    shortLabel: 'Отчёты',
    impact: 0.16,
  },
  {
    id: 'control',
    label: 'Контроль задач и напоминания',
    shortLabel: 'Контроль',
    impact: 0.12,
  },
  {
    id: 'analysis',
    label: 'Анализ конкурентов',
    shortLabel: 'Аналитика',
    impact: 0.1,
  },
  {
    id: 'support',
    label: 'Поддержка клиентов 24/7 (чат-боты)',
    shortLabel: 'Чат-боты',
    impact: 0.18,
  },
];

const BASE_AUTOMATION_COVERAGE = 0.42;

export const DEFAULT_ROI_FORM: RoiFormState = {
  businessType: 'retail',
  employeeRange: null,
  salary: 75_000,
  routineHours: 2.5,
  currency: 'RUB',
  selectedTasks: ['leads', 'data'],
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const getEmployeeRange = (id: EmployeeRangeId): EmployeeRange =>
  EMPLOYEE_RANGES.find((range) => range.id === id) ?? EMPLOYEE_RANGES[0];

export const calculateRoi = (form: RoiFormState): RoiCalculationResult => {
  const range = form.employeeRange ? getEmployeeRange(form.employeeRange) : null;
  const employees = range?.calcValue ?? 5;
  const salary = Math.max(form.salary, 0);
  const routineHours = clamp(form.routineHours, 0.5, 24);

  const taskImpact = form.selectedTasks.reduce((sum, taskId) => {
    const task = AUTOMATION_TASKS.find((item) => item.id === taskId);
    return sum + (task?.impact ?? 0);
  }, 0);

  const automationCoverage = clamp(BASE_AUTOMATION_COVERAGE + taskImpact, 0.35, 0.88);
  const hourlyRate = salary / 22 / 8;
  const dailyLoss = employees * routineHours * hourlyRate;
  const annualLoss = dailyLoss * 22 * 12;
  const annualSavings = annualLoss * automationCoverage;
  const monthlySavings = annualSavings / 12;

  const implementationCost =
    form.currency === 'USD'
      ? IMPLEMENTATION_COST_RUB / USD_EXCHANGE_RATE
      : IMPLEMENTATION_COST_RUB;

  const paybackMonths =
    monthlySavings > 0 ? implementationCost / monthlySavings : Number.POSITIVE_INFINITY;

  const roiPercent =
    implementationCost > 0
      ? ((annualSavings - implementationCost) / implementationCost) * 100
      : 0;

  const freedEmployees = clamp(Math.round(employees * automationCoverage * 0.72), 0, employees);

  return {
    monthlySavings: Math.round(monthlySavings),
    savings1Month: Math.round(monthlySavings),
    savings3Months: Math.round(monthlySavings * 3),
    savings12Months: Math.round(monthlySavings * 12),
    freedEmployees,
    roiPercent: Math.round(roiPercent),
    paybackMonths: Math.round(paybackMonths * 10) / 10,
    annualLoss: Math.round(annualLoss),
    automationCoverage,
    employeeCount: employees,
    employeeRangeLabel: range?.label ?? '—',
    iconCount: range?.iconCount ?? 0,
  };
};

export const formatMoney = (value: number, currency: CurrencyCode) => {
  const locale = currency === 'USD' ? 'en-US' : 'ru-RU';
  const symbol = currency === 'USD' ? '$' : '₽';

  return `${value.toLocaleString(locale)} ${symbol}`;
};

export const formatNumber = (value: number, currency: CurrencyCode = 'RUB') =>
  value.toLocaleString(currency === 'USD' ? 'en-US' : 'ru-RU');
