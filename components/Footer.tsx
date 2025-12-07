import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} Coco Tours. All Rights Reserved.</p>
          <p className="text-sm text-slate-400 mt-2">Your trusted partner in Sri Lankan travel.</p>
        </div>
      </div>
    </footer>
  );
};