import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'our-work', label: 'Our Work' },
  { id: 'our-services', label: 'Our Services' },
  { id: 'contact', label: 'Connect' },
];

export default function Header() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let current = 'home';
      for (const link of links) {
        const section = document.getElementById(link.id);
        if (section && section.offsetTop <= scrollPosition) {
          current = link.id;
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md shadow-md transition-all">
      <nav className="flex justify-between md:justify-center items-center px-1 md:px-0 gap-2 md:gap-8 py-2 md:py-4 w-full max-w-screen min-w-[340px]">
        {links.map(link => (
          <motion.a
            key={link.id}
            onClick={() => handleClick(link.id)}
            className={`flex-1 text-center cursor-pointer px-1 py-2 md:px-4 md:py-2 rounded-lg transition-colors duration-300 font-semibold text-xs md:text-lg ${active === link.id ? 'bg-blue-600 text-white shadow-md' : 'text-gray-800'}`}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.08 }}
          >
            {link.label}
          </motion.a>
        ))}
      </nav>
    </header>
  );
}
