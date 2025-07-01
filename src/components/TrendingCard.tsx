import React, { useEffect, useRef } from 'react';

interface TrendingCardProps {
  videoUrl: string;
  title: string;
}

const TrendingCard: React.FC<TrendingCardProps> = ({ videoUrl, title }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoUrl || !videoRef.current) return;
    if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = videoUrl;
    } else {
      import('hls.js').then(HlsModule => {
        const Hls = HlsModule.default;
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(videoUrl);
          hls.attachMedia(videoRef.current!);
          return () => hls.destroy();
        }
      });
    }
  }, [videoUrl]);

  return (
    <div className="flex flex-col items-center bg-white rounded-xl shadow-md overflow-hidden border border-pink-100 min-w-[200px] max-w-[240px] w-[65vw] h-[260px] md:w-[220px] md:h-[320px]">
      <div className="w-full h-full relative">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ background: '#eee' }}
        />
        {/* Black gradient overlay at bottom for text readability */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/80 to-transparent z-10" />
        {/* Title text over video, bottom center */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 w-[90%] flex justify-center">
          <span className="text-white text-sm md:text-base font-semibold text-center drop-shadow-md line-clamp-2">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard; 