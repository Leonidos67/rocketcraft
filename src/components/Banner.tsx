import React from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/trend');
  };

  return (
    <div className="relative top-0 left-0 right-0 z-30 bg-[#0087e8] text-pink-100 py-2 overflow-hidden cursor-pointer" onClick={handleClick}>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .marquee-container {
          display: flex;
          width: max-content;
          animation: marquee 45s linear infinite;
        }
        
        .marquee-item {
          margin: 0 16px;
          white-space: nowrap;
        }
      `}</style>
      
      <div className="marquee-container">
        {/* First set of messages */}
        <span className="marquee-item">Тренд 2026: Кастомизированные ИИ-автоматизации. Мы в тренде.</span>
        <span className="marquee-item">Тренд 2026: Кастомизированные ИИ-автоматизации. Мы в тренде.</span>
        <span className="marquee-item">Тренд 2026: Кастомизированные ИИ-автоматизации. Мы в тренде.</span>
        
        {/* Duplicate set for seamless looping */}
        <span className="marquee-item">Тренд 2026: Кастомизированные ИИ-автоматизации. Мы в тренде.</span>
        <span className="marquee-item">Тренд 2026: Кастомизированные ИИ-автоматизации. Мы в тренде.</span>
        <span className="marquee-item">Тренд 2026: Кастомизированные ИИ-автоматизации. Мы в тренде.</span>
      </div>
    </div>
  );
};

export default Banner;