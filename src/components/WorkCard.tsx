import { useEffect, useRef, useState } from 'react';

interface WorkCardProps {
  image: string;
  title: string;
  description: string;
  delay?: number;
  direction?: 'left' | 'right';
}

const WorkCard = ({ image, title, description, delay = 0, direction = 'left' }: WorkCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the card is visible
        rootMargin: '-50px 0px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getInitialTransform = () => {
    return direction === 'left' ? '-translate-x-full' : 'translate-x-full';
  };

  const getFinalTransform = () => {
    return 'translate-x-0';
  };

  return (
    <div 
      ref={cardRef}
      className="w-full max-w-[280px] h-[280px] mx-auto "
      style={{ animationDelay: `${delay}ms` }}
    >
      <div 
        className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-700 ease-out ${
          isInView 
            ? `transform ${getFinalTransform()} opacity-100` 
            : `transform ${getInitialTransform()} opacity-0`
        }`}
        style={{ 
          maxWidth: '280px',
          maxHeight: '280px'
        }}
      >
        <div className="relative h-36 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
        <div className="p-4">
          <h3 
            className={`text-xl font-bold mb-2 transition-all duration-500 delay-200 ${
              isInView 
                ? 'text-green-700 transform translate-y-0 opacity-100' 
                : 'text-green-700 transform translate-y-2 opacity-0'
            }`}
          >
            {title}
          </h3>
          <p 
            className={`text-sm transition-all duration-500 delay-300 ${
              isInView 
                ? 'text-gray-800 transform translate-y-0 opacity-100' 
                : 'text-gray-800 transform translate-y-2 opacity-0'
            } line-clamp-3 mb-4`}
          >
            {description}
          </p>
          <div className="h-8"></div>
        </div>
      </div>
    </div>
  );
};

export default WorkCard; 