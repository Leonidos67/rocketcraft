import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { EmployeeRangeId } from '@/lib/roiCalculator';
import {
  buildEmployeePlacements,
  getWindowRect,
  LANDSCAPE_IMAGES,
  SKYSCRAPER_BUILDING,
  SKYSCRAPER_COLORS,
  SKYSCRAPER_VIEWBOX,
  SKYSCRAPER_WINDOW_COLS,
  SKYSCRAPER_WINDOW_ROWS,
  TREE_ICON_URL,
} from '@/data/roiCalculatorAssets';

const MotionG = motion.create('g');

interface SkyscraperSvgProps {
  employeeRange: EmployeeRangeId | null;
  iconCount: number;
  className?: string;
}

const SkyscraperSvg = ({ employeeRange, iconCount, className }: SkyscraperSvgProps) => {
  const placements = useMemo(
    () => buildEmployeePlacements(employeeRange, iconCount),
    [employeeRange, iconCount]
  );

  const placementBySlot = useMemo(
    () => new Map(placements.map((placement) => [placement.slotId, placement])),
    [placements]
  );

  const { facade, roof, entrance, awning } = SKYSCRAPER_BUILDING;
  const { width, height } = SKYSCRAPER_VIEWBOX;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label="Небоскрёб — визуализация команды"
    >
      <defs>
        {Array.from({ length: SKYSCRAPER_WINDOW_ROWS }, (_, row) =>
          Array.from({ length: SKYSCRAPER_WINDOW_COLS }, (_, col) => {
            const slotId = `${row}-${col}`;
            const rect = getWindowRect(row, col);
            return (
              <clipPath key={slotId} id={`roi-win-${slotId}`}>
                <rect x={rect.x} y={rect.y} width={rect.width} height={rect.height} rx={0.6} />
              </clipPath>
            );
          })
        )}
      </defs>

      <rect width={width} height={height} fill="#ffffff" />

      <ellipse
        cx={width / 2}
        cy={height - 8}
        rx={52}
        ry={6}
        fill={SKYSCRAPER_COLORS.shadow}
        opacity={0.35}
      />

      <rect
        x={facade.x - 4}
        y={roof.y}
        width={facade.width + 8}
        height={facade.height + (facade.y - roof.y) + 26}
        rx={2}
        fill={SKYSCRAPER_COLORS.facade}
      />

      <rect
        x={roof.x}
        y={roof.y}
        width={roof.width}
        height={roof.height}
        fill={SKYSCRAPER_COLORS.accent}
      />

      {Array.from({ length: SKYSCRAPER_WINDOW_ROWS }, (_, row) =>
        Array.from({ length: SKYSCRAPER_WINDOW_COLS }, (_, col) => {
          const slotId = `${row}-${col}`;
          const rect = getWindowRect(row, col);
          const isOccupied = placementBySlot.has(slotId);

          return (
            <rect
              key={slotId}
              x={rect.x}
              y={rect.y}
              width={rect.width}
              height={rect.height}
              rx={0.6}
              fill={isOccupied ? '#eef4fc' : SKYSCRAPER_COLORS.window}
            />
          );
        })
      )}

      <rect x={awning.x} y={awning.y} width={awning.width} height={awning.height} fill={SKYSCRAPER_COLORS.accent} />
      <rect
        x={entrance.x}
        y={entrance.y}
        width={entrance.width}
        height={entrance.height}
        fill="#e8eef5"
      />
      <line
        x1={entrance.x + entrance.width / 2}
        y1={entrance.y}
        x2={entrance.x + entrance.width / 2}
        y2={entrance.y + entrance.height}
        stroke="#dbe4ee"
        strokeWidth={0.5}
      />

      <g aria-hidden="true">
        {LANDSCAPE_IMAGES.map((item, index) => (
          <image
            key={`landscape-${index}`}
            href={TREE_ICON_URL}
            x={item.x - item.width / 2}
            y={item.y - item.height}
            width={item.width}
            height={item.height}
            preserveAspectRatio="xMidYMax meet"
          />
        ))}
      </g>

      <AnimatePresence mode="popLayout">
        {placements.map((placement, index) => {
          const [row, col] = placement.slotId.split('-').map(Number);
          const rect = getWindowRect(row, col);

          return (
            <MotionG
              key={`${employeeRange}-${placement.slotId}`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.24,
                delay: index * 0.01,
                ease: [0.22, 1, 0.36, 1],
              }}
              clipPath={`url(#roi-win-${placement.slotId})`}
            >
              <image
                href={placement.icon}
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
                preserveAspectRatio="xMidYMid meet"
              />
            </MotionG>
          );
        })}
      </AnimatePresence>
    </svg>
  );
};

export default SkyscraperSvg;
