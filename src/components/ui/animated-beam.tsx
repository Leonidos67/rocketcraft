"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export interface AnimatedBeamProps {
  className?: string
  containerRef: React.RefObject<HTMLDivElement>
  fromRef: React.RefObject<HTMLDivElement>
  toRef: React.RefObject<HTMLDivElement>
  curvature?: number
  reverse?: boolean
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  delay?: number
  duration?: number
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}

export const AnimatedBeam = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 3,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) => {
  const idRef = useRef(`beam-${Math.random().toString(16).slice(2)}`)
  const pathRef = useRef<SVGPathElement>(null)
  const [pathD, setPathD] = useState("")
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const fromRect = fromRef.current.getBoundingClientRect()
        const toRect = toRef.current.getBoundingClientRect()

        const startX = fromRect.left - containerRect.left + fromRect.width / 2 + startXOffset
        const startY = fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset
        const endX = toRect.left - containerRect.left + toRect.width / 2 + endXOffset
        const endY = toRect.top - containerRect.top + toRect.height / 2 + endYOffset

        const midX = (startX + endX) / 2
        const midY = (startY + endY) / 2

        const dx = endX - startX
        const dy = endY - startY
        const distance = Math.sqrt(dx * dx + dy * dy)

        const curvatureOffset = distance * curvature

        const cpx1 = midX - (dy / distance) * curvatureOffset
        const cpy1 = midY + (dx / distance) * curvatureOffset

        const path = `M ${startX} ${startY} Q ${cpx1} ${cpy1} ${endX} ${endY}`

        setPathD(path)
        setSvgDimensions({
          width: containerRect.width,
          height: containerRect.height,
        })
      }
    }

    updatePath()

    const resizeObserver = new ResizeObserver(() => {
      updatePath()
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    window.addEventListener("resize", updatePath)
    window.addEventListener("scroll", updatePath, true)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", updatePath)
      window.removeEventListener("scroll", updatePath, true)
    }
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset])

  return (
    <svg
      ref={pathRef}
      className={cn("pointer-events-none absolute left-0 top-0 transform-gpu stroke-2", className)}
      width={svgDimensions.width}
      height={svgDimensions.height}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={`${idRef.current}-gradient`}
          gradientUnits="userSpaceOnUse"
          x1="0%"
          x2="0%"
          y1="0%"
          y2="100%"
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" offset="0%" />
          <stop stopColor={gradientStartColor} stopOpacity="1" offset="100%" />
        </linearGradient>
        <linearGradient
          id={`${idRef.current}-gradient-stop`}
          gradientUnits="userSpaceOnUse"
          x1="0%"
          x2="0%"
          y1="0%"
          y2="100%"
        >
          <stop stopColor={gradientStopColor} stopOpacity="1" offset="0%" />
          <stop stopColor={gradientStopColor} stopOpacity="0" offset="100%" />
        </linearGradient>
        <filter id={`${idRef.current}-glow`}>
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {pathD && (
        <>
          <path
            d={pathD}
            stroke={pathColor}
            strokeWidth={pathWidth}
            strokeOpacity={pathOpacity}
            strokeLinecap="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={pathD}
            stroke={`url(#${idRef.current}-gradient)`}
            strokeWidth={pathWidth}
            strokeOpacity="1"
            strokeLinecap="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
            filter={`url(#${idRef.current}-glow)`}
          >
            <animate
              attributeName="d"
              values={pathD}
              dur={`${duration}s`}
              repeatCount="indefinite"
              begin={`${delay}s`}
            />
          </path>
          <circle r="2.5" fill={gradientStopColor}>
            <animateMotion
              dur={`${duration}s`}
              repeatCount="indefinite"
              begin={`${delay}s`}
              path={pathD}
              keyPoints={reverse ? "1;0" : "0;1"}
              keyTimes="0;1"
              calcMode="linear"
            />
          </circle>
        </>
      )}
    </svg>
  )
}

