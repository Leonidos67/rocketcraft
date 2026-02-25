import { Progress } from '@/components/ui/progress';

interface BriefProgressBarProps {
  currentStep: number;
  totalSteps: number;
  showPercentage?: boolean;
}

const BriefProgressBar = ({ currentStep, totalSteps, showPercentage = true }: BriefProgressBarProps) => {
  const progress = Math.round((currentStep / totalSteps) * 100);
  
  return (
    <div className="w-full mb-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Шаг {currentStep} из {totalSteps}
        </span>
        {showPercentage && (
          <span className="text-sm font-medium text-gray-700">
            {progress}%
          </span>
        )}
      </div>
      <Progress value={progress} className="h-2.5 rounded-full" />
    </div>
  );
};

export default BriefProgressBar;