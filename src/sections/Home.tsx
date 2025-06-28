import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faScissors, 
  faSprayCan, 
  faPaintBrush, 
  faHeart, 
  faPalette, 
  faShower, 
  faFan 
} from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';

const images = [
  'https://ik.imagekit.io/0mx6y4v8p/s2.avif',
  'https://ik.imagekit.io/0mx6y4v8p/s5.webp',
  'https://ik.imagekit.io/0mx6y4v8p/s3.webp',
  'https://ik.imagekit.io/0mx6y4v8p/s7.webp',
  'https://ik.imagekit.io/0mx6y4v8p/s8.webp',
  'https://ik.imagekit.io/0mx6y4v8p/s10.webp',
  'https://ik.imagekit.io/0mx6y4v8p/s9.webp',
  'https://ik.imagekit.io/0mx6y4v8p/image.webp'
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const taglines = [
    'Where Beauty Meets Artistry',
    'Unleash Your Inner Glow',
    'Elegance. Style. You.',
    'Transforming Looks, Inspiring Confidence',
    'Your Beauty, Our Passion',
    'Experience the Art of Self-Care',
  ];
  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const iconsContainerRef = useRef<HTMLDivElement | null>(null);
  const iconsSliderRef = useRef<HTMLDivElement | null>(null);
  const imageSliderRef = useRef<HTMLDivElement | null>(null);
  // New refs for animated elements
  const taryaRef = useRef<HTMLHeadingElement | null>(null);
  const salonStudioRef = useRef<HTMLHeadingElement | null>(null);
  const lineTopRef = useRef<HTMLSpanElement | null>(null);
  const lineBottomRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent(prev => (prev + 1) % images.length);
    }, 2300);
    return () => clearInterval(interval);
  }, []);

  // GSAP entrance animation for headings, lines, tagline, and icon bar
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(taryaRef.current, { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' })
      .fromTo(salonStudioRef.current, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.5')
      .fromTo(lineTopRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.4')
      .fromTo(lineBottomRef.current, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.4')
      .to(taglineRef.current, { opacity: 1, duration: 0.7, ease: 'power2.out' }, '+=0.1')
      .fromTo(iconsSliderRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.4');
  }, []);

  useEffect(() => {
    // Tagline flip animation
    const flipInterval = setInterval(() => {
      if (!taglineRef.current) return;
      gsap.to(taglineRef.current, {
        rotateY: 90,
        opacity: 0,
        duration: 0.35,
        ease: 'power1.in',
        onComplete: () => {
          setTaglineIdx(prev => (prev + 1) % taglines.length);
          gsap.set(taglineRef.current, { rotateY: -90 });
          gsap.to(taglineRef.current, {
            rotateY: 0,
            opacity: 1,
            duration: 0.35,
            ease: 'power1.out',
          });
        }
      });
    }, 2600);
    return () => clearInterval(flipInterval);
  }, []);

  // Scroll handler for icons animation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY ? 1 : -1;
      
      setLastScrollY(currentScrollY);

      // Animate icons based on scroll direction
      if (iconsContainerRef.current) {
        const currentX = Number(gsap.getProperty(iconsContainerRef.current, 'x')) || 0;
        const newX = currentX - (scrollDirection * 8); // Same speed for both directions
        
        // Improved infinite loop logic
        const iconWidth = 60;
        const totalIcons = 7;
        const totalWidth = iconWidth * totalIcons;
        
        let finalX = newX;
        
        // Create seamless infinite loop - same logic for both directions
        if (newX <= -totalWidth) {
          finalX = newX + totalWidth;
        } else if (newX >= 0) {
          finalX = newX - totalWidth;
        }
        
        gsap.to(iconsContainerRef.current, {
          x: finalX,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    // Fade in image slider on mount
    if (imageSliderRef.current) {
      gsap.fromTo(imageSliderRef.current, { opacity: 0 }, { opacity: 1, duration: 1.1, ease: 'power2.out' });
    }
  }, []);

  return (
    <section id="home" className="w-full min-h-screen flex flex-col overflow-hidden relative bg-gray-50">
      {/* Top 50%: Image Slider */}
      <div ref={imageSliderRef} className="relative w-full h-[50vh] min-h-[200px] z-10 bg-white opacity-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={current}
            src={images[current]}
            alt={`slide-${current}`}
            className="w-full h-full object-cover absolute top-0 left-0 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.8, ease: 'easeInOut' } }}
          />
        </AnimatePresence>
      </div>
      {/* Heading and Tagline filling the remaining space */}
      <div className="w-full flex flex-col justify-center items-center py-8 z-10 relative">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 ref={taryaRef} className="font-mono font-bold text-7xl glossy-text pb-2 text-center opacity-0">
            Tarya
          </h1>
          <h2 ref={salonStudioRef} className="font-mono font-bold text-3xl glossy-text text-center opacity-0">
            Salon and Studio
          </h2>
        </div>
      </div>

      <span ref={lineTopRef} className="h-0.5 bg-green-700 mx-10 mb-4 mt-6 rounded-2xl opacity-0"></span>

      <p
        ref={taglineRef}
        className="text-md md:text-2xl font-medium text-emerald-800 italic text-center opacity-0 my-4"
        style={{ display: 'inline-block', perspective: '400px' }}
      >
        {taglines[taglineIdx]}
      </p>
     
      <span ref={lineBottomRef} className="h-0.5 bg-green-700 mx-6 my-4 rounded-2xl opacity-0"></span>
      
      {/* Simple horizontal icons loop */}
      <div ref={iconsSliderRef} className="overflow-hidden my-4 opacity-0">
        <div 
          ref={iconsContainerRef}
          className="flex gap-6 whitespace-nowrap items-center"
          style={{ 
            width: 'max-content',
            transform: 'translateX(0px)'
          }}
        >
          {/* Multiple sets for seamless infinite loop */}
          {Array.from({ length: 4 }, (_, setIndex) => (
            <div key={`set-${setIndex}`} className="flex gap-5 pt-5 my-auto">
              {[
                { icon: faScissors, name: 'scissors' },
                { icon: faSprayCan, name: 'sprayCan' },
                { icon: faPaintBrush, name: 'paintBrush' },
                { icon: faHeart, name: 'lipstick' },
                { icon: faPalette, name: 'nailPolish' },
                { icon: faShower, name: 'shower' },
                { icon: faFan, name: 'hairDryer' },
              ].map((iconData, index) => (
                <FontAwesomeIcon 
                  key={`${setIndex}-${index}`}
                  icon={iconData.icon} 
                  className="text-4xl text-emerald-800" 
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
