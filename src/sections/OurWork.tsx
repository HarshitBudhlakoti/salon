import { useState, useRef, useEffect } from 'react';
import { videos, images } from '../assets';
import FeedbackCard from '../components/FeedbackCard';
import { feedbacks } from '../assets';

// Type for trendingServiceVideos
interface TrendingServiceVideo {
  key: string;
  video: string;
  title: string;
  thumbnail?: string;
}

const OurWork = () => {
  return (
    <section id="our-work" className="pt-2 pb-8">
      <VideoShowcaseSection />
      <FeedbackSliderSection />
    </section>
  );
};

function VideoShowcaseSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<TrendingServiceVideo | null>(null);

  // For accessibility: prevent background scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-black mb-2 px-4 text-left">Our Work in Action</h2>
      <div className="h-1 bg-green-600 rounded-full ml-4 mb-5 w-1/2 max-w-xs"></div>
      <div className="overflow-x-auto scrollbar-hide flex gap-6 px-4 pb-2" style={{ WebkitOverflowScrolling: 'touch' }}>
        {videos.trendingServiceVideos.map((vid: TrendingServiceVideo) => (
          <VideoCard
            key={vid.key}
            videoUrl={vid.video}
            title={vid.title}
            thumbnail={vid.thumbnail}
            onClick={() => { setActiveVideo(vid); setModalOpen(true); }}
          />
        ))}
      </div>
      {modalOpen && activeVideo && (
        <VideoModal
          videoUrl={activeVideo.video}
          title={activeVideo.title}
          onClose={() => { setModalOpen(false); setActiveVideo(null); }}
        />
      )}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

function FeedbackSliderSection() {
  const reviewSectionRef = useRef<HTMLDivElement>(null);
  const [isReviewSectionInView, setIsReviewSectionInView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReversing, setIsReversing] = useState(false);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsReviewSectionInView(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '-100px 0px',
      }
    );
    if (reviewSectionRef.current) {
      observer.observe(reviewSectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  // Smooth back and forth animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (isReversing) {
          if (prev <= 0) {
            setIsReversing(false);
            return 1;
          }
          return prev - 1;
        } else {
          if (prev >= feedbacks.length - 1) {
            setIsReversing(true);
            return prev - 1;
          }
          return prev + 1;
        }
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isReversing]);
  return (
    <div ref={reviewSectionRef} className="mt-14 pb-4">
      {/* Smooth Back and Forth Carousel */}
      <div className={`relative max-w-7xl mx-auto overflow-hidden transition-all duration-700 ${isReviewSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex justify-center">
          <div className="relative w-full overflow-hidden">
            <div
              className="transition-all duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              <div className="flex">
                {feedbacks.map((review, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 flex justify-center"
                    style={{ width: '100%' }}
                  >
                    <FeedbackCard
                      image={review.image}
                      name={review.name}
                      rating={review.rating}
                      feedback={review.feedback}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface VideoCardProps {
  videoUrl: string;
  title: string;
  onClick: () => void;
}

function VideoCard({ videoUrl, title, onClick }: VideoCardProps & { thumbnail?: string }) {
  // Use the thumbnail image as the card background
  const videoObj = videos.trendingServiceVideos.find(v => v.video === videoUrl);
  const thumbnail = videoObj?.thumbnail || images.thumbnails.default;
  return (
    <div
      className="relative flex-shrink-0 w-[180px] h-[320px] rounded-2xl overflow-hidden bg-gray-200 shadow-lg cursor-pointer group"
      style={{ aspectRatio: '9/16', backgroundImage: `url('${thumbnail}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      onClick={onClick}
    >
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="bg-black/60 rounded-full p-5 group-hover:scale-110 transition-transform">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="28" fill="#fff" fillOpacity="0.8"/><polygon points="23,17 41,28 23,39" fill="#22c55e"/></svg>
        </div>
      </div>
      {/* Title overlay at bottom */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3 z-20">
        <span className="text-white text-base font-semibold drop-shadow line-clamp-2">{title}</span>
      </div>
    </div>
  );
}

interface VideoModalProps {
  videoUrl: string;
  title: string;
  onClose: () => void;
}

function VideoModal({ videoUrl, title, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    let hls: any;
    if (videoRef.current) {
      if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = videoUrl;
        videoRef.current.play();
      } else {
        import('hls.js').then(HlsModule => {
          hls = new HlsModule.default();
          hls.loadSource(videoUrl);
          hls.attachMedia(videoRef.current!);
          videoRef.current!.play();
        });
      }
    }
    return () => { if (hls) hls.destroy(); };
  }, [videoUrl]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Modal content */}
      <div
        className="relative w-[90vw] max-w-[360px] aspect-[9/16] bg-black rounded-2xl shadow-2xl flex flex-col items-center justify-center overflow-hidden animate-zoomIn"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute left-3 top-3 z-20 text-white bg-black/60 rounded-full p-2 hover:bg-green-600 focus:outline-none"
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M6 18L18 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        {/* Video */}
        <video
          ref={videoRef}
          controls
          autoPlay
          className="w-full h-full object-cover"
          style={{ background: '#222' }}
        />
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3 z-10">
          <span className="text-white text-base font-semibold drop-shadow line-clamp-2">{title}</span>
        </div>
      </div>
      {/* Prevent background interaction */}
      <div className="fixed inset-0 z-[9998]" style={{ pointerEvents: 'auto' }} />
      <style>{`
        @keyframes zoomIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .animate-zoomIn { animation: zoomIn 0.3s cubic-bezier(0.4,0,0.2,1); }
      `}</style>
    </div>
  );
}

export default OurWork; 