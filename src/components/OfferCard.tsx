import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import ClaimButton from './ClaimButton';

interface OfferCardProps {
  text: string;
  percent?: string;
  highlightColor?: string;
  videoUrl?: string;
  price?: string;
  originalPrice?: string;
}

const OfferCard: React.FC<OfferCardProps> = ({ text, videoUrl, price = '₹499', originalPrice = '₹999' }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoUrl || !videoRef.current) return;
    if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = videoUrl;
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(videoRef.current);
      return () => {
        hls.destroy();
      };
    }
  }, [videoUrl]);

  return (
    <div className="relative flex items-end px-0 py-0 rounded-lg shadow-md border border-gray-200 min-w-[180px] max-w-[220px] h-[120px] overflow-visible mr-4 bg-black">
      {/* Background video */}
      {videoUrl && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover rounded-lg z-0"
          autoPlay
          loop
          muted
          playsInline
        />
      )}
      {/* Overlay for readability */}
      {videoUrl && <div className="absolute inset-0 bg-black/40 rounded-lg z-10" />}
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