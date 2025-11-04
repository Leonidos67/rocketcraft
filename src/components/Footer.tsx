import { Send, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Rocket } from '@/components/ui/motion/Rocket';
import { Globe } from '@/components/ui/globe';

const Footer = () => {
  return (
    <footer className="border-t border-border pt-12 pb-0 bg-black">
      <div className="px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Rocket width={32} height={32} stroke="currentColor" className="text-foreground" />
              <span className="text-2xl font-bold text-foreground">Rocket Craft</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Автоматизация бизнеса через no-code решения
            </p>
            <div className="flex gap-4">
              <a
                href="https://t.me/rocketcraft"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5 text-foreground" />
              </a>
              <a
                href="https://instagram.com/rocketcraft"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-foreground" />
              </a>
              <a
                href="https://linkedin.com/company/rocketcraft"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-foreground" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4" style={{ color: 'white' }}>Услуги</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="hover:text-foreground transition-colors cursor-pointer">Telegram-боты</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">CRM-системы</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Автоматизация</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Интеграции</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4" style={{ color: 'white' }}>Компания</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/cases" className="hover:text-foreground transition-colors">
                  Кейсы
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-foreground transition-colors">
                  Тарифы
                </Link>
              </li>
              <li>
                <Link to="/process" className="hover:text-foreground transition-colors">
                  Процесс
                </Link>
              </li>
              {/* <li>
                <Link to="/contacts" className="hover:text-foreground transition-colors">
                  Контакты
                </Link>
              </li> */}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4" style={{ color: 'white' }}>Контакты</h4>
            <p className="text-muted-foreground">+7 (999) 123-45-67</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4">
        <div className="relative flex size-full max-w-2xl mx-auto items-center justify-center overflow-hidden min-h-[500px]">
          <Globe className="top-16" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
