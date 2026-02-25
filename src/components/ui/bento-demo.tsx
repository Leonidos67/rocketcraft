"use client"

import { Calendar, FileText, Bell, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { AnimatedBeamMultipleOutputDemo } from "@/components/ui/animated-beam-demo"
import AnimatedListDemo from "@/components/ui/animated-list-demo"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import Marquee from "@/components/ui/marquee"

const files = [
  {
    name: "смета.pdf",
    body: "Цены и работы актуализиуются на день расчета. Наименование работ и материалов Ед.изм., объем работ, цена и стомость.",
  },
  {
    name: "финансы.xlsx",
    body: "Электронная таблица или рабочий лист - это файл, состоящий из строк и столбцов, которые помогают сортировать данные, легко упорядочивать их и вычислять числовые показатели.",
  },
  {
    name: "лого.svg",
    body: "Масштабируемая векторная графика - это расширяемый формат векторных изображений на основе языка разметки для двумерной графики с поддержкой интерактивности и анимации.",
  },
  {
    name: "фото.gpg",
    body: "Ключи GPG используются для шифрования и расшифровки электронной почты, файлов, каталогов и целых разделов диска, а также для проверки подлинности сообщений.",
  },
  {
    name: "файл.txt",
    body: "Начальная фраза, начальная фраза для восстановления или начальная фраза для резервного копирования - это список слов, в которых хранится вся информация, необходимая для восстановления биткойн-средств по цепочке.",
  },
]

const features = [
  {
    Icon: FileText,
    name: "Сохраняйте ваши файлы",
    description: "Автоматическое сохранение важных файлов в защищенной базе данных.",
    href: "#",
    cta: "Подробнее",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:20s]"
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-black">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: Bell,
    name: "Уведомления",
    description: "Получайте уведомления, когда что-то происходит.",
    href: "#",
    cta: "Подробнее",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedListDemo className="absolute top-4 right-2 h-[300px] w-full scale-75 border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90" />
    ),
  },
  {
    Icon: Share2,
    name: "Интеграции",
    description: "Поддерживаем более 20 интеграций и подсчетов.",
    href: "#",
    cta: "Подробнее",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute top-4 right-2 h-[300px] border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-105" />
    ),
  },
  {
    Icon: Calendar,
    name: "Ведение клиентов",
    description: "Используем наши решения, чтобы фильтровать ваши данные.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Подробнее",
    background: (
      <CalendarComponent
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute top-10 right-0 origin-top scale-75 rounded-md border [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90"
      />
    ),
  },
]

export function BentoDemo() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  )
}

