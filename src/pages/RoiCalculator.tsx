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
import { cn } from '@/lib/utils';

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
    <div className="site-canvas site-canvas--services min-h-screen">
      <div className="site-section services-page">
        <Header />
        <PageLoader />

        <StudioPageHero
          heroId="roi-hero"
          title="ROI калькулятор внедрения ИИ и автоматизации"
          reducedMotion={!!reducedMotion}
        />

        <main className="services-page__main">
          <section
            className="site-container services-product-section page-section"
            id="roi-calculator"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={pageReveal(0, !!reducedMotion)}
            >
              <p className="services-v2-section-label">
                <span className="services-v2-section-label__slash">/</span>
                <span>Расчёт</span>
              </p>
              <h2 className="services-v2-section-title">Параметры вашего бизнеса</h2>
              <p className="services-v2-hero__intro">
                Введите данные и узнайте, сколько вы сэкономите через 1, 3 и 12 месяцев после
                внедрения.
              </p>
            </motion.div>

            <motion.div
              className="studio-roi-panel"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={pageReveal(0.06, !!reducedMotion)}
            >
              <div className="studio-roi-field">
                <Label className="studio-roi-field__label">Сфера бизнеса</Label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="studio-roi-select"
                >
                  {businessTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="studio-roi-field">
                <div className="studio-roi-field__head">
                  <Label className="studio-roi-field__label">
                    Количество сотрудников (рутинные задачи)
                  </Label>
                  <span className="studio-roi-field__value">{employees} чел</span>
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

              <div className="studio-roi-field">
                <div className="studio-roi-field__head">
                  <Label className="studio-roi-field__label">
                    Средняя зарплата сотрудника (в месяц)
                  </Label>
                  <span className="studio-roi-field__value">{formatNumber(salary)} ₽</span>
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

              <div className="studio-roi-field">
                <div className="studio-roi-field__head">
                  <Label className="studio-roi-field__label">
                    Часов в день на рутину (на одного сотрудника)
                  </Label>
                  <span className="studio-roi-field__value">{routineHours} ч</span>
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

              <div className="studio-roi-field">
                <Label className="studio-roi-field__label">
                  Какие задачи хотите автоматизировать?
                </Label>
                <ul className="studio-roi-tasks">
                  {tasks.map((task) => (
                    <li key={task.id}>
                      <label className="studio-roi-task">
                        <Checkbox
                          checked={selectedTasks.includes(task.id)}
                          onCheckedChange={() => handleTaskToggle(task.id)}
                        />
                        <span>{task.label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className="btn-sm-primary-wrap btn-sm-primary-wrap--compact studio-roi-submit"
                onClick={calculateROI}
              >
                <span className="btn-sm-primary__label">Рассчитать ROI</span>
              </button>
            </motion.div>

            {showResults && (
              <motion.div
                id="roi-results"
                className="studio-roi-results page-section"
                initial="hidden"
                animate="visible"
                variants={pageReveal(0, !!reducedMotion)}
              >
                <h3 className="studio-roi-results__title">Результаты расчёта</h3>
                <div className="studio-roi-results__grid">
                  <article className="studio-roi-result studio-roi-result--loss">
                    <AlertCircle className="studio-roi-result__icon" aria-hidden="true" />
                    <span className="studio-roi-result__label">Вы теряете каждый год</span>
                    <span className="studio-roi-result__value">
                      {formatNumber(results.annualLoss)} ₽
                    </span>
                  </article>
                  <article className="studio-roi-result studio-roi-result--gain">
                    <CheckCircle className="studio-roi-result__icon" aria-hidden="true" />
                    <span className="studio-roi-result__label">ИИ сэкономит вам</span>
                    <span className="studio-roi-result__value">
                      {formatNumber(results.annualSavings)} ₽
                    </span>
                  </article>
                  <article className="studio-roi-result">
                    <Clock className="studio-roi-result__icon" aria-hidden="true" />
                    <span className="studio-roi-result__label">Окупаемость</span>
                    <span className="studio-roi-result__value">
                      {results.paybackMonths < 1
                        ? 'менее месяца'
                        : `${results.paybackMonths} мес`}
                    </span>
                  </article>
                  <article
                    className={cn(
                      'studio-roi-result',
                      results.roi >= 0 ? 'studio-roi-result--gain' : 'studio-roi-result--loss'
                    )}
                  >
                    <TrendingUp className="studio-roi-result__icon" aria-hidden="true" />
                    <span className="studio-roi-result__label">Рентабельность</span>
                    <span className="studio-roi-result__value">{results.roi}%</span>
                  </article>
                </div>
                <p className="studio-roi-results__summary">
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
            className="site-container services-v2-process page-section"
            id="roi-case"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={pageReveal(0, !!reducedMotion)}
            >
              <p className="services-v2-section-label">
                <span className="services-v2-section-label__slash">/</span>
                <span>Кейс</span>
              </p>
              <h2 className="services-v2-section-title">Как это работает на практике</h2>
            </motion.div>

            <motion.article
              className="studio-case-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={pageReveal(0.06, !!reducedMotion)}
            >
              <div className="studio-case-card__visual">
                <Users className="studio-case-card__icon" aria-hidden="true" />
              </div>
              <div className="studio-case-card__body">
                <span className="studio-case-card__badge">Реальный кейс</span>
                <h3 className="studio-case-card__title">
                  Внедрили чат-бота и CRM для компании N
                </h3>
                <div className="studio-case-card__stats">
                  <div>
                    <span className="studio-case-card__stat-value">60%</span>
                    <span className="studio-case-card__stat-label">
                      Ускорение обработки заявок
                    </span>
                  </div>
                  <div>
                    <span className="studio-case-card__stat-value">1.2 млн ₽</span>
                    <span className="studio-case-card__stat-label">Экономия ФОТ в год</span>
                  </div>
                </div>
                <p className="studio-case-card__text">
                  Автоматизация первичных ответов и интеграция с CRM сократила время ответа
                  клиентам с 2 часов до 15 минут и высвободила 3 менеджеров для работы с
                  горячими лидами.
                </p>
                <Link to="/cases" className="btn-link-arrow text-foreground">
                  Все кейсы
                </Link>
              </div>
            </motion.article>
          </section>

          <section
            className="site-container pb-20 md:pb-28 page-section"
            id="roi-cta"
          >
            <motion.div
              className="services-page-cta"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={pageReveal(0, !!reducedMotion)}
            >
              <h2 className="services-page-cta__title">Хотите такой же результат?</h2>
              <p className="services-page-cta__text">
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
