import * as React from 'react';
import { DottedMap } from '@/components/ui/dotted-map';
import type { Marker } from '@/components/ui/dotted-map';
import { useIsMobile } from '@/hooks/use-mobile';

const MAP_WIDTH = 150;
const MAP_HEIGHT = 75;

type MapMarker = Marker & {
  overlay: {
    label: string;
    shortLabel?: string;
  };
};

const cityMarkers: MapMarker[] = [
  { lat: 55.7558, lng: 37.6173, size: 2.5, overlay: { label: 'Московская область (2)' } },
  { lat: 59.9343, lng: 30.3351, size: 2.3, overlay: { label: 'Санкт-Петербург (1)', shortLabel: 'СПб' }, },
  { lat: 44.3550, lng: 34.9753, size: 2.3, overlay: { label: 'Краснодарский край (1)', shortLabel: 'Краснодар' }, },
  // { lat: 57.8389, lng: 60.6057, size: 2.3, overlay: { label: 'Екатеринбург', shortLabel: 'Екб' } },
  // { lat: 55.0084, lng: 82.9357, size: 2.3, overlay: { label: 'Новосибирск' } },
  // { lat: 47.2357, lng: 39.7015, size: 2.3, overlay: { label: 'Ростов-на-Дону', shortLabel: 'Ростов' }, },
  // { lat: 51.672, lng: 39.1843, size: 2.3, overlay: { label: 'Воронеж' } },
];

const DottedMapSection = () => {
  const id = React.useId();
  const isMobile = useIsMobile();

  const markers = React.useMemo(
    () =>
      cityMarkers.map((marker) => ({
        ...marker,
        size: (marker.size ?? 2.3) * (isMobile ? 1.45 : 1),
      })),
    [isMobile]
  );

  const renderMarkerOverlay = React.useCallback(
    ({
      marker,
      x,
      y,
      r,
      index,
    }: {
      marker: MapMarker & { x: number; y: number };
      x: number;
      y: number;
      r: number;
      index: number;
    }) => {
      const label = isMobile
        ? (marker.overlay.shortLabel ?? marker.overlay.label)
        : marker.overlay.label;
      const clipId = `${id}-flag-clip-${index}`.replace(/:/g, '-');
      const imgR = r * (isMobile ? 0.58 : 0.48);
      const fontSize = r * (isMobile ? 0.82 : 0.72);
      const pillH = r * (isMobile ? 1.4 : 1.25);
      const pillPadX = r * (isMobile ? 0.68 : 0.6);
      const charWidth = fontSize * (isMobile ? 0.58 : 0.58);
      const pillW = label.length * charWidth + imgR * 2 + pillPadX * 2;
      const gap = r * (isMobile ? 0.32 : 0.35);

      const placeLeft = x + r + gap + pillW > MAP_WIDTH - 1;
      const placeAbove = y + pillH / 2 > MAP_HEIGHT - 1;

      const pillX = placeLeft ? x - r - gap - pillW : x + r + gap;
      const pillY = placeAbove ? y - r - gap - pillH : y - pillH / 2;
      const anchorY = placeAbove ? y - r - gap - pillH / 2 : y;
      const flagX = pillX + pillPadX;
      const textX = flagX + imgR * 2 + r * (isMobile ? 0.22 : 0.28);

      return (
        <g style={{ pointerEvents: 'none' }}>
          <rect
            x={pillX}
            y={pillY}
            width={pillW}
            height={pillH}
            rx={pillH / 2}
            fill="rgba(0,0,0,0.5)"
          />
          <clipPath id={clipId}>
            <circle cx={flagX + imgR} cy={anchorY} r={imgR} />
          </clipPath>
          <image
            href="https://flagcdn.com/w40/ru.webp"
            x={flagX}
            y={anchorY - imgR}
            width={imgR * 2}
            height={imgR * 2}
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${clipId})`}
          />
          <text
            x={textX}
            y={anchorY + fontSize * 0.32}
            fontSize={fontSize}
            fill="white"
          >
            {label}
          </text>
        </g>
      );
    },
    [id, isMobile]
  );

  return (
    <section className="w-full m-0" aria-label="География проектов">
      <div className="relative w-full h-auto aspect-[150/75] overflow-hidden rounded-none border-none bg-background touch-pan-y">
        <div
          className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_50%_50%,transparent_0%,hsl(var(--background)/0.08)_55%,hsl(var(--background)/0.72)_100%)] max-[47.99em]:bg-[radial-gradient(ellipse_at_50%_46%,transparent_0%,hsl(var(--background)/0.1)_42%,hsl(var(--background)/0.88)_100%)]"
          aria-hidden="true"
        />
        <DottedMap<MapMarker>
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          countries={['RUS']}
          markers={markers}
          dotColor="hsl(var(--foreground) / 0.2)"
          markerColor="transparent"
          dotRadius={isMobile ? 0.19 : 0.2}
          mapSamples={isMobile ? 4200 : 6500}
          renderMarkerOverlay={renderMarkerOverlay}
        />
      </div>
    </section>
  );
};

export default DottedMapSection;
