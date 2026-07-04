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

type FilterPanel = 'root' | 'direction' | 'price' | 'sort';
type ViewMode = 'grid' | 'list';
type PriceRange = 'all' | 'budget' | 'mid' | 'premium';
type SortBy = 'default' | 'price-asc' | 'price-desc' | 'name';

const PRICE_OPTIONS: { id: PriceRange; label: string }[] = [
  { id: 'all', label: 'Любая цена' },
  { id: 'budget', label: 'До 40 000 ₽' },
  { id: 'mid', label: '40 000 – 80 000 ₽' },
  { id: 'premium', label: 'От 80 000 ₽' },
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
    <div className="services-catalog">
      <div className="services-catalog__toolbar">
        <div className="services-catalog__toolbar-left">
          <div className="services-catalog__filter-wrap" ref={filterRef}>
            <button
              type="button"
              className={cn(
                'services-catalog__filter-btn',
                filterOpen && 'services-catalog__filter-btn--active'
              )}
              onClick={openFilter}
              aria-expanded={filterOpen}
              aria-haspopup="dialog"
            >
              <SlidersHorizontal className="services-catalog__filter-btn-icon" aria-hidden="true" />
              Фильтры
              {activeFilterCount > 0 && (
                <span className="services-catalog__filter-badge">{activeFilterCount}</span>
              )}
            </button>

            <AnimatePresence>
              {filterOpen && (
                <motion.div
                  className="services-catalog__filter-panel"
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
                        className="services-catalog__filter-screen"
                        initial={reducedMotion ? false : { opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reducedMotion ? undefined : { opacity: 0, x: 8 }}
                        transition={{ duration: reducedMotion ? 0 : 0.2 }}
                      >
                        <button
                          type="button"
                          className="services-catalog__filter-row"
                          onClick={openDirectionPanel}
                        >
                          <span>
                            <span className="services-catalog__filter-row-label">Направление</span>
                            <span className="services-catalog__filter-row-value">{directionLabel}</span>
                          </span>
                          <ChevronRight className="services-catalog__filter-chevron" aria-hidden="true" />
                        </button>

                        <button
                          type="button"
                          className="services-catalog__filter-row"
                          onClick={() => setFilterPanel('price')}
                        >
                          <span>
                            <span className="services-catalog__filter-row-label">Цена</span>
                            <span className="services-catalog__filter-row-value">
                              {PRICE_OPTIONS.find((option) => option.id === priceRange)?.label}
                            </span>
                          </span>
                          <ChevronRight className="services-catalog__filter-chevron" aria-hidden="true" />
                        </button>

                        <button
                          type="button"
                          className="services-catalog__filter-row"
                          onClick={() => setFilterPanel('sort')}
                        >
                          <span>
                            <span className="services-catalog__filter-row-label">Сортировка</span>
                            <span className="services-catalog__filter-row-value">
                              {SORT_OPTIONS.find((option) => option.id === sortBy)?.label}
                            </span>
                          </span>
                          <ChevronRight className="services-catalog__filter-chevron" aria-hidden="true" />
                        </button>

                        <label className="services-catalog__filter-check">
                          <input
                            type="checkbox"
                            checked={discountOnly}
                            onChange={(event) => setDiscountOnly(event.target.checked)}
                          />
                          <span>Только со скидкой</span>
                        </label>

                        <button
                          type="button"
                          className="services-catalog__filter-reset"
                          onClick={resetFilters}
                        >
                          Сбросить фильтры
                        </button>
                      </motion.div>
                    )}

                    {filterPanel === 'direction' && (
                      <motion.div
                        key="direction"
                        className="services-catalog__filter-screen"
                        initial={reducedMotion ? false : { opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reducedMotion ? undefined : { opacity: 0, x: -8 }}
                        transition={{ duration: reducedMotion ? 0 : 0.2 }}
                      >
                        <button
                          type="button"
                          className="services-catalog__filter-back"
                          onClick={() => setFilterPanel('root')}
                        >
                          <ChevronLeft className="services-catalog__filter-chevron" aria-hidden="true" />
                          Направление
                        </button>

                        <button
                          type="button"
                          className={cn(
                            'services-catalog__filter-option',
                            draftDirections.length === 0 && 'services-catalog__filter-option--active'
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
                                'services-catalog__filter-option',
                                isChecked && 'services-catalog__filter-option--active'
                              )}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleDraftDirection(direction.id)}
                              />
                              <span>{direction.title}</span>
                            </label>
                          );
                        })}

                        <button
                          type="button"
                          className="services-catalog__filter-apply"
                          onClick={applyDirections}
                        >
                          Применить
                        </button>
                      </motion.div>
                    )}

                    {filterPanel === 'price' && (
                      <motion.div
                        key="price"
                        className="services-catalog__filter-screen"
                        initial={reducedMotion ? false : { opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reducedMotion ? undefined : { opacity: 0, x: -8 }}
                        transition={{ duration: reducedMotion ? 0 : 0.2 }}
                      >
                        <button
                          type="button"
                          className="services-catalog__filter-back"
                          onClick={() => setFilterPanel('root')}
                        >
                          <ChevronLeft className="services-catalog__filter-chevron" aria-hidden="true" />
                          Цена
                        </button>

                        {PRICE_OPTIONS.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            className={cn(
                              'services-catalog__filter-option',
                              priceRange === option.id && 'services-catalog__filter-option--active'
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
                        className="services-catalog__filter-screen"
                        initial={reducedMotion ? false : { opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reducedMotion ? undefined : { opacity: 0, x: -8 }}
                        transition={{ duration: reducedMotion ? 0 : 0.2 }}
                      >
                        <button
                          type="button"
                          className="services-catalog__filter-back"
                          onClick={() => setFilterPanel('root')}
                        >
                          <ChevronLeft className="services-catalog__filter-chevron" aria-hidden="true" />
                          Сортировка
                        </button>

                        {SORT_OPTIONS.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            className={cn(
                              'services-catalog__filter-option',
                              sortBy === option.id && 'services-catalog__filter-option--active'
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

          <label className="services-catalog__search">
            <Search className="services-catalog__search-icon" aria-hidden="true" />
            <input
              type="search"
              className="services-catalog__search-input"
              placeholder="Поиск услуги"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </label>
        </div>

        <div className="services-catalog__view-modes" role="group" aria-label="Вид каталога">
          <button
            type="button"
            className={cn(
              'services-catalog__view-btn',
              viewMode === 'grid' && 'services-catalog__view-btn--active'
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
              'services-catalog__view-btn',
              viewMode === 'list' && 'services-catalog__view-btn--active'
            )}
            onClick={() => setViewMode('list')}
            aria-label="Список"
            aria-pressed={viewMode === 'list'}
          >
            <List aria-hidden="true" />
          </button>
        </div>
      </div>

      <p className="services-catalog__meta">
        Найдено: <strong>{filteredItems.length}</strong> из {allItems.length}
      </p>

      <div className="services-catalog__panel">
        {filteredItems.length === 0 ? (
          <p className="services-catalog__empty">
            По вашему запросу ничего не найдено. Попробуйте изменить фильтры или поиск.
          </p>
        ) : (
          <ul
            className={cn(
              'services-product-grid',
              viewMode === 'list' && 'services-product-grid--list'
            )}
            role="list"
          >
            {filteredItems.map(({ service, direction }, index) => (
              <motion.li
                key={`${direction.id}-${service.id}`}
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
