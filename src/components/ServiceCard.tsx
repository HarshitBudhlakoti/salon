interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  delay?: number;
}

const ServiceCard = ({ image, title, description }: ServiceCardProps) => {
  return (
    <div className="bg-gray-200 shadow-md rounded-3xl overflow-hidden transition-all duration-300 w-full max-w-[300px]">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-t-xl"
        />
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      
      {/* Content Container */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-green-700 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

interface SmallServiceCardProps {
  image: string;
  title: string;
}

export const SmallServiceCard = ({ image, title }: SmallServiceCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden w-24 h-24 sm:w-40 sm:h-40 flex flex-col items-center justify-end relative">
      <img
        src={image}
        alt={title}
        className="absolute top-0 left-0 w-full h-full object-cover object-center z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
      <div className="relative z-20 w-full text-center p-1 pb-2">
        <span className="block text-white font-semibold text-xs drop-shadow-md truncate">{title}</span>
      </div>
    </div>
  );
};

export default ServiceCard; 