import { motion } from 'framer-motion';

interface PackageCardProps {
  image: string;
  title: string;
  delay?: number;
}

const PackageCard = ({ image, title, delay = 0 }: PackageCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="bg-white shadow-xl border-2 border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-green-300 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content Container */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-3 text-center tracking-wide uppercase text-green-700 leading-tight">
          {title.split(' ').map((word, index) => (
            <div key={index} className="text-center">
              {word}
            </div>
          ))}
        </h3>
        <div className="flex-grow"></div>
        <button className="w-full bg-green-600 text-white py-1.5 px-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-300 text-sm">
          Explore
        </button>
      </div>
    </motion.div>
  );
};

export default PackageCard; 