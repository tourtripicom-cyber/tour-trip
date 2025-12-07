import React from 'react';
import { Destination } from '../types';

interface DestinationCardProps {
  destination: Destination;
  onSelect: () => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group flex flex-col">
      <div className="relative h-56">
        <img src={destination.imageUrl} alt={destination.name} className="absolute h-full w-full object-cover" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{destination.name}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{destination.description}</p>
        <button
          onClick={onSelect}
          className="mt-auto text-emerald-600 font-bold self-start group-hover:underline transition duration-300 text-left"
        >
          Explore More &rarr;
        </button>
      </div>
    </div>
  );
};