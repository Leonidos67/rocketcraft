import type { EmployeeRangeId } from '@/lib/roiCalculator';

export const SKYSCRAPER_VIEWBOX = {
  width: 220,
  height: 290,
} as const;

export const SKYSCRAPER_WINDOW_COLS = 11;
export const SKYSCRAPER_WINDOW_ROWS = 10;

const FACADE = {
  x: 40,
  y: 42,
  width: 140,
  height: 188,
};

const MULLION = 1.1;

export const TREE_ICON_URL =
  'https://img.icons8.com/?size=100&id=AL7q948HWjdN&format=png&color=000000';

export const EMPLOYEE_ICON_URLS = [
  'https://img.icons8.com/?size=100&id=23347&format=png&color=000000',
  'https://img.icons8.com/?size=100&id=ejB0LoTBV7Gs&format=png&color=000000',
  'https://img.icons8.com/?size=100&id=przko8nKOK8D&format=png&color=000000',
  'https://img.icons8.com/?size=100&id=M7SHc6j8x8PI&format=png&color=000000',
  'https://img.icons8.com/?size=100&id=dxHnyxU0iDkL&format=png&color=000000',
  'https://img.icons8.com/?size=100&id=8JvGfx8rvus8&format=png&color=000000',
] as const;

const CELL_W = FACADE.width / SKYSCRAPER_WINDOW_COLS;
const CELL_H = FACADE.height / SKYSCRAPER_WINDOW_ROWS;

const WINDOW_COLUMN_CENTERS = Array.from(
  { length: SKYSCRAPER_WINDOW_COLS },
  (_, col) => FACADE.x + (col + 0.5) * CELL_W
);

const WINDOW_ROW_CENTERS = Array.from(
  { length: SKYSCRAPER_WINDOW_ROWS },
  (_, row) => FACADE.y + (row + 0.5) * CELL_H
);

export interface SkyscraperWindowSlot {
  id: string;
  row: number;
  col: number;
  x: number;
  y: number;
}

export const SKYSCRAPER_WINDOW_SLOTS: SkyscraperWindowSlot[] = WINDOW_ROW_CENTERS.flatMap(
  (y, row) =>
    WINDOW_COLUMN_CENTERS.map((x, col) => ({
      id: `${row}-${col}`,
      row,
      col,
      x,
      y,
    }))
);

export interface EmployeeWindowPlacement {
  slotId: string;
  x: number;
  y: number;
  icon: string;
}

export const shuffleWindowSlots = (seed: string) => {
  const result = [...SKYSCRAPER_WINDOW_SLOTS];
  let hash = 0;

  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  const random = () => {
    hash = (hash * 1664525 + 1013904223) >>> 0;
    return hash / 0xffffffff;
  };

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

export const buildEmployeePlacements = (
  employeeRangeId: EmployeeRangeId | null,
  iconCount: number
): EmployeeWindowPlacement[] => {
  if (!employeeRangeId || iconCount <= 0) return [];

  const shuffled = shuffleWindowSlots(employeeRangeId);
  const count = Math.min(iconCount, shuffled.length);

  return shuffled.slice(0, count).map((slot, index) => ({
    slotId: slot.id,
    x: slot.x,
    y: slot.y,
    icon: EMPLOYEE_ICON_URLS[index % EMPLOYEE_ICON_URLS.length],
  }));
};

export const SKYSCRAPER_ICON_SIZE = CELL_W * 0.68;

export const SKYSCRAPER_COLORS = {
  accent: '#6b46c1',
  window: '#b9d4f7',
  facade: '#fafafa',
  mullion: '#ffffff',
  ground: '#f1f5f9',
  tree: '#4ade80',
  treeDark: '#22c55e',
  shadow: 'rgba(15,23,42,0.08)',
} as const;

export const getWindowRect = (row: number, col: number) => ({
  x: FACADE.x + col * CELL_W + MULLION / 2,
  y: FACADE.y + row * CELL_H + MULLION / 2,
  width: CELL_W - MULLION,
  height: CELL_H - MULLION,
});

export const SKYSCRAPER_BUILDING = {
  facade: FACADE,
  roof: { x: 36, y: 34, width: 148, height: 7 },
  entrance: { x: 96, y: 232, width: 28, height: 22 },
  awning: { x: 92, y: 228, width: 36, height: 5 },
};

/** Декор у основания — деревья. */
export const LANDSCAPE_IMAGES = [
  { x: 48, y: 252, width: 16, height: 22 },
  { x: 68, y: 258, width: 12, height: 16 },
  { x: 158, y: 252, width: 16, height: 22 },
  { x: 138, y: 258, width: 12, height: 16 },
] as const;
