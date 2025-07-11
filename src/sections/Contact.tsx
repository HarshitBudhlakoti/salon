import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import LoaderPopup from '../components/LoaderPopup';
import ConfirmationPopup from '../components/ConfirmationPopup';

// Service and subcategory data (can be expanded)
const services = [
  {
    name: 'Bridal makeup',
    subcategories: [
      { name: 'HD Makeup', subsub: ['Airbrush', 'Traditional'] },
      { name: 'Engagement', subsub: ['Day', 'Evening'] },
    ],
  },
  {
    name: 'Hair color',
    subcategories: [
      { name: 'Global', subsub: ['Ammonia Free', 'With Ammonia'] },
      { name: 'Highlights', subsub: ['Balayage', 'Ombre', 'Streaks'] },
    ],
  },
  {
    name: 'Hair wash',
    subcategories: [
      { name: 'Basic', subsub: [] },
      { name: 'Spa Wash', subsub: [] },
    ],
  },
  {
    name: 'Pedicure',
    subcategories: [
      { name: 'Classic', subsub: [] },
      { name: 'Spa', subsub: [] },
    ],
  },
  {
    name: 'Makeup',
    subcategories: [
      { name: 'Party', subsub: [] },
      { name: 'Fashion', subsub: [] },
    ],
  },
  {
    name: 'Hair spa',
    subcategories: [
      { name: 'Keratin', subsub: [] },
      { name: 'Smoothening', subsub: [] },
    ],
  },
  {
    name: 'Nail refeling',
    subcategories: [
      { name: 'Gel', subsub: [] },
      { name: 'Acrylic', subsub: [] },
    ],
  },
  {
    name: 'Hair styling',
    subcategories: [
      { name: 'Curls', subsub: [] },
      { name: 'Straightening', subsub: [] },
    ],
  },
  {
    name: 'Cleanup',
    subcategories: [
      { name: 'Basic', subsub: [] },
      { name: 'Advanced', subsub: [] },
    ],
  },
  {
    name: 'Party makeup',
    subcategories: [
      { name: 'Cocktail', subsub: [] },
      { name: 'Reception', subsub: [] },
    ],
  },
  {
    name: 'Other',
    subcategories: [],
  },
];

const hearAboutOptions = [
  'Google Search',
  'Instagram',
  'Facebook',
  'Friend/Family',
  'Walk-in',
  'Other',
];

const TRAYA_LOGO = 'https://ik.imagekit.io/0mx6y4v8p/logo.webp';

const timeSlots = [
  'Morning',
  'Afternoon',
  'Evening',
  'Anytime',
];

const Contact = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [selectedService, setSelectedService] = useState('');
  const [selectedSub, setSelectedSub] = useState('');
  const [selectedSubSub, setSelectedSubSub] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [hearAbout, setHearAbout] = useState('');
  const [otherService, setOtherService] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');

  // Animate form when section comes into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !formRef.current) return;
    let hasAnimated = false;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            gsap.fromTo(
              formRef.current!.children,
              { y: 60, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out' }
            );
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Handle cascading dropdowns
  const serviceObj = services.find((s) => s.name === selectedService);
  const subcategories = serviceObj ? serviceObj.subcategories : [];
  const subObj = subcategories.find((s) => s.name === selectedSub);
  const subsubcategories = subObj ? subObj.subsub : [];

  // Handle form submit
  const API_URL = 'https://sheetdb.io/api/v1/i37y8wd3z7ewu';
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    const data = {
      name,
      phone,
      service: selectedService,
      subCategory: selectedSub,
      date,
      timeSlot,
      hearAbout,
      specialRequest,
    };
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });
      const result = await response.json();
      if (response.ok && (result.created || result[0] || result.success || result.length >= 0)) {
        setIsSubmitting(false);
        // Reset form fields
        setName('');
        setPhone('');
        setSelectedService('');
        setSelectedSub('');
        setSelectedSubSub('');
        setOtherService('');
        setDate('');
        setTimeSlot('');
        setHearAbout('');
        setSpecialRequest('');
        setNameError('');
        setPhoneError('');
        setTimeout(() => {
          setShowConfirmation(true);
        }, 200);
      } else {
        setIsSubmitting(false);
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setIsSubmitting(false);
      setError('Network error. Please try again.');
    }
  };

  // Handler for OK button and auto-dismiss
  useEffect(() => {
    if (showConfirmation) {
      const timer = setTimeout(() => {
        setShowConfirmation(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfirmation]);
  const handleOk = () => {
    setShowConfirmation(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Validation handlers
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 20);
    setName(value);
    setNameError(value.length === 0 ? 'Name is required' : '');
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    setPhone(value);
    if (value.length < 10) setPhoneError('Phone must be 10 digits');
    else setPhoneError('');
  };

  // Validation for enabling submit button
  const isFormValid =
    name.trim() &&
    phone.trim().length === 10 &&
    !nameError &&
    !phoneError &&
    selectedService &&
    date &&
    timeSlot &&
    (selectedService !== 'Other' || otherService.trim());

  // Calculate the day after tomorrow for min date
  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().split('T')[0];
  };

  return (
    <section ref={sectionRef} id="contact" className="min-h-screen flex flex-col justify-center items-center overflow-hidden pb-4 pt-0">
      {isSubmitting && <LoaderPopup />}
      {showConfirmation && (
        <ConfirmationPopup
          message="We have received your request and will contact you soon."
          onClose={handleOk}
          logoUrl={TRAYA_LOGO}
          type="success"
        />
      )}
      <div className="w-full max-w-xl rounded-3xl p-8 pt-0 relative">
        <h1 className="text-4xl font-bold mb-2 text-black w-full text-left block">
          <span>Let's Connect</span>
        </h1>
        <div className="h-1 bg-green-600 rounded-full mb-6 w-1/2 max-w-xs"></div>
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-y-5">
          {error && <div className="text-red-500 text-center mb-2">{error}</div>}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">Name <span className="text-red-500">*</span></label>
              <input required name="name" type="text" value={name} onChange={handleNameChange} maxLength={20} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-200" placeholder="Your Name" />
              {nameError && <span className="text-red-500 text-xs mt-1 block">{nameError}</span>}
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">Phone Number <span className="text-red-500">*</span></label>
              <input required name="phone" type="tel" pattern="[0-9]{10}" value={phone} onChange={handlePhoneChange} maxLength={10} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-200" placeholder="10-digit Mobile Number" />
              {phoneError && <span className="text-red-500 text-xs mt-1 block">{phoneError}</span>}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Preferred Service <span className="text-red-500">*</span></label>
            <select required name="service" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-200" value={selectedService} onChange={e => { setSelectedService(e.target.value); setSelectedSub(''); setSelectedSubSub(''); }}>
              <option value="" disabled>Select a service</option>
              {services.map((s) => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>
          {selectedService === 'Other' && (
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Please specify your service</label>
              <input name="otherService" type="text" value={otherService} onChange={e => setOtherService(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-200" placeholder="Describe your service" />
            </div>
          )}
          {subcategories.length > 0 && (
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Sub Category</label>
              <select name="subcategory" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-200" value={selectedSub} onChange={e => { setSelectedSub(e.target.value); setSelectedSubSub(''); }}>
                <option value="" disabled>Select a sub category</option>
                {subcategories.map((s) => (
                  <option key={s.name} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>
          )}
          {subsubcategories.length > 0 && (
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Sub Sub Category</label>
              <select name="subsubcategory" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-200" value={selectedSubSub} onChange={e => setSelectedSubSub(e.target.value)}>
                <option value="" disabled>Select a sub sub category</option>
                {subsubcategories.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">Preferred Date <span className="text-red-500">*</span></label>
              <input required name="date" type="date" min={getMinDate()} value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-200" />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">Preferred Time Slot <span className="text-red-500">*</span></label>
              <select required name="timeSlot" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-200" value={timeSlot} onChange={e => setTimeSlot(e.target.value)}>
                <option value="" disabled>Select a time slot</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">How did you hear about us?</label>
            <select name="hearAbout" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-200" value={hearAbout} onChange={e => setHearAbout(e.target.value)}>
              <option value="" disabled>Select an option</option>
              {hearAboutOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Any Special Request</label>
            <textarea name="specialRequest" rows={3} value={specialRequest} onChange={e => setSpecialRequest(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-200 resize-none" placeholder="Let us know if you have any special requests..."></textarea>
          </div>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-2 rounded-xl font-bold text-md shadow-lg relative overflow-hidden 
              ${!isFormValid ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-gradient-to-r from-green-500 via-green-400 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all duration-300'}`}
          >
            {!isFormValid ? null : <span className="glossy-wave" />}
            <span className="relative z-10">Submit</span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact; 