import React from 'react';

interface ClaimButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const ClaimButton: React.FC<ClaimButtonProps> = ({ children, className = '', ...props }) => (
  <button
    className={`px-3 py-1 rounded-md text-white text-xs font-mono font-semibold shadow-lg border-none outline-none transition hover:brightness-110 active:scale-95 overflow-hidden animate-greenpulse animate-btnpulse claim-slantline ${className}`}
    style={{
      background: 'linear-gradient(90deg, #22c55e, #16a34a, #4ade80, #22c55e)',
      backgroundSize: '300% 300%',
      boxShadow: '0 2px 12px 0 #22c55e80, 0 1.5px 0 #fff inset',
      WebkitBackdropFilter: 'blur(2px)',
      backdropFilter: 'blur(2px)',
      position: 'absolute',
      ...props.style,
    }}
    {...props}
  >
    <span style={{ position: 'relative', zIndex: 2 }}>{children}</span>
    <style>{`
      @keyframes greenpulse {
        0% { background-position: 0% 50%; filter: brightness(1); }
        20% { filter: brightness(1.15); }
        50% { background-position: 100% 50%; filter: brightness(1.25); }
        80% { filter: brightness(1.15); }
        100% { background-position: 0% 50%; filter: brightness(1); }
      }
      .animate-greenpulse {
        animation: greenpulse 2.5s ease-in-out infinite;
      }
      @keyframes btnpulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.08); }
      }
      .animate-btnpulse {
        animation: btnpulse 1.8s cubic-bezier(0.4,0,0.2,1) infinite;
      }
      .claim-slantline::before {
        content: '';
        position: absolute;
        left: -40%;
        top: 0;
        width: 60%;
        height: 100%;
        background: linear-gradient(120deg, transparent 40%, #bbf7d0 50%, transparent 60%);
        opacity: 0.7;
        z-index: 1;
        transform: skewX(-20deg);
        animation: slantline-move 2s linear infinite;
        pointer-events: none;
      }
      @keyframes slantline-move {
        0% { left: -40%; }
        100% { left: 100%; }
      }
    `}</style>
  </button>
);

export default ClaimButton; 