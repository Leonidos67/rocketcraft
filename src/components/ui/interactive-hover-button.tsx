import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

export function InteractiveHoverButton({
  children,
  className,
  variant = "default",
  ...props
}: InteractiveHoverButtonProps) {
  // Определяем стили в зависимости от варианта
  const variantStyles = {
    default: "bg-primary text-primary-foreground border-primary hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/80",
    destructive: "bg-destructive text-destructive-foreground border-destructive hover:bg-destructive/90",
    outline: "bg-background text-foreground border-input hover:bg-accent",
  }

  return (
    <button
      className={cn(
        "interactive-hover-btn group relative w-auto cursor-pointer overflow-hidden rounded-lg border h-8 px-4 text-center font-medium transition-all duration-300",
        variantStyles[variant],
        "shadow-md hover:shadow-lg",
        "transform hover:-translate-y-0.5",
        "text-sm",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div className="dot-element bg-current h-2 w-2 rounded-full transition-all duration-300 group-hover:opacity-0"></div>
        <span className="inline-block transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
        <span className="transition-transform duration-300 group-hover:translate-x-1">{children}</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </button>
  )
}