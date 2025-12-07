import React from 'react';
import { DestinationCard } from '../components/DestinationCard';
import { Destination } from '../types';

interface DestinationsPageProps {
  destinations: Destination[];
  isLoading: boolean;
  onNavigateHome: () => void;
  onSelectDestination: (destination: Destination) => void;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({ destinations, isLoading, onNavigateHome, onSelectDestination }) => {
  return (
    <div className="animate-fade-in-up">
        {/* Page Header Section */}
        <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-white">
            <div className="container mx-auto px-4 text-center">
                 <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Explore Sri Lanka</h1>
                 <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600">
                    From the misty tea plantations of the hill country to ancient kingdoms and sun-kissed beaches, discover the endless wonders of the island.
                 </p>
                 <button 
                    onClick={onNavigateHome}
                    className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105"
                 >
                    &larr; Back to Home
                 </button>
            </div>
        </section>

        {/* Destinations Grid Section */}
        <section id="destinations" className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4">
             {isLoading ? (
                <div className="text-center text-gray-500">Loading destinations...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {destinations.map((destination) => (
                    <DestinationCard 
                      key={destination.id} 
                      destination={destination} 
                      onSelect={() => onSelectDestination(destination)}
                    />
                  ))}
                </div>
             )}
          </div>
        </section>
    </div>
  );
};