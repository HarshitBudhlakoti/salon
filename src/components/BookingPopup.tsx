import React, { useState } from 'react';
import LoaderPopup from './LoaderPopup';
import ConfirmationPopup from './ConfirmationPopup';

interface BookingPopupProps {
  open: boolean;
  onClose: () => void;
  service: string;
  subCategory: string;
}

const timeSlots = [
  'Morning',
  'Afternoon',
  'Evening',
  'Anytime',
];

const hearAboutOptions = [
  'Google Search',
  'Instagram',
  'Facebook',
  'Friend/Family',
  'Walk-in',
  'Other',
];

const API_URL = 'https://sheetdb.io/api/v1/i37y8wd3z7ewu';

const BookingPopup: React.FC<BookingPopupProps> = ({ open, onClose, service, subCategory }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [hearAbout, setHearAbout] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [error, setError] = useState('');

  // Clear all fields only when popup is fully closed
  React.useEffect(() => {
    if (!open) {
      setStep(1);
      setName('');
      setPhone('');
      setDate('');
      setTimeSlot('');
      setHearAbout('');
      setSpecialRequest('');
      setNameError('');
      setPhoneError('');
      setError('');
    }
  }, [open]);

  const isStep1Valid = name.trim() && phone.trim().length === 10 && !nameError && !phoneError;
  const isStep2Valid = date && timeSlot;

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().split('T')[0];
  };

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

  // API POST helper
  const postToSheetDB = async (data: any) => {
    if (!isStep1Valid){
      setIsSubmitting(true);
    }
    setError('');
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });
      const result = await response.json();
      if (response.ok && (result.created || result[0] || result.success || result.length >= 0)) {
        return true;
      } else {
        setError('Something went wrong. Please try again.');
        return false;
      }
    } catch (err) {
      setError('Network error. Please try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinue = async () => {
    if (isStep1Valid) {
      const data = {
        name,
        phone,
        service,
        subCategory,
      };
      console.log('Step 1 (Continue):', data);
      postToSheetDB(data);
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = {
      name,
      phone,
      date,
      timeSlot,
      hearAbout,
      specialRequest,
      service,
      subCategory,
    };
    console.log('Booking Submitted:', data);
    const ok = await postToSheetDB(data);
    if (ok) {
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
        onClose();
      }, 2000);
    }
    // If not ok, error is already set
  };

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} bg-black/30 backdrop-blur-sm`}>
      <div className={`relative bg-white rounded-2xl shadow-2xl px-6 py-8 w-full max-w-md mx-4 transition-all duration-300 transform ${open ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'} max-h-[95vh] min-h-[60vh] overflow-y-auto`}>
        <button
          onClick={onClose}
          className="absolute left-4 top-4 text-gray-500 hover:text-green-600 text-2xl font-bold focus:outline-none"
          aria-label="Back"
        >
          &#8592;
        </button>
        {isSubmitting && <LoaderPopup />}
        {showConfirmation && (
          <ConfirmationPopup
            message="We have received your request and will contact you soon."
            onClose={onClose}
            type="success"
          />
        )}
        {!isSubmitting && !showConfirmation && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-5 pt-6">
            {error && <div className="text-red-500 text-center mb-2">{error}</div>}
            {step === 1 && (
              <>
                <h2 className="text-xl font-bold text-green-700 mb-2 text-center">Quick Booking</h2>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Name <span className="text-red-500">*</span></label>
                  <input required name="name" type="text" value={name} onChange={handleNameChange} maxLength={20} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-200" placeholder="Your Name" />
                  {nameError && <span className="text-red-500 text-xs mt-1 block">{nameError}</span>}
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Phone Number <span className="text-red-500">*</span></label>
                  <input required name="phone" type="tel" pattern="[0-9]{10}" value={phone} onChange={handlePhoneChange} maxLength={10} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-200" placeholder="10-digit Mobile Number" />
                  {phoneError && <span className="text-red-500 text-xs mt-1 block">{phoneError}</span>}
                </div>
                <button
                  type="button"
                  disabled={!isStep1Valid}
                  onClick={handleContinue}
                  className={`w-full py-2 rounded-xl font-bold text-md shadow-lg relative overflow-hidden mt-2
                    ${!isStep1Valid ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-gradient-to-r from-green-500 via-green-400 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all duration-300'}`}
                >
                  Continue
                </button>
              </>
            )}
            {step === 2 && (
              <>
                <h2 className="text-xl font-bold text-green-700 mb-2 text-center">Booking Details</h2>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Preferred Date <span className="text-red-500">*</span></label>
                  <input required name="date" type="date" min={getMinDate()} value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-200" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Preferred Time Slot <span className="text-red-500">*</span></label>
                  <select required name="timeSlot" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-200" value={timeSlot} onChange={e => setTimeSlot(e.target.value)}>
                    <option value="" disabled>Select a time slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
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
                  <textarea name="specialRequest" rows={3} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-200 resize-none" placeholder="Let us know if you have any special requests..." value={specialRequest} onChange={e => setSpecialRequest(e.target.value)}></textarea>
                </div>
                <button
                  type="submit"
                  disabled={!isStep2Valid}
                  className={`w-full py-2 rounded-xl font-bold text-md shadow-lg relative overflow-hidden mt-2
                    ${!isStep2Valid ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-gradient-to-r from-green-500 via-green-400 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all duration-300'}`}
                >
                  Submit
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingPopup; 