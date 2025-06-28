import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import ServiceCard from '../components/ServiceCard';

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
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const startContinuousAnimation = () => {
      const card = cardRef.current;
      if (!card) return;

      // Kill any existing timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      // Create a new timeline
      const tl = gsap.timeline({ repeat: -1 });
      timelineRef.current = tl;

      // Set initial position (off-screen right)
      gsap.set(card, {
        x: window.innerWidth,
        opacity: 0,
        scale: 0.8
      });

      // Animate card coming in from right to center
      tl.to(card, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      });

      // Keep card centered briefly
      tl.to(card, {
        duration: 1
      }, "+=0");

      // Animate card going out to the left and simultaneously prepare next card
      tl.to(card, {
        x: -window.innerWidth,
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        ease: "power2.in",
        onComplete: () => {
          setCurrentCardIndex((prevIndex) => (prevIndex + 1) % servicesData.length);
        }
      });
    };

    startContinuousAnimation();

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Immediately animate the new card from right to center
    gsap.fromTo(card, 
      {
        x: window.innerWidth,
        opacity: 0,
        scale: 0.5
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      }
    );
  }, [currentCardIndex]);

  return (
    <section id="our-services" className="min-h-screen pt-5 pb-20 px-4 overflow-hidden">
      <div className="mx-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-green-700">Our Services</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of professional hair and beauty services designed to enhance your natural beauty.
          </p>
        </div>

        {/* Card Container */}
        <div className="relative overflow-hidden h-[400px] flex items-center justify-center">
          <div ref={cardRef} className="absolute w-[70vw] max-w-md">
            <ServiceCard
              image={servicesData[currentCardIndex].image}
              title={servicesData[currentCardIndex].title}
              description={servicesData[currentCardIndex].description}
              delay={0}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;