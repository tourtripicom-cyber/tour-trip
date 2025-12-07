import React, { useState } from 'react';
import { Vehicle } from '../types';
import { UserGroupIcon, CurrencyDollarIcon } from './IconComponents';
import { BookingModal } from './BookingModal';

interface FleetCardProps {
  vehicle: Vehicle;
}

export const FleetCard: React.FC<FleetCardProps> = ({ vehicle }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
        <div className="relative">
          <img src={vehicle.imageUrl} alt={vehicle.name} className="w-full h-56 object-cover" />
          <div className="absolute top-0 right-0 bg-emerald-500 text-white text-sm font-bold py-1 px-3 rounded-bl-lg">
            {vehicle.type}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{vehicle.name}</h3>
          <div className="space-y-3 text-gray-600">
            <div className="flex items-center">
              <UserGroupIcon className="h-5 w-5 mr-3 text-emerald-500" />
              <span>Up to {vehicle.capacity} passengers</span>
            </div>
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-5 w-5 mr-3 text-emerald-500" />
              <span>
                <span className="font-bold text-gray-700">${vehicle.ratePerKm}</span> / KM
              </span>
            </div>
          </div>
          <button 
            onClick={handleOpenModal}
            className="mt-6 w-full bg-slate-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-700 transition duration-300 transform group-hover:bg-emerald-600">
            Book Now
          </button>
        </div>
      </div>
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        vehicleName={vehicle.name} 
      />
    </>
  );
};