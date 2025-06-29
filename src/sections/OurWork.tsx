import { useEffect, useRef, useState } from 'react';
import WorkCard from '../components/WorkCard';
import FeedbackCard from '../components/FeedbackCard';

const OurWork = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isHeaderInView, setIsHeaderInView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReversing, setIsReversing] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderInView(true);
        }
      },
      {
        threshold: 0.5,
        rootMargin: '-100px 0px'
      }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Smooth back and forth animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (isReversing) {
          // Going backwards
          if (prev <= 0) {
            setIsReversing(false); // Start going forward again
            return 1;
          }
          return prev - 1;
        } else {
          // Going forwards
          if (prev >= reviewData.length - 1) {
            setIsReversing(true); // Start going backwards
            return prev - 1;
          }
          return prev + 1;
        }
      });
    }, 3000); // Change card every 3 seconds

    return () => clearInterval(interval);
  }, [isReversing]);

  const workData = [
    {
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop",
      title: "Hair Transformation",
      description: "Complete hair makeover with modern styling and color treatment"
    },
    {
      image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=300&fit=crop",
      title: "Facial Treatment",
      description: "Professional facial treatment for glowing and healthy skin"
    },
    {
      image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=300&fit=crop",
      title: "Makeup Artistry",
      description: "Bridal makeup transformation with professional techniques"
    },
    {
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop",
      title: "Nail Art Design",
      description: "Creative nail art with premium polish and designs"
    }
  ];

  const reviewData = [
    {
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      name: "Sarah Johnson",
      rating: 5,
      feedback: "Amazing experience! The team transformed my look completely. Professional service and stunning results. Highly recommend!"
    },
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      name: "Michael Chen",
      rating: 5,
      feedback: "Outstanding service and attention to detail. The stylists are incredibly talented and made me feel confident."
    },
    {
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      name: "Emily Rodriguez",
      rating: 4,
      feedback: "Great atmosphere and friendly staff. My hair looks fabulous and the treatment was exactly what I needed."
    },
    {
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      name: "David Thompson",
      rating: 5,
      feedback: "Professional, clean, and excellent results. The team really knows their craft. Will definitely return!"
    },
    {
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      name: "Lisa Wang",
      rating: 5,
      feedback: "Incredible transformation! The staff is so skilled and the salon has such a welcoming atmosphere."
    }
  ];

  return (
    <section id="our-work" className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-16 px-4"
        >
          <h1
            className={`text-4xl font-bold mb-6 transition-all duration-700 ${isHeaderInView
                ? 'text-green-700 transform translate-y-0 opacity-100'
                : 'text-gray-800 transform translate-y-8 opacity-0'
              }`}
          >
            Our Work
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${isHeaderInView
                ? 'text-gray-800 transform translate-y-0 opacity-100'
                : 'text-gray-600 transform translate-y-8 opacity-0'
              }`}
          >
            Discover the amazing transformations we've created for our clients.
            Each project showcases our commitment to excellence and attention to detail.
          </p>
        </div>

        {/* Work Cards Grid - Only visible on screens below 640px */}
        <div className="block sm:hidden">
          <div className="grid grid-cols-1 gap-8 max-w-sm mx-auto">
            {workData.map((work, index) => (
              <div
                key={index}
                className="flex justify-center"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <WorkCard
                  image={work.image}
                  title={work.title}
                  description={work.description}
                  delay={index * 200}
                  direction={index % 2 === 0 ? 'left' : 'right'}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout - Only visible on screens 640px and above */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {workData.map((work, index) => (
              <div
                key={index}
                className="bg-white shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-700 mb-2">{work.title}</h3>
                  <p className="text-gray-800">{work.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-14 pb-4">
          <div className="text-center mb-8 px-4">
            <h2 className="text-2xl font-bold text-green-700 ">What Our Clients Say</h2>
          </div>

          {/* Smooth Back and Forth Carousel */}
          <div className="relative max-w-7xl mx-auto">
            <div className="flex justify-center">
              <div className="relative w-full overflow-hidden">
                <div
                  className="transition-all duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  <div className="flex">
                    {reviewData.map((review, index) => (
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

        {/* Call to Action */}
        <div className="text-center mt-6 px-4">
          <p className="text-lg text-gray-600 font-semibold mb-6">
            Ready to transform your look? Book your appointment today!
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl">
            Book Appointment
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurWork; 