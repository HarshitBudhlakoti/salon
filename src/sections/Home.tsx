import { useEffect, useState, useRef } from 'react';
import { videos, typingTexts, images } from '../assets';
import OfferCard from '../components/OfferCard';

export default function Home() {
  // Typing effect state
  const [typingIdx, setTypingIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Typing effect logic
  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    const currentText = typingTexts[typingIdx];
    if (!isDeleting && displayedText.length < currentText.length) {
      typingTimeout = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length + 1));
      }, 70);
    } else if (!isDeleting && displayedText.length === currentText.length) {
      typingTimeout = setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && displayedText.length > 0) {
      typingTimeout = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length - 1));
      }, 40);
    } else if (isDeleting && displayedText.length === 0) {
      typingTimeout = setTimeout(() => {
        setIsDeleting(false);
        setTypingIdx((prev) => (prev + 1) % typingTexts.length);
      }, 400);
    }
    return () => clearTimeout(typingTimeout);
  }, [displayedText, isDeleting, typingIdx]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Video hero refs and logic
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 3;
    }
  };
  useEffect(() => {
    if (videoRef.current) {
      if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = videos.herovideo;
      } else {
        import('hls.js').then(HlsModule => {
          const Hls = HlsModule.default;
          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videos.herovideo);
            hls.attachMedia(videoRef.current!);
            return () => hls.destroy();
          }
        });
      }
    }
  }, []);

  return (
    <section id="home" className="w-full min-h-screen flex flex-col overflow-hidden relative">
      {/* Top 50%: Video Streaming Test */}
      <div className="relative w-full h-[55vh] min-h-[200px] z-10 bg-white flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          className="w-full h-full object-cover"
          style={{ background: '#000' }}
          onLoadedMetadata={handleLoadedMetadata}
        >
          Sorry, your browser does not support embedded videos.
        </video>
        {/* Typing effect overlay */}
        <div
          style={{ position: 'absolute', left: 0, bottom: 0, paddingLeft: '2rem', paddingBottom: '1.5rem', pointerEvents: 'none', zIndex: 20 }}
        >
          <span
            style={{
              fontWeight: 'bold',
              color: 'white',
              fontSize: '2rem',
              textShadow: '0 2px 8px #000, 0 0px 2px #000',
              letterSpacing: '0.02em',
              display: 'inline-block',
              minWidth: '6ch',
              userSelect: 'none',
            }}
          >
            {displayedText}
            <span style={{
              display: 'inline-block',
              width: '1ch',
              color: 'white',
              opacity: cursorVisible ? 1 : 0,
              fontWeight: 'bold',
              fontSize: '2rem',
              verticalAlign: 'bottom',
              transition: 'opacity 0.2s',
            }}>
              |
            </span>
          </span>
        </div>
      </div>
      {/* Tarya Logo below video */}
      <div className="w-full flex flex-col justify-center items-center z-10 relative">
        <div className="flex flex-col items-center justify-center w-full h-full px-6">
          <img src={images.logoText} alt="Tarya Salon and Studio Logo" className="h-28 object-contain opacity-0" onLoad={e => e.currentTarget.classList.remove('opacity-0')} />
        </div>
      </div>
      {/* Attractive Offer Cards Scroller */}
      <div className="w-full overflow-x-auto mb-2 relative scrollbar-hide" style={{height: 'auto', minHeight: 0}}>
        <div className="flex px-2 gap-2 whitespace-nowrap" style={{ willChange: 'transform' }}>
          {videos.offercardvideos.map((videoUrl, idx) => (
            <OfferCard
              key={idx}
              text={
                [
                  'Upto 50% OFF on Cleaning Services',
                  'Flat 30% OFF on Hair Spa',
                  'Free Nail Art on Manicure',
                  'Combo: Haircut + Facial at 40% OFF',
                  'Refer & Earn: 20% OFF',
                ][idx % 5]
              }
              videoUrl={videoUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
