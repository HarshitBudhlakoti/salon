import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import image1 from '../assets/image.png';
import s1 from '../assets/s1.jpg';
import s2 from '../assets/s2.avif';
import s3 from '../assets/s3.webp';
import s5 from '../assets/s5.webp';
import s6 from '../assets/s6.jpeg';
import s7 from '../assets/s7.webp';
import s8 from '../assets/s8.webp';
import s9 from '../assets/s9.jpg';
import s10 from '../assets/s10.jpg';
import s11 from "../assets/graph.png";
import gsap from 'gsap';

const images = [image1, s1, s2, s3, s5, s6, s7, s8, s9, s10];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [taglineIdx, setTaglineIdx] = useState(0);
  const taglines = [
    'Where Beauty Meets Artistry',
    'Unleash Your Inner Glow',
    'Elegance. Style. You.',
    'Transforming Looks, Inspiring Confidence',
    'Your Beauty, Our Passion',
    'Experience the Art of Self-Care',
  ];
  const taglineRef = useRef<HTMLParagraphElement | null>(null);

  // GSAP refs for h1s
  const h1Refs = useRef<(HTMLHeadingElement | null)[]>([]);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent(prev => (prev + 1) % images.length);
    }, 2300);
    return () => clearInterval(interval);
  }, []);

  // GSAP animation for h1s
  useEffect(() => {
    if (h1Refs.current.length) {
      gsap.set(h1Refs.current, { opacity: 0, x: -60 });
      gsap.set(imgRef.current, { opacity: 0, x: 60 });
      gsap.set(taglineRef.current, { opacity: 0 });
      const tl = gsap.timeline();
      tl.to(h1Refs.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.25,
        ease: 'power2.out',
      })
        .to(imgRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
        }, 0.25)
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

  return (
    <section id="home" className="w-full min-h-screen max-h-screen h-screen flex flex-col overflow-hidden relative bg-black">
      {/* Top 45%: Image Slider */}
      <div className="relative w-full h-[45%] min-h-[120px] max-h-[45vh]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={current}
            src={images[current]}
            alt={`slide-${current}`}
            className="w-full h-full object-cover absolute top-0 left-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.7, ease: 'easeInOut' } }}
          />
        </AnimatePresence>
      </div>
      {/* Heading and Tagline filling the remaining space */}
      <div className="flex-1 w-full flex flex-col bg-slate-200 py-2">
        <div className='flex flex-col gap-4 p-4'>
          <div className='flex items-center'>
            <div className="space-y-4">
              <h1 ref={el => { h1Refs.current[0] = el; }} className='font-mono font-bold text-5xl underline'>Tarya</h1>
              <h1 ref={el => { h1Refs.current[1] = el; }} className='font-mono font-bold text-5xl underline'>Salon</h1>
            </div>
            <div className='w-full'>
              <img ref={imgRef} src={s11} alt="Graph" className="w-36 mx-auto" />
            </div>
          </div>
          <h1 ref={el => { h1Refs.current[2] = el; }} className='font-mono font-bold text-5xl underline'>and Studio</h1>
        </div>

        <span className="h-0.5 bg-green-700 mx-10 mb-2 mt-6 rounded-2xl"></span>

        <p
          ref={taglineRef}
          className="text-md md:text-2xl font-medium text-emerald-800 italic text-center"
          style={{ display: 'inline-block', perspective: '400px' }}
        >
          {taglines[taglineIdx]}
        </p>

        <span className="h-0.5 bg-green-700 mx-6 my-2 rounded-2xl"></span>

        <div id="hy">

        </div>
      </div>
    </section>
  );
}
