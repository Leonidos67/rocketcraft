import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';
import PrimaryButton from '@/components/PrimaryButton';
import StudioPageHero from '@/components/StudioPageHero';
import PageSectionNav from '@/components/PageSectionNav';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { roiPageSections } from '@/data/pageSections/roi';
import { pageReveal } from '@/lib/pageMotion';
import {
  heroIntroClass,
  oiHeadingClass,
  pageCtaClass,
  pageCtaTextClass,
  pageCtaTitleClass,
  processSectionClass,
  productSectionClass,
  sectionLabelClass,
  sectionLabelSlashClass,
  sectionTitleClass,
} from '@/lib/studioPageStyles';
import {
  btnLinkArrowClass,
  pageSectionClass,
  siteCanvasServicesClass,
  siteContainerClass,
  siteSectionClass,
} from '@/lib/layoutStyles';
import { cn } from '@/lib/utils';

const compactBtnIconSizeStyle = {
  '--btn-icon-size': '2.75rem',
} as React.CSSProperties;

const compactPrimaryBtnClass = cn(
  'inline-flex items-center justify-center shrink-0 cursor-pointer border-none',
  'h-[var(--btn-icon-size)] px-5',
  'bg-primary text-primary-foreground rounded-full',
  'text-sm font-semibold leading-none',
);

const IMPLEMENTATION_COST = 250000;

const businessTypes = [
  { value: 'retail', label: 'Розничная торговля' },
  { value: 'manufacturing', label: 'Производство' },
  { value: 'services', label: 'Услуги' },
  { value: 'logistics', label: 'Логистика' },
  { value: 'other', label: 'Другое' },
];

const tasks = [
  { id: 'leads', label: 'Обработка заявок и первичные ответы клиентам' },
  { id: 'data', label: 'Ввод данных и отчётность (Excel/CRM)' },
  { id: 'control', label: 'Контроль задач и напоминания сотрудникам' },
  { id: 'analysis', label: 'Анализ конкурентов и сбор данных' },
  { id: 'support', label: 'Поддержка клиентов 24/7 (чат-боты)' },
];

const formatNumber = (num: number) => num.toLocaleString('ru-RU');

const RoiCalculator = () => {
  const reducedMotion = useReducedMotion();
  const [businessType, setBusinessType] = useState('retail');
  const [employees, setEmployees] = useState(15);
  const [salary, setSalary] = useState(75000);
  const [routineHours, setRoutineHours] = useState(2.5);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    annualLoss: 0,
    annualSavings: 0,
    paybackMonths: 0,
    roi: 0,
    monthlySavings: 0,
  });

  useEffect(() => {
    document.title = 'ROI Калькулятор — Agyra';
  }, []);

  const handleTaskToggle = (taskId: string) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const calculateROI = () => {
    if (selectedTasks.length === 0) {
      alert('Выберите хотя бы одну задачу для автоматизации');
      return;
    }

    const hourlyRate = Math.round(salary / 22 / 8);
    const dailyLoss = employees * routineHours * hourlyRate;
    const annualLoss = dailyLoss * 22 * 12;
    const annualSavings = annualLoss * 0.8;
    const monthlySavings = annualSavings / 12;
    const paybackMonths = monthlySavings > 0 ? IMPLEMENTATION_COST / monthlySavings : 0;
    const roi = ((annualSavings - IMPLEMENTATION_COST) / IMPLEMENTATION_COST) * 100;

    setResults({
      annualLoss: Math.round(annualLoss),
      annualSavings: Math.round(annualSavings),
      paybackMonths: Math.round(paybackMonths * 10) / 10,
      roi: Math.round(roi),
      monthlySavings: Math.round(monthlySavings),
    });

    setShowResults(true);

    window.setTimeout(() => {
      document.getElementById('roi-results')?.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }, 100);
  };

  return (
    <div className={cn(siteCanvasServicesClass, 'min-h-screen')}>
      <div className={siteSectionClass}>
        <Header />
        <PageLoader />

        <StudioPageHero
          heroId="roi-hero"
          title="ROI калькулятор внедрения ИИ и автоматизации"
          reducedMotion={!!reducedMotion}
        />

        <main className="m-0 p-0">
          <section
            className={cn(siteContainerClass, pageSectionClass, productSectionClass)}
            id="roi-calculator"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={pageReveal(0, !!reducedMotion)}
            >
              <p className={cn(sectionLabelClass, 'mt-[clamp(2rem,4vw,3rem)]')}>
                <span className={sectionLabelSlashClass}>/</span>
                <span>Расчёт</span>
              </p>
              <h2 className={sectionTitleClass}>Параметры вашего бизнеса</h2>
              <p className={heroIntroClass}>
                Введите данные и узнайте, сколько вы сэкономите через 1, 3 и 12 месяцев после
                внедрения.
              </p>
            </motion.div>

            <motion.div
              className="mt-[clamp(2rem,4vw,2.5rem)] flex flex-col gap-6 rounded-[1.25rem] border border-border bg-card p-[clamp(1.25rem,3vw,2rem)]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={pageReveal(0.06, !!reducedMotion)}
            >
              <div className="flex flex-col gap-[0.65rem]">
                <Label className="text-[0.9375rem] font-semibold text-foreground">
                  Сфера бизнеса
                </Label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 font-[inherit] text-[0.9375rem] text-foreground outline-none focus:border-primary focus:shadow-[0_0_0_2px_hsl(var(--primary)_/_0.15)]"
                >
                  {businessTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-[0.65rem]">
                <div className="flex items-start justify-between gap-4">
                  <Label className="text-[0.9375rem] font-semibold text-foreground">
                    Количество сотрудников (рутинные задачи)
                  </Label>
                  <span className="shrink-0 rounded-full bg-[hsl(217_100%_86%_/_0.45)] px-[0.65rem] py-1 text-sm font-bold text-foreground">
                    {employees} чел
                  </span>
                </div>
                <Slider
                  value={[employees]}
                  onValueChange={(value) => setEmployees(value[0])}
                  min={1}
                  max={200}
                  step={1}
                  className="py-4"
                />
              </div>

              <div className="flex flex-col gap-[0.65rem]">
                <div className="flex items-start justify-between gap-4">
                  <Label className="text-[0.9375rem] font-semibold text-foreground">
                    Средняя зарплата сотрудника (в месяц)
                  </Label>
                  <span className="shrink-0 rounded-full bg-[hsl(217_100%_86%_/_0.45)] px-[0.65rem] py-1 text-sm font-bold text-foreground">
                    {formatNumber(salary)} ₽
                  </span>
                </div>
                <Slider
                  value={[salary]}
                  onValueChange={(value) => setSalary(value[0])}
                  min={30000}
                  max={250000}
                  step={5000}
                  className="py-4"
                />
              </div>

              <div className="flex flex-col gap-[0.65rem]">
                <div className="flex items-start justify-between gap-4">
                  <Label className="text-[0.9375rem] font-semibold text-foreground">
                    Часов в день на рутину (на одного сотрудника)
                  </Label>
                  <span className="shrink-0 rounded-full bg-[hsl(217_100%_86%_/_0.45)] px-[0.65rem] py-1 text-sm font-bold text-foreground">
                    {routineHours} ч
                  </span>
                </div>
                <Slider
                  value={[routineHours]}
                  onValueChange={(value) => setRoutineHours(value[0])}
                  min={0.5}
                  max={6}
                  step={0.5}
                  className="py-4"
                />
              </div>

              <div className="flex flex-col gap-[0.65rem]">
                <Label className="text-[0.9375rem] font-semibold text-foreground">
                  Какие задачи хотите автоматизировать?
                </Label>
                <ul className="m-0 flex list-none flex-col gap-[0.35rem] p-0">
                  {tasks.map((task) => (
                    <li key={task.id}>
                      <label className="flex cursor-pointer items-start gap-[0.65rem] rounded-xl px-3 py-[0.65rem] transition-colors hover:bg-[hsl(217_100%_86%_/_0.35)]">
                        <Checkbox
                          checked={selectedTasks.includes(task.id)}
                          onCheckedChange={() => handleTaskToggle(task.id)}
                        />
                        <span className="text-sm leading-[1.45] text-foreground/90">
                          {task.label}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className={cn(compactPrimaryBtnClass, 'self-start')}
                style={compactBtnIconSizeStyle}
                onClick={calculateROI}
              >
                Рассчитать ROI
              </button>
            </motion.div>

            {showResults && (
              <motion.div
                id="roi-results"
                className={cn(pageSectionClass, 'mt-[clamp(2rem,4vw,3rem)]')}
                initial="hidden"
                animate="visible"
                variants={pageReveal(0, !!reducedMotion)}
              >
                <h3
                  className={cn(
                    oiHeadingClass,
                    'mb-5 text-[clamp(1.25rem,2.5vw,1.75rem)]'
                  )}
                >
                  Результаты расчёта
                </h3>
                <div className="grid grid-cols-1 gap-[0.85rem] min-[40em]:grid-cols-2 min-[64em]:grid-cols-4">
                  <article className="flex flex-col gap-[0.35rem] rounded-2xl border border-[hsl(0_70%_50%_/_0.2)] bg-[hsl(0_70%_50%_/_0.06)] p-[1.1rem_1.15rem]">
                    <AlertCircle className="h-[1.35rem] w-[1.35rem] text-foreground/55" aria-hidden="true" />
                    <span className="text-[0.8125rem] text-muted-foreground">
                      Вы теряете каждый год
                    </span>
                    <span className="text-[clamp(1.25rem,2vw,1.75rem)] font-bold leading-[1.15] text-foreground">
                      {formatNumber(results.annualLoss)} ₽
                    </span>
                  </article>
                  <article className="flex flex-col gap-[0.35rem] rounded-2xl border border-primary/25 bg-primary/[0.08] p-[1.1rem_1.15rem]">
                    <CheckCircle className="h-[1.35rem] w-[1.35rem] text-foreground/55" aria-hidden="true" />
                    <span className="text-[0.8125rem] text-muted-foreground">ИИ сэкономит вам</span>
                    <span className="text-[clamp(1.25rem,2vw,1.75rem)] font-bold leading-[1.15] text-foreground">
                      {formatNumber(results.annualSavings)} ₽
                    </span>
                  </article>
                  <article className="flex flex-col gap-[0.35rem] rounded-2xl border border-border bg-background p-[1.1rem_1.15rem]">
                    <Clock className="h-[1.35rem] w-[1.35rem] text-foreground/55" aria-hidden="true" />
                    <span className="text-[0.8125rem] text-muted-foreground">Окупаемость</span>
                    <span className="text-[clamp(1.25rem,2vw,1.75rem)] font-bold leading-[1.15] text-foreground">
                      {results.paybackMonths < 1
                        ? 'менее месяца'
                        : `${results.paybackMonths} мес`}
                    </span>
                  </article>
                  <article
                    className={cn(
                      'flex flex-col gap-[0.35rem] rounded-2xl p-[1.1rem_1.15rem]',
                      results.roi >= 0
                        ? 'border border-primary/25 bg-primary/[0.08]'
                        : 'border border-[hsl(0_70%_50%_/_0.2)] bg-[hsl(0_70%_50%_/_0.06)]'
                    )}
                  >
                    <TrendingUp className="h-[1.35rem] w-[1.35rem] text-foreground/55" aria-hidden="true" />
                    <span className="text-[0.8125rem] text-muted-foreground">Рентабельность</span>
                    <span className="text-[clamp(1.25rem,2vw,1.75rem)] font-bold leading-[1.15] text-foreground">
                      {results.roi}%
                    </span>
                  </article>
                </div>
                <p className="mt-5 rounded-[0.9rem] border border-border bg-card p-[1.1rem_1.15rem] text-[0.9375rem] leading-[1.55] text-muted-foreground">
                  При стоимости внедрения {formatNumber(IMPLEMENTATION_COST)} ₽ инвестиции
                  окупятся за{' '}
                  {results.paybackMonths < 1
                    ? 'менее месяца'
                    : `${results.paybackMonths} месяцев`}{' '}
                  и принесут {results.roi}% прибыли в первый год.
                </p>
              </motion.div>
            )}
          </section>

          <section
            className={cn(siteContainerClass, pageSectionClass, processSectionClass)}
            id="roi-case"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={pageReveal(0, !!reducedMotion)}
            >
              <p className={sectionLabelClass}>
                <span className={sectionLabelSlashClass}>/</span>
                <span>Кейс</span>
              </p>
              <h2 className={sectionTitleClass}>Как это работает на практике</h2>
            </motion.div>

            <motion.article
              className="mt-[clamp(1.5rem,3vw,2rem)] grid grid-cols-1 overflow-hidden rounded-[1.25rem] border border-border bg-card min-[48em]:grid-cols-[minmax(10rem,14rem)_1fr]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={pageReveal(0.06, !!reducedMotion)}
            >
              <div className="flex items-center justify-center bg-primary p-8 text-primary-foreground">
                <Users className="h-16 w-16" aria-hidden="true" />
              </div>
              <div className="p-[clamp(1.25rem,3vw,2rem)]">
                <span className="mb-3 inline-block rounded-full bg-primary/[0.12] px-[0.65rem] py-1 text-[0.6875rem] font-bold uppercase tracking-[0.04em] text-foreground">
                  Реальный кейс
                </span>
                <h3
                  className={cn(
                    oiHeadingClass,
                    'mb-4 text-[clamp(1.125rem,2vw,1.5rem)]'
                  )}
                >
                  Внедрили чат-бота и CRM для компании N
                </h3>
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <span className="mb-1 block text-2xl font-bold leading-[1.1]">60%</span>
                    <span className="text-[0.8125rem] leading-[1.35] text-muted-foreground">
                      Ускорение обработки заявок
                    </span>
                  </div>
                  <div>
                    <span className="mb-1 block text-2xl font-bold leading-[1.1]">1.2 млн ₽</span>
                    <span className="text-[0.8125rem] leading-[1.35] text-muted-foreground">
                      Экономия ФОТ в год
                    </span>
                  </div>
                </div>
                <p className="mb-5 text-[0.9375rem] leading-[1.55] text-muted-foreground">
                  Автоматизация первичных ответов и интеграция с CRM сократила время ответа
                  клиентам с 2 часов до 15 минут и высвободила 3 менеджеров для работы с
                  горячими лидами.
                </p>
                <Link to="/cases" className={cn(btnLinkArrowClass, 'text-foreground')}>
                  Все кейсы
                </Link>
              </div>
            </motion.article>
          </section>

          <section className={cn(siteContainerClass, pageSectionClass, 'pb-20 md:pb-28')} id="roi-cta">
            <motion.div
              className={pageCtaClass}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={pageReveal(0, !!reducedMotion)}
            >
              <h2 className={pageCtaTitleClass}>Хотите такой же результат?</h2>
              <p className={pageCtaTextClass}>
                Закажите бесплатный аудит бизнес-процессов — найдём точки для автоматизации и
                посчитаем ROI под вашу задачу.
              </p>
              <PrimaryButton to="/contacts">Получить аудит</PrimaryButton>
            </motion.div>
          </section>
        </main>
      </div>

      <Footer />
      <PageSectionNav sections={roiPageSections} reducedMotion={!!reducedMotion} />
    </div>
  );
};

export default RoiCalculator;
