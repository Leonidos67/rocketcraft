import React, { ComponentPropsWithoutRef, CSSProperties } from "react"

import { cn } from "@/lib/utils"

export interface ShimmerButtonProps extends ComponentPropsWithoutRef<"button"> {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  className?: string
  children?: React.ReactNode
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ShimmerButtonProps
>(
  (
    {
      shimmerColor = "#6366f1", // indigo-500
      shimmerSize = "0.05em",
      shimmerDuration = "2s",
      borderRadius = "0.5rem", // 8px
      background = "rgba(99, 102, 241, 0.1)", // indigo-500 with opacity
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden [border-radius:var(--radius)] border border-indigo-500/20 px-4 py-1.5 whitespace-nowrap [background:var(--bg)]",
          "text-indigo-600 dark:text-indigo-400 font-medium",
          "shadow-sm hover:shadow-md",
          "transform transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:translate-y-px",
          "h-8 text-sm",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}

        {/* Highlight */}
        <div
          className={cn(
            "absolute inset-0 size-full",
            "rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-6px_8px_rgba(99,102,241,0.1)]",
            // transition
            "transform-gpu transition-all duration-300 ease-in-out",
            // on hover
            "group-hover:shadow-[inset_0_-6px_8px_rgba(99,102,241,0.2)]",
            // on click
            "group-active:shadow-[inset_0_-8px_8px_rgba(99,102,241,0.2)]"
          )}
        />

        {/* backdrop */}
        <div
          className={cn(
            "absolute [inset:var(--cut)] -z-20 [border-radius:var(--radius)] [background:var(--bg)]"
          )}
        />
      </button>
    )
  }
)

ShimmerButton.displayName = "ShimmerButton"