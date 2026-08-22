import { useState } from 'react';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { servicesDropdownItems } from '@/data/headerServicesMenu';
import { formatHeaderLeadMessage, sendTelegramLead } from '@/lib/telegramLead';

const CONTROL_TRIGGER =
  'h-auto w-full rounded-full border border-black/[0.12] bg-background px-4 py-[0.7rem] text-sm font-semibold text-foreground shadow-none transition-[background-color,border-color] duration-200 hover:border-black/[0.22] hover:bg-[hsl(0_0%_96%)] focus:ring-0 focus:ring-offset-0 data-[placeholder]:text-muted-foreground';

const SELECT_CONTENT =
  'rounded-2xl border border-black/10 bg-background p-2 shadow-[0_18px_48px_hsl(0_0%_0%_/_0.12)]';

const SELECT_ITEM =
  'cursor-pointer rounded-xl py-3 pl-8 pr-[0.85rem] text-sm font-semibold text-foreground transition-colors duration-200 focus:bg-[color-mix(in_srgb,hsl(263_67%_83%),white_50%)] data-[highlighted]:bg-[color-mix(in_srgb,hsl(263_67%_83%),white_50%)] data-[state=checked]:bg-[hsl(263_67%_83%)]';

export type LeadSaasExample = {
  id: string;
  title: string;
  brand?: string;
};

interface LeadRequestFormProps {
  onSuccess?: () => void;
  className?: string;
  saasExample?: LeadSaasExample;
}

const LeadRequestForm = ({ onSuccess, className, saasExample }: LeadRequestFormProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !phone.trim() || !serviceId) {
      toast.error('Заполните имя, телефон и выберите услугу');
      return;
    }

    const service = servicesDropdownItems.find((item) => item.id === serviceId);
    if (!service) {
      toast.error('Выберите услугу из списка');
      return;
    }

    setIsSubmitting(true);

    try {
      await toast.promise(
        sendTelegramLead(
          formatHeaderLeadMessage({
            name: name.trim(),
            phone: phone.trim(),
            serviceLabel: service.label,
            saasExample,
          })
        ),
        {
          loading: 'Отправка...',
          success: 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.',
          error: 'Не удалось отправить заявку. Попробуйте ещё раз.',
        }
      );

      setName('');
      setPhone('');
      setServiceId('');
      onSuccess?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-4', className)}>
      <div className="space-y-2">
        <Label htmlFor="lead-name" className="text-sm font-semibold text-foreground">
          Имя <span className="text-destructive">*</span>
        </Label>
        <Input
          id="lead-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Как к вам обращаться"
          className={CONTROL_TRIGGER}
          autoComplete="name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lead-phone" className="text-sm font-semibold text-foreground">
          Телефон <span className="text-destructive">*</span>
        </Label>
        <Input
          id="lead-phone"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="+7 (___) ___-__-__"
          className={CONTROL_TRIGGER}
          autoComplete="tel"
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-semibold text-foreground">
          Услуга <span className="text-destructive">*</span>
        </Label>
        <Select value={serviceId || undefined} onValueChange={setServiceId}>
          <SelectTrigger className={CONTROL_TRIGGER}>
            <SelectValue placeholder="Выберите услугу" />
          </SelectTrigger>
          <SelectContent className={SELECT_CONTENT}>
            {servicesDropdownItems.map((item) => (
              <SelectItem key={item.id} value={item.id} className={SELECT_ITEM}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/[0.12] bg-foreground px-5 py-[0.7rem] text-sm font-semibold text-background transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
        {!isSubmitting ? <Send className="h-4 w-4" aria-hidden="true" /> : null}
      </button>

      <p className="text-center text-xs text-muted-foreground">
        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
      </p>
    </form>
  );
};

export default LeadRequestForm;
