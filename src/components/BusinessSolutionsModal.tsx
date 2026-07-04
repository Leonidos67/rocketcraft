import { useState } from 'react';
import { Building, Home } from 'lucide-react';

interface BusinessSolution {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TabContent {
  title: string;
  description: string;
  features: string[];
}

const businessSolutions: BusinessSolution[] = [
  {
    name: 'Апарт-отели и гостевые дома',
    icon: Home,
  },
  {
    name: 'Пункт 2',
    icon: Building,
  },
];

const tabContents: Record<string, TabContent[]> = {
  'Апарт-отели и гостевые дома': [
    {
      title: 'Решение 1.1',
      description: 'Описание первого решения',
      features: ['Особенность 1', 'Особенность 2', 'Особенность 3']
    },
    {
      title: 'Решение 1.2',
      description: 'Описание второго решения',
      features: ['Особенность 1', 'Особенность 2', 'Особенность 3']
    },
    {
      title: 'Решение 1.3',
      description: 'Описание третьего решения',
      features: ['Особенность 1', 'Особенность 2', 'Особенность 3']
    }
  ],
  'Пункт 2': [
    {
      title: 'Решение 2.1',
      description: 'Описание первого решения',
      features: ['Особенность 1', 'Особенность 2', 'Особенность 3']
    },
    {
      title: 'Решение 2.2',
      description: 'Описание второго решения',
      features: ['Особенность 1', 'Особенность 2', 'Особенность 3']
    },
    {
      title: 'Решение 2.3',
      description: 'Описание третьего решения',
      features: ['Особенность 1', 'Особенность 2', 'Особенность 3']
    }
  ]
};

interface BusinessSolutionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BusinessSolutionsModal = ({ isOpen, onClose }: BusinessSolutionsModalProps) => {
  const [activeTab, setActiveTab] = useState(businessSolutions[0].name);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-sm flex overflow-hidden p-4"
      onClick={onClose}
    >
      <div 
        className="relative bg-background border border-border rounded-3xl m-auto max-w-full w-full min-h-full overflow-hidden flex"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
        >
          ×
        </button>
        
        <div className="flex w-full min-h-full">
          {/* Left sidebar - Tabs */}
          <div className="w-86 border-r border-border bg-card flex-shrink-0 flex flex-col">
            <div className="p-6">
              {/* <h2 className="text-xl font-bold mb-4">Решения для бизнеса</h2> */}
              <nav className="space-y-2">
                {businessSolutions.map((solution, index) => {
                  const Icon = solution.icon;
                  const isActive = activeTab === solution.name;
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveTab(solution.name)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm">{solution.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Right panel - Content */}
          <div className="flex-1 bg-background overflow-y-auto">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">{activeTab}</h2>
              
              {/* Three blocks in a row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tabContents[activeTab]?.map((content, index) => (
                  <div 
                    key={index}
                    className="p-6 bg-card rounded-xl border border-border"
                  >
                    <h3 className="text-lg font-bold mb-2">{content.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{content.description}</p>
                    <ul className="space-y-2">
                      {content.features.map((feature, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5 text-xs">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSolutionsModal;