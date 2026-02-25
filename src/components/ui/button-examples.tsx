import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { Button } from "@/components/ui/button"
import { EnhancedButton } from "@/components/ui/enhanced-button"

export function ButtonExamples() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Примеры кнопок</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Standard Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Стандартные кнопки</h3>
            <div className="flex flex-wrap gap-3">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
            </div>
          </div>
          
          {/* Enhanced Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Улучшенные кнопки</h3>
            <div className="flex flex-wrap gap-3">
              <EnhancedButton>Default</EnhancedButton>
              <EnhancedButton variant="secondary">Secondary</EnhancedButton>
              <EnhancedButton variant="destructive">Destructive</EnhancedButton>
              <EnhancedButton variant="outline">Outline</EnhancedButton>
            </div>
          </div>
          
          {/* Interactive Hover Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Интерактивные кнопки</h3>
            <div className="flex flex-wrap gap-3">
              <InteractiveHoverButton>Default</InteractiveHoverButton>
              <InteractiveHoverButton variant="secondary">Secondary</InteractiveHoverButton>
              <InteractiveHoverButton variant="destructive">Destructive</InteractiveHoverButton>
              <InteractiveHoverButton variant="outline">Outline</InteractiveHoverButton>
            </div>
          </div>
          
          {/* Shimmer Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shimmer кнопки</h3>
            <div className="flex flex-wrap gap-3">
              <ShimmerButton>Shimmer</ShimmerButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}