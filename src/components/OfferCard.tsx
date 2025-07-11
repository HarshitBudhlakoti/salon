import React, { useRef } from 'react';
import ClaimButton from './ClaimButton';

interface OfferCardProps {
  text: string;
  percent?: string;
  highlightColor?: string;
  videoUrl?: string;
  thumbnail?: string;
  price?: string;
  originalPrice?: string;
  className?: string;
}

const OfferCard: React.FC<OfferCardProps> = ({ text, videoUrl, thumbnail, price = '₹499', originalPrice = '₹999', className = '' }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <div className={`relative flex items-end px-0 py-0 rounded-lg shadow-md border border-gray-200 min-w-[180px] max-w-[220px] h-[120px] overflow-visible bg-black ${className}`}>
      {/* Background video for mobile/tablet */}
      {videoUrl && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover rounded-lg z-0 md:hidden"
          autoPlay
          loop
          muted
          playsInline
          src={videoUrl}
        />
      )}
      {/* Background image for desktop */}
      {thumbnail && (
        <img
          src={thumbnail}
          alt="Offer thumbnail"
          className="absolute inset-0 w-full h-full object-cover rounded-lg z-0 hidden md:block"
        />
      )}
      {/* Overlay for readability */}
      {(videoUrl || thumbnail) && <div className="absolute inset-0 bg-black/40 rounded-lg z-10" />}
      {/* Content */}
      <div className="relative z-20 flex flex-col items-start h-full w-full px-3 py-2">
        <span className="font-bold text-white mb-1 text-xs text-left break-words whitespace-normal" style={{ maxWidth: '70%', wordBreak: 'break-word' }}>
          {text}
        </span>
        <div className='flex flex-col'>
        <span className="font-extrabold text-white text-base">{price}</span>
        <span className="text-gray-300 text-xs line-through mb-4">{originalPrice}</span>
        </div>
        <ClaimButton className="absolute right-3 bottom-3">
          Claim Now
        </ClaimButton>
      </div>
    </div>
  );
};

export default OfferCard; 