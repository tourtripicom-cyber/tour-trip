import React from 'react';
import { Destination } from '../types';

interface DestinationDetailPageProps {
  destination: Destination;
  onBack: () => void;
}

export const DestinationDetailPage: React.FC<DestinationDetailPageProps> = ({ destination, onBack }) => {
  return (
    <div className="animate-fade-in-up">
      {/* Hero Image Section */}
      <section className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url(${destination.imageUrl})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">{destination.name}</h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">About {destination.name}</h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>{destination.description}</p>
            <p>
              Immerse yourself in the rich history and natural beauty that makes this destination a must-see. From ancient tales whispered by the ruins to the vibrant wildlife that roams the landscapes, there is a story waiting to be discovered around every corner.
            </p>
            <p>
              Whether you are an adventure seeker, a history enthusiast, or simply looking for a peaceful retreat, this location offers a unique blend of experiences. Allow our expert guides to show you the hidden gems and create memories that will last a lifetime.
            </p>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={onBack}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105"
            >
              &larr; Back to All Destinations
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};