import React from 'react';

interface FeedbackCardProps {
  image: string;
  name: string;
  rating: number;
  feedback: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ image, name, rating, feedback }) => {
  return (
    <div className="bg-gray-50 max-w-sm w-full overflow-hidden px-4 rounded-2xl py-2">
      {/* Profile Image */}
      <div className="flex justify-center mb-1">
        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-green-100">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Name */}
      <div className="text-center mb-1">
        <p className="text-green-700 font-semibold text-sm">{name}</p>
      </div>

      {/* Star Rating */}
      <div className="flex justify-center mb-4">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-5 h-5 ${
                star <= rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
      {/* Feedback Text */}
      <div className="text-center">
        <p className="text-gray-700 text-sm leading-relaxed italic">
          "{feedback}"
        </p>
      </div>
    </div>
  );
};

export default FeedbackCard; 