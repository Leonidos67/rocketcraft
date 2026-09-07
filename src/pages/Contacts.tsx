import { useState } from 'react';
import Footer from '@/components/Footer';
import PageActions from '@/components/PageActions';
import PageLoader from '@/components/PageLoader';
import BriefProgressBar from '@/components/BriefProgressBar';
import BriefStep from '@/components/BriefStep';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Send, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatBriefLeadMessage, sendTelegramLead } from '@/lib/telegramLead';

const Contacts = () => {
  // Step management
  const [currentStep, setCurrentStep] = useState(0); // Start at 0 to show initial button
  const totalSteps = 4; // Adjusted because we're combining initial view with step 1
  
  // Form data
  const [formData, setFormData] = useState({
    // Step 1: Problem identification
    problems: [] as string[],
    customProblem: '',
    
    // Step 2: Business context
    companySize: '',
    industry: '',
    geography: '',
    
    // Step 3: AI usage
    aiUsage: '', // 'yes' or 'no'
    aiUsageDetails: '',
    
    // Step 4: Goals and expectations
    mainGoal: '',
    urgency: '',
    budget: '',
    
    // Step 5: Contact details
    name: '',
    email: '',
    company: '',
    messenger: ''
  });
  
  // State for search input
  const [searchInput, setSearchInput] = useState('');
  
  // Handle moving to next step after problem selection
  const handleNextFromProblems = () => {
    // Move to step 1 (business context)
    setCurrentStep(1);
  };
  
  // Filter problems based on search input
  const filteredProblems = [
    'Нужен сайт / лендинг для точки',
    'Онлайн-запись и заявки с сайта',
    'Сайт есть, но не приводит клиентов',
    'Продажи и обработка лидов',
    'Поддержка клиентов (чат, звонки, заявки)',
    'Маркетинг и персонализация',
    'Контроль качества и ошибок',
    'Масштабирование без найма',
    'Внутренние процессы и рутина',
    'Аналитика и отчёты',
    'Экспертный ИИ / база знаний',
    'Другое',
  ].filter(problem => problem.toLowerCase().includes(searchInput.toLowerCase()));

  // Handle next step
  const handleNext = () => {
    // Validate current step before proceeding
    if (currentStep === 1 && (!formData.companySize || !formData.industry)) {
      toast.error('Пожалуйста, заполните обязательные поля');
      return;
    }
    
    if (currentStep === 2 && !formData.aiUsage) {
      toast.error('Пожалуйста, ответьте на вопрос об использовании ИИ');
      return;
    }
    
    if (currentStep === 3 && !formData.mainGoal) {
      toast.error('Пожалуйста, опишите вашу основную цель');
      return;
    }
    
    if (currentStep === 4 && (!formData.name || !formData.email)) {
      toast.error('Пожалуйста, заполните обязательные контактные данные');
      return;
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form
      handleSubmit();
    }
  };

  // Handle previous step
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle problem selection
  const handleProblemChange = (problem: string) => {
    setFormData(prev => {
      const newProblems = prev.problems.includes(problem)
        ? prev.problems.filter(p => p !== problem)
        : [...prev.problems, problem];
      
      // If 'Другое' is being deselected, clear the custom problem field
      if (problem === 'Другое' && prev.problems.includes('Другое')) {
        return { ...prev, problems: newProblems, customProblem: '' };
      }
      
      return { ...prev, problems: newProblems };
    });
  };

  // Handle form input changes
  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    toast.promise(sendTelegramLead(formatBriefLeadMessage(formData)), {
      loading: 'Отправка...',
      success: 'Спасибо! Ваш бриф успешно отправлен. Мы свяжемся с вами в ближайшее время.',
      error: 'Произошла ошибка при отправке. Пожалуйста, проверьте правильность введенных данных.',
    });
  };

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <p className="text-gray-600">
              Расскажите немного о вашем бизнесе, чтобы мы могли адаптировать решение под ваши нужды.
            </p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="companySize">Размер компании</Label>
                <Select value={formData.companySize} onValueChange={(value) => handleChange('companySize', value)}>
                  <SelectTrigger id="companySize" className="mt-1 h-12 rounded-3xl text-base">
                    <SelectValue placeholder="Выберите размер" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 rounded-3xl text-base">
                    <SelectItem value="1-10" className="rounded-xl my-1 focus:bg-gray-100 text-base py-3">1-10 сотрудников</SelectItem>
                    <SelectItem value="11-50" className="rounded-xl my-1 focus:bg-gray-100 text-base py-3">11-50 сотрудников</SelectItem>
                    <SelectItem value="51-200" className="rounded-xl my-1 focus:bg-gray-100 text-base py-3">51-200 сотрудников</SelectItem>
                    <SelectItem value="201-500" className="rounded-xl my-1 focus:bg-gray-100 text-base py-3">201-500 сотрудников</SelectItem>
                    <SelectItem value="500+" className="rounded-xl my-1 focus:bg-gray-100 text-base py-3">Более 500 сотрудников</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="industry">Отрасль</Label>
                <Select value={formData.industry} onValueChange={(value) => handleChange('industry', value)}>
                  <SelectTrigger id="industry" className="mt-1 h-12 rounded-3xl text-base">
                    <SelectValue placeholder="Выберите отрасль" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 rounded-3xl text-base">
                    <SelectItem value="retail" className="rounded-xl my-1 focus:bg-gray-100 text-base py-3">Розничная торговля</SelectItem>
                    <SelectItem value="manufacturing" className="rounded-xl my-1 focus:bg-gray-100 text-base py-3">Производство</SelectItem>
                    <SelectItem value="finance" className="rounded-xl my-1 focus:bg-gray-100 text-base py-3">Финансы</SelectItem>
                    <SelectItem value="healthcare" className="rounded-xl my-1 focus:bg-gray-100 text-base py-3">Здравоохранение</SelectItem>
                    <SelectItem value="education" className="rounded-xl my-1 focus:bg-gray-100 text-base py-3">Образование</SelectItem>
                    <SelectItem value="tech" className="rounded-xl my-1 focus:bg-gray-100 text-base py-3">Технологии</SelectItem>
                    <SelectItem value="other" className="rounded-xl my-1 focus:bg-gray-100 text-base py-3">Другое</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="geography">География</Label>
                <Input
                  id="geography"
                  value={formData.geography}
                  onChange={(e) => handleChange('geography', e.target.value)}
                  placeholder="Укажите страну/регион"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <p className="text-gray-600">
              Это поможет нам понять, насколько вы знакомы с ИИ-решениями и какие у вас есть ожидания.
            </p>
            
            <div className="space-y-4">
              <div>
                <Label>Используете ли вы ИИ сейчас?</Label>
                <RadioGroup 
                  value={formData.aiUsage} 
                  onValueChange={(value) => {
                    handleChange('aiUsage', value);
                    // Reset details when changing to 'no'
                    if (value === 'no') {
                      handleChange('aiUsageDetails', '');
                    }
                  }}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="ai-usage-yes" />
                    <Label htmlFor="ai-usage-yes">Да</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="ai-usage-no" />
                    <Label htmlFor="ai-usage-no">Нет</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {formData.aiUsage === 'yes' && (
                <div className="mt-4">
                  <Label htmlFor="aiUsageDetails">Если да — где именно?</Label>
                  <Textarea
                    id="aiUsageDetails"
                    value={formData.aiUsageDetails}
                    onChange={(e) => handleChange('aiUsageDetails', e.target.value)}
                    placeholder="Расскажите, где вы уже используете ИИ..."
                    className="mt-1"
                  />
                </div>
              )}
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <p className="text-gray-600">
              Поделитесь вашими целями и ожиданиями, чтобы мы могли предложить наиболее подходящее решение.
            </p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="mainGoal">Основная цель</Label>
                <Textarea
                  id="mainGoal"
                  value={formData.mainGoal}
                  onChange={(e) => handleChange('mainGoal', e.target.value)}
                  placeholder="Опишите вашу основную цель..."
                  rows={4}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="budget">Бюджетный ориентир (необязательно)</Label>
                <Select value={formData.budget} onValueChange={(value) => handleChange('budget', value)}>
                  <SelectTrigger id="budget" className="mt-1 h-12 rounded-3xl text-base">
                    <SelectValue placeholder="Выберите диапазон бюджета" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 rounded-3xl text-base">
                    <SelectItem value="under-50k" className="rounded-xl my-1 focus:bg-gray-100 text-base py-3">До 50 000 ₽</SelectItem>
                    <SelectItem value="50k-100k" className="rounded-xl my-1 focus:bg-gray-100 text-base py-3">50 000 - 100 000 ₽</SelectItem>
                    <SelectItem value="100k-250k" className="rounded-xl my-1 focus:bg-gray-100 text-base py-3">100 000 - 250 000 ₽</SelectItem>
                    <SelectItem value="250k-500k" className="rounded-xl my-1 focus:bg-gray-100 text-base py-3">250 000 - 500 000 ₽</SelectItem>
                    <SelectItem value="over-500k" className="rounded-xl my-1 focus:bg-gray-100 text-base py-3">Более 500 000 ₽</SelectItem>
                    <SelectItem value="prefer-not-to-say" className="rounded-xl my-1 focus:bg-gray-100 text-base py-3">Предпочитаю не указывать</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <p className="text-gray-600">
              Оставьте свои контакты, чтобы наш специалист мог связаться с вами и обсудить детали.
            </p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Имя *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Ваше имя"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="your@email.com"
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="company">Компания</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  placeholder="Название вашей компании"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="messenger">Мессенджер (необязательно)</Label>
                <Input
                  id="messenger"
                  value={formData.messenger}
                  onChange={(e) => handleChange('messenger', e.target.value)}
                  placeholder="Telegram, WhatsApp и т.д."
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white cursor-default">
      <PageLoader />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Заголовок */}
          <div className="mb-8 text-center animate-in fade-in slide-in-from-top-5 duration-700">
            <h1 className="cursor-default text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Короткий бриф
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Расскажите о вашем бизнесе и задачах — мы подберем подходящее ИИ-решение
            </p>
          </div>
          
          {/* Основной контент */}
          <div className="max-w-4xl mx-auto">
            {currentStep === 0 ? (
              // Initial screen with problem selection and button
              <div className="w-full max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-300">
                <Card className="p-6 md:p-8 bg-white border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md rounded-3xl">
                  <div className="space-y-6">
                              
                    <div>
                      <Label htmlFor="search-problem">Что вас интересует?</Label>
                      <Input
                        id="search-problem"
                        placeholder="Начните вводить, чтобы найти нужное..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="mt-1 bg-black/5"
                      />
                    </div>
                              
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {filteredProblems.map((problem) => (
                        <div
                          key={problem}
                          className={cn(
                            'relative p-3 border rounded-3xl cursor-pointer transition-all flex items-center',
                            formData.problems.includes(problem)
                              ? 'border-gray-900 bg-gray-50 shadow-sm'
                              : 'border-gray-200 hover:border-gray-300',
                          )}
                          onClick={() => handleProblemChange(problem)}
                        >
                          {formData.problems.includes(problem) && (
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-black rounded-full p-1">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                          )}
                          <span
                            className={cn(
                              'text-sm text-gray-900',
                              formData.problems.includes(problem) && 'font-medium',
                            )}
                          >
                            {problem}
                          </span>
                        </div>
                      ))}
                    </div>
                              
                    {formData.problems.includes('Другое') && (
                      <div className="pt-2">
                        <Label htmlFor="custom-problem">Уточните ваш вариант:</Label>
                        <Input
                          id="custom-problem"
                          placeholder="Введите ваш вариант..."
                          value={formData.customProblem || ''}
                          onChange={(e) => setFormData({...formData, customProblem: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                    )}
                              
                    <div className="pt-4 text-center">
                      <Button 
                        onClick={handleNextFromProblems}
                        disabled={formData.problems.length === 0}
                        className="flex-1 bg-black py-6 rounded-3xl text-white hover:bg-black/80 transition-all duration-200 hover:scale-[1.02] hover:shadow-md disabled:bg-black/60"
                      >
                        {formData.problems.length > 0 ? "Далее" : "Выберите проблему"}
                        {formData.problems.length > 0 && <ArrowRight className="w-4 h-4 ml-2" />}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ) : (
              // Steps 2-5 with BriefStep component (since step 1 is now combined with initial view)
              <>
                <BriefProgressBar 
                  currentStep={currentStep} 
                  totalSteps={totalSteps} 
                />
                          
                <BriefStep
                  title={
                    currentStep === 1 ? "Контекст бизнеса" :
                    currentStep === 2 ? "Использование ИИ" :
                    currentStep === 3 ? "Цель и ожидания" :
                    "Контактные данные" // 4
                  }
                  subtitle={
                    currentStep === 1 ? "Расскажите немного о вашем бизнесе" :
                    currentStep === 2 ? "Это поможет нам понять ваш опыт с ИИ" :
                    currentStep === 3 ? "Поделитесь своими целями и ожиданиями" :
                    "Оставьте контакты для связи" // 4
                  }
                  currentStep={currentStep}
                  totalSteps={totalSteps}
                  onNext={handleNext}
                  onBack={handleBack}
                  nextLabel={currentStep === totalSteps ? "Отправить" : "Далее"}
                  backLabel={currentStep <= 1 ? undefined : "Назад"}
                  showBackButton={currentStep > 0} // Show back button from step 1 onwards
                  nextDisabled={
                    (currentStep === 1 && (!formData.companySize || !formData.industry)) ||
                    (currentStep === 2 && !formData.aiUsage) ||
                    (currentStep === 3 && !formData.mainGoal) ||
                    (currentStep === 4 && (!formData.name || !formData.email))
                  }
                >
                  {renderStep()}
                </BriefStep>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
      <PageActions title="Контакты" />
    </div>
  );
};

export default Contacts;