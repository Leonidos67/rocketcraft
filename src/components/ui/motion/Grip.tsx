import { AnimatePresence, motion, useAnimation } from 'motion/react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const circles = [
  { cx: 19, cy: 5 },
  { cx: 12, cy: 5 },
  { cx: 19, cy: 12 },
  { cx: 5, cy: 5 },
  { cx: 12, cy: 12 },
  { cx: 19, cy: 19 },
  { cx: 5, cy: 12 },
  { cx: 12, cy: 19 },
  { cx: 5, cy: 19 },
];

interface GripProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
  unstyled?: boolean;
  animateOnMount?: boolean;
  className?: string;
}

const Grip = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = 'currentColor',
  unstyled = false,
  animateOnMount = false,
  className,
  ...props
}: GripProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (!animateOnMount) return;

    const runMountAnimation = async () => {
      await controls.start((i) => ({
        opacity: 0.2,
        scale: 0.6,
        transition: { delay: i * 0.04, duration: 0.15 },
      }));
      await controls.start((i) => ({
        opacity: 1,
        scale: 1,
        transition: { delay: i * 0.04, duration: 0.2 },
      }));
    };

    void runMountAnimation();
  }, [animateOnMount, controls]);

  useEffect(() => {
    if (!isHovered) return;

    const animateCircles = async () => {
      await controls.start((i) => ({
        opacity: 0.3,
        transition: { delay: i * 0.1, duration: 0.2 },
      }));
      await controls.start((i) => ({
        opacity: 1,
        transition: { delay: i * 0.1, duration: 0.2 },
      }));
    };

    void animateCircles();
  }, [isHovered, controls]);

  const svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(unstyled && className)}
      {...props}
    >
      <AnimatePresence>
        {circles.map((circle, index) => (
          <motion.circle
            key={`${circle.cx}-${circle.cy}`}
            cx={circle.cx}
            cy={circle.cy}
            r="1"
            initial={animateOnMount ? { opacity: 0, scale: 0.6 } : { opacity: 1, scale: 1 }}
            animate={controls}
            custom={index}
          />
        ))}
      </AnimatePresence>
    </svg>
  );

  if (unstyled) {
    return svg;
  }

  return (
    <span
      className={cn('inline-flex items-center justify-center', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {svg}
    </span>
  );
};

export { Grip };
