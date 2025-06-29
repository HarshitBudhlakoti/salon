import React from 'react';

interface LoaderPopupProps {
  logoUrl: string;
}

const LoaderPopup: React.FC<LoaderPopupProps> = ({ logoUrl }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <img src={logoUrl} alt="Loading..." className="w-20 h-20 animate-flip" />
    </div>
  );
};

export default LoaderPopup; 