import { useState, useEffect, useRef } from 'react';
import { SmallServiceCard } from '../components/ServiceCard';
import { SubPackagePopup } from '../components/ConfirmationPopup';
import BookingPopup from '../components/BookingPopup';
import { carouselCards, serviceCards, serviceCardsDesktop } from '../assets';
import { planCards } from '../assets';

const OurServices = () => {
  // Clone first and last card for infinite loop effect
  const extendedCards = [carouselCards[carouselCards.length - 1], ...carouselCards, carouselCards[0]];
  const [current, setCurrent] = useState(1); // Start at 1 because of the prepended clone
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [bookingPopupOpen, setBookingPopupOpen] = useState(false);
  const [bookingService, setBookingService] = useState('');
  const [bookingSubCategory, setBookingSubCategory] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTime = 500; // ms

  // Auto-slide every 10 seconds
  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      goRight();
    }, 3000);
    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, []);

  const goLeft = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => prev - 1);
  };
  const goRight = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => prev + 1);
  };

  // Handle infinite loop effect
  useEffect(() => {
    if (!isTransitioning) return;
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      if (current === 0) {
        setCurrent(extendedCards.length - 2); // Jump to last real card
      } else if (current === extendedCards.length - 1) {
        setCurrent(1); // Jump to first real card
      }
    }, transitionTime);
    return () => clearTimeout(timer);
  }, [current, isTransitioning, extendedCards.length]);

  // Handle click on service card
  const handleServiceCardClick = (service: any) => {
    setSelectedService(service);
    setPopupOpen(true);
  };

  // Handle click on carousel card
  const handleCarouselCardClick = (card: any) => {
    // Try to find a matching serviceCard by serviceKey for consistency
    const match = serviceCards.find(s => s.serviceKey === card.serviceKey);
    setSelectedService(match || card);
    setPopupOpen(true);
  };

  // Handle Book Now click in sub-card
  const handleBookNow = (service: any, sub: any) => {
    setPopupOpen(false);
    setBookingService(service.title);
    setBookingSubCategory(sub.title);
    setBookingPopupOpen(true);
  };

  // Typing effect for carousel card title
  const [typedText, setTypedText] = useState('');
  // Remove isDeleting state
  // const [isDeleting, setIsDeleting] = useState(false);
  // const [typingIdx, setTypingIdx] = useState(0);
   // not used, but for future multi-text
  const [cursorVisible, setCursorVisible] = useState(true);
  const prevTitleRef = useRef('');
  const currentTitle = extendedCards[current]?.title || '';
  // Typing effect logic
  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    if (prevTitleRef.current !== currentTitle) {
      setTypedText('');
      prevTitleRef.current = currentTitle;
    }
    if (typedText.length < currentTitle.length) {
      typingTimeout = setTimeout(() => {
        setTypedText(currentTitle.slice(0, typedText.length + 1));
      }, 70);
    }
    // No deleting effect anymore
    return () => clearTimeout(typingTimeout);
  }, [typedText, currentTitle]);
  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section id="our-services" className="pb-8 py-2 px-1">
      <h2 className="text-2xl md:text-3xl font-bold text-black md:text-center md:w-full md:mt-8 mb-1 pt-2 px-4 text-left">Explore Other Services</h2>
      <div className="h-1 bg-green-600 rounded-full ml-4 mb-5 w-1/2 max-w-xs md:mx-auto md:mb-8"></div>
      {/* Mobile/Tablet: 6 cards, flex-wrap */}
      <div className="md:hidden">
        <div className="flex flex-wrap justify-center gap-3 w-full max-w-5xl">
          {serviceCards.map((card, idx) => (
            <div key={idx} onClick={() => handleServiceCardClick(card)} className="cursor-pointer">
              <SmallServiceCard image={card.image} title={card.title} />
            </div>
          ))}
        </div>
      </div>
      {/* Desktop: 10 cards, 2 rows x 5 columns grid */}
      <div className="hidden md:grid grid-cols-5 grid-rows-2 gap-6 w-full max-w-5xl mx-auto">
        {serviceCardsDesktop.map((card, idx) => (
          <div key={idx} onClick={() => handleServiceCardClick(card)} className="cursor-pointer">
            <SmallServiceCard image={card.image} title={card.title} />
          </div>
        ))}
      </div>
      {/* Carousel Section: only on mobile/tablet */}
      <div className="w-full flex justify-center mt-8 sm:mt-16 md:hidden">
        <div className="relative w-full flex justify-center">
          {/* Typing effect absolutely over the carousel card */}
          <div className="absolute left-1/2 bottom-6 z-20" style={{ transform: 'translateX(-50%)', pointerEvents: 'none', width: '100%', maxWidth: 480 }}>
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
                textAlign: 'center',
                width: '100%',
              }}
              className="block text-center"
            >
              {typedText}
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
          {/* Left Arrow */}
          <button
            onClick={goLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-gray-200 rounded-full shadow p-1 w-10 h-10 flex items-center justify-center hover:bg-gray-300 focus:outline-none"
            aria-label="Previous"
          >
            <span className="text-3xl font-extrabold">{'<'}</span>
          </button>
          {/* Card - Only One Visible at a Time, Infinite Loop */}
          <div className="w-full max-w-xl px-8 overflow-hidden">
            <div
              className={`relative flex transition-transform duration-500`}
              style={{
                width: `${extendedCards.length * 100}%`,
                transform: `translateX(-${current * (100 / extendedCards.length)}%)`,
                transition: isTransitioning ? `transform ${transitionTime}ms` : 'none',
              }}
            >
              {extendedCards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white px-4 rounded-2xl overflow-hidden flex items-center justify-center p-0 min-h-[160px] aspect-video cursor-pointer"
                  style={{ width: `${100 / extendedCards.length}%` }}
                  onClick={() => handleCarouselCardClick(card)}
                >
                  <img
                    src={card.image}
                    alt="carousel slide"
                    className="w-full h-full object-cover rounded-2xl"
                    style={{ aspectRatio: '16/9' }}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Right Arrow */}
          <button
            onClick={goRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-gray-200 rounded-full shadow p-1 w-10 h-10 flex items-center justify-center hover:bg-gray-300 focus:outline-none"
            aria-label="Next"
          >
            <span className="text-3xl font-extrabold">{'>'}</span>
          </button>
        </div>
      </div>

      {/* SubPackage Popup */}
      <SubPackagePopup open={popupOpen} onClose={() => setPopupOpen(false)}>
        {selectedService && (
          <div>
            <h3 className="text-xl font-bold text-green-700 mb-4 text-center">{selectedService.title || selectedService.serviceKey}</h3>
            <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-1">
              {selectedService.subPackages && selectedService.subPackages.map((sub: any) => (
                <div key={sub.key} className="bg-gray-300 rounded-xl px-4 py-5 pb-4 flex min-h-[140px] gap-4 items-start">
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                    {sub.image ? (
                      <img src={sub.image} alt={sub.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-400 text-xs">No Image</span>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col gap-2 min-w-0 h-full">
                    <span className="font-semibold text-gray-800 mb-1 block text-base sm:text-base text-sm leading-tight line-clamp-2">{sub.title}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 font-bold text-base">₹{sub.discountedPrice}</span>
                      <span className="text-gray-400 line-through text-xs">₹{sub.price}</span>
                    </div>
                    <button onClick={() => handleBookNow(selectedService, sub)} className="px-3 py-1.5 w-full mb-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white rounded-lg font-semibold shadow-lg hover:from-green-500 hover:to-green-700 transition-all text-xs whitespace-nowrap relative overflow-hidden">
                      <span className="">Book Now</span>
                      <span className="absolute inset-0 bg-white/20 opacity-60 rounded-lg pointer-events-none animate-pulse" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </SubPackagePopup>

      {/* Booking Popup */}
      <BookingPopup
        open={bookingPopupOpen}
        onClose={() => {
          setBookingPopupOpen(false);
          setBookingService('');
          setBookingSubCategory('');
        }}
        service={bookingService}
        subCategory={bookingSubCategory}
      />

      {/* --- Plan Carousel Section --- */}
      <PlanCarouselSection />
    </section>
  );
};

export default OurServices;

// --- PlanCarouselSection ---

function PlanCarouselSection() {
  const [current, setCurrent] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTime = 5000; // ms
  const CARD_WIDTH = 350; // px
  // Booking popup state for plan cards
  const [bookingPopupOpen, setBookingPopupOpen] = useState(false);
  const [bookingService, setBookingService] = useState('');

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setIsLargeScreen(true);
        setCardsPerView(1); // not used on large screen
      } else {
        setIsLargeScreen(false);
        setCardsPerView(1);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(planCards.length / cardsPerView);

  useEffect(() => {
    if (isLargeScreen) return;
    timeoutRef.current = setInterval(() => {
      setCurrent((prev) => {
        if (direction === 1) {
          if (prev === totalSlides - 1) {
            setDirection(-1);
            return prev - 1;
          }
          return prev + 1;
        } else {
          if (prev === 0) {
            setDirection(1);
            return prev + 1;
          }
          return prev - 1;
        }
      });
    }, transitionTime);
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [cardsPerView, direction, totalSlides, isLargeScreen]);

  const handleDotClick = (idx: number) => {
    setCurrent(idx);
    // Do NOT clear the interval here so auto sliding continues
  };

  // Book Now handler for plan cards
  const handleBookNow = (planTitle: string) => {
    setBookingService(planTitle);
    setBookingPopupOpen(true);
  };

  // --- Render ---
  if (isLargeScreen) {
    return (
      <div className="w-full bg-green-700 py-10 flex flex-col items-center mt-10">
        <div className="text-xl sm:text-2xl text-white italic text-center mb-2">Choose Your Plan</div>
        <div className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">Unlock Unbelievable Savings</div>
        <div className="flex justify-center gap-6">
          {planCards.map((card) => (
            <div key={card.key} style={{ width: CARD_WIDTH }} className="flex-shrink-0 flex justify-center items-center">
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full flex flex-col items-center">
                <div className="flex items-center mb-2">
                  <img src={card.image} alt={card.title} className="w-10 h-10 mr-2" />
                  <span className="text-2xl font-bold text-black">{card.title}</span>
                </div>
                <div className="font-semibold text-gray-800 text-center mb-2">{card.subtitle}</div>
                <ul className="text-left text-sm  mb-4">
                  {card.features.map((f, i) => (
                    <li key={i} className="flex items-start mb-1"><span className="text-green-600 mr-2">✓</span>{f}</li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold">₹{card.price}</span>
                  <span className="text-gray-400 line-through text-base">₹{card.originalPrice}</span>
                  <span className="text-black font-semibold">Save <span className="text-green-700">₹{card.save}</span></span>
                </div>
                <button
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition-all"
                  onClick={() => handleBookNow(card.title)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      <BookingPopup
        open={bookingPopupOpen}
        onClose={() => {
          setBookingPopupOpen(false);
          setBookingService('');
        }}
        service={bookingService}
        subCategory={''}
      />
      </div>
    );
  }

  // --- Mobile/Small screen: Carousel ---
  return (
    <div className="w-full bg-green-700 py-10 flex flex-col items-center mt-10">
      <div className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">Unlock Unbelievable Savings</div>
      <div className="w-full flex justify-center">
        <div className="relative overflow-hidden" style={{ width: CARD_WIDTH }}>
          <div
            className="flex transition-transform duration-700 gap-6"
            style={{
              width: planCards.length * CARD_WIDTH + (planCards.length - 1) * 24, // 24px = gap-6
              transform: `translateX(-${current * (CARD_WIDTH + 24)}px)`
            }}
          >
            {planCards.map((card) => (
              <div key={card.key} style={{ width: CARD_WIDTH }} className="flex-shrink-0 flex justify-center items-center">
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full flex flex-col items-center">
                  <div className="flex items-center mb-2">
                    <img src={card.image} alt={card.title} className="w-10 h-10 mr-2" />
                    <span className="text-2xl font-bold text-black">{card.title}</span>
                  </div>
                  <div className="font-semibold text-gray-800 text-center mb-2">{card.subtitle}</div>
                  <ul className="text-left text-sm mb-4">
                    {card.features.map((f, i) => (
                      <li key={i} className="flex items-start mb-1"><span className="text-green-600 mr-2">✓</span>{f}</li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold">₹{card.price}</span>
                    <span className="text-gray-400 line-through text-base">₹{card.originalPrice}</span>
                    <span className="text-black font-semibold">Save <span className="text-green-700">₹{card.save}</span></span>
                  </div>
                  <button
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition-all"
                    onClick={() => handleBookNow(card.title)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Dots Navigation */}
      <div className="flex gap-3 mt-6">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            className={`w-4 h-4 rounded-full border-2 border-white ${current === idx ? 'bg-white' : 'bg-green-500'} transition-all`}
            onClick={() => handleDotClick(idx)}
            aria-label={`Go to plan slide ${idx + 1}`}
          />
        ))}
      </div>
      <BookingPopup
        open={bookingPopupOpen}
        onClose={() => {
          setBookingPopupOpen(false);
          setBookingService('');
        }}
        service={bookingService}
        subCategory={''}
      />
    </div>
  );
}