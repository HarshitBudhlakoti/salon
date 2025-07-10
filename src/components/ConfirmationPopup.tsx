import React, { useEffect } from 'react';

interface ConfirmationPopupProps {
  message: string;
  onClose: () => void;
  logoUrl?: string;
  type?: 'success' | 'error' | 'info';
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({ message, onClose, logoUrl, type = 'success' }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center max-w-xs w-full">
        {logoUrl && (
          <img src={logoUrl} alt="Popup Logo" className="w-16 h-16 mb-4" />
        )}
        <h2 className={`text-xl font-bold mb-2 text-center ${type === 'success' ? 'text-green-700' : type === 'error' ? 'text-red-600' : 'text-gray-700'}`}>{type === 'success' ? 'Thank you!' : type === 'error' ? 'Error' : 'Notice'}</h2>
        <p className="text-gray-700 mb-6 text-center">{message}</p>
        <button onClick={onClose} className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold shadow hover:from-green-600 hover:to-green-800 transition-all">OK</button>
      </div>
    </div>
  );
};

interface SubPackagePopupProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const SubPackagePopup: React.FC<SubPackagePopupProps> = ({ open, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} bg-black/30 backdrop-blur-sm`}
    >
      <div className={`relative bg-white rounded-2xl shadow-2xl px-6 py-8 w-full max-w-md mx-4 transition-all duration-300 transform ${open ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'} max-h-[90vh] min-h-[60vh] overflow-y-auto`}>
        <button
          onClick={onClose}
          className="absolute left-4 top-4 text-gray-500 hover:text-green-600 text-2xl font-bold focus:outline-none"
          aria-label="Back"
        >
          &#8592;
        </button>
        <div className="pt-6">{children}</div>
      </div>
    </div>
  );
};

export default ConfirmationPopup; 