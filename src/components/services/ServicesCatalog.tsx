import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ServiceProductCard from '@/components/ServiceProductCard';
import type { ServiceDirection } from '@/data/servicesByDirection';

const EASE = [0.22, 1, 0.36, 1] as const;

const filterHoverClass =
  'hover:bg-[color-mix(in_srgb,hsl(263_67%_83%),white_50%)]';

const filterActiveClass = 'bg-[hsl(263_67%_83%)]';

type FilterPanel = 'root' | 'direction' | 'price' | 'sort';
type ViewMode = 'grid' | 'list';
type PriceRange = 'all' | 'budget' | 'mid' | 'premium';
type SortBy = 'default' | 'price-asc' | 'price-desc' | 'name';

const catalogGridClass = (viewMode: ViewMode) =>
  cn(
    'm-0 grid w-full list-none gap-[clamp(1rem,2vw,1.25rem)] p-0',
    viewMode === 'grid'
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      : 'grid-cols-1 gap-[0.65rem]'
  );

const PRICE_OPTIONS: { id: PriceRange; label: string }[] = [
  { id: 'all', label: 'Любая цена' },
  { id: 'budget', label: 'До 40k ₽' },
  { id: 'mid', label: '40k – 80k ₽' },
  { id: 'premium', label: 'От 80k ₽' },
];

const SORT_OPTIONS: { id: SortBy; label: string }[] = [
  { id: 'default', label: 'По умолчанию' },
  { id: 'price-asc', label: 'Сначала дешевле' },
  { id: 'price-desc', label: 'Сначала дороже' },
  { id: 'name', label: 'По названию А–Я' },
];

interface ServicesCatalogProps {
  directions: ServiceDirection[];
  initialDirectionId?: string;
  reducedMotion?: boolean;
}

const ServicesCatalog = ({
  directions,
  initialDirectionId,
  reducedMotion = false,
}: ServicesCatalogProps) => {
  const filterRef = useRef<HTMLDivElement>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPanel, setFilterPanel] = useState<FilterPanel>('root');
  const [selectedDirections, setSelectedDirections] = useState<string[]>([]);
  const [draftDirections, setDraftDirections] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [priceRange, setPriceRange] = useState<PriceRange>('all');
  const [sortBy, setSortBy] = useState<SortBy>('default');
  const [discountOnly, setDiscountOnly] = useState(false);

  useEffect(() => {
    if (!initialDirectionId) return;
    const match = directions.find((direction) => direction.id === initialDirectionId);
    if (!match) return;
    setSelectedDirections([match.id]);
  }, [initialDirectionId, directions]);

  useEffect(() => {
    if (!filterOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!filterRef.current?.contains(event.target as Node)) {
        setFilterOpen(false);
        setFilterPanel('root');
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFilterOpen(false);
        setFilterPanel('root');
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [filterOpen]);

  const allItems = useMemo(
    () =>
      directions.flatMap((direction) =>
        direction.services.map((service) => ({ service, direction }))
      ),
    [directions]
  );

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedDirections.length > 0) count += 1;
    if (priceRange !== 'all') count += 1;
    if (sortBy !== 'default') count += 1;
    if (discountOnly) count += 1;
    return count;
  }, [selectedDirections, priceRange, sortBy, discountOnly]);

  const filteredItems = useMemo(() => {
    let items = allItems;

    if (selectedDirections.length > 0) {
      items = items.filter((item) => selectedDirections.includes(item.direction.id));
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      items = items.filter(
        (item) =>
          item.service.title.toLowerCase().includes(query) ||
          item.service.description.toLowerCase().includes(query) ||
          item.direction.title.toLowerCase().includes(query)
      );
    }

    if (discountOnly) {
      items = items.filter((item) => item.service.priceOld);
    }

    if (priceRange !== 'all') {
      items = items.filter((item) => {
        const price = item.service.priceFrom;
        if (priceRange === 'budget') return price < 40000;
        if (priceRange === 'mid') return price >= 40000 && price < 80000;
        return price >= 80000;
      });
    }

    const sorted = [...items];
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.service.priceFrom - b.service.priceFrom);
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.service.priceFrom - a.service.priceFrom);
    } else if (sortBy === 'name') {
      sorted.sort((a, b) => a.service.title.localeCompare(b.service.title, 'ru'));
    }

    return sorted;
  }, [allItems, selectedDirections, searchQuery, discountOnly, priceRange, sortBy]);

  const openFilter = () => {
    setFilterOpen((current) => {
      const next = !current;
      if (next) {
        setFilterPanel('root');
        setDraftDirections(selectedDirections);
      }
      return next;
    });
  };

  const openDirectionPanel = () => {
    setDraftDirections(selectedDirections);
    setFilterPanel('direction');
  };

  const toggleDraftDirection = (id: string) => {
    setDraftDirections((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const applyDirections = () => {
    setSelectedDirections(draftDirections);
    setFilterPanel('root');
  };

  const resetFilters = () => {
    setSelectedDirections([]);
    setDraftDirections([]);
    setPriceRange('all');
    setSortBy('default');
    setDiscountOnly(false);
    setFilterPanel('root');
  };

  const directionLabel =
    selectedDirections.length === 0
      ? 'Все направления'
      : directions
          .filter((direction) => selectedDirections.includes(direction.id))
          .map((direction) => direction.title)
          .join(', ');

  return (
    <div className="flex flex-col gap-0">
      <div className="mb-4 flex items-center justify-between gap-4 max-[47.99em]:flex-col max-[47.99em]:items-stretch">
        <div className="flex min-w-0 flex-1 items-center gap-3 max-[47.99em]:flex-col max-[47.99em]:items-stretch">
          <div className="relative shrink-0" ref={filterRef}>
            <button
              type="button"
              className={cn(
                'inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/[0.12] bg-background px-4 py-[0.7rem] text-sm font-semibold text-foreground transition-[background-color,border-color] duration-200',
                'hover:border-black/[0.22] hover:bg-[hsl(0_0%_96%)]',
                filterOpen && 'border-black/[0.22] bg-[hsl(0_0%_96%)]'
              )}
              onClick={openFilter}
              aria-expanded={filterOpen}
              aria-haspopup="dialog"
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              Фильтры
              {activeFilterCount > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-[0.35rem] text-[0.6875rem] font-bold text-background">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {filterOpen && (
                <motion.div
                  className="absolute left-0 top-[calc(100%+0.5rem)] z-30 w-[min(20rem,calc(100vw-3rem))] rounded-2xl border border-black/10 bg-background p-2 shadow-[0_18px_48px_hsl(0_0%_0%_/_0.12)]"
                  role="dialog"
                  aria-label="Фильтры услуг"
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: 4 }}
                  transition={{ duration: reducedMotion ? 0 : 0.22, ease: EASE }}
                >
                  <AnimatePresence mode="wait">
                    {filterPanel === 'root' && (
                      <motion.div
                        key="root"
                        className="flex flex-col gap-1"
                        initial={reducedMotion ? false : { opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reducedMotion ? undefined : { opacity: 0, x: 8 }}
                        transition={{ duration: reducedMotion ? 0 : 0.2 }}
                      >
                        <button
                          type="button"
                          className={cn(
                            'flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border-none bg-transparent px-[0.85rem] py-3 text-left transition-colors duration-200',
                            filterHoverClass
                          )}
                          onClick={openDirectionPanel}
                        >
                          <span>
                            <span className="block text-sm font-semibold text-foreground">
                              Направление
                            </span>
                            <span className="mt-[0.15rem] block text-xs leading-[1.35] text-muted-foreground">
                              {directionLabel}
                            </span>
                          </span>
                          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                        </button>

                        <button
                          type="button"
                          className={cn(
                            'flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border-none bg-transparent px-[0.85rem] py-3 text-left transition-colors duration-200',
                            filterHoverClass
                          )}
                          onClick={() => setFilterPanel('price')}
                        >
                          <span>
                            <span className="block text-sm font-semibold text-foreground">Цена</span>
                            <span className="mt-[0.15rem] block text-xs leading-[1.35] text-muted-foreground">
                              {PRICE_OPTIONS.find((option) => option.id === priceRange)?.label}
                            </span>
                          </span>
                          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                        </button>

                        <button
                          type="button"
                          className={cn(
                            'flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border-none bg-transparent px-[0.85rem] py-3 text-left transition-colors duration-200',
                            filterHoverClass
                          )}
                          onClick={() => setFilterPanel('sort')}
                        >
                          <span>
                            <span className="block text-sm font-semibold text-foreground">
                              Сортировка
                            </span>
                            <span className="mt-[0.15rem] block text-xs leading-[1.35] text-muted-foreground">
                              {SORT_OPTIONS.find((option) => option.id === sortBy)?.label}
                            </span>
                          </span>
                          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                        </button>

                        <label
                          className={cn(
                            'flex cursor-pointer items-center gap-[0.65rem] rounded-xl px-[0.85rem] py-[0.7rem] text-sm font-medium transition-colors duration-200',
                            filterHoverClass
                          )}
                        >
                          <input
                            type="checkbox"
                            className="h-4 w-4 accent-foreground"
                            checked={discountOnly}
                            onChange={(event) => setDiscountOnly(event.target.checked)}
                          />
                          <span>Только со скидкой</span>
                        </label>

                        <button
                          type="button"
                          className={cn(
                            'mt-1 cursor-pointer rounded-xl border-none bg-transparent px-[0.85rem] py-[0.7rem] text-left text-sm font-semibold text-muted-foreground transition-colors duration-200',
                            filterHoverClass,
                            'hover:text-foreground'
                          )}
                          onClick={resetFilters}
                        >
                          Сбросить фильтры
                        </button>
                      </motion.div>
                    )}

                    {filterPanel === 'direction' && (
                      <motion.div
                        key="direction"
                        className="flex flex-col gap-1"
                        initial={reducedMotion ? false : { opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reducedMotion ? undefined : { opacity: 0, x: -8 }}
                        transition={{ duration: reducedMotion ? 0 : 0.2 }}
                      >
                        <button
                          type="button"
                          className={cn(
                            'mb-1 inline-flex cursor-pointer items-center gap-[0.35rem] rounded-[0.65rem] border-none bg-transparent px-[0.65rem] py-2 text-[0.8125rem] font-semibold text-muted-foreground transition-colors duration-200',
                            filterHoverClass,
                            'hover:text-foreground'
                          )}
                          onClick={() => setFilterPanel('root')}
                        >
                          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                          Направление
                        </button>

                        <button
                          type="button"
                          className={cn(
                            'flex w-full cursor-pointer items-center gap-[0.65rem] rounded-xl border-none bg-transparent px-[0.85rem] py-[0.7rem] text-left text-sm font-medium text-foreground transition-colors duration-200',
                            filterHoverClass,
                            draftDirections.length === 0 && filterActiveClass
                          )}
                          onClick={() => setDraftDirections([])}
                        >
                          Все направления
                        </button>

                        {directions.map((direction) => {
                          const isChecked = draftDirections.includes(direction.id);
                          return (
                            <label
                              key={direction.id}
                              className={cn(
                                'flex w-full cursor-pointer items-center gap-[0.65rem] rounded-xl border-none bg-transparent px-[0.85rem] py-[0.7rem] text-left text-sm font-medium text-foreground transition-colors duration-200',
                                filterHoverClass,
                                isChecked && filterActiveClass
                              )}
                            >
                              <input
                                type="checkbox"
                                className="h-4 w-4 accent-foreground"
                                checked={isChecked}
                                onChange={() => toggleDraftDirection(direction.id)}
                              />
                              <span>{direction.title}</span>
                            </label>
                          );
                        })}

                        <button
                          type="button"
                          className="mt-1 cursor-pointer rounded-xl border-none bg-foreground px-[0.85rem] py-[0.7rem] text-sm font-semibold text-background"
                          onClick={applyDirections}
                        >
                          Применить
                        </button>
                      </motion.div>
                    )}

                    {filterPanel === 'price' && (
                      <motion.div
                        key="price"
                        className="flex flex-col gap-1"
                        initial={reducedMotion ? false : { opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reducedMotion ? undefined : { opacity: 0, x: -8 }}
                        transition={{ duration: reducedMotion ? 0 : 0.2 }}
                      >
                        <button
                          type="button"
                          className={cn(
                            'mb-1 inline-flex cursor-pointer items-center gap-[0.35rem] rounded-[0.65rem] border-none bg-transparent px-[0.65rem] py-2 text-[0.8125rem] font-semibold text-muted-foreground transition-colors duration-200',
                            filterHoverClass,
                            'hover:text-foreground'
                          )}
                          onClick={() => setFilterPanel('root')}
                        >
                          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                          Цена
                        </button>

                        {PRICE_OPTIONS.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            className={cn(
                              'flex w-full cursor-pointer items-center gap-[0.65rem] rounded-xl border-none bg-transparent px-[0.85rem] py-[0.7rem] text-left text-sm font-medium text-foreground transition-colors duration-200',
                              filterHoverClass,
                              priceRange === option.id && filterActiveClass
                            )}
                            onClick={() => {
                              setPriceRange(option.id);
                              setFilterPanel('root');
                            }}
                          >
                            {option.label}
                          </button>
                        ))}
                      </motion.div>
                    )}

                    {filterPanel === 'sort' && (
                      <motion.div
                        key="sort"
                        className="flex flex-col gap-1"
                        initial={reducedMotion ? false : { opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reducedMotion ? undefined : { opacity: 0, x: -8 }}
                        transition={{ duration: reducedMotion ? 0 : 0.2 }}
                      >
                        <button
                          type="button"
                          className={cn(
                            'mb-1 inline-flex cursor-pointer items-center gap-[0.35rem] rounded-[0.65rem] border-none bg-transparent px-[0.65rem] py-2 text-[0.8125rem] font-semibold text-muted-foreground transition-colors duration-200',
                            filterHoverClass,
                            'hover:text-foreground'
                          )}
                          onClick={() => setFilterPanel('root')}
                        >
                          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                          Сортировка
                        </button>

                        {SORT_OPTIONS.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            className={cn(
                              'flex w-full cursor-pointer items-center gap-[0.65rem] rounded-xl border-none bg-transparent px-[0.85rem] py-[0.7rem] text-left text-sm font-medium text-foreground transition-colors duration-200',
                              filterHoverClass,
                              sortBy === option.id && filterActiveClass
                            )}
                            onClick={() => {
                              setSortBy(option.id);
                              setFilterPanel('root');
                            }}
                          >
                            {option.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <label className="relative min-w-[10rem] max-w-[28rem] flex-1 max-[47.99em]:max-w-none">
            <Search
              className="pointer-events-none absolute left-[0.9rem] top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="search"
              className="w-full rounded-full border border-black/[0.12] bg-background py-[0.7rem] pl-10 pr-4 text-sm text-foreground outline-none transition-[border-color] duration-200 focus:border-black/[0.28]"
              placeholder="Поиск услуги"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </label>
        </div>

        <div
          className="inline-flex shrink-0 items-center gap-1 rounded-full border border-black/[0.12] bg-background p-[0.2rem] max-[47.99em]:self-end"
          role="group"
          aria-label="Вид каталога"
        >
          <button
            type="button"
            className={cn(
              'inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-muted-foreground transition-[background-color,color] duration-200 [&_svg]:h-4 [&_svg]:w-4',
              'hover:bg-[color-mix(in_srgb,hsl(263_67%_83%),white_50%)] hover:text-foreground',
              viewMode === 'grid' &&
                'bg-[color-mix(in_srgb,hsl(263_67%_83%),white_50%)] text-foreground'
            )}
            onClick={() => setViewMode('grid')}
            aria-label="Сетка"
            aria-pressed={viewMode === 'grid'}
          >
            <LayoutGrid aria-hidden="true" />
          </button>
          <button
            type="button"
            className={cn(
              'inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-muted-foreground transition-[background-color,color] duration-200 [&_svg]:h-4 [&_svg]:w-4',
              'hover:bg-[color-mix(in_srgb,hsl(263_67%_83%),white_50%)] hover:text-foreground',
              viewMode === 'list' &&
                'bg-[color-mix(in_srgb,hsl(263_67%_83%),white_50%)] text-foreground'
            )}
            onClick={() => setViewMode('list')}
            aria-label="Список"
            aria-pressed={viewMode === 'list'}
          >
            <List aria-hidden="true" />
          </button>
        </div>
      </div>

      <p className="mb-5 text-sm text-muted-foreground [&_strong]:font-bold [&_strong]:text-foreground">
        Найдено: <strong>{filteredItems.length}</strong> из {allItems.length}
      </p>

      <div className="border-none bg-transparent p-0">
        {filteredItems.length === 0 ? (
          <p className="m-0 rounded-2xl border border-dashed border-black/[0.14] px-4 py-10 text-center text-[0.9375rem] text-muted-foreground">
            По вашему запросу ничего не найдено. Попробуйте изменить фильтры или поиск.
          </p>
        ) : (
          <ul className={catalogGridClass(viewMode)} role="list">
            {filteredItems.map(({ service, direction }, index) => (
              <motion.li
                key={`${direction.id}-${service.id}`}
                className="min-w-0"
                initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.35,
                  delay: reducedMotion ? 0 : Math.min(index * 0.03, 0.24),
                  ease: EASE,
                }}
              >
                <ServiceProductCard
                  service={service}
                  directionId={direction.id}
                  accent={direction.accent}
                  icon={direction.icon}
                  directionTitle={direction.title}
                  layout={viewMode}
                />
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ServicesCatalog;
