import React from 'react';
import { images } from '../assets';

const LoaderPopup: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/40 backdrop-blur-md">
      <img
        src={images.logo}
        alt="Tarya Loader Logo"
        className="h-16 w-16 animate-logo-spin"
        style={{ filter: 'drop-shadow(0 4px 24px #22c55e88)' }}
      />
      <style>{`
        @keyframes logo-spin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        .animate-logo-spin {
          animation: logo-spin 1s linear infinite;
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default LoaderPopup; 