import React, { useState, useEffect } from 'react';
import { CarIcon, CheckCircleIcon, PaperAirplaneIcon, XIcon } from './IconComponents';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleName: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, vehicleName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickupDate: '',
    pickupLocation: '',
    vehicle: vehicleName
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Reset form when modal is reopened with a different vehicle
    setFormData(prev => ({ ...prev, vehicle: vehicleName }));
    if (!isOpen) {
        // Reset state when modal closes
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: '', email: '', phone: '', pickupDate: '', pickupLocation: '', vehicle: vehicleName
            });
        }, 300); // Delay to allow for closing animation
    }
  }, [isOpen, vehicleName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };
  
  const handleResetAndClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative transform transition-all duration-300 scale-95"
        onClick={(e) => e.stopPropagation()}
        style={isOpen ? { transform: 'scale(1)', opacity: 1 } : { transform: 'scale(0.95)', opacity: 0 }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <XIcon className="h-6 w-6" />
        </button>

        {isSubmitted ? (
            <div className="text-center">
                <CheckCircleIcon className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Thank you for your booking! A confirmation has been sent to <span className="font-semibold text-emerald-700">{formData.email}</span>. We look forward to serving you.
                </p>
                <button
                onClick={handleResetAndClose}
                className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-full hover:bg-emerald-700 transition duration-300"
                >
                Close
                </button>
            </div>
        ) : (
            <>
            <div className="text-center mb-8">
                <CarIcon className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
                <h2 className="text-3xl font-bold text-gray-800">Book Your Ride</h2>
                <p className="text-gray-600 mt-2">You're booking the <span className="font-semibold text-emerald-600">{vehicleName}</span>. Fill out your details below.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name-modal" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" name="name" id="name-modal" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" value={formData.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="email-modal" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" name="email" id="email-modal" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" value={formData.email} onChange={handleChange} />
                    </div>
                </div>
                 <div>
                    <label htmlFor="phone-modal" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="tel" name="phone" id="phone-modal" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="pickupDate-modal" className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                        <input type="date" name="pickupDate" id="pickupDate-modal" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" value={formData.pickupDate} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="pickupLocation-modal" className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                        <input type="text" name="pickupLocation" placeholder="e.g., Airport or Hotel" id="pickupLocation-modal" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" value={formData.pickupLocation} onChange={handleChange} />
                    </div>
                </div>
                 <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 transition duration-300 disabled:bg-emerald-400 disabled:cursor-not-allowed"
                        >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Submitting...
                            </>
                        ) : (
                            <>
                                <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                                Confirm Booking
                            </>
                        )}
                    </button>
                </div>
            </form>
            </>
        )}
      </div>
    </div>
  );
};
