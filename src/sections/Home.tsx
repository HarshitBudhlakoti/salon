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

  // GSAP refs for h1s
  const h1Refs = useRef<(HTMLHeadingElement | null)[]>([]);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const iconsSliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent(prev => (prev + 1) % images.length);
    }, 2300);
    return () => clearInterval(interval);
  }, []);

  // GSAP animation for h1s and icons slider
  useEffect(() => {
    if (h1Refs.current.length) {
      gsap.set(h1Refs.current, { opacity: 0, x: -60 });
      gsap.set(imgRef.current, { opacity: 0, x: 60 });
      gsap.set(taglineRef.current, { opacity: 0 });
      gsap.set(iconsSliderRef.current, { opacity: 0, y: 30 });
      
      const tl = gsap.timeline();
      tl.to([h1Refs.current[0], iconsSliderRef.current], {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      })
        .to(h1Refs.current[1], {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
        }, 0.25)
        .to(imgRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
        }, 0.25)
        .to(h1Refs.current[2], {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
        }, 0.5)
        .to(taglineRef.current, {
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
        }, "+=0.1");
    }

    // Teeter animation on scroll
    let teeterTimeout: NodeJS.Timeout | null = null;
    const handleScroll = () => {
      if (!imgRef.current) return;
      // Debounce: only trigger if not already animating
      if (teeterTimeout) return;
      gsap.to(imgRef.current, {
        rotation: 10,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut',
        onComplete: () => {
          gsap.to(imgRef.current, { rotation: 0, duration: 0.1 });
        }
      });
      teeterTimeout = setTimeout(() => {
        teeterTimeout = null;
      }, 350); // Prevent spamming
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (teeterTimeout) clearTimeout(teeterTimeout);
    };
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

  return (
    <section id="home" className="w-full min-h-screen flex flex-col overflow-hidden relative">
      {/* Top 50%: Image Slider */}
      <div className="relative w-full h-[50vh] min-h-[200px] z-10 bg-white">
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
      <div className="flex-1 w-full flex flex-col py-2 z-10 relative">
        <div className='flex flex-col gap-4 p-4'>
          <div className='flex items-center'>
            <div className="space-y-4">
              <h1 ref={el => { h1Refs.current[0] = el; }} className='font-mono font-bold text-6xl' style={{ textShadow: '0 0 0 2px #86efac, 0 0 0 4px #86efac' }}>Tarya</h1>
              <h1 ref={el => { h1Refs.current[1] = el; }} className='font-mono font-bold text-5xl' style={{ textShadow: '0 0 0 2px #86efac, 0 0 0 4px #86efac' }}>Salon</h1>
            </div>
            <div className='w-full'>
              <img ref={imgRef} src="https://ik.imagekit.io/0mx6y4v8p/graph.webp" alt="Graph" className="w-36 mx-auto" />
            </div>
          </div>
          <h1 ref={el => { h1Refs.current[2] = el; }} className='font-mono font-bold text-5xl' style={{ textShadow: '0 0 0 2px #86efac, 0 0 0 4px #86efac' }}>and Studio</h1>
        </div>

        <span className="h-0.5 bg-green-700 mx-10 mb-2 mt-4 rounded-2xl"></span>

        <p
          ref={taglineRef}
          className="text-md md:text-2xl font-medium text-emerald-800 italic text-center"
          style={{ display: 'inline-block', perspective: '400px' }}
        >
          {taglines[taglineIdx]}
        </p>
       
        <span className="h-0.5 bg-green-700 mx-6 my-2 rounded-2xl"></span>
        
        {/* Simple horizontal icons loop */}
        <div ref={iconsSliderRef} className="overflow-hidden my-4">
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
              <div key={`set-${setIndex}`} className="flex gap-5">
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
      </div>
    </section>
  );
}
