import React from "react";

interface SiriOrbProps {
  size?: string;
  className?: string;
  colors?: {
    bg?: string;
    c1?: string;
    c2?: string;
    c3?: string;
  };
  animationDuration?: number;
}

const SiriOrb: React.FC<SiriOrbProps> = ({
  size = "48px",
  className = "",
  colors = {},
  animationDuration = 20,
}) => {
  const {
    bg = "rgba(139, 92, 246, 0.3)",
    c1 = "#8b5cf6",
    c2 = "#ec4899",
    c3 = "#06b6d4",
  } = colors;

  return (
    <div
      className={`relative overflow-hidden rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: bg,
      }}
    >
      <div
        className="absolute inset-0 animate-spin"
        style={{
          background: `conic-gradient(
            from 0deg,
            ${c1} 0deg,
            ${c2} 120deg,
            ${c3} 240deg,
            ${c1} 360deg
          )`,
          animationDuration: `${animationDuration}s`,
          filter: "blur(2px)",
          opacity: 0.8,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(
            from 120deg,
            ${c2} 0deg,
            ${c3} 120deg,
            ${c1} 240deg,
            ${c2} 360deg
          )`,
          animation: `spin-reverse ${animationDuration * 0.8}s linear infinite`,
          filter: "blur(2px)",
          opacity: 0.6,
        }}
      />
      <style>{`
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
};

export default SiriOrb;

