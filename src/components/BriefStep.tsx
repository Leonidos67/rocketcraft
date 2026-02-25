import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface BriefStepProps {
  title: string;
  subtitle?: string;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  backLabel?: string;
  showBackButton?: boolean;
  children: React.ReactNode;
}

const BriefStep = ({
  title,
  subtitle,
  currentStep,
  totalSteps,
  onNext,
  onBack,
  nextDisabled = false,
  nextLabel = 'Далее',
  backLabel = 'Назад',
  showBackButton = true,
  children
}: BriefStepProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-300">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 animate-in slide-in-from-bottom-4 duration-500">{title}</h2>
        {subtitle && <p className="text-lg text-gray-600 animate-in slide-in-from-bottom-4 duration-500 delay-100">{subtitle}</p>}
      </div>
      
      <Card className="p-6 md:p-8 bg-white border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md rounded-3xl">
        <div className="animate-in fade-in duration-300">
          {children}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-100 animate-in slide-in-from-bottom-4 duration-500 delay-200">
          {showBackButton && (
            <Button
              variant="outline"
              onClick={onBack}
              className="flex-1 transition-all py-6 duration-200 hover:scale-[1.02] rounded-3xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {backLabel}
            </Button>
          )}
          
          <Button
            onClick={onNext}
            disabled={nextDisabled}
            className="flex-1 bg-black py-6 rounded-3xl text-white hover:bg-black/80 transition-all duration-200 hover:scale-[1.02]"
          >
            {nextLabel}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BriefStep;