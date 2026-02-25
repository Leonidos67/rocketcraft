"use client"

import { useEffect, useRef } from "react"
import createGlobe, { COBEOptions } from "cobe"
import { useMotionValue, useSpring } from "motion/react"
import { cn } from "@/lib/utils"

const MOVEMENT_DAMPING = 1400

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.95, 0.95, 0.95], // Светлый фон
  markerColor: [0.8, 0.1, 0.1], // Насыщенный красный для России
  glowColor: [0.05, 0.05, 0.05],
  
  markers: [
    // === МОСКВА И МОСКОВСКАЯ ОБЛАСТЬ (7 точек) ===
    { location: [55.7558, 37.6173], size: 0.18 }, // Центр Москвы - самая большая
    { location: [55.7517, 37.6178], size: 0.06 }, // Кремль
    { location: [55.7737, 37.6032], size: 0.05 }, // МГУ/Воробьевы горы
    { location: [55.7942, 37.7000], size: 0.05 }, // Сокольники
    { location: [55.7047, 37.6208], size: 0.04 }, // Третьяковская
    { location: [55.7340, 37.6260], size: 0.05 }, // Арбат
    { location: [55.8075, 37.6380], size: 0.04 }, // ВДНХ
    
    // Московская область (окрестности)
    { location: [55.9100, 37.7300], size: 0.04 }, // Мытищи
    { location: [55.6570, 37.9500], size: 0.03 }, // Подольск
    { location: [55.9000, 37.4300], size: 0.03 }, // Зеленоград
    { location: [55.5800, 37.2700], size: 0.03 }, // Видное
    
    // === САНКТ-ПЕТЕРБУРГ И ЛЕНИНГРАДСКАЯ ОБЛАСТЬ (6 точек) ===
    { location: [59.9343, 30.3351], size: 0.15 }, // Центр Питера - вторая по величине
    { location: [59.9400, 30.3130], size: 0.06 }, // Эрмитаж/Дворцовая
    { location: [59.9311, 30.3609], size: 0.05 }, // Невский проспект
    { location: [59.9533, 30.3167], size: 0.04 }, // Петропавловская крепость
    { location: [59.9722, 30.3256], size: 0.04 }, // Смольный
    { location: [59.8472, 30.2567], size: 0.04 }, // Пулково/юг города
    
    // Ленинградская область
    { location: [59.5667, 30.1167], size: 0.03 }, // Гатчина
    { location: [60.0500, 30.4500], size: 0.03 }, // Всеволожск
    
    // === КРУПНЫЕ ГОРОДА РОССИИ ===
    // Приволжский ФО
    { location: [56.3287, 44.002], size: 0.07 }, // Нижний Новгород
    { location: [55.7963, 49.1082], size: 0.07 }, // Казань
    { location: [53.1959, 50.1002], size: 0.06 }, // Самара
    { location: [54.7388, 55.9721], size: 0.05 }, // Уфа
    
    // Уральский ФО
    { location: [56.8389, 60.6057], size: 0.08 }, // Екатеринбург
    { location: [55.154, 61.4291], size: 0.05 }, // Челябинск
    
    // Сибирский ФО
    { location: [54.9833, 82.8964], size: 0.08 }, // Новосибирск
    { location: [55.0415, 82.9346], size: 0.05 }, // Новосибирск-2
    { location: [56.0153, 92.8932], size: 0.06 }, // Красноярск
    { location: [52.2978, 104.2964], size: 0.05 }, // Иркутск
    
    // Дальневосточный ФО
    { location: [43.1155, 131.8855], size: 0.05 }, // Владивосток
    
    // Южный ФО
    { location: [47.2357, 39.7015], size: 0.05 }, // Ростов-на-Дону
    { location: [45.0355, 38.9753], size: 0.05 }, // Краснодар
    
    // === ОДНА ТОЧКА В США (ВЫДЕЛЕННАЯ) ===
    { 
      location: [40.7128, -74.0060], // Нью-Йорк
      size: 0.09, // Крупная точка
      color: [0.1, 0.3, 0.8] // СИНИЙ цвет для США (отличие от красных российских)
    },
    
    // === ДОПОЛНИТЕЛЬНЫЕ ТОЧКИ ДЛЯ ПЛОТНОСТИ ===
    { location: [51.5331, 46.0342], size: 0.03 }, // Саратов
    { location: [58.0105, 56.2502], size: 0.04 }, // Пермь
    { location: [57.1522, 65.5272], size: 0.03 }, // Тюмень
    { location: [53.3617, 83.7636], size: 0.03 }, // Барнаул
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  let phi = 0
  let width = 0
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "none"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }

    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phi += 0.005
        state.phi = phi + rs.get()
        state.width = width * 2
        state.height = width * 2
      },
    })

    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0)

    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [rs, config])

  return (
    <div
      className={cn(
        "relative mx-auto aspect-[1/1] w-full max-w-[900px]",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
      
    </div>
  )
}