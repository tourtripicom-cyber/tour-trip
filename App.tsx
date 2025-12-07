import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FleetCard } from './components/FleetCard';
import { CustomTripPlanner } from './components/CustomTripPlanner';
import { Footer } from './components/Footer';
import { DestinationsPage } from './pages/DestinationsPage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { Destination, Vehicle } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'destinations'>('home');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [vehiclesResponse, destinationsResponse] = await Promise.all([
          fetch('/data/vehicles.json'),
          fetch('/data/destinations.json')
        ]);
        if (!vehiclesResponse.ok || !destinationsResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const vehiclesData = await vehiclesResponse.json();
        const destinationsData = await destinationsResponse.json();
        setVehicles(vehiclesData);
        setDestinations(destinationsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Handle error state in UI if necessary
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleNavigate = (page: 'home' | 'destinations', section?: string) => {
    setCurrentPage(page);
    setSelectedDestination(null); // Reset destination on page navigation
    if (page === 'home' && section) {
      // Use a timeout to ensure the page has rendered before scrolling
      setTimeout(() => {
        const element = document.querySelector(section);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
        window.scrollTo(0, 0);
    }
  };

  const handleSelectDestination = (destination: Destination) => {
    setSelectedDestination(destination);
    window.scrollTo(0, 0);
  };

  const handleBackToDestinations = () => {
    setSelectedDestination(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header onNavigate={handleNavigate} />
      <main>
        {currentPage === 'home' ? (
          <>
            {/* Hero Section */}
            <section id="home" className="relative h-[60vh] md:h-[70vh] bg-cover bg-center text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549638125-231a533d837a?q=80&w=2070&auto=format&fit=crop')" }}>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg animate-fade-in-down">Discover the Pearl of the Indian Ocean</h1>
                <p className="text-lg md:text-2xl max-w-3xl mb-8 drop-shadow-md animate-fade-in-up">
                  Craft your unforgettable Sri Lankan journey with our bespoke tours and premium vehicle fleet.
                </p>
                <button onClick={() => handleNavigate('destinations')} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105">
                  Explore Destinations
                </button>
              </div>
            </section>

            {/* Fleet Section */}
            <section id="fleet" className="py-16 md:py-24 bg-white">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800">Our Premium Fleet</h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Travel in comfort and style. We offer a diverse range of vehicles to suit every need and budget for your island adventure.</p>
                {isLoading ? (
                  <div className="text-center text-gray-500">Loading vehicles...</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {vehicles.map((vehicle) => (
                      <FleetCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                  </div>
                )}
              </div>
            </section>
            
            {/* AI Trip Planner Section */}
            <section id="quote" className="py-16 md:py-24 bg-slate-50">
              <div className="container mx-auto px-4">
                <CustomTripPlanner />
              </div>
            </section>
          </>
        ) : (
          selectedDestination ? (
            <DestinationDetailPage destination={selectedDestination} onBack={handleBackToDestinations} />
          ) : (
            <DestinationsPage 
              destinations={destinations}
              isLoading={isLoading}
              onNavigateHome={() => handleNavigate('home')} 
              onSelectDestination={handleSelectDestination} 
            />
          )
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;