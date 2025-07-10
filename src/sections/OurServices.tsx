import { useState, useEffect, useRef } from 'react';
import { SmallServiceCard } from '../components/ServiceCard';
import { SubPackagePopup } from '../components/ConfirmationPopup';
import BookingPopup from '../components/BookingPopup';
import { carouselCards, serviceCards } from '../assets';

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
    }, 10000);
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

  return (
    <section id="our-services" className="pb-8 py-2 px-1">
      <h2 className="text-2xl font-bold text-black mb-1 pt-2 px-4 text-left">Explore Other Services</h2>
      <div className="h-1 bg-green-600 rounded-full ml-4 mb-5 w-1/2 max-w-xs"></div>
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center gap-3 w-full max-w-5xl">
          {serviceCards.map((card, idx) => (
            <div key={idx} onClick={() => handleServiceCardClick(card)} className="cursor-pointer">
              <SmallServiceCard image={card.image} title={card.title} />
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Section */}
      <div className="w-full flex justify-center mt-8 sm:mt-16">
        <div className="relative w-full flex justify-center">
          {/* Left Arrow */}
          <button
            onClick={goLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-gray-200 rounded-full shadow p-1 w-7 h-7 flex items-center justify-center hover:bg-gray-300 focus:outline-none"
            aria-label="Previous"
          >
            <span className="text-lg font-bold">{'<'}</span>
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
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-gray-200 rounded-full shadow p-1 w-7 h-7 flex items-center justify-center hover:bg-gray-300 focus:outline-none"
            aria-label="Next"
          >
            <span className="text-lg font-bold">{'>'}</span>
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
    </section>
  );
};

export default OurServices;