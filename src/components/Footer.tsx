import { Rocket, Send, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Rocket className="w-8 h-8" />
              <span className="text-2xl font-bold">Rocket Craft</span>
            </div>
            <p className="text-primary-foreground/80">
              Автоматизация бизнеса через no-code решения
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Услуги</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Telegram-боты</li>
              <li>CRM-системы</li>
              <li>Автоматизация</li>
              <li>Интеграции</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Компания</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#cases" className="hover:text-primary-foreground transition-colors">Кейсы</a></li>
              <li><a href="#pricing" className="hover:text-primary-foreground transition-colors">Тарифы</a></li>
              <li><a href="#process" className="hover:text-primary-foreground transition-colors">Процесс</a></li>
              <li><a href="#contacts" className="hover:text-primary-foreground transition-colors">Контакты</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Контакты</h4>
            <p className="text-primary-foreground/80 mb-2">hello@rocket-craft.ru</p>
            <p className="text-primary-foreground/80 mb-4">+7 (999) 123-45-67</p>
            <div className="flex gap-4">
              <a
                href="https://t.me/rocketcraft"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/rocketcraft"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/rocketcraft"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
          <p>© 2025 Rocket Craft. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
