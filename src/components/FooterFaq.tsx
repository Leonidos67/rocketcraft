import { useState } from 'react';
import { servicesFaq } from '@/data/servicesCatalog';
import { siteSectionClass, pageSectionClass } from '@/lib/layoutStyles';
import { cn } from '@/lib/utils';

const footerStats = [
  { value: '3', label: 'Пакета сайтов' },
  { value: 'от 25к', label: 'Старт визитки' },
  { value: '2–3', label: 'Недели до запуска' },
  { value: '24/7', label: 'Заявки с сайта' },
];

const FooterFaq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section
      id="footer-faq"
      className={cn(siteSectionClass, pageSectionClass)}
      aria-labelledby="footer-faq-title"
    >
      <div className="bg-[hsl(263_67%_83%)] px-6 py-10 md:px-10 md:py-12 lg:px-16 lg:py-16">
        
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:items-start">
          {/* LEFT */}
          <header className="lg:sticky lg:top-8">
            <p className="mb-3 flex items-center gap-2 text-sm leading-[1.4] text-neutral-600">
              Узнайте нас лучше
            </p>

            <h2
              id="footer-faq-title"
              className="text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-foreground"
            >
              FAQ.
            </h2>
          </header>

          {/* RIGHT */}
          <div className="flex flex-col">
            {servicesFaq.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={item.q}
                  className="border-b border-black/10 first:border-t first:border-black/10"
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    aria-expanded={isOpen}
                    className={cn(
                      "flex w-full items-center justify-between gap-6 py-6 text-left text-[clamp(1rem,1.3vw,1.25rem)] font-semibold transition-opacity hover:opacity-70",
                      "after:text-2xl after:transition-transform",
                      isOpen ? 'after:content-["×"]' : 'after:content-["+"]'
                    )}
                  >
                    <span>{item.q}</span>
                  </button>

                  <div
                    className={cn(
                      "grid transition-all duration-300",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 max-w-[42rem] text-[clamp(0.95rem,1vw,1.05rem)] leading-7 text-neutral-600">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 border-t border-black/10 md:grid-cols-4">
          {footerStats.map((stat) => (
            <div
              key={stat.label}
              className={cn(
                'flex flex-col gap-[0.35rem] border-b border-black/10 p-[clamp(1.25rem,2.5vw,2rem)_clamp(1rem,2vw,1.75rem)]',
                'md:border-b-0 md:border-r md:last:border-r-0',
                'max-md:odd:border-r max-md:[&:nth-last-child(-n+2)]:border-b-0'
              )}
            >
              <p className="m-0 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-none tracking-[-0.03em] text-foreground">
                {stat.value}
              </p>
              <p className="m-0 text-[clamp(0.8125rem,1vw,0.9375rem)] leading-[1.45] text-neutral-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FooterFaq;
