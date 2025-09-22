import React from "react";
import { Link } from "react-router-dom";

interface FactoryCardProps {
  id: string;
  name: string;
  location: {
    city: string;
    province: string;
    country: string;
  };
  products: {
    name: string;
    description: string;
    min_order_quantity: number;
    lead_time_days: number;
  }[];
  established_year: number;
  introduction: string;
  certifications: string[];
  media: {
    images: string[];
  };
}

const FactoryCard: React.FC<FactoryCardProps> = ({
  id,
  name,
  location,
  products,
  established_year,
  introduction,
  certifications,
  media
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-4 flex flex-col transform hover:-translate-y-2 hover:shadow-3xl transition-all duration-300">
      {/* Factory Image */}
      <div className="mb-4">
        <img
          src={media.images[0]}
          alt={name}
          className="w-full h-74 object-cover rounded-2xl"
        />
      </div>

      {/* Factory Name */}
      <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
        {name}
      </h3>

      {/* Location */}
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
        📍 {location.city}, {location.country}
      </p>

      {/* Established Year */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        Est. {established_year}
      </p>

      {/* Introduction */}
      <p className="text-gray-700 dark:text-gray-300 mb-2 flex-grow line-clamp-3">
        {introduction}
      </p>

      {/* Products Count */}
      <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
        🏭 {products.length} Product{products.length !== 1 ? 's' : ''} Available
      </p>

      {/* Certifications */}
      <div className="mb-2">
        <div className="flex flex-wrap gap-2">
          {certifications.slice(0, 3).map((cert, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs rounded-full"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>

      {/* View Details Button */}
      <Link
        to={`/factories/${id}`}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 text-center block"
      >
        View Details
      </Link>
    </div>
  );
};

export default FactoryCard;