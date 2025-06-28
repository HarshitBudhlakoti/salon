import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import ServiceCard from '../components/ServiceCard';
import PackageCard from '../components/PackageCard';

const IMAGES = {
  bridalMakeup: "https://mjgorgeous.com/wp-content/uploads/2020/12/MACost2.jpg",
  hairColor: "https://streax.in/cdn/shop/files/hair_color_1024x1024.png",
  hairWash: "https://www.saberhealth.com/uploaded/blog/images/wash-hair.jpg",
  pedicure: "https://cosmeticclinic.net.au/wp-content/uploads/2024/11/reduced_image_smaller.jpg",
  makeup: "https://img.freepik.com/premium-photo/portrait-beautiful-girl-holding-make-up-brushes_201606-983.jpg",
  hairSpa: "https://blog.buywow.in/wp-content/uploads/2024/06/jpeg-optimizer_soothing-shampoo-experience-prior-to-stem-cell-hai-2024-04-01-20-00-49-utc-scaled.jpg",
  nailRefeling: "https://www.relaxationhubatyourplace.com.decideprecisetechnologies.com/assets/images/services/gel-refilling.png",
  hairStyling: "https://www.mbmmakeupstudio.com/wp-content/uploads/2021/10/hair-styling-course-in-Delhi.jpg",
  cleanup: "https://www.hopscotch.in/blog/wp-content/uploads/2020/01/Here%E2%80%99s-how-I-do-a-face-clean-up-at-home-by-myself_3.jpg",
  partyMakeup: "https://www.fiestaservices.co.in/cdn/shop/files/SangeetMakeupLook.png"
};

const packageData = [
  {
    id: 1,
    image: IMAGES.hairSpa,
    title: "Hair services"
  },
  {
    id: 2,
    image: IMAGES.bridalMakeup,
    title: "Bridal package"
  },
  {
    id: 3,
    image: IMAGES.cleanup,
    title: "skin treatments"
  },
  {
    id: 4,
    image: IMAGES.nailRefeling,
    title: "nails services"
  }
];

const servicesData = [
  {
    id: 1,
    image: IMAGES.bridalMakeup,
    title: "Bridal makeup",
    description: "Enhance your beauty with our expert bridal makeup services."
  },
  {
    id: 2,
    image: IMAGES.hairColor,
    title: "Hair color",
    description: "Experience vibrant and natural hair coloring with our expert services."
  },
  {
    id: 3,
    image: IMAGES.hairWash,
    title: "Hair wash",
    description: "Indulge in a refreshing hair wash with a gentle scalp massage."
  },
  {
    id: 4,
    image: IMAGES.pedicure,
    title: "Pedicure",
    description: "Treat your feet to a relaxing pedicure with polished nails."
  },
  {
    id: 5,
    image: IMAGES.makeup,
    title: "Makeup",
    description: "Get professional makeup for any occasion with quality products."
  },
  {
    id: 6,
    image: IMAGES.hairSpa,
    title: "Hair spa",
    description: "Nourish your hair with our rejuvenating hair spa treatments."
  },
  {
    id: 7,
    image: IMAGES.nailRefeling,
    title: "Nail refeling",
    description: "Achieve flawless nails with our expert nail refilling services."
  },
  {
    id: 8,
    image: IMAGES.hairStyling,
    title: "Hair styling",
    description: "Get trendy and classic hair styling tailored to your preferences."
  },
  {
    id: 9,
    image: IMAGES.cleanup,
    title: "Cleanup",
    description: "Deep facial cleanup for a fresh, clear, and glowing complexion."
  },
  {
    id: 10,
    image: IMAGES.partyMakeup,
    title: "Party makeup",
    description: "Stand out at any event with our glamorous party makeup services."
  }
];

const OurServices = () => {
  const [current, setCurrent] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const hasAnimatedRef = useRef(false);
  const greenLineRef = useRef<HTMLSpanElement>(null);
  const packagesHeadingRef = useRef<HTMLHeadingElement>(null);
  const packagesContainerRef = useRef<HTMLDivElement>(null);
  const hasPackagesAnimatedRef = useRef(false);

  useEffect(() => {
    // Animate in the current card
    if (cardRef.current) {
      gsap.set(cardRef.current, { x: 200, opacity: 0 });
      gsap.to(cardRef.current, { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out' });
    }
    // Set up timer for next card
    timeoutRef.current = setTimeout(() => {
      // Animate out current card
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          x: -200,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.in',
          onComplete: () => {
            // If we're at the last card, immediately animate in the first card
            setCurrent((prev) => {
              if (prev + 1 === servicesData.length) {
                // Instantly set to first card and animate in
                setTimeout(() => {
                  if (cardRef.current) {
                    gsap.set(cardRef.current, { x: 200, opacity: 0 });
                    gsap.to(cardRef.current, { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out' });
                  }
                }, 10);
                return 0;
              }
              return prev + 1;
            });
          }
        });
      } else {
        setCurrent((prev) => (prev + 1) % servicesData.length);
      }
    }, 1000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  useEffect(() => {
    // Set initial positions
    if (headingRef.current) {
      gsap.set(headingRef.current, { y: 50, opacity: 0 });
    }
    if (paragraphRef.current) {
      gsap.set(paragraphRef.current, { y: 30, opacity: 0 });
    }
    if (greenLineRef.current) {
      gsap.set(greenLineRef.current, { scaleX: 0, opacity: 1 });
    }
    if (packagesHeadingRef.current) {
      gsap.set(packagesHeadingRef.current, { y: 30, opacity: 0 });
    }
    if (packagesContainerRef.current) {
      gsap.set(packagesContainerRef.current, { y: 40, opacity: 0 });
    }

    // Scroll-triggered animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimatedRef.current && (entry.target === headingRef.current || entry.target === paragraphRef.current)) {
          hasAnimatedRef.current = true;
          
          // Animate both elements together
          if (headingRef.current) {
            gsap.to(headingRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
          }
          if (paragraphRef.current) {
            gsap.to(paragraphRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 });
          }
        }
        
        // Animate packages section
        if (entry.isIntersecting && !hasPackagesAnimatedRef.current && 
            (entry.target === greenLineRef.current || entry.target === packagesHeadingRef.current || entry.target === packagesContainerRef.current)) {
          hasPackagesAnimatedRef.current = true;
          
          // Animate green line
          if (greenLineRef.current) {
            gsap.to(greenLineRef.current, { scaleX: 1, duration: 0.6, ease: 'power2.out' });
          }
          
          // Animate packages heading
          if (packagesHeadingRef.current) {
            gsap.to(packagesHeadingRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 });
          }
          
          // Animate packages container
          if (packagesContainerRef.current) {
            gsap.to(packagesContainerRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.5 });
          }
        }
      });
    }, { threshold: 0.3 });

    if (headingRef.current) observer.observe(headingRef.current);
    if (paragraphRef.current) observer.observe(paragraphRef.current);
    if (greenLineRef.current) observer.observe(greenLineRef.current);
    if (packagesHeadingRef.current) observer.observe(packagesHeadingRef.current);
    if (packagesContainerRef.current) observer.observe(packagesContainerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="our-services" className="min-h-screen pt-8 pb-20 bg-gray-50">
      <div className="mx-auto max-w-2xl ">
        {/* Header */}
        <div className="text-center px-4">
          <h1 ref={headingRef} className="text-4xl md:text-5xl font-bold mb-6 text-green-700 opacity-0">Our Services</h1>
          <p ref={paragraphRef} className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto opacity-0">
            Discover our comprehensive range of professional hair and beauty services designed to enhance your natural beauty.
          </p>
        </div>
        {/* Slider Container */}
        <div className="relative flex justify-center items-center min-h-[400px] mt-5 overflow-hidden">
          <div
            ref={cardRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md flex justify-center items-center sm:w-[80vw] md:w-[70vw] lg:w-[60vw]"
          >
            <ServiceCard
              image={servicesData[current].image}
              title={servicesData[current].title}
              description={servicesData[current].description}
            />
          </div>
        </div>
        {/* Green Line Separator */}
        <div className="mt-4 mb-6 flex justify-center">
          <span ref={greenLineRef} className="h-0.5 bg-green-600 w-20 rounded-2xl block"></span>
        </div>
        
        {/* Package Cards - Mobile Only */}
        <div className="md:hidden">
          <h2 ref={packagesHeadingRef} className="text-2xl font-bold mb-6 text-green-700 text-center opacity-0">Special Packages</h2>
          <div ref={packagesContainerRef} className="grid grid-cols-2 gap-4 px-4 opacity-0 items-stretch">
            {packageData.map((pkg, index) => (
              <PackageCard
                key={pkg.id}
                image={pkg.image}
                title={pkg.title}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;