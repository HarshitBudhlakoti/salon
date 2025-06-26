import { useEffect, useState } from 'react';
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

const images = [image1, s1, s2, s3, s5, s6, s7, s8, s9, s10];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent(prev => (prev + 1) % images.length);
    }, 2300);
    return () => clearInterval(interval);
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
      <div className="flex-1 w-full flex flex-col items-center justify-center bg-white/90">
        <h1 className="text-4xl md:text-6xl font-extrabold text-green-700 text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-400 to-green-700 drop-shadow-2xl tracking-widest text-center animate-fade-in font-serif">
          <span className="inline-block transform -rotate-2">Tarya</span>
          <span className="inline-block transform rotate-1">Salon</span>
          <span className="inline-block transform -rotate-1">and</span>
          <span className="inline-block transform rotate-2">Studio</span>
        </h1>
        <p className="mt-2 text-lg md:text-2xl font-medium text-emerald-800 italic text-center animate-fade-in delay-200">
          Where Beauty Meets Artistry
        </p>
      </div>
    </section>
  );
}
