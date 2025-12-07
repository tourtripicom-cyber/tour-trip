import React, { useState } from 'react';
import { PaperAirplaneIcon, CheckCircleIcon, EnvelopeIcon } from './IconComponents';

export const CustomTripPlanner: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: '',
    duration: '',
    dates: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsLoading(true);
    
    // Simulate API call/form submission
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      travelers: '',
      duration: '',
      dates: '',
      message: ''
    });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center border border-emerald-200 rounded-2xl shadow-lg bg-emerald-50">
        <CheckCircleIcon className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">Your quote request has been sent successfully. Our travel experts will get back to you at <span className="font-semibold text-emerald-700">{formData.email}</span> within 24 hours.</p>
        <button
          onClick={handleReset}
          className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-full hover:bg-emerald-700 transition duration-300"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 border border-gray-200 rounded-2xl shadow-lg bg-white">
       <div className="text-center mb-8">
            <EnvelopeIcon className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
            <h2 className="text-3xl font-bold text-gray-800">Get a Custom Tour Quote</h2>
            <p className="text-gray-600 mt-2">Fill out the form below, and our experts will craft a personalized itinerary and quote for you.</p>
        </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" name="name" id="name" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" name="email" id="email" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" value={formData.email} onChange={handleChange} />
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-gray-400">(Optional)</span></label>
              <input type="tel" name="phone" id="phone" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" value={formData.phone} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
              <input type="number" name="travelers" id="travelers" required min="1" placeholder="e.g., 2" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" value={formData.travelers} onChange={handleChange} />
            </div>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Trip Duration (days)</label>
              <input type="number" name="duration" id="duration" required placeholder="e.g., 7" min="1" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" value={formData.duration} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="dates" className="block text-sm font-medium text-gray-700 mb-1">Preferred Dates</label>
              <input type="text" name="dates" id="dates" required placeholder="e.g., Mid-September" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" value={formData.dates} onChange={handleChange} />
            </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Dream Trip Details</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us what you'd like to see and do! e.g., We love hiking, ancient history, and relaxing on the beach."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>
        <div>
            <button
              type="submit"
              disabled={isLoading || !formData.name || !formData.email || !formData.travelers || !formData.duration || !formData.dates || !formData.message}
              className="w-full flex items-center justify-center bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 transition duration-300 disabled:bg-emerald-400 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                    </>
                ) : (
                    <>
                        <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                        Request My Quote
                    </>
                )}
            </button>
        </div>
      </form>
    </div>
  );
};