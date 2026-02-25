"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export default function AnimatedListDemo({
  className,
}: {
  className?: string
}) {
  const items = [
    {
      name: "Email",
      description: "Отправляйте электронные письма своим клиентам",
      time: "2мин назад",
    },
    {
      name: "SMS",
      description: "Отправляйте SMS своим клиентам",
      time: "5мин назад",
    },
    {
      name: "Push",
      description: "Отправляйте push-уведомления своим клиентам",
      time: "10мин назад",
    },
    {
      name: "Webhook",
      description: "Отправляйте веб-ссылки своим клиентам",
      time: "15мин назад",
    },
  ]

  const [visibleItems, setVisibleItems] = useState<typeof items>([])
  const [animationTrigger, setAnimationTrigger] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setVisibleItems((prev) => {
          if (prev.length < items.length) {
            return items.slice(0, prev.length + 1)
          } else {
            clearInterval(intervalRef.current!)
            return prev
          }
        })
        setAnimationTrigger((prev) => prev + 1)
      }, 1000)
    }

    startInterval()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <div
      className={cn(
        "relative max-h-[400px] min-h-[400px] transform overflow-hidden",
        className
      )}
    >
      <div className="flex flex-col">
        {items.map((item, idx) => {
          const isVisible = idx < visibleItems.length
          return (
            <div
              key={item.name}
              className={cn(
                "mb-4 flex transform rounded-lg border bg-white p-4 shadow-lg transition-all duration-500 ease-in-out",
                {
                  "translate-x-0 opacity-100": isVisible,
                  "translate-x-[-100%] opacity-0": !isVisible,
                }
              )}
              style={{
                transitionDelay: `${idx * 0.1}s`,
              }}
            >
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <h3 className="text-sm font-medium text-neutral-700">
                    {item.name}
                  </h3>
                </div>
                <p className="text-xs text-neutral-500">{item.description}</p>
              </div>
              <div className="text-xs text-neutral-500">{item.time}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

