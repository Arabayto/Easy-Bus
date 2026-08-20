
import React, { useState } from 'react';
import { Vehicle } from '../types';

interface VehicleGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Vehicle | null;
}

export const VehicleGalleryModal: React.FC<VehicleGalleryModalProps> = ({ isOpen, onClose, vehicle }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen || !vehicle) return null;

  // Combine main image with additional images
  const allImages = [vehicle.imageUrl, ...(vehicle.additionalImages || [])];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex justify-center items-center p-4 animate-fade-in" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-4xl h-full max-h-[90vh] flex flex-col items-center justify-center">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-gray-800 bg-opacity-50 hover:bg-opacity-80 rounded-full text-white transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Main Image Stage */}
        <div className="flex-grow flex items-center justify-center w-full overflow-hidden mb-4">
            <img 
                src={allImages[activeImageIndex]} 
                alt={`${vehicle.carModel} view ${activeImageIndex + 1}`}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
            />
        </div>

        {/* Info & Thumbnails */}
        <div className="w-full bg-black bg-opacity-50 p-4 rounded-xl backdrop-blur-sm">
            <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-white">{vehicle.carModel}</h2>
                <p className="text-gray-300">{vehicle.driverName} • {vehicle.plateNumber}</p>
            </div>

            {allImages.length > 1 && (
                <div className="flex justify-center gap-2 overflow-x-auto py-2">
                    {allImages.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveImageIndex(idx)}
                            className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-orange-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        >
                            <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
