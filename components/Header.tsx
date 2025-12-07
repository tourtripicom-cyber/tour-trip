import React, { useState, useEffect } from 'react';
import { CarIcon } from './IconComponents';

interface HeaderProps {
    onNavigate: (page: 'home' | 'destinations', section?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { page: 'home', section: '#home', label: 'Home' },
    { page: 'home', section: '#fleet', label: 'Our Fleet' },
    { page: 'destinations', label: 'Destinations' },
  ];
  
  const handleNavClick = (page: 'home' | 'destinations', section?: string) => {
    onNavigate(page, section);
    setIsMenuOpen(false);
  };


  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md text-gray-800' : 'bg-transparent text-white'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => handleNavClick('home')} className="flex items-center space-x-2 text-2xl font-bold">
            <CarIcon className={`h-8 w-8 ${isScrolled ? 'text-emerald-600' : 'text-emerald-400'}`} />
            <span>Coco Tours</span>
          </button>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <button key={link.label} onClick={() => handleNavClick(link.page as 'home' | 'destinations', link.section)} className={`font-medium transition-colors duration-300 ${isScrolled ? 'hover:text-emerald-600' : 'hover:text-emerald-300'}`}>{link.label}</button>
            ))}
             <button onClick={() => handleNavClick('home', '#quote')} className={`border-2 ${isScrolled ? 'border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white' : 'border-white text-white hover:bg-white hover:text-gray-800'} font-bold py-2 px-4 rounded-full transition-all duration-300`}>
              Get a Quote
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={!isMenuOpen ? "M4 6h16M4 12h16m-7 6h7" : "M6 18L18 6M6 6l12 12"}></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white text-gray-800 py-4 absolute top-20 left-0 right-0 shadow-lg">
            <nav className="flex flex-col items-center space-y-4">
              {navLinks.map(link => (
                <button key={link.label} onClick={() => handleNavClick(link.page as 'home' | 'destinations', link.section)} className="font-medium hover:text-emerald-600">{link.label}</button>
              ))}
              <button onClick={() => handleNavClick('home', '#quote')} className="bg-emerald-600 text-white font-bold py-2 px-6 rounded-full">
                Get a Quote
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};