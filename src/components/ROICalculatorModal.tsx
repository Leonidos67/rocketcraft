import { useEffect, useMemo, useState, type ComponentType } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart3,
  Bot,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Factory,
  FileDown,
  Inbox,
  Layers,
  LineChart,
  ListChecks,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import {
  AUTOMATION_TASKS,
  BUSINESS_TYPES,
  calculateRoi,
  DEFAULT_ROI_FORM,
  EMPLOYEE_RANGES,
  formatMoney,
  formatNumber,
  getEmployeeRange,
  type AutomationTaskId,
  type BusinessType,
  type CurrencyCode,
  type EmployeeRangeId,
  type RoiCalculationResult,
  type RoiFormState,
} from '@/lib/roiCalculator';
import { SKYSCRAPER_WINDOW_SLOTS } from '@/data/roiCalculatorAssets';
import SkyscraperSvg from '@/components/roi/SkyscraperSvg';

const filterHoverClass =
  'hover:bg-[color-mix(in_srgb,hsl(263_67%_83%),white_50%)]';

const filterActiveClass = 'bg-[hsl(263_67%_83%)]';

const CONTROL_TRIGGER =
  'h-auto w-full rounded-full border border-black/[0.12] bg-background px-4 py-[0.7rem] text-sm font-semibold text-foreground shadow-none transition-[background-color,border-color] duration-200 hover:border-black/[0.22] hover:bg-[hsl(0_0%_96%)] focus:ring-0 focus:ring-offset-0 data-[placeholder]:text-muted-foreground data-[state=open]:border-black/[0.22] data-[state=open]:bg-[hsl(0_0%_96%)]';

const SELECT_CONTENT =
  'rounded-2xl border border-black/10 bg-background p-2 shadow-[0_18px_48px_hsl(0_0%_0%_/_0.12)]';

const SELECT_ITEM = cn(
  'cursor-pointer rounded-xl py-3 pl-8 pr-[0.85rem] text-sm font-semibold text-foreground transition-colors duration-200',
  'focus:bg-[color-mix(in_srgb,hsl(263_67%_83%),white_50%)]',
  'data-[highlighted]:bg-[color-mix(in_srgb,hsl(263_67%_83%),white_50%)]',
  'data-[state=checked]:bg-[hsl(263_67%_83%)]'
);

const INPUT_CLASS =
  'h-auto w-full rounded-full border border-black/[0.12] bg-background px-4 py-[0.7rem] text-sm font-semibold text-foreground shadow-none outline-none transition-[border-color,background-color] duration-200 hover:border-black/[0.22] hover:bg-[hsl(0_0%_96%)] focus:border-black/[0.28] focus-visible:ring-0';

const BTN_SECONDARY =
  'inline-flex items-center gap-1.5 rounded-full border border-black/[0.12] bg-background px-4 py-[0.7rem] text-sm font-semibold text-foreground transition-[background-color,border-color] duration-200 hover:border-black/[0.22] hover:bg-[hsl(0_0%_96%)] disabled:cursor-not-allowed disabled:opacity-40';

const BTN_PRIMARY =
  'inline-flex items-center gap-1.5 rounded-full border border-black/[0.12] bg-foreground px-5 py-[0.7rem] text-sm font-semibold text-background transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40';

const BUSINESS_ICONS: Record<BusinessType, ComponentType<{ className?: string }>> = {
  retail: ShoppingBag,
  manufacturing: Factory,
  services: Briefcase,
  logistics: Truck,
  it: Cpu,
  other: Layers,
};

const TASK_ICONS: Record<AutomationTaskId, ComponentType<{ className?: string }>> = {
  leads: Inbox,
  data: BarChart3,
  control: ListChecks,
  analysis: LineChart,
  support: Bot,
};

const FORM_STEPS = [
  {
    id: 'organization',
    title: 'Данные компании',
    sidebarTitle: 'О компании',
    sidebarDescription: 'Введите базовые параметры организации, чтобы продолжить расчёт.',
  },
  {
    id: 'solutions',
    title: 'Профиль решений',
    sidebarTitle: 'Решения',
    sidebarDescription: 'Выберите процессы, которые хотите включить в анализ автоматизации.',
  },
  {
    id: 'review',
    title: 'Проверка данных',
    sidebarTitle: 'Проверка',
    sidebarDescription: 'Убедитесь, что все параметры указаны верно, перед расчётом ROI.',
  },
  {
    id: 'results',
    title: 'Результаты ROI',
    sidebarTitle: 'Результаты',
    sidebarDescription: 'Итоговый расчёт экономии и визуализация команды в офисе.',
  },
] as const;

const WINDOW_COUNT = SKYSCRAPER_WINDOW_SLOTS.length;

interface ROICalculatorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function useDebouncedValue<T>(value: T, delay = 280): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timeoutId);
  }, [value, delay]);
  return debouncedValue;
}

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <Label className="mb-2 block text-sm font-semibold text-foreground">{children}</Label>
);

const Stepper = ({
  currentStep,
  onStepClick,
}: {
  currentStep: number;
  onStepClick: (index: number) => void;
}) => (
  <div className="mx-auto flex w-full max-w-3xl items-start justify-between gap-2 px-4">
    {FORM_STEPS.map((item, index) => {
      const isActive = index === currentStep;
      const isComplete = index < currentStep;

      return (
        <div key={item.id} className="flex min-w-0 flex-1 items-start">
          <button
            type="button"
            onClick={() => onStepClick(index)}
            className="flex min-w-0 flex-col items-center gap-2 text-center"
            aria-current={isActive ? 'step' : undefined}
          >
            <span
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors',
                isActive || isComplete
                  ? 'bg-foreground text-background'
                  : 'bg-[hsl(0_0%_92%)] text-muted-foreground'
              )}
            >
              {index + 1}
            </span>
            <span
              className={cn(
                'hidden text-xs font-medium leading-tight sm:block',
                isActive ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {item.title}
            </span>
          </button>
          {index < FORM_STEPS.length - 1 ? (
            <div
              className={cn(
                'mx-2 mt-4 h-px min-w-[1rem] flex-1',
                index < currentStep ? 'bg-foreground' : 'bg-[hsl(0_0%_92%)]'
              )}
              aria-hidden="true"
            />
          ) : null}
        </div>
      );
    })}
  </div>
);

const ChipButton = ({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: ComponentType<{ className?: string }>;
  label: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'inline-flex items-center gap-2 rounded-full border border-black/[0.12] bg-background px-4 py-[0.7rem] text-left text-sm font-semibold text-foreground transition-[background-color,border-color] duration-200',
      active ? filterActiveClass : filterHoverClass
    )}
  >
    <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
    <span className="leading-snug">{label}</span>
  </button>
);

const ROICalculatorModal = ({ open, onOpenChange }: ROICalculatorModalProps) => {
  const [form, setForm] = useState<RoiFormState>(DEFAULT_ROI_FORM);
  const [currentStep, setCurrentStep] = useState(0);
  const debouncedForm = useDebouncedValue(form);
  const results = useMemo(() => calculateRoi(debouncedForm), [debouncedForm]);
  const liveIconCount = useMemo(() => {
    if (!form.employeeRange) return 0;
    return getEmployeeRange(form.employeeRange).iconCount;
  }, [form.employeeRange]);

  const step = FORM_STEPS[currentStep];
  const isFirstStep = currentStep === 0;
  const isResultsStep = currentStep === FORM_STEPS.length - 1;
  const isReviewStep = currentStep === FORM_STEPS.length - 2;

  useEffect(() => {
    if (!open) setCurrentStep(0);
  }, [open]);

  const updateForm = <K extends keyof RoiFormState>(key: K, value: RoiFormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const toggleTask = (taskId: AutomationTaskId) => {
    setForm((current) => ({
      ...current,
      selectedTasks: current.selectedTasks.includes(taskId)
        ? current.selectedTasks.filter((id) => id !== taskId)
        : [...current.selectedTasks, taskId],
    }));
  };

  const goToStep = (index: number) => {
    setCurrentStep(Math.max(0, Math.min(index, FORM_STEPS.length - 1)));
  };

  const canProceed =
    currentStep === 0 ? Boolean(form.employeeRange) : true;

  const handlePdfStub = () => {
    window.alert('PDF-отчёт невозможно загрузить из-за нестабильного интернет соединения. Попробуйте попробовать позже');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed inset-0 z-50 flex h-dvh max-h-none w-full max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-none border-none bg-[#f3f4f6] p-0 shadow-none data-[state=closed]:slide-out-to-left-0 data-[state=closed]:slide-out-to-top-0 data-[state=open]:slide-in-from-left-0 data-[state=open]:slide-in-from-top-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100">
        <div className="flex h-full min-h-0 flex-col overflow-hidden">
          <div className="shrink-0 bg-[#f3f4f6] px-6 py-8 md:px-10">
            <Stepper currentStep={currentStep} onStepClick={goToStep} />
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 md:px-10">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
              <div className="min-w-0 flex-1 rounded-3xl bg-white p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    {!isResultsStep ? (
                      <h2 className="mb-6 text-lg font-semibold text-[#111827]">
                        {isReviewStep
                          ? 'Проверьте введённые данные'
                          : 'Введите следующую информацию'}
                      </h2>
                    ) : (
                      <h2 className="mb-6 text-lg font-semibold text-[#111827]">
                        Результаты расчёта ROI
                      </h2>
                    )}

                    {currentStep === 0 ? (
                      <div className="space-y-5">
                        {/* <div>
                          <FieldLabel>Наиболее подходящая отрасль</FieldLabel>
                          <Select
                            value={form.businessType}
                            onValueChange={(value) => updateForm('businessType', value as BusinessType)}
                          >
                            <SelectTrigger className={CONTROL_TRIGGER}>
                              <SelectValue placeholder="Выберите отрасль" />
                            </SelectTrigger>
                            <SelectContent className={SELECT_CONTENT}>
                              {BUSINESS_TYPES.map((item) => (
                                <SelectItem key={item.id} value={item.id} className={SELECT_ITEM}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div> */}

                        <div>
                          <FieldLabel>Общее число сотрудников на рутине</FieldLabel>
                          <Select
                            value={form.employeeRange ?? undefined}
                            onValueChange={(value) =>
                              updateForm('employeeRange', value as EmployeeRangeId)
                            }
                          >
                            <SelectTrigger className={CONTROL_TRIGGER}>
                              <SelectValue placeholder="Выберите диапазон" />
                            </SelectTrigger>
                            <SelectContent className={SELECT_CONTENT}>
                              {EMPLOYEE_RANGES.map((range) => (
                                <SelectItem key={range.id} value={range.id} className={SELECT_ITEM}>
                                  {range.label} сотрудников
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <FieldLabel>Финансовые параметры</FieldLabel>
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <Input
                              type="number"
                              min={0}
                              step={1000}
                              value={form.salary}
                              onChange={(event) =>
                                updateForm('salary', Math.max(0, Number(event.target.value) || 0))
                              }
                              className={INPUT_CLASS}
                              placeholder="Средняя зарплата"
                            />
                            <Select
                              value={form.currency}
                              onValueChange={(value) => updateForm('currency', value as CurrencyCode)}
                            >
                              <SelectTrigger className={CONTROL_TRIGGER}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className={SELECT_CONTENT}>
                                <SelectItem value="RUB" className={SELECT_ITEM}>
                                  RUB
                                </SelectItem>
                                <SelectItem value="USD" className={SELECT_ITEM}>
                                  USD
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <FieldLabel>Наиболее подходящая отрасль</FieldLabel>
                          <div className="flex flex-wrap gap-2">
                            {BUSINESS_TYPES.map((item) => {
                              const Icon = BUSINESS_ICONS[item.id];
                              return (
                                <ChipButton
                                  key={item.id}
                                  active={form.businessType === item.id}
                                  onClick={() => updateForm('businessType', item.id)}
                                  icon={Icon}
                                  label={item.label}
                                />
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <FieldLabel>Часов в день на рутину (на одного)</FieldLabel>
                          <Slider
                            value={[form.routineHours]}
                            onValueChange={(value) => updateForm('routineHours', value[0])}
                            min={0.5}
                            max={24}
                            step={0.5}
                            className="py-2 [&_.bg-primary]:bg-foreground [&_.border-primary]:border-foreground"
                          />
                          <p className="mt-1 text-sm font-semibold text-foreground">
                            {form.routineHours} ч / день
                          </p>
                        </div>
                      </div>
                    ) : null}

                    {currentStep === 1 ? (
                      <div className="space-y-4">
                        <FieldLabel>
                          Какие решения включить в анализ?
                        </FieldLabel>
                        <div className="flex flex-wrap gap-2">
                          {AUTOMATION_TASKS.map((task) => {
                            const Icon = TASK_ICONS[task.id];
                            const isSelected = form.selectedTasks.includes(task.id);
                            return (
                              <ChipButton
                                key={task.id}
                                active={isSelected}
                                onClick={() => toggleTask(task.id)}
                                icon={Icon}
                                label={task.label}
                              />
                            );
                          })}
                        </div>
                        <p className="text-xs text-[#9ca3af]">
                          *Можно выбрать несколько направлений — они влияют на итоговый ROI.
                        </p>
                      </div>
                    ) : null}

                    {isReviewStep ? (
                      <ReviewPanel form={debouncedForm} results={results} currency={debouncedForm.currency} />
                    ) : null}

                    {isResultsStep ? (
                      <ResultsPanel results={results} currency={debouncedForm.currency} form={debouncedForm} />
                    ) : null}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex items-center justify-between gap-3 border-t border-black/[0.08] pt-6">
                  <button
                    type="button"
                    onClick={() => goToStep(currentStep - 1)}
                    disabled={isFirstStep}
                    className={BTN_SECONDARY}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Назад
                  </button>

                  {isResultsStep ? (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        className={BTN_SECONDARY}
                      >
                        Закрыть
                      </button>
                      <button
                        type="button"
                        onClick={handlePdfStub}
                        className={BTN_PRIMARY}
                      >
                        <FileDown className="h-4 w-4" />
                        PDF-отчёт
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => goToStep(currentStep + 1)}
                      disabled={!canProceed}
                      className={BTN_PRIMARY}
                    >
                      {isReviewStep ? 'Рассчитать ROI' : 'Далее'}
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <aside className="flex w-full shrink-0 flex-col items-center lg:w-[300px] lg:items-start lg:pt-4">
                <h3 className="text-center text-2xl font-normal tracking-tight text-[#9ca3af] lg:text-left lg:text-[1.75rem]">
                  {step.sidebarTitle}
                </h3>
                <p className="mt-3 max-w-xs text-center text-sm leading-relaxed text-[#b0b5bf] lg:text-left">
                  {step.sidebarDescription}
                </p>

                <div className="mt-8 w-full max-w-[300px]">
                  <SkyscraperSvg
                    employeeRange={form.employeeRange}
                    iconCount={liveIconCount}
                    className="mx-auto block h-auto w-full"
                  />
                </div>

                {form.employeeRange ? (
                  <p className="mt-4 text-center text-xs text-muted-foreground lg:text-left">
                    {/* {Math.min(liveIconCount, WINDOW_COUNT)} из {WINDOW_COUNT} окон ·{' '} */}
                    {getEmployeeRange(form.employeeRange).label} сотрудников
                  </p>
                ) : (
                  <p className="mt-4 text-center text-xs text-muted-foreground lg:text-left">
                    Выберите число сотрудников — окна заполнятся командой
                  </p>
                )}
              </aside>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ReviewPanel = ({
  form,
  results,
  currency,
}: {
  form: RoiFormState;
  results: RoiCalculationResult;
  currency: CurrencyCode;
}) => {
  const businessLabel = BUSINESS_TYPES.find((item) => item.id === form.businessType)?.label ?? '—';
  const tasksLabel =
    form.selectedTasks.length > 0
      ? form.selectedTasks
          .map((id) => AUTOMATION_TASKS.find((task) => task.id === id)?.shortLabel)
          .filter(Boolean)
          .join(', ')
      : 'не выбраны';

  const rows = [
    { label: 'Отрасль', value: businessLabel },
    { label: 'Сотрудники', value: `${results.employeeRangeLabel} чел.` },
    { label: 'Зарплата', value: formatMoney(form.salary, currency) },
    { label: 'Валюта', value: form.currency },
    { label: 'Рутина', value: `${form.routineHours} ч / день` },
    { label: 'Решения', value: tasksLabel },
  ];

  return (
    <div className="divide-y divide-black/[0.08] rounded-2xl border border-black/[0.08]">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between gap-4 px-4 py-3.5 text-sm">
          <span className="text-muted-foreground">{row.label}</span>
          <span className="font-semibold text-foreground">{row.value}</span>
        </div>
      ))}
    </div>
  );
};

const ResultsPanel = ({
  results,
  currency,
  form,
}: {
  results: RoiCalculationResult;
  currency: CurrencyCode;
  form: RoiFormState;
}) => {
  const businessLabel = BUSINESS_TYPES.find((item) => item.id === form.businessType)?.label ?? '—';

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-black/[0.08] bg-[color-mix(in_srgb,hsl(263_67%_83%),white_70%)] px-5 py-4">
        <p className="text-sm text-muted-foreground">ROI</p>
        <p className="mt-1 text-3xl font-bold text-foreground">{results.roiPercent}%</p>
        <p className="mt-2 text-sm text-[#6b7280]">
          Окупаемость:{' '}
          {results.paybackMonths < 1 ? 'менее месяца' : `${results.paybackMonths} мес.`}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { title: '1 месяц', value: formatMoney(results.savings1Month, currency) },
          { title: '3 месяца', value: formatMoney(results.savings3Months, currency) },
          { title: '12 месяцев', value: formatMoney(results.savings12Months, currency) },
          { title: 'Освобождено', value: `${formatNumber(results.freedEmployees)} чел.` },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-black/[0.08] bg-background px-4 py-3"
          >
            <p className="text-xs text-muted-foreground">{item.title}</p>
            <p className="mt-1 text-base font-semibold text-foreground">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[#f3f4f6] px-4 py-3 text-sm text-[#6b7280]">
        <p>
          <span className="text-[#9ca3af]">Отрасль:</span>{' '}
          <span className="font-medium text-[#111827]">{businessLabel}</span>
        </p>
        <p className="mt-2">
          Покрытие автоматизации —{' '}
          <strong className="text-[#111827]">{Math.round(results.automationCoverage * 100)}%</strong>.
          Потери без автоматизации —{' '}
          <strong className="text-[#111827]">{formatMoney(results.annualLoss, currency)}</strong> / год.
        </p>
      </div>
    </div>
  );
};

export default ROICalculatorModal;
