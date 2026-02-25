import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Brain, Zap, Database, Cpu, FileText, MessageSquare, Wrench, Rocket, Sparkles, ChevronRight, TrendingUp, Clock, Shield, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { MorphingText } from "@/components/ui/MorphingText"
import Beams from '@/components/Beams'; // Импортируем компонент Beams

const Trend = () => {

  // Technologies data
  const technologies = [
    {
      title: "Fine-tuning LLM",
      description: "Дообучение больших языковых моделей (например, GPT, Claude) под ваш контекст.",
      icon: <Brain className="w-8 h-8 text-blue-500" />
    },
    {
      title: "RAG (Retrieval-Augmented)",
      description: "Система, которая заставляет ИИ всегда искать ответы в ваших актуальных документах.",
      icon: <FileText className="w-8 h-8 text-purple-500" />
    },
    {
      title: "Computer Vision",
      description: "Для анализа изображений и видео (как в кейсе с оборудованием).",
      icon: <MessageSquare className="w-88 h-8 text-pink-500" />
    },
    {
      title: "Интеграция через API",
      description: "Соединение с любыми внешними сервисами и базами данных.",
      icon: <Cpu className="w-8 h-8 text-indigo-500" />
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "У нас мало данных для обучения. Это возможно?",
      answer: "Да. Мы используем техники симуляции данных и обучение на небольших, но качественных выборках."
    },
    {
      question: "Кто будет поддерживать систему после запуска?",
      answer: "Мы предоставляем техподдержку, мониторинг и план регулярных улучшений."
    },
    {
      question: "Как происходит интеграция с системами?",
      answer: "Мы разрабатываем гибкие API-интерфейсы, которые позволяют интегрировать наш ИИ с вашими текущими CRM, ERP и другими корпоративными системами."
    }
  ];

  // Trend stats
  const trendStats = [
    { icon: <TrendingUp className="w-6 h-6" />, value: "78%", label: "компаний планируют внедрить кастомный ИИ в 2026" },
    { icon: <Clock className="w-6 h-6" />, value: "300%", label: "экономии времени на рутинных задачах" },
    { icon: <Shield className="w-6 h-6" />, value: "3.5x", label: "рост конверсии при персонализации" },
    { icon: <BarChart className="w-6 h-6" />, value: "$15B", label: "рынок кастомных ИИ-решений к 2027" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="seymour-one-regular h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-gradient-to-br from-gray-900 via-black to-gray-900 text-foreground" style={{scrollbarWidth: 'thin', scrollbarColor: '#4f46e5 #1f2937'}}>
      
      {/* Abstract Background Elements - фиксированные */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent" />
        <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[100px]" />
        <div className="absolute bottom-1/4 -left-64 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[100px]" />
      </div>
      
      {/* Simple Logo only - фиксированный */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 px-6 py-6 pointer-events-none"
      >
        <div className="max-w-6xl mx-auto text-center">
          <Link to="/" className="inline-block pointer-events-auto">
            <div className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors">
              <span className="font-display font-bold text-xl tracking-wider">SmartAI</span>
            </div>
          </Link>
        </div>
      </motion.div>
      
      {/* Content wrapper с snap-секциями */}
      <div className="relative z-10">
        
        {/* Слайд 1: Hero */}
        <section className="snap-start h-screen flex items-center justify-center overflow-hidden relative">
          {/* Beams Background */}
          <div className="absolute inset-0 w-full h-full opacity-60">
            <Beams
              beamWidth={3}
              beamHeight={30}
              beamNumber={20}
              lightColor="#3b82f6"
              speed={2}
              noiseIntensity={1.75}
              scale={0.2}
              rotation={30}
            />
          </div>
          
          <div className="max-w-8xl mx-auto px-6 text-center relative z-10 w-full">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Left Column - MorphingText */}
              <div className="w-full lg:w-3/5 flex flex-col items-start" style={{ minHeight: '450px' }}>
                <Badge className="mb-8 bg-gradient-to-r from-blue-500 via-blue-800 to-blue-500 border-blue-500/30 text-white px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest backdrop-blur-md">
                  <Sparkles className="w-3 h-3 mr-2 inline-block" />
                  ТРЕНД 2026: КАСТОМИЗИРОВАННЫЙ ИИ
                </Badge>
                <div className="mb-8 w-full">
                  <MorphingText 
                    texts={["Стандарт — в прошлом", "ИИ — ваше будущее"]} 
                    className="w-full text-4xl md:text-6xl lg:text-7xl font-bold text-white seymour-one-regular text-center"
                  />
                </div>
                
                <p className="mt-8 text-xl md:text-2xl text-gray-400 font-light leading-relaxed backdrop-blur-sm bg-black/20 p-6 rounded-3xl text-left">
                  2026 год — переломный момент. Компании, которые используют готовые решения, проигрывают тем, кто строит свой ИИ. 
                  Мы создаем нейросети, которые знают ваш бизнес лучше, чем вы думаете.
                </p>
              </div>
              
              {/* Right Column - Stats and Buttons */}
              <div className="w-full lg:w-2/5 flex flex-col items-center">
                {/* Trend Stats in two rows */}
                <div className="grid grid-cols-2 gap-6 mb-12 w-full">
                  {trendStats.slice(0, 2).map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="text-center backdrop-blur-sm bg-black/20 p-6 rounded-2xl"
                    >
                      <div className="flex justify-center mb-3 text-blue-400">
                        {stat.icon}
                      </div>
                      <div className="text-2xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-6 w-full mb-12">
                  {trendStats.slice(2, 4).map((stat, i) => (
                    <motion.div
                      key={i + 2}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="text-center backdrop-blur-sm bg-black/20 p-6 rounded-2xl"
                    >
                      <div className="flex justify-center mb-3 text-blue-400">
                        {stat.icon}
                      </div>
                      <div className="text-2xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center w-full">
                  <Button size="lg" className="rounded-full h-14 px-8 text-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 border-0 w-full sm:w-auto font-medium shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.7)] hover:scale-105">
                    Обсудить ваш проект
                    <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Индикатор прокрутки */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center">
              <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </section>

        {/* Слайд 2: Что такое кастомный ИИ */}
        <section className="snap-start h-screen flex items-center justify-center relative overflow-hidden">
          {/* Анимированный фон для этой секции */}
          <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <Beams
              beamWidth={2}
              beamHeight={20}
              beamNumber={10}
              lightColor="#8b5cf6"
              speed={1.5}
              noiseIntensity={1.5}
              scale={0.15}
              rotation={15}
            />
          </div>
          
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent seymour-one-regular">
                Что такое кастомный ИИ?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
                Это не просто чат-бот с вашим логотипом. Это полноценный искусственный интеллект, 
                обученный на ваших данных и адаптированный под ваш бизнес.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Обучение на ваших данных", 
                  description: "Мы обучаем модель на ваших переписках, документах, скриптах и базах знаний. Ваш ИИ говорит вашим языком и знает ваши продукты." 
                },
                { 
                  title: "Интеграция с системами", 
                  description: "Подключение к CRM, ERP, телефонии, мессенджерам и другим корпоративным системам. Автоматизация рабочих процессов." 
                },
                { 
                  title: "Эволюция со временем", 
                  description: "Система учится на новых данных и ситуациях, становясь умнее и точнее с каждым днем работы." 
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.1 }}
                  className="backdrop-blur-sm bg-black/20 p-8 rounded-3xl text-center hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1"
                >
                  <div className="text-5xl mb-6 text-blue-400">{index === 0 ? "📚" : index === 1 ? "⚙️" : "🚀"}</div>
                  <h3 className="text-xl font-bold mb-4 text-white">{item.title}</h3>
                  <p className="text-gray-400 font-light">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Слайд 3: Почему тренд */}
        <section className="snap-start h-screen flex items-center justify-center bg-black/40 relative overflow-hidden">
          {/* Анимированный фон для этой секции */}
          <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <Beams
              beamWidth={2}
              beamHeight={20}
              beamNumber={12}
              lightColor="#ec4899"
              speed={1.8}
              noiseIntensity={1.5}
              scale={0.15}
              rotation={-15}
            />
          </div>
          
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-800 to-purple-300 bg-clip-text text-transparent seymour-one-regular">
                Почему 2026 — год перемен
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                Три фактора, которые делают кастомный ИИ необходимостью
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Клиенты требуют персонализации", desc: "80% покупателей ожидают, что бренд знает их предпочтения. Шаблонные боты не справляются." },
                { title: "Рынок перенасыщен", desc: "Конкуренты уже автоматизируют рутину. Выигрывает тот, у кого уникальный клиентский опыт." },
                { title: "Технологии стали доступны", desc: "Раньше кастомный ИИ стоил миллионов. Сегодня — сопоставимо с зарплатой одного сотрудника." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.1 }}
                  className="backdrop-blur-sm bg-black/20 p-8 rounded-3xl text-center hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1"
                >
                  <div className="text-5xl mb-6 text-blue-400">{i === 0 ? "👥" : i === 1 ? "⚡" : "📱"}</div>
                  <h3 className="text-xl font-bold mb-4 text-white">{item.title}</h3>
                  <p className="text-gray-400 font-light">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Слайд 4: Сравнение */}
        <section className="snap-start h-screen flex items-center justify-center relative overflow-hidden">
          {/* Анимированный фон для этой секции */}
          <div className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
            <Beams
              beamWidth={2}
              beamHeight={25}
              beamNumber={15}
              lightColor="#3b82f6"
              speed={1.2}
              noiseIntensity={1.5}
              scale={0.2}
              rotation={0}
            />
          </div>
          
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
              className="text-center mb-12 seymour-one-regular"
            >
              <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent seymour-one-regular">
              
                Готовые боты
                <span className="text-white"> vs. </span>
                Ваш ИИ
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                Разница, которую вы почувствуете с первого дня
              </motion.p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="glass-card p-10 rounded-3xl"
              >
                <div className="w-16 h-16 rounded-2xl bg-gray-800/50 flex items-center justify-center mb-8 border border-gray-700">
                  <X className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold mb-8 text-gray-200">Шаблонные решения</h3>
                <ul className="space-y-6">
                  {[
                    "Вы подстраиваетесь под бота, а не под клиента",
                    "Работают с общими, а не вашими данными",
                    "Решают только простые задачи",
                    "Сложно интегрировать в ваши процессы"
                  ].map((text, i) => (
                    <li key={i} className="flex items-start text-gray-400 font-light">
                      <div className="mt-1 mr-4 w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                        <X className="w-3 h-3 text-red-400" />
                      </div>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="glass-card neon-border p-10 rounded-3xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[50px] -z-10" />
                <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-8 border border-blue-500/30">
                  <Check className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-8 text-white">Кастомизированный ИИ</h3>
                <ul className="space-y-6">
                  {[
                    "ИИ подстраивается под логику вашего бизнеса",
                    "Обучается на ваших данных и базе знаний",
                    "Решает сложные задачи",
                    "Создает ваше конкурентное преимущество"
                  ].map((text, i) => (
                    <li key={i} className="flex items-start text-gray-200 font-light">
                      <div className="mt-1 mr-4 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-blue-400" />
                      </div>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Слайд 6: Кейсы */}
        <section className="snap-start h-screen flex items-center justify-center relative overflow-hidden">
          {/* Анимированный фон для этой секции */}
          <div className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
            <Beams
              beamWidth={2}
              beamHeight={25}
              beamNumber={15}
              lightColor="#ec4899"
              speed={1.8}
              noiseIntensity={1.5}
              scale={0.2}
              rotation={-15}
            />
          </div>
          
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-200 bg-clip-text text-transparent seymour-one-regular">
                Уже работает в 2026
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                Примеры того, как кастомный ИИ меняет бизнес
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <MessageSquare className="w-8 h-8 text-blue-400" />, title: "ИИ-менеджер по продажам", desc: "Ведет диалог с клиентом, выявляет потребности, формирует коммерческое предложение.", result: "+35% конверсии, окупился за 2 месяца" },
                { icon: <FileText className="w-8 h-8 text-purple-400" />, title: "Юридический ассистент", desc: "Анализирует договоры, находит риски, готовит проекты документов.", result: "12 часов экономии в день" },
                { icon: <Wrench className="w-8 h-8 text-indigo-400" />, title: "Техподдержка оборудования", desc: "По фото определяет неисправность и дает инструкцию по ремонту.", result: "70% обращений без инженера" },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.1 }}
                  className="backdrop-blur-sm bg-black/20 p-8 rounded-3xl group hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1"
                >
                  <div className="mb-6 bg-gray-800/50 w-16 h-16 rounded-2xl flex items-center justify-center border border-gray-700 group-hover:scale-110 transition-all">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">{item.title}</h3>
                  <p className="text-gray-400 font-light leading-relaxed mb-4">{item.desc}</p>
                  <div className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium">
                    {item.result}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Слайд 7: Технологии */}
        <section className="snap-start h-screen flex items-center justify-center bg-black/40 relative overflow-hidden">
          {/* Анимированный фон для этой секции */}
          <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <Beams
              beamWidth={2}
              beamHeight={20}
              beamNumber={12}
              lightColor="#3b82f6"
              speed={1.5}
              noiseIntensity={1.5}
              scale={0.15}
              rotation={30}
            />
          </div>
          
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Технологии, которые мы используем</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                Не просто модные слова, а работающие инструменты
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {technologies.map((tech, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.1 }}
                  className="backdrop-blur-sm bg-black/20 p-8 rounded-3xl text-center hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1"
                >
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-2xl bg-gray-800/50 border border-gray-700">
                      {tech.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-white">{tech.title}</h3>
                  <p className="text-sm text-gray-400 font-light">{tech.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Слайд 8: FAQ */}
        <section className="snap-start h-screen flex items-center justify-center relative overflow-hidden">
          {/* Анимированный фон для этой секции */}
          <div className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
            <Beams
              beamWidth={2}
              beamHeight={20}
              beamNumber={10}
              lightColor="#8b5cf6"
              speed={1.2}
              noiseIntensity={1.5}
              scale={0.15}
              rotation={-15}
            />
          </div>
          
          <div className="max-w-8xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Ответы на вопросы</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                То, что вы хотели спросить, но стеснялись
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-8 rounded-2xl"
                >
                  <h3 className="text-xl font-bold mb-4 text-blue-100 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-400 font-light leading-relaxed pl-5 border-l border-gray-800">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Слайд 9: Финальный CTA */}
        <section className="snap-start h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-900/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
          
          {/* Анимированный фон для этой секции */}
          <div className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
            <Beams
              beamWidth={3}
              beamHeight={30}
              beamNumber={20}
              lightColor="#3b82f6"
              speed={2}
              noiseIntensity={1.75}
              scale={0.2}
              rotation={30}
            />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-6xl mx-auto px-6 text-center relative z-10"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
              Будьте в тренде 2026 <br /><span className="text-6xl md:text-8xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">с нашим ИИ</span>
            </h2>
            {/* <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light">
              Не отставайте от конкурентов. Обсудите с нами, какой ИИ нужен именно вашему бизнесу.
            </p> */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full h-16 px-10 text-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 border-0 shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.7)] hover:scale-105">
                Получить консультацию
                <Rocket className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Trend;