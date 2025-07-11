import React, { useRef } from 'react';

interface TrendingCardProps {
  videoUrl: string;
  title: string;
}

const TrendingCard: React.FC<TrendingCardProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <div className="flex flex-col items-center bg-white rounded-xl shadow-md overflow-hidden border border-pink-100 min-w-[200px] max-w-[240px] w-[65vw] h-[260px] md:w-[220px] md:h-[320px]">
      <div className="w-full h-full relative">
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ background: '#eee' }}
        />
      </div>
    </div>
  );
};

export default TrendingCard; 