interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  delay?: number;
}

const ServiceCard = ({ image, title, description }: ServiceCardProps) => {
  return (
    <div className="bg-gray-200 shadow-lg rounded-3xl overflow-hidden transition-all duration-300 w-full max-w-[300px]">
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

export default ServiceCard; 