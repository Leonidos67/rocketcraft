import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    telegram: '',
    businessType: '',
    comment: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone) {
      toast.error('Заполните обязательные поля');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        telegram: '',
        businessType: '',
        comment: '',
      });
    }, 1000);
  };

  return (
    <section id="contacts">
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Имя <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Иван Иванов"
                className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Телефон <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+7 (___) ___-__-__"
                type="tel"
                className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Telegram
              </label>
              <Input
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                placeholder="@username"
                className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Тип бизнеса
              </label>
              <Select
                value={formData.businessType}
                onValueChange={(value) => setFormData({ ...formData, businessType: value })}
              >
                <SelectTrigger className="border-gray-300 focus:border-gray-900 focus:ring-gray-900">
                  <SelectValue placeholder="Выберите тип бизнеса" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cafe">Кафе и рестораны</SelectItem>
                  <SelectItem value="barber">Барбершопы и салоны</SelectItem>
                  <SelectItem value="fitness">Фитнес и спорт</SelectItem>
                  <SelectItem value="studio">Студии услуг</SelectItem>
                  <SelectItem value="retail">Розничная торговля</SelectItem>
                  <SelectItem value="other">Другое</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Комментарий
            </label>
            <Textarea
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              placeholder="Опишите ваш проект или задайте вопрос"
              rows={4}
              className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
            />
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gray-900 text-white hover:bg-gray-800 font-medium py-3 px-6 rounded-lg transition-all duration-200"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Отправка...
                </>
              ) : (
                <>
                  Отправить заявку
                  <Send className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;