import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'our-services', label: 'Services' },
  { id: 'our-work', label: 'Our Work' },
  { id: 'contact', label: 'Connect' },
];

export default function Header() {
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-green-600/70 backdrop-blur-md' : 'bg-green-600/40 backdrop-blur-sm'} shadow-md`}>
      <div className="max-w-[400px] mx-auto">
        <nav className="flex justify-between items-center px-4 py-2">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="https://ik.imagekit.io/0mx6y4v8p/logo.webp" alt="Logo" className="h-10 w-10 object-contain rounded-full bg-white/80 p-1 shadow" />
            <span className="hidden md:inline font-bold text-white text-lg">Salon</span>
          </div>
          {/* Desktop Links */}
          <div className="hidden md:flex gap-0 flex-1 justify-center">
            {links.map((link) => (
              <motion.a
                key={link.id}
                onClick={() => handleClick(link.id)}
                className={`cursor-pointer px-4 py-2 rounded-lg transition-colors duration-300 text-base text-green-700
                  ${active === link.id ? 'bg-white/80 shadow-md' : ''}
                  hover:text-green-800 hover:underline`}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.08 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden flex items-center">
            <button
              className="p-2 rounded focus:outline-none focus:ring-0 border-0"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu"
            >
              <span className="block w-6 h-0.5 bg-white mb-1 rounded transition-all duration-200" style={{ transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
              <span className={`block w-6 h-0.5 bg-white mb-1 rounded transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className="block w-6 h-0.5 bg-white rounded transition-all duration-200" style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
            </button>
          </div>
          {/* Mobile Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-2 mt-2 w-48 bg-white/95 rounded-lg shadow-lg flex flex-col py-2 z-50 md:hidden"
              >
                {links.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleClick(link.id)}
                    className={`text-left px-6 py-3 rounded-lg transition-colors duration-200 w-full text-base text-green-700
                      ${active === link.id ? 'bg-yellow-100' : 'hover:bg-yellow-50'}`}
                  >
                    {link.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
}
